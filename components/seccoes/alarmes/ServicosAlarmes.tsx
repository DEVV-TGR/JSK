import { Medida, Seccao } from "@/components/ui/Seccao";
import { SERVICOS } from "@/lib/conteudo/alarmes";

/**
 * A cena calma, e é de propósito que é a mais calma da página.
 *
 * Vem imediatamente antes do pico, e é o silêncio que o deixa subir — a mesma
 * função que a `Apresentacao` tem na homepage. Terreno branco, texto largo,
 * quase nada a mexer.
 *
 * O que aqui não está: a lista de serviços. O segundo parágrafo acaba em
 * `disponibilizamos os seguintes serviços:` e o que se segue aos dois pontos é
 * a cena a seguir, em cheio. Pôr aqui a lista e repeti-la lá seria dizer a
 * mesma coisa duas vezes de seguida.
 */
export function ServicosAlarmes() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          {/* O filete amarelo encostado ao título é o único ornamento desta
              cena. Faz o trabalho que na homepage fazem as tiras pretas — dizer
              que isto é uma placa e não texto solto — sem trazer uma moldura
              inteira para uma cena que tem de ser calma. */}
          {/* O `id` é a âncora do `aria-labelledby` do painel que vem a
              seguir: aquela cena é a continuação desta e não inventa um título
              seu para o ser. */}
          <h2
            id="os-nossos-servicos"
            className="entra text-cena font-titulo border-amarelo border-s-4 ps-6 font-extrabold text-balance"
          >
            {SERVICOS.titulo}
          </h2>

          <div>
            <p
              className="entra text-[1.25rem] leading-[1.55] font-medium text-balance"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              {SERVICOS.intro[0]}
            </p>
            <p
              className="entra text-chumbo mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {SERVICOS.intro[1]}
            </p>
          </div>
        </div>
      </Medida>
    </Seccao>
  );
}
