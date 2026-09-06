import { Medida, Seccao } from "@/components/ui/Seccao";
import { SERVICOS } from "@/lib/conteudo/web";

/**
 * Os seis serviços da DevPlus, no painel que arma.
 *
 * É o dispositivo do `PainelQueArma` da `/alarmes/` **inteiro**, e não só
 * metade: o LED de cada serviço acende, o texto limpa-se a seguir, e no fim o
 * contorno amarelo dá a volta ao painel e fecha.
 *
 * **Uma só linha temporal, a da secção.** É o que garante que o contorno só
 * parte depois de o último LED ter acendido. Uma primeira versão pendurou os
 * LEDs na linha temporal de cada item, o que dava seis relógios independentes
 * e não deixava lugar nenhum para um remate comum.
 *
 * **Sem cena fixa, e é a única diferença para a `/alarmes/`.** Lá o painel
 * encosta ao ecrã; aqui não pode, porque o `SiteQueSeConstroi` já encosta
 * imediatamente antes e duas cenas fixas seguidas põem a página a lutar com
 * quem desce.
 *
 * O contorno é amarelo sobre um traço preto, e não sobre o terreno: em `papel`
 * um filete amarelo sozinho quase não se lê. Assim a aresta está lá desde o
 * princípio — é o painel por armar — e o que se vê é o amarelo a passar por
 * cima dela.
 *
 * A copy é a do devplus.pt; a única coisa mudada foi o tratamento, listado
 * linha a linha no cabeçalho de `lib/conteudo/web.ts`.
 */
export function ServicosWeb() {
  return (
    <Seccao terreno="papel" className="servicos">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[var(--medida-titulo)] font-extrabold">
          {SERVICOS.titulo}
        </h2>

        <div className="border-asfalto relative mt-[var(--espaco-bloco)] border-2 p-6 sm:p-10 lg:p-14">
          <Contorno />

          <ol className="grid gap-x-14 sm:grid-cols-2">
            {SERVICOS.itens.map((servico, indice) => (
              <Servico
                key={servico.nome}
                indice={indice}
                nome={servico.nome}
                texto={servico.texto}
              />
            ))}
          </ol>
        </div>
      </Medida>
    </Seccao>
  );
}

/**
 * O contorno que fecha.
 *
 * Quatro filetes de 3px encostados às arestas, cada um a crescer a partir do
 * canto onde o anterior acabou — topo da esquerda para a direita, direita de
 * cima para baixo, fundo da direita para a esquerda, esquerda de baixo para
 * cima. Lidos em sequência, dão a volta.
 *
 * Os intervalos vão no `style` porque o que distingue um filete do outro é só
 * isso. Partem dos 70%, que é depois de o último serviço armar, e fecham aos
 * 98% — com a secção ainda à vista.
 */
function Contorno() {
  return (
    <span aria-hidden="true">
      <span
        className="servicos-contorno-h bg-amarelo absolute inset-x-0 top-0 h-[3px] origin-left"
        style={{ "--de": 70, "--ate": 79 } as React.CSSProperties}
      />
      <span
        className="servicos-contorno-v bg-amarelo absolute inset-y-0 end-0 w-[3px] origin-top"
        style={{ "--de": 79, "--ate": 84 } as React.CSSProperties}
      />
      <span
        className="servicos-contorno-h bg-amarelo absolute inset-x-0 bottom-0 h-[3px] origin-right"
        style={{ "--de": 84, "--ate": 93 } as React.CSSProperties}
      />
      <span
        className="servicos-contorno-v bg-amarelo absolute inset-y-0 start-0 w-[3px] origin-bottom"
        style={{ "--de": 93, "--ate": 98 } as React.CSSProperties}
      />
    </span>
  );
}

function Servico({
  indice,
  nome,
  texto,
}: {
  indice: number;
  nome: string;
  texto: string;
}) {
  /* O `--i` é o índice a sério, e não o resto da divisão por dois: os seis
     pendem todos da mesma linha temporal, e o que se quer é que armem pela
     ordem de leitura — que numa grelha de duas colunas é a ordem do `map`. */
  const i = { "--i": indice } as React.CSSProperties;

  return (
    <li className="border-asfalto/12 border-t py-6 first:border-t-0 sm:py-8 sm:[&:nth-child(2)]:border-t-0">
      <div className="flex items-center gap-4">
        {/* O LED. O anel está sempre lá — é o ponto de instalação; o que
            acende é o miolo amarelo. */}
        <span
          className="relative grid size-5 shrink-0 place-items-center"
          aria-hidden="true"
        >
          <span className="border-chumbo/40 absolute inset-0 rounded-full border" />
          <span className="servico-led bg-amarelo size-2 rounded-full" style={i} />
        </span>

        <span
          className="font-titulo text-grafite text-[0.8125rem] font-bold tracking-[0.16em] tabular-nums"
          aria-hidden="true"
        >
          {String(indice + 1).padStart(2, "0")}
        </span>

        <h3 className="font-titulo text-[1.25rem] leading-tight font-bold">
          {nome}
        </h3>
      </div>

      <p
        className="servico-texto text-chumbo mt-4 ps-9 text-[0.9375rem] leading-relaxed"
        style={i}
      >
        {texto}
      </p>
    </li>
  );
}
