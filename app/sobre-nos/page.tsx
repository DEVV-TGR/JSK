import type { Metadata } from "next";

import { Diferenciais } from "@/components/seccoes/Diferenciais";
import { Excelencia, MissaoVisao } from "@/components/seccoes/Excelencia";
import { Heroi } from "@/components/seccoes/Heroi";
import { O_QUE_NOS_DISTINGUE } from "@/lib/conteudo/diferenciadores";
import { DISTINGUE, HEROI_SOBRE } from "@/lib/conteudo/paginas";

export const metadata: Metadata = {
  title: "Sobre Nós",
  description:
    "A JSK une experiência, inovação e qualidade em segurança eletrónica, construção civil e publicidade digital. Conheça a nossa missão, visão e equipa.",
  alternates: { canonical: "/sobre-nos/" },
};

export default function SobreNos() {
  return (
    <>
      <Heroi {...HEROI_SOBRE} />
      <Excelencia />
      <MissaoVisao />
      <Diferenciais
        olho="O que nos distingue"
        titulo={DISTINGUE.titulo}
        intro={[DISTINGUE.intro]}
        itens={O_QUE_NOS_DISTINGUE}
        fundo="alternado"
      />
    </>
  );
}
