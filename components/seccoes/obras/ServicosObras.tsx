import { Medida, Seccao } from "@/components/ui/Seccao";
import { SERVICOS } from "@/lib/conteudo/obras";

/**
 * A cena calma, e é de propósito que é a mais calma da página.
 *
 * Vem antes do pico e é o silêncio que o deixa subir — a mesma função que a
 * `Apresentacao` tem na homepage e a `ServicosAlarmes` tem na sua. Terreno
 * branco, texto largo, nada a mexer para além da entrada.
 *
 * A lista de serviços não está aqui. Os dois parágrafos do cliente dizem o
 * que a empresa faz; os vinte itens dizem como, e isso é a cena a seguir.
 * Juntá-los seria dar de uma vez o que a página tem para dar em duas.
 */
export function ServicosObras() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <div className="grid gap-x-16 gap-y-8 lg:grid-cols-[minmax(0,24rem)_minmax(0,1fr)]">
          {/* O `id` é a âncora do `aria-labelledby` dos blocos que vêm a
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
