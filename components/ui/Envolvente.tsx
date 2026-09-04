import { cn } from "@/lib/utils";

/**
 * A largura de leitura da página: 1200px, centrada, com margens que encolhem
 * com o ecrã. É a mesma medida do site antigo — nisso ele estava certo.
 */
export function Envolvente({
  children,
  className,
  ...resto
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("envolvente", className)} {...resto}>
      {children}
    </div>
  );
}
