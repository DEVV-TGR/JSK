import Image from "next/image";
import Link from "next/link";

import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import { TITULO_SECTORES } from "@/lib/conteudo/paginas";
import { SECTORES, type Sector } from "@/lib/conteudo/sectores";
import { cn } from "@/lib/utils";

/**
 * Os quatro sectores da JSK.
 *
 * É o bloco que mais denunciava o construtor de páginas: quatro blocos iguais
 * de 400px de altura, cada um com a sua fotografia por baixo de um véu preto a
 * 0,6, e o mesmo botão "Saiba Mais" quatro vezes. Quatro rectângulos idênticos
 * lado a lado lêem-se como uma grelha de stock, não como quatro negócios
 * diferentes.
 *
 * Aqui a grelha é assimétrica — 7+5 na primeira linha, 5+7 na segunda — e o
 * amarelo entra como um filete que cresce, em vez de um véu chapado. Os
 * números 01–04 ficam grandes e esbatidos por trás, como numeração de
 * capítulo.
 *
 * (No site antigo, o "Saiba Mais" do cartão das Obras aponta para `#`.)
 */
const LARGURAS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function GrelhaSectores() {
  return (
    <Seccao fundo="alternado">
      <TituloSeccao olho="O que fazemos" titulo={TITULO_SECTORES} />

      <div className="mt-bloco grid gap-6 lg:grid-cols-12">
        {SECTORES.map((sector, i) => (
          <Revela key={sector.id} ordem={i} className={cn(LARGURAS[i], "flex")}>
            <CartaoSector sector={sector} numero={i + 1} />
          </Revela>
        ))}
      </div>
    </Seccao>
  );
}

function CartaoSector({ sector, numero }: { sector: Sector; numero: number }) {
  return (
    <Link
      href={sector.rota}
      className={cn(
        "group premivel relative isolate flex min-h-[22rem] w-full flex-col justify-end",
        "overflow-hidden rounded-cartao bg-carvao p-8 text-papel",
        "shadow-1 hover:shadow-3",
      )}
    >
      <Image
        src={sector.capa}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className={cn(
          "-z-10 object-cover",
          "transition-transform duration-700 ease-saida group-hover:scale-[1.04]",
        )}
      />
      {/* Um degradê de baixo para cima, não um véu uniforme: escurece onde está
          o texto e deixa a fotografia respirar em cima. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-tinta via-tinta/70 via-40% to-tinta/15"
      />

      <span
        aria-hidden
        className="absolute top-6 right-7 font-titulo text-[4.5rem] leading-none text-papel/12"
      >
        {String(numero).padStart(2, "0")}
      </span>

      <Icone nome={sector.icone} className="mb-5 size-8 text-amarelo" />

      <h3 className="text-gama">{sector.nome}</h3>
      <p className="mt-3 max-w-md text-nota text-papel/75">{sector.resumo}</p>

      <span className="mt-6 inline-flex items-center gap-3 font-titulo text-nota font-semibold text-amarelo">
        Saiba Mais
        <Icone nome="setaDireita" className="size-5" />
      </span>

      {/* O filete cresce da esquerda no hover. É o amarelo a marcar o cartão
          sem ter de o cobrir. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-0 bottom-0 h-1 origin-left bg-amarelo",
          "scale-x-0 transition-transform duration-300 ease-saida",
          "group-hover:scale-x-100 group-focus-visible:scale-x-100",
        )}
      />
    </Link>
  );
}
