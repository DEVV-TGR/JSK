import Image from "next/image";

import { Botao } from "@/components/ui/Botao";
import { Fita } from "@/components/ui/Fita";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { BANDA_ORCAMENTO, ORCAMENTO } from "@/lib/conteudo/comum";
import {
  APLICACOES,
  ENTRADA,
  HEROI_IMAGEM,
  INTRO,
  TITULO,
} from "@/lib/conteudo/screens";
import { telefoneHref } from "@/lib/site";

/**
 * A chapa de título da `/screens-led/`.
 *
 * Leva a fotografia, como as duas irmãs — e é a mais discutível das três. O
 * que está nela é a montra da Panda Pet, com sinalética impressa e nenhum ecrã
 * LED à vista. Ficou por decisão do Gonçalo, com o argumento de que é trabalho
 * real da JSK num espaço comercial. A nota inteira está em
 * `lib/conteudo/screens.ts`, ao pé do `alt`, e é para lá que se deve olhar
 * antes de alguém trocar esta imagem.
 *
 * A placa suplementar por baixo do título são os três blocos da própria
 * página, com os títulos que o cliente lhes deu — incluindo o `Screens Led` e
 * o `Ecrãs Para interior`, que são o texto dele e não um descuido nosso.
 */
export function HeroiScreens() {
  const linhas = TITULO.split(" ");

  const blocos = [INTRO.titulo, ...APLICACOES.blocos.map((b) => b.titulo)];

  return (
    <Seccao terreno="asfalto" topo={false} className="relative isolate">
      <Image
        src={HEROI_IMAGEM.src}
        alt={HEROI_IMAGEM.alt}
        fill
        priority
        sizes="100vw"
        /* A fotografia tem 2000×934 e é quase toda fachada. Num ecrã alto o
           `object-cover` corta pelos lados, e o que interessa — o letreiro e
           as montras — vive na faixa do meio. Daí o `object-center`. */
        className="-z-30 object-cover object-center"
      />
      {/* O véu refez-se sobre **esta** fotografia, e não se copiou o das irmãs.
          É uma fachada bege lavada, mais clara do que o céu da `/obras/`.

          Medido, e não estimado: compôs-se a fotografia com o véu e com a fita
          por cima — que é o que a `Fita` manda fazer, as duas camadas medem-se
          juntas — e leu-se o pior píxel na janela onde o texto assenta.

            véu 60% + fita 14%  →  4,29:1   ← reprova, e é o valor da `/obras/`
            véu 72% + fita 14%  →  6,19:1   ← este
            véu 72% + fita  0%  →  8,15:1

          Ou seja: copiar os 60% da página irmã punha o texto pequeno abaixo dos
          4,5:1 debaixo do polígono mais escuro da fita. Daí os 72%. */}
      <div className="bg-asfalto/72 absolute inset-0 -z-20" aria-hidden="true" />
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
          <Botao href={telefoneHref} aspecto="risco-claro">
            <Icone nome="telefone" className="size-5" />
            {BANDA_ORCAMENTO.chamada}
          </Botao>
        </div>

        <ul
          className="border-papel/25 mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6"
          aria-label="O que esta página cobre"
        >
          {blocos.map((bloco, indice) => (
            <li
              key={bloco}
              className="entra text-papel flex items-center gap-2.5 text-[0.8125rem] tracking-[0.06em]"
              style={{ "--i": 4 + indice } as React.CSSProperties}
            >
              <Icone nome="certo" className="text-amarelo size-4 stroke-[2.5]" />
              {bloco}
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
