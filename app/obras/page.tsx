import type { Metadata } from "next";

import { BlocoServicos } from "@/components/seccoes/BlocoServicos";
import { Galeria } from "@/components/seccoes/Galeria";
import { ServicoLd } from "@/components/DadosEstruturados";
import { Heroi } from "@/components/seccoes/Heroi";
import { Processo } from "@/components/seccoes/Processo";
import { GALERIA_OBRAS } from "@/lib/conteudo/galerias";
import { HEROIS_SECTOR } from "@/lib/conteudo/paginas";
import { SERVICOS_OBRAS } from "@/lib/conteudo/servicos";

export const metadata: Metadata = {
  title: "Obras e Remodelações",
  description:
    "Remodelações de cozinhas e casas de banho, acabamentos, pavimentos e instalações elétricas e hidráulicas. A JSK transforma o seu espaço com qualidade.",
  alternates: { canonical: "/obras/" },
};

export default function Obras() {
  return (
    <>
      <ServicoLd id="obras" />
      <Heroi {...HEROIS_SECTOR.obras} />
      <BlocoServicos bloco={SERVICOS_OBRAS} olho="JSK Obras" />
      {/* As fotografias de obras são de paisagem; forçá-las à proporção de
          retrato da galeria de alarmes cortava metade de cada cozinha. */}
      <Galeria
        galeria={GALERIA_OBRAS}
        olho="Trabalho feito"
        proporcao="4 / 3"
        colunas={2}
      />
      <Processo />
    </>
  );
}
