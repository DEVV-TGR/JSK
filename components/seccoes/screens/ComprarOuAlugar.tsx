import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { COMPARACAO } from "@/lib/conteudo/screens";

type Opcao = (typeof COMPARACAO.opcoes)[number];

/**
 * Comprar vs alugar — a cena partida em dois terrenos.
 *
 * Este bloco já foi duas coisas erradas antes desta. Fica escrito porque o
 * terceiro desenho só se percebe contra os dois primeiros:
 *
 * 1. **Duas caixas gémeas lado a lado.** Duas caixas iguais não se comparam,
 *    lêem-se uma a seguir à outra.
 * 2. **Um eixo ao centro, tudo em `papel`.** Melhor de ideia e pior de facto:
 *    o conjunto ficou centrado a 54rem enquanto o título e a entrada ficaram
 *    encostados à esquerda numa coluna estreita — duas margens diferentes na
 *    mesma secção — e o lado esquerdo, alinhado ao eixo, deixava um vazio
 *    branco enorme. Num site que é todo terrenos, chapas e cortes duros, um
 *    bloco branco e fino não pertence.
 *
 * **O que estava errado nos dois: um terreno só.** A gramática deste site diz
 * que cada cena assenta no seu terreno e que entre terrenos há corte, nunca
 * interpolação. Duas opções que se confrontam são duas cenas, não uma. Por
 * isso a metade do `Comprar` é asfalto e a do `Alugar` é papel, de bordo a
 * bordo, e o corte ao meio é a linha divisória — não é preciso desenhar
 * nenhuma. A chapa `VS` senta-se em cima dele.
 *
 * Dois gestos de scroll, e o primeiro é o novo:
 *
 * - **O terreno chega.** A metade escura entra por um `clip-path` da esquerda
 *   para a direita: a cena começa toda clara e o lado do `Comprar` toma o seu
 *   chão. É o corte a acontecer à frente de quem desce.
 * - **As linhas convergem.** Cada uma limpa-se na direcção do corte, com o
 *   `--i` a correr de cima a baixo em cada coluna e a atravessar as vantagens
 *   e as desvantagens — é uma coluna a ser lida, não dois grupos.
 *
 * **Não é cena fixa, de propósito:** a parede que se monta, logo antes, já
 * encosta ao ecrã durante 300svh, e dois `pin` seguidos põem a página a lutar
 * com quem desce.
 *
 * **Aqui corrige-se o defeito #9.** No site actual as desvantagens abrem com o
 * mesmo `✔️` verde das vantagens, o que faz uma lista de contras ler-se como
 * uma lista de prós. Passam ao ícone `errado`. A cor de cada lado é a que o
 * terreno pede — `grafite` sobre asfalto dá 5,7:1, `chumbo` sobre papel dá
 * 7,2:1 — e nenhuma delas é vermelha: a paleta tem seis valores e nenhum é
 * esse.
 */
export function ComprarOuAlugar() {
  const [comprar, alugar] = COMPARACAO.opcoes;

  return (
    <Seccao terreno="papel" fundo={false}>
      <Medida>
        <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
          {COMPARACAO.titulo}
        </h2>

        {/* A entrada ocupa a largura toda, em duas colunas. Numa coluna só
            ficava um parágrafo estreito com meia página vazia ao lado; numa
            linha só ficavam cem caracteres, que ninguém lê. Duas colunas de
            uns sessenta são a medida certa e enchem a `Medida`. */}
        <p className="text-guia text-chumbo mt-8 sm:columns-2 sm:gap-14">
          {COMPARACAO.intro}
        </p>
      </Medida>

      <div className="relative isolate mt-[var(--espaco-cena)]">
        {/* O terreno do `Comprar`, de bordo a bordo. Está em absoluto e não no
            fluxo porque tem de sangrar para fora da `Medida` até à aresta do
            ecrã — é meia cena, não meio cartão.

            Abaixo dos 640px as colunas empilham-se e não há metades: aí o
            terreno vai no próprio `<section>` do lado, e este desaparece. */}
        <div
          className="terreno bg-asfalto absolute inset-y-0 start-0 -z-10 hidden w-1/2 sm:block"
          aria-hidden="true"
        />

        <Medida>
          <div className="grid sm:grid-cols-2">
            <Lado opcao={comprar} espelho />
            <Lado opcao={alugar} />
          </div>
        </Medida>

        {/* A chapa senta-se em cima do corte. Não precisa de linha por baixo:
            a linha é o sítio onde os dois terrenos se encostam. */}
        <span
          className="chapa font-titulo absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 px-3.5 py-2.5 text-[0.8125rem] font-bold tracking-[0.12em] sm:block"
          aria-hidden="true"
        >
          VS
        </span>
      </div>
    </Seccao>
  );
}

