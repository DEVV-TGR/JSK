/**
 * A copy da `/web/`.
 *
 * Esta página é diferente das outras três de sector, e o módulo também: **o
 * texto não vem todo de jsk.pt.** O que lá está são três cartões genéricos e um
 * bloco de fecho — pouco para a página cujo trabalho é levar quem lê à DevPlus.
 *
 * Por decisão do Gonçalo, a 6 de Setembro de 2026, os serviços e os trabalhos
 * passam a vir de **devplus.pt**, que é o site da própria DevPlus. Não é
 * inventar texto sobre o negócio de terceiros: é usar o texto de quem assina a
 * página.
 *
 * ## A única reescrita, e é sistemática
 *
 * O devplus.pt trata por **tu**; o jsk.pt trata por **você**. Misturar os dois
 * tratamentos na mesma página era pior do que converter, por isso converte-se —
 * e fica escrito aqui exactamente o que mudou:
 *
 *     à medida da tua marca    →  à medida da sua marca
 *     mostramos-te tudo        →  mostramos-lhe tudo
 *     o que vendes             →  o que vende
 *     a tua ementa             →  a sua ementa
 *     Mudas o preço            →  Muda o preço
 *     um painel só teu         →  um painel só seu
 *     do que precisas de mudar →  do que precisa de mudar
 *     Publicas, editas, apagas →  Publica, edita, apaga
 *     e deixas agendadas       →  e deixa agendadas
 *     da tua marca             →  da sua marca
 *     Ficas com uma imagem     →  Fica com uma imagem
 *
 * Nem uma palavra mudou além destas. O `Motion & Interação` não levou nenhuma.
 *
 * ## O que continua de jsk.pt, verbatim
 *
 * O herói, o cabeçalho dos serviços e o bloco de fecho. Incluindo o
 * `100% de clientes satisfeitos`, que fica assinalado mais abaixo.
 */

export const TITULO = "JSK Web";

export const ENTRADA =
  "Criamos a sua presença digital com design único e resultados garantidos";

/**
 * A DevPlus, e para onde se aponta.
 *
 * `rel="noopener noreferrer"` não é opcional: os dois links desta página em
 * jsk.pt abrem em separador novo **sem** `rel`, que é o defeito #34.
 */
export const DEVPLUS = {
  nome: "DevPlus",
  href: "https://devplus.pt",
  portfolio: "https://devplus.pt/portfolio",
} as const;

export const APRESENTACAO = {
  /* Verbatim de jsk.pt/web/. */
  titulo: "Os Nossos Serviços Web",
  texto:
    "Através da nossa parceria com a DevPlus, oferecemos soluções completas para transformar a sua visão digital em realidade.",
} as const;

/**
 * A cena do pico: o site que se constrói.
 *
 * Como a `ANDAIME` da `/obras/` e a `PAREDE` da `/screens-led/`, estas linhas
 * são escritas — não há nada em jsk.pt que lhes corresponda, porque a cena não
 * existe lá. E, como lá, não afirmam facto nenhum sobre o negócio: dizem o que
 * se está a ver.
 *
 * As quatro fases são a ordem por que um site se faz a sério, e é essa a
 * matéria da cena.
 */
export const CONSTROI = {
  abertura: "Um site não começa por ser um site. Começa por ser uma grelha.",
  titulo: "O resto constrói-se por cima.",
  fases: [
    { nome: "A grelha", nota: "Onde tudo assenta." },
    { nome: "Os blocos", nota: "O que vai onde." },
    { nome: "A tipografia", nota: "O que se lê primeiro." },
    { nome: "A marca", nota: "O que fica na memória." },
  ],
} as const satisfies {
  abertura: string;
  titulo: string;
  fases: readonly { nome: string; nota: string }[];
};

/**
 * Os seis serviços, do devplus.pt.
 *
 * A numeração não está aqui: sai do `index` onde a lista é percorrida. É o que
 * torna impossível o defeito #7.
 *
 * Não levam ícone. O `components/ui/Icone.tsx` tem catorze caminhos e nenhum
 * deles diz "painel de gestão" ou "motion" — inventar seis pictogramas era
 * fazer desenho novo por conta própria. O número basta, e é o que a `/obras/`
 * e o `Processo` já fazem.
 */
