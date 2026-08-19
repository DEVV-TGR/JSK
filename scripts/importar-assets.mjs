#!/usr/bin/env node
/**
 * Traz os assets do cliente de jsk.pt e gera as versões que o site serve.
 *
 * Corre com `npm run assets`. É idempotente: o que já está em `originais/` não
 * volta a ser descarregado, e o que já está em `public/` só é regerado se o
 * original for mais recente.
 *
 * Porque é que isto existe em vez de se copiar as imagens à mão:
 *
 * - O site antigo serve dois PNG de **2 MB cada** como `background-image` de
 *   CSS. Um fundo em CSS não tem `srcset` nem carregamento diferido, por isso
 *   descem inteiros para um telemóvel numa rede fraca. São os dois maiores
 *   problemas de desempenho do site, e desaparecem aqui.
 * - Cinco das imagens que o site serve não são do cliente: são fotografias de
 *   stock do template "Roofing" da Astra, carregadas em 2020 e 2021, anos antes
 *   deste site existir. Estão a fazer de clientes da JSK na secção de
 *   testemunhos. A lista `RECUSADOS` garante que não entram — nem por engano
 *   nem por alguém as achar bonitas.
 *
 * Um original, um derivado. Não há aqui variantes por tamanho de ecrã: o
 * `next/image` gera o `srcset` a partir do ficheiro em `public/`. O que este
 * script faz é converter o formato, limitar a dimensão máxima e deitar fora os
 * metadados.
 */

import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const ORIGINAIS = join(RAIZ, "originais");
const PUBLICO = join(RAIZ, "public");
const BASE = "https://jsk.pt/wp-content/uploads";

/** Ficheiros do site antigo que NÃO entram. Ver o comentário no topo. */
const RECUSADOS = [
  "roofing-client-1.jpg",
  "roofing-client-2.jpg",
  "roofing-client-3.jpg",
  "roofing-featured-client-photo.png",
  "roofing-img-04.jpg",
];

/**
 * @typedef {{
 *   origem: string,      // caminho a seguir a /wp-content/uploads/
 *   destino: string,     // caminho a seguir a public/
 *   largura?: number,    // dimensão máxima do lado maior
 *   qualidade?: number,
 *   alfa?: boolean,      // preserva transparência
 *   copiar?: boolean,    // passa sem conversão (vídeo)
 *   nota: string,
 * }} Asset
 */

