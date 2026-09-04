import type { NomeIcone } from "@/components/ui/Icone";

/**
 * Os quatro sectores, com os serviços a sério.
 *
 * Os cartões da homepage antiga traziam uma linha de venda e mais nada — quem
 * lá chegava ficava a saber que a JSK faz obras, mas não o que isso quer
 * dizer. Os títulos de serviço abaixo são os que já estão nas páginas de cada
 * sector, transcritos sem uma palavra mudada.
 *
 * A numeração não vive aqui: sai do `index` onde a lista é percorrida. É o que
 * torna impossível o defeito #7, em que os serviços de `/obras/` estão
 * numerados `01., 01., 02.`.
 */
export const SECTORES_DETALHE = [
  {
    nome: "JSK Alarmes",
    href: "/alarmes/",
    icone: "alarme",
    /* Verbatim do cartão da homepage. */
    texto:
      "Garantimos a sua segurança e tranquilidade com tecnologia de ponta e soluções personalizadas para proteger o que mais importa",
    /* Verbatim dos títulos de serviço de /alarmes/. */
    servicos: [
      "Instalação de Sistemas de Alarme",
      "Sistemas de Videovigilância",
      "Monitorização 24 Horas",
      "Alarmes Contra Incêndios",
    ],
  },
  {
    nome: "JSK Obras",
    href: "/obras/",
    icone: "obra",
    texto:
      "Damos uma nova vida aos espaços através de remodelações de alta qualidade, com inovação, bom gosto e atenção a cada detalhe",
    servicos: [
      "Transformações de Espaços",
      "Acabamentos e Revestimentos",
      "Instalações e Infraestruturas",
    ],
  },
  {
    nome: "JSK Screens",
    href: "/screens-led/",
    icone: "ecra",
    texto:
      "Garantimos que a sua mensagem chegue mais longe com screens LED modernos, para um impacto e visibilidade únicos",
    servicos: [
      "Aluguer e Venda de Screens LED",
      "Ecrãs para Interior",
      "Ecrãs para Exterior",
    ],
  },
  {
    /**
     * ⚠️ O texto credita a XquisiteVision; a página `/web/` credita a DevPlus.
     * Fica exactamente como está no site actual até alguém dizer qual é a
     * certa — `docs/decisoes-pendentes.md`, ponto 2.
     */
    nome: "JSK Web",
    href: "/web/",
    icone: "web",
    texto:
      "Websites modernos e funcionais, desenvolvidos pela XquisiteVision e promovidos pela JSK, para garantir a sua marca com impacto online.",
    servicos: ["Web Design", "Foco em Resultados", "Identidade Visual"],
  },
] as const satisfies readonly {
  nome: string;
  href: string;
  icone: NomeIcone;
  texto: string;
  servicos: readonly string[];
}[];

/**
 * A cena do pico: a casa que se arma.
 *
 * Cada etiqueta é um nome de serviço de `/alarmes/`, verbatim. O desenho não é
 * decoração — é a lista de serviços da empresa contada pelo alçado de uma casa
 * em vez de por uma lista com `✔️`.
 */
export const CASA = {
  /* A linha que segura o silêncio antes de o traço começar. Verbatim do herói
     de /alarmes/. */
  abertura: "Soluções completas de segurança para proteger o que mais importa.",
  sensores: [
    { etiqueta: "Sensores de Abertura", onde: "Portas e janelas" },
    { etiqueta: "Sensores de Movimento", onde: "Interior" },
    { etiqueta: "Câmaras de Segurança", onde: "Perímetro exterior" },
    { etiqueta: "Detetores de Fumo e Calor", onde: "Cobertura" },
  ],
  perimetro: { etiqueta: "Alarmes Perimetrais", onde: "Todo o terreno" },
  estado: "Monitorização 24 Horas",
  chamada: { texto: "Ver a JSK Alarmes", href: "/alarmes/" },
} as const;
