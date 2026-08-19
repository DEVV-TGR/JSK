/**
 * Como a JSK trabalha, em quatro passos.
 *
 * Um array só, consumido por `/alarmes/` e por `/obras/`. No site antigo este
 * bloco está escrito duas vezes — as duas páginas têm o mesmo texto colado, e
 * hoje ainda coincidem byte a byte. Só que nada garante que continuem a
 * coincidir: basta alguém corrigir uma vírgula numa delas.
 */
export type PassoProcesso = {
  titulo: string;
  descricao: string;
};

export const PROCESSO: readonly PassoProcesso[] = [
  {
    titulo: "Consulta",
    descricao:
      "Trabalhamos consigo para perceber as suas necessidades e avaliar a melhor solução.",
  },
  {
    titulo: "Orçamento",
    descricao: "Apresentamos um orçamento claro e ajustado ao seu projeto.",
  },
  {
    titulo: "Instalação",
    descricao: "Executamos o serviço com rapidez, segurança e qualidade.",
  },
  {
    titulo: "Inspeção",
    descricao: "Verificamos todos os detalhes para garantir o funcionamento ideal.",
  },
];

export const TITULO_PROCESSO = "O Nosso Processo";
