import { Medida, Seccao } from "@/components/ui/Seccao";
import { SERVICOS } from "@/lib/conteudo/web";

/**
 * Os seis serviços da DevPlus.
 *
 * O site actual mostra três cartões genéricos; estes seis são os do
 * devplus.pt, que é o site de quem assina a página. A única coisa mudada foi o
 * tratamento — o devplus.pt trata por "tu" e este site por "você" — e a
 * conversão está listada, linha a linha, no cabeçalho de `lib/conteudo/web.ts`.
 *
 * Não levam ícone. O `Icone.tsx` tem catorze caminhos e nenhum deles diz
 * "painel de gestão"; inventar seis pictogramas era fazer desenho novo por
 * conta própria. O número basta, e sai do `index` — que é o que torna
 * impossível o defeito #7.
 */
export function ServicosWeb() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[14ch] font-extrabold">
          {SERVICOS.titulo}
        </h2>

        <ul className="mt-[var(--espaco-bloco)] grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICOS.itens.map((servico, indice) => (
            <li
              key={servico.nome}
              className="entra border-asfalto/15 border-t pt-5"
              /* Escalonado por coluna e não pela lista toda: com o `--i` a
                 crescer até 5, o último cartão acabava de entrar muito depois
                 de já estar parado no ecrã. */
              style={{ "--i": indice % 3 } as React.CSSProperties}
            >
              <p
                className="font-titulo text-grafite text-[0.75rem] font-bold tracking-[0.16em] tabular-nums"
                aria-hidden="true"
              >
                {String(indice + 1).padStart(2, "0")}
              </p>
              <h3 className="font-titulo mt-2 text-[1.25rem] font-bold">
                {servico.nome}
              </h3>
              <p className="text-chumbo mt-3 text-[0.9375rem] leading-relaxed">
                {servico.texto}
              </p>
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
