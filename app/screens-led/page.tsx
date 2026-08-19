import type { Metadata } from "next";

import { Aplicacoes, Comparacao } from "@/components/seccoes/Comparacao";
import { Heroi } from "@/components/seccoes/Heroi";
import { VideoScreens } from "@/components/seccoes/VideoScreens";
import { HEROIS_SECTOR } from "@/lib/conteudo/paginas";

export const metadata: Metadata = {
  title: "Aluguer e Venda de Screens LED",
  description:
    "Aluguer e venda de screens LED para interior e exterior — lojas, escritórios, feiras, outdoors e fachadas. A JSK ajuda a decidir entre comprar ou alugar.",
  alternates: { canonical: "/screens-led/" },
};

export default function ScreensLed() {
  return (
    <>
      <Heroi {...HEROIS_SECTOR.screens} />
      <VideoScreens />
      <Comparacao />
      <Aplicacoes />
    </>
  );
}
