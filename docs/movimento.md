# Movimento

O site em WordPress não tem biblioteca de animação nenhuma: sem AOS, sem GSAP,
sem Swiper, sem Lottie, e zero animações de entrada do Elementor. A única coisa
que mexe são os contadores, com `jquery-numerator` e `waypoints`.

**Isso é uma base saudável, não um defeito.** A camada que se acrescentou é
restrita de propósito, e não trouxe uma única dependência: sem `motion`, sem
`lenis`, sem GSAP. Nove páginas estáticas não justificam dezenas de KB de
runtime de animação, e um site de segurança que anima o título letra a letra
lê-se como menos sério, não mais.

Tudo o que se segue é CSS, com uma excepção — o contador.

## Camada 1 — micro-interacção

A classe `.premivel`, em `globals.css`. `:active` encolhe para `scale(0.97)`;
o hover levanta `1px`.

⚠️ O hover está atrás de `@media (hover: hover) and (pointer: fine)`. Num
telemóvel, um toque dispara `:hover` e o estado fica preso até se tocar noutro
sítio — o botão fica levantado depois de o dedo sair.

⚠️ A `transition` declara **todas** as propriedades que anima. Vive fora de
`@layer`, e o que está fora de uma camada ganha sempre ao que está dentro: um
`transition-colors` do Tailwind escrito ao lado não a completa, substitui-a.

| Onde | O quê | Tempo |
|---|---|---|
| Botões e cartões clicáveis | `translateY(-1px)`, sombra 1 → 2 | 160–220 ms |
| Sublinhado da navegação | `scaleX(0 → 1)` da esquerda | 200 ms |
| Filete dos cartões de sector | `scaleX(0 → 1)` | 300 ms |
| Fotografia dentro de um cartão | `scale(1 → 1.04)` | 700 ms |
| Foco | **nunca animado** | — |

## Camada 2 — entrada ao scroll

A classe `.revela`, com `animation-timeline: view()`. Zero JavaScript.

Duas decisões que valem tempo poupado:

- **O conteúdo é visível por omissão.** A animação está dentro de um
  `@supports (animation-timeline: view())`. Um browser sem suporte mostra a
  página; não fica em branco à espera de um observador que nunca dispara.
- **O intervalo fecha em `entry`, nunca em `cover`.** Com `cover`, o último
  bloco antes do rodapé nunca chega ao fim do seu próprio percurso e fica preso
  a meia opacidade para sempre.

O escalonamento faz-se a deslocar o intervalo (`<Revela ordem={n}>`), não com um
`animation-delay`: numa animação conduzida pelo scroll, um atraso em segundos
não quer dizer nada — o relógio é a posição da página.

**Uma revelação por secção.** O escalonamento item a item só nos sítios em que
ele *é* o conteúdo: os quatro cartões de sector e os quatro passos do processo.

## Camada 3 — os contadores

`components/ui/Contador.tsx`, o único JavaScript de animação do site.
Substitui o `jquery-numerator` e o `waypoints`.

- `IntersectionObserver` a 0,4, dispara uma vez.
- `requestAnimationFrame` com `easeOutExpo` — arranca depressa e aterra devagar,
  que é o que faz o número parecer *chegar* em vez de *tiquetaquear*.
- **Duração por grandeza:** 1600 ms acima de mil, 1100 ms abaixo. Um contador
  que vai até 9 a arrastar-se 1,6 segundos parece avariado, e três dos quatro
  números desta página são pequenos.
- `font-variant-numeric: tabular-nums`. Sem isto a largura salta a cada quadro
  e a linha inteira treme.
- **O servidor escreve o valor final**, e o recuo a zero acontece dentro da
  própria animação. Se o observador não chegar a disparar, o número fica certo
  em vez de ficar em zero — o modo de falha é "não anima", não "mostra zero
  projectos concluídos".
- O rótulo acessível está no contentor e o texto que muda leva `aria-hidden`:
  um leitor de ecrã não deve ouvir um caudal de algarismos.

## Camada 4 — página

- **Cabeçalho:** transparente sobre o herói, passa a `--color-carvao` a partir
  de 24px de scroll. O gatilho é um `IntersectionObserver` sobre um elemento de
  1px no topo, não um listener de `scroll` — o site antigo tem um, na página
  `/web/`, sem throttle e sem `requestAnimationFrame`.
- **Menu em ecrã estreito:** `<dialog>` nativo, com `@starting-style` e
  transições de `display` e `overlay` em `allow-discrete`. A regra vive em
  `globals.css` porque não há variante do Tailwind que a escreva bem.

## Movimento reduzido

Um bloco global anula durações, **incluindo o `scroll-behavior: smooth`** — que
é dos que mais enjoam e não é apanhado pelas regras de `animation` e
`transition`. O contador verifica a preferência antes de sequer recuar a zero.

## Fora de propósito

Parallax, marquees, pinning e scrub, transições de página, animação de texto
carácter a carácter, cursores personalizados. Nada disto ajuda alguém a pedir um
orçamento para um alarme.
