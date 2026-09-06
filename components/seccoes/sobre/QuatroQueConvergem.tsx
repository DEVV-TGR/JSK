import { Medida } from "@/components/ui/Seccao";
import { SECTORES } from "@/lib/conteudo/comum";
import { CONVERGE } from "@/lib/conteudo/sobre";

/**
 * O pico da página: os quatro que convergem.
 *
 * Quatro traços entram pelas arestas, cada um com o nome do seu sector, e
 * convergem na chapa da JSK ao centro — que acende quando o quarto chega.
 *
 * **É o único gesto do site que junta.** Todos os outros montam: a casa
 * arma-se, o painel arma, o andaime desmonta-se, a parede monta-se, o site
 * constrói-se. Este converge — e é a frase da visão desenhada, «entregar
 * soluções completas num só parceiro». Numa página que não vende serviço
 * nenhum, é o argumento que há.
 *
 * Os quatro nomes saem de `lib/conteudo/comum.ts`, os mesmos que alimentam o
 * cabeçalho e o rodapé: se um dia mudarem, mudam aqui também.
 *
 * Abaixo de `lg` a cena não é fixa — o desenho mais as quatro etiquetas não
 * cabem no ecrã de um telemóvel. Mesma saída do `.painel` da `/alarmes/`.
 */
export function QuatroQueConvergem() {
  return (
    <section className="converge bg-betao text-papel">
      <div className="lg:h-[300svh]">
        <div className="flex py-[var(--espaco-cena)] lg:sticky lg:top-[4.5rem] lg:h-[calc(100svh-4.5rem)] lg:items-center lg:py-0">
          <Medida className="w-full">
            <p className="text-grafite max-w-[var(--medida-texto)] text-[1.0625rem] leading-snug">
              {CONVERGE.abertura}
            </p>
            <h2 className="text-cena font-titulo mt-3 font-extrabold">
              {CONVERGE.titulo}
            </h2>

            <Desenho />

            <p className="converge-estado font-titulo text-amarelo mt-6 flex items-center gap-3 text-[0.8125rem] font-bold tracking-[0.16em] uppercase">
              <span className="bg-amarelo block size-2" aria-hidden="true" />
              {CONVERGE.estado}
            </p>
          </Medida>
        </div>
      </div>
    </section>
  );
}

/**
 * O desenho.
 *
 * Coordenadas fixas num `viewBox` de 800×420. Os quatro traços partem das
 * quatro arestas e acabam nos quatro cantos da chapa central, que ocupa os
 * 336–464 em x e os 176–244 em y.
 *
 * Cada caminho leva `pathLength="1"`, que normaliza qualquer comprimento a 1 —
 * os quatro têm comprimentos diferentes e sem isto o mais curto acabaria muito
 * antes do mais longo. É o mesmo truque da casa da homepage, e dispensa medir
 * cada traço em JavaScript.
 *
 * O `--i` de cada par traço/etiqueta é a ordem por que chegam, e é a ordem dos
 * sectores: alarmes, obras, screens, web.
 */
function Desenho() {
  /* Os quatro percursos, no sentido de fora para dentro. Cada um é uma
     horizontal e uma diagonal — como uma estrada que sai da recta e entra no
     nó. Nunca uma curva: o registo deste site é sinalética, e uma sinalética
     não tem curvas de Bézier. */
  const percursos = [
    "M40 60h150l146 116", // alarmes, do canto superior esquerdo
    "M40 360h150l146 -116", // obras, do canto inferior esquerdo
    "M760 60h-150l-146 116", // screens, do canto superior direito
    "M760 360h-150l-146 -116", // web, do canto inferior direito
  ];

  /* Onde cada etiqueta assenta, em percentagem da caixa do desenho. */
  const etiquetas = [
    { x: "5%", y: "9%", alinha: "text-start" },
    { x: "5%", y: "82%", alinha: "text-start" },
    { x: "95%", y: "9%", alinha: "text-end" },
    { x: "95%", y: "82%", alinha: "text-end" },
  ];

  return (
    <div className="relative mt-8 sm:mt-10">
      <svg
        viewBox="0 0 800 420"
        fill="none"
        aria-hidden="true"
        className="w-full"
      >
        {percursos.map((d, indice) => (
          <path
            key={d}
            d={d}
            pathLength="1"
            className="converge-traco stroke-grafite"
            strokeWidth="2"
            strokeLinecap="square"
            strokeLinejoin="miter"
            style={{ "--i": indice } as React.CSSProperties}
          />
        ))}

        {/* A chapa. O rectângulo amarelo com o filete preto por dentro é o
            mesmo motivo do `.chapa` do sistema — aqui em SVG porque tem de
            viver dentro do desenho, no ponto onde os quatro se encontram. */}
        <g className="converge-chapa">
          <rect x="336" y="176" width="128" height="68" className="fill-amarelo" />
          <rect
            x="341"
            y="181"
            width="118"
            height="58"
            className="stroke-asfalto"
            strokeWidth="3"
          />
          <text
            x="400"
            y="219"
            textAnchor="middle"
            className="fill-asfalto font-titulo text-[2rem] font-extrabold"
          >
            JSK
          </text>
        </g>
      </svg>

      {/* As etiquetas ficam em HTML e não em `<text>` do SVG: assim herdam a
          fonte e a escala fluida do resto do site, e um leitor de ecrã que
          ignore o `aria-hidden` do desenho continua a encontrá-las. */}
      {SECTORES.map((sector, indice) => (
        <span
          key={sector.href}
          /* `whitespace-nowrap` porque as duas da direita são posicionadas
              pela aresta e partiam-se em duas linhas, enquanto as da esquerda
              ficavam numa — quatro etiquetas iguais com dois formatos. */
          className={`converge-etiqueta font-titulo text-papel absolute -translate-y-1/2 text-[0.75rem] font-bold tracking-[0.16em] whitespace-nowrap uppercase ${etiquetas[indice].alinha}`}
          style={
            {
              "--i": indice,
              left: etiquetas[indice].x,
              top: etiquetas[indice].y,
              transform:
                etiquetas[indice].alinha === "text-end"
                  ? "translate(-100%, -50%)"
                  : "translateY(-50%)",
            } as React.CSSProperties
          }
        >
          {sector.nome}
        </span>
      ))}
    </div>
  );
}
