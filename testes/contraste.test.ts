import { readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

/**
 * O contraste da paleta, medido sobre os valores que estão mesmo no
 * `globals.css` — não sobre uma cópia escrita à mão neste ficheiro, que
 * divergiria na primeira vez que alguém afinasse um tom.
 *
 * Metade destas asserções verifica que combinações **reprovam**. Não é
 * curiosidade: é o que impede que o defeito do site antigo volte a entrar. Lá,
 * todos os botões são texto `#F3F3F3` sobre o amarelo da marca — 1,33:1, que
 * não se lê ao sol e mal se lê à sombra. A tentação de repetir isso é enorme,
 * porque um botão amarelo com texto branco parece bem numa captura de ecrã.
 */

const css = readFileSync(join(import.meta.dirname, "..", "app", "globals.css"), "utf8");

/** Lê um token de cor do globals.css. Falha alto se ele desaparecer. */
function token(nome: string): string {
  const achado = css.match(new RegExp(`--color-${nome}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!achado) throw new Error(`token --color-${nome} não existe em globals.css`);
  return achado[1];
}

/** Luminância relativa, WCAG 2.1 §relative luminance. */
function luminancia(hex: string): number {
  const n = hex.replace("#", "");
  const par = n.length === 3 ? n.split("").map((c) => c + c) : n.match(/../g)!;
  const [r, g, b] = par.slice(0, 3).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contraste(a: string, b: string): number {
  const [claro, escuro] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
  return (claro + 0.05) / (escuro + 0.05);
}

const AMARELO = token("amarelo");
const OCRE = token("ocre");
const TINTA = token("tinta");
const TINTA_SUAVE = token("tinta-suave");
const CARVAO = token("carvao");
const PAPEL = token("papel");
const PAPEL_FUNDO = token("papel-fundo");
const LINHA_FORTE = token("linha-forte");
const PERIGO = token("perigo");

describe("o que tem de passar", () => {
  it("texto normal sobre papel — 4,5:1", () => {
    expect(contraste(TINTA, PAPEL)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(TINTA_SUAVE, PAPEL)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(TINTA, PAPEL_FUNDO)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(TINTA_SUAVE, PAPEL_FUNDO)).toBeGreaterThanOrEqual(4.5);
  });

  it("o botão amarelo — tinta preta, não branca", () => {
    expect(contraste(TINTA, AMARELO)).toBeGreaterThanOrEqual(7);
  });

  it("o ocre é o amarelo que se lê sobre papel", () => {
    expect(contraste(OCRE, PAPEL)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(OCRE, PAPEL_FUNDO)).toBeGreaterThanOrEqual(4.5);
  });

  it("o amarelo lê-se sobre a superfície escura", () => {
    expect(contraste(AMARELO, CARVAO)).toBeGreaterThanOrEqual(4.5);
    expect(contraste(PAPEL, CARVAO)).toBeGreaterThanOrEqual(4.5);
  });

  it("o contorno de um campo — 3:1, WCAG 1.4.11", () => {
    expect(contraste(LINHA_FORTE, PAPEL)).toBeGreaterThanOrEqual(3);
  });

  it("o erro de formulário lê-se", () => {
    expect(contraste(PERIGO, PAPEL)).toBeGreaterThanOrEqual(4.5);
  });

  it("o anel de foco destaca-se do que está por baixo", () => {
    // Um anel de foco tem de se ver contra a página e contra o próprio botão.
    expect(contraste(OCRE, PAPEL)).toBeGreaterThanOrEqual(3);
    expect(contraste(OCRE, AMARELO)).toBeGreaterThanOrEqual(3);
  });
});

describe("o que tem de reprovar — e por isso não se usa", () => {
  it("branco sobre amarelo", () => {
    expect(contraste(PAPEL, AMARELO)).toBeLessThan(3);
  });

  it("o #F3F3F3 sobre amarelo — o que o site antigo faz em todos os botões", () => {
    expect(contraste("#f3f3f3", AMARELO)).toBeLessThan(3);
  });

  it("amarelo como texto sobre papel", () => {
    expect(contraste(AMARELO, PAPEL)).toBeLessThan(3);
  });
});

describe("o token que assenta sobre o amarelo", () => {
  it("é a tinta, e o globals.css di-lo por escrito", () => {
    // Se alguém mudar `--color-amarelo-tinta` para branco, isto parte — que é
    // exactamente o objectivo.
    expect(css).toMatch(/--color-amarelo-tinta:\s*var\(--color-tinta\)/);
  });
});
