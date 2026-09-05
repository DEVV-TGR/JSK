import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { DIFERENCIAIS } from "@/lib/conteudo/inicio";

/**
 * A câmara que varre.
 *
 * Uma câmara pendurada no seu suporte, com o cone de visão a chegar ao chão, a
 * varrer de um lado ao outro enquanto se desce a página. Não é decoração: é o
 * que a JSK instala, a fazer o que faz.
 *
 * Aqui esteve uma grelha de seis cartões iguais, e era a única cena da página
 * sem objecto próprio — o título monta-se, os sectores empilham-se, a casa
 * arma-se, os números atravessam, a chapa fecha, e esta tinha o `entra`
 * genérico que a página já usa em mais três sítios.
 *
 * ## A geometria
 *
 * Tudo o que se mexe está num só `<g>` que roda à volta do **eixo do suporte**
 * — o ponto onde o braço encosta à parede. É por isso que o corpo, a lente e o
 * cone andam juntos, como andam numa câmara a sério: não há uma peça a rodar
 * por sua conta.
 *
 * O cone é mais comprido do que a altura do desenho e o conjunto está cortado
 * pelo chão (`clipPath`). Sem isso, a ponta do cone descolava do chão a cada
 * grau de rotação e ficava a pairar — com o corte, a luz acaba **sempre**
 * exactamente no chão, esteja a câmara virada para onde estiver.
 *
 * ## Porque é que fica virada para um lado quando não anima
 *
 * `docs/movimento.md`: **o estado por omissão de tudo é o estado final.** Sem
 * `animation-timeline`, ou com menos movimento pedido no sistema, vê-se uma
 * câmara virada para o fim do varrimento — que é uma câmara instalada e a
 * apontar, não um desenho a meio. O ângulo de repouso está no CSS, não aqui.
 */

const EIXO_X = 300;
const EIXO_Y = 54;
const LENTE_Y = 300;
const CHAO_Y = 500;

