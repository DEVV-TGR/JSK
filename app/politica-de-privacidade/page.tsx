import type { Metadata } from "next";

import { Heroi } from "@/components/seccoes/Heroi";
import { PaginaLegal } from "@/components/seccoes/PaginaLegal";
import { POLITICA_DE_PRIVACIDADE } from "@/lib/conteudo/legal";

export const metadata: Metadata = {
  title: POLITICA_DE_PRIVACIDADE.titulo,
  description: POLITICA_DE_PRIVACIDADE.subtitulo,
  alternates: { canonical: "/politica-de-privacidade/" },
};

export default function Privacidade() {
  return (
    <>
      <Heroi
        titulo={POLITICA_DE_PRIVACIDADE.titulo}
        subtitulo={POLITICA_DE_PRIVACIDADE.subtitulo}
        imagem="/heroi/institucional.webp"
        alt=""
      />
      <PaginaLegal pagina={POLITICA_DE_PRIVACIDADE} />
    </>
  );
}
