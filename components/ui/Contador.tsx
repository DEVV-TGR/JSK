"use client";

import { useEffect, useRef, useState } from "react";

const FORMATO = new Intl.NumberFormat("pt-PT");

type Props = {
  valor: number;
  rotulo: string;
};

/**
 * Um número que conta até ao valor final quando entra no ecrã.
 *
 * É a única coisa deste site com JavaScript de animação, e substitui o
 * `jquery-numerator` mais o `waypoints` que o site antigo carrega para o fazer.
 *
 * Três decisões que valem a pena:
 *
 * - **O servidor escreve o valor final.** Quem tem movimento reduzido, quem tem
 *   o JavaScript desligado e qualquer motor de busca vêem `1 280`, não `0`. Só
 *   depois de montar é que o contador recua a zero para animar — e só se ainda
 *   não estiver visível.
 * - **A duração depende da grandeza.** Um contador que vai até 9 a arrastar-se
 *   durante 1,6 segundos parece avariado. Os quatro números desta página vão de
 *   9 a 1391.
 * - **O leitor de ecrã ouve o número, não a contagem.** O rótulo acessível está
 *   no contentor e o texto que muda está escondido; sem isso, ouve-se um caudal
 *   de algarismos.
 */
export function Contador({ valor, rotulo }: Props) {
  const [mostrado, setMostrado] = useState(valor);
  const alvo = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const elemento = alvo.current;
    if (!elemento) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Se já está visível quando a página monta, não vale a pena recuar a zero
    // só para animar — o visitante já leu o número.
    const caixa = elemento.getBoundingClientRect();
    if (caixa.top < window.innerHeight && caixa.bottom > 0) return;

    let quadro = 0;
    const duracao = valor >= 1000 ? 1600 : 1100;

    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        observador.disconnect();

        // ⚠️ O recuo a zero acontece AQUI, no quadro em que a animação começa
        // — não no `useEffect`. Se estivesse lá em cima, bastava o observador
        // não chegar a disparar (um browser que o não suporte, uma captura de
        // ecrã automatizada, um separador que nunca chega a ser mostrado) para
        // o número ficar em `0` para sempre. O modo de falha passa a ser "não
        // anima", em vez de "mostra zero projectos concluídos".
        setMostrado(0);

        const inicio = performance.now();
        const passo = (agora: number) => {
          const decorrido = Math.min((agora - inicio) / duracao, 1);
          // easeOutExpo: arranca depressa e aterra devagar, que é o que faz o
          // número parecer chegar em vez de tiquetaquear.
          const progresso = decorrido === 1 ? 1 : 1 - 2 ** (-10 * decorrido);
          setMostrado(Math.round(valor * progresso));
          if (decorrido < 1) quadro = requestAnimationFrame(passo);
        };
        quadro = requestAnimationFrame(passo);
      },
      { threshold: 0.4 },
    );

    observador.observe(elemento);
    return () => {
      observador.disconnect();
      cancelAnimationFrame(quadro);
    };
  }, [valor]);

  return (
    <div
      className="flex flex-col gap-2"
      aria-label={`${FORMATO.format(valor)} ${rotulo}`}
    >
      <span
        ref={alvo}
        data-numerico
        aria-hidden
        className="font-titulo text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-amarelo"
      >
        {FORMATO.format(mostrado)}
      </span>
      <span aria-hidden className="text-nota text-papel/70">
        {rotulo}
      </span>
    </div>
  );
}
