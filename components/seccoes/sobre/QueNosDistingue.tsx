import { Medida, Seccao } from "@/components/ui/Seccao";
import { DISTINGUE } from "@/lib/conteudo/sobre";

/**
 * O que nos distingue.
 *
 * ⚠️ Este bloco responde à mesma pergunta que o `Diferenciais` da homepage — a
 * entrada acaba, literalmente, com `O que nos torna únicos?`, que é o título
 * do de lá. Ficou por decisão do Gonçalo, a 6 de Setembro de 2026: **fica, mas
 * com forma diferente.** Apagar conteúdo do cliente não me compete; repetir o
 * desenho da homepage seria mostrar o mesmo bloco duas vezes a quem vem de lá.
 *
 * Lá são seis provas curtas numa folha de verificações, com o filete a riscar
 * cada linha. Aqui são três com texto longo, em colunas altas com o número em
 * grande — o que um bloco de três parágrafos pede, e o que seis linhas curtas
 * não pediriam.
 *
 * A numeração sai do `index` — defeito #7.
 */
export function QueNosDistingue() {
  return (
    <Seccao terreno="asfalto">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[var(--medida-titulo)] font-extrabold">
          {DISTINGUE.titulo}
        </h2>
        <p className="text-guia text-grafite mt-8 sm:columns-2 sm:gap-14">
          {DISTINGUE.intro}
        </p>

        <ol className="mt-[var(--espaco-bloco)] grid gap-x-14 gap-y-12 sm:grid-cols-3">
          {DISTINGUE.itens.map((item, indice) => (
            <li
              key={item.titulo}
              className="entra"
              style={{ "--i": indice } as React.CSSProperties}
            >
              <span
                className="font-titulo text-amarelo block text-[3.5rem] leading-none font-extrabold tabular-nums"
                aria-hidden="true"
              >
                {String(indice + 1).padStart(2, "0")}
              </span>
              <span
                className="bg-amarelo mt-5 block h-1 w-14"
                aria-hidden="true"
              />

              <h3 className="text-bloco font-titulo mt-6 font-extrabold">
                {item.titulo}
              </h3>
              <p className="text-grafite mt-4 text-[1.0625rem] leading-relaxed">
                {item.texto}
              </p>
            </li>
          ))}
        </ol>
      </Medida>
    </Seccao>
  );
}
