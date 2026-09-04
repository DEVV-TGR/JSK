import Link from "next/link";

import { site } from "@/lib/site";
import { cn } from "@/lib/utilitarios";

/**
 * A marca, composta em tipo.
 *
 * ⚠️ **Provisório, e de propósito.** O logótipo do cliente é um bitmap de
 * 943px com o número de telefone **gravado dentro da imagem** — o ficheiro
 * chama-se `Sinal-JSK-com-Numero-de-Telefone`. Servi-lo aqui significava três
 * coisas: um número que não se pode seleccionar nem marcar, uma imagem que
 * não escala, e a hipótese real de estar a mostrar o número errado em todas as
 * páginas, porque não se sabe qual dos dois números da empresa é o verdadeiro.
 *
 * Compor a marca em tipo evita as três e mantém a forma de chapa de sinal, que
 * é o que o logótipo já é. Sai daqui no dia em que chegar o vector sem número.
 * Ver `docs/decisoes-pendentes.md`, pontos 4 e 11.
 */
export function Marca({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-3", className)}
      aria-label={`${site.nome} — página inicial`}
    >
      <span
        className={cn(
          "chapa font-titulo grid h-11 place-items-center px-3",
          "text-[1.375rem] leading-none font-extrabold tracking-[0.06em]",
        )}
      >
        {site.nome}
      </span>
      <span className="text-etiqueta text-grafite hidden font-medium tracking-[0.14em] whitespace-nowrap uppercase 2xl:block">
        {site.tagline}
      </span>
    </Link>
  );
}
