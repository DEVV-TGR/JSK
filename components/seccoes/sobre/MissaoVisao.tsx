import { Medida, Seccao } from "@/components/ui/Seccao";
import { MISSAO_VISAO } from "@/lib/conteudo/sobre";

/**
 * A missão e a visão.
 *
 * São os dois parágrafos mais longos do site inteiro, e no jsk.pt estão
 * espremidos em duas colunas pequenas. Aqui ganham espaço: cada um ocupa uma
 * banda com o título de um lado e o texto do outro, na largura toda.
 *
 * É o texto mais formal da JSK e não leva dispositivo nenhum além da entrada
 * escalonada — depois do pico, a curva desce.
 */
export function MissaoVisao() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <div className="grid gap-[var(--espaco-bloco)]">
          {MISSAO_VISAO.map((bloco, indice) => (
            <section
              key={bloco.titulo}
              className="entra border-asfalto/15 grid gap-x-16 gap-y-5 border-t pt-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]"
              style={{ "--i": indice } as React.CSSProperties}
            >
              <div>
                <span
                  className="font-titulo text-grafite text-[0.75rem] font-bold tracking-[0.16em] tabular-nums"
                  aria-hidden="true"
                >
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <h2 className="text-bloco font-titulo mt-2 font-extrabold">
                  {bloco.titulo}
                </h2>
              </div>

              <p className="text-chumbo text-[1.0625rem] leading-relaxed">
                {bloco.texto}
              </p>
            </section>
          ))}
        </div>
      </Medida>
    </Seccao>
  );
}
