# De onde vêm estes ficheiros

Tudo o que está aqui é gerado por `npm run assets`
(`scripts/importar-assets.mjs`) a partir dos originais em `originais/`, que o
script descarrega de `jsk.pt/wp-content/uploads/`. Os originais não são
versionados — são uns 9 MB de PNG e JPEG que ninguém precisa de ter no
histórico.

**Não editar nada aqui à mão.** Quem o fizer perde a alteração na próxima
importação. Para mudar um tamanho ou uma qualidade, muda-se o manifesto do
script.

## As pastas

| Pasta | O que é |
|---|---|
| `marca/` | logótipo |
| `heroi/` | as imagens de topo de cada página |
| `sectores/` | os cartões dos quatro sectores na homepage |
| `alarmes/` | galeria de projectos de alarmes (6) |
| `obras/` | galeria de projectos de obras (4) |
| `sobre/` | fotografia de `/sobre-nos/` |
| `screens/` | ilustração e vídeo de `/screens-led/` |

## Um original, um derivado

Não há aqui variantes por tamanho de ecrã. O `next/image` gera o `srcset` a
partir do ficheiro que está nesta pasta; o que o script faz é converter para
WebP, limitar a dimensão máxima e deitar fora os metadados.

## O que ficou de fora, e porquê

**As cinco fotografias de stock do template "Roofing" da Astra** —
`roofing-client-1.jpg`, `-2.jpg`, `-3.jpg`, `roofing-featured-client-photo.png`
e `roofing-img-04.jpg`. Foram carregadas em 2020 e 2021, anos antes de este
site existir, e no site antigo estão a fazer de clientes da JSK na secção de
testemunhos. Não são do cliente e não são clientes do cliente. O script
mantém-nas numa lista de recusados para que não entrem por engano.

**O `Design-sem-nome-3.png`** — um carimbo decorativo de 15 KB aplicado ao
canto inferior direito de todos os heróis e da banda de orçamento. Passa a
geometria em SVG, que escala, muda de cor com o tema e não é um pedido de rede.

## Por fazer

O vídeo `screens/demo.mp4` não tem poster. Sem ele, o bloco fica preto até o
primeiro quadro chegar. Gera-se com ffmpeg — o comando está no fim da saída de
`npm run assets`. Não é dependência do projecto porque é a única coisa que
precisaria dele.
