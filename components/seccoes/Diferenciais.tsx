import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { DIFERENCIAIS } from "@/lib/conteudo/inicio";

export function Diferenciais() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[18ch] font-extrabold">
          {DIFERENCIAIS.titulo}
        </h2>

        <ul className="mt-[var(--espaco-bloco)] grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {DIFERENCIAIS.itens.map((item, indice) => (
            <li
              key={item.titulo}
              className="entra"
              style={{ "--i": indice % 3 } as React.CSSProperties}
            >
              <span className="chapa grid size-12 place-items-center">
                <Icone nome={item.icone} className="size-6" />
              </span>
              <h3 className="font-titulo mt-5 text-[1.25rem] font-bold">
                {item.titulo}
              </h3>
              <p className="text-chumbo mt-3 text-[0.9375rem] leading-relaxed">
                {item.texto}
              </p>
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
