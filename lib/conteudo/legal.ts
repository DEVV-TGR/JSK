import { site } from "@/lib/site";

/**
 * Os Termos e Condições e a Política de Privacidade.
 *
 * Texto legal. **Não se reescreve, não se resume, não se moderniza.** As
 * secções estão numeradas a partir do índice, como no resto do site, mas as
 * palavras são as do cliente.
 *
 * Duas coisas por resolver, ambas em docs/decisoes-pendentes.md:
 *
 * - Os Termos dizem aplicar-se "nas áreas de alarmes, obras e painéis
 *   publicitários" e enumeram só JSK Alarmes, JSK Obras e JSK Screens. A JSK
 *   Web, que é um dos quatro sectores do site, não é mencionada (#10).
 * - A Política diz que se recolhem cookies e endereços IP. Este site não põe
 *   um único cookie e não tem analytics nenhum. O texto descreve uma recolha
 *   que não existe (#7).
 */
export type SeccaoLegal = {
  titulo: string;
  paragrafos: readonly string[];
  /** Itens de lista, a seguir aos parágrafos. */
  lista?: readonly string[];
};

export type PaginaLegal = {
  titulo: string;
  subtitulo: string;
  abertura: string;
  seccoes: readonly SeccaoLegal[];
};

export const TERMOS_E_CONDICOES: PaginaLegal = {
  titulo: "Termos e Condições",
  subtitulo:
    "Regulamento aplicável ao uso do site e aos serviços prestados pela JSK nas áreas de alarmes, obras e painéis publicitários.",
  abertura:
    "Estes Termos e Condições regulam a utilização do site da JSK e a prestação dos serviços oferecidos pela empresa, que atua nos setores JSK Alarmes, JSK Obras e JSK Screens. Ao aceder ao nosso site ou contratar os nossos serviços, o utilizador declara que concorda integralmente com as disposições aqui estabelecidas.",
  seccoes: [
    {
      titulo: "Definições",
      paragrafos: [
        "JSK: Empresa que presta serviços de instalação e manutenção de sistemas de segurança eletrónica (JSK Alarmes), obras e remodelações (JSK Obras) e fornecimento de painéis publicitários (JSK Screens).",
        "Serviços: Incluem, mas não se limitam a:",
      ],
      lista: [
        "Instalação e manutenção de sistemas de segurança.",
        "Execução de obras, remodelações e manutenção de espaços.",
        "Fornecimento, instalação e gestão de painéis publicitários.",
      ],
    },
    {
      titulo: "Acesso ao Site",
      paragrafos: [
        "A JSK concede ao utilizador uma licença limitada, não exclusiva e intransmissível para aceder e utilizar o site apenas para fins informativos e legítimos. É proibida qualquer utilização do site para atividades ilegais, difamatórias, fraudulentas ou que comprometam o seu funcionamento.",
      ],
    },
    {
      titulo: "Prestação dos Serviços",
      paragrafos: [
        "A JSK compromete-se a fornecer serviços com profissionalismo e qualidade, respeitando prazos e especificações acordados com cada cliente.",
        "O cliente deve fornecer todas as informações e materiais necessários à execução do trabalho dentro dos prazos estabelecidos.",
      ],
    },
    {
      titulo: "Propriedade Intelectual",
      paragrafos: [
        "Todos os conteúdos presentes no site, incluindo textos, imagens, logótipos e marcas, são propriedade da JSK ou usados com autorização dos respetivos titulares, estando protegidos por direitos de autor e propriedade industrial. É proibida a reprodução, modificação ou distribuição sem autorização prévia.",
      ],
    },
    {
      titulo: "Preços e Pagamentos",
      paragrafos: [
        "Os preços dos serviços são apresentados mediante orçamento personalizado.",
        "O pagamento poderá ser realizado em fases, conforme estipulado no contrato.",
        "O não pagamento dentro dos prazos estabelecidos poderá resultar na suspensão ou cancelamento do serviço.",
      ],
    },
    {
      titulo: "Garantias e Responsabilidade",
      paragrafos: [
        "Todos os serviços e produtos fornecidos pela JSK estão abrangidos pela garantia legal aplicável.",
        "A JSK não se responsabiliza por danos resultantes de uso indevido ou por incumprimento das instruções fornecidas.",
      ],
    },
    {
      titulo: "Cancelamentos e Devoluções",
      paragrafos: [
        "O cliente poderá cancelar um serviço antes do início da sua execução, salvo se já tiverem sido incorridos custos.",
        "Produtos personalizados ou já instalados não poderão ser devolvidos, exceto em caso de defeito comprovado.",
      ],
    },
    {
      titulo: "Alterações aos Termos e Condições",
      paragrafos: [
        "A JSK reserva-se o direito de alterar estes Termos e Condições a qualquer momento, publicando as alterações no site.",
      ],
    },
    {
      titulo: "Lei Aplicável e Foro Competente",
      paragrafos: [
        "Estes Termos e Condições regem-se pela lei portuguesa.",
        "Para a resolução de qualquer litígio será competente o tribunal da comarca da sede da JSK, salvo disposição legal em contrário.",
      ],
    },
  ],
};

