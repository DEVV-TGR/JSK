#!/usr/bin/env node
/**
 * Importa os assets do cliente a partir de jsk.pt.
 *
 * O `package.json` já prometia este script em `npm run assets` e o
 * `.gitignore` já descrevia a convenção que ele implementa:
 *
 *   originais/   os ficheiros tal como saem de jsk.pt. Fora do git — são
 *                megabytes que ninguém precisa de versionar, e podem sempre
 *                voltar a ser descarregados.
 *   public/      os derivados, esses sim versionados, porque são o que o site
 *                serve e o que uma revisão de PR precisa de ver.
 *
 * Duas coisas que o script faz e que valem a pena antes de alguém as tirar:
 *
 * 1. **Renomeia.** Os nomes do WordPress trazem os sufixos do editor de
 *    imagem (`-e1754606226885`), inglês a meio do português (`camera`) e uma
 *    gralha a sério (`akarme-de-incendio`, defeito #8). O nome do ficheiro
 *    aparece no URL da imagem, que é público.
 * 2. **Guarda o original.** Sem isso, mudar a qualidade ou a largura obrigava
 *    a voltar a bater no site do cliente de cada vez.
 *
 * Uso:
 *   npm run assets              importa o que falta
 *   npm run assets -- --refazer volta a processar tudo a partir dos originais
 */

