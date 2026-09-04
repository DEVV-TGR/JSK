/**
 * O endereço público, com a variável de ambiente a ganhar quando existe.
 *
 * O `??` sozinho não chega: uma Environment Variable declarada na Vercel mas
 * deixada em branco chega aqui como `""`, que é diferente de `undefined` e
 * portanto passa pelo `??`. O build morria em `new URL("")` no `layout.tsx`
 * com `ERR_INVALID_URL`, na recolha de dados do `/_not-found`. Por isso o
 * teste é ao valor depois de aparado, não à sua existência.
 */
function urlDoAmbiente(): string {
  const declarado = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (declarado) return declarado.replace(/\/+$/, "");

  return "https://jsk.pt";
}

/**
 * A fonte única sobre a JSK.
 *
 * Tudo o que seja o nome, o contacto ou a morada da empresa sai daqui e mais
 * nenhum sítio. A razão é concreta: no site em WordPress o rodapé mostrava
 * `+351 963 085 319` e o `tel:` por baixo ligava para `(+351) 929 153 103`, em
 * todas as páginas. Foram dois valores escritos à mão em dois widgets
 * diferentes e ninguém deu por isso. Com um só objecto, esse erro deixa de ser
 * possível — o número que se lê e o número que se marca são literalmente a
 * mesma variável.
 */
export const site = {
  nome: "JSK",
  tagline: "A Sua Melhor Solução",
  dominio: "jsk.pt",

  /**
   * Em produção fica `https://jsk.pt`. A variável existe para que uma
   * pré-visualização na Vercel não gere URLs canónicos a apontar para o site
   * a sério — se o fizesse, seria a pré-visualização a competir com o site nos
   * resultados de pesquisa.
   */
  url: urlDoAmbiente(),

  lang: "pt-PT",
  locale: "pt_PT",

  /** O texto do rodapé do site actual, palavra por palavra. */
  descricao:
    "A JSK é especialista em obras, segurança e telas publicitárias, oferecendo soluções inovadoras e de qualidade com foco na excelência e satisfação do cliente.",

  /**
   * ⚠️ POR CONFIRMAR — é uma caixa Gmail, não uma do domínio. Um endereço
   * `@jsk.pt` diz a quem escreve que a empresa é dona do domínio, e sobrevive à
   * saída de quem tem a palavra-passe do Gmail.
   */
  email: "jskalarmes@gmail.com",

  /**
   * ⚠️ POR CONFIRMAR — qual dos dois é o verdadeiro.
   *
   * O site actual anda com dois números ao mesmo tempo: mostra este em todo o
   * lado, mas os `href` do rodapé e do botão "Ligue-nos Agora" marcam
   * `929 153 103`. A página /contactos/ é a única onde o que se lê e o que se
   * marca coincidem — e coincidem neste. É por isso que é este que está aqui.
   * Provável que o segundo seja um número antigo, mas isso é uma suposição e
   * suposições não vão para o site de um cliente.
   */
  telefone: "+351 963 085 319",

  /**
   * ⚠️ EM FALTA — o NIF e a denominação social são de indicação obrigatória
   * num sítio de comércio electrónico ou de prestação de serviços em Portugal
   * (DL 7/2004, artigo 10.º). O site actual não os tem em lado nenhum. Assim
   * que chegarem, entram aqui e aparecem no rodapé e no JSON-LD.
   */
  nif: null as string | null,
  denominacaoSocial: null as string | null,

  morada: {
    linha: "JSK Alarmes, Vilar do Pinheiro",
    codigoPostal: "4485-891",
    localidade: "Vilar do Pinheiro",
    concelho: "Vila do Conde",
    pais: "PT",
  },
} as const;

/**
 * O `href` de telefone, derivado do número que se mostra.
 *
 * Um `tel:` não pode levar espaços nem parênteses — o site actual serve
 * `tel:(+351) 929 153 103` e há clientes de telefone que não sabem o que fazer
 * com aquilo. Aqui fica `tel:+351963085319`, sempre a partir do mesmo valor.
 */
export const telefoneHref = `tel:${site.telefone.replace(/[^\d+]/g, "")}`;

export const emailHref = `mailto:${site.email}`;

/**
 * Ligação para o mapa.
 *
 * O site actual usa um URL de sessão do Safari copiado da barra de endereço,
 * com `client=safari&rls=en&oe=UTF-8&um=1&ie=UTF-8&fb=1&gl=pt&sa=X` e um
 * `geocode` opaco lá pelo meio. Isto é a forma documentada da Google, que não
 * depende do browser de ninguém.
 */
export const urlMapa = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.morada.linha}, ${site.morada.codigoPostal} ${site.morada.localidade}`,
)}`;

/**
 * As rotas públicas, por ordem, com barra final.
 *
 * Alimentam o `sitemap.ts` e o teste de fumo do CI. A barra final não é
 * decoração: o site em WordPress faz 301 de `/alarmes` para `/alarmes/`, e é a
 * versão com barra que está indexada e nos links de fora. Mudá-la agora custava
 * um redireccionamento a cada visita vinda da pesquisa.
 */
export const ROTAS_PUBLICAS = [
  "/",
  "/alarmes/",
  "/obras/",
  "/screens-led/",
  "/web/",
  "/sobre-nos/",
  "/contactos/",
  "/termos-e-condicoes/",
  "/politica-de-privacidade/",
] as const;

export type RotaPublica = (typeof ROTAS_PUBLICAS)[number];
