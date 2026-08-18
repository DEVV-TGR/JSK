import { cn } from "@/lib/utils";

/**
 * O rótulo pequeno que precede um título de secção.
 *
 * No site antigo isto era um `<h6>` — "A sua melhor solução" por cima do `<h1>`,
 * "01." por cima do nome de cada serviço. Um cabeçalho de nível seis usado como
 * decoração, e por cima de um de nível um: quem lê a página com um leitor de
 * ecrã ouve uma estrutura que não existe.
 *
 * Aqui é um `<p>`. Parece igual e não mente sobre a hierarquia.
 */
export function Olho({ children, className, ...resto }: React.ComponentProps<"p">) {
  return (
    <p className={cn("olho", className)} {...resto}>
      {children}
    </p>
  );
}
