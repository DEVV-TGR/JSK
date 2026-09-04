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

## Os nomes mudam, e é de propósito

Os nomes do WordPress trazem o sufixo do editor de imagem
(`-e1754606226885`), inglês a meio do português (`camera`), e pelo menos uma
gralha a sério — `akarme-de-incendio`, que está na lista de defeitos (#8). O
nome do ficheiro aparece no URL da imagem, e o URL é público.

O mapa de `origem → destino` vive no script, o que faz dele também o registo de
que nome é que veio de onde.

## O `alt` não se gera

O site antigo deriva o texto alternativo do nome do ficheiro: `camera preta`,
`akarme de incendio`, `roofing client 3`. Isso descreve o ficheiro, não a
imagem — defeito #20.

O `alt` das fotografias vive com a copy, em `lib/conteudo/`, e escreve-se
**depois de olhar para a fotografia**. Não é a mesma coisa que a legenda: a
legenda é do cliente e vende; o `alt` descreve, para quem não vê.
