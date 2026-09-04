import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { PROJECTOS } from "@/lib/conteudo/alarmes";

/**
 * A galeria, em folha de contacto.
 *
 * Seis instalações a sério, que é o melhor argumento que esta página tem — e a
 * única fotografia verdadeira de todo o projecto. O herói dispensa imagem
 * precisamente para que a primeira que apareça seja uma destas.
 *
 * Cada cartão é uma chapa: tira preta no topo com o número, a fotografia, e as
 * legendas do cliente por baixo. É a mesma linguagem das tiras da pilha de
 * sectores e da placa de apresentação da homepage.
 *
 * A fotografia limpa-se com `clip-path` ao entrar — nunca com `width`, que
 * obrigaria o browser a recalcular a página a cada fotograma.
 */
export function Projectos() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
          {PROJECTOS.titulo}
        </h2>
        <p className="text-chumbo mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed">
          {PROJECTOS.intro}
        </p>

        <ul className="mt-[var(--espaco-bloco)] grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTOS.itens.map((projecto, indice) => (
            <li
              key={projecto.imagem}
              className="entra"
              /* Escalonado por coluna e não pela lista toda: na terceira linha
                 um `--i` de 6 punha o último cartão a acabar de entrar muito
                 depois de já estar parado no ecrã. */
              style={{ "--i": indice % 3 } as React.CSSProperties}
            >
              <article className="border-asfalto border-2">
                <div className="bg-asfalto text-papel flex items-center gap-3 px-4 py-2.5">
                  <span className="bg-amarelo block size-2" aria-hidden="true" />
                  <span
                    className="font-titulo text-[0.75rem] font-bold tracking-[0.16em] tabular-nums"
                    aria-hidden="true"
                  >
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Rácio fixo em todos os cartões. As seis fotografias vêm em
                    três proporções diferentes (0,62, 0,75 e 0,78) e uma grelha
                    onde cada cartão tem a altura da sua imagem lê-se como uma
                    grelha partida. */}
                <div className="revela bg-cal relative aspect-3/4">
                  <Image
                    src={projecto.imagem}
                    alt={projecto.alt}
                    fill
                    className="object-cover"
                    /* Uma coluna no telemóvel, duas a partir dos 640px, três a
                       partir dos 1024. Sem isto o Next serve a variante da
                       largura do ecrã para um cartão que tem um terço dela. */
                    sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                  />
                </div>

                <ul className="p-4 sm:p-5">
                  {projecto.legendas.map((legenda) => (
                    <li
                      key={legenda}
                      className="flex items-baseline gap-3 py-1 text-[0.9375rem] leading-snug"
                    >
                      <Icone
                        nome="certo"
                        className="text-amarelo size-3.5 shrink-0 translate-y-0.5 stroke-[2.5]"
                      />
                      {legenda}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
