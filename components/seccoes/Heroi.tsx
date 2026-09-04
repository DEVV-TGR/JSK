import Image from "next/image";

import { Botao } from "@/components/ui/Botao";
import { Envolvente } from "@/components/ui/Envolvente";
import { Olho } from "@/components/ui/Olho";
import { Ornamento } from "@/components/ui/Ornamento";
import type { Botao as TipoBotao } from "@/lib/conteudo/paginas";
import { cn } from "@/lib/utils";

type Props = {
  olho?: string;
  titulo: string;
  subtitulo: string;
  imagem: string;
  alt: string;
  botoes?: readonly TipoBotao[];
  /** O da entrada é mais alto — é o único que tem a página inteira para ele. */
  variante?: "inicio" | "pagina";
};

/**
 * O topo de cada página.
 *
 * O do site antigo são 700px de altura com a fotografia em `background-image`,
 * um véu preto a 0,3 com `mix-blend-mode: multiply` e um PNG decorativo
 * carimbado no canto. O texto fica centrado por cima, e a imagem — sendo fundo
 * de CSS — desce inteira para o telemóvel, sem `srcset` e sem carregamento
 * diferido.
 *
 * Este é uma composição assimétrica: o texto num campo de tinta à esquerda, a
 * fotografia a sangrar pela direita, e entre os dois um degradê que faz a
 * passagem em vez de um véu chapado por cima de tudo. Em ecrã estreito não há
 * espaço para dois lados, por isso a fotografia passa a ocupar o fundo todo
 * com o véu por cima — que é a única altura em que o véu é a resposta certa.
 */
export function Heroi({
  olho,
  titulo,
  subtitulo,
  imagem,
  alt,
  botoes,
  variante = "pagina",
}: Props) {
  const inicio = variante === "inicio";

  return (
    <section className="relative isolate overflow-hidden bg-carvao text-papel">
      <div className="absolute inset-0 -z-10 lg:left-[42%]">
        <Image
          src={imagem}
          alt={alt}
          fill
          priority
          /* Em ecrã estreito ocupa a largura toda; a partir de `lg` ocupa
             pouco mais de metade. Sem isto o browser assume 100vw e serve a
             maior versão a toda a gente. */
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-carvao/78",
            "lg:bg-linear-to-r lg:from-carvao lg:from-15% lg:via-carvao/55 lg:to-carvao/20",
          )}
        />
      </div>

      <Ornamento
        className={cn(
          "absolute -left-24 bottom-0 -z-10 h-[26rem] w-auto text-amarelo/10",
          "hidden lg:block",
        )}
      />

      <Envolvente
        className={cn(
          /* ⚠️ Sem `items-start`. Num contentor `flex-col`, o
             `align-items: flex-start` faz cada filho dimensionar-se ao seu
             conteúdo em vez de acompanhar a largura disponível — e o
             "conteúdo" de um parágrafo é a linha inteira por quebrar. Com o
             `max-w-3xl` a servir de tecto, o bloco ficava com 768px fixos e
             saía do ecrã num telemóvel de 390px, com o título cortado a meio
             da palavra. Os filhos esticam; quem não deve esticar leva
             `self-start`. */
          "flex flex-col gap-6",
          /* O cabeçalho é fixo e tem 5rem. O `pt` conta com ele. */
          inicio ? "pt-40 pb-24 lg:pt-52 lg:pb-32" : "pt-36 pb-20 lg:pt-44 lg:pb-24",
        )}
      >
        <div className={cn("flex w-full flex-col gap-5", inicio ? "max-w-3xl" : "max-w-2xl")}>
          {olho && <Olho className="text-amarelo">{olho}</Olho>}
          <h1 className={inicio ? "text-alfa" : "text-beta"}>{titulo}</h1>
          <p className="max-w-medida text-papel/80">{subtitulo}</p>
        </div>

        {botoes && botoes.length > 0 && (
          <div className="mt-2 flex flex-wrap items-center gap-4">
            {botoes.map((b) => (
              <Botao
                key={b.href}
                href={b.href}
                variante={b.variante}
                icone={b.icone}
                externo={b.externo}
              >
                {b.texto}
              </Botao>
            ))}
          </div>
        )}
      </Envolvente>
    </section>
  );
}
