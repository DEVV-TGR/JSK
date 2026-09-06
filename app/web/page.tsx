import type { Metadata } from "next";

import { BandaOrcamento } from "@/components/seccoes/BandaOrcamento";
import { ApresentacaoWeb } from "@/components/seccoes/web/ApresentacaoWeb";
import { ChamadaDevPlus } from "@/components/seccoes/web/ChamadaDevPlus";
import { HeroiWeb } from "@/components/seccoes/web/HeroiWeb";
import { ServicosWeb } from "@/components/seccoes/web/ServicosWeb";
import { SiteQueSeConstroi } from "@/components/seccoes/web/SiteQueSeConstroi";
import { TrabalhosWeb } from "@/components/seccoes/web/TrabalhosWeb";
import { APRESENTACAO, TITULO } from "@/lib/conteudo/web";

/**
 * O `title` fecha em `— JSK` pelo template do `layout.tsx`, o que dá
 * `JSK Web — JSK`. O site actual serve `JSK Web – JSK` e nem uma meta
 * description em nenhuma das dez páginas — defeito #16.
 */
export const metadata: Metadata = {
  title: TITULO,
  description: APRESENTACAO.texto,
  alternates: { canonical: "/web/" },
};

/**
 * A `/web/`, em seis cenas mais a chapa.
 *
 * Esta é a única página do site que não vende um serviço da JSK: vende quem
 * fez o site. O trabalho dela é levar quem lê ao devplus.pt, e é por isso que
 * a chamada para a DevPlus tem cena própria em vez de ser um botão no fim de
 * outra coisa.
 *
 * A sequência de terrenos é asfalto → papel → betão → papel → asfalto → betão
 * → amarelo. O único corte entre dois terrenos escuros é o quinto para o
 * sexto, e é lá que entra a banda de perigo. A segunda que aparece é a que a
 * `BandaOrcamento` traz consigo, e essa marca o fim.
 *
 * O pico é a cena 3 e é a única fixa. A cena 2 é a mais calma de propósito.
 *
 * **É também a única página sem uma fotografia no herói.** As três imagens que
 * jsk.pt serve aqui são dois mockups gerados por IA — com o menu do site
 * ilegível — e um stock genérico. Ver a nota em `components/seccoes/web/
 * HeroiWeb.tsx`. No lugar entra a grelha de desenho, que é o motivo que a cena
 * do pico constrói.
 *
 * O bloco `O Nosso Processo` não está aqui, ao contrário das outras três de
 * sector: o processo escrito em `lib/conteudo/comum.ts` é o da JSK — consulta,
 * orçamento, instalação, inspeção — e não descreve como se faz um site. Pô-lo
 * nesta página era afirmar um processo que não é o desta equipa.
 */
export default function Web() {
  return (
    <>
      <HeroiWeb />
      <ApresentacaoWeb />
      <SiteQueSeConstroi />
      <ServicosWeb />
      <TrabalhosWeb />
      <div className="banda-perigo" aria-hidden="true" />
      <ChamadaDevPlus />
      <BandaOrcamento />
    </>
  );
}
