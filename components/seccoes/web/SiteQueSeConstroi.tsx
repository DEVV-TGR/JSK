import { Medida } from "@/components/ui/Seccao";
import { CONSTROI } from "@/lib/conteudo/web";

/**
 * O pico da página: o site que se constrói.
 *
 * Uma moldura de página que se faz em quatro fases, pela ordem por que um site
 * se faz a sério — a grelha, os blocos, a tipografia, a marca — com o nome de
 * cada fase a acender ao lado no momento em que ela acontece.
 *
 * É o equivalente da casa da homepage, do painel da `/alarmes/`, do andaime da
 * `/obras/` e da parede da `/screens-led/`: a mesma mecânica de uma linha
 * temporal só, e forma diferente outra vez. E é o argumento desta página dito
 * sem uma linha de texto técnico — o que a DevPlus vende é exactamente isto,
 * por esta ordem.
 *
 * **Não leva fotografia nenhuma, e é de propósito.** As únicas imagens que a
 * `/web/` tinha eram mockups gerados por IA de um jsk.pt inventado, com o menu
 * ilegível. Numa página que vende web design, um screenshot falso é auto-golo.
 * O mesmo argumento que justificou a casa que se arma: um gesto desenhado não
 * depende de material que não existe.
 *
 * Abaixo de `lg` a cena não é fixa — a moldura mais a coluna das fases não cabe
 * num telemóvel, e uma cena fixa que não cabe corta o que lá está. Mesma saída
 * do `.painel` da `/alarmes/`.
 */
export function SiteQueSeConstroi() {
  return (
    <section className="constroi bg-betao text-papel">
      <div className="lg:h-[300svh]">
        <div className="flex py-[var(--espaco-cena)] lg:sticky lg:top-[4.5rem] lg:h-[calc(100svh-4.5rem)] lg:items-center lg:py-0">
          <Medida className="w-full">
            <p className="text-grafite max-w-[40ch] text-[1.0625rem] leading-snug">
              {CONSTROI.abertura}
            </p>
            <h2 className="text-cena font-titulo mt-3 max-w-[20ch] font-extrabold">
              {CONSTROI.titulo}
            </h2>

            <div className="mt-10 grid items-center gap-10 lg:mt-12 lg:grid-cols-[1fr_18rem] lg:gap-16">
              <Moldura />

              <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
                {CONSTROI.fases.map((fase, indice) => (
                  <li
                    key={fase.nome}
                    className="constroi-fase border-grafite/30 border-t pt-4"
                    style={{ "--i": indice } as React.CSSProperties}
                  >
                    <p className="font-titulo flex items-baseline gap-3 text-[1.0625rem] font-bold">
                      <span
                        className="text-amarelo text-[0.75rem] tracking-[0.16em] tabular-nums"
                        aria-hidden="true"
                      >
                        {String(indice + 1).padStart(2, "0")}
                      </span>
                      {fase.nome}
                    </p>
                    <p className="text-grafite mt-1.5 text-[0.9375rem] leading-snug">
                      {fase.nota}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </Medida>
        </div>
      </div>
    </section>
  );
}

/**
 * A moldura, e o que se constrói lá dentro.
 *
 * Decorativa de ponta a ponta: quem usa leitor de ecrã já leu a abertura, o
 * título e as quatro fases, que é o conteúdo todo desta cena. Um desenho de
 * rectângulos não acrescenta nada a quem não o vê.
 */
function Moldura() {
  return (
    <div
      className="border-asfalto bg-asfalto relative aspect-16/10 overflow-hidden border-2"
      aria-hidden="true"
    >
      {/* A grelha tem de **se ver**: a primeira fase chama-se `A grelha` e uma
          fase que promete uma coisa invisível não é uma fase. A 0.07 de alfa,
          que é o valor que serve os cartões pequenos dos trabalhos, aqui não
          se lia. O passo também subiu — 8.33% dá doze colunas, que é uma
          grelha de desenho, e não a malha fina que 6.25% produzia. */}
      <div
        className="constroi-grelha grelha-desenho absolute inset-0"
        style={
          {
            "--linha": "rgb(255 255 255 / 0.16)",
            "--passo": "8.333%",
          } as React.CSSProperties
        }
      />

      <div className="absolute inset-0 grid grid-rows-[9%_1fr_28%_13%] gap-[2.5%] p-[3.5%]">
        {/* O cabeçalho: a chapa da marca e a barra de navegação. */}
        <div className="flex gap-[1.5%]">
          <Bloco indice={0} className="w-[16%]">
            <span className="constroi-marca bg-amarelo absolute inset-0" />
          </Bloco>
          <Bloco indice={0} className="flex-1" />
        </div>

        {/* O herói: três linhas de texto e um botão. */}
        <Bloco
          indice={1}
          className="flex flex-col justify-center gap-[3.5%] px-[4%]"
        >
          <Barra largura="58%" />
          <Barra largura="72%" />
          <Barra largura="41%" />
          <span className="constroi-marca bg-amarelo relative mt-[2%] block h-[11%] w-[24%]" />
        </Bloco>

        {/* Os três cartões. */}
        <div className="grid grid-cols-3 gap-[2.5%]">
          <Bloco indice={2} />
          <Bloco indice={3} />
          <Bloco indice={4} />
        </div>

        <Bloco indice={5} />
      </div>
    </div>
  );
}

/**
 * Um bloco da página desenhada.
 *
 * É **uma** peça que é as duas coisas: o contorno é o wireframe, e o filho que
 * se limpa por dentro é o site acabado. Duas camadas separadas obrigavam a
 * mantê-las em sincronia; assim a fase dos blocos e a da tipografia partilham
 * o mesmo elemento e nunca podem desalinhar.
 */
function Bloco({
  indice,
  className = "",
  children,
}: {
  indice: number;
  className?: string;
  children?: React.ReactNode;
}) {
  const i = { "--i": indice } as React.CSSProperties;

  return (
    <div
      className={`constroi-bloco border-grafite/35 relative border ${className}`}
      style={i}
    >
      <div className="constroi-cheio bg-grafite/20 absolute inset-0" style={i} />
      {children}
    </div>
  );
}

/**
 * Uma linha de texto do desenho.
 *
 * `relative` e não estática: o preenchimento do bloco é um absoluto, e um
 * irmão estático a seguir a ele seria pintado por baixo. Com `relative` a
 * linha fica por cima sem precisar de `z-index`.
 */
function Barra({ largura }: { largura: string }) {
  return (
    <span
      className="bg-grafite/45 relative block h-[7%]"
      style={{ width: largura }}
    />
  );
}
