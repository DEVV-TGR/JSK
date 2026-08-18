import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

/**
 * `next/image` com `sizes` obrigatório.
 *
 * Sem `sizes`, uma imagem responsiva assume que ocupa a largura toda do ecrã e
 * serve a maior versão a toda a gente. O site antigo é pior do que isso: usa
 * fotografia em `background-image` de CSS, que não tem `srcset` nenhum nem
 * carregamento diferido — dois PNG de 2 MB descem inteiros para um telemóvel a
 * cada visita.
 *
 * Por isso o `sizes` é uma prop exigida, e não uma que se esqueça.
 */
type Props = Omit<ImageProps, "sizes"> & {
  sizes: string;
  /** Enquadramento fixo, com a imagem a preencher. */
  proporcao?: string;
};

export function Imagem({ className, proporcao, style, ...resto }: Props) {
  /* O `alt` chega pelo spread e o TypeScript exige-o — `ImageProps` tem-no
     como obrigatório, por isso um `<Imagem>` sem ele nem compila. A regra do
     ESLint só olha para o JSX literal e não consegue ver isso. */
  if (!proporcao) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <Image className={cn(className)} style={style} {...resto} />;
  }

  return (
    <div
      className={cn("relative overflow-hidden", className)}
      style={{ aspectRatio: proporcao, ...style }}
    >
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <Image className="object-cover" fill {...resto} />
    </div>
  );
}
