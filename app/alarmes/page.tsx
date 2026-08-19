import type { Metadata } from "next";

import { BlocoServicos } from "@/components/seccoes/BlocoServicos";
import { Galeria } from "@/components/seccoes/Galeria";
import { Heroi } from "@/components/seccoes/Heroi";
import { Processo } from "@/components/seccoes/Processo";
import { GALERIA_ALARMES } from "@/lib/conteudo/galerias";
import { HEROIS_SECTOR } from "@/lib/conteudo/paginas";
import { SERVICOS_ALARMES } from "@/lib/conteudo/servicos";

export const metadata: Metadata = {
  title: "Alarmes, Videovigilância e Monitorização 24h",
  description:
    "Alarmes residenciais e comerciais, videovigilância, monitorização 24 horas e deteção de incêndio em Vilar do Pinheiro. Peça um orçamento gratuito à JSK.",
  alternates: { canonical: "/alarmes/" },
};

export default function Alarmes() {
  return (
    <>
      <Heroi {...HEROIS_SECTOR.alarmes} />
      <BlocoServicos bloco={SERVICOS_ALARMES} olho="JSK Alarmes" />
      <Galeria galeria={GALERIA_ALARMES} olho="Trabalho feito" proporcao="3 / 4" />
      <Processo />
    </>
  );
}
