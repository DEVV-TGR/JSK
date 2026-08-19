/**
 * Comprar ou alugar um screen LED — /screens-led/.
 *
 * ⚠️ As desvantagens estão separadas das vantagens, e é o ponto todo deste
 * ficheiro. No site antigo as duas listas usam o mesmo ✔️ verde, o que faz o
 * bloco dizer exactamente o contrário do que quer dizer: quem o lê depressa
 * conta oito razões para alugar quando três delas são razões para não o fazer.
 */
export type ColunaComparacao = {
  titulo: string;
  vantagens: readonly string[];
  desvantagens: readonly string[];
};

export const TITULO_COMPARACAO = "Comprar vs Alugar";

export const INTRO_COMPARACAO =
  "A escolha entre comprar ou alugar um screen LED depende da frequência com que realiza eventos e do seu orçamento. Se organiza eventos regularmente e está à procura de uma solução a longo prazo, a compra pode ser a melhor opção. No entanto, se os seus eventos forem esporádicos ou se preferir não investir inicialmente, o aluguer oferece flexibilidade e menor custo imediato. Na JSK, ajudamos a analisar as suas necessidades para tomar a melhor decisão.";

export const COMPARACAO: readonly ColunaComparacao[] = [
  {
    titulo: "Comprar",
    vantagens: [
      "Investimento a longo prazo",
      "Recuperação do investimento",
      "Personalização e flexibilidade",
      "Manutenção e controle",
    ],
    desvantagens: ["Alto custo inicial", "Custos de manutenção e armazenamento"],
  },
  {
    titulo: "Alugar",
    vantagens: [
      "Custo inicial mais baixo",
      "Sem preocupação com manutenção",
      "Adequação a eventos pontuais",
      "Variedade de opções",
    ],
    desvantagens: [
      "Custo contínuo",
      "Limitações na personalização",
      "Dependência externa",
    ],
  },
];

/** Onde é que um ecrã LED entra. */
export type Aplicacao = {
  titulo: string;
  itens: readonly string[];
};

export const TITULO_APLICACOES = "Ecrãs LED: Soluções para Interior e Exterior";

export const APLICACOES: readonly Aplicacao[] = [
  {
    titulo: "Ecrãs para Interior",
    itens: ["Espaços comerciais", "Espaços corporativos", "Feiras e eventos"],
  },
  {
    titulo: "Ecrãs para Exterior",
    itens: ["Outdoors", "Fachadas", "Feiras e eventos"],
  },
];
