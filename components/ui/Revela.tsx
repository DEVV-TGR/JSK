import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div"> & {
  /**
   * A posição numa série. Cada item entra um pouco depois do anterior.
   *
   * Usar só onde o escalonamento **é** o conteúdo — os quatro cartões de
   * sector, os quatro passos do processo. Aplicá-lo a tudo transforma a página
   * numa cascata e o efeito deixa de significar seja o que for.
   */
  ordem?: number;
};

/**
 * Revelação à entrada no ecrã, sem uma linha de JavaScript.
 *
 * O escalonamento faz-se a deslocar o intervalo da linha de tempo, não com um
 * `animation-delay` — numa animação conduzida pelo scroll, um atraso em
 * segundos não quer dizer nada: o relógio é a posição da página, não o tempo.
 */
export function Revela({ ordem = 0, className, style, children, ...resto }: Props) {
  const inicio = Math.min(ordem * 6, 30);

  return (
    <div
      className={cn("revela", className)}
      style={
        ordem > 0
          ? { animationRange: `entry ${inicio}% entry ${inicio + 55}%`, ...style }
          : style
      }
      {...resto}
    >
      {children}
    </div>
  );
}
