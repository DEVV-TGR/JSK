/**
 * A copy da `/obras/`, transcrita de jsk.pt.
 *
 * Nada aqui foi reescrito. O que mudou, e só isto:
 *
 * - a numeração dos três blocos de serviço, que no site actual está
 *   `01., 01., 02.` — defeito #7. Não está aqui: sai do `index` onde a lista é
 *   percorrida, e num `map` esse erro passa a ser impossível;
 * - os `✔️` que abrem cada linha das listas deixaram de ser texto e passaram a
 *   ser o ícone `certo`. É marcação, não copy;
 * - a maiusculação a meio das frases é a do texto, não a do CSS: o tema antigo
 *   tinha `text-transform: capitalize` em todos os títulos.
 *
 * Os testemunhos do site actual **não estão aqui**, e é de propósito: são Lorem
 * Ipsum com personas de stock do template "Roofing" da Astra — `Anna Patricia`,
 * `John Allison`, `Alicia Potter`, `Edward B. Suarez` — debaixo de um cabeçalho
 * em inglês e agramatical, `Here's What Our Client Say About Us`. Defeitos #3 e
 * #4. Voltam no dia em que houver citações verdadeiras, com autorização de quem
 * as disse.
 *
 * O bloco `O Nosso Processo` também não está aqui: é byte a byte igual ao de
 * `/alarmes/` e vive em `lib/conteudo/comum.ts`.
 */

export const TITULO = "JSK Obras";

export const ENTRADA =
  "Transformamos espaços com qualidade, confiança e dedicação";

/**
 * A fotografia do herói.
 *
 * É a `Banner-Obras.jpeg` do cliente, e é a melhor fotografia que este site
 * tem: obra a acontecer, não obra acabada. O `alt` foi escrito depois de olhar
 * para o ficheiro, que é o que `docs/assets.md` pede.
 */
export const HEROI_IMAGEM = {
  src: "/obras/moradia-com-andaime.webp",
  alt: "Moradia branca de dois pisos com um andaime metálico montado ao longo da fachada, com as pranchas de trabalho colocadas em dois níveis.",
} as const;

export const SERVICOS = {
  titulo: "Os Nossos Serviços",

  intro: [
    "Na JSK Obras, ajudamos a transformar o seu espaço para que se adapte às suas necessidades e estilo.",
    "Seja uma renovação total ou apenas uma melhoria pontual, garantimos profissionalismo e atenção a cada detalhe.",
  ],

  /**
   * Os três blocos, com as vinte linhas do cliente.
   *
   * A ordem é a do site. Os títulos são também os que estão no cartão da
   * homepage (`SECTORES_DETALHE`), e é bom que continuem a bater certo: se um
   * dia divergirem, é aqui e lá que se vê.
   */
  blocos: [
    {
      titulo: "Transformações de Espaços",
      itens: [
        "Remodelação de cozinhas e casas de banho",
        "Reorganização e otimização de espaços interiores",
        "Substituição de portas e janelas",
        "Criação de espaços abertos (open space)",
        "Melhoria de isolamento térmico e acústico",
        "Instalação de armários e mobiliário por medida",
        "Atualização de sistemas de iluminação embutida",
      ],
    },
    {
      titulo: "Acabamentos e Revestimentos",
      itens: [
        "Pintura interior e exterior",
        "Aplicação de revestimentos (azulejos, pedra, madeira, etc.)",
        "Instalação de pavimentos (madeira, laminado, cerâmica, etc.)",
        "Colocação de tetos falsos e paredes divisórias",
        "Aplicação de papel de parede e vinis decorativos",
        "Restauro de superfícies antigas",
        "Tratamento e impermeabilização de paredes",
      ],
    },
    {
      titulo: "Instalações e Infraestruturas",
      itens: [
        "Instalações elétricas e de iluminação",
        "Instalações hidráulicas e de gás",
        "Sistemas de climatização e ventilação",
        "Instalação de painéis solares e sistemas de energia renovável",
        "Sistemas de aquecimento de água",
        "Instalação de redes de internet e telecomunicações",
      ],
    },
  ],
} as const;

/**
 * A cena do andaime.
 *
 * O título e a linha de abertura são escritos — não há nada em jsk.pt que
 * corresponda a esta cena, porque a cena não existe lá. Não descrevem serviço
 * nenhum nem afirmam facto nenhum sobre o negócio: dizem o que se está a ver.
 */
export const ANDAIME = {
  abertura: "O andaime sobe, o trabalho acontece, o andaime desce.",
  titulo: "O que fica é o espaço.",
  imagem: {
    src: "/obras/cozinha-acabada.jpg",
    alt: "Cozinha acabada, com armários brancos sem puxadores, bancada clara, pavimento de madeira e focos embutidos no teto.",
  },
} as const;

/**
 * A galeria.
 *
 * As quatro fotografias são **dois trabalhos**: uma casa (duas divisões) e uma
 * loja de animais (duas vistas). O site actual mostra-as sem legenda nenhuma,
 * ao contrário da galeria de `/alarmes/` — era o ponto 9 do
 * `docs/decisoes-pendentes.md`.
 *
 * As legendas abaixo escrevi-as eu, por decisão do Gonçalo, e obedecem a uma
 * regra: **só o que se vê na fotografia.** Sem nome de cliente, sem prazo, sem
 * área, sem orçamento — nada que seja uma afirmação sobre o negócio que eu não
 * possa verificar olhando para a imagem.
 */
export const PROJECTOS = {
  titulo: "Alguns dos nossos Projetos",
  intro:
    "Conheça alguns dos nossos projetos de remodelação e melhoria de espaços, realizados em residências e estabelecimentos comerciais.",

  itens: [
    {
      imagem: "/obras/cozinha-acabada.jpg",
      formato: "vertical",
      alt: "Cozinha em linha com armários brancos sem puxadores, bancada e costas claras, forno e micro-ondas encastrados em coluna, e pavimento de madeira clara.",
      legendas: ["Cozinha remodelada", "Mobiliário por medida"],
    },
    {
      imagem: "/obras/sala-aberta.jpg",
      formato: "vertical",
      alt: "Divisão contígua à cozinha, ampla e sem mobília, com paredes pintadas de branco, focos embutidos no teto e o mesmo pavimento de madeira.",
      legendas: ["Espaço aberto", "Iluminação embutida"],
    },
    {
      imagem: "/obras/loja-balcao.jpg",
      formato: "horizontal",
      alt: "Balcão de atendimento em madeira de pinho, com fita de iluminação por baixo do tampo, numa loja de animais com prateleiras ao fundo.",
      legendas: ["Balcão em madeira", "Iluminação integrada"],
    },
    {
      imagem: "/obras/loja-prateleiras.jpg",
      formato: "vertical",
      alt: "Corredor de uma loja de animais entre duas filas de gôndolas em madeira de pinho, com calhas de luz alinhadas no teto.",
      legendas: ["Gôndolas em madeira", "Calhas de luz alinhadas"],
    },
  ],
} as const satisfies {
  titulo: string;
  intro: string;
  itens: readonly {
    imagem: string;
    formato: "vertical" | "horizontal";
    alt: string;
    legendas: readonly string[];
  }[];
};
