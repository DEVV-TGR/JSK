import type { NextConfig } from "next";
import { site } from "./lib/site";

const emDesenvolvimento = process.env.NODE_ENV === "development";

/**
 * A Content-Security-Policy do site.
 *
 * Os `'unsafe-inline'` são deliberados e convém perceber porquê antes de
 * alguém os tirar por higiene:
 *
 * - O Next injecta os dados de hidratação em `<script>` inline cujo conteúdo
 *   muda de página para página. Não há hash estável para eles. Juntam-se-lhes
 *   os `ld+json` dos dados estruturados.
 * - A alternativa é um nonce por pedido, que obriga a renderização dinâmica em
 *   todas as páginas. Um site institucional de nove páginas estáticas deixaria
 *   de ser estático para fechar uma porta que aqui não dá para lado nenhum:
 *   tudo o que é renderizado vem de `lib/conteudo/`, ficheiros nossos e
 *   versionados. Não há base de dados, não há utilizadores, não há texto de
 *   visitante a chegar ao HTML.
 *
 * Se um dia entrar conteúdo vindo de fora — um CMS, comentários, testemunhos
 * submetidos — esta conta muda e volta-se a fazê-la.
 *
 * `'unsafe-eval'` **só em desenvolvimento**: o React usa `eval` para
 * reconstruir no browser as stacks de erro do servidor. Em produção não entra,
 * e o CI falha se entrar.
 *
 * `font-src 'self'` chega e não precisa do `fonts.gstatic.com`: o
 * `next/font/google` descarrega a Work Sans e a Roboto na build e serve-as do
 * nosso domínio. O site em WordPress ia buscá-las ao Google a cada visita, o
 * que é um pedido a terceiros com o IP de quem visita.
 *
 * `form-action 'self'` e `connect-src 'self'` são precisos para o formulário
 * de orçamento, que faz POST para /api/contacto no próprio domínio.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${emDesenvolvimento ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

/**
 * O site em WordPress não serve um único cabeçalho de segurança: nem HSTS, nem
 * CSP, nem X-Frame-Options, nem X-Content-Type-Options. Estes são o mínimo.
 *
 * Não há `Strict-Transport-Security` aqui de propósito: a Vercel já o serve em
 * todos os domínios com HTTPS, e repeti-lo à mão criava uma segunda fonte de
 * verdade que diverge da plataforma sem ninguém dar por isso.
 */
const cabecalhosDeSeguranca = [
  { key: "Content-Security-Policy", value: csp },
  /* Sem isto, um ficheiro servido com o tipo errado pode ser interpretado como
     script pelo browser. */
  { key: "X-Content-Type-Options", value: "nosniff" },
  /* O `frame-ancestors 'none'` acima já cobre isto nos browsers modernos; fica
     para os que ainda não lêem CSP. Sem os dois, o site é enquadrável num
     iframe de qualquer domínio, que é como se monta um ataque de clickjacking. */
  { key: "X-Frame-Options", value: "DENY" },
  /* Enviamos a origem para fora, nunca o caminho completo. */
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  /* O site não usa nenhuma destas APIs. Declará-lo impede que um script que lá
     chegue um dia as possa pedir. */
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  /* A Vercel serve os estáticos com `Access-Control-Allow-Origin: *` por
     omissão. Nas páginas isso não expõe nada — é conteúdo público. Mas deixa de
     ser inofensivo no dia em que houver uma resposta que não é para toda a
     gente, e a /api/contacto está a caminho. Fixar a origem agora é mais barato
     do que descobrir mais tarde que se herdou o `*`. */
  { key: "Access-Control-Allow-Origin", value: site.url },
];

const nextConfig: NextConfig = {
  /* Fixa a raiz do workspace neste projecto. A pasta-mãe tem outros repos e um
     lockfile perdido lá acima faz o Next inferir a raiz errada. */
  turbopack: {
    root: __dirname,
  },

  /**
   * O site em WordPress serve tudo com barra final e faz 301 de `/alarmes` para
   * `/alarmes/`. É a versão com barra que está indexada e nos links de fora.
   * Sem isto, cada visita vinda da pesquisa pagava um redireccionamento.
   */
  trailingSlash: true,

  /* Por omissão o Next anuncia-se em `X-Powered-By: Next.js` a cada resposta.
     Não protege nada mantê-lo, e dizer que framework se corre é dizer a quem
     procura alvos que avisos há-de experimentar. */
  poweredByHeader: false,

  /**
   * Os endereços que o site antigo servia e que não sobrevivem à mudança.
   *
   * O `/screens` era um 301 do WordPress para `/screens-led/` e há links de
   * fora a apontar para lá. O `/wp-sitemap.xml` é o que está declarado no
   * robots.txt actual e o que o Google tem em memória. O `/elementor-hf/footer/`
   * era o template do rodapé, que o WordPress publicava como página a sério e
   * pôs no sitemap.
   *
   * Fora daqui de propósito: /wp-admin/, /wp-json/, /xmlrpc.php e /feed/.
   * Desaparecem com o WordPress e 404 é a resposta certa — não há nada para
   * onde os mandar.
   *
   * ⚠️ Falta decidir o que fazer com /construcao/ (órfã, indexável, no sitemap
   * actual). Ver docs/decisoes-pendentes.md.
   */
  async redirects() {
    return [
      { source: "/screens", destination: "/screens-led/", permanent: true },
      { source: "/wp-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/elementor-hf/footer", destination: "/", permanent: true },
    ];
  },

  /** Cabeçalhos de segurança em todas as rotas. Ver o comentário da `csp`. */
  async headers() {
    return [{ source: "/(.*)", headers: cabecalhosDeSeguranca }];
  },
};

export default nextConfig;
