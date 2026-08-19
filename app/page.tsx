import { BandaNumeros } from "@/components/seccoes/BandaNumeros";
import { Diferenciais } from "@/components/seccoes/Diferenciais";
import { GrelhaSectores } from "@/components/seccoes/GrelhaSectores";
import { Heroi } from "@/components/seccoes/Heroi";
import { Introducao } from "@/components/seccoes/Introducao";
import { O_QUE_NOS_TORNA_UNICOS } from "@/lib/conteudo/diferenciadores";
import { HEROI_INICIO, TITULO_DIFERENCIAIS } from "@/lib/conteudo/paginas";

export default function Inicio() {
  return (
    <>
      <Heroi {...HEROI_INICIO} variante="inicio" />
      <Introducao />
      <GrelhaSectores />
      <Diferenciais
        olho="Porquê a JSK"
        titulo={TITULO_DIFERENCIAIS}
        itens={O_QUE_NOS_TORNA_UNICOS}
      />
      <BandaNumeros />
    </>
  );
}