/** @type {Asset[]} */
const ASSETS = [
  // ── Marca ────────────────────────────────────────────────────────────────
  {
    origem: "2025/08/cropped-cropped-Sinal-JSK-com-Numero-de-Telefone-e1754857762844-1-1.png",
    destino: "marca/logo.webp",
    largura: 420,
    alfa: true,
    // ⚠️ Este logótipo tem o número de telefone gravado na imagem — está no
    // próprio nome do ficheiro. Isso quer dizer que o número não é
    // seleccionável, não é clicável, não escala com o texto e pode estar
    // errado sem ninguém dar por isso. Ver docs/decisoes-pendentes.md #11.
    // O site antigo serve o original de 943px num espaço de uns 80px.
    nota: "logótipo — com o telefone gravado no bitmap",
  },

  // ── Heróis ───────────────────────────────────────────────────────────────
  {
    origem: "2025/08/ChatGPT-Image-10_08_2025-22_10_03.png",
    destino: "heroi/institucional.webp",
    largura: 2400,
    // Um só ficheiro para as três páginas que usam esta imagem (/, /sobre-nos/
    // e /contactos/). O site antigo repete o mesmo PNG de 2 MB nas três.
    // ⚠️ É uma imagem gerada por IA — ver docs/decisoes-pendentes.md #11.
    nota: "herói de /, /sobre-nos/ e /contactos/ — gerado por IA, 2,04 MB",
  },
  { origem: "2025/10/image.png", destino: "heroi/web.webp", largura: 2400, nota: "herói de /web/ — 2,10 MB" },
  { origem: "2025/08/banner-alarmes.jpg", destino: "heroi/alarmes.webp", largura: 2400, nota: "herói de /alarmes/" },
  { origem: "2025/08/Banner-Obras.jpeg", destino: "heroi/obras.webp", largura: 2400, nota: "herói de /obras/" },
  {
    origem: "2025/08/PHOTO-2025-03-21-16-07-21.webp",
    destino: "heroi/screens.webp",
    // Menos largura e menos qualidade só neste. A origem já vem em WebP, por
    // isso reconvertê-la a 2400/82 não ganhava nada — ficava nos 277 KB. E é
    // uma fotografia de um ecrã LED aceso: o ruído dos píxeis acesos é o pior
    // caso para um compressor, e ao mesmo tempo é onde a perda menos se vê.
    largura: 2000,
    qualidade: 74,
    nota: "herói de /screens-led/ e cartão de sector",
  },

  // ── Cartões de sector ────────────────────────────────────────────────────
  {
    origem: "2025/07/479443651_9414483188616414_6752833514133670875_n.jpg",
    destino: "sectores/obras.webp",
    largura: 1600,
    // O nome vem do Facebook. Um caminho de ficheiro é conteúdo do site tanto
    // como o texto: aparece no HTML e nos registos do servidor.
    nota: "cartão JSK Obras — renomeado (o original tem nome do Facebook)",
  },
  { origem: "2025/10/XV_JSKWEB.png", destino: "sectores/web.webp", largura: 1600, nota: "cartão JSK Web" },

  // ── Galeria de alarmes ───────────────────────────────────────────────────
  { origem: "2025/08/camera-preta-e1754606226885.jpg", destino: "alarmes/01-camara-exterior.webp", largura: 1200, nota: "câmara de exterior" },
  { origem: "2025/08/camera-termica-e1754606272717.jpg", destino: "alarmes/02-camara-termica.webp", largura: 1600, nota: "câmara térmica — serve também o cartão de sector" },
  { origem: "2025/08/sensores-de-abertura-scaled-e1754606453926.jpg", destino: "alarmes/03-sensor-abertura.webp", largura: 1200, nota: "sensor de abertura" },
  { origem: "2025/08/teclado.jpg", destino: "alarmes/04-controlo-acessos.webp", largura: 1200, nota: "controlo de acessos" },
  { origem: "2025/08/camera-e-sensor.jpg", destino: "alarmes/05-camara-interior.webp", largura: 1200, nota: "câmara de interior e sensor" },
  {
    origem: "2025/08/akarme-de-incendio-e1754606123466.jpg",
    destino: "alarmes/06-detecao-incendio.webp",
    largura: 1200,
    nota: "deteção de incêndio — o original está escrito 'akarme'",
  },

  // ── Galeria de obras ─────────────────────────────────────────────────────
  { origem: "2025/08/Obras-cozinha-1.jpeg", destino: "obras/01-cozinha.webp", largura: 1600, nota: "remodelação de cozinha" },
  { origem: "2025/08/Obras-cozinha-2.jpeg", destino: "obras/02-cozinha.webp", largura: 1600, nota: "remodelação de cozinha" },
  { origem: "2025/08/Obras-Panda-Pet.jpeg", destino: "obras/03-panda-pet.webp", largura: 1600, nota: "loja Panda Pet" },
  { origem: "2025/08/Obras-Panda-Pet-2.jpeg", destino: "obras/04-panda-pet.webp", largura: 1600, nota: "loja Panda Pet" },

  // ── Restantes ────────────────────────────────────────────────────────────
  { origem: "2025/08/JSK-Image2-e1756316573928.jpg", destino: "sobre/excelencia.webp", largura: 1600, nota: "bloco de excelência em /sobre-nos/" },
  { origem: "2025/09/JSK-Screens.png", destino: "screens/ecra.webp", largura: 1400, alfa: true, nota: "ilustração de ecrã LED" },
  {
    origem: "2025/09/Video-WhatsApp-2025-09-16-as-08.53.13_1e4c33cd.mp4",
    destino: "screens/demo.mp4",
    copiar: true,
    nota: "demonstração de screen LED — 1,27 MB",
  },
];

