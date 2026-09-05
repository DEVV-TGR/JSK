#!/usr/bin/env node
/**
 * Copia o polyfill de scroll-driven animations para `public/`.
 *
 * O ficheiro em `public/polyfill/` **é versionado**, ao contrário do que se
 * faria com um artefacto de build normal. A razão é a mesma que o `.gitignore`
 * já dá para as fotografias: é o que o site serve, e um deploy não pode
 * depender de um passo de cópia ter corrido bem. Se este script falhasse em
 * silêncio na Vercel, o Safari perdia as animações e mais ninguém dava por
 * isso — que é exactamente o defeito que este polyfill existe para corrigir.
 *
 * Corre-se à mão, `npm run polyfill`, depois de actualizar a dependência. O
 * cabeçalho gravado no ficheiro regista a versão, para que se veja no `git
 * diff` quando muda.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const pacote = path.join(RAIZ, "node_modules/scroll-timeline-polyfill");
const destino = path.join(RAIZ, "public/polyfill/scroll-timeline.js");

const { version } = JSON.parse(
  await readFile(path.join(pacote, "package.json"), "utf8"),
);

const codigo = await readFile(path.join(pacote, "dist/scroll-timeline.js"), "utf8");

/* O `sourceMappingURL` aponta para um `.map` que não copiamos — sem isto, o
   browser pede um ficheiro que não existe e apanha um 404 em cada visita de
   Safari com as ferramentas de programador abertas. */
const semMapa = codigo.replace(/\n?\/\/# sourceMappingURL=.*$/m, "");

const cabecalho = [
  "/* scroll-timeline-polyfill " + version + " — flackr/scroll-timeline, Apache-2.0.",
  "   Cópia gerada por `npm run polyfill`. Não editar à mão. */",
  "",
].join("\n");

await mkdir(path.dirname(destino), { recursive: true });
await writeFile(destino, cabecalho + semMapa);

console.log(
  `✓ public/polyfill/scroll-timeline.js — versão ${version}, ${Math.round((cabecalho.length + semMapa.length) / 1024)} KB`,
);
