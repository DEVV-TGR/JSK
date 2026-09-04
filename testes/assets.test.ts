import { existsSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * O que está em `public/` e o que não pode lá estar.
 *
 * A parte que interessa é a segunda. As fotografias de stock do template
 * "Roofing" da Astra andam no site antigo a fazer de clientes da JSK desde
 * 2020, e são o tipo de coisa que volta a entrar quando alguém copia uma pasta
 * inteira sem olhar.
 */

const PUBLICO = join(import.meta.dirname, "..", "public");

/** Todos os ficheiros de public/, recursivamente. */
function ficheiros(pasta: string, prefixo = ""): string[] {
  if (!existsSync(pasta)) return [];
  return readdirSync(pasta, { withFileTypes: true }).flatMap((entrada) => {
    const caminho = join(pasta, entrada.name);
    const relativo = prefixo ? `${prefixo}/${entrada.name}` : entrada.name;
    return entrada.isDirectory() ? ficheiros(caminho, relativo) : [relativo];
  });
}

const TUDO = ficheiros(PUBLICO);
const IMAGENS = TUDO.filter((f) => /\.(webp|png|jpe?g|avif)$/i.test(f));

describe("proveniência", () => {
  it("nenhum ficheiro do template Roofing da Astra", () => {
    const intrusos = TUDO.filter((f) => /roofing/i.test(f));
    expect(intrusos).toEqual([]);
  });

  it("nenhum nome vindo do Facebook", () => {
    // Os originais chamam-se `479443651_9414483188616414_675...n.jpg`. Um
    // caminho de ficheiro aparece no HTML e nos registos do servidor — é
    // conteúdo do site tanto como o texto.
    const intrusos = TUDO.filter((f) => /^\d{9,}_\d{9,}/.test(f.split("/").pop() ?? ""));
    expect(intrusos).toEqual([]);
  });

  it("as imagens estão todas em WebP", () => {
    const errado = IMAGENS.filter((f) => !f.endsWith(".webp"));
    expect(errado).toEqual([]);
  });
});

describe("peso", () => {
  it("nenhuma imagem acima de 250 KB", () => {
    const pesadas = IMAGENS.map((f) => [f, statSync(join(PUBLICO, f)).size] as const)
      .filter(([, bytes]) => bytes > 250 * 1024)
      .map(([f, bytes]) => `${f} — ${Math.round(bytes / 1024)} KB`);
    expect(pesadas).toEqual([]);
  });

  it("as imagens todas juntas ficam abaixo de 2,5 MB", () => {
    const total = IMAGENS.reduce((soma, f) => soma + statSync(join(PUBLICO, f)).size, 0);
    expect(total).toBeLessThan(2.5 * 1024 * 1024);
  });
});

describe("o que o site precisa", () => {
  it("as imagens do manifesto existem", () => {
    const esperadas = [
      "marca/logo.webp",
      "heroi/institucional.webp",
      "heroi/alarmes.webp",
      "heroi/obras.webp",
      "heroi/screens.webp",
      "heroi/web.webp",
      "sectores/obras.webp",
      "sectores/web.webp",
      "sobre/excelencia.webp",
      "screens/ecra.webp",
      "screens/demo.mp4",
    ];
    const emFalta = esperadas.filter((f) => !existsSync(join(PUBLICO, f)));
    expect(emFalta).toEqual([]);
  });

  it("a galeria de alarmes tem seis e a de obras quatro", () => {
    expect(TUDO.filter((f) => f.startsWith("alarmes/"))).toHaveLength(6);
    expect(TUDO.filter((f) => f.startsWith("obras/"))).toHaveLength(4);
  });
});
