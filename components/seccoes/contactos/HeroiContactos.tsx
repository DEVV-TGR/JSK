import Image from "next/image";

import { Botao } from "@/components/ui/Botao";
import { Fita } from "@/components/ui/Fita";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { ENTRADA, TITULO } from "@/lib/conteudo/contactos";
import { HEROI } from "@/lib/conteudo/inicio";
import { emailHref, site, telefoneHref } from "@/lib/site";

/**
 * A chapa de título da `/contactos/`.
 *
 * Mesma fotografia da homepage e da `/sobre-nos/` — o site actual serve o
 * mesmo ficheiro nas três. É gerada por IA, o que o brief proíbe, e mantém-se
 * por decisão do Gonçalo enquanto não houver fotografia real.
 *
 * O véu é 66%, como na `/sobre-nos/`, e pela mesma conta: a 60% — o valor da
 * homepage — o pior píxel debaixo do polígono escuro da fita dá 4,29:1 e
 * reprova; a 66% dá 5,13:1.
 *
 * Os dois botões são acções directas e não navegação: telefonar e escrever.
 * Numa página de contactos, mandar a pessoa para outra página seria o
 * contrário do que ela veio fazer.
 */
export function HeroiContactos() {
  const linhas = TITULO.split(" ");

  return (
    <Seccao terreno="asfalto" topo={false} className="relative isolate">
      <Image
        src={HEROI.imagem.src}
        alt={HEROI.imagem.alt}
        fill
        priority
        sizes="100vw"
        className="-z-30 object-cover"
      />
      <div className="bg-asfalto/66 absolute inset-0 -z-20" aria-hidden="true" />
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
          <Botao href={telefoneHref}>
            <Icone nome="telefone" className="size-5" />
            {site.telefone}
          </Botao>
          <Botao href={emailHref} aspecto="risco-claro">
            <Icone nome="correio" className="size-5" />
            {site.email}
          </Botao>
        </div>
      </Medida>
    </Seccao>
  );
}
