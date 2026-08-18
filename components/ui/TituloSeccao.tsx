import { cn } from "@/lib/utils";

import { Olho } from "./Olho";

type Props = {
  olho?: string;
  titulo: React.ReactNode;
  /** Cada string é um parágrafo. É assim que a copy do cliente está partida. */
  intro?: readonly string[];
  nivel?: "h1" | "h2" | "h3";
  alinhamento?: "esquerda" | "centro";
  className?: string;
};

/**
 * O cabeçalho de uma secção: olho, título e introdução.
 *
 * Está aqui em vez de estar solto em cada página porque a relação entre os três
 * — o espaço, a medida do parágrafo, o tamanho do olho — é o que dá ao site a
 * sensação de ter sido desenhado por uma pessoa só.
 */
export function TituloSeccao({
  olho,
  titulo,
  intro,
  nivel: Nivel = "h2",
  alinhamento = "esquerda",
  className,
}: Props) {
  const centrado = alinhamento === "centro";

  return (
    <div
      className={cn(
        "revela flex flex-col gap-5",
        centrado && "items-center text-center",
        className,
      )}
    >
      {olho && <Olho>{olho}</Olho>}
      <Nivel className={Nivel === "h1" ? "text-alfa" : "text-beta"}>{titulo}</Nivel>
      {intro && intro.length > 0 && (
        <div className={cn("flex max-w-medida flex-col gap-4 text-tinta-suave")}>
          {intro.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </div>
      )}
    </div>
  );
}
