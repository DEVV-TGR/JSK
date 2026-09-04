import { Botao } from "@/components/ui/Botao";
import { Envolvente } from "@/components/ui/Envolvente";
import { Ornamento } from "@/components/ui/Ornamento";
import { BANDA_ORCAMENTO } from "@/lib/conteudo/paginas";
import { telefoneHref } from "@/lib/site";

/**
 * A chamada para orçamento, no fim de todas as páginas.
 *
 * No site antigo isto é um template do Elementor com `padding: 200px 40px
 * 120px` e um `background: linear-gradient(180deg, rgba(0,5,47,0) 16%, #000000
 * 16%)` — um gradiente com dois pontos de paragem no mesmo sítio, que é a
 * maneira difícil de escrever uma linha recta.
 */
export function BandaOrcamento() {
  return (
    <section className="relative overflow-hidden bg-carvao py-seccao text-papel">
      <Ornamento className="absolute -right-16 -bottom-24 h-[22rem] w-auto text-amarelo/12" />

      <Envolvente className="relative">
        {/* Sem `items-start` — ver o comentário no Heroi. */}
        <div className="flex w-full max-w-3xl flex-col gap-8">
          <h2 className="text-beta">{BANDA_ORCAMENTO.titulo}</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Botao href="/contactos/" icone="setaDireita">
              {BANDA_ORCAMENTO.botaoPrincipal}
            </Botao>
            <Botao href={telefoneHref} variante="sobreTinta" icone="telefone">
              {BANDA_ORCAMENTO.botaoTelefone}
            </Botao>
          </div>
        </div>
      </Envolvente>
    </section>
  );
}
