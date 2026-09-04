import { Botao } from "@/components/ui/Botao";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { HEROI, TITULO } from "@/lib/conteudo/inicio";

/**
 * A chapa de título.
 *
 * O primeiro ecrã não tem fotografia, e isso é uma decisão, não uma falta. O
 * herói do site actual é um PNG de 2,04 MB gerado por IA — o ficheiro chama-se
 * `ChatGPT-Image-10_08_2025-22_10_03.png` — servido como fundo CSS, sem
 * `srcset` e sem carregamento diferido, e é a primeira coisa que alguém vê de
 * uma empresa de segurança. Defeito #25.
 *
 * Tipo sobre terreno, à escala de sinalética, carrega no primeiro fotograma e
 * não mente sobre nada. Entra fotografia aqui no dia em que houver uma
 * instalação verdadeira fotografada para o efeito.
 */
export function Heroi() {
  /* A frase parte-se em linhas para que cada uma se monte na sua vez. O
     `aria-hidden` não entra aqui: são `<span>` dentro do mesmo `<h1>`, e um
     leitor de ecrã lê-os como uma frase só. */
  const linhas = TITULO.split(". ").map((linha, indice, todas) =>
    indice < todas.length - 1 ? `${linha}.` : linha,
  );

  return (
    <Seccao terreno="asfalto" topo={false} className="relative">
      <Medida className="afasta flex min-h-[max(32rem,calc(100svh-4.5rem))] flex-col justify-center py-20">
        <h1 className="monta text-chapa font-titulo max-w-[18ch] font-extrabold">
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
          className="entra text-guia text-grafite mt-8 max-w-[52ch]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {HEROI.entrada}
        </p>

        <div
          className="entra mt-10 flex flex-wrap gap-4"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Botao href={HEROI.primaria.href}>{HEROI.primaria.texto}</Botao>
          <Botao href={HEROI.secundaria.href} aspecto="risco-claro">
            {HEROI.secundaria.texto}
          </Botao>
        </div>
      </Medida>
    </Seccao>
  );
}
