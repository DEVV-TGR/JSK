import type { NomeIcone } from "@/components/ui/Icone";

/**
 * Os serviços de cada sector.
 *
 * ⚠️ O número de cada bloco **não está aqui** — é gerado a partir do índice na
 * altura de o mostrar. É a correcção do defeito #7: no site antigo os três
 * blocos de `/obras/` estão numerados `01.`, `01.`, `02.`, porque cada número
 * foi escrito à mão dentro do seu widget. Com o índice a mandar, esse erro
 * deixa de ser possível.
 */
export type Servico = {
  titulo: string;
  itens: readonly string[];
};

export type BlocoServicos = {
  titulo: string;
  /** Cada string é um parágrafo. */
  intro: readonly string[];
  servicos: readonly Servico[];
};

export const SERVICOS_ALARMES: BlocoServicos = {
  titulo: "Os Nossos Serviços",
  intro: [
    "Na JSK Alarmes, oferecemos soluções completas de segurança para proteger o que mais importa: a sua família, a sua casa ou o seu negócio.",
    "Com tecnologia de ponta e uma equipa de profissionais qualificados, disponibilizamos os seguintes serviços:",
  ],
  servicos: [
    {
      titulo: "Instalação de Sistemas de Alarme",
      itens: [
        "Alarmes Residenciais e Comerciais",
        "Sensores de Movimento",
        "Sensores de Abertura",
        "Alarmes Perimetrais",
      ],
    },
    {
      titulo: "Sistemas de Videovigilância",
      itens: [
        "Câmaras de Segurança",
        "Acesso Remoto",
        "Gravação de Imagens",
        "Sistemas Inteligentes",
      ],
    },
    {
      titulo: "Monitorização 24 Horas",
      itens: [
        "Central de Monitorização",
        "Resposta Imediata",
        "Monitorização Remota",
      ],
    },
    {
      titulo: "Alarmes Contra Incêndios",
      itens: [
        "Detetores de Fumo e Calor",
        "Integração com Sistemas de Extinção",
        "Alerta à Central",
      ],
    },
  ],
};

export const SERVICOS_OBRAS: BlocoServicos = {
  titulo: "Os Nossos Serviços",
  intro: [
    "Na JSK Obras, ajudamos a transformar o seu espaço para que se adapte às suas necessidades e estilo.",
    "Seja uma renovação total ou apenas uma melhoria pontual, garantimos profissionalismo e atenção a cada detalhe.",
  ],
  servicos: [
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
};

/** /web/ — três cartões com ícone, não uma lista. */
export type CartaoServico = {
  icone: NomeIcone;
  titulo: string;
  descricao: string;
};

export const SERVICOS_WEB: readonly CartaoServico[] = [
  {
    icone: "paleta",
    titulo: "Web Design",
    descricao:
      "Criamos sites personalizados que refletem a identidade da sua marca e destacam o seu negócio.",
  },
  {
    icone: "alvo",
    titulo: "Foco em Resultados",
    descricao:
      "Transformamos visitantes em clientes através de design estratégico e experiência otimizada.",
  },
  {
    icone: "olho",
    titulo: "Identidade Visual",
    descricao:
      "Desenvolvemos identidades de marca únicas e coerentes para destacar o seu negócio.",
  },
];
