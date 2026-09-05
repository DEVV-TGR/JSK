import Image from "next/image";

import { Medida } from "@/components/ui/Seccao";
import { ANDAIME } from "@/lib/conteudo/obras";

/**
 * O pico da página: o andaime que se desmonta.
 *
 * O contraponto exacto da casa da `/alarmes/`. Lá o sistema **arma-se** — o
 * traço fecha-se, os sensores acendem, o perímetro sela. Aqui o andaime **vem
 * abaixo**: as pranchas saem de lado, uma de cada vez, de cima para baixo, e o
 * que fica é o espaço acabado.
 *
 * Não é decoração e não é um antes/depois inventado. O brief previa para as
 * Obras "uma limpeza que troca o antes pelo depois", mas as fotografias do
 * cliente são todas de obra **acabada** — não existe um "antes" para mostrar.
 * O que existe é o andaime, e está na fotografia do herói desta mesma página.
 * É esse o antes desta empresa, e é ele que aqui se tira.
 *
 * Três coisas que a fazem funcionar:
 *
 * 1. **Uma só linha temporal.** A cena declara `view-timeline: --andaime` e os
 *    quatro níveis pendem dela, com o intervalo deslocado por `--i`. A ordem é
 *    garantida pela posição no scroll, não por temporizadores.
 * 2. **`overflow-hidden` na moldura.** As pranchas saem para fora do
 *    `viewBox` — 360 de deslocação num desenho de 300 de largura. Sem o corte,
 *    apareciam por cima do texto ao lado.
 * 3. **O estado por omissão é o desmontado.** Sem `animation-timeline`, ou com
 *    menos movimento pedido no sistema, vê-se a cozinha limpa com os prumos e
 *    a base por cima: o fim da obra. A animação é a montagem a sair, escrita
 *    ao contrário — que é o que `docs/movimento.md` obriga.
 *
 * Porque é que não repete a casa: a casa **desenha traço**
 * (`stroke-dashoffset`); isto **desloca peças** (`transform`). Mecanismo
 * diferente, leitura diferente.
 */

/** Onde assenta cada prancha, no `viewBox` de 300×400. */
const NIVEIS = [60, 145, 230, 315];

export function AndaimeQueDesmonta() {
  return (
    <section className="andaime bg-betao text-papel relative">
      {/* A altura é o orçamento de scroll da cena. Menos do que a casa, que
          continua a ser o pico do site inteiro — esta é o pico desta página. */}
      <div className="h-[300svh]">
        <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] items-center overflow-hidden">
          <Medida className="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-16">
            <div>
              <p className="text-grafite max-w-[34ch] text-[1.0625rem] leading-relaxed [@media(max-height:820px)]:hidden lg:block">
                {ANDAIME.abertura}
              </p>
              <h2 className="text-cena font-titulo mt-4 max-w-[14ch] font-extrabold sm:mt-6">
                {ANDAIME.titulo}
              </h2>
            </div>

            {/* A moldura, governada pela largura e travada pela altura do
                ecrã. Um `h-[62svh]` com `w-auto` parecia mais limpo e dava uma
                caixa de 280px num ecrã de 900 — a altura disponível dentro de
                uma caixa `sticky` não é a do ecrã. Aqui a largura manda, e o
                travão de altura é a consulta de média, como na casa. */}
            <div className="relative mx-auto aspect-3/4 w-full max-w-[17rem] overflow-hidden sm:max-w-[20rem] lg:max-w-[26rem] [@media(max-height:820px)]:max-w-[19rem]">
              <Image
                src={ANDAIME.imagem.src}
                alt={ANDAIME.imagem.alt}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 26rem, 20rem"
              />

              <svg
                viewBox="0 0 300 400"
                aria-hidden="true"
                className="absolute inset-0 size-full"
              >
                {/* Os prumos e a base ficam. São o que resta de uma obra
                    entregue: a marca de que ali esteve trabalho. */}
                <g
                  className="stroke-amarelo"
                  strokeWidth={4}
                  strokeLinecap="square"
                >
                  <path d="M36 6V394" />
                  <path d="M264 6V394" />
                  <path d="M16 394H284" />
                </g>

                {NIVEIS.map((y, indice) => (
                  <g
                    key={y}
                    className="andaime-nivel"
                    style={
                      {
                        "--i": indice,
                        /* Alternado: uma prancha para a direita, a seguinte
                           para a esquerda. Todas para o mesmo lado lia-se como
                           uma persiana, não como uma desmontagem. */
                        "--lado": indice % 2 === 0 ? 1 : -1,
                      } as React.CSSProperties
                    }
                  >
                    {/* A diagonal de contraventamento sai com a sua prancha —
                        é a peça que a trava, e ficar sozinha no ar seria um
                        andaime impossível. */}
                    <path
                      d={
                        indice % 2 === 0
                          ? `M36 ${y + 14}L264 ${y + 78}`
                          : `M264 ${y + 14}L36 ${y + 78}`
                      }
                      className="stroke-asfalto"
                      strokeWidth={5}
                      strokeLinecap="round"
                      opacity={0.85}
                    />
                    <rect
                      x={26}
                      y={y}
                      width={248}
                      height={15}
                      className="fill-asfalto stroke-papel"
                      strokeOpacity={0.2}
                      strokeWidth={1.5}
                    />
                  </g>
                ))}
              </svg>
            </div>
          </Medida>
        </div>
      </div>
    </section>
  );
}