function Camara() {
  return (
    <svg
      viewBox="0 0 600 540"
      className="w-full"
      role="img"
      aria-label="Uma câmara de videovigilância no seu suporte, a varrer o espaço de um lado ao outro."
    >
      <defs>
        {/* O corte no chão: é o que faz a luz acabar sempre no sítio certo. */}
        <clipPath id="camara-chao">
          <rect x="0" y="0" width="600" height={CHAO_Y} />
        </clipPath>
      </defs>

      {/* A chapa do suporte, encostada à parede. Não roda. */}
      <rect
        x={EIXO_X - 68}
        y={EIXO_Y - 32}
        width={136}
        height={32}
        rx={4}
        className="fill-asfalto"
      />

      <g clipPath="url(#camara-chao)">
        <g className="camara-braco">
          {/* O cone vem primeiro para ficar por trás do corpo. Meio ângulo de
              18° e comprimento a mais de propósito: o corte no chão trata do
              resto, e a ponta nunca descola. */}
          <path
            d={`M${EIXO_X} ${LENTE_Y} L${EIXO_X - 111} ${LENTE_Y + 342} Q${EIXO_X} ${LENTE_Y + 374} ${EIXO_X + 111} ${LENTE_Y + 342} Z`}
            className="fill-amarelo"
            fillOpacity={0.6}
          />

          {/* Braço e rótula. */}
          <rect
            x={EIXO_X - 12}
            y={EIXO_Y}
            width={24}
            height={70}
            className="fill-asfalto"
          />
          <circle cx={EIXO_X} cy={EIXO_Y + 70} r={26} className="fill-asfalto" />

          {/* O corpo. */}
          <rect
            x={EIXO_X - 52}
            y={EIXO_Y + 78}
            width={104}
            height={158}
            rx={16}
            className="fill-asfalto"
          />

          {/* A pala. É o que distingue uma câmara de exterior de um cilindro
              qualquer, e a linha clara é o que a separa do corpo — sem ela as
              duas peças fundem-se numa mancha só. */}
          <rect
            x={EIXO_X - 68}
            y={LENTE_Y - 64}
            width={136}
            height={52}
            rx={14}
            className="fill-asfalto stroke-papel"
            strokeOpacity={0.22}
            strokeWidth={2}
          />

          {/* A lente. */}
          <circle cx={EIXO_X} cy={LENTE_Y} r={46} className="fill-asfalto" />
          <circle cx={EIXO_X} cy={LENTE_Y} r={32} className="fill-papel" />
          <circle cx={EIXO_X} cy={LENTE_Y} r={19} className="fill-asfalto" />
          <circle
            cx={EIXO_X - 12}
            cy={LENTE_Y - 11}
            r={6}
            className="fill-papel"
            fillOpacity={0.75}
          />
        </g>
      </g>

      {/* O chão. É a única linha horizontal do desenho e é o que dá escala ao
          resto — sem ela a câmara flutua. */}
      <path
        d={`M20 ${CHAO_Y} H580`}
        className="stroke-asfalto"
        strokeWidth={3}
        strokeLinecap="round"
      />

      {/* O rasto: o pedaço de chão por onde a luz já passou. Vai de 120 a 480
          porque é aí que o cone assenta nos dois extremos do varrimento — o
          rasto e a luz andam à mesma velocidade e no mesmo intervalo, por isso
          a ponta do rasto está sempre debaixo do cone.

          É isto que faz o gesto ler-se como um varrimento e não como uma
          câmara a abanar. */}
      <path
        className="camara-rasto stroke-amarelo"
        d={`M120 ${CHAO_Y} H480`}
        pathLength={1}
        strokeWidth={7}
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * A cena.
 *
 * Fica em `papel`. A sequência de terrenos está registada em
 * `docs/brief-experiencia.md`, e sem esta cena o último terço da página ficava
 * escuro sem corte nenhum — é `betão → papel → amarelo` que faz a chapa final
 * bater.
 *
 * A câmara fica encostada (`sticky`) e as seis provas passam ao lado, cada uma
 * a fechar-se com o seu filete amarelo. É pin de um objecto e não da cena
 * inteira: a cena da casa continua a ser a única que ocupa o ecrã todo, que é
 * o que lhe dá o estatuto de pico.
 */
export function Diferenciais() {
  return (
    <Seccao terreno="papel" className="camara">
      <Medida className="grid gap-y-[var(--espaco-bloco)] lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:gap-x-20">
        {/* `h-fit` é o que impede o `sticky` de não fazer nada: uma coluna de
            grelha estica à altura da linha por omissão, e uma caixa tão alta
            como o que a rodeia nunca tem por onde deslizar. */}
        <div className="lg:sticky lg:top-[calc(4.5rem+var(--espaco-bloco))] lg:h-fit">
          <h2 className="text-cena font-titulo max-w-[16ch] font-extrabold">
            {DIFERENCIAIS.titulo}
          </h2>

          <div className="mx-auto mt-10 w-full max-w-[24rem] lg:mt-12 lg:max-w-none">
            <Camara />
          </div>
        </div>

        <ol className="border-asfalto border-t-2">
          {DIFERENCIAIS.itens.map((item, indice) => (
            <li
              key={item.titulo}
              className="relative grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 py-8 sm:gap-x-6 sm:py-10 lg:py-12"
              style={{ "--i": indice } as React.CSSProperties}
            >
              {/* O número vem do `index`. No site antigo a numeração dos
                  serviços de `/obras/` está `01., 01., 02.` porque era texto
                  colado à mão — num `map` esse erro deixa de ser possível. */}
              <div className="flex items-center gap-2.5">
                <span className="font-titulo text-[1.5rem] leading-none font-extrabold tabular-nums">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <Icone
                  nome={item.icone}
                  className="text-chumbo size-5 stroke-[1.8]"
                />
              </div>

              <h3 className="text-bloco font-titulo font-extrabold text-balance">
                {item.titulo}
              </h3>

              <p className="text-chumbo col-start-2 mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed">
                {item.texto}
              </p>

              {/* A régua de repouso e o filete que a atravessa têm a mesma
                  espessura: o amarelo cobre o cinzento ao passar, em vez de o
                  deixar a espreitar por baixo. */}
              <span
                className="bg-asfalto/12 absolute inset-x-0 bottom-0 h-[3px]"
                aria-hidden="true"
              />
              <span
                className="filete bg-amarelo absolute inset-x-0 bottom-0 h-[3px]"
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>
      </Medida>
    </Seccao>
  );
}
