import { Contador } from "@/components/ui/Contador";
import { Envolvente } from "@/components/ui/Envolvente";
import { Ornamento } from "@/components/ui/Ornamento";
import { NUMEROS } from "@/lib/conteudo/numeros";

/**
 * Os números da empresa.
 *
 * É a única coisa que o site antigo anima, e lá está solta no branco — quatro
 * números pequenos numa fila, sem nada que os segure. Sendo o único momento
 * com movimento da página, merece ser um momento: uma banda escura, o amarelo
 * a fazer de tinta e o número em grande.
 */
export function BandaNumeros() {
  return (
    <section className="relative isolate overflow-hidden bg-carvao py-seccao text-papel">
      <Ornamento className="absolute -top-16 -left-20 -z-10 h-[24rem] w-auto text-papel/6" />

      <Envolvente>
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {NUMEROS.map((n) => (
            <Contador key={n.rotulo} valor={n.valor} rotulo={n.rotulo} />
          ))}
        </div>
      </Envolvente>
    </section>
  );
}
