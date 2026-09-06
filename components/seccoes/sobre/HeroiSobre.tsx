import Image from "next/image";

import { Botao } from "@/components/ui/Botao";
import { Fita } from "@/components/ui/Fita";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { BANDA_ORCAMENTO, ORCAMENTO, SECTORES } from "@/lib/conteudo/comum";
import { HEROI } from "@/lib/conteudo/inicio";
import { ENTRADA, TITULO_LINHAS } from "@/lib/conteudo/sobre";
import { telefoneHref } from "@/lib/site";

/**
 * A chapa de título da `/sobre-nos/`.
 *
 * A fotografia é a mesma da homepage — o site actual serve o mesmo ficheiro em
 * `/`, `/sobre-nos/` e `/contactos/`. É gerada por IA, o que o
 * `docs/brief-experiencia.md` proíbe, e ficou por decisão do Gonçalo a 6 de
 * Setembro de 2026: mantém-se enquanto não houver fotografia real da empresa.
 * A decisão 11 do `docs/decisoes-pendentes.md` continua a pedi-la.
 *
 * **O véu é 66% e não os 60% da homepage, e a diferença está medida.**
 * Compôs-se a fotografia com o véu e com a fita por cima — que é o que a
 * `Fita` manda fazer, as duas camadas medem-se juntas — e leu-se o pior píxel
 * na janela onde o texto assenta:
 *
 *     véu 60% + fita 14%  →  4,29:1   ← reprova, e é o valor da homepage
 *     véu 66% + fita 14%  →  5,13:1   ← este
 *     véu 66% + fita  0%  →  6,49:1
 *
 * ⚠️ Ou seja, o herói da homepage tem o mesmo problema com a mesma imagem.
 * Não se corrige aqui: é outra página, e mudar-lhe o véu muda-lhe o aspecto.
 * Fica dito.
 */
export function HeroiSobre() {
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
        {/* `Sobre a JSK` e não `Sobre a Jsk`, que é o que o site actual mostra.
            Não é gralha do cliente: é o `text-transform: capitalize` do tema
            antigo a reescrever o nome da empresa. Ver `lib/conteudo/sobre.ts`. */}
        <h1 className="monta text-chapa font-titulo font-extrabold">
          {TITULO_LINHAS.map((linha, indice) => (
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
          style={{ "--i": 3 } as React.CSSProperties}
        >
          {ENTRADA}
        </p>

        <div
          className="entra mt-10 flex flex-wrap gap-4"
          style={{ "--i": 4 } as React.CSSProperties}
        >
          <Botao href={ORCAMENTO.href}>{ORCAMENTO.texto}</Botao>
          <Botao href={telefoneHref} aspecto="risco-claro">
            <Icone nome="telefone" className="size-5" />
            {BANDA_ORCAMENTO.chamada}
          </Botao>
        </div>

        {/* Os quatro sectores, ditos já. Nas páginas de sector esta placa lista
            os serviços da página; numa página sobre a empresa, o que há para
            listar é a empresa toda. */}
        <ul
          className="border-papel/25 mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6"
          aria-label="Sectores"
        >
          {SECTORES.map((sector, indice) => (
            <li
              key={sector.href}
              className="entra text-papel flex items-center gap-2.5 text-[0.8125rem] tracking-[0.06em]"
              style={{ "--i": 5 + indice } as React.CSSProperties}
            >
              <Icone
                nome={sector.icone}
                className="text-amarelo size-4 stroke-[2]"
              />
              {sector.nome}
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
