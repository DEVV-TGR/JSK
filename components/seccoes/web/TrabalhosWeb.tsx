import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Medida } from "@/components/ui/Seccao";
import { DEVPLUS, TRABALHOS } from "@/lib/conteudo/web";

const QUANTOS = TRABALHOS.itens.length;

/**
 * Os trabalhos, em trilho horizontal.
 *
 * A cena encosta ao ecrã e os seis trabalhos atravessam-no da direita para a
 * esquerda enquanto o scroll continua à velocidade normal. Cada um limpa-se
 * quando a faixa o traz ao centro.
 *
 * **Não é rapto de scroll.** Nada intercepta o evento — não há um único
 * `addEventListener` nesta página. O que existe é uma faixa deslocada por
 * `translate3d`, com a linha temporal a ser a posição da cena. A página anda
 * ao ritmo de sempre; o que se move é o conteúdo. É a mecânica da `.pista` dos
 * contadores.
 *
 * **O que a `.pista` faz mal e este não repete:** lá, a altura e o encosto
 * estão nas classes do componente, fora do `@supports`. Num browser sem
 * `animation-timeline` a faixa fica na posição zero, o `overflow-hidden` corta
 * o resto, e vêem-se dois contadores mais 340svh de nada. Aqui tudo isso vive
 * dentro do `@supports` e de um `min-width: 64rem`: sem suporte, ou num
 * telemóvel, a mesma marcação cai em `flex-wrap: wrap` e os seis cartões ficam
 * numa grelha visível — que é o estado final desta cena.
 *
 * O `max(0px, …)` do percurso não é defensivo à toa: num ecrã muito largo o
 * conjunto cabe todo, a conta dá negativo, e sem ele a faixa andava para o
 * lado errado.
 *
 * **Três dos seis não levam ecrã**, e a razão de cada caso está em
 * `lib/conteudo/web.ts`. Ficam com a grelha de desenho, e não com um
 * rectângulo vazio nem com uma imagem inventada para encher.
 */
export function TrabalhosWeb() {
  return (
    <section
      className="trilho bg-asfalto text-papel"
      style={
        {
          "--cartao": "min(26rem, 80vw)",
          "--vao": "2rem",
          "--margem": "clamp(1.5rem, 6vw, 6rem)",
          "--percurso": `max(0px, calc(${QUANTOS} * var(--cartao) + ${QUANTOS - 1} * var(--vao) + 2 * var(--margem) - 100vw))`,
        } as React.CSSProperties
      }
    >
      <div className="trilho-cena py-[var(--espaco-cena)]">
        <Medida>
          <h2 className="text-cena font-titulo max-w-[var(--medida-titulo)] font-extrabold">
            {TRABALHOS.titulo}
          </h2>
        </Medida>

        {/* A faixa é uma lista a sério, e não uma imagem: quem usa leitor de
            ecrã ou teclado percorre os seis trabalhos pela ordem em que estão
            escritos, ande a faixa ou não. */}
        <ul className="trilho-faixa mt-[var(--espaco-bloco)] flex flex-wrap gap-[var(--vao)] px-[var(--margem)] will-change-transform">
          {TRABALHOS.itens.map((trabalho, indice) => {
            const imagem = "imagem" in trabalho ? trabalho.imagem : undefined;
            const alt = "alt" in trabalho ? trabalho.alt : undefined;

            return (
              <li
                key={trabalho.slug}
                className="trilho-item w-[var(--cartao)] shrink-0"
                style={{ "--i": indice } as React.CSSProperties}
              >
                <a
                  href={`${DEVPLUS.portfolio}/${trabalho.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group border-betao hover:border-amarelo block border-2 [transition:border-color_180ms_ease]"
                >
                  <div className="bg-betao relative aspect-16/10 overflow-hidden">
                    {imagem && alt ? (
                      <Image
                        src={imagem}
                        alt={alt}
                        fill
                        sizes="26rem"
                        /* `object-top`: o que interessa de um site é o
                           primeiro ecrã, e é ele que está no topo da captura. */
                        className="object-cover object-top"
                      />
                    ) : (
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

                  <p className="font-titulo text-papel group-hover:text-amarelo flex items-center justify-between gap-3 px-5 py-4 text-[1.0625rem] font-bold [transition:color_180ms_ease]">
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
      </div>
    </section>
  );
}
