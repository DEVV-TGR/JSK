import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { EXCELENCIA } from "@/lib/conteudo/sobre";

/**
 * Compromisso com a Excelência — a cena calma, com a melhor fotografia do site.
 *
 * É o silêncio antes do pico, como a `Apresentacao` da homepage: terreno
 * claro, texto largo, quase nada a mexer.
 *
 * A fotografia é a chapa da JSK montada numa parede com duas câmaras de cada
 * lado. Não é uma imagem de arquivo nem uma composição: é o objecto de que
 * todo o sistema de desenho deste site saiu — o `docs/brief-experiencia.md`
 * diz que o registo industrial não é gosto, porque «o logótipo da empresa é um
 * sinal de trânsito». Aqui está ele, na parede, a fazer o trabalho.
 *
 * Limpa-se com `clip-path` ao entrar, como as galerias — nunca com `width`,
 * que obrigaria o browser a recalcular a página a cada fotograma.
 */
export function Excelencia() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <div className="grid items-center gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)]">
          <div>
            <h2 className="text-cena font-titulo max-w-[var(--medida-titulo)] font-extrabold">
              {EXCELENCIA.titulo}
            </h2>

            {/* O primeiro parágrafo leva corpo maior e o segundo recua, como na
                `Apresentacao` da homepage: dois parágrafos do mesmo tamanho
                lêem-se como um bloco só. */}
            <p
              className="entra mt-8 text-[1.25rem] leading-[1.55] font-medium text-balance"
              style={{ "--i": 0 } as React.CSSProperties}
            >
              {EXCELENCIA.paragrafos[0]}
            </p>
            <p
              className="entra text-chumbo mt-6 max-w-[var(--medida-texto)] text-[1.0625rem] leading-relaxed"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              {EXCELENCIA.paragrafos[1]}
            </p>

            <ul className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {EXCELENCIA.pontos.map((ponto, indice) => (
                <li
                  key={ponto}
                  className="entra flex items-center gap-3 text-[1.0625rem]"
                  style={{ "--i": indice % 2 } as React.CSSProperties}
                >
                  <Icone
                    nome="certo"
                    className="text-amarelo size-4 shrink-0 stroke-[2.5]"
                  />
                  {ponto}
                </li>
              ))}
            </ul>
          </div>

          <div className="revela border-asfalto relative aspect-5/4 border-2">
            <Image
              src={EXCELENCIA.imagem.src}
              alt={EXCELENCIA.imagem.alt}
              fill
              sizes="(min-width: 1024px) 26rem, 90vw"
              className="object-cover"
            />
          </div>
        </div>
      </Medida>
    </Seccao>
  );
}
