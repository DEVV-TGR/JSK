# Assets

O `.gitignore` já apontava para aqui antes de este ficheiro existir. É o resto
da frase.

## As duas pastas

```
originais/    o ficheiro tal como sai de jsk.pt. Fora do git.
public/       o derivado que o site serve. Versionado.
```

**`originais/` está fora do git** porque são megabytes que podem sempre voltar a
ser descarregados, e porque ninguém precisa de rever um JPEG de 2 MB num PR.

**`public/` está dentro** porque é o que vai para produção. Uma revisão de PR
tem de poder ver a imagem que a página vai mostrar, e um deploy não pode
depender de o site do cliente estar de pé nesse dia.

## Como se importa

```
npm run assets              importa o que falta
npm run assets -- --refazer volta a processar tudo a partir dos originais
```

O script é o `scripts/importar-assets.mjs`, e a lista do que se importa está lá
dentro, em cima. Descarrega uma vez e mais nenhuma: o original que já está em
disco não é pedido outra vez ao servidor do cliente.

Cada ficheiro é redimensionado a **1200px de largura máxima** e gravado em JPEG
`mozjpeg` a **qualidade 78**. As seis fotografias da galeria de `/alarmes/`
passaram de 936 KB para 640 KB, sem diferença visível.

### A excepção: o fundo do herói

O 1200px é a medida dos cartões da galeria, que ocupam um terço da `Medida`. O
fundo do herói da homepage é ecrã inteiro, e por isso leva os **1536px nativos**
do original — que é tudo o que existe: não há versão maior no servidor do
cliente, e num monitor grande a imagem vai ler-se suave. Fica dito.

Sai em **WebP a 82** e não em JPEG. O original é uma imagem gerada por IA —
superfícies lisas e um degradê de céu, que é onde o JPEG cria bandas visíveis e
o WebP não. Deu **1996 KB → 55 KB**.

O formato de saída vem da extensão do destino no script (`.webp` → WebP, o resto
JPEG) e a largura de um `largura` opcional por asset. Não há uma segunda opção
para manter em sincronia com o nome do ficheiro.

## Os nomes mudam, e é de propósito

Os nomes do WordPress trazem o sufixo do editor de imagem
(`-e1754606226885`), inglês a meio do português (`camera`), e pelo menos uma
gralha a sério — `akarme-de-incendio`, que está na lista de defeitos (#8). O
nome do ficheiro aparece no URL da imagem, e o URL é público.

O mapa de `origem → destino` vive no script, o que faz dele também o registo de
que nome é que veio de onde.

## As capturas da `/web/`

Três ficheiros em `public/web/` não vêm de jsk.pt e por isso **não estão na
lista do `importar-assets.mjs`**: são capturas dos sites que a DevPlus fez,
tiradas do browser a 1440×900 com autorização do Gonçalo, a 6 de Setembro de
2026.

```
taskuinha-do-pirata.webp    de taskuinhapirata.pt
imperio-auto-concept.webp   de imperioautoconcept.com
antonio-home-repair.webp    de antoniohomerepairservices.pt
```

Recortadas ao centro para 16:10 — que é o rácio do cartão, o que deixa o
`object-cover` sem nada para cortar — e gravadas a 1200px em WebP 82. As três
somam 132 KB.

**Três dos seis trabalhos não têm captura**, e é de propósito: a Mira Mar e A
Barraquinha Nova não têm site público a que o portefólio aponte, e o da JSK
apontaria para o WordPress que este projecto está a substituir. Ficam em cartão
tipográfico com a grelha de desenho — não se inventa uma imagem para encher.

## O `alt` não se gera

O site antigo deriva o texto alternativo do nome do ficheiro: `camera preta`,
`akarme de incendio`, `roofing client 3`. Isso descreve o ficheiro, não a
imagem — defeito #20.

O `alt` das fotografias vive com a copy, em `lib/conteudo/`, e escreve-se
**depois de olhar para a fotografia**. Não é a mesma coisa que a legenda: a
legenda é do cliente e vende; o `alt` descreve, para quem não vê.
