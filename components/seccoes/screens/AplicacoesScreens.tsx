import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { APLICACOES } from "@/lib/conteudo/screens";

/**
 * Interior e exterior — onde é que um destes se põe.
 *
 * A última cena antes da chapa, e de propósito a mais sossegada das seis: o
 * pico já passou e o que falta é responder a uma pergunta prática. Duas
 * colunas, seis sítios, e nada a mexer que não seja a entrada.
 *
 * `Ecrãs Para interior` está mesmo assim no site do cliente, com o `Para` em
 * maiúscula e o `interior` em minúscula, ao contrário do `Ecrãs Para Exterior`
 * ao lado. Não é o `text-transform` do tema antigo — é o texto. Ver a nota no
 * cabeçalho de `lib/conteudo/screens.ts`.
 */
export function AplicacoesScreens() {
  return (
    <Seccao terreno="asfalto">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[20ch] font-extrabold">
          {APLICACOES.titulo}
        </h2>

        <div className="mt-[var(--espaco-bloco)] grid gap-x-12 gap-y-10 sm:grid-cols-2">
          {APLICACOES.blocos.map((bloco, indice) => (
            <section
              key={bloco.titulo}
              className="entra"
              style={{ "--i": indice } as React.CSSProperties}
            >
              {/* O filete amarelo limpa-se da esquerda para a direita, como as
                  fotografias da galeria da `/obras/`. É o mesmo `clip-path`, e
                  nunca uma largura a animar. */}
              <span
                className="revela bg-amarelo block h-1 w-full"
                aria-hidden="true"
              />

              <h3 className="text-bloco font-titulo mt-5 font-extrabold">
                {bloco.titulo}
              </h3>

              <ul className="mt-5">
                {bloco.itens.map((item) => (
                  <li
                    key={item}
                    className="border-betao flex items-center gap-3.5 border-b py-3.5 text-[1.0625rem] last:border-b-0"
                  >
                    <Icone
                      nome="certo"
                      className="text-amarelo size-4 shrink-0 stroke-[2.5]"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </Medida>
    </Seccao>
  );
}
