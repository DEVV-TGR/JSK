import Image from "next/image";

import { Botao } from "@/components/ui/Botao";
import { Fita } from "@/components/ui/Fita";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { HEROI, TITULO } from "@/lib/conteudo/inicio";

/**
 * A chapa de título.
 *
 * Entra fotografia — a mesma que o site actual serve, e vale a pena dizer o
 * que muda além de ela aparecer aqui. Em jsk.pt é um PNG de 2,04 MB
 * (`ChatGPT-Image-10_08_2025-22_10_03.png`) posto como `background-image`, sem
 * `srcset` e sem prioridade declarada: 2 MB para pintar o primeiro ecrã.
 * Defeito #25. Aqui são 55 KB de WebP à largura nativa, com `priority` porque
 * é o LCP da página, e o original fica em `originais/` fora do git.
 *
 * O véu não é escurecimento por gosto. O sinal amarelo da fotografia cai
 * exactamente onde o título e a entrada assentam, e o amarelo é claro: sem
 * véu, branco sobre ele anda pelos 2:1. Os 60% saem de compor a foto, o véu e
 * a fita pixel a pixel nas zonas do texto — a 390, 768 e 1440, porque o
 * `object-cover` corta de maneira diferente em cada uma — e procurar o valor
 * mais baixo que deixa **o pior pixel** acima de 4,5:1 nas três. Dá 4,6:1 no
 * pior caso, que é a entrada aos 390. Baixar o véu perde-o.
 *
 * A entrada deixou de ser `text-grafite` pela mesma conta: os 5,7:1 do
 * `#8c8c8c` são sobre asfalto liso e não sobrevivem a fotografia por baixo.
 */
export function Heroi() {
  /* A frase parte-se em linhas para que cada uma se monte na sua vez. O
     `aria-hidden` não entra aqui: são `<span>` dentro do mesmo `<h1>`, e um
     leitor de ecrã lê-os como uma frase só. */
  const linhas = TITULO.split(". ").map((linha, indice, todas) =>
    indice < todas.length - 1 ? `${linha}.` : linha,
  );

  return (
    <Seccao terreno="asfalto" topo={false} className="relative isolate">
      {/* O `isolate` da secção prende estes `-z-*` aqui dentro. Sem ele, uma
          camada negativa passa por trás do fundo do `<body>` e desaparece. */}
      <Image
        src={HEROI.imagem.src}
        alt={HEROI.imagem.alt}
        fill
        priority
        /* Ecrã inteiro em qualquer largura — não há variante mais estreita
           que sirva. */
        sizes="100vw"
        className="-z-30 object-cover"
      />
      <div className="bg-asfalto/60 absolute inset-0 -z-20" aria-hidden="true" />
      <Fita />

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
          className="entra text-guia text-papel mt-8 max-w-[52ch]"
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
