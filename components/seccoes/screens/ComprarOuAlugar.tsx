import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { COMPARACAO } from "@/lib/conteudo/screens";

type Opcao = (typeof COMPARACAO.opcoes)[number];

/**
 * Comprar vs alugar — as duas opções, uma contra a outra.
 *
 * É o único bloco do site que ajuda a decidir em vez de vender, e a primeira
 * versão desenhou-o como duas caixas gémeas lado a lado. Duas caixas iguais
 * não se comparam: lêem-se uma a seguir à outra. Por isso as opções passaram a
 * confrontar-se sobre um eixo.
 *
 * Três coisas, e nenhuma é enfeite:
 *
 * 1. **O eixo.** Um prumo com a chapa `VS` sentada nele. Reaproveita a classe
 *    `.prumo` do andaime da `/obras/` — nasce inteiro e desce com o scroll.
 * 2. **As colunas viram-se uma para a outra.** A da esquerda alinha à direita
 *    e leva o ícone à direita do texto; a da direita ao contrário. Deixam de
 *    ser duas listas paralelas e passam a ser dois lados de uma balança.
 * 3. **As linhas convergem.** Cada uma limpa-se na direcção do eixo, e o
 *    escalonamento por `--i` corre de cima a baixo em cada coluna, atravessando
 *    as vantagens e as desvantagens — é uma coluna a ser lida, não dois grupos.
 *
 * **Não é uma cena fixa, de propósito.** A parede que se monta, imediatamente
 * antes, encosta ao ecrã durante 300svh. Dois `pin` seguidos fazem a página
 * lutar com quem desce. Este bloco corre em `view()` por elemento.
 *
 * **Aqui corrige-se o defeito #9.** No site actual as desvantagens abrem com o
 * mesmo `✔️` verde das vantagens, o que faz uma lista de contras ler-se como
 * uma lista de prós — e num bloco cujo trabalho é comparar, isso desmonta o
 * bloco inteiro. Passam ao ícone `errado`, a `chumbo`, e não a vermelho: a
 * paleta tem seis valores e nenhum é esse. Um contra dito a cinzento continua
 * a ler-se como um contra.
 *
 * Os filetes que a primeira versão punha debaixo de cada cabeçalho saíram. Não
 * foi por gosto: o `.filete` fixa `transform-origin: 0 50%` e vive **fora** de
 * `@layer`, por isso uma utilitária `origin-right` do Tailwind nunca lhe
 * ganharia — regras fora de camada ganham sempre às de dentro. Ou levavam
 * classe própria, ou saíam. Com o eixo ao centro e as linhas a convergir já há
 * gesto que chegue.
 */
export function ComprarOuAlugar() {
  const [comprar, alugar] = COMPARACAO.opcoes;

  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
          {COMPARACAO.titulo}
        </h2>
        <p className="text-chumbo mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed">
          {COMPARACAO.intro}
        </p>

        {/* Duas notas de medida, as duas apanhadas no browser.

            A coluna do meio tem largura **fixa** e não `auto`: a chapa `VS` é
            posicionada em absoluto, não conta para a medida da coluna, e um
            `auto` dava-lhe zero — a chapa ficava a cavalo das duas listas.

            E o conjunto é mais estreito do que a `Medida`. Com colunas a `1fr`
            nos 76rem da página, o texto alinhado ao eixo aglomerava-se todo no
            meio e sobravam margens enormes dos dois lados: lia-se como duas
            listas encostadas por acidente, não como dois lados de uma balança.
            Os 54rem são o que põe as colunas a tocar o eixo com a mancha certa. */}
        <div className="mt-[var(--espaco-bloco)] mx-auto grid max-w-[54rem] gap-y-14 sm:grid-cols-[1fr_4rem_1fr] sm:gap-x-4">
          <Lado opcao={comprar} espelho />
          <Eixo />
          <Lado opcao={alugar} />
        </div>
      </Medida>
    </Seccao>
  );
}

/**
 * O eixo.
 *
 * O prumo é um filho de flex com `self-stretch`, e não um absoluto com
 * `-translate-x-1/2`. A razão é concreta: o `.prumo` declara `transform:
 * scaleY(1)` fora de `@layer`, e uma utilitária de `translate` escrita ao lado
 * seria descartada em silêncio — ficava a linha centrada por sorte num
 * browser e ao lado noutro. A chapa `VS` já pode usar `translate` à vontade,
 * porque não é um `.prumo`.
 */
function Eixo() {
  return (
    <div className="relative hidden justify-center sm:flex" aria-hidden="true">
      <span className="prumo bg-asfalto/25 w-0.5 self-stretch" />
      <span className="chapa font-titulo absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-2 text-[0.75rem] font-bold tracking-[0.12em]">
        VS
      </span>
    </div>
  );
}

/**
 * Um dos lados.
 *
 * O `espelho` governa três coisas ao mesmo tempo — o alinhamento, o lado do
 * ícone, e para que lado a linha se limpa — porque são a mesma decisão: este
 * lado está virado para o eixo ou não.
 *
 * O `--i` continua a correr de um grupo para o outro (`inicio`), o que faz a
 * coluna cascatear de cima a baixo em vez de recomeçar nas desvantagens.
 */
function Lado({ opcao, espelho = false }: { opcao: Opcao; espelho?: boolean }) {
  return (
    <section className={espelho ? "sm:text-end" : undefined}>
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
        espelho={espelho}
        inicio={0}
      />
      <Grupo
        cabecalho="Desvantagens"
        itens={opcao.desvantagens}
        icone="errado"
        cor="text-chumbo"
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
  espelho,
  inicio,
}: {
  cabecalho: string;
  itens: readonly string[];
  icone: "certo" | "errado";
  cor: string;
  espelho: boolean;
  inicio: number;
}) {
  return (
    <div className="mt-12">
      <p className="text-chumbo font-titulo text-[0.75rem] font-bold tracking-[0.14em] uppercase">
        {cabecalho}
      </p>

      <ul className="mt-3">
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
