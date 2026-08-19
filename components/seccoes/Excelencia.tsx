import Image from "next/image";

import { ListaVerificada } from "@/components/ui/ListaVerificada";
import { Olho } from "@/components/ui/Olho";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { EXCELENCIA, MISSAO_VISAO } from "@/lib/conteudo/paginas";

export function Excelencia() {
  return (
    <Seccao>
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
        <Revela className="lg:col-span-6">
          <Olho>A JSK</Olho>
          <h2 className="mt-5 text-beta">{EXCELENCIA.titulo}</h2>
          <div className="mt-6 flex max-w-medida flex-col gap-4 text-tinta-suave">
            {EXCELENCIA.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <ListaVerificada className="mt-8" itens={EXCELENCIA.lista} />
        </Revela>

        <Revela ordem={1} className="lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-painel shadow-2">
            <Image
              src={EXCELENCIA.imagem}
              alt={EXCELENCIA.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Revela>
      </div>
    </Seccao>
  );
}

/**
 * A missão e a visão.
 *
 * Dois parágrafos longos. Ficam num campo escuro e com medida curta — um texto
 * destes numa largura de 1200px torna-se ilegível: o olho perde a linha ao
 * voltar para a esquerda.
 */
export function MissaoVisao() {
  return (
    <Seccao fundo="tinta">
      <div className="grid gap-12 md:grid-cols-2 md:gap-16">
        {MISSAO_VISAO.map((bloco, i) => (
          <Revela key={bloco.titulo} ordem={i}>
            <span aria-hidden className="block h-1 w-16 bg-amarelo" />
            <h2 className="mt-7 text-gama">{bloco.titulo}</h2>
            <p className="mt-5 text-papel/75">{bloco.texto}</p>
          </Revela>
        ))}
      </div>
    </Seccao>
  );
}
