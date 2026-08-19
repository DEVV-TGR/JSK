import { Icone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import type { Diferenciador } from "@/lib/conteudo/diferenciadores";

type Props = {
  olho?: string;
  titulo: string;
  intro?: readonly string[];
  itens: readonly Diferenciador[];
  fundo?: "papel" | "alternado" | "veu";
};

/**
 * O que distingue a JSK — seis itens na homepage, três em /sobre-nos/.
 *
 * O site antigo põe isto em `icon-box` do Elementor todas iguais, centradas,
 * três por linha. Seis caixas idênticas com um ícone em cima lêem-se como uma
 * lista de funcionalidades de um produto de software, não como o que uma
 * empresa faz melhor do que as outras.
 *
 * Aqui são entradas numeradas com o filete amarelo à esquerda e medida
 * generosa. A numeração vem do índice.
 */
export function Diferenciais({ olho, titulo, intro, itens, fundo = "papel" }: Props) {
  return (
    <Seccao fundo={fundo}>
      <TituloSeccao olho={olho} titulo={titulo} intro={intro} />

      <ul className="mt-bloco grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {itens.map((item, i) => (
          <li key={item.titulo}>
            <Revela ordem={i} className="border-t border-linha pt-6">
              <div className="flex items-center justify-between gap-4">
                <Icone nome={item.icone} className="size-7 text-ocre" />
                <span
                  aria-hidden
                  className="font-titulo text-nota font-semibold text-tinta-suave/60"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-5 text-delta font-titulo font-semibold">
                {item.titulo}
              </h3>
              <p className="mt-3 text-nota text-tinta-suave">{item.descricao}</p>
            </Revela>
          </li>
        ))}
      </ul>
    </Seccao>
  );
}
