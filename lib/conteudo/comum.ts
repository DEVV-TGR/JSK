import type { NomeIcone } from "@/components/ui/Icone";

/**
 * O que se repete nas nove páginas.
 *
 * No WordPress isto era o mesmo texto colado N vezes, livre para divergir. E
 * divergiu: a numeração dos serviços de `/obras/` está `01., 01., 02.`, o
 * rodapé mostra um número de telefone e marca outro. Num módulo partilhado
 * esses erros deixam de ser possíveis.
 */

export type Ligacao = {
  texto: string;
  href: string;
  externo?: boolean;
};

/**
 * A navegação, em dois grupos.
 *
 * Não é arrumação por arrumar. O cabeçalho antigo tinha seis links do mesmo
 * tamanho e do mesmo peso — `JSK Alarmes`, `JSK Obras`, `JSK Screens`,
 * `JSK Web`, `Sobre Nós`, `Contactos` — e lia-se como uma parede por duas
 * razões somadas:
 *
 * 1. **A palavra JSK aparecia cinco vezes** na mesma barra: uma no logótipo e
 *    quatro nos links. Debaixo de um logótipo que já diz JSK, `Alarmes` não é
 *    ambíguo. O nome completo do sector fica onde é preciso — no `<h1>` da
 *    página, no `<title>`, no rodapé.
 * 2. **Seis coisas com o mesmo peso não são seis coisas**, são um bloco. Quatro
 *    são sectores, que é o que a empresa vende; dois são páginas
 *    institucionais. Pesos iguais escondiam essa diferença.
 */

/** Os quatro sectores. O nome curto é para a navegação; o completo, para tudo o resto. */
export const SECTORES_NAV: readonly (Ligacao & { completo: string })[] = [
  { texto: "Alarmes", completo: "JSK Alarmes", href: "/alarmes/" },
  { texto: "Obras", completo: "JSK Obras", href: "/obras/" },
  { texto: "Screens", completo: "JSK Screens", href: "/screens-led/" },
  { texto: "Web", completo: "JSK Web", href: "/web/" },
] as const;

/** As páginas institucionais. Secundárias, e apresentadas como tal. */
export const INSTITUCIONAL: readonly Ligacao[] = [
  { texto: "Sobre nós", href: "/sobre-nos/" },
  { texto: "Contactos", href: "/contactos/" },
] as const;

/**
 * A lista completa, pela ordem em que se percorre o site.
 *
 * Alimenta o rodapé e o sitemap. A ordem é Alarmes → Obras → Screens → Web, e é
 * a mesma nos cartões da homepage. O site antigo punha a Web antes das Screens
 * no menu e ao contrário nos cartões — defeito #15.
 */
export const NAVEGACAO: readonly Ligacao[] = [
  ...SECTORES_NAV.map(({ completo, href }) => ({ texto: completo, href })),
  ...INSTITUCIONAL,
];

/** O único apelo à acção do site. Um texto, usado em todo o lado. */
export const ORCAMENTO = {
  texto: "Peça um Orçamento Gratuito",
  href: "/contactos/",
} as const satisfies Ligacao;

/**
 * A banda de orçamento, no fundo das nove páginas.
 *
 * `Ligue-nos Agora` corrige a gralha `Lige-nos Agora` que o site antigo tem em
 * todas as páginas — defeito #8.
 */
export const BANDA_ORCAMENTO = {
  titulo: "Orçamento sem compromisso?",
  chamada: "Ligue-nos Agora",
} as const;

/**
 * Os quatro passos, iguais em `/alarmes/` e `/obras/`.
 *
 * O inventário diz que os dois blocos são **byte a byte idênticos** no site
 * actual — o mesmo texto colado duas vezes no Elementor, livre para divergir a
 * partir do dia em que alguém corrigisse um e não o outro. É exactamente o caso
 * que o `CLAUDE.md` dá para a copy viver em módulos partilhados.
 *
 * A numeração não está aqui: sai do `index` onde a lista é percorrida. É o que
 * torna impossível o defeito #7, em que os serviços de `/obras/` estão
 * numerados `01., 01., 02.`.
 */
export const PROCESSO = {
  titulo: "O Nosso Processo",
  passos: [
    {
      titulo: "Consulta",
      texto:
        "Trabalhamos consigo para perceber as suas necessidades e avaliar a melhor solução.",
    },
    {
      titulo: "Orçamento",
      texto: "Apresentamos um orçamento claro e ajustado ao seu projeto.",
    },
    {
      titulo: "Instalação",
      texto: "Executamos o serviço com rapidez, segurança e qualidade.",
    },
    {
      titulo: "Inspeção",
      texto:
        "Verificamos todos os detalhes para garantir o funcionamento ideal.",
    },
  ],
} as const;

export const RODAPE = {
  /* Verbatim do rodapé actual. */
  sobre:
    "A JSK é especialista em obras, segurança e telas publicitárias, oferecendo soluções inovadoras e de qualidade com foco na excelência e satisfação do cliente.",

  links: {
    titulo: "Links",
    itens: [
      { texto: "Sobre Nós", href: "/sobre-nos/" },
      { texto: "Fale Connosco", href: "/contactos/" },
      { texto: "Termos e Condições", href: "/termos-e-condicoes/" },
      { texto: "Política de Privacidade", href: "/politica-de-privacidade/" },
    ],
  },

  /* `JSK Web` não tinha link nenhum no rodapé antigo — defeito #10. */
  setores: {
    titulo: "Setores",
    itens: SECTORES_NAV.map(({ completo, href }) => ({ texto: completo, href })),
  },

  contactos: { titulo: "Contactos" },

  /**
   * ⚠️ O rodapé antigo assina `Design by XquisiteVision`.
   *
   * Não passa para aqui, e a razão não é preferência: o desenho deste site não
   * é o dela. Pôr o crédito seria uma afirmação falsa; pôr outro nome no lugar
   * seria uma decisão que não é minha. Fica de fora até alguém dizer o que lá
   * deve estar — ver `docs/decisoes-pendentes.md`, ponto 2.
   */
  copyright: `Copyright © ${new Date().getFullYear()} JSK`,
} as const;

/**
 * Os quatro sectores, com o ícone e o terreno de cada um.
 *
 * Alimenta os cartões da homepage, o rodapé e o marcador de sector. A copy de
 * cada cartão está em `lib/conteudo/inicio.ts`, junto do resto da homepage.
 */
export const SECTORES = [
  { nome: "JSK Alarmes", href: "/alarmes/", icone: "alarme" },
  { nome: "JSK Obras", href: "/obras/", icone: "obra" },
  { nome: "JSK Screens", href: "/screens-led/", icone: "ecra" },
  { nome: "JSK Web", href: "/web/", icone: "web" },
] as const satisfies readonly {
  nome: string;
  href: string;
  icone: NomeIcone;
}[];
