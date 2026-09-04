/**
 * As galerias de projectos.
 *
 * O `alt` de cada fotografia está escrito à mão. No site antigo é gerado pelo
 * WordPress a partir do nome do ficheiro, o que produz coisas como
 * "camera preta", "akarme de incendio" e "roofing client 3" — que é o que quem
 * usa um leitor de ecrã ouve.
 *
 * As legendas são as do cliente. A galeria de `/obras/` não tem nenhumas — ver
 * docs/decisoes-pendentes.md #9.
 */
export type ProjetoGaleria = {
  imagem: string;
  alt: string;
  legendas: readonly string[];
};

export type Galeria = {
  titulo: string;
  intro: string;
  projetos: readonly ProjetoGaleria[];
};

export const GALERIA_ALARMES: Galeria = {
  titulo: "Alguns dos nossos Projetos",
  // O original diz "monitorização do sistemas de aiarme, realizados em
  // residencias" — três gralhas numa frase.
  intro:
    "Conheça alguns dos nossos projetos de instalação e monitorização de sistemas de alarme, realizados em residências e empresas.",
  projetos: [
    {
      imagem: "/alarmes/01-camara-exterior.webp",
      alt: "Câmara de videovigilância preta montada numa parede exterior",
      legendas: [
        "Câmara de Segurança com Exterior Robusto",
        "Acesso Remoto em Tempo Real",
      ],
    },
    {
      imagem: "/alarmes/02-camara-termica.webp",
      alt: "Câmara de segurança com sensor térmico instalada no exterior",
      legendas: [
        "Câmara de Segurança com Visão Térmica",
        "Acesso Remoto em Tempo Real",
        "Ideal para zonas com Baixa Visibilidade",
      ],
    },
    {
      imagem: "/alarmes/03-sensor-abertura.webp",
      alt: "Sensor magnético de abertura instalado no aro de uma porta",
      legendas: [
        "Sensor Magnético Discreto",
        "Instalação em Espaços Residenciais e Comerciais",
        "Compatível com Sistemas Remotos",
      ],
    },
    {
      imagem: "/alarmes/04-controlo-acessos.webp",
      alt: "Teclado de controlo de acessos com leitor biométrico junto a uma entrada",
      legendas: [
        "Sistema Inteligente de Controlo de Acessos",
        "Leitura Biométrica",
        "Interface Digital Moderna",
      ],
    },
    {
      imagem: "/alarmes/05-camara-interior.webp",
      alt: "Câmara de interior e sensor de movimento montados num tecto",
      legendas: [
        "Câmara de Segurança de Interior",
        "Sensores de movimento",
        "Monitorização Remota Contínua",
      ],
    },
    {
      imagem: "/alarmes/06-detecao-incendio.webp",
      alt: "Detetor de fumo e calor instalado num tecto",
      legendas: [
        "Deteção de Fumo e Calor",
        "Alerta Imediato em Caso de Incêndio",
        "Integração com Sistema de Alarme",
      ],
    },
  ],
};

export const GALERIA_OBRAS: Galeria = {
  titulo: "Alguns dos nossos Projetos",
  intro:
    "Conheça alguns dos nossos projetos de remodelação e melhoria de espaços, realizados em residências e estabelecimentos comerciais.",
  projetos: [
    {
      imagem: "/obras/01-cozinha.webp",
      alt: "Cozinha remodelada com armários por medida e bancada contínua",
      legendas: [],
    },
    {
      imagem: "/obras/02-cozinha.webp",
      alt: "Cozinha remodelada, vista da zona de refeições",
      legendas: [],
    },
    {
      imagem: "/obras/03-panda-pet.webp",
      alt: "Interior remodelado da loja Panda Pet, com prateleiras e iluminação nova",
      legendas: [],
    },
    {
      imagem: "/obras/04-panda-pet.webp",
      alt: "Zona de atendimento da loja Panda Pet depois da remodelação",
      legendas: [],
    },
  ],
};
