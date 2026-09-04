import { FormularioContacto } from "@/components/seccoes/FormularioContacto";
import { Olho } from "@/components/ui/Olho";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { INTRODUCAO_INICIO, TITULO_FORMULARIO } from "@/lib/conteudo/paginas";

/**
 * A apresentação da empresa, na homepage, com o cartão de orçamento ao lado.
 *
 * No site antigo o cartão flutua com `margin: -105px 0 0 80px` e uma
 * `box-shadow: 0px 104px 104px -40px rgba(0,0,0,.16)` — 104px de desfoque com
 * 40px de contracção não descreve luz nenhuma. Aqui sobe sobre a secção
 * anterior, mas com uma sombra que corresponde a essa altura.
 */
export function Introducao() {
  return (
    <Seccao>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Revela className="lg:col-span-6">
          <Olho>Bem-vindo</Olho>
          <h2 className="mt-5 text-beta">{INTRODUCAO_INICIO.titulo}</h2>
          <div className="mt-6 flex max-w-medida flex-col gap-4 text-tinta-suave">
            {INTRODUCAO_INICIO.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <span aria-hidden className="mt-8 block h-1 w-24 bg-amarelo" />
        </Revela>

        <Revela ordem={1} className="lg:col-span-6">
          <div className="rounded-painel border border-linha bg-papel p-8 shadow-2 lg:-mt-28">
            <h3 className="text-delta font-titulo font-semibold">
              {TITULO_FORMULARIO}
            </h3>
            <p className="mt-3 text-nota text-tinta-suave">
              Diga-nos o que precisa. Respondemos com a maior brevidade possível.
            </p>
            <FormularioContacto className="mt-7" />
          </div>
        </Revela>
      </div>
    </Seccao>
  );
}
