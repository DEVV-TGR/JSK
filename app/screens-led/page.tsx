import type { Metadata } from "next";

import { BandaOrcamento } from "@/components/seccoes/BandaOrcamento";
import { Processo } from "@/components/seccoes/Processo";
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
 * A `/screens-led/`, em seis cenas mais a chapa.
 *
 * A sequência de terrenos é asfalto → papel → betão → **papel partido** →
 * asfalto → betão → amarelo.
 *
 * A quarta cena é a única do site que tem dois terrenos ao mesmo tempo: o
 * `Comprar vs alugar` corta-se ao meio, asfalto de um lado e papel do outro,
 * porque duas opções que se confrontam são duas cenas e não uma. A metade
 * escura encosta ao asfalto da cena seguinte, e daí a primeira banda de
 * perigo. A segunda separa as aplicações do processo. A terceira é a que a
 * `BandaOrcamento` traz consigo, e essa marca o fim — não separa dois escuros.
 *
 * O pico é a cena 3, a parede que se monta, e é a única fixa. A cena 2 é a
 * mais calma de propósito: é o silêncio que a antecede, como nas irmãs.
 *
 * **O `Processo` está aqui e o site do cliente não o tem nesta página.** Foi
 * decisão do Gonçalo, a 6 de Setembro de 2026, e a razão é de funil e não de
 * simetria: quem chega da `/alarmes/` ou da `/obras/` já viu como se compra à
 * JSK, e sem este bloco a página de screens acabava a meio dessa explicação.
 * Não é conteúdo novo — os quatro passos são os mesmos, byte a byte, e vivem
 * em `lib/conteudo/comum.ts` porque nunca foram de sector nenhum.
 *
 * O que continua de fora são os testemunhos e a galeria. Os primeiros porque
 * são Lorem Ipsum com personas de stock em todo o site; a segunda porque não
 * há fotografias de screens para lá pôr — `docs/decisoes-pendentes.md`, 12.
 */
export default function Screens() {
  return (
    <>
      <HeroiScreens />
      <IntroScreens />
      <ParedeQueMonta />
      <ComprarOuAlugar />
      <div className="banda-perigo" aria-hidden="true" />
      <AplicacoesScreens />
      <div className="banda-perigo" aria-hidden="true" />
      <Processo />
      <BandaOrcamento />
    </>
  );
}