import { execFile } from "node:child_process";
import { copyFile, mkdir, readdir, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGINAIS = path.join(RAIZ, "originais");
const PUBLICO = path.join(RAIZ, "public");

const BASE = "https://jsk.pt/wp-content/uploads/";

/**
 * A largura de que o site precisa, e nem um pixel mais.
 *
 * A galeria mostra as fotografias em cartões de três colunas — no maior ecrã
 * que a `Medida` permite, cada uma ocupa uns 380px CSS, ou seja 760px num ecrã
 * de densidade dupla. 1200 dá folga para um ecrã maior sem carregar os
 * originais de 2000px que o WordPress guardava.
 *
 * Um asset pode pedir outra largura em `largura`. Quem o faz hoje é o fundo do
 * herói, que é ecrã inteiro e não um cartão de um terço.
 */
const LARGURA_MAXIMA = 1200;

/** `mozjpeg` a 78 é o joelho da curva: abaixo disto vê-se, acima não poupa. */
const QUALIDADE = 78;

/**
 * WebP a 82 para o herói.
 *
 * O original é um PNG de 2 MB gerado por IA — superfícies lisas e degradês de
 * céu, que é onde o JPEG cria bandas e o WebP não. A 82 não se distingue do
 * PNG a olho e desce uma ordem de grandeza no peso.
 */
const QUALIDADE_WEBP = 82;

/**
 * O que se importa, e com que nome fica.
 *
 * A galeria de `/alarmes/`, os fundos de herói da homepage e da `/obras/`, e
 * a galeria de `/obras/`. A ordem dentro de cada grupo é a do site actual.
 */
const ASSETS = [
  {
    origem: "2025/08/camera-preta-e1754606226885.jpg",
    destino: "projectos/camara-preta.jpg",
  },
  {
    origem: "2025/08/camera-termica-e1754606272717.jpg",
    destino: "projectos/camara-termica.jpg",
  },
  {
    origem: "2025/08/sensores-de-abertura-scaled-e1754606453926.jpg",
    destino: "projectos/sensores-de-abertura.jpg",
  },
  {
    origem: "2025/08/teclado.jpg",
    destino: "projectos/teclado.jpg",
  },
  {
    origem: "2025/08/camera-e-sensor.jpg",
    destino: "projectos/camara-e-sensor.jpg",
  },
  {
    /* `akarme` é gralha do cliente no nome do ficheiro — defeito #8. */
    origem: "2025/08/akarme-de-incendio-e1754606123466.jpg",
    destino: "projectos/alarme-de-incendio.jpg",
  },
  {
    /* O fundo do herói da homepage. O nome de origem é o da ferramenta que a
       gerou, com a data e a hora — e o nome do ficheiro aparece no URL, que é
       público. O original tem 1536×1024 e não há maior no servidor do cliente:
       `largura` aqui não é para reduzir, é para não deixar o valor por omissão
       de 1200 cortar 336px que fazem falta num fundo de ecrã inteiro. */
    origem: "2025/08/ChatGPT-Image-10_08_2025-22_10_03.png",
    destino: "heroi/sinal-e-camara.webp",
    largura: 1536,
  },

  /* ── /obras/ ─────────────────────────────────────────────────────────────
     Cinco fotografias, e são **dois trabalhos** mais o herói: a moradia com
     andaime, uma casa em duas divisões, e uma loja em duas vistas.

     Os nomes de destino dizem o que se vê e não de quem é. As duas últimas
     chamam-se `Obras-Panda-Pet` na origem — `Panda Pet` é o negócio de outra
     pessoa, e o nome do ficheiro aparece no URL, que é público. */
  {
    /* Fundo de ecrã inteiro, como o herói da homepage: WebP e a largura
       nativa do original, que aqui são 1600. */
    origem: "2025/08/Banner-Obras.jpeg",
    destino: "obras/moradia-com-andaime.webp",
    largura: 1600,
  },
  {
    origem: "2025/08/Obras-cozinha-1.jpeg",
    destino: "obras/cozinha-acabada.jpg",
  },
  {
    origem: "2025/08/Obras-cozinha-2.jpeg",
    destino: "obras/sala-aberta.jpg",
  },
  {
    origem: "2025/08/Obras-Panda-Pet.jpeg",
    destino: "obras/loja-balcao.jpg",
  },
  {
    origem: "2025/08/Obras-Panda-Pet-2.jpeg",
    destino: "obras/loja-prateleiras.jpg",
  },

  /* ── /screens-led/ ───────────────────────────────────────────────────────
     Uma fotografia, uma fotografia de produto, e o vídeo.

     **O vídeo é o primeiro asset deste site que não é imagem.** Não passa por
     `sharp`: copia-se tal e qual, e é o `copia: true` que o diz. Reprocessá-lo
     seria recodificar vídeo — outro ofício, outra dependência, e nada a ganhar
     num ficheiro de 1,3 MB que já vem em H.264.

     O nome de origem é o que o WhatsApp lhe deu, com a data, a hora e um
     resumo hexadecimal. O nome do ficheiro aparece no URL, que é público. */
  {
    /* A montra da Panda Pet — a **mesma loja** que está na galeria da
       `/obras/`, fotografada de fora. É a que o cliente serve hoje no herói da
       `/screens-led/`, e é trabalho real da JSK; o que ela não tem é um ecrã
       LED. Fica por decisão do Gonçalo, a 6 de Setembro de 2026, e é por isso
       que o `alt` em `lib/conteudo/screens.ts` descreve vinis e letreiro e não
       promete um ecrã que ali não está.

       Fundo de ecrã inteiro, como os outros heróis: WebP, e a largura nativa
       do original, que aqui são 2000. */
    origem: "2025/08/PHOTO-2025-03-21-16-07-21.webp",
    destino: "screens/montra-panda-pet.webp",
    largura: 2000,
  },
  {
    /* Os módulos de que uma parede LED é feita, que é exactamente o que a cena
       do pico monta. O destino é `.webp` e não `.png` por uma razão concreta:
       o original tem canal alfa, e o ramo por omissão do `codificar` grava
       JPEG — um `.png` no destino daria bytes JPEG dentro de um ficheiro com
       extensão errada e o fundo transparente virava preto.

       Tem 247×229 e não há maior. O `withoutEnlargement` do `resize` é que
       garante que os 1200 por omissão não o esticam. */
    origem: "2025/09/JSK-Screens.png",
    destino: "screens/modulos.webp",
  },
  {
    origem: "2025/09/Video-WhatsApp-2025-09-16-as-08.53.13_1e4c33cd.mp4",
    destino: "screens/parede.mp4",
    copia: true,
    poster: "screens/parede-poster.webp",
  },
];

const refazer = process.argv.includes("--refazer");

function kb(bytes) {
  return `${Math.round(bytes / 1024)} KB`;
}

async function existe(caminho) {
  try {
    await stat(caminho);
    return true;
  } catch {
    return false;
  }
}

/**
 * Descarrega uma vez e mais nenhuma.
 *
 * O original que já está em disco é o mesmo ficheiro — o site do cliente é
 * estático e estes assets estão lá desde Agosto de 2025. Voltar a pedi-los a
 * cada corrida seria bater no servidor dele por nada.
 */
async function garantirOriginal(origem) {
  const destino = path.join(ORIGINAIS, origem);

  if (await existe(destino)) return destino;

  const url = `${BASE}${origem}`;
  const resposta = await fetch(url);

  if (!resposta.ok) {
    throw new Error(`${url} respondeu ${resposta.status}`);
  }

  const bytes = Buffer.from(await resposta.arrayBuffer());
  await mkdir(path.dirname(destino), { recursive: true });
  await writeFile(destino, bytes);

  console.log(`  ↓ ${origem} (${kb(bytes.length)})`);
  return destino;
}

/**
 * O formato de saída sai da extensão do destino, e não de uma opção à parte.
 *
 * O destino já é a única coisa que diz onde o ficheiro vai parar; que fique a
 * dizer também em que formato. Assim não há como ter um `.webp` gravado em
 * JPEG por alguém se ter esquecido de mudar as duas coisas.
 */
function codificar(pipeline, destino) {
  if (path.extname(destino) === ".webp") {
    return pipeline.webp({ quality: QUALIDADE_WEBP, effort: 6 });
  }

  return pipeline.jpeg({ quality: QUALIDADE, mozjpeg: true });
}

/**
 * O primeiro fotograma do vídeo, gravado como `poster`.
 *
 * Não é enfeite: no iOS em Low Power Mode o autoplay **não dispara**, e sem
 * `poster` a parede da cena do pico acende para um rectângulo preto. Com ele,
 * quem não recebe o vídeo recebe na mesma o ecrã aceso.
 *
 * Sai do fotograma 0 e não de um instante escolhido a olho: assim o que se vê
 * parado é exactamente o que se vê quando o vídeo arranca, e não há salto no
 * primeiro fotograma reproduzido.
 *
 * **Falha em silêncio, de propósito.** O `ffmpeg` não é dependência deste
 * projecto e não está no CI. O `poster` que interessa é o que está versionado
 * em `public/` — como o polyfill, e pela mesma razão: se dependesse de uma
 * ferramenta do sistema, um deploy sem ela perdia-o sem ninguém dar por isso.
 */
async function gerarPoster(entrada, poster) {
  const saida = path.join(PUBLICO, poster);

  if (!refazer && (await existe(saida))) {
    console.log(`  = ${poster} já lá está`);
    return;
  }

  try {
    const { promisify } = await import("node:util");
    const correr = promisify(execFile);
    const temporario = `${saida}.png`;

    await mkdir(path.dirname(saida), { recursive: true });
    await correr("ffmpeg", ["-v", "error", "-y", "-i", entrada, "-frames:v", "1", temporario]);

    const bytes = await sharp(temporario)
      .webp({ quality: QUALIDADE_WEBP, effort: 6 })
      .toBuffer();

    await writeFile(saida, bytes);
    await (await import("node:fs/promises")).rm(temporario, { force: true });

    console.log(`  ✓ ${poster} — fotograma 0, ${kb(bytes.length)}`);
  } catch {
    console.log(`  ! ${poster} não foi gerado (ffmpeg em falta). O que está em public/ fica.`);
  }
}

async function processar({ origem, destino, largura = LARGURA_MAXIMA, copia, poster }) {
  const entrada = await garantirOriginal(origem);
  const saida = path.join(PUBLICO, destino);

  /* O que não é imagem copia-se tal e qual. O `sharp` não abre um MP4, e
     recodificar vídeo seria outro ofício — o ficheiro do cliente já vem em
     H.264 a 1,5 Mbit/s, que é o que se quer servir. */
  if (copia) {
    if (refazer || !(await existe(saida))) {
      await mkdir(path.dirname(saida), { recursive: true });
      await copyFile(entrada, saida);
      console.log(`  ✓ ${destino} — cópia, ${kb((await stat(saida)).size)}`);
    } else {
      console.log(`  = ${destino} já lá está`);
    }

    if (poster) await gerarPoster(entrada, poster);
    return;
  }

  if (!refazer && (await existe(saida))) {
    console.log(`  = ${destino} já lá está`);
    return;
  }

  const bytes = await codificar(
    sharp(entrada)
      /* Sem isto, uma fotografia tirada com o telemóvel de lado sai deitada: o
         `resize` trabalha nos pixels e a orientação vive nos metadados EXIF,
         que o `sharp` remove ao gravar. */
      .rotate()
      .resize({ width: largura, withoutEnlargement: true }),
    destino,
  ).toBuffer();

  const { width, height } = await sharp(bytes).metadata();

  await mkdir(path.dirname(saida), { recursive: true });
  await writeFile(saida, bytes);

  const antes = (await stat(entrada)).size;
  console.log(
    `  ✓ ${destino} — ${width}×${height}, ${kb(antes)} → ${kb(bytes.length)}`,
  );
}

async function principal() {
  console.log(
    `Assets: ${ASSETS.length} ficheiros${refazer ? " (a refazer todos)" : ""}\n`,
  );

  for (const asset of ASSETS) {
    await processar(asset);
  }

  /* As pastas vêm dos destinos e não de uma lista à parte: acrescentar um
     asset numa pasta nova passa a contá-la sem ninguém se lembrar disso. */
  const pastas = [...new Set(ASSETS.map(({ destino }) => path.dirname(destino)))];

  console.log("");

  for (const pasta of pastas.sort()) {
    const caminho = path.join(PUBLICO, pasta);
    const total = (
      await Promise.all(
        (await readdir(caminho)).map(async (nome) =>
          (await stat(path.join(caminho, nome))).size,
        ),
      )
    ).reduce((soma, tamanho) => soma + tamanho, 0);

    console.log(`public/${pasta}/: ${kb(total)} no total.`);
  }
}

principal().catch((erro) => {
  console.error(`\n✗ ${erro.message}`);
  process.exitCode = 1;
});