// O `Design-sem-nome-3.png` do site antigo não está aqui de propósito: é um
// carimbo decorativo aplicado ao canto de todos os heróis e da banda de
// orçamento. Passa a geometria em SVG, desenhada a partir da forma de sinal do
// logótipo — que escala, muda de cor e não pesa 15 KB.

const KB = (n) => `${(n / 1024).toFixed(0)} KB`;

async function existe(caminho) {
  try {
    return await stat(caminho);
  } catch {
    return null;
  }
}

async function descarregar(asset) {
  const destino = join(ORIGINAIS, asset.origem);
  const ja = await existe(destino);
  if (ja) return { caminho: destino, bytes: ja.size, novo: false };

  const url = `${BASE}/${asset.origem}`;
  const resposta = await fetch(url, { headers: { "user-agent": "jsk-site/1.0" } });
  if (!resposta.ok) throw new Error(`${resposta.status} em ${url}`);

  const dados = Buffer.from(await resposta.arrayBuffer());
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, dados);
  return { caminho: destino, bytes: dados.length, novo: true };
}

async function converter(asset, origem) {
  const destino = join(PUBLICO, asset.destino);
  await mkdir(dirname(destino), { recursive: true });

  if (asset.copiar) {
    await writeFile(destino, await readFile(origem));
    return (await stat(destino)).size;
  }

  await sharp(origem)
    .rotate() // respeita a orientação EXIF antes de a deitar fora
    .resize({
      width: asset.largura,
      height: asset.largura,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({
      quality: asset.qualidade ?? 82,
      effort: 6,
      alphaQuality: asset.alfa ? 100 : undefined,
    })
    .toFile(destino);

  return (await stat(destino)).size;
}

async function principal() {
  console.log(`A importar ${ASSETS.length} assets de ${BASE}\n`);

  let bytesOrigem = 0;
  let bytesDestino = 0;
  const problemas = [];

  for (const asset of ASSETS) {
    const nome = asset.origem.split("/").pop();
    if (RECUSADOS.includes(nome)) {
      problemas.push(`${nome} está na lista de recusados e não devia estar no manifesto`);
      continue;
    }

    try {
      const original = await descarregar(asset);
      const bytes = await converter(asset, original.caminho);

      bytesOrigem += original.bytes;
      bytesDestino += bytes;

      const poupanca = original.bytes > 0
        ? ` (−${Math.round((1 - bytes / original.bytes) * 100)}%)`
        : "";
      console.log(
        `  ${asset.destino.padEnd(34)} ${KB(bytes).padStart(8)}${poupanca.padEnd(8)} ${asset.nota}`,
      );

      if (bytes > 250 * 1024 && !asset.copiar) {
        problemas.push(`${asset.destino} tem ${KB(bytes)} — acima do tecto de 250 KB`);
      }
    } catch (erro) {
      problemas.push(`${asset.destino}: ${erro.message}`);
    }
  }

  console.log(
    `\n  originais  ${KB(bytesOrigem)}\n  public/    ${KB(bytesDestino)}  ` +
      `(−${Math.round((1 - bytesDestino / bytesOrigem) * 100)}%)`,
  );

  // O poster do vídeo evita que o bloco apareça preto até o primeiro quadro
  // chegar. Precisa do ffmpeg, que não é dependência do projecto.
  console.log(
    "\n  ⓘ O poster do vídeo dos screens gera-se com:\n" +
      "    ffmpeg -i public/screens/demo.mp4 -frames:v 1 -q:v 2 originais/poster.jpg\n" +
      "    npx sharp -i originais/poster.jpg -o public/screens/demo-poster.webp resize 1400",
  );

  if (problemas.length > 0) {
    console.error(`\n✗ ${problemas.length} problema(s):`);
    for (const p of problemas) console.error(`   ${p}`);
    process.exitCode = 1;
    return;
  }

  console.log("\n✓ tudo importado");
}

await principal();
