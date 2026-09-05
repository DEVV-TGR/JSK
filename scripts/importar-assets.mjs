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

import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
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
 * A galeria de `/alarmes/`, seis fotografias, mais o fundo do herói da
 * homepage. A ordem das seis é a do site actual.
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

async function processar({ origem, destino, largura = LARGURA_MAXIMA }) {
  const entrada = await garantirOriginal(origem);
  const saida = path.join(PUBLICO, destino);

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
