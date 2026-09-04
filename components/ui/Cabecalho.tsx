import Link from "next/link";

import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Marca } from "@/components/ui/Marca";
import { NavegacaoSectores } from "@/components/ui/NavegacaoSectores";
import { Medida } from "@/components/ui/Seccao";
import { INSTITUCIONAL, ORCAMENTO, SECTORES_NAV } from "@/lib/conteudo/comum";
import { emailHref, site, telefoneHref } from "@/lib/site";

/**
 * O cabeçalho.
 *
 * A primeira versão tinha seis links do mesmo tamanho em fila — `JSK Alarmes`,
 * `JSK Obras`, `JSK Screens`, `JSK Web`, `Sobre Nós`, `Contactos` — e cansava.
 * Não por serem seis: por serem seis **iguais**, com a palavra JSK repetida
 * cinco vezes na mesma barra.
 *
 * O que está aqui agora:
 *
 * - **Um pórtico, não uma lista.** Os quatro sectores formam uma barra própria,
 *   encostada ao fundo do cabeçalho, com um indicador amarelo no que está
 *   aberto. É a metáfora que o resto do site já usa, e diz onde a pessoa está —
 *   coisa que a versão anterior não fazia.
 * - **Duas ordens de importância.** Os sectores são o que a empresa vende e
 *   estão em maiúsculas, a cheio. `Sobre nós` e `Contactos` são páginas
 *   institucionais e estão em corpo pequeno, em cinza, do outro lado da linha
 *   vertical. Deixaram de competir.
 * - **O nome curto.** `Alarmes` e não `JSK Alarmes`. O logótipo ao lado já diz
 *   JSK; o nome completo continua no `<h1>` de cada página, no `<title>` e no
 *   rodapé.
 *
 * Um só cabeçalho no DOM. O tema Astra punha lá dois, `#ast-desktop-header` e
 * `#ast-mobile-header`, e escondia um por consulta de media — a navegação
 * inteira duplicada em todas as páginas. Defeito #29.
 */
export function Cabecalho() {
  return (
    <header className="bg-asfalto text-papel border-betao sticky top-0 z-50 border-b">
      <Medida className="flex h-[4.5rem] items-center gap-6">
        <Marca />

        {/* Os sectores ficam ao lado da marca, não encostados à direita. Numa
            barra larga, tudo empurrado para um canto deixa um vazio ao lado do
            logótipo e faz a navegação parecer um apêndice. */}
        <NavegacaoSectores className="hidden self-stretch lg:block" />

        <div className="ms-auto flex items-center gap-5">
          {/* A linha vertical é o que separa o que a empresa vende do que a
              empresa é. Sem ela, os dois grupos voltam a ler-se como um. */}
          <span
            aria-hidden="true"
            className="bg-betao hidden h-6 w-px lg:block"
          />

          <nav aria-label="Institucional" className="hidden lg:block">
            <ul className="flex items-center gap-5">
              {INSTITUCIONAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-grafite hover:text-papel text-[0.875rem] whitespace-nowrap [transition:color_160ms_ease]"
                  >
                    {item.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Botao
            href={ORCAMENTO.href}
            className="hidden px-5 py-3 text-[0.8125rem] sm:inline-flex"
          >
            Orçamento
          </Botao>

          <MenuTelemovel />
        </div>
      </Medida>

      {/* A linha de progresso da página, no topo e não no fundo: o fundo do
          cabeçalho é do indicador de sector, e dois filetes amarelos no mesmo
          pixel liam-se como um só, partido ao meio.

          É a única coisa no site conduzida pelo scroll do documento inteiro e
          não pela posição de um elemento. Sem `animation-timeline` fica a
          zero — invisível — em vez de ficar parada a meio, que é como um
          ornamento deve falhar. */}
      <div
        className="progresso bg-amarelo absolute inset-x-0 top-0 h-[3px] origin-left"
        aria-hidden="true"
      />
    </header>
  );
}

/**
 * O menu de telemóvel.
 *
 * É um `<details>`, que já traz o abrir e fechar, o foco e o anúncio de estado
 * feitos pelo browser. Um menu escrito à mão em JavaScript costuma ficar pior
 * nos três, e este não leva uma linha.
 */
function MenuTelemovel() {
  return (
    <details className="group lg:hidden">
      <summary
        className="text-papel hover:text-amarelo grid size-11 cursor-pointer list-none place-items-center [&::-webkit-details-marker]:hidden"
        aria-label="Abrir o menu"
      >
        <span aria-hidden="true" className="grid gap-[5px]">
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
          <span className="block h-[2px] w-6 bg-current" />
        </span>
      </summary>

      {/* Painel a ecrã inteiro, e não uma caixinha no canto.

          A altura total não é gosto: com o painel só à altura do conteúdo, a
          página continuava a ver-se por baixo dele e o botão `Quem Somos` do
          herói aparecia colado ao fim do menu, como se fosse mais um item. */}
      <div className="bg-asfalto border-betao fixed inset-x-0 top-[4.5rem] flex h-[calc(100svh-4.5rem)] flex-col overflow-y-auto border-t">
        <Medida className="flex min-h-full flex-col py-6">
          <nav aria-label="Sectores, telemóvel">
            <ol>
              {SECTORES_NAV.map((sector, indice) => (
                <li key={sector.href}>
                  <Link
                    href={sector.href}
                    className="border-betao hover:text-amarelo flex h-16 items-center gap-5 border-b [transition:color_140ms_ease]"
                  >
                    <span
                      className="font-titulo text-grafite text-[0.75rem] font-bold tracking-[0.16em] tabular-nums"
                      aria-hidden="true"
                    >
                      {String(indice + 1).padStart(2, "0")}
                    </span>
                    <span className="font-titulo text-[1.5rem] font-extrabold">
                      {sector.texto}
                    </span>
                    <Icone nome="seta" className="ms-auto size-5" />
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          {/* Os alvos de toque levam 44px de altura. Não é um número
              arredondado: é o mínimo das WCAG (2.5.8) e é a largura de um dedo.
              A primeira versão deste painel tinha-os a 18px — texto corrido sem
              espaçamento — e falhava. */}
          <nav aria-label="Institucional, telemóvel" className="mt-4">
            <ul className="flex flex-wrap gap-x-8">
              {INSTITUCIONAL.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-grafite hover:text-papel flex min-h-11 items-center text-[0.9375rem] [transition:color_140ms_ease]"
                  >
                    {item.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto grid gap-3 pt-8">
            <Botao href={ORCAMENTO.href} className="w-full">
              {ORCAMENTO.texto}
            </Botao>
            {/* Aqui o número faz sentido: é um painel aberto de propósito, e
                num telemóvel tocar-lhe é uma chamada. O que saiu da barra foi
                o número sempre à vista, não o número de todo. */}
            <a
              href={telefoneHref}
              className="text-grafite hover:text-amarelo flex min-h-11 items-center justify-center gap-2.5 text-[0.9375rem] [transition:color_140ms_ease]"
            >
              <Icone nome="telefone" className="size-4" />
              {site.telefone}
            </a>
            <a
              href={emailHref}
              className="text-grafite hover:text-amarelo flex min-h-11 items-center justify-center gap-2.5 text-[0.875rem] [transition:color_140ms_ease]"
            >
              <Icone nome="correio" className="size-4" />
              {site.email}
            </a>
          </div>
        </Medida>
      </div>
    </details>
  );
}
