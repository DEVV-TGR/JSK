import { cn } from "@/lib/utils";

import { Icone } from "./Icone";

type Props = {
  itens: readonly string[];
  /**
   * `sim` para o que é a favor, `nao` para o que é contra.
   *
   * Não é um detalhe estético. Na página dos screens LED, o site antigo lista
   * as **desvantagens** de comprar e de alugar com o mesmo ✔️ verde das
   * vantagens — o bloco inteiro diz o contrário do que quer dizer, e quem o lê
   * depressa fica com a ideia de que alugar tem oito vantagens.
   */
  tipo?: "sim" | "nao";
  className?: string;
};

export function ListaVerificada({ itens, tipo = "sim", className }: Props) {
  const negativa = tipo === "nao";

  return (
    <ul className={cn("flex flex-col gap-3", className)}>
      {itens.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <Icone
            nome={negativa ? "cruz" : "visto"}
            className={cn(
              "mt-0.5 size-5",
              negativa ? "text-perigo" : "text-ocre",
            )}
            rotulo={negativa ? "Desvantagem" : "Incluído"}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
