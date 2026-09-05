import type { Metadata } from "next";

import { HeroiAlarmes } from "@/components/seccoes/alarmes/HeroiAlarmes";
import { PainelQueArma } from "@/components/seccoes/alarmes/PainelQueArma";
import { Processo } from "@/components/seccoes/Processo";
import { Projectos } from "@/components/seccoes/alarmes/Projectos";
import { ServicosAlarmes } from "@/components/seccoes/alarmes/ServicosAlarmes";
import { BandaOrcamento } from "@/components/seccoes/BandaOrcamento";
import { SERVICOS, TITULO } from "@/lib/conteudo/alarmes";

/**
 * O `title` fecha em `— JSK` pelo template do `layout.tsx`, o que dá
 * `JSK Alarmes — JSK`. O site actual serve `JSK Alarmes – JSK` e nem uma meta
 * description em nenhuma das dez páginas — defeito #16.
 *
 * A descrição não é escrita de raiz: é o primeiro parágrafo dos serviços,
 * verbatim, que por acaso tem exactamente o comprimento que a pesquisa mostra.
 * Uma descrição inventada seria texto novo sobre o negócio de outra pessoa.
 */
export const metadata: Metadata = {
  title: TITULO,
  description: SERVICOS.intro[0],
  alternates: { canonical: "/alarmes/" },
};

/**
 * A `/alarmes/`, em cinco cenas mais a chapa.
 *
 * A sequência de terrenos é asfalto → papel → asfalto → papel → betão →
 * amarelo, e nenhum corte é entre dois terrenos da mesma cor — por isso não há
 * banda de perigo pelo meio. A que existe é a que a `BandaOrcamento` traz
 * consigo, e essa está lá porque marca o fim, não porque separa dois escuros.
 *
 * O pico é a cena 3, e é a única fixa. A cena 2 é a mais calma de propósito: é
 * o silêncio que a antecede, tal como a apresentação na homepage.
 *
 * Os testemunhos do site actual não estão aqui — Lorem Ipsum com personas de
 * stock, defeitos #3 e #4. Ver `lib/conteudo/alarmes.ts`.
 */
export default function Alarmes() {
  return (
    <>
      <HeroiAlarmes />
      <ServicosAlarmes />
      <PainelQueArma />
      <Projectos />
      <Processo />
      <BandaOrcamento />
    </>
  );
}
