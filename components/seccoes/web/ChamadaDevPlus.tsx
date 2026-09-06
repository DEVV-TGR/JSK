import { Botao } from "@/components/ui/Botao";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { DEVPLUS, FECHO } from "@/lib/conteudo/web";

/**
 * O fecho: a chamada para a DevPlus.
 *
 * É o trabalho desta página inteira — levar quem lê ao devplus.pt — por isso
 * tem cena própria em vez de ser um botão no fim de outra coisa.
 *
 * **Fica em betão e não em amarelo**, apesar de ser a chamada mais importante
 * da página. A `BandaOrcamento` que vem a seguir é a chapa amarela em cheio, e
 * duas chapas amarelas encostadas não se distinguem uma da outra: deixavam de
 * ser duas decisões e passavam a ser um bloco só. Aqui o amarelo é o botão, e
 * é o único da cena.
 */
export function ChamadaDevPlus() {
  return (
    <Seccao terreno="betao">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[14ch] font-extrabold">
          {FECHO.titulo}
        </h2>

        <p className="text-guia text-grafite entra mt-8 max-w-[62ch]">
          {FECHO.texto}
        </p>

        {/* ⚠️ `100% de clientes satisfeitos` é uma afirmação de facto sobre o
            negócio, do mesmo tipo dos contadores da homepage. Está aqui porque
            é o que o site actual diz e porque a regra é transcrever — não
            porque alguém a verificou. Ver `lib/conteudo/web.ts`. */}
        <p
          className="entra font-titulo text-papel mt-8 max-w-[30ch] text-[1.25rem] font-bold"
          style={{ "--i": 1 } as React.CSSProperties}
        >
          {FECHO.afirmacao}
        </p>

        <div
          className="entra mt-10"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          <Botao href={DEVPLUS.href} externo>
            {FECHO.chamada}
          </Botao>
        </div>
      </Medida>
    </Seccao>
  );
}
