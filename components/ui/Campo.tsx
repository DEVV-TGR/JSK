import { cn } from "@/lib/utils";

type Base = {
  id: string;
  rotulo: string;
  erro?: string;
  /** Uma nota por baixo do campo — formato esperado, para que serve. */
  nota?: string;
  className?: string;
};

/**
 * Um campo de formulário com etiqueta visível.
 *
 * O formulário do site antigo não tem uma única `<label>` — os campos são só
 * `placeholder`. Isso quer dizer três coisas: um leitor de ecrã anuncia "caixa
 * de texto" e mais nada; o texto desaparece assim que se começa a escrever, e
 * quem estiver a rever o que preencheu já não sabe o que era cada caixa; e o
 * cinzento de um `placeholder` raramente passa no contraste.
 *
 * A etiqueta fica por cima e fica sempre.
 */
const CAMPO_BASE =
  "w-full rounded-botao border bg-papel px-4 py-3 text-corpo " +
  "min-h-12 " + // 48px de alvo — o mínimo confortável para um dedo
  "border-linha-forte placeholder:text-tinta-suave/70 " +
  "transition-[border-color,box-shadow] duration-150 ease-saida " +
  "focus:border-tinta focus:outline-none focus:ring-2 focus:ring-ocre focus:ring-offset-2 " +
  "aria-[invalid=true]:border-perigo";

export function Campo({
  id,
  rotulo,
  erro,
  nota,
  className,
  ...resto
}: Base & Omit<React.ComponentProps<"input">, "id" | "className">) {
  return (
    <Moldura id={id} rotulo={rotulo} erro={erro} nota={nota} className={className}>
      <input
        id={id}
        className={CAMPO_BASE}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritores(id, erro, nota)}
        {...resto}
      />
    </Moldura>
  );
}

export function CampoTexto({
  id,
  rotulo,
  erro,
  nota,
  className,
  ...resto
}: Base & Omit<React.ComponentProps<"textarea">, "id" | "className">) {
  return (
    <Moldura id={id} rotulo={rotulo} erro={erro} nota={nota} className={className}>
      <textarea
        id={id}
        rows={5}
        className={cn(CAMPO_BASE, "resize-y")}
        aria-invalid={erro ? true : undefined}
        aria-describedby={descritores(id, erro, nota)}
        {...resto}
      />
    </Moldura>
  );
}

function descritores(id: string, erro?: string, nota?: string) {
  const ids = [erro && `${id}-erro`, nota && `${id}-nota`].filter(Boolean);
  return ids.length > 0 ? ids.join(" ") : undefined;
}

function Moldura({
  id,
  rotulo,
  erro,
  nota,
  className,
  children,
}: Base & { children: React.ReactNode }) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="font-titulo text-nota font-semibold">
        {rotulo}
      </label>
      {children}
      {nota && !erro && (
        <p id={`${id}-nota`} className="text-nota text-tinta-suave">
          {nota}
        </p>
      )}
      {erro && (
        <p id={`${id}-erro`} className="text-nota font-medium text-perigo">
          {erro}
        </p>
      )}
    </div>
  );
}
