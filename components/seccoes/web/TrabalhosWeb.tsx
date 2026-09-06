import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { DEVPLUS, TRABALHOS } from "@/lib/conteudo/web";

/**
 * Os trabalhos, do portefólio da DevPlus.
 *
 * Os seis estão todos aqui e cada um aponta para a sua página no portefólio.
 * **Três levam ecrã e três não**, e a razão de cada caso está anotada em
 * `lib/conteudo/web.ts` — em resumo: só três têm site público, e o da JSK
 * apontaria para o WordPress que este projecto está a substituir.
 *
 * Os que não têm ecrã ficam em cartão tipográfico, com o mesmo peso dos
 * outros. Não se gera uma imagem para encher o buraco, e também não se escreve
 * que "não têm site" — isso seria uma afirmação sobre o negócio de outra
 * pessoa.
 *
 * A fotografia limpa-se com `clip-path` ao entrar, como a galeria da `/obras/`
 * — nunca com `width`, que obrigaria o browser a recalcular a página a cada
 * fotograma.
 */
export function TrabalhosWeb() {
  return (
    <Seccao terreno="asfalto">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
          {TRABALHOS.titulo}
        </h2>

        <ul className="mt-[var(--espaco-bloco)] grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {TRABALHOS.itens.map((trabalho, indice) => {
            const imagem = "imagem" in trabalho ? trabalho.imagem : undefined;
            const alt = "alt" in trabalho ? trabalho.alt : undefined;

            return (
              <li
                key={trabalho.slug}
                className="entra"
                style={{ "--i": indice % 3 } as React.CSSProperties}
              >
                <a
                  href={`${DEVPLUS.portfolio}/${trabalho.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-betao hover:border-amarelo block border-2 [transition:border-color_180ms_ease]"
                >
                  <div className="revela bg-betao relative aspect-16/10 overflow-hidden">
                    {imagem && alt ? (
                      <Image
                        src={imagem}
                        alt={alt}
                        fill
                        sizes="(min-width: 1024px) 22rem, (min-width: 640px) 44vw, 90vw"
                        /* `object-top` e não `object-center`: o que interessa
                           de um site é o primeiro ecrã, e é ele que está no
                           topo da captura. */
                        className="object-cover object-top"
                      />
                    ) : (
                      /* Sem ecrã. Fica a grelha de desenho — o mesmo motivo do
                         herói e da cena do pico — em vez de um rectângulo
                         vazio ou de uma imagem inventada. */
                      <div
                        className="grelha-desenho absolute inset-0"
                        style={
                          {
                            "--linha": "rgb(255 255 255 / 0.07)",
                            "--passo": "1.75rem",
                          } as React.CSSProperties
                        }
                      />
                    )}
                  </div>

                  <p className="font-titulo text-papel group-hover:text-amarelo flex items-center justify-between gap-3 px-4 py-3.5 text-[0.9375rem] font-bold [transition:color_180ms_ease]">
                    {trabalho.nome}
                    <Icone
                      nome="seta"
                      className="text-amarelo size-4 shrink-0"
                    />
                  </p>
                </a>
              </li>
            );
          })}
        </ul>
      </Medida>
    </Seccao>
  );
}
