import { cn } from "@/lib/utils";

import { Envolvente } from "./Envolvente";

type Fundo = "papel" | "alternado" | "tinta" | "veu";

const FUNDOS: Record<Fundo, string> = {
  papel: "bg-papel text-tinta",
  alternado: "bg-papel-fundo text-tinta",
  tinta: "bloco-tinta",
  veu: "bg-amarelo-veu text-tinta",
};

type Props = React.ComponentProps<"section"> & {
  fundo?: Fundo;
  /** Espaço em cima. Desligar quando a secção encosta à anterior. */
  topo?: boolean;
  /** Espaço em baixo. */
  base?: boolean;
  /** Sem a envolvente — para secções que sangram até à margem do ecrã. */
  sangra?: boolean;
};

/**
 * Uma secção da página, com o seu fundo e o seu espaço vertical.
 *
 * O espaço é controlado por `topo` e `base`, não por um `className="pt-0"` de
 * fora. É uma lição paga no repo do DevPlus: uma `Seccao` com `py-24` por
 * dentro não se desliga por fora, porque a variante responsiva (`sm:py-24`) é
 * escrita depois no CSS gerado e volta a ganhar a partir dos 640px. Quem
 * escreve `pt-0` vê o espaço desaparecer no telemóvel e voltar no portátil, e
 * perde meia hora a perceber porquê.
 */
export function Seccao({
  children,
  className,
  fundo = "papel",
  topo = true,
  base = true,
  sangra = false,
  ...resto
}: Props) {
  return (
    <section
      className={cn(
        FUNDOS[fundo],
        topo && "pt-seccao",
        base && "pb-seccao",
        className,
      )}
      {...resto}
    >
      {sangra ? children : <Envolvente>{children}</Envolvente>}
    </section>
  );
}
