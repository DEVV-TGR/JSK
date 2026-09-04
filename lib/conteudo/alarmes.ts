import type { NomeIcone } from "@/components/ui/Icone";

/**
 * A copy da `/alarmes/`, transcrita de jsk.pt.
 *
 * Nada aqui foi reescrito. O que mudou, e só isto:
 *
 * - as gralhas que estão numeradas em `docs/inventario-jsk-pt.md` — cada uma
 *   comentada no sítio onde foi corrigida;
 * - os espaços de largura zero (U+200B) que o WordPress deixou;
 * - a maiusculação a meio das frases é a do texto, não a do CSS: o tema antigo
 *   tinha `text-transform: capitalize` em todos os títulos, e era isso que
 *   escrevia `Sistemas De Videovigilância`.
 *
 * Os testemunhos do site actual **não estão aqui**, e é de propósito: são Lorem
 * Ipsum com personas de stock do template "Roofing" da Astra, debaixo de um
 * cabeçalho em inglês com erro de gramática. Defeitos #3 e #4. Voltam no dia em
 * que houver citações verdadeiras, com autorização de quem as disse — ver
 * `docs/brief-experiencia.md`.
 *
 * O bloco `O Nosso Processo` também não está aqui: é igual ao de `/obras/` e
 * vive em `lib/conteudo/comum.ts`.
 */

export const TITULO = "JSK Alarmes";

export const ENTRADA =
  "Soluções completas de segurança para proteger o que mais importa.";

export const SERVICOS = {
  titulo: "Os Nossos Serviços",

  /**
   * O segundo parágrafo acaba em dois pontos, e é a única razão pela qual esta
   * cena e a seguinte não podem trocar de ordem: `disponibilizamos os seguintes
   * serviços:` aponta para o painel que vem a seguir.
   */
  intro: [
    "Na JSK Alarmes, oferecemos soluções completas de segurança para proteger o que mais importa: a sua família, a sua casa ou o seu negócio.",
    "Com tecnologia de ponta e uma equipa de profissionais qualificados, disponibilizamos os seguintes serviços:",
  ],

  /* A numeração sai do `index`, como em `SECTORES_DETALHE` — defeito #7. */
  itens: [
    {
      titulo: "Instalação de Sistemas de Alarme",
      icone: "alarme",
      pontos: [
        "Alarmes Residenciais e Comerciais",
        "Sensores de Movimento",
        "Sensores de Abertura",
        "Alarmes Perimetrais",
      ],
    },
    {
      /* `Sistemas De Videovigilância​` no site actual: o `De` é o
         `text-transform: capitalize` do tema a reescrever a preposição, e havia
         um U+200B colado ao fim da palavra — defeito #11. */
      titulo: "Sistemas de Videovigilância",
      icone: "camara",
      pontos: [
        "Câmaras de Segurança",
        "Acesso Remoto",
        "Gravação de Imagens",
        "Sistemas Inteligentes",
      ],
    },
    {
      titulo: "Monitorização 24 Horas",
      icone: "relogio",
      pontos: [
        "Central de Monitorização",
        "Resposta Imediata",
        "Monitorização Remota",
      ],
    },
    {
      titulo: "Alarmes Contra Incêndios",
      icone: "fogo",
      pontos: [
        "Detetores de Fumo e Calor",
        "Integração com Sistemas de Extinção",
        "Alerta à Central",
      ],
    },
  ],
} as const satisfies {
  titulo: string;
  intro: readonly string[];
  itens: readonly { titulo: string; icone: NomeIcone; pontos: readonly string[] }[];
};

/**
 * A galeria.
 *
 * As seis fotografias são as do site actual, importadas por
 * `npm run assets` — ver `scripts/importar-assets.mjs` e `docs/assets.md`.
 *
 * As **legendas** são verbatim do cliente. O **`alt`** não: é escrito de raiz,
 * depois de olhar para cada fotografia. O site antigo tem alt derivado do nome
 * do ficheiro — `camera preta`, `akarme de incendio` — que descreve o ficheiro
 * e não a imagem, e é o defeito #20. Os dois textos fazem trabalhos diferentes:
 * a legenda vende, o `alt` descreve para quem não vê.
 */
export const PROJECTOS = {
  titulo: "Alguns dos nossos Projetos",

  /* Verbatim, menos três gralhas do defeito #8: `do sistemas` → `dos sistemas`,
     `aiarme` → `alarme`, `residencias` → `residências`. */
  intro:
    "Conheça alguns dos nossos projetos de instalação e monitorização dos sistemas de alarme, realizados em residências e empresas.",

  itens: [
    {
      imagem: "/projectos/camara-preta.jpg",
      alt: "Câmara de vigilância preta, de corpo alongado, fixada por um suporte articulado a uma parede exterior, ao abrigo de um beirado de madeira.",
      legendas: [
        "Câmara de Segurança com Exterior Robusto",
        "Acesso Remoto em Tempo Real",
      ],
    },
    {
      imagem: "/projectos/camara-termica.jpg",
      alt: "Câmara branca de duas lentes — uma óptica e uma térmica — instalada sob uma cobertura de madeira, numa fachada azul.",
      legendas: [
        "Câmara de Segurança com Visão Térmica",
        "Acesso Remoto em Tempo Real",
        "Ideal para zonas com Baixa Visibilidade",
      ],
    },
    {
      imagem: "/projectos/sensores-de-abertura.jpg",
      alt: "Sensor magnético de abertura, em duas peças brancas encostadas uma à outra, montado no aro de uma porta de madeira.",
      legendas: [
        "Sensor Magnético Discreto",
        "Instalação em Espaços Residenciais e Comerciais",
        "Compatível com Sistemas Remotos",
      ],
    },
    {
      imagem: "/projectos/teclado.jpg",
      alt: "Teclado de controlo de acessos numa parede branca, com ecrã a mostrar as horas, teclas numéricas retroiluminadas e leitor de impressão digital.",
      legendas: [
        "Sistema Inteligente de Controlo de Acessos",
        "Leitura Biométrica",
        "Interface Digital Moderna",
      ],
    },
    {
      imagem: "/projectos/camara-e-sensor.jpg",
      alt: "Câmara dome branca no tecto de uma divisão, com um sensor de movimento instalado logo abaixo, no canto da parede.",
      legendas: [
        "Câmara de Segurança de Interior",
        "Sensores de movimento",
        "Monitorização Remota Contínua",
      ],
    },
    {
      imagem: "/projectos/alarme-de-incendio.jpg",
      alt: "Detetor de fumo e calor, redondo e branco, montado num tecto liso.",
      legendas: [
        "Deteção de Fumo e Calor",
        "Alerta Imediato em Caso de Incêndio",
        "Integração com Sistema de Alarme",
      ],
    },
  ],
} as const;
