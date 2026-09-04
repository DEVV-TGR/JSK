import Link from "next/link";

import { cn } from "@/lib/utils";

import { Icone, type NomeIcone } from "./Icone";

type Variante = "principal" | "secundario" | "fantasma" | "sobreTinta";

/**
 * ⚠️ O `principal` leva `text-amarelo-tinta`, que é preto.
 *
 * O site antigo põe `#F3F3F3` sobre o amarelo em todos os botões — 1,33:1,
 * ilegível ao sol. É a razão de este token existir com um nome próprio em vez
 * de alguém escrever a cor à mão, e de haver um teste que reprova a versão
 * clara. Ver testes/contraste.test.ts.
 */
const VARIANTES: Record<Variante, string> = {
  principal:
    "bg-amarelo text-amarelo-tinta border border-amarelo hover:bg-amarelo-claro hover:border-amarelo-claro",
  secundario:
    "bg-transparent text-tinta border border-linha-forte hover:bg-tinta hover:border-tinta hover:text-papel",
  fantasma:
    "bg-transparent text-tinta border border-transparent hover:bg-papel-fundo",
  sobreTinta:
    "bg-transparent text-papel border border-papel/35 hover:bg-papel hover:text-tinta hover:border-papel",
};

type Base = {
  variante?: Variante;
  /** Um ícone à direita, dentro do seu próprio círculo. */
  icone?: NomeIcone;
  className?: string;
  children: React.ReactNode;
};

type Props = Base &
  ({ href: string; externo?: boolean } | { href?: undefined; externo?: never }) &
  Omit<React.ComponentProps<"button">, "className" | "children">;

const BASE =
  "premivel group inline-flex items-center gap-3 rounded-botao pl-6 pr-2 py-2.5 " +
  "font-titulo text-[0.9375rem] font-semibold tracking-[0.01em] " +
  "disabled:pointer-events-none disabled:opacity-55";

const BASE_SEM_ICONE = "px-6 py-3";

export function Botao({
  variante = "principal",
  icone,
  href,
  externo,
  className,
  children,
  ...resto
}: Props) {
  const classes = cn(
    BASE,
    !icone && BASE_SEM_ICONE,
    VARIANTES[variante],
    className,
  );

  const conteudo = (
    <>
      <span>{children}</span>
      {icone && (
        /* O ícone nunca fica nu ao lado do texto: vive no seu próprio círculo,
           encostado à margem interior direita. No hover empurra-se um pouco
           para fora, o que dá ao botão uma tensão interna em vez de o fazer
           mudar de cor e mais nada. */
        <span
          className={cn(
            "grid size-9 place-items-center rounded-full",
            "transition-transform duration-150 ease-saida",
            "group-hover:translate-x-0.5",
            variante === "sobreTinta" ? "bg-papel/15" : "bg-tinta/10",
          )}
        >
          <Icone nome={icone} className="size-[1.125rem]" />
        </span>
      )}
    </>
  );

  if (href === undefined) {
    return (
      <button className={classes} {...resto}>
        {conteudo}
      </button>
    );
  }

  /* `tel:`, `mailto:` e os domínios de fora não passam pelo router — o `Link`
     do Next tentaria pré-carregá-los. */
  const foraDoSite = /^(https?:|tel:|mailto:)/.test(href);

  if (foraDoSite) {
    return (
      <a
        className={classes}
        href={href}
        /* Sem o `rel`, a página aberta ganha acesso a `window.opener` e pode
           reescrever o endereço desta. O site antigo abre a DevPlus assim. */
        {...(externo ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {conteudo}
      </a>
    );
  }

  return (
    <Link className={classes} href={href}>
      {conteudo}
    </Link>
  );
}
