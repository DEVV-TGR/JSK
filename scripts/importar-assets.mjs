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
 */
const LARGURA_MAXIMA = 1200;

/** `mozjpeg` a 78 é o joelho da curva: abaixo disto vê-se, acima não poupa. */
const QUALIDADE = 78;

/**
 * O que se importa, e com que nome fica.
 *
 * A galeria de `/alarmes/`, seis fotografias. A ordem é a do site actual.
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

async function processar({ origem, destino }) {
  const entrada = await garantirOriginal(origem);
  const saida = path.join(PUBLICO, destino);

  if (!refazer && (await existe(saida))) {
    console.log(`  = ${destino} já lá está`);
    return;
  }

  const bytes = await sharp(entrada)
    /* Sem isto, uma fotografia tirada com o telemóvel de lado sai deitada: o
       `resize` trabalha nos pixels e a orientação vive nos metadados EXIF, que
       o `sharp` remove ao gravar. */
    .rotate()
    .resize({ width: LARGURA_MAXIMA, withoutEnlargement: true })
    .jpeg({ quality: QUALIDADE, mozjpeg: true })
    .toBuffer();

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

  const pasta = path.join(PUBLICO, "projectos");
  const total = (
    await Promise.all(
      (await readdir(pasta)).map(async (nome) =>
        (await stat(path.join(pasta, nome))).size,
      ),
    )
  ).reduce((soma, tamanho) => soma + tamanho, 0);

  console.log(`\npublic/projectos/: ${kb(total)} no total.`);
}

principal().catch((erro) => {
  console.error(`\n✗ ${erro.message}`);
  process.exitCode = 1;
});
