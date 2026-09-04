import { Apresentacao } from "@/components/seccoes/Apresentacao";
import { BandaOrcamento } from "@/components/seccoes/BandaOrcamento";
import { CasaQueArma } from "@/components/seccoes/CasaQueArma";
import { Contadores } from "@/components/seccoes/Contadores";
import { Diferenciais } from "@/components/seccoes/Diferenciais";
import { Heroi } from "@/components/seccoes/Heroi";
import { Sectores } from "@/components/seccoes/Sectores";

/**
 * A homepage, em sete cenas.
 *
 * Cada uma tem um dispositivo diferente, e nenhum se repete em cenas
 * adjacentes: o título monta-se, a apresentação entra, os sectores empilham-se,
 * a casa arma-se, os números atravessam, as provas entram escalonadas, a chapa
 * fecha. Uma página que faz a mesma coisa sete vezes é uma cena mostrada sete
 * vezes.
 *
 * A sequência de terrenos é asfalto → papel → asfalto → asfalto → betão →
 * papel → amarelo. Onde dois terrenos escuros se encostam, o corte deixaria de
 * se ver — aí entra a banda de perigo, que é o corte tornado visível.
 */
export default function Inicio() {
  return (
    <>
      <Heroi />
      <Apresentacao />
      <Sectores />
      <CasaQueArma />
      <div className="banda-perigo" aria-hidden="true" />
      <Contadores />
      <Diferenciais />
      <BandaOrcamento />
    </>
  );
}
