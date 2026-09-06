import Image from "next/image";

import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { INTRO } from "@/lib/conteudo/screens";

/**
 * Aluguer e Venda — a cena calma.
 *
 * É o silêncio antes do pico, como a `Apresentacao` na homepage e a cena 2 das
 * duas irmãs: terreno claro, texto largo, e quase nada a mexer. Não é scroll
 * morto — é a curva a descer para a parede poder subir a seguir.
 *
 * A fotografia é a do cliente e mostra três módulos de LED, um deles aberto
 * pelas costas. Está aqui, e não mais abaixo, por uma razão de sequência: quem
 * vê o que é um módulo entende, no ecrã seguinte, o que é que se está a montar.
 * São 247×229 e não há maior no servidor do cliente, por isso é um apoio ao
 * texto e nunca uma imagem de cena — ampliá-la só a desfazia.
 */
export function IntroScreens() {
  return (
    <Seccao terreno="papel">
      <Medida>
        <div className="grid items-start gap-x-16 gap-y-10 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-cena font-titulo max-w-[18ch] font-extrabold">
              {INTRO.titulo}
            </h2>
            <p className="text-chumbo mt-6 max-w-[58ch] text-[1.0625rem] leading-relaxed">
              {INTRO.texto}
            </p>
          </div>

          <Image
            src={INTRO.imagem.src}
            alt={INTRO.imagem.alt}
            width={247}
            height={229}
            sizes="247px"
            className="entra justify-self-start lg:justify-self-end"
          />
        </div>

        {/* Os três selos. São chapas a sério — o motivo do site — e não
            etiquetas arredondadas: o logótipo da empresa é um sinal de
            trânsito, e é essa a gramática. */}
        <ul className="mt-[var(--espaco-bloco)] flex flex-wrap gap-3">
          {INTRO.selos.map((selo, indice) => (
            <li
              key={selo}
              className="entra chapa font-titulo flex items-center gap-2.5 px-4 py-2.5 text-[0.8125rem] font-bold tracking-[0.08em] uppercase"
              style={{ "--i": indice } as React.CSSProperties}
            >
              <Icone nome="certo" className="size-4 stroke-[2.5]" />
              {selo}
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
