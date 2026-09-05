import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { PROJECTOS } from "@/lib/conteudo/obras";

/**
 * A galeria, em folha de contacto.
 *
 * Quatro fotografias, e são **dois trabalhos**: uma casa em duas divisões e
 * uma loja em duas vistas. Vale a pena dizê-lo porque muda o desenho — quatro
 * cartões iguais dariam a entender quatro obras diferentes.
 *
 * A grelha não força um rácio comum. Três das fotografias são verticais e uma
 * é horizontal (1200×560), e enfiar essa num 3/4 como faz a galeria de
 * `/alarmes/` cortava-lhe o balcão inteiro. Aqui cada uma tem o seu formato,
 * declarado na copy, e a horizontal ocupa as duas colunas.
 *
 * A fotografia limpa-se com `clip-path` ao entrar — nunca com `width`, que
 * obrigaria o browser a recalcular a página a cada fotograma.
 */
export function ProjectosObras() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
          {PROJECTOS.titulo}
        </h2>
        <p className="text-chumbo mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed">
          {PROJECTOS.intro}
        </p>

        <ul className="mt-[var(--espaco-bloco)] grid gap-x-8 gap-y-12 sm:grid-cols-2">
          {PROJECTOS.itens.map((projecto, indice) => (
            <li
              key={projecto.imagem}
              className={
                projecto.formato === "horizontal"
                  ? "entra sm:col-span-2"
                  : "entra"
              }
              /* Escalonado por coluna e não pela lista toda: com `--i` a
                 crescer até 3, o último cartão acabava de entrar muito depois
                 de já estar parado no ecrã. */
              style={{ "--i": indice % 2 } as React.CSSProperties}
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

                <div
                  className={`revela bg-cal relative ${
                    projecto.formato === "horizontal"
                      ? "aspect-16/9"
                      : "aspect-3/4"
                  }`}
                >
                  <Image
                    src={projecto.imagem}
                    alt={projecto.alt}
                    fill
                    className="object-cover"
                    /* Uma coluna no telemóvel, duas a partir dos 640px — e a
                       horizontal ocupa a largura toda da `Medida`. */
                    sizes={
                      projecto.formato === "horizontal"
                        ? "(min-width: 1024px) 68rem, 90vw"
                        : "(min-width: 640px) 34rem, 90vw"
                    }
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
