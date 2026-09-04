import type { NomeIcone } from "@/components/ui/Icone";

export type Diferenciador = {
  icone: NomeIcone;
  titulo: string;
  descricao: string;
};

/** Homepage — H2 "O que nos torna únicos?". Seis. */
export const O_QUE_NOS_TORNA_UNICOS: readonly Diferenciador[] = [
  {
    icone: "certificado",
    titulo: "Equipa Certificada",
    descricao:
      "A nossa equipa é experiente, certificada e está em constante formação.",
  },
  {
    icone: "raio",
    titulo: "Resposta Imediata",
    descricao:
      "Priorizamos a rapidez no contacto, orçamento e execução, porque sabemos que o seu tempo é valioso.",
  },
  {
    icone: "pessoas",
    titulo: "Atendimento Direto",
    descricao:
      "Soluções ajustadas às suas necessidades, com apoio próximo e profissional.",
  },
  {
    icone: "camadas",
    titulo: "Serviços Integrados",
    descricao:
      "Alarmes, obras e publicidade digital com soluções integradas num só parceiro.",
  },
  {
    icone: "chip",
    titulo: "Alta Tecnologia",
    descricao:
      "Usamos equipamentos modernos e fiáveis para garantir qualidade e eficiência.",
  },
  {
    icone: "estrela",
    titulo: "Foco na Qualidade",
    descricao:
      "Rigor em todo o processo — do planeamento à execução final — para garantir a sua total satisfação.",
  },
];

/**
 * /sobre-nos/ — H2 "O que nos distingue?". Três.
 *
 * O terceiro está escrito em minúsculas no site antigo ("compromisso") e
 * aparece capitalizado só porque o tema Astra aplica `text-transform` a todos
 * os títulos. Sem esse `text-transform`, ficaria em minúsculas — por isso está
 * corrigido aqui, que é onde devia ter estado desde o início.
 */
export const O_QUE_NOS_DISTINGUE: readonly Diferenciador[] = [
  {
    icone: "certificado",
    titulo: "Experiência",
    descricao:
      "Contamos com uma equipa experiente e qualificada, garantindo rigor, confiança e resultados duradouros com atenção ao detalhe.",
  },
  {
    icone: "chip",
    titulo: "Inovação",
    descricao:
      "Apostamos em tecnologia de ponta para oferecer soluções modernas, eficientes e fiáveis nas áreas de segurança, construção e publicidade.",
  },
  {
    icone: "estrela",
    titulo: "Compromisso",
    descricao:
      "Trabalhamos com dedicação e foco na qualidade para oferecer soluções personalizadas que superam as expectativas dos nossos clientes.",
  },
];