export const POLITICA_DE_PRIVACIDADE: PaginaLegal = {
  titulo: "Política de Privacidade",
  subtitulo:
    "Como a JSK recolhe, utiliza e protege as informações pessoais dos seus clientes e visitantes, em conformidade com o RGPD.",
  abertura:
    "A JSK respeita a privacidade dos seus clientes e visitantes, comprometendo-se a proteger os seus dados pessoais em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD). Ao utilizar o nosso site ou fornecer informações, o utilizador consente com a recolha e tratamento dos seus dados nos termos desta política.",
  seccoes: [
    {
      titulo: "Recolha de Dados",
      paragrafos: [
        "Podemos recolher dados de identificação (nome, NIF, empresa), dados de contacto (morada, telefone, email), informações contratuais e de faturação, bem como dados técnicos de navegação (cookies, endereço IP).",
      ],
    },
    {
      titulo: "Finalidade do Tratamento",
      paragrafos: ["Os dados recolhidos destinam-se a:"],
      lista: [
        "Prestação e gestão dos serviços contratados.",
        "Comunicação de propostas, orçamentos e informações relevantes.",
        "Cumprimento de obrigações legais e fiscais.",
        "Divulgação de campanhas promocionais, quando autorizado pelo utilizador.",
      ],
    },
    {
      titulo: "Partilha de Dados",
      paragrafos: [
        "Os dados poderão ser partilhados com entidades públicas quando exigido por lei, bem como com fornecedores e parceiros que colaboram na execução dos serviços, assegurando que estes cumprem as normas de proteção de dados.",
      ],
    },
    {
      titulo: "Conservação dos Dados",
      paragrafos: [
        "Os dados serão guardados pelo período necessário para cumprir as finalidades para que foram recolhidos, ou enquanto existir obrigação legal de retenção.",
      ],
    },
    {
      titulo: "Direitos dos Titulares",
      paragrafos: [
        // O original acaba em "contactando-nos através de [email de contacto]" —
        // o marcador nunca foi preenchido. Publicá-lo como está seria pior do
        // que o corrigir: o texto legal ficaria a apontar para lado nenhum.
        // Fica ligado ao `site.email`, que é a mesma morada que o rodapé e a
        // página de contactos mostram, e que muda num sítio só.
        `O utilizador pode solicitar, a qualquer momento, o acesso, retificação, apagamento ou portabilidade dos seus dados, bem como limitar ou opor-se ao seu tratamento, contactando-nos através de ${site.email}.`,
      ],
    },
    {
      titulo: "Segurança",
      paragrafos: [
        "A JSK implementa medidas de segurança adequadas para proteger os dados pessoais contra acessos não autorizados, perda ou destruição.",
      ],
    },
    {
      titulo: "Alterações à Política de Privacidade",
      paragrafos: [
        "A JSK reserva-se o direito de modificar esta política a qualquer momento, publicando a versão atualizada no site.",
      ],
    },
  ],
};
