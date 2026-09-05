import type { Metadata } from "next";

import { BandaOrcamento } from "@/components/seccoes/BandaOrcamento";
import { AndaimeQueDesmonta } from "@/components/seccoes/obras/AndaimeQueDesmonta";
import { BlocosObras } from "@/components/seccoes/obras/BlocosObras";
import { HeroiObras } from "@/components/seccoes/obras/HeroiObras";
import { ProjectosObras } from "@/components/seccoes/obras/ProjectosObras";
import { ServicosObras } from "@/components/seccoes/obras/ServicosObras";
import { Processo } from "@/components/seccoes/Processo";
import { SERVICOS, TITULO } from "@/lib/conteudo/obras";

/**
 * O `title` fecha em `— JSK` pelo template do `layout.tsx`, o que dá
 * `JSK Obras — JSK`. O site actual serve `JSK Obras – JSK` e nem uma meta
 * description em nenhuma das dez páginas — defeito #16.
 *
 * A descrição não é escrita de raiz: é o primeiro parágrafo dos serviços,
 * verbatim. Uma descrição inventada seria texto novo sobre o negócio de outra
 * pessoa.
 */
export const metadata: Metadata = {
  title: TITULO,
  description: SERVICOS.intro[0],
  alternates: { canonical: "/obras/" },
};

/**
 * A `/obras/`, em seis cenas mais a chapa.
 *
 * A sequência de terrenos é asfalto → papel → asfalto → betão → papel →
 * betão → amarelo. O único corte entre dois terrenos escuros é o terceiro para
 * o quarto, e é lá que entra a banda de perigo. A segunda que aparece na
 * página é a que a `BandaOrcamento` traz consigo, e essa está lá porque marca o
 * fim, não porque separa dois escuros.
 *
 * O pico é a cena 4, e é a única fixa. A cena 2 é a mais calma de propósito: é
 * o silêncio que a antecede, como na homepage e na `/alarmes/`.
 *
 * Os testemunhos do site actual não estão aqui — Lorem Ipsum com personas de
 * stock debaixo de um cabeçalho em inglês, defeitos #3 e #4. Ver
 * `lib/conteudo/obras.ts`.
 */
export default function Obras() {
  return (
    <>
      <HeroiObras />
      <ServicosObras />
      <BlocosObras />
      <div className="banda-perigo" aria-hidden="true" />
      <AndaimeQueDesmonta />
      <ProjectosObras />
      <Processo />
      <BandaOrcamento />
    </>
  );
}
