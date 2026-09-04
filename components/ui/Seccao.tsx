import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utilitarios";

/**
 * O terreno de uma cena.
 *
 * A gramática do site é sinalética por sectores: cada cena assenta no seu
 * próprio terreno e o corte entre terrenos é duro, nunca um degradê. Ver
 * `docs/brief-experiencia.md`.
 */
export type Terreno = "asfalto" | "betao" | "papel" | "amarelo";

const TERRENOS: Record<Terreno, string> = {
  asfalto: "bg-asfalto text-papel",
  betao: "bg-betao text-papel",
  papel: "bg-papel text-asfalto",
  amarelo: "terreno-amarelo bg-amarelo text-asfalto",
};

type Props = {
  children: ReactNode;
  terreno?: Terreno;
  /** Espaçamento no topo. Desligar quando duas cenas encostam de propósito. */
  topo?: boolean;
  /** Espaçamento no fundo. */
  fundo?: boolean;
  /** O elemento a gerar. `section` por omissão. */
  como?: ElementType;
  id?: string;
  className?: string;
};

/**
 * Uma cena.
 *
 * O espaçamento é controlado por `topo` e `fundo`, e não por uma classe
 * passada de fora. A razão é uma armadilha concreta do Tailwind: um
 * `<Seccao className="pt-0">` **não** anula um `py-*` da própria secção,
 * porque a variante `sm:py-*` é escrita depois no CSS gerado e volta a ganhar
 * a partir dos 640px. O bug só aparece no ecrã grande, que é onde menos se
 * olha depois de o pequeno estar bem.
 */
export function Seccao({
  children,
  terreno = "asfalto",
  topo = true,
  fundo = true,
  como: Como = "section",
  id,
  className,
}: Props) {
  return (
    <Como
      id={id}
      className={cn(
        TERRENOS[terreno],
        topo && "pt-[var(--espaco-cena)]",
        fundo && "pb-[var(--espaco-cena)]",
        className,
      )}
    >
      {children}
    </Como>
  );
}

/**
 * A medida da página.
 *
 * Um só valor, usado em toda a parte. O site antigo tinha quatro larguras de
 * contentor em simultâneo — 1200px do Astra, 1240px do `.ast-container`,
 * 1260px do Elementor e 1200px de um CSS à mão na `/web/` — e é por isso que
 * as secções não alinhavam umas com as outras.
 */
export function Medida({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[76rem] px-6 sm:px-10", className)}>
      {children}
    </div>
  );
}
