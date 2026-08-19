import type { Metadata } from "next";

import { CartoesContacto } from "@/components/seccoes/CartoesContacto";
import { FormularioContacto } from "@/components/seccoes/FormularioContacto";
import { Heroi } from "@/components/seccoes/Heroi";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";
import { CONTACTOS, HEROI_CONTACTOS, TITULO_FORMULARIO } from "@/lib/conteudo/paginas";

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

      <Seccao fundo="alternado" topo={false}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-beta">{TITULO_FORMULARIO}</h2>
            <p className="mt-5 max-w-medida text-tinta-suave">
              Preencha o formulário e diga-nos em que o podemos ajudar. Se
              preferir, ligue-nos — atendemos.
            </p>
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-painel border border-linha bg-papel p-8 shadow-1">
              <FormularioContacto />
            </div>
          </div>
        </div>
      </Seccao>
    </>
  );
}
