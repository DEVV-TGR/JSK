import { Medida, Seccao } from "@/components/ui/Seccao";
import { APRESENTACAO } from "@/lib/conteudo/web";

/**
 * A parceria — a cena calma.
 *
 * É o silêncio antes do pico, como a `IntroScreens` e a `Apresentacao` da
 * homepage: terreno claro, texto largo, quase nada a mexer. Não é scroll morto
 * — é a curva a descer para a cena que constrói o site poder subir a seguir.
 *
 * Duas colunas para a entrada, e não uma coluna estreita com meia página vazia
 * ao lado. Foi a lição do `Comprar vs alugar` da `/screens-led/`.
 */
export function ApresentacaoWeb() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <h2 className="text-cena font-titulo max-w-[18ch] font-extrabold">
          {APRESENTACAO.titulo}
        </h2>
        <p className="text-guia text-chumbo entra mt-8 max-w-[68ch]">
          {APRESENTACAO.texto}
        </p>
      </Medida>
    </Seccao>
  );
}
