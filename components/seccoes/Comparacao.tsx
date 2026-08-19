import Image from "next/image";

import { ListaVerificada } from "@/components/ui/ListaVerificada";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import {
  APLICACOES,
  COMPARACAO,
  INTRO_COMPARACAO,
  TITULO_APLICACOES,
  TITULO_COMPARACAO,
} from "@/lib/conteudo/comparacao";

/**
 * Comprar ou alugar um screen LED.
 *
 * ⚠️ As desvantagens levam `tipo="nao"` — cruz vermelha, não visto verde. No
 * site antigo as duas listas usam o mesmo ✔️, o que faz o bloco dizer o
 * contrário do que quer dizer: quem passa os olhos conta oito razões para
 * alugar quando três delas são razões para não o fazer.
 */
export function Comparacao() {
  return (
    <Seccao fundo="alternado">
      <TituloSeccao
        olho="A decisão"
        titulo={TITULO_COMPARACAO}
        intro={[INTRO_COMPARACAO]}
      />

      <div className="mt-bloco grid gap-6 md:grid-cols-2">
        {COMPARACAO.map((coluna, i) => (
          <Revela key={coluna.titulo} ordem={i} className="flex">
            <div className="flex w-full flex-col rounded-cartao border border-linha bg-papel p-8">
              <h3 className="text-gama">{coluna.titulo}</h3>

              <p className="olho mt-7">Vantagens</p>
              <ListaVerificada className="mt-4 text-nota" itens={coluna.vantagens} />

              <p className="olho mt-8">Desvantagens</p>
              <ListaVerificada
                className="mt-4 text-nota"
                tipo="nao"
                itens={coluna.desvantagens}
              />
            </div>
          </Revela>
        ))}
      </div>
    </Seccao>
  );
}

export function Aplicacoes() {
  return (
    <Seccao>
      <TituloSeccao olho="Onde entram" titulo={TITULO_APLICACOES} />

      <div className="mt-bloco grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7">
          {APLICACOES.map((aplicacao, i) => (
            <Revela key={aplicacao.titulo} ordem={i}>
              <h3 className="border-t border-linha pt-6 text-delta font-titulo font-semibold">
                {aplicacao.titulo}
              </h3>
              <ListaVerificada className="mt-5" itens={aplicacao.itens} />
            </Revela>
          ))}
        </div>

        {/* O módulo LED aberto mostra o que se está a alugar ou a comprar — é a
            única fotografia do produto em si que existe. Estava por baixo do
            vídeo, onde ficava a flutuar sem relação com nada. */}
        <Revela ordem={2} className="lg:col-span-5">
          <div className="rounded-painel bg-papel-fundo p-8">
            <Image
              src="/screens/ecra.webp"
              alt="Módulo de ecrã LED aberto, com a electrónica à vista"
              width={1400}
              height={800}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-auto w-full"
            />
          </div>
        </Revela>
      </div>
    </Seccao>
  );
}
