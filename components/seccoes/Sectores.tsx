import Image from "next/image";
import Link from "next/link";

import { Icone } from "@/components/ui/Icone";
import { Medida } from "@/components/ui/Seccao";
import { SECTORES_DETALHE } from "@/lib/conteudo/sectores";

/**
 * Os quatro sectores, em pilha fixa.
 *
 * Cada cartão encosta ao topo e fica lá enquanto o seguinte sobe por baixo e o
 * tapa por inteiro. O efeito é o de folhear quatro chapas, e é
 * `position: sticky` e mais nada — sem linha temporal, sem JavaScript, sem
 * nada que possa não estar suportado. A regra e o porquê das suas condições
 * estão em `.pilha-item`, no `globals.css`.
 *
 * Cada cartão é metade fotografia e metade texto, com o lado da fotografia a
 * alternar. É o que dá variedade ao cartão que sobe: sem isso, quatro chapas
 * iguais a substituírem-se lêem-se como uma chapa a piscar.
 *
 * Duas medidas aqui que não são gosto — são o que faz a pilha funcionar:
 *
 * - **`lg:h-[33rem]`, altura fixa e igual em todos.** Um cartão mais baixo do
 *   que o que está encostado não o tapa, e fica a ver-se uma faixa do
 *   anterior. É por isso que é `h-` e não `min-h-`.
 * - **O cartão apertado.** O dos Alarmes tem quatro serviços contra três dos
 *   outros, e é ele que dita a altura. 33rem é o que o deixa caber acima da
 *   dobra num portátil, contando com as 5.5rem de `top`.
 */
export function Sectores() {
  return (
    <section className="bg-asfalto text-papel pb-[var(--espaco-bloco)]">
      <Medida className="pt-[var(--espaco-cena)] pb-[var(--espaco-bloco)]">
        <h2 className="text-cena font-titulo max-w-[var(--medida-titulo)] font-extrabold">
          Quatro sectores, um só parceiro.
        </h2>
      </Medida>

      <Medida>
        <ol className="grid gap-8">
          {SECTORES_DETALHE.map((sector, indice) => (
            <li key={sector.href} className="pilha-item">
              {/* O `bg-betao` é opaco de propósito: é ele que tapa o cartão de
                  baixo. A aresta que se vê a dividi-los é o filete de asfalto,
                  sem cantos redondos — a linguagem do site é sinalética, e um
                  sinal não tem cantos redondos. */}
              <article className="bg-betao border-asfalto grid border-2 lg:h-[33rem] lg:grid-cols-2">
                <div
                  className={`relative min-h-[16rem] sm:min-h-[22rem] lg:min-h-0 ${
                    /* A imagem vem primeiro no HTML, por isso cai à esquerda
                       sozinha — a alternância faz-se a mandá-la para o fim nos
                       cartões ímpares. No telemóvel não há ordem a trocar: uma
                       coluna só, com a imagem a abrir o cartão. */
                    indice % 2 === 1 ? "lg:order-last" : ""
                  }`}
                >
                  <Image
                    src={sector.imagem}
                    alt={sector.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 34rem, 90vw"
                  />
                </div>

                <div className="flex flex-col p-6 sm:p-8">
                  {/* A sobrelinha: ícone, nome e número. Esteve numa tira preta
                      no topo do cartão, que existia por causa da pilha antiga —
                      era o que ficava à vista quando o cartão seguinte parava
                      um degrau abaixo. Agora o cartão tapa o anterior por
                      inteiro e não há degrau nenhum a preencher. */}
                  <div className="flex items-center gap-4">
                    <Icone nome={sector.icone} className="text-amarelo size-5" />
                    <span className="font-titulo text-[0.8125rem] font-bold tracking-[0.14em] uppercase">
                      {sector.nome}
                    </span>
                    {/* O número e nada mais. Um `01 / 04` seria um contador de
                        secção, que é das coisas que fazem uma página ler como
                        um modelo preenchido. */}
                    <span
                      className="font-titulo text-grafite ms-auto text-[0.8125rem] font-bold tracking-[0.16em] tabular-nums"
                      aria-hidden="true"
                    >
                      {String(indice + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-bloco font-titulo mt-6 font-extrabold">
                    {sector.nome}
                  </h3>
                  <p className="text-grafite mt-4 max-w-[var(--medida-texto)] text-[1.0625rem] leading-relaxed">
                    {sector.texto}
                  </p>

                  <ul className="mt-6">
                    {sector.servicos.map((servico) => (
                      <li
                        key={servico}
                        className="border-asfalto flex items-baseline gap-4 border-t py-3 text-[1.0625rem]"
                      >
                        <Icone
                          nome="certo"
                          className="text-amarelo size-4 shrink-0 translate-y-0.5 stroke-[2.5]"
                        />
                        {servico}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={sector.href}
                    className="font-titulo hover:text-amarelo mt-auto inline-flex items-center gap-2.5 pt-6 text-[0.875rem] font-bold tracking-[0.1em] uppercase [transition:color_160ms_ease]"
                  >
                    Ver {sector.nome}
                    <Icone nome="seta" className="size-4" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Medida>
    </section>
  );
}
