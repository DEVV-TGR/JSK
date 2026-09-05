import Image from "next/image";

import { Botao } from "@/components/ui/Botao";
import { Fita } from "@/components/ui/Fita";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { BANDA_ORCAMENTO, ORCAMENTO } from "@/lib/conteudo/comum";
import { ENTRADA, HEROI_IMAGEM, SERVICOS, TITULO } from "@/lib/conteudo/obras";
import { telefoneHref } from "@/lib/site";

/**
 * A chapa de título da `/obras/`.
 *
 * Leva a fotografia, como a homepage. E a fotografia é a melhor deste site
 * inteiro: uma moradia com o andaime montado, tirada em obra — não é um espaço
 * acabado nem uma imagem gerada. Quem entra vê trabalho a acontecer.
 *
 * Não é só a melhor à entrada: é ela que ensina o vocabulário que a cena do
 * meio vai gastar. Quando o andaime desenhado se desmontar sobre a cozinha
 * acabada, já se sabe o que um andaime é numa obra da JSK, porque se viu um a
 * sério no primeiro ecrã.
 *
 * O véu volta a dar 60%, e não por se ter copiado o da homepage: a conta
 * refez-se sobre **esta** fotografia, que é outra, com o `object-top` que ela
 * leva e nas três larguras onde o `object-cover` corta de maneira diferente.
 * A 55% a entrada ficava nos 4,2:1 e precisa de 4,5 — o céu branco desta
 * fotografia é o que manda, e é bem mais claro do que parece a olho.
 */
export function HeroiObras() {
  const linhas = TITULO.split(" ");

  return (
    <Seccao terreno="asfalto" topo={false} className="relative isolate">
      <Image
        src={HEROI_IMAGEM.src}
        alt={HEROI_IMAGEM.alt}
        fill
        priority
        sizes="100vw"
        /* O enquadramento é o de cima: o andaime e as pranchas estão no terço
           superior da fotografia, e um `object-center` num ecrã largo cortava-os
           para mostrar o jardim. */
        className="-z-30 object-cover object-top"
      />
      <div className="bg-asfalto/60 absolute inset-0 -z-20" aria-hidden="true" />
      <Fita />

      <Medida className="afasta flex min-h-[max(30rem,calc(100svh-4.5rem))] flex-col justify-center py-20">
        {/* O nome parte-se em duas linhas pela mesma razão que na `/alarmes/`:
            cabia numa só, mas um sinal com duas linhas é mais alto, e a altura
            é o que faz a escala. Continua a ser um `<h1>` com `JSK Obras` — os
            `<span>` são disposição, e um leitor de ecrã lê-os como uma frase. */}
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
          <Botao href={telefoneHref} aspecto="risco-claro">
            <Icone nome="telefone" className="size-5" />
            {BANDA_ORCAMENTO.chamada}
          </Botao>
        </div>

        {/* Os três nomes de serviço, ditos já. Mesma placa suplementar da
            `/alarmes/`: não é um eyebrow — está por baixo do título, não por
            cima — e diz o que a página vai desenvolver. */}
        <ul
          className="border-papel/25 mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6"
          aria-label="Serviços"
        >
          {SERVICOS.blocos.map((bloco, indice) => (
            <li
              key={bloco.titulo}
              className="entra text-papel flex items-center gap-2.5 text-[0.8125rem] tracking-[0.06em]"
              style={{ "--i": 4 + indice } as React.CSSProperties}
            >
              <Icone nome="certo" className="text-amarelo size-4 stroke-[2.5]" />
              {bloco.titulo}
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