/**
 * Um dos lados.
 *
 * O `espelho` governa quatro coisas ao mesmo tempo — o terreno, o alinhamento,
 * o lado do ícone e para onde a linha se limpa — porque são a mesma decisão:
 * este é o lado escuro, virado para o corte, ou o claro.
 *
 * O `--i` corre de um grupo para o outro (`inicio`), o que faz a coluna
 * cascatear de cima a baixo em vez de recomeçar nas desvantagens.
 */
function Lado({ opcao, espelho = false }: { opcao: Opcao; espelho?: boolean }) {
  return (
    <section
      className={
        espelho
          ? "bg-asfalto text-papel px-6 py-14 sm:bg-transparent sm:pe-14 sm:ps-0 sm:text-end sm:py-[var(--espaco-cena)]"
          : "text-asfalto px-6 py-14 sm:ps-14 sm:pe-0 sm:py-[var(--espaco-cena)]"
      }
    >
      <h3 className="text-bloco font-titulo font-extrabold">{opcao.titulo}</h3>
      <span
        className={`bg-amarelo mt-4 block h-1.5 w-20 ${espelho ? "sm:ms-auto" : ""}`}
        aria-hidden="true"
      />

      <Grupo
        cabecalho="Vantagens"
        itens={opcao.vantagens}
        icone="certo"
        cor="text-amarelo"
        corCabecalho={espelho ? "text-grafite" : "text-chumbo"}
        espelho={espelho}
        inicio={0}
      />
      <Grupo
        cabecalho="Desvantagens"
        itens={opcao.desvantagens}
        icone="errado"
        /* A cor do contra é a que cada terreno pede: `grafite` lê-se sobre
           asfalto a 5,7:1, `chumbo` lê-se sobre papel a 7,2:1. Trocá-las
           reprovava as duas. */
        cor={espelho ? "text-grafite" : "text-chumbo"}
        corCabecalho={espelho ? "text-grafite" : "text-chumbo"}
        espelho={espelho}
        inicio={opcao.vantagens.length}
      />
    </section>
  );
}

function Grupo({
  cabecalho,
  itens,
  icone,
  cor,
  corCabecalho,
  espelho,
  inicio,
}: {
  cabecalho: string;
  itens: readonly string[];
  icone: "certo" | "errado";
  cor: string;
  corCabecalho: string;
  espelho: boolean;
  inicio: number;
}) {
  return (
    <div className="mt-12">
      <p
        className={`${corCabecalho} font-titulo text-[0.75rem] font-bold tracking-[0.14em] uppercase`}
      >
        {cabecalho}
      </p>

      <ul className="mt-4">
        {itens.map((item, indice) => (
          <li
            key={item}
            className={`${
              espelho ? "compara-espelho sm:flex-row-reverse" : "compara"
            } flex items-baseline gap-3.5 py-2 text-[1.125rem] leading-snug`}
            style={{ "--i": inicio + indice } as React.CSSProperties}
          >
            <Icone
              nome={icone}
              className={`${cor} size-[1.125rem] shrink-0 translate-y-0.5 stroke-[2.5]`}
            />
            {/* O texto vai num `<span>` e não solto: um nó de texto nu vira um
                item de flex anónimo, e o `flex-row-reverse` do lado espelhado
                não o reordena de forma fiável. */}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
