/**
 * A copy da `/screens-led/`, transcrita de jsk.pt.
 *
 * A transcrição foi feita do HTML da página e não do `docs/inventario-jsk-pt.md`
 * — o inventário é fonte secundária e já passou por markdown. Nada aqui foi
 * reescrito. O que mudou, e só isto:
 *
 * - `Eficiênciae Durabilidade` passou a `Eficiência e Durabilidade`. Falta um
 *   espaço, e está na lista de defeitos (#8);
 * - as **desvantagens** deixaram de levar o mesmo `✔️` verde das vantagens —
 *   defeito #9. Passam ao ícone `errado`. Ver a nota em `COMPARACAO`;
 * - os `✔️` que abriam cada linha deixaram de ser texto e passaram a ser o
 *   ícone `certo`, como já tinha acontecido na `/obras/`. É marcação, não copy;
 * - a numeração, onde a há, sai do `index` do `map` e não da copy.
 *
 * **Duas maiusculações ficam como estão, e é de propósito.** O título diz
 * `Aluguer e Venda Screens Led` e um dos blocos diz `Ecrãs Para interior`,
 * enquanto o corpo do texto escreve `LED` em maiúsculas. A explicação fácil
 * seria o `text-transform: capitalize` que o tema antigo tinha em todos os
 * títulos — mas não é isso: na mesma página está `Comprar vs alugar`, com o
 * `alugar` minúsculo, o que prova que o `capitalize` não chega aqui. Ou seja,
 * `Led` e `Para interior` são mesmo o que está escrito.
 *
 * É texto do cliente. Fica, e a pergunta fica feita.
 *
 * Esta página **não tem** processo, testemunhos nem galeria — ao contrário da
 * `/alarmes/` e da `/obras/`. Não é esquecimento: é o que lá está, e
 * acrescentá-los seria escrever conteúdo novo sobre o negócio de outra pessoa.
 */

export const TITULO = "JSK Screens";

export const ENTRADA =
  "Não deixe a sua marca para amanhã: anuncie hoje com os screens Led da JSK!";

/**
 * A fotografia do herói.
 *
 * É a `PHOTO-2025-03-21-16-07-21.webp`, a que o cliente serve hoje nesta
 * página — a montra da Panda Pet, que é a **mesma loja** da galeria da
 * `/obras/`, desta vez fotografada da rua.
 *
 * ⚠️ **Não há um ecrã LED nesta fotografia.** O que se vê é sinalética
 * impressa: um letreiro corrido e vinis nas montras. Ficou assim por decisão
 * do Gonçalo, a 6 de Setembro de 2026, com o argumento de que é trabalho real
 * da JSK num espaço comercial — que é o primeiro item da lista de aplicações
 * de interior — e de que as páginas irmãs abrem todas com fotografia.
 *
 * O `alt` foi escrito depois de olhar para o ficheiro, como pede
 * `docs/assets.md`, e descreve o que lá está: vinis e letreiro. Não promete um
 * ecrã que ali não aparece.
 */
export const HEROI_IMAGEM = {
  src: "/screens/montra-panda-pet.webp",
  alt: "Fachada de uma loja de animais ao nível da rua, com um letreiro corrido onde se lê BRINQUEDOS e montras revestidas a vinil impresso com cães e gatos.",
} as const;

export const INTRO = {
  titulo: "Aluguer e Venda Screens Led",

  texto:
    "Os screen LED são uma ferramenta moderna e eficaz de marketing, que oferece comunicação visual de alto impacto. Destacam-se pela versatilidade, visibilidade e capacidade de exibir conteúdos personalizados, funcionando bem em ambientes internos e externos, e ajudando marcas a sobressair no mercado.",

  /* Os três do site. O segundo espaço de `Eficiência e Durabilidade` é a
     correcção do defeito #8 — no site actual lê-se `Eficiênciae`. */
  selos: ["Alta Visibilidade", "Conteúdo Dinâmico", "Eficiência e Durabilidade"],

  /* A fotografia de produto do cliente: um módulo inclinado à frente, a parede
     de módulos atrás, e um terceiro com a tampa aberta a mostrar a electrónica.
     São 247×229 e não há maior — por isso é um apoio ao texto e não uma
     imagem de cena. É também a prova física do que a cena seguinte monta. */
  imagem: {
    src: "/screens/modulos.webp",
    alt: "Três módulos de ecrã LED: um assente ao alto com a matriz de píxeis à vista, outro inclinado à frente, e um terceiro com a tampa traseira retirada a mostrar a placa receptora e a cablagem.",
  },
} as const;

