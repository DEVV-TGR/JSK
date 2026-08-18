import { cn } from "@/lib/utils";

type Props = React.ComponentProps<"div"> & {
  /** Levanta-se ao passar o rato. Só para cartões que são clicáveis. */
  interactivo?: boolean;
  fundo?: "papel" | "tinta" | "veu";
};

const FUNDOS = {
  papel: "bg-papel border-linha",
  tinta: "bg-carvao text-papel border-papel/12",
  veu: "bg-amarelo-veu border-amarelo-fundo",
} as const;

export function Cartao({
  interactivo = false,
  fundo = "papel",
  className,
  children,
  ...resto
}: Props) {
  return (
    <div
      className={cn(
        "rounded-cartao border p-8",
        FUNDOS[fundo],
        interactivo && "premivel shadow-1 hover:shadow-2",
        className,
      )}
      {...resto}
    >
      {children}
    </div>
  );
}
