import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utilitarios";

type Aspecto = "chapa" | "risco" | "risco-claro";

/**
 * As três formas de botão do site.
 *
 * O `chapa` é preto sobre amarelo. O site antigo punha `#F3F3F3` sobre o
 * mesmo amarelo — quase branco sobre amarelo, 1.5:1 — e é o defeito #32.
 * Preto sobre este amarelo dá 13.3:1.
 */
const ASPECTOS: Record<Aspecto, string> = {
  chapa: "chapa hover:bg-papel",
  risco:
    "text-asfalto shadow-[inset_0_0_0_2px_currentColor] hover:bg-asfalto hover:text-papel",
  "risco-claro":
    "text-papel shadow-[inset_0_0_0_2px_currentColor] hover:bg-amarelo hover:text-asfalto",
};

const BASE = cn(
  "inline-flex cursor-pointer items-center justify-center gap-2.5",
  "rounded-[2px] px-7 py-4",
  "font-titulo text-[0.9375rem] font-bold tracking-[0.08em] uppercase",
  /* Nunca `transition: all`. Uma regra fora de `@layer` que declare `all`
     apanha propriedades que ninguém quis animar, e uma que declare de menos
     descarta em silêncio o que se quis. Aqui estão as três, por nome. */
  "[transition:background-color_180ms_ease,color_180ms_ease,box-shadow_180ms_ease]",
);

type Comum = {
  children: ReactNode;
  aspecto?: Aspecto;
  className?: string;
};

type Props =
  | (Comum & {
      href: string;
      /** Endereço fora do site: abre noutro separador, com `noopener`. */
      externo?: boolean;
      tipo?: never;
    })
  | (Comum & {
      href?: never;
      externo?: never;
      tipo?: "button" | "submit";
    });

export function Botao(props: Props) {
  const { children, aspecto = "chapa", className } = props;
  const classes = cn(BASE, ASPECTOS[aspecto], className);

  if (props.href === undefined) {
    return (
      <button type={props.tipo ?? "button"} className={classes}>
        {children}
      </button>
    );
  }

  /* `tel:` e `mailto:` não passam pelo router — o `next/link` só serve para
     navegação dentro do site. */
  const dentroDoSite = props.href.startsWith("/") && !props.externo;

  if (dentroDoSite) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={props.href}
      className={classes}
      /* Sem `noopener`, a página que abre fica com uma referência para esta em
         `window.opener` e pode reescrever-lhe o endereço. O site antigo abre a
         DevPlus assim, sem o atributo — defeito #34. */
      {...(props.externo
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}
