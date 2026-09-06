import type { Metadata } from "next";

import { BandaOrcamento } from "@/components/seccoes/BandaOrcamento";
import { AplicacoesScreens } from "@/components/seccoes/screens/AplicacoesScreens";
import { ComprarOuAlugar } from "@/components/seccoes/screens/ComprarOuAlugar";
import { HeroiScreens } from "@/components/seccoes/screens/HeroiScreens";
import { IntroScreens } from "@/components/seccoes/screens/IntroScreens";
import { ParedeQueMonta } from "@/components/seccoes/screens/ParedeQueMonta";
import { INTRO, TITULO } from "@/lib/conteudo/screens";

/**
 * O `title` fecha em `— JSK` pelo template do `layout.tsx`, o que dá
 * `JSK Screens — JSK`. O site actual serve `JSK Screens – JSK` e nem uma meta
 * description em nenhuma das dez páginas — defeito #16.
 *
 * A descrição não é escrita de raiz: é o parágrafo de abertura da página,
 * verbatim. Uma descrição inventada seria texto novo sobre o negócio de outra
 * pessoa.
 */
export const metadata: Metadata = {
  title: TITULO,
  description: INTRO.texto,
  alternates: { canonical: "/screens-led/" },
};

/**
 * A `/screens-led/`, em cinco cenas mais a chapa.
 *
 * A sequência de terrenos é asfalto → papel → betão → papel → asfalto →
 * amarelo. **Não leva `banda-perigo` nenhuma**, e é a única das quatro páginas
 * de sector onde isso acontece: não há dois terrenos escuros encostados, por
 * isso todos os cortes já se vêem. A banda que aparece no fim é a que a
 * `BandaOrcamento` traz consigo, e essa marca o fim — não separa dois escuros.
 *
 * O pico é a cena 3, a parede que se monta, e é a única fixa. A cena 2 é a
 * mais calma de propósito: é o silêncio que a antecede, como nas irmãs.
 *
 * Esta página **não tem** processo, testemunhos nem galeria. Não é omissão
 * nossa — é o que o site do cliente tem, e acrescentá-los seria escrever
 * conteúdo novo sobre o negócio dele. Fica mais curta do que a `/alarmes/` e a
 * `/obras/`, e isso é honesto.
 */
export default function Screens() {
  return (
    <>
      <HeroiScreens />
      <IntroScreens />
      <ParedeQueMonta />
      <ComprarOuAlugar />
      <AplicacoesScreens />
      <BandaOrcamento />
    </>
  );
}
