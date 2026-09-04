/**
 * O texto de cada página que não cabe nos módulos por tema.
 *
 * Heróis, introduções, blocos soltos. Tudo transcrito do site em WordPress —
 * ver docs/inventario-jsk-pt.md, que é a transcrição de origem.
 */

import { SECTORES } from "./sectores";

export type Botao = {
  texto: string;
  href: string;
  variante?: "principal" | "secundario" | "sobreTinta";
  icone?: "setaDireita" | "setaExterna" | "telefone";
  externo?: boolean;
};

export type Heroi = {
  olho?: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
  alt: string;
  botoes?: readonly Botao[];
};

/* ═══════════════════════════════════════════════════════════════════════════
   Homepage
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * ⚠️ O título e o olho estão trocados em relação ao site antigo, e o motivo
 * merece ficar escrito.
 *
 * Lá, o `<h1>` da página de entrada é "Bem-Vindo à JSK" — uma saudação, sem uma
 * única palavra sobre o que a empresa faz. E por cima dele está um `<h6>` com
 * "A sua melhor solução": um cabeçalho de nível seis acima de um de nível um.
 *
 * Não se escreveu nada de novo. "Segurança, Construção e Impacto. Tudo Num Só
 * Lugar" já existe na mesma página, dois blocos abaixo, como título da secção
 * de introdução. Sobe para `<h1>` e o "Bem-Vindo à JSK" desce para o lugar
 * dela. As duas frases são do cliente; muda a hierarquia, não o texto.
 */
export const HEROI_INICIO: Heroi = {
  olho: "A sua melhor solução",
  titulo: "Segurança, Construção e Impacto. Tudo Num Só Lugar",
  subtitulo:
    "Na JSK, combinamos experiência técnica com criatividade para oferecer soluções completas em segurança, construção e comunicação visual. Garantimos projetos eficientes, modernos e à medida das suas necessidades.",
  imagem: "/heroi/institucional.webp",
  alt: "Instalação de sistemas de segurança da JSK",
  botoes: [
    { texto: "Peça um Orçamento Gratuito", href: "/contactos/", icone: "setaDireita" },
    { texto: "Quem Somos", href: "/sobre-nos/", variante: "sobreTinta" },
  ],
};

export const INTRODUCAO_INICIO = {
  titulo: "Bem-Vindo à JSK",
  paragrafos: [
    "Bem-vindo ao site da JSK! Somos uma marca que oferece serviços de qualidade em sistemas de alarme e segurança, remodelações, e instalação de screens LED. O nosso compromisso é com a excelência, proporcionando soluções à medida, que combinam inovação, confiança e atenção ao detalhe.",
    "Descubra como os nossos serviços podem elevar os seus projectos, garantindo segurança e um impacto visual que se destaca. Vamos trabalhar juntos!",
  ],
} as const;

export const TITULO_SECTORES = "Os Nossos Sectores";
export const TITULO_DIFERENCIAIS = "O que nos torna únicos?";

/* ═══════════════════════════════════════════════════════════════════════════
   Heróis das páginas de sector
   ═══════════════════════════════════════════════════════════════════════════ */

const ALT_HEROI: Record<string, string> = {
  alarmes: "Central de alarme e videovigilância instalada pela JSK",
  obras: "Obra de remodelação executada pela JSK",
  screens: "Screen LED da JSK montado num evento",
  web: "Trabalho de desenho digital da JSK Web",
};

export const HEROIS_SECTOR = Object.fromEntries(
  SECTORES.map((s) => [
    s.id,
    {
      titulo: s.nome,
      subtitulo: s.tagline,
      imagem: s.heroi,
      alt: ALT_HEROI[s.id],
    } satisfies Heroi,
  ]),
) as Record<(typeof SECTORES)[number]["id"], Heroi>;

/* ═══════════════════════════════════════════════════════════════════════════
   /screens-led/
   ═══════════════════════════════════════════════════════════════════════════ */

