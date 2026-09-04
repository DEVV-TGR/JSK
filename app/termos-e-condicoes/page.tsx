import type { Metadata } from "next";

import { Heroi } from "@/components/seccoes/Heroi";
import { PaginaLegal } from "@/components/seccoes/PaginaLegal";
import { TERMOS_E_CONDICOES } from "@/lib/conteudo/legal";

export const metadata: Metadata = {
  title: TERMOS_E_CONDICOES.titulo,
  description: TERMOS_E_CONDICOES.subtitulo,
  alternates: { canonical: "/termos-e-condicoes/" },
};

export default function Termos() {
  return (
    <>
      <Heroi
        titulo={TERMOS_E_CONDICOES.titulo}
        subtitulo={TERMOS_E_CONDICOES.subtitulo}
        imagem="/heroi/institucional.webp"
        alt=""
      />
      <PaginaLegal pagina={TERMOS_E_CONDICOES} />
    </>
  );
}
