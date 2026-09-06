import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { COMPARACAO } from "@/lib/conteudo/screens";

/**
 * Comprar vs alugar.
 *
 * O bloco que distingue esta página das irmãs: não vende, ajuda a decidir. Por
 * isso são duas colunas lado a lado, com o mesmo peso — e não uma recomendada
 * e outra em letra pequena.
 *
 * **Aqui corrige-se o defeito #9.** No site actual as desvantagens abrem com o
 * mesmo `✔️` verde das vantagens, o que faz uma lista de contras ler-se como
 * uma lista de prós — e num bloco cujo trabalho é comparar, isso desmonta o
 * bloco inteiro. Passam ao ícone `errado`, a `chumbo`.
 *
 * A `chumbo` e não a vermelho: a paleta tem seis valores e nenhum é vermelho.
 * Um sétimo por causa de dois blocos partia o sistema, e um contra dito a
 * cinzento continua a ler-se como um contra.
 */
export function ComprarOuAlugar() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
          {COMPARACAO.titulo}
        </h2>
        <p className="text-chumbo mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed">
          {COMPARACAO.intro}
        </p>

        <div className="mt-[var(--espaco-bloco)] grid gap-8 sm:grid-cols-2">
          {COMPARACAO.opcoes.map((opcao, indice) => (
            <article
              key={opcao.titulo}
              className="entra border-asfalto flex flex-col border-2"
              style={{ "--i": indice } as React.CSSProperties}
            >
              <h3 className="bg-asfalto text-papel font-titulo px-5 py-3.5 text-[0.9375rem] font-bold tracking-[0.16em] uppercase">
                {opcao.titulo}
              </h3>

              <div className="flex flex-1 flex-col gap-6 p-5 sm:p-6">
                <Lista
                  cabecalho="Vantagens"
                  itens={opcao.vantagens}
                  icone="certo"
                  cor="text-amarelo"
                />
                <Lista
                  cabecalho="Desvantagens"
                  itens={opcao.desvantagens}
                  icone="errado"
                  cor="text-chumbo"
                />
              </div>
            </article>
          ))}
        </div>
      </Medida>
    </Seccao>
  );
}

function Lista({
  cabecalho,
  itens,
  icone,
  cor,
}: {
  cabecalho: string;
  itens: readonly string[];
  icone: "certo" | "errado";
  cor: string;
}) {
  return (
    <div>
      {/* O filete risca-se por baixo do cabeçalho ao entrar, como as linhas da
          folha de verificações dos diferenciais. É o mesmo instrumento a
          descer a folha — o gesto já existe no site e não se inventa outro. */}
      <p className="font-titulo text-[0.75rem] font-bold tracking-[0.14em] uppercase">
        {cabecalho}
      </p>
      <span
        className="filete bg-asfalto mt-2 mb-3 block h-[2px] origin-left"
        aria-hidden="true"
      />

      <ul>
        {itens.map((item) => (
          <li
            key={item}
            className="flex items-baseline gap-3 py-1 text-[0.9375rem] leading-snug"
          >
            <Icone
              nome={icone}
              className={`${cor} size-3.5 shrink-0 translate-y-0.5 stroke-[2.5]`}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
