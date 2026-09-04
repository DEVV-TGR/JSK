import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Medida } from "@/components/ui/Seccao";
import { CASA } from "@/lib/conteudo/sectores";

/**
 * O pico da página: a casa que se arma.
 *
 * Uma casa desenhada a traço. Ao descer, o traço fecha-se, os sensores acendem
 * um a um com o nome do serviço a que correspondem, o perímetro fecha e o
 * sistema fica armado.
 *
 * Não é decoração. É a lista de serviços da JSK Alarmes contada pelo alçado de
 * uma casa em vez de por quatro listas com `✔️` — e não precisa de uma
 * fotografia, que é exactamente onde este projecto está fraco.
 *
 * Três coisas técnicas que a fazem funcionar:
 *
 * 1. **Uma só linha temporal.** A cena declara `view-timeline: --casa` e tudo
 *    lá dentro pende dela. A ordem é garantida pela posição no scroll, não por
 *    temporizadores que se dessincronizam.
 * 2. **`pathLength="1"`** em cada caminho. Normaliza qualquer comprimento a 1,
 *    o que permite animar `stroke-dashoffset` de 1 a 0 sem medir nada em
 *    JavaScript — que é como isto normalmente se faz.
 * 3. **Intervalo `contain`.** É exactamente o tempo em que a cena ocupa o ecrã
 *    inteiro, ou seja o tempo em que está encostada. Fecha enquanto ainda se
 *    vê; um `cover 100%` nunca chegaria ao fim se esta fosse a última cena.
 */
export function CasaQueArma() {
  return (
    <section className="casa bg-asfalto text-papel relative">
      {/* A altura da secção é o que dá espaço à sequência. É o maior span da
          página, e é de propósito: é aqui que está o momento. */}
      <div className="h-[340svh]">
        <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] items-center overflow-hidden">
          <Medida className="grid w-full items-center gap-6 sm:gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            <Desenho />

            <div className="order-first lg:order-none">
              {/* O silêncio: esta linha está no ecrã sozinha antes de o traço
                  começar. É o vazio que faz o pico subir.

                  Sai num ecrã baixo. A cena é fixa e a caixa tem
                  `overflow-hidden`, por isso o que não cabe não fica cortado a
                  meio — desaparece. Num ecrã de 736px de altura o que
                  desaparecia era precisamente esta linha, sem deixar rasto. É
                  a primeira coisa a dispensar porque o título diz o mesmo, e
                  vale mais perdê-la de propósito do que ao acaso. */}
              <p className="text-grafite max-w-[34ch] text-[1.0625rem] leading-relaxed [@media(max-height:820px)]:hidden lg:block">
                {CASA.abertura}
              </p>
              {/* `arma-se` tem um hífen a sério lá dentro, e o quebra-linhas
                  trata-o como um ponto de quebra legítimo — a primeira versão
                  desta cena mostrava "A casa arma- / se consigo." */}
              <h2 className="text-cena font-titulo mt-4 max-w-[15ch] font-extrabold sm:mt-6">
                A casa <span className="whitespace-nowrap">arma-se</span>{" "}
                consigo.
              </h2>

              <ol className="mt-6 space-y-px [@media(max-height:820px)]:mt-4 sm:mt-10">
                {CASA.sensores.map((sensor, indice) => (
                  <Etiqueta key={sensor.etiqueta} indice={indice} {...sensor} />
                ))}
                <Etiqueta
                  indice={CASA.sensores.length}
                  {...CASA.perimetro}
                />
              </ol>

              <div className="casa-estado mt-6 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-5">
                <p className="chapa font-titulo inline-flex items-center gap-2.5 px-4 py-2.5 text-[0.875rem] font-bold tracking-[0.08em] uppercase">
                  <Icone nome="escudo" className="size-4 stroke-[2.5]" />
                  {CASA.estado}
                </p>
                <Botao
                  href={CASA.chamada.href}
                  aspecto="risco-claro"
                  className="px-5 py-3 text-[0.8125rem]"
                >
                  {CASA.chamada.texto}
                </Botao>
              </div>
            </div>
          </Medida>
        </div>
      </div>
    </section>
  );
}

function Etiqueta({
  indice,
  etiqueta,
  onde,
}: {
  indice: number;
  etiqueta: string;
  onde: string;
}) {
  return (
    <li
      className="casa-etiqueta border-betao flex items-baseline justify-between gap-6 border-t py-2.5 sm:py-3"
      style={{ "--i": indice } as React.CSSProperties}
    >
      <span className="text-[0.9375rem] font-medium">{etiqueta}</span>
      <span className="text-grafite text-[0.8125rem]">{onde}</span>
    </li>
  );
}

/**
 * O alçado.
 *
 * Coordenadas fixas num `viewBox` de 800×540. Os quatro sensores estão nos
 * sítios que os nomes dizem: a porta, a janela, o beirado e a cobertura.
 */
function Desenho() {
  const sensores = [
    { x: 400, y: 372 }, // abertura — o topo da porta
    { x: 292, y: 286 }, // movimento — a janela da esquerda
    { x: 604, y: 232 }, // câmara — o beirado direito
    { x: 400, y: 176 }, // fumo e calor — o vão da cobertura
  ];

  return (
    <svg
      viewBox="0 0 800 540"
      fill="none"
      /* O tecto em `svh` é o que impede a cena de transbordar num ecrã
         baixo. A caixa fixa tem `overflow-hidden`, por isso o que não coubesse
         não ficava cortado a meio — desaparecia, e a linha de abertura era a
         primeira a ir. Aconteceu a 414×736. */
      className="mx-auto max-h-[30svh] w-full max-w-[30rem] [@media(max-height:820px)]:max-h-[24svh] sm:max-h-[36svh] lg:max-h-[62svh] lg:max-w-none"
      role="img"
      aria-label="Alçado de uma casa com os pontos onde entram os sensores, as câmaras, os detetores de incêndio e o alarme perimetral."
    >
      <g
        className="casa-traco"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Solo */}
        <path pathLength="1" d="M60 470h680" />
        {/* Corpo e cobertura */}
        <path pathLength="1" d="M230 470V236h340v234" />
        <path pathLength="1" d="M196 250 400 128l204 122" />
        {/* Porta */}
        <path pathLength="1" d="M368 470V372h64v98" />
        {/* Janelas */}
        <path pathLength="1" d="M262 286h60v58h-60zM478 286h60v58h-60z" />
        {/* Vão da cobertura */}
        <path pathLength="1" d="M376 176h48v34h-48z" />
      </g>

      {/* O perímetro fecha em último, e é o único traço amarelo do desenho:
          é o limite vigiado, não mais uma parede. */}
      <path
        className="casa-perimetro text-amarelo"
        pathLength="1"
        d="M96 500h608a24 24 0 0 0 24-24V196a24 24 0 0 0-13-21L410 60a24 24 0 0 0-20 0L85 175a24 24 0 0 0-13 21v280a24 24 0 0 0 24 24Z"
        stroke="currentColor"
        strokeWidth={2}
        strokeDasharray="1"
      />

      {sensores.map((sensor, indice) => (
        <g
          key={`${sensor.x}-${sensor.y}`}
          className="casa-sensor text-amarelo"
          style={
            {
              "--i": indice,
              transformOrigin: `${sensor.x}px ${sensor.y}px`,
            } as React.CSSProperties
          }
        >
          <circle
            cx={sensor.x}
            cy={sensor.y}
            r={22}
            fill="currentColor"
            opacity={0.16}
          />
          <circle cx={sensor.x} cy={sensor.y} r={8} fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}
