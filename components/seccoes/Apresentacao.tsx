import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { SECTORES_NAV } from "@/lib/conteudo/comum";
import { APRESENTACAO } from "@/lib/conteudo/inicio";
import { site, telefoneHref, urlMapa } from "@/lib/site";

/**
 * A placa de informação.
 *
 * A primeira versão desta cena era um título e dois parágrafos soltos numa
 * secção branca, e destoava de tudo o resto — era a única parte da página sem
 * chapa, sem filete e sem grelha, e lia-se como se fosse de outro site.
 *
 * Continua a ser a cena mais calma da página, e é de propósito: vem
 * imediatamente antes do pico. Mas calmo não é por desenhar. O que faz o
 * sossego aqui é a grelha e o branco, não a ausência de forma.
 *
 * A tira de baixo não traz uma palavra nova: a morada, os sectores e o
 * telefone saem todos de `lib/site.ts` e de `lib/conteudo/comum.ts`. É a placa
 * de identificação que o site antigo nunca teve em lado nenhum.
 */
export function Apresentacao() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <div className="border-asfalto border-2">
          {/* A barra do topo é a mesma linguagem das tiras da pilha de
              sectores: preto, etiqueta pequena, muito espaçada. */}
          <div className="bg-asfalto text-papel flex items-center gap-4 px-6 py-3.5 sm:px-10">
            <span className="bg-amarelo block size-2.5" aria-hidden="true" />
            <span className="font-titulo text-[0.75rem] font-bold tracking-[0.16em] uppercase">
              A empresa
            </span>
            <span className="text-grafite ms-auto hidden text-[0.75rem] tracking-[0.08em] sm:block">
              {site.morada.localidade} · {site.morada.concelho}
            </span>
          </div>

          <div className="grid gap-x-14 gap-y-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:p-14">
            <h2 className="entra text-cena font-titulo font-extrabold text-balance">
              {APRESENTACAO.titulo}
            </h2>

            <div>
              {/* O primeiro parágrafo é a entrada e leva corpo maior; o segundo
                  fecha e recua. Dois parágrafos do mesmo tamanho lêem-se como
                  um bloco só, que era o que aqui estava. */}
              <p
                className="entra text-[1.25rem] leading-[1.55] font-medium text-balance"
                style={{ "--i": 0 } as React.CSSProperties}
              >
                {APRESENTACAO.paragrafos[0]}
              </p>
              <p
                className="entra text-chumbo mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed"
                style={{ "--i": 1 } as React.CSSProperties}
              >
                {APRESENTACAO.paragrafos[1]}
              </p>
            </div>
          </div>

          {/* A tira de dados. Factos, não venda — e todos verificáveis. */}
          <dl className="border-asfalto grid border-t-2 sm:grid-cols-3">
            <Dado etiqueta="Morada" indice={0}>
              <a
                href={urlMapa}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amarelo inline-flex items-center gap-2.5 [transition:color_160ms_ease]"
              >
                <Icone nome="morada" className="size-4" />
                {site.morada.linha}
              </a>
            </Dado>

            <Dado etiqueta="Sectores" indice={1}>
              {SECTORES_NAV.map((sector) => sector.texto).join(" · ")}
            </Dado>

            <Dado etiqueta="Telefone" indice={2} ultimo>
              <a
                href={telefoneHref}
                className="hover:text-amarelo inline-flex items-center gap-2.5 [transition:color_160ms_ease]"
              >
                <Icone nome="telefone" className="size-4" />
                {site.telefone}
              </a>
            </Dado>
          </dl>
        </div>
      </Medida>
    </Seccao>
  );
}

function Dado({
  etiqueta,
  indice,
  ultimo,
  children,
}: {
  etiqueta: string;
  indice: number;
  ultimo?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`entra px-6 py-6 sm:px-8 ${
        ultimo ? "" : "border-asfalto border-b-2 sm:border-b-0 sm:border-e-2"
      }`}
      style={{ "--i": indice } as React.CSSProperties}
    >
      <dt className="font-titulo text-chumbo text-[0.75rem] font-bold tracking-[0.16em] uppercase">
        {etiqueta}
      </dt>
      <dd className="mt-2.5 text-[0.9375rem] font-medium">{children}</dd>
    </div>
  );
}
