import Link from "next/link";

import { Icone } from "@/components/ui/Icone";
import { Medida } from "@/components/ui/Seccao";
import { SECTORES_DETALHE } from "@/lib/conteudo/sectores";

/**
 * Os quatro sectores, em pilha fixa.
 *
 * Cada cartão encosta ao topo e fica lá enquanto o seguinte sobe por cima. O
 * efeito é o de folhear quatro chapas, e é `position: sticky` e mais nada — sem
 * linha temporal, sem JavaScript, sem nada que possa não estar suportado.
 *
 * A alternativa era a grelha de quatro cartões parados que aqui esteve, e que
 * era boa parte do que fazia esta página parecer morta.
 */
export function Sectores() {
  return (
    <section className="bg-asfalto text-papel pb-[var(--espaco-bloco)]">
      <Medida className="pt-[var(--espaco-cena)] pb-[var(--espaco-bloco)]">
        <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
          Quatro sectores, um só parceiro.
        </h2>
      </Medida>

      <Medida>
        <ol>
          {SECTORES_DETALHE.map((sector, indice) => (
            <li
              key={sector.href}
              className="pilha-item"
              style={{ "--i": indice } as React.CSSProperties}
            >
              <article
                className="bg-betao border-asfalto mb-5 border-2"
                /* A altura acompanha o ecrã mas nunca o excede, senão o fundo do
                   cartão fica inalcançável enquanto ele está encostado. */
                style={{ minHeight: "min(30rem, calc(100svh - 10rem))" }}
              >
                {/* A tira do topo é o que fica à vista quando o cartão seguinte
                    sobe por cima. Sem ela, uma pilha de quatro cartões lê-se
                    como três faixas cinzentas vazias — que foi exactamente o
                    que a primeira versão desta cena fez. */}
                <div className="bg-asfalto flex items-center gap-4 px-6 py-3.5 sm:px-8">
                  <Icone nome={sector.icone} className="text-amarelo size-5" />
                  <span className="font-titulo text-[0.8125rem] font-bold tracking-[0.14em] uppercase">
                    {sector.nome}
                  </span>
                  {/* O número e nada mais. Um `01 / 04` seria um contador de
                      secção, que é das coisas que fazem uma página ler como um
                      modelo preenchido. */}
                  <span
                    className="font-titulo text-grafite ms-auto text-[0.8125rem] font-bold tracking-[0.16em] tabular-nums"
                    aria-hidden="true"
                  >
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="grid gap-x-12 gap-y-10 p-6 sm:p-10 lg:grid-cols-2">
                  <div className="flex flex-col">
                    <h3 className="text-cena font-titulo font-extrabold">
                      {sector.nome}
                    </h3>
                    <p className="text-grafite mt-5 max-w-[44ch] text-[1.0625rem] leading-relaxed">
                      {sector.texto}
                    </p>
                    <Link
                      href={sector.href}
                      className="font-titulo hover:text-amarelo mt-auto inline-flex items-center gap-2.5 pt-8 text-[0.875rem] font-bold tracking-[0.1em] uppercase [transition:color_160ms_ease]"
                    >
                      Ver {sector.nome}
                      <Icone nome="seta" className="size-4" />
                    </Link>
                  </div>

                  <ul className="self-center">
                    {sector.servicos.map((servico) => (
                      <li
                        key={servico}
                        className="border-asfalto flex items-baseline gap-4 border-t py-4 text-[1.0625rem]"
                      >
                        <Icone
                          nome="certo"
                          className="text-amarelo size-4 shrink-0 translate-y-0.5 stroke-[2.5]"
                        />
                        {servico}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </Medida>
    </section>
  );
}
