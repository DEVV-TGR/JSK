"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SECTORES_NAV } from "@/lib/conteudo/comum";
import { cn } from "@/lib/utilitarios";

/**
 * O pórtico dos sectores.
 *
 * Os quatro sectores numa barra, com um indicador amarelo por baixo do que
 * está aberto — como o painel de um pórtico de auto-estrada a dizer em que
 * faixa se vai. É a única coisa no cabeçalho que diz onde a pessoa está.
 *
 * É um componente de cliente por um motivo só: precisa do caminho actual. Não
 * traz animação nenhuma — o movimento do site continua todo em CSS. A página é
 * estática e o React já está no browser de qualquer maneira, por isso o custo
 * disto é o do próprio ficheiro.
 */
export function NavegacaoSectores({ className }: { className?: string }) {
  const caminho = usePathname();

  return (
    <nav aria-label="Sectores" className={className}>
      <ul className="flex h-full items-stretch">
        {SECTORES_NAV.map((sector) => {
          const aberto = caminho === sector.href;
          return (
            <li key={sector.href} className="flex">
              <Link
                href={sector.href}
                aria-current={aberto ? "page" : undefined}
                className={cn(
                  "font-titulo relative flex items-center px-4 text-[0.8125rem] font-bold tracking-[0.1em] whitespace-nowrap uppercase",
                  "[transition:color_160ms_ease]",
                  aberto ? "text-amarelo" : "text-papel hover:text-amarelo",
                )}
              >
                {sector.texto}
                {/* O indicador. Um filete de 3px encostado ao fundo do
                    cabeçalho, alinhado com a linha de progresso. */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-x-2 bottom-0 h-[3px]",
                    aberto ? "bg-amarelo" : "bg-transparent",
                  )}
                />
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
