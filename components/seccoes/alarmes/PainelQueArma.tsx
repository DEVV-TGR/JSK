import { Icone } from "@/components/ui/Icone";
import { Medida } from "@/components/ui/Seccao";
import { SERVICOS } from "@/lib/conteudo/alarmes";

/**
 * O pico da página: o painel arma-se.
 *
 * Os quatro serviços da JSK Alarmes deixam de ser quatro listas com `✔️` e
 * passam a ser quatro **zonas de um painel de alarme**. Ao descer, o LED de
 * cada zona acende, os pontos dessa zona limpam-se da esquerda para a direita,
 * e no fim o contorno amarelo dá a volta ao painel e fecha.
 *
 * É o equivalente da `CasaQueArma` para esta página: mesma mecânica, forma
 * diferente. A casa fica só na homepage — quem chega de lá pelo `Ver a JSK
 * Alarmes` não pode encontrar aqui o mesmo desenho outra vez.
 *
 * Três coisas que a fazem funcionar:
 *
 * 1. **Uma só linha temporal.** A cena declara `view-timeline: --painel` e tudo
 *    lá dentro pende dela. A ordem vem da posição no scroll, não de
 *    temporizadores que se dessincronizam.
 * 2. **Intervalo `contain`.** É o tempo em que a cena ocupa o ecrã inteiro, ou
 *    seja o tempo em que está encostada. Fecha enquanto ainda se vê.
 * 3. **Abaixo de `lg` a cena não é fixa.** Quatro zonas com as suas listas não
 *    cabem no ecrã de um telemóvel, e uma cena fixa que não cabe corta o que lá
 *    está sem deixar rasto — foi o que aconteceu à casa a 414×736. Aí é fluxo
 *    normal e cada zona entra pela sua própria posição.
 *
 * Não traz `<h2>`. O título deste bloco é o `Os Nossos Serviços` da cena
 * anterior, cujo texto acaba em dois pontos precisamente a apontar para aqui —
 * daí o `aria-labelledby` em vez de um título novo inventado.
 */
export function PainelQueArma() {
  return (
    <section
      className="painel bg-asfalto text-papel"
      aria-labelledby="os-nossos-servicos"
    >
      <div className="lg:h-[300svh]">
        <div className="flex py-[var(--espaco-cena)] lg:sticky lg:top-[4.5rem] lg:h-[calc(100svh-4.5rem)] lg:items-center lg:py-0">
          <Medida className="w-full">
            <div className="border-betao relative border-2 p-6 sm:p-10 lg:p-14">
              <Contorno />

              <ol className="grid gap-x-12 sm:grid-cols-2">
                {SERVICOS.itens.map((servico, indice) => (
                  <Zona key={servico.titulo} indice={indice} {...servico} />
                ))}
              </ol>
            </div>
          </Medida>
        </div>
      </div>
    </section>
  );
}

function Zona({
  indice,
  titulo,
  icone,
  pontos,
}: (typeof SERVICOS.itens)[number] & { indice: number }) {
  return (
    <li
      className="painel-zona border-betao border-t py-6 first:border-t-0 sm:py-8 sm:[&:nth-child(2)]:border-t-0 lg:py-10"
      style={{ "--i": indice } as React.CSSProperties}
    >
      <div className="flex items-center gap-4">
        {/* O LED. O anel cinzento está sempre lá — é o ponto de instalação; o
            que acende é o miolo amarelo, que é a zona a armar. */}
        <span
          className="relative grid size-5 shrink-0 place-items-center"
          aria-hidden="true"
        >
          <span className="border-grafite/50 absolute inset-0 rounded-full border" />
          <span
            className="painel-led bg-amarelo size-2 rounded-full"
            style={{ "--i": indice } as React.CSSProperties}
          />
        </span>

        <span
          className="font-titulo text-grafite text-[0.8125rem] font-bold tracking-[0.16em] tabular-nums"
          aria-hidden="true"
        >
          {String(indice + 1).padStart(2, "0")}
        </span>

        <h3 className="font-titulo text-[1.125rem] leading-tight font-bold text-balance sm:text-[1.25rem]">
          {titulo}
        </h3>

        <Icone nome={icone} className="text-grafite ms-auto size-5 shrink-0" />
      </div>

      <ul
        className="painel-lista mt-4 ps-9"
        style={{ "--i": indice } as React.CSSProperties}
      >
        {pontos.map((ponto) => (
          <li
            key={ponto}
            className="text-grafite flex items-baseline gap-3 py-1.5 text-[0.9375rem]"
          >
            <Icone
              nome="certo"
              className="text-amarelo size-3.5 shrink-0 translate-y-0.5 stroke-[2.5]"
            />
            {ponto}
          </li>
        ))}
      </ul>
    </li>
  );
}

/**
 * O contorno que fecha.
 *
 * Quatro filetes de 2px encostados às arestas do painel, cada um a crescer a
 * partir do canto onde o anterior acabou — topo da esquerda para a direita,
 * direita de cima para baixo, fundo da direita para a esquerda, esquerda de
 * baixo para cima. Lidos em sequência, dão a volta.
 *
 * Os intervalos vão no `style` porque o que distingue um filete do outro é só
 * isso. Somam-se aos 55% em que a última zona acaba de armar e fecham aos 94%,
 * ou seja com o painel ainda no ecrã.
 */
function Contorno() {
  return (
    <span aria-hidden="true">
      <span
        className="painel-contorno-h bg-amarelo absolute inset-x-0 top-0 h-[2px] origin-left"
        style={{ "--de": 58, "--ate": 70 } as React.CSSProperties}
      />
      <span
        className="painel-contorno-v bg-amarelo absolute inset-y-0 end-0 w-[2px] origin-top"
        style={{ "--de": 70, "--ate": 76 } as React.CSSProperties}
      />
      <span
        className="painel-contorno-h bg-amarelo absolute inset-x-0 bottom-0 h-[2px] origin-right"
        style={{ "--de": 76, "--ate": 88 } as React.CSSProperties}
      />
      <span
        className="painel-contorno-v bg-amarelo absolute inset-y-0 start-0 w-[2px] origin-bottom"
        style={{ "--de": 88, "--ate": 94 } as React.CSSProperties}
      />
    </span>
  );
}
