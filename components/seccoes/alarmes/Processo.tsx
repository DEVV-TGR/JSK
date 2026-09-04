import { Medida, Seccao } from "@/components/ui/Seccao";
import { PROCESSO } from "@/lib/conteudo/comum";

/**
 * O processo, em quatro paragens sobre um filete.
 *
 * A cena mais sossegada depois da galeria, e a última antes da chapa de
 * orçamento: quatro passos alinhados por uma linha amarela que se desenha da
 * esquerda para a direita à medida que a cena entra. É uma estrada com quatro
 * marcos, que é literalmente o que o processo é.
 *
 * O filete usa a classe `.revela`, que já existe — `clip-path`, nunca `width`.
 * Abaixo dos 768px não há filete nenhum: quatro marcos numa coluna não são uma
 * estrada, e aí cada passo separa-se pelo seu próprio traço.
 *
 * A numeração sai do `index`. É o que torna impossível o defeito #7, em que os
 * quatro passos de `/obras/` estão numerados `01., 01., 02.`.
 */
export function Processo() {
  return (
    <Seccao terreno="betao">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[14ch] font-extrabold">
          {PROCESSO.titulo}
        </h2>

        <div className="relative mt-[var(--espaco-bloco)]">
          <span
            aria-hidden="true"
            className="revela bg-amarelo absolute inset-x-0 top-0 hidden h-[2px] origin-left md:block"
          />

          <ol className="grid gap-x-8 gap-y-10 md:grid-cols-4">
            {PROCESSO.passos.map((passo, indice) => (
              <li
                key={passo.titulo}
                className="entra border-grafite/30 relative border-t pt-6 md:border-t-0 md:pt-10"
                style={{ "--i": indice } as React.CSSProperties}
              >
                {/* O marco, sentado em cima do filete. Só existe onde o filete
                    existe — sem ele seria um quadrado amarelo a flutuar. */}
                <span
                  aria-hidden="true"
                  className="bg-amarelo absolute start-0 top-0 hidden size-2.5 -translate-y-1/2 md:block"
                />

                <span
                  className="font-titulo text-grafite text-[0.8125rem] font-bold tracking-[0.16em] tabular-nums"
                  aria-hidden="true"
                >
                  {String(indice + 1).padStart(2, "0")}
                </span>

                <h3 className="font-titulo mt-3 text-[1.25rem] font-bold">
                  {passo.titulo}
                </h3>

                <p className="text-grafite mt-3 text-[0.9375rem] leading-relaxed">
                  {passo.texto}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Medida>
    </Seccao>
  );
}
