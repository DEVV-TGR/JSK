import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { COMPARACAO } from "@/lib/conteudo/screens";

type Opcao = (typeof COMPARACAO.opcoes)[number];

/**
 * Comprar vs alugar — a cena que troca de opção.
 *
 * A secção encosta ao ecrã e o conteúdo troca com o scroll: primeiro o
 * `Comprar` em cheio sobre asfalto, depois o corte, e o `Alugar` em cheio
 * sobre papel. Uma opção de cada vez, ao tamanho todo.
 *
 * O corte é rápido de propósito — cada opção fica parada quase metade do
 * percurso e a troca acontece em 18%. A gramática deste site diz corte duro,
 * nunca interpolação, e uma limpeza lenta lia-se como dissolução.
 *
 * **É a segunda cena fixa da página, e isso é uma decisão do Gonçalo tomada
 * com o risco em cima da mesa.** A parede que se monta, imediatamente antes,
 * já encosta ao ecrã durante 300svh. Duas cenas fixas seguidas costumam fazer
 * a página lutar com quem desce — se um dia a `/screens-led/` parecer pesada a
 * meio, é aqui que se mexe, e a saída é esta cena deixar de ser fixa.
 *
 * **Abaixo de `lg` os dois painéis não se sobrepõem:** ficam um a seguir ao
 * outro no fluxo normal, cada um com o seu terreno de bordo a bordo. É também
 * o que um browser sem `animation-timeline` serve e o que quem pediu menos
 * movimento recebe — porque duas opções empilhadas e legíveis é o estado final
 * desta cena, e dois painéis sobrepostos com um a tapar o outro nunca poderia
 * ser. Mesma saída do `.painel` da `/alarmes/`, e pela mesma razão.
 *
 * **Aqui corrige-se o defeito #9.** No site actual as desvantagens abrem com o
 * mesmo `✔️` verde das vantagens, o que faz uma lista de contras ler-se como
 * uma lista de prós. Passam ao ícone `errado`, na cor que cada terreno pede —
 * `grafite` sobre asfalto dá 5,7:1, `chumbo` sobre papel dá 7,2:1 — e nenhuma
 * é vermelha: a paleta tem seis valores e nenhum é esse.
 */
export function ComprarOuAlugar() {
  const [comprar, alugar] = COMPARACAO.opcoes;

  return (
    <>
      <Seccao terreno="papel">
        <Medida>
          <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
            {COMPARACAO.titulo}
          </h2>

          {/* A entrada ocupa a largura toda, em duas colunas. Numa coluna só
              ficava um parágrafo estreito com meia página vazia ao lado; numa
              linha só ficavam cem caracteres, que ninguém lê. */}
          <p className="text-guia text-chumbo mt-8 sm:columns-2 sm:gap-14">
            {COMPARACAO.intro}
          </p>
        </Medida>
      </Seccao>

      {/* O fundo do contentor é o do primeiro painel: é o que se vê se a cena
          encostada alguma vez deixar uma aresta à mostra. */}
      <div className="troca bg-asfalto">
        <div className="troca-cena">
          <Painel opcao={comprar} escuro />
          <Painel opcao={alugar} corte />
        </div>
      </div>
    </>
  );
}

function Painel({
  opcao,
  escuro = false,
  corte = false,
}: {
  opcao: Opcao;
  escuro?: boolean;
  /** O painel que se limpa por cima do outro. Só o segundo o leva. */
  corte?: boolean;
}) {
  return (
    <article
      /* O `py` fica em todas as larguras, e **não** desligado num `lg:`.
         A primeira versão levava `lg:py-0` a contar com a cena fixa a centrar
         o conteúdo — mas o `lg:` é largura de ecrã e a cena fixa vive dentro
         de um `@supports`. Num ecrã largo sem `animation-timeline` os painéis
         empilham-se em fluxo **e** ficavam sem respiro: o último item do
         `Comprar` colado ao corte. Fixa, este espaçamento não custa nada — o
         conteúdo mais alto são uns 390px numa cena de 828. */
      className={`troca-painel ${corte ? "troca-corte" : ""} flex items-center py-[var(--espaco-cena)] ${
        escuro ? "bg-asfalto text-papel" : "bg-papel text-asfalto"
      }`}
    >
      <Medida className="w-full">
        <h3 className="text-cena font-titulo font-extrabold">{opcao.titulo}</h3>
        <span className="bg-amarelo mt-5 block h-1.5 w-24" aria-hidden="true" />

        <Grupo
          cabecalho="Vantagens"
          itens={opcao.vantagens}
          icone="certo"
          cor="text-amarelo"
          corCabecalho={escuro ? "text-grafite" : "text-chumbo"}
          inicio={0}
        />
        <Grupo
          cabecalho="Desvantagens"
          itens={opcao.desvantagens}
          icone="errado"
          /* A cor do contra é a que o terreno pede. Trocá-las reprovava as
             duas. */
          cor={escuro ? "text-grafite" : "text-chumbo"}
          corCabecalho={escuro ? "text-grafite" : "text-chumbo"}
          inicio={opcao.vantagens.length}
        />
      </Medida>
    </article>
  );
}

function Grupo({
  cabecalho,
  itens,
  icone,
  cor,
  corCabecalho,
  inicio,
}: {
  cabecalho: string;
  itens: readonly string[];
  icone: "certo" | "errado";
  cor: string;
  corCabecalho: string;
  inicio: number;
}) {
  return (
    <div className="mt-10 lg:mt-12">
      <p
        className={`${corCabecalho} font-titulo text-[0.75rem] font-bold tracking-[0.14em] uppercase`}
      >
        {cabecalho}
      </p>

      {/* Em duas colunas, e não numa lista alta e estreita: com um ecrã
          inteiro por opção, uma coluna só deixava metade da largura vazia. */}
      <ul className="mt-5 grid gap-x-14 gap-y-3.5 sm:grid-cols-2">
        {itens.map((item, indice) => (
          <li
            key={item}
            className="troca-item flex items-baseline gap-3.5 text-[1.125rem] leading-snug lg:text-[1.25rem]"
            style={{ "--i": inicio + indice } as React.CSSProperties}
          >
            <Icone
              nome={icone}
              className={`${cor} size-[1.125rem] shrink-0 translate-y-0.5 stroke-[2.5]`}
            />
            {/* O texto vai num `<span>` e não solto, para o `items-baseline`
                alinhar o ícone pela primeira linha e não pela caixa toda. */}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
