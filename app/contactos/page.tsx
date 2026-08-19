import type { Metadata } from "next";

import { CartoesContacto } from "@/components/seccoes/CartoesContacto";
import { Heroi } from "@/components/seccoes/Heroi";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import { CONTACTOS, HEROI_CONTACTOS } from "@/lib/conteudo/paginas";

export const metadata: Metadata = {
  title: "Contactos e Orçamento Gratuito",
  description:
    "Peça um orçamento gratuito à JSK em Vilar do Pinheiro. Alarmes, obras, screens LED e web — respondemos com a maior brevidade possível.",
  alternates: { canonical: "/contactos/" },
};

export default function Contactos() {
  return (
    <>
      <Heroi {...HEROI_CONTACTOS} />

      <Seccao>
        <TituloSeccao
          olho={CONTACTOS.olho}
          titulo={CONTACTOS.titulo}
          intro={CONTACTOS.paragrafos}
        />
        <div className="mt-bloco">
          <CartoesContacto />
        </div>
      </Seccao>
    </>
  );
}