export const SERVICOS = {
  titulo: "O que fazemos",

  itens: [
    {
      nome: "Web Design",
      texto:
        "Desenhamos cada ecrã à medida da sua marca e mostramos-lhe tudo antes de escrever uma linha de código. O cliente encontra o que procura sem ter de pensar — é isso que separa quem visita de quem compra.",
    },
    {
      nome: "Desenvolvimento",
      texto:
        "Construímos o site com tecnologia que o faz abrir num instante, em qualquer telemóvel. Um site lento perde o cliente antes sequer de lhe mostrar o que vende.",
    },
    {
      nome: "Menus & Ecrãs Digitais",
      texto:
        "Levamos a sua ementa para onde os clientes olham: no telemóvel por QR code e num ecrã dentro do espaço, em loop. Muda o preço num sítio e muda em todo o lado.",
    },
    {
      nome: "Painel de Gestão",
      texto:
        "Um painel só seu, feito à medida do que precisa de mudar no dia a dia. Publica, edita, apaga e deixa coisas agendadas — sem código e sem esperar por nós.",
    },
    {
      nome: "Branding",
      texto:
        "Tratamos da cara da sua marca, do logótipo às cores e às regras de uso. Fica com uma imagem que se reconhece à distância — no site, na montra ou na farda.",
    },
    {
      nome: "Motion & Interação",
      texto:
        "Pequenos movimentos que dão vida ao site sem nunca atrapalhar quem o está a usar. Guiam o olho para onde interessa e fazem o site parecer bem feito — porque é.",
    },
  ],
} as const satisfies {
  titulo: string;
  itens: readonly { nome: string; texto: string }[];
};

/**
 * Os trabalhos, do portefólio do devplus.pt.
 *
 * Os seis estão todos aqui, e cada um aponta para a sua página no portefólio.
 * **Nem todos levam ecrã**, e a razão de cada um está anotada:
 *
 * - Os três com `imagem` têm site público, e a captura foi feita dele.
 * - A **Mira Mar** e **A Barraquinha Nova** não têm site público a que o
 *   portefólio aponte. Ficam em cartão tipográfico. Não se inventa uma imagem
 *   para encher o buraco, e também não se escreve que "não têm site" — isso
 *   seria uma afirmação sobre o negócio de outra pessoa que não me compete.
 * - A **JSK** é o caso delicado: o portefólio aponta para o jsk.pt em
 *   WordPress, que é precisamente o site que este trabalho está a substituir.
 *   Mostrar esse ecrã aqui era exibir o site velho como prova do novo. Fica sem
 *   ecrã, e entra o do site novo no dia em que estiver em produção.
 */
export const TRABALHOS = {
  titulo: "Alguns dos nossos trabalhos",

  itens: [
    {
      nome: "Taskuinha do Pirata",
      slug: "taskuinha-do-pirata",
      imagem: "/web/taskuinha-do-pirata.webp",
      alt: "Página de entrada do site da Taskuinha do Pirata.",
    },
    {
      nome: "Império Auto Concept",
      slug: "imperio-auto-concept",
      imagem: "/web/imperio-auto-concept.webp",
      alt: "Página de entrada do site da Império Auto Concept.",
    },
    {
      nome: "António Home Repair",
      slug: "antonio-home-repair",
      imagem: "/web/antonio-home-repair.webp",
      alt: "Página de entrada do site da António Home Repair.",
    },
    { nome: "Mira Mar", slug: "mira-mar" },
    { nome: "A Barraquinha Nova", slug: "a-barraquinha-nova" },
    { nome: "JSK", slug: "jsk" },
  ],
} as const satisfies {
  titulo: string;
  itens: readonly {
    nome: string;
    slug: string;
    imagem?: string;
    alt?: string;
  }[];
};

/**
 * O fecho, verbatim de jsk.pt/web/.
 *
 * ⚠️ `100% de clientes satisfeitos` é uma afirmação de facto sobre o negócio,
 * do mesmo tipo dos contadores da homepage — e do mesmo tipo daquelas que o
 * `docs/decisoes-pendentes.md` manda confirmar antes de republicar. Está aqui
 * porque é o que o site actual diz e porque a regra é transcrever, não porque
 * alguém a verificou.
 */
export const FECHO = {
  titulo: "A Sua Visão, O Nosso Desafio",
  texto:
    "A JSK Web trabalha em parceria com a DevPlus para criar experiências digitais autênticas que fazem a diferença no seu negócio.",
  afirmacao: "Design único. Resultados reais. 100% de clientes satisfeitos.",
  chamada: "Visitar DevPlus",
} as const;
