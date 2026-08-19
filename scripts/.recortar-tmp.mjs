import sharp from "sharp";
const [entrada, saida, topo, altura] = process.argv.slice(2);
const meta = await sharp(entrada).metadata();
const t = Math.min(Number(topo), meta.height - 1);
const h = Math.min(Number(altura), meta.height - t);
await sharp(entrada).extract({ left: 0, top: t, width: meta.width, height: h }).toFile(saida);
console.log(`${meta.width}x${meta.height} → recorte ${t}..${t + h}`);