export const INTRO_SCREENS = {
  titulo: "Aluguer e Venda de Screens LED",
  paragrafo:
    "Os screen LED são uma ferramenta moderna e eficaz de marketing, que oferece comunicação visual de alto impacto. Destacam-se pela versatilidade, visibilidade e capacidade de exibir conteúdos personalizados, funcionando bem em ambientes internos e externos, e ajudando marcas a sobressair no mercado.",
  // O terceiro está escrito "Eficiênciae Durabilidade" no site antigo.
  destaques: ["Alta Visibilidade", "Conteúdo Dinâmico", "Eficiência e Durabilidade"],
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   /web/
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * ⚠️ Esta página credita a **DevPlus**; o cartão da homepage e o rodapé
 * creditam a **XquisiteVision**. Está transcrito como está — ver
 * docs/decisoes-pendentes.md #2.
 *
 * No site antigo, este conteúdo todo vive dentro de um widget de HTML do
 * Elementor que contém um documento `<!DOCTYPE html>` completo, com o seu
 * próprio `<head>`, `<style>` e `<script>`, aninhado a meio da página. Traz
 * uma terceira cópia do Font Awesome do cdnjs, um bloco de CSS que nunca
 * renderiza e um listener de `scroll` sem throttle.
 */
export const SERVICOS_WEB_CABECALHO = {
  titulo: "Os Nossos Serviços Web",
  subtitulo:
    "Através da nossa parceria com a DevPlus, oferecemos soluções completas para transformar a sua visão digital em realidade.",
} as const;

export const PARCERIA_WEB = {
  marca: "DevPlus©",
  titulo: "A Sua Visão, O Nosso Desafio",
  paragrafos: [
    "A JSK Web trabalha em parceria com a DevPlus para criar experiências digitais autênticas que fazem a diferença no seu negócio.",
  ],
  destaque: "Design único. Resultados reais. 100% de clientes satisfeitos.",
  botao: {
    texto: "Visitar DevPlus",
    href: "https://devplus.pt",
    icone: "setaExterna",
    externo: true,
  },
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   /sobre-nos/
   ═══════════════════════════════════════════════════════════════════════════ */

/** O site antigo escreve "Sobre a Jsk" — culpa do `text-transform` do tema. */
export const HEROI_SOBRE: Heroi = {
  titulo: "Sobre a JSK",
  subtitulo: "Compromisso, inovação e qualidade em cada projeto.",
  imagem: "/heroi/institucional.webp",
  alt: "Equipa da JSK em trabalho",
};

export const EXCELENCIA = {
  titulo: "Compromisso com a Excelência",
  paragrafos: [
    "Na JSK unimos experiência, inovação e qualidade para oferecer soluções em obras, sistemas de alarme e telas publicitárias. Adaptamo-nos às necessidades de cada cliente, garantindo segurança, eficiência e impacto visual.",
    "Trabalhamos com tecnologia de ponta, materiais de qualidade e uma equipa dedicada. Cada projeto é um compromisso com a confiança e a satisfação dos nossos clientes.",
  ],
  lista: [
    "Experiência Comprovada",
    "Soluções Personalizadas",
    "Tecnologia de Ponta",
    "Compromisso com a Qualidade",
  ],
  imagem: "/sobre/excelencia.webp",
  alt: "Técnico da JSK a instalar equipamento",
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
] as const;

export const DISTINGUE = {
  titulo: "O que nos distingue?",
  intro:
    "Na JSK, acreditamos que a diferença está nos detalhes. O nosso compromisso com a excelência reflete-se em cada projeto, garantindo soluções eficazes e à medida de cada cliente. O que nos torna únicos?",
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   /contactos/
   ═══════════════════════════════════════════════════════════════════════════ */

export const HEROI_CONTACTOS: Heroi = {
  titulo: "Fale Connosco",
  subtitulo:
    "Entre em contacto com a nossa equipa e descubra como podemos ajudá-lo.",
  imagem: "/heroi/institucional.webp",
  alt: "Escritório da JSK em Vilar do Pinheiro",
};

export const CONTACTOS = {
  olho: "Peça aqui o seu…",
  titulo: "Orçamento Gratuito",
  paragrafos: [
    "Peça já o seu orçamento ou esclareça as suas dúvidas. Estamos prontos para ajudar.",
    "Na JSK, valorizamos cada contacto. Seja para pedir um orçamento, agendar uma visita técnica ou simplesmente esclarecer uma dúvida, estamos disponíveis para o ajudar. Responderemos com a maior brevidade possível.",
  ],
} as const;

/* ═══════════════════════════════════════════════════════════════════════════
   Repetidos em todas as páginas
   ═══════════════════════════════════════════════════════════════════════════ */

/** O botão está escrito "Lige-nos Agora" no site antigo. */
export const BANDA_ORCAMENTO = {
  titulo: "Orçamento sem compromisso?",
  botaoPrincipal: "Peça um Orçamento Gratuito",
  botaoTelefone: "Ligue-nos Agora",
} as const;

export const TITULO_FORMULARIO = "Peça um Orçamento Gratuito";

export const RODAPE = {
  colunas: {
    contactos: "Contactos",
    links: "Links",
    setores: "Setores",
  },
  links: [
    { texto: "Sobre Nós", href: "/sobre-nos/" },
    { texto: "Fale Connosco", href: "/contactos/" },
    { texto: "Termos e Condições", href: "/termos-e-condicoes/" },
    { texto: "Política de Privacidade", href: "/politica-de-privacidade/" },
  ],
  // ⚠️ O rodapé do site antigo assina "Design by XquisiteVision" e a página
  // /web/ credita a DevPlus. Ver docs/decisoes-pendentes.md #2.
  credito: { texto: "XquisiteVision", href: "https://xquisitevision.pt" },
} as const;
