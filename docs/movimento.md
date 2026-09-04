# Movimento

O `CLAUDE.md` aponta para aqui quando diz "sem `motion`, sem `lenis`, sem
GSAP". Este ficheiro é o resto da frase.

## A decisão

**O movimento deste site é CSS, e não há JavaScript de animação nenhum.**

Nem biblioteca, nem `requestAnimationFrame`, nem um único `addEventListener`
de scroll. As linhas temporais são as do browser — `animation-timeline: view()`
e `scroll()` — e os contadores contam com `@property` e `counter()`.

O que isto poupa, medido contra o site antigo: jQuery, `jquery-numerator`,
`waypoints`, o handler de scroll não estrangulado da `/web/`, e o JS de
pré-visualização do Astra Starter Templates que ainda ia para os visitantes.

Porque é que uma empresa de segurança não deve animar mais do que isto: um site
que monta o título letra a letra lê-se como menos sério, não mais. O movimento
aqui existe para dizer *onde estamos* na página, não para se mostrar.

## A regra que não se quebra

**O estado por omissão de tudo é o estado final.**

Escrito ao contrário — esconder e revelar por animação — um browser sem
`animation-timeline` serve uma página em branco. Não é hipotético; é o modo de
falhar mais comum das animações conduzidas por scroll.

Por isso `app/movimento.css` tem esta forma, e só esta:

```css
.contador { --contagem: var(--alvo); }        /* o número certo, já */

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .contador { --contagem: 0; animation: conta …; }   /* só aqui é que anima */
  }
}
```

Duas consequências: um browser sem suporte mostra a página completa e legível,
e quem pediu menos movimento no sistema operativo recebe a página completa e
legível. Nenhum dos dois é um caso degradado — são a mesma página, sem o
enfeite.

## Porque é que os intervalos fecham em `entry` e em `contain`

Uma armadilha que custou tempo num repo irmão: `animation-range` fechado em
`cover` deixa o último bloco preso.

`cover 100%` é o instante em que o elemento acabou de sair do ecrã por cima.
Para o último bloco antes do rodapé esse instante nunca chega — não há mais
scroll — e a animação fica congelada a meio caminho, a meia opacidade, para
sempre.

Regra prática:

| Efeito | Intervalo | Porquê |
|---|---|---|
| Entradas, contagem, títulos | `entry …` | Completa enquanto o elemento ainda sobe para o ecrã |
| Viagem lateral, a casa que se arma | `contain …` | É exactamente o tempo em que a cena ocupa o ecrã inteiro, ou seja o tempo em que está fixa |
| — | ~~`cover`~~ | Nunca |

## O escalonamento não é um atraso

Numa linha temporal de scroll, o tempo **é** a posição. Um `animation-delay`
não faz sentido: o elemento não está à espera, está parado numa posição.

O que se desloca é o intervalo de cada elemento:

```css
animation-range: entry 5% entry calc(55% + var(--i, 0) * 9%);
```

Cada elemento leva o seu `--i` em `style`. O terceiro item de uma lista acaba a
sua entrada mais tarde do que o primeiro, o que dá a cascata — sem
temporizadores e sem nada por sincronizar.

## As propriedades que se animam

`transform`, `opacity`, `clip-path`, `stroke-dashoffset`. Mais nada.

Nunca `width`, `height`, `top` nem `left`: obrigam o browser a recalcular a
disposição da página a cada fotograma. E nunca `transition: all` — apanha
propriedades que ninguém quis animar, e uma regra fora de `@layer` que declare
de menos descarta em silêncio o que se quis.

## Hover

Todo o hover vai atrás de `@media (hover: hover) and (pointer: fine)`. Num
telemóvel um toque dispara `:hover` e o estado só sai no toque seguinte — o
botão fica aceso depois de a pessoa já ter navegado para outro lado.

O Tailwind v4 já põe o `hover:` dentro de `@media (hover: hover)`, mas falta-lhe
o `pointer: fine`. A variante está redefinida em `app/globals.css`, o que apanha
todos os `hover:` do projecto de uma vez — mais seguro do que confiar que quem
escreve o próximo se lembra da regra.

## O que ainda não está verificado

O Chrome sem cabeça não reproduz um iPhone: nem o decoder de vídeo, nem a
política de autoplay, nem o Low Power Mode, nem o scroll por toque. A
configuração do Playwright corre também em `iPhone 14` por isso, e mesmo assim
não substitui um telefone na mão.
