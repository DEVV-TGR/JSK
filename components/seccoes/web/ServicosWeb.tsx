import { Medida, Seccao } from "@/components/ui/Seccao";
import { SERVICOS } from "@/lib/conteudo/web";

/**
 * Os seis serviços da DevPlus, com o dispositivo do painel.
 *
 * É o tratamento das zonas do `PainelQueArma`: o LED acende ao lado de cada
 * serviço e o texto limpa-se logo a seguir. O anel cinzento está sempre lá —
 * é o ponto de instalação — e o que acende é o miolo amarelo.
 *
 * **Sem cena fixa, ao contrário da `/alarmes/`.** O `SiteQueSeConstroi`
 * encosta ao ecrã imediatamente antes, e duas cenas fixas seguidas põem a
 * página a lutar com quem desce. Aqui cada item pende da sua própria linha
 * temporal, com o `--i` a escalonar: mesmo gesto, sem o segundo encosto.
 *
 * A copy é a do devplus.pt. A única coisa mudada foi o tratamento — «tu» para
 * «você» — e está listada linha a linha no cabeçalho de `lib/conteudo/web.ts`.
 *
 * Não levam ícone: o `Icone.tsx` tem catorze caminhos e nenhum deles diz
 * "painel de gestão". O número basta, e sai do `index`, que é o que torna
 * impossível o defeito #7.
 */
export function ServicosWeb() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[var(--medida-titulo)] font-extrabold">
          {SERVICOS.titulo}
        </h2>

        <ol className="mt-[var(--espaco-bloco)] grid gap-x-14 gap-y-10 sm:grid-cols-2">
          {SERVICOS.itens.map((servico, indice) => (
            <Servico
              key={servico.nome}
              indice={indice}
              nome={servico.nome}
              texto={servico.texto}
            />
          ))}
        </ol>
      </Medida>
    </Seccao>
  );
}

function Servico({
  indice,
  nome,
  texto,
}: {
  indice: number;
  nome: string;
  texto: string;
}) {
  /* Escalonado por coluna e não pela lista toda: com o `--i` a crescer até 5,
     o último serviço acabava de entrar muito depois de já estar parado no
     ecrã. É a mesma correcção da galeria da `/obras/`. */
  const i = { "--i": indice % 2 } as React.CSSProperties;

  return (
    <li className="border-asfalto/15 border-t pt-5">
      <div className="flex items-center gap-4">
        {/* O LED. O anel está sempre lá; o que acende é o miolo. */}
        <span
          className="relative grid size-5 shrink-0 place-items-center"
          aria-hidden="true"
        >
          <span className="border-chumbo/40 absolute inset-0 rounded-full border" />
          <span className="servico-led bg-amarelo size-2 rounded-full" style={i} />
        </span>

        <span
          className="font-titulo text-grafite text-[0.8125rem] font-bold tracking-[0.16em] tabular-nums"
          aria-hidden="true"
        >
          {String(indice + 1).padStart(2, "0")}
        </span>

        <h3 className="font-titulo text-[1.25rem] leading-tight font-bold">
          {nome}
        </h3>
      </div>

      <p
        className="servico-texto text-chumbo mt-4 ps-9 text-[0.9375rem] leading-relaxed"
        style={i}
      >
        {texto}
      </p>
    </li>
  );
}
