import { ListaVerificada } from "@/components/ui/ListaVerificada";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import type { BlocoServicos as Bloco } from "@/lib/conteudo/servicos";

/**
 * A lista de serviços de um sector.
 *
 * ⚠️ O número de cada bloco vem do índice. No site antigo os três de `/obras/`
 * estão numerados `01.`, `01.`, `02.` — cada um foi escrito à mão dentro do seu
 * widget do Elementor, e ninguém reparou.
 */
export function BlocoServicos({ bloco, olho }: { bloco: Bloco; olho?: string }) {
  return (
    <Seccao>
      <TituloSeccao olho={olho} titulo={bloco.titulo} intro={bloco.intro} />

      <div className="mt-bloco grid gap-x-12 gap-y-12 md:grid-cols-2">
        {bloco.servicos.map((servico, i) => (
          <Revela key={servico.titulo} ordem={i}>
            <div className="flex items-baseline gap-4 border-t border-linha pt-6">
              <span
                aria-hidden
                className="font-titulo text-gama font-semibold text-amarelo"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-delta font-titulo font-semibold">
                {servico.titulo}
              </h3>
            </div>
            <ListaVerificada className="mt-5 text-nota" itens={servico.itens} />
          </Revela>
        ))}
      </div>
    </Seccao>
  );
}
