import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { BANDA_ORCAMENTO, ORCAMENTO } from "@/lib/conteudo/comum";
import { telefoneHref } from "@/lib/site";

/**
 * O fecho, nas nove páginas.
 *
 * É a chapa amarela — o motivo que marcou cada cena — a ocupar o ecrã inteiro.
 * A gramática pede que o fim resolva em vez de se esbater: a última coisa que
 * se vê não é o rodapé, é o pedido, em cheio.
 *
 * Sem o número escrito por baixo dos botões: o `Ligue-nos Agora` já marca o
 * `tel:`, e o número por extenso continua no cabeçalho, no rodapé e na
 * apresentação. Repetido uma quarta vez ao fundo de cada uma das nove páginas
 * era ruído, não insistência.
 */
export function BandaOrcamento() {
  return (
    <>
      <div className="banda-perigo" aria-hidden="true" />
      <Seccao terreno="amarelo" className="relative overflow-hidden">
        <Medida>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <h2 className="text-cena font-titulo max-w-[14ch] font-extrabold">
                {BANDA_ORCAMENTO.titulo}
              </h2>
              <p className="text-guia mt-6 max-w-[46ch] font-medium">
                Diga-nos o que precisa. Respondemos com um orçamento claro e sem
                compromisso.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Botao href={ORCAMENTO.href} aspecto="risco">
                {ORCAMENTO.texto}
              </Botao>
              <Botao href={telefoneHref} aspecto="risco">
                <Icone nome="telefone" className="size-5" />
                {BANDA_ORCAMENTO.chamada}
              </Botao>
            </div>
          </div>
        </Medida>
      </Seccao>
    </>
  );
}
