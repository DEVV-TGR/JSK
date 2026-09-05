import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { SERVICOS } from "@/lib/conteudo/obras";

/**
 * As três pranchas.
 *
 * Vinte linhas do cliente, em três blocos. É muito texto, e a única maneira de
 * o tornar legível é dar-lhe estrutura: cada bloco é uma prancha à largura
 * toda, com o número e o título de um lado e a lista em duas colunas do outro.
 * Vinte marcas de visto numa coluna só seriam uma lista de supermercado.
 *
 * O prumo amarelo à esquerda atravessa os três e é o mesmo motivo do andaime
 * que a cena a seguir desmonta — a página tem um objecto, e ele começa aqui.
 * Desce com o `.prumo`: `scaleY` com a origem em cima, nunca `height`.
 *
 * A numeração sai do `index`. É o defeito #7 tornado impossível: no site
 * actual estes três blocos estão numerados `01., 01., 02.`, porque eram três
 * caixas de Elementor com o número escrito à mão em cada uma.
 */
export function BlocosObras() {
  return (
    <Seccao terreno="asfalto">
      <Medida>
        {/* A cena não tem título próprio: é a continuação de `Os Nossos
            Serviços`, e diz isso à árvore de acessibilidade em vez de inventar
            um segundo cabeçalho para o mesmo assunto. */}
        <div className="relative" aria-labelledby="os-nossos-servicos">
          {/* O prumo. Só a partir dos 768px: numa coluna estreita as pranchas
              empilham-se e uma linha vertical à esquerda de tudo deixa de ligar
              coisa nenhuma. */}
          <span
            aria-hidden="true"
            className="prumo bg-amarelo absolute inset-y-0 start-0 hidden w-[3px] md:block"
          />

          <ol className="md:ps-14">
            {SERVICOS.blocos.map((bloco, indice) => (
              <li
                key={bloco.titulo}
                className="entra border-papel/15 grid gap-x-12 gap-y-6 border-t py-10 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] lg:py-14"
                style={{ "--i": indice } as React.CSSProperties}
              >
                <div>
                  <span
                    className="font-titulo text-amarelo text-[0.8125rem] font-bold tracking-[0.16em] tabular-nums"
                    aria-hidden="true"
                  >
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-bloco font-titulo mt-3 font-extrabold text-balance">
                    {bloco.titulo}
                  </h3>
                </div>

                {/* Duas colunas a partir dos 640px. As linhas mais compridas
                    — `Instalação de painéis solares e sistemas de energia
                    renovável` — passam para duas linhas de texto e é por isso
                    que o `items-baseline` do visto leva um `translate-y`: sem
                    ele, o visto alinha com a última linha em vez da primeira. */}
                <ul className="grid gap-x-10 gap-y-3 sm:grid-cols-2">
                  {bloco.itens.map((item) => (
                    <li
                      key={item}
                      className="text-grafite flex items-baseline gap-3 text-[0.9375rem] leading-snug"
                    >
                      <Icone
                        nome="certo"
                        className="text-amarelo size-3.5 shrink-0 translate-y-0.5 stroke-[2.5]"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </Medida>
    </Seccao>
  );
}
