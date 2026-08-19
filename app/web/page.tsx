import type { Metadata } from "next";

import { Heroi } from "@/components/seccoes/Heroi";
import { ParceriaWeb, ServicosWeb } from "@/components/seccoes/ServicosWeb";
import { HEROIS_SECTOR, PARCERIA_WEB } from "@/lib/conteudo/paginas";

export const metadata: Metadata = {
  title: "Web Design e Presença Digital",
  description:
    "Websites, identidade visual e presença digital pela JSK Web, em parceria com a DevPlus. Design único e resultados reais para o seu negócio.",
  alternates: { canonical: "/web/" },
};

export default function Web() {
  return (
    <>
      <Heroi
        {...HEROIS_SECTOR.web}
        botoes={[
          {
            texto: PARCERIA_WEB.botao.texto,
            href: PARCERIA_WEB.botao.href,
            icone: "setaExterna",
            externo: true,
            variante: "sobreTinta",
          },
        ]}
      />
      <ServicosWeb />
      <ParceriaWeb />
    </>
  );
}
