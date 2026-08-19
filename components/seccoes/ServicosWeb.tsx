import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Olho } from "@/components/ui/Olho";
import { Ornamento } from "@/components/ui/Ornamento";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import { PARCERIA_WEB, SERVICOS_WEB_CABECALHO } from "@/lib/conteudo/paginas";
import { SERVICOS_WEB } from "@/lib/conteudo/servicos";

/**
 * Os serviços da JSK Web e o bloco da parceria.
 *
 * No site antigo isto tudo vive dentro de um widget de HTML do Elementor que
 * contém um documento `<!DOCTYPE html>` completo — com o seu próprio `<head>`,
 * `<title>`, `<style>` e `<script>` — aninhado a meio da página. Traz uma
 * terceira cópia do Font Awesome do cdnjs, um bloco de CSS de um herói que
 * nunca renderiza, e um listener de `scroll` sem throttle nem
 * `requestAnimationFrame` para revelar três cartões.
 *
 * São componentes como os outros. Os cartões revelam-se com a mesma
 * `animation-timeline` do resto do site, sem JavaScript nenhum.
 */
export function ServicosWeb() {
  return (
    <Seccao>
      <TituloSeccao
        olho="Presença digital"
        titulo={SERVICOS_WEB_CABECALHO.titulo}
        intro={[SERVICOS_WEB_CABECALHO.subtitulo]}
      />

      <div className="mt-bloco grid gap-6 md:grid-cols-3">
        {SERVICOS_WEB.map((servico, i) => (
          <Revela key={servico.titulo} ordem={i} className="flex">
            <div className="premivel flex w-full flex-col rounded-cartao border border-linha bg-papel p-8 shadow-1 hover:shadow-2">
              <Icone nome={servico.icone} className="size-8 text-ocre" />
              <h3 className="mt-6 text-delta font-titulo font-semibold">
                {servico.titulo}
              </h3>
              <p className="mt-3 text-nota text-tinta-suave">{servico.descricao}</p>
            </div>
          </Revela>
        ))}
      </div>
    </Seccao>
  );
}

export function ParceriaWeb() {
  return (
    <Seccao fundo="tinta" className="relative isolate overflow-hidden">
      <Ornamento className="absolute -right-20 -bottom-28 -z-10 h-[24rem] w-auto text-amarelo/10" />
      <div className="revela flex max-w-3xl flex-col gap-6">
        <Olho className="text-amarelo">{PARCERIA_WEB.marca}</Olho>
        <h2 className="text-beta">{PARCERIA_WEB.titulo}</h2>
        {PARCERIA_WEB.paragrafos.map((p) => (
          <p key={p} className="max-w-medida text-papel/75">
            {p}
          </p>
        ))}
        <p className="font-titulo text-gama text-amarelo">{PARCERIA_WEB.destaque}</p>
        <div className="mt-2">
          <Botao
            href={PARCERIA_WEB.botao.href}
            variante="sobreTinta"
            icone="setaExterna"
            externo
          >
            {PARCERIA_WEB.botao.texto}
          </Botao>
        </div>
      </div>
    </Seccao>
  );
}
