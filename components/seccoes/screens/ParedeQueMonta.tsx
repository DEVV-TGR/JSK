import { Medida } from "@/components/ui/Seccao";
import { PAREDE } from "@/lib/conteudo/screens";

/**
 * O pico da página: a parede que se monta.
 *
 * Trinta e dois módulos entram pelos lados, encaixam em grelha, a parede
 * acende e o vídeo do cliente toca lá dentro.
 *
 * É o equivalente da `CasaQueArma` e do `PainelQueArma` para esta página:
 * mesma mecânica — uma linha temporal só, tudo lá dentro pendurado nela — e
 * forma diferente. Aqui não se desenha um traço nem se acendem zonas:
 * **monta-se**. É a verdade física do produto, e é o argumento de venda da
 * página dito sem uma linha de texto técnico: um ecrã LED de aluguer chega em
 * peças, monta-se onde for preciso, e desmonta-se a seguir.
 *
 * As três camadas, de baixo para cima:
 *
 * 1. **Os módulos**, opacos e apagados, que entram e encaixam.
 * 2. **O vídeo**, revelado por cima deles com um `clip-path` da esquerda para
 *    a direita. É a parede a acender, e num ecrã LED esse gesto tem nome
 *    próprio: é o varrimento.
 * 3. **As juntas**, sempre visíveis, por cima de tudo. Um ecrã LED montado tem
 *    as juntas à vista — é o que o distingue de um televisor grande.
 *
 * O `overflow-hidden` vive na moldura da parede e **não** no elemento
 * encostado. Um `overflow: hidden` num ascendente de um `position: sticky`
 * torna-o o contentor de scroll e o encosto deixa de acontecer.
 */
const COLUNAS = 8;
const LINHAS = 4;

export function ParedeQueMonta() {
  return (
    <section className="parede bg-betao text-papel">
      {/* 300svh é o mesmo orçamento de scroll do painel da `/alarmes/`: dá
          espaço às trinta e duas entradas escalonadas, ao varrimento e ainda à
          linha de estado, sem que nada feche depois de a cena já ter saído. */}
      <div className="h-[300svh]">
        <div className="sticky top-[4.5rem] flex h-[calc(100svh-4.5rem)] items-center">
          <Medida className="w-full">
            <p className="text-grafite max-w-[38ch] text-[1.0625rem] leading-snug">
              {PAREDE.abertura}
            </p>
            <h2 className="text-cena font-titulo mt-3 max-w-[20ch] font-extrabold">
              {PAREDE.titulo}
            </h2>

            <div className="relative mt-8 sm:mt-10">
              {/* O clarão. Um ecrã LED aceso derrama luz no que está à volta —
                  é isso que o distingue de um quadro pendurado, e é a única
                  parte desta cena que acontece **fora** da moldura.

                  Fica antes da moldura no fluxo e a moldura é `relative`, por
                  isso empilha-se por baixo sem um `z-index` a manter. Só a
                  opacidade anima; o desfoque é fixo. */}
              <div
                className="parede-clarao bg-amarelo pointer-events-none absolute -inset-6 blur-3xl"
                aria-hidden="true"
              />

              <div className="parede-encaixes border-asfalto relative aspect-16/9 overflow-hidden border-2">
              {/* A grelha, por baixo. Os módulos são a parede apagada: sem o
                  vídeo por cima, é isto que se vê.

                  **Sem `will-change` nos módulos.** A faixa dos contadores usa-o,
                  mas ali é um elemento; aqui seriam trinta e dois, ou seja
                  trinta e duas camadas de composição pedidas de véspera e
                  mantidas enquanto a página viver. O compositor promove o que
                  precisa quando a animação corre — pedir-lho para trinta e dois
                  de uma vez custa memória num telemóvel e não compra nada. */}
              <div
                className="absolute inset-0 grid grid-cols-8 grid-rows-4"
                aria-hidden="true"
              >
                {Array.from({ length: LINHAS * COLUNAS }, (_, n) => {
                  const linha = Math.floor(n / COLUNAS);
                  const coluna = n % COLUNAS;

                  /* Uma fila entra pela direita, a seguinte pela esquerda —
                     como se enfia uma fila de cada vez numa estrutura. É a
                     mesma alternância do `--lado` das pranchas do andaime. */
                  const daDireita = linha % 2 === 0;

                  /* O `--i` conta a partir da aresta por onde o módulo entra,
                     e não da coluna zero: assim o mais próximo chega primeiro
                     e o conjunto lê-se como uma diagonal a fechar, em vez de
                     uma barra de progresso da esquerda para a direita. */
                  const distancia = daDireita ? COLUNAS - 1 - coluna : coluna;

                  return (
                    <span
                      key={n}
                      className="parede-modulo modulo-led block"
                      style={
                        {
                          "--i": linha + distancia,
                          "--lado": daDireita ? 1 : -1,
                        } as React.CSSProperties
                      }
                    />
                  );
                })}
              </div>

              {/* O vídeo do cliente: uma fita LED da JSK acesa de noite.
                  `muted` e `playsInline` porque sem os dois o iOS recusa o
                  autoplay; `poster` porque em Low Power Mode recusa-o na
                  mesma, e sem ele a parede acendia para um rectângulo preto.
                  `preload="metadata"` para que 1,3 MB não sejam pedidos antes
                  de a cena valer a pena. */}
              <video
                className="parede-luz absolute inset-0 size-full object-cover"
                src={PAREDE.video.src}
                poster={PAREDE.video.poster}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                aria-hidden="true"
              />

                <div
                  className="parede-juntas absolute inset-0"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* O vídeo é decorativo para quem o vê e informativo para quem não
                o vê. Em vez de o anunciar a um leitor de ecrã como um media
                sem legendas, descreve-se aqui o que ele mostra. */}
            <p className="sr-only">{PAREDE.video.descricao}</p>

            <p className="parede-estado font-titulo text-amarelo mt-6 flex items-center gap-3 text-[0.8125rem] font-bold tracking-[0.16em] uppercase">
              <span className="bg-amarelo block size-2" aria-hidden="true" />
              {PAREDE.estado}
            </p>
          </Medida>
        </div>
      </div>
    </section>
  );
}