/**
 * A cena do pico: a parede que se monta.
 *
 * Como a `ANDAIME` da `/obras/`, o título e a linha de abertura são escritos —
 * não há nada em jsk.pt que lhes corresponda, porque a cena não existe lá.
 * E, como lá, não descrevem serviço nenhum nem afirmam facto nenhum sobre o
 * negócio: dizem o que se está a ver. Que uma parede LED é feita de módulos
 * está na fotografia de produto do próprio cliente, logo acima.
 *
 * O vídeo é o do cliente, tal e qual: uma fita LED da JSK acesa de noite, com
 * texto amarelo a correr. Seis segundos e oito décimas, em ciclo.
 *
 * ⚠️ O vídeo é uma **fita** larga e baixa filmada de lado, e a parede desta
 * cena é 16:9 — que é o formato do ficheiro, não o do ecrã que ele mostra.
 * Um plano filmado de propósito, de frente e a encher o quadro, era melhor.
 * Fica dito para quando houver.
 */
export const PAREDE = {
  abertura: "Uma parede de LED não chega inteira. Chega em módulos.",
  titulo: "O que fica é a sua mensagem.",

  video: {
    src: "/screens/parede.mp4",
    poster: "/screens/parede-poster.webp",
    /* Um `<video>` decorativo não leva legenda, mas leva descrição: quem não o
       vê tem de saber o que ele mostra. */
    descricao:
      "Ecrã LED da JSK montado ao comprimento de uma mesa, aceso num salão às escuras, com uma frase a passar em letras escuras sobre fundo amarelo.",
  },

  /* O estado, no fim — como o `estado` da casa da homepage. Verbatim do cartão
     do sector, em `lib/conteudo/sectores.ts`. */
  estado: "Aluguer e Venda de Screens LED",
} as const;

/**
 * Comprar vs alugar.
 *
 * O bloco central da página, e o que a distingue das irmãs: não é um catálogo,
 * é um guia de decisão.
 *
 * **O defeito #9 corrige-se aqui.** No site actual as *desvantagens* abrem com
 * o mesmo `✔️` verde das vantagens, o que faz uma lista de contras ler-se como
 * uma lista de prós. Passam ao ícone `errado`.
 *
 * A cor das desvantagens é `chumbo`, e não vermelho: a paleta do site tem seis
 * valores e nenhum deles é vermelho. Acrescentar um sétimo por causa de dois
 * blocos partia o sistema — e um contra dito a cinzento continua a ler-se como
 * um contra.
 */
export const COMPARACAO = {
  titulo: "Comprar vs alugar",

  intro:
    "A escolha entre comprar ou alugar um screen LED depende da frequência com que realiza eventos e do seu orçamento. Se organiza eventos regularmente e está à procura de uma solução a longo prazo, a compra pode ser a melhor opção. No entanto, se os seus eventos forem esporádicos ou se preferir não investir inicialmente, o aluguer oferece flexibilidade e menor custo imediato. Na JSK, ajudamos a analisar as suas necessidades para tomar a melhor decisão.",

  opcoes: [
    {
      titulo: "Comprar",
      vantagens: [
        "Investimento a longo prazo",
        "Recuperação do investimento",
        "Personalização e flexibilidade",
        "Manutenção e controle",
      ],
      desvantagens: [
        "Alto custo inicial",
        "Custos de manutenção e armazenamento",
      ],
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
  ],
} as const satisfies {
  titulo: string;
  intro: string;
  opcoes: readonly {
    titulo: string;
    vantagens: readonly string[];
    desvantagens: readonly string[];
  }[];
};

/**
 * Interior e exterior.
 *
 * `Ecrãs Para interior` está assim no site — com o `Para` em maiúscula e o
 * `interior` em minúscula, ao contrário do `Ecrãs Para Exterior` logo a seguir.
 * Ver a nota do cabeçalho: não é o CSS, é o texto.
 */
export const APLICACOES = {
  titulo: "Ecrãs LED: Soluções para Interior e Exterior",

  blocos: [
    {
      titulo: "Ecrãs Para interior",
      itens: ["Espaços comerciais", "Espaços corporativos", "Feiras e eventos"],
    },
    {
      titulo: "Ecrãs Para Exterior",
      itens: ["Outdoors", "Fachadas", "Feiras e eventos"],
    },
  ],
} as const satisfies {
  titulo: string;
  blocos: readonly { titulo: string; itens: readonly string[] }[];
};
