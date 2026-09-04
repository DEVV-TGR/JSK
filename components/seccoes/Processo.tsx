import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import { PROCESSO, TITULO_PROCESSO } from "@/lib/conteudo/processo";

/**
 * Como a JSK trabalha, em quatro passos.
 *
 * Um componente e um array, servindo `/alarmes/` e `/obras/`. No site antigo é
 * o mesmo bloco colado nas duas páginas.
 *
 * Os passos estão ligados por uma linha que atravessa a fila, para se lerem
 * como uma sequência e não como quatro caixas soltas.
 */
export function Processo() {
  return (
    <Seccao>
      <TituloSeccao olho="Como trabalhamos" titulo={TITULO_PROCESSO} />

      <ol className="relative mt-bloco grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {/* A linha só aparece quando os quatro passos estão em fila; empilhados,
            ligaria coisas que já estão por baixo umas das outras. */}
        <span
          aria-hidden
          className="absolute top-5 right-0 left-0 hidden h-px bg-linha lg:block"
        />

        {PROCESSO.map((passo, i) => (
          <li key={passo.titulo} className="relative">
            <Revela ordem={i}>
              <span
                aria-hidden
                className="relative z-10 grid size-10 place-items-center rounded-full bg-amarelo font-titulo text-nota font-semibold text-amarelo-tinta"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 text-delta font-titulo font-semibold">
                {passo.titulo}
              </h3>
              <p className="mt-3 text-nota text-tinta-suave">{passo.descricao}</p>
            </Revela>
          </li>
        ))}
      </ol>
    </Seccao>
  );
}
