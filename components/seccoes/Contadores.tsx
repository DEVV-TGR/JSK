import { Medida } from "@/components/ui/Seccao";
import { CONTADORES } from "@/lib/conteudo/inicio";

/**
 * Os números, em faixa fixa.
 *
 * A cena encosta ao ecrã e os quatro números atravessam-no da direita para a
 * esquerda enquanto o scroll continua à velocidade normal. Cada um conta até
 * ao seu valor quando chega ao centro.
 *
 * **Não é rapto de scroll.** Nada intercepta o evento de scroll — não há um
 * único `addEventListener` nesta página. O que existe é uma faixa a ser
 * deslocada por `translate3d`, com a linha temporal a ser a posição da cena.
 * A página anda ao ritmo de sempre; o que se move é o conteúdo.
 *
 * O percurso é calculado em CSS a partir da largura do painel e de quantos
 * são. O `max(0px, …)` não é defensivo à toa: num ecrã largo o conjunto cabe
 * todo, a conta dá negativo, e sem ele a faixa andaria para o lado errado.
 */
const PAINEIS = CONTADORES.length;

export function Contadores() {
  return (
    <section
      className="pista bg-betao text-papel"
      style={
        {
          "--painel": "min(38rem, 84vw)",
          "--vao": "0px",
          "--margem": "clamp(1.5rem, 6vw, 6rem)",
          "--percurso": `max(0px, calc(${PAINEIS} * var(--painel) + 2 * var(--margem) - 100vw))`,
        } as React.CSSProperties
      }
    >
            {/* 340svh porque a faixa passou a ter quatro paragens com repouso entre
          elas. Com 200svh e movimento contínuo, um número entrava e saía sem
          dar tempo de o ler — foi o que se viu na primeira versão. O orçamento
          de scroll agora não é só percurso, é percurso mais as pausas. */}
      <div className="h-[340svh]">
        <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col justify-center overflow-hidden">
          <Medida>
            <h2 className="text-bloco font-titulo max-w-[20ch] font-extrabold">
              O que já está feito.
            </h2>
          </Medida>

          <ol
            className="pista-faixa mt-10 flex items-stretch ps-[var(--margem)] will-change-transform"
            /* A faixa é uma lista horizontal a sério, e não uma imagem: quem
               usa leitor de ecrã ou teclado percorre os quatro números pela
               ordem em que estão escritos, ande a faixa ou não. */
          >
            {CONTADORES.map((contador, indice) => (
              <li
                key={contador.etiqueta}
                className="pista-painel border-amarelo border-e-betao flex w-[var(--painel)] shrink-0 flex-col justify-end border-t-4 border-e pe-10 pt-8"
                style={{ "--i": indice } as React.CSSProperties}
              >
                <p className="font-titulo text-[clamp(5rem,15vw,11rem)] leading-[0.85] font-extrabold">
                  <span
                    className="contador contador-pista"
                    aria-hidden="true"
                    style={{ "--alvo": contador.valor } as React.CSSProperties}
                  />
                  <span className="sr-only">{contador.valor}</span>
                </p>
                <p className="text-grafite mt-6 max-w-[24ch] text-[1.0625rem] leading-snug">
                  {contador.etiqueta}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
