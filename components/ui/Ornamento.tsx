import { cn } from "@/lib/utils";

/**
 * A forma da marca, usada como geometria de fundo.
 *
 * O logótipo da JSK é uma casa: um telhado preto em bico sobre um corpo
 * amarelo. Esta é a mesma silhueta, em traço, para assentar no canto dos
 * heróis e da banda de orçamento.
 *
 * Substitui o `Design-sem-nome-3.png` do site antigo — um PNG de 15 KB
 * carimbado no canto inferior direito de todas as páginas através de um
 * `::before`. Sendo SVG, escala sem serrilhar, herda a cor e não é um pedido
 * de rede.
 *
 * `aria-hidden` porque é decoração: não acrescenta nada a quem não a vê.
 */
export function Ornamento({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      className={cn("pointer-events-none select-none", className)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinejoin="round"
      aria-hidden
    >
      {/* O telhado e o corpo, como no logótipo. */}
      <path d="M4 74 100 6l96 68" />
      <path d="M28 56v98h144V56" />
      {/* Duas repetições a esbater-se, para dar profundidade sem uma sombra. */}
      <path d="M24 90 100 36l76 54" opacity="0.45" />
      <path d="M44 106 100 66l56 40" opacity="0.2" />
    </svg>
  );
}
