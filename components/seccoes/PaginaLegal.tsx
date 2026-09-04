import { Seccao } from "@/components/ui/Seccao";
import type { PaginaLegal as Tipo } from "@/lib/conteudo/legal";

/**
 * As duas páginas legais.
 *
 * A numeração das secções vem do índice. Medida curta e espaço generoso entre
 * secções: é texto que ninguém quer ler, e a única coisa que se pode fazer por
 * quem o lê é não o tornar mais difícil.
 */
export function PaginaLegal({ pagina }: { pagina: Tipo }) {
  return (
    <Seccao>
      <div className="max-w-medida">
        <p className="text-tinta-suave">{pagina.abertura}</p>

        <ol className="mt-bloco flex flex-col gap-12">
          {pagina.seccoes.map((seccao, i) => (
            <li key={seccao.titulo} className="revela">
              <h2 className="flex items-baseline gap-3 text-gama">
                <span aria-hidden className="font-titulo text-delta text-amarelo">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {seccao.titulo}
              </h2>

              <div className="mt-5 flex flex-col gap-4 text-tinta-suave">
                {seccao.paragrafos.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              {seccao.lista && (
                <ul className="mt-4 flex flex-col gap-2 text-tinta-suave">
                  {seccao.lista.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amarelo" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Seccao>
  );
}
