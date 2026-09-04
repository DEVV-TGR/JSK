import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import type { Galeria as TipoGaleria } from "@/lib/conteudo/galerias";

/**
 * A galeria de projectos.
 *
 * As fotografias de alarmes são de retrato e as de obras de paisagem. Em vez de
 * as espremer todas na mesma proporção — que é o que uma grelha rígida faz e o
 * que deixa uma cozinha cortada ao meio — cada galeria declara a sua.
 */
export function Galeria({
  galeria,
  olho,
  proporcao = "3 / 4",
  colunas = 3,
  fundo = "alternado",
}: {
  galeria: TipoGaleria;
  olho?: string;
  proporcao?: string;
  colunas?: 2 | 3;
  fundo?: "papel" | "alternado";
}) {
  return (
    <Seccao fundo={fundo}>
      <TituloSeccao olho={olho} titulo={galeria.titulo} intro={[galeria.intro]} />

      <ul
        className={`mt-bloco grid gap-6 sm:grid-cols-2 ${
          colunas === 3 ? "lg:grid-cols-3" : ""
        }`}
      >
        {galeria.projetos.map((projeto, i) => (
          <li key={projeto.imagem}>
            <Revela ordem={i} className="group h-full">
              <figure className="flex h-full flex-col overflow-hidden rounded-cartao border border-linha bg-papel shadow-1">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: proporcao }}
                >
                  <Image
                    src={projeto.imagem}
                    alt={projeto.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-saida group-hover:scale-[1.03]"
                  />
                </div>

                {projeto.legendas.length > 0 && (
                  <figcaption className="flex flex-1 flex-col gap-2 p-6">
                    {projeto.legendas.map((legenda) => (
                      <span key={legenda} className="flex items-start gap-2 text-nota">
                        <Icone nome="visto" className="mt-0.5 size-4 text-ocre" />
                        {legenda}
                      </span>
                    ))}
                  </figcaption>
                )}
              </figure>
            </Revela>
          </li>
        ))}
      </ul>
    </Seccao>
  );
}
