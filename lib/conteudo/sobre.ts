/**
 * A copy da `/sobre-nos/`, transcrita do HTML de jsk.pt.
 *
 * Nada aqui foi reescrito. Corrigem-se duas coisas, e só duas:
 *
 * - **`Sobre a Jsk` → `Sobre a JSK`.** Não é gralha do cliente: é o
 *   `text-transform: capitalize` que o tema antigo tinha em todos os títulos a
 *   reescrever o nome da empresa. Está documentado no `app/globals.css`, que o
 *   removeu precisamente por causa disto.
 * - **`compromisso` → `Compromisso`.** Está em minúscula na origem, e o site
 *   actual mostra-o capitalizado porque o mesmo CSS o forçava. Sem esse CSS,
 *   ficaria o único em minúscula de três irmãos — `Experiência` e `Inovação`
 *   estão capitalizados no HTML.
 *
 * O resto é verbatim, incluindo os dois parágrafos longos da missão e da visão
 * e a entrada do bloco final, que acaba com a pergunta que dá título ao bloco
 * dos diferenciais da homepage. Fica como está: é texto do cliente.
 */

export const TITULO = "Sobre a JSK";

/**
 * O título do herói, partido à mão.
 *
 * As páginas de sector partem o `TITULO` em cada espaço, porque `JSK Obras` e
 * `JSK Screens` são duas palavras e dão duas linhas certas. Aqui são três, e
 * partir em cada espaço deixava o `a` sozinho numa linha inteira à escala da
 * chapa — que é o tamanho de uma placa de sinalização.
 *
 * A partição fica aqui, ao pé do texto, e não numa conta dentro do componente:
 * é uma decisão sobre esta frase, não uma regra sobre frases.
 */
export const TITULO_LINHAS = ["Sobre a", "JSK"] as const;

export const ENTRADA = "Compromisso, inovação e qualidade em cada projeto.";

/**
 * O bloco da excelência, e a melhor fotografia deste site.
 *
 * A chapa amarela da JSK montada numa parede, com duas câmaras dome de cada
 * lado. É literalmente o objecto de que todo o sistema de desenho saiu — o
 * `docs/brief-experiencia.md` diz que o registo industrial não é gosto, porque
 * «o logótipo da empresa é um sinal de trânsito». Aqui está ele, na parede, a
 * fazer o trabalho.
 *
 * ⚠️ A chapa mostra o telefone `929 153 103`, que é o número que o rodapé
 * **marca** e não o que mostra. É a primeira evidência do mundo real para o
 * ponto 4 do `docs/decisoes-pendentes.md`.
 *
 * O `alt` foi escrito depois de olhar para o ficheiro, como pede
 * `docs/assets.md`.
 */
export const EXCELENCIA = {
  titulo: "Compromisso com a Excelência",

  paragrafos: [
    "Na JSK unimos experiência, inovação e qualidade para oferecer soluções em obras, sistemas de alarme e telas publicitárias. Adaptamo-nos às necessidades de cada cliente, garantindo segurança, eficiência e impacto visual.",
    "Trabalhamos com tecnologia de ponta, materiais de qualidade e uma equipa dedicada. Cada projeto é um compromisso com a confiança e a satisfação dos nossos clientes.",
  ],

  pontos: [
    "Experiência Comprovada",
    "Soluções Personalizadas",
    "Tecnologia de Ponta",
    "Compromisso com a Qualidade",
  ],

  imagem: {
    src: "/sobre/chapa-e-camaras.webp",
    alt: "Sirene de alarme com a chapa amarela da JSK numa parede branca — o logótipo em forma de casa, o número 929 153 103 e o endereço www.jsk.pt — ladeada por duas câmaras de vigilância dome brancas viradas para fora.",
  },
} as const satisfies {
  titulo: string;
  paragrafos: readonly string[];
  pontos: readonly string[];
  imagem: { src: string; alt: string };
};

/**
 * A cena do pico: os quatro que convergem.
 *
 * Como a `ANDAIME` da `/obras/`, a `PAREDE` da `/screens-led/` e a `CONSTROI`
 * da `/web/`, estas linhas são escritas — não há nada em jsk.pt que lhes
 * corresponda, porque a cena não existe lá.
 *
 * E, como lá, não afirmam facto nenhum que o texto do cliente já não afirme: o
 * estado final é um fragmento **verbatim** da visão, e os quatro nomes de
 * sector são os de `lib/conteudo/comum.ts`.
 */
export const CONVERGE = {
  abertura: "Quatro sectores. Quatro equipas. Quatro maneiras de resolver um problema.",
  titulo: "Uma resposta só.",
  /* Verbatim da visão, mais abaixo neste ficheiro. */
  estado: "Soluções completas num só parceiro",
} as const;

export const MISSAO_VISAO = [
  {
    titulo: "A Nossa Missão",
    texto:
      "Na JSK, a nossa missão é fornecer soluções integradas e de alta qualidade nas áreas de segurança eletrónica, construção civil e publicidade digital. Comprometemo-nos a responder com eficiência e rigor às necessidades dos nossos clientes, garantindo confiança, inovação e resultados duradouros em cada projeto. Trabalhamos com foco na excelência técnica, proximidade no atendimento e dedicação total à satisfação do cliente.",
  },
  {
    titulo: "A Nossa Visão",
    texto:
      "Ser uma referência nacional nas áreas em que atuamos, destacando-nos pela inovação contínua, pela fiabilidade dos nossos serviços e pela capacidade de entregar soluções completas num só parceiro. Ambicionamos crescer de forma sustentável, promovendo relações sólidas com os nossos clientes e contribuindo para um futuro mais seguro, moderno e visualmente impactante.",
  },
] as const satisfies readonly { titulo: string; texto: string }[];

/**
 * O que nos distingue.
 *
 * ⚠️ Este bloco e o `DIFERENCIAIS` da homepage respondem à mesma pergunta — a
 * entrada deste acaba, literalmente, com `O que nos torna únicos?`, que é o
 * título do de lá. São seis pontos curtos na homepage e três com texto longo
 * aqui.
 *
 * Ficou por decisão do Gonçalo, a 6 de Setembro de 2026: **fica, mas com forma
 * diferente.** Apagar conteúdo do cliente não me compete; repetir o desenho da
 * homepage seria mostrar o mesmo bloco duas vezes a quem vem de lá.
 *
 * A numeração sai do `index` onde a lista é percorrida — defeito #7.
 */
export const DISTINGUE = {
  titulo: "O que nos distingue?",

  intro:
    "Na JSK, acreditamos que a diferença está nos detalhes. O nosso compromisso com a excelência reflete-se em cada projeto, garantindo soluções eficazes e à medida de cada cliente. O que nos torna únicos?",

  itens: [
    {
      titulo: "Experiência",
      texto:
        "Contamos com uma equipa experiente e qualificada, garantindo rigor, confiança e resultados duradouros com atenção ao detalhe.",
    },
    {
      titulo: "Inovação",
      texto:
        "Apostamos em tecnologia de ponta para oferecer soluções modernas, eficientes e fiáveis nas áreas de segurança, construção e publicidade.",
    },
    {
      /* `compromisso` em minúscula na origem — ver a nota do cabeçalho. */
      titulo: "Compromisso",
      texto:
        "Trabalhamos com dedicação e foco na qualidade para oferecer soluções personalizadas que superam as expectativas dos nossos clientes.",
    },
  ],
} as const satisfies {
  titulo: string;
  intro: string;
  itens: readonly { titulo: string; texto: string }[];
};
