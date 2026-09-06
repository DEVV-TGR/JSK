import type { Metadata } from "next";

import { BandaOrcamento } from "@/components/seccoes/BandaOrcamento";
import { Excelencia } from "@/components/seccoes/sobre/Excelencia";
import { HeroiSobre } from "@/components/seccoes/sobre/HeroiSobre";
import { MissaoVisao } from "@/components/seccoes/sobre/MissaoVisao";
import { QuatroQueConvergem } from "@/components/seccoes/sobre/QuatroQueConvergem";
import { QueNosDistingue } from "@/components/seccoes/sobre/QueNosDistingue";
import { EXCELENCIA, TITULO } from "@/lib/conteudo/sobre";

/**
 * O `title` fecha em `— JSK` pelo template do `layout.tsx`. O site actual serve
 * `Sobre Nós – JSK` e nem uma meta description em nenhuma das dez páginas —
 * defeito #16.
 *
 * A descrição não é escrita de raiz: é o primeiro parágrafo da excelência,
 * verbatim.
 */
export const metadata: Metadata = {
  title: TITULO,
  description: EXCELENCIA.paragrafos[0],
  alternates: { canonical: "/sobre-nos/" },
};

/**
 * A `/sobre-nos/`, em cinco cenas mais a chapa.
 *
 * É a primeira página do site que **não vende um serviço: vende a empresa.**
 * E é por isso que o pico é o único gesto do site que junta em vez de montar —
 * quatro traços que convergem numa chapa só, que é a frase da visão desenhada.
 *
 * A sequência de terrenos é asfalto → papel → betão → papel → asfalto →
 * amarelo. Nenhum par de terrenos escuros encostados, por isso **não leva
 * banda de perigo nenhuma**: a única que aparece é a que a `BandaOrcamento`
 * traz consigo, e essa marca o fim.
 *
 * O pico é a cena 3 e é a única fixa. A cena 2 é a mais calma de propósito.
 *
 * O bloco `O Nosso Processo` não está aqui, e não é omissão: o processo de
 * `lib/conteudo/comum.ts` é o de vender um serviço — consulta, orçamento,
 * instalação, inspeção — e esta página não vende nenhum.
 */
export default function SobreNos() {
  return (
    <>
      <HeroiSobre />
      <Excelencia />
      <QuatroQueConvergem />
      <MissaoVisao />
      <QueNosDistingue />
      <BandaOrcamento />
    </>
  );
}
