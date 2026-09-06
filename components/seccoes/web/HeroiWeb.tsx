import { Botao } from "@/components/ui/Botao";
import { Fita } from "@/components/ui/Fita";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { ORCAMENTO } from "@/lib/conteudo/comum";
import { DEVPLUS, ENTRADA, SERVICOS, TITULO } from "@/lib/conteudo/web";

/**
 * A chapa de título da `/web/`.
 *
 * **É o único herói de sector sem fotografia, e é uma decisão a assumir.** As
 * três imagens que jsk.pt serve nesta página não servem: duas são mockups
 * gerados por IA de um jsk.pt inventado, com o menu ilegível (`-42% Alarmes`,
 * `Sustem hüp`) e o corpo do texto em garatuja; a terceira é stock genérico com
 * bolhas "UX/UI" em vermelho, que nem bate com a paleta. Numa página cujo
 * trabalho é provar que se sabe fazer sites, um screenshot falso com o menu
 * ilegível é auto-golo — e o brief já dizia "nada gerado por IA".
 *
 * No lugar entra a grelha de desenho, em CSS: o papel milimétrico onde um site
 * começa. É o mesmo motivo que a cena do pico vai construir, o que amarra a
 * página de ponta a ponta e não depende de material que não existe.
 *
 * O segundo botão vai para fora do site e leva a prop `externo`, que é o que
 * põe o `target="_blank"` com `rel="noopener noreferrer"`. Os dois links para a
 * DevPlus em jsk.pt abrem em separador novo **sem** `rel` — defeito #34.
 */
export function HeroiWeb() {
  const linhas = TITULO.split(" ");

  return (
    <Seccao terreno="asfalto" topo={false} className="relative isolate">
      <div
        className="grelha-desenho absolute inset-0 -z-30"
        aria-hidden="true"
        style={
          {
            "--linha": "rgb(255 255 255 / 0.06)",
            "--passo": "clamp(3rem, 6vw, 5.5rem)",
          } as React.CSSProperties
        }
      />
      <Fita />

      <Medida className="afasta flex min-h-[max(30rem,calc(100svh-4.5rem))] flex-col justify-center py-20">
        <h1 className="monta text-chapa font-titulo font-extrabold">
          {linhas.map((linha, indice) => (
            <span
              key={linha}
              className="block"
              style={{ "--i": indice } as React.CSSProperties}
            >
              {linha}
            </span>
          ))}
        </h1>

        <p
          className="entra text-guia text-papel mt-8 max-w-[42ch]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {ENTRADA}
        </p>

        <div
          className="entra mt-10 flex flex-wrap gap-4"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Botao href={ORCAMENTO.href}>{ORCAMENTO.texto}</Botao>
          <Botao href={DEVPLUS.href} aspecto="risco-claro" externo>
            Visite a {DEVPLUS.nome}
            <Icone nome="seta" className="size-4" />
          </Botao>
        </div>

        <ul
          className="border-papel/25 mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6"
          aria-label="Serviços"
        >
          {SERVICOS.itens.map((servico, indice) => (
            <li
              key={servico.nome}
              className="entra text-papel flex items-center gap-2.5 text-[0.8125rem] tracking-[0.06em]"
              style={{ "--i": 4 + indice } as React.CSSProperties}
            >
              <Icone nome="certo" className="text-amarelo size-4 stroke-[2.5]" />
              {servico.nome}
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
