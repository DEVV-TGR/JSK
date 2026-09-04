import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { GALERIA_ALARMES, GALERIA_OBRAS } from "@/lib/conteudo/galerias";
import { TERMOS_E_CONDICOES, POLITICA_DE_PRIVACIDADE } from "@/lib/conteudo/legal";
import { NUMEROS } from "@/lib/conteudo/numeros";
import { EXCELENCIA, HEROI_CONTACTOS, HEROI_INICIO, HEROI_SOBRE, HEROIS_SECTOR } from "@/lib/conteudo/paginas";
import { NAVEGACAO, SECTORES } from "@/lib/conteudo/sectores";
import { ROTAS_PUBLICAS } from "@/lib/site";

const RAIZ = join(import.meta.dirname, "..");
const PUBLICO = join(RAIZ, "public");
const CONTEUDO = join(RAIZ, "lib", "conteudo");

/** Todos os caminhos de imagem referidos pelo conteúdo. */
const IMAGENS = [
  ...SECTORES.flatMap((s) => [s.capa, s.heroi]),
  ...Object.values(HEROIS_SECTOR).map((h) => h.imagem),
  HEROI_INICIO.imagem,
  HEROI_SOBRE.imagem,
  HEROI_CONTACTOS.imagem,
  EXCELENCIA.imagem,
  ...GALERIA_ALARMES.projetos.map((p) => p.imagem),
  ...GALERIA_OBRAS.projetos.map((p) => p.imagem),
];

describe("as imagens que o conteúdo pede existem", () => {
  it.each([...new Set(IMAGENS)])("%s", (caminho) => {
    expect(existsSync(join(PUBLICO, caminho))).toBe(true);
  });
});

describe("caracteres invisíveis", () => {
  /**
   * O site antigo tem espaços de largura zero (U+200B) a meio de três frases:
   * "Tudo Num Só Lugar", "Videovigilância" e "Acesso Remoto em Tempo Real".
   * Não se vêem, sobrevivem a um copy-paste e partem qualquer pesquisa por
   * essas palavras — incluindo a do próprio site e a da Google.
   */
  const PROIBIDOS = /[​‌‍﻿­]/;

  const ficheiros = readdirSync(CONTEUDO).filter((f) => f.endsWith(".ts"));

  it.each(ficheiros)("%s não tem nenhum", (ficheiro) => {
    const texto = readFileSync(join(CONTEUDO, ficheiro), "utf8");
    const linha = texto
      .split("\n")
      .findIndex((l) => PROIBIDOS.test(l));
    expect(linha, `linha ${linha + 1}`).toBe(-1);
  });
});

describe("marcadores por preencher", () => {
  it("o texto legal não tem nenhum", () => {
    const tudo = [TERMOS_E_CONDICOES, POLITICA_DE_PRIVACIDADE]
      .flatMap((p) => [p.abertura, ...p.seccoes.flatMap((s) => [...s.paragrafos, ...(s.lista ?? [])])])
      .join(" ");
    // O original acaba a §5 da política em "através de [email de contacto]".
    expect(tudo).not.toMatch(/\[[^\]]*\]/);
    expect(tudo).not.toMatch(/lorem ipsum/i);
  });
});

describe("navegação e rotas", () => {
  it("cada item da navegação aponta para uma rota que existe", () => {
    for (const item of NAVEGACAO) {
      expect(ROTAS_PUBLICAS).toContain(item.rota);
    }
  });

  it("os quatro sectores estão nas rotas públicas", () => {
    for (const s of SECTORES) {
      expect(ROTAS_PUBLICAS).toContain(s.rota);
    }
  });

  it("a navegação e os cartões estão pela mesma ordem", () => {
    // No site antigo a navegação vai Alarmes → Obras → Web → Screens e os
    // cartões vão Alarmes → Obras → Screens → Web. Saem os dois do mesmo array,
    // por isso isto é verdade por construção — o teste está aqui para o caso de
    // alguém voltar a separá-los.
    const naNav = NAVEGACAO.filter((i) => SECTORES.some((s) => s.rota === i.rota));
    expect(naNav.map((i) => i.rota)).toEqual(SECTORES.map((s) => s.rota));
  });
});

describe("conteúdo do cliente", () => {
  it("os números dos contadores são inteiros positivos", () => {
    for (const n of NUMEROS) {
      expect(Number.isInteger(n.valor)).toBe(true);
      expect(n.valor).toBeGreaterThan(0);
    }
  });

  it("todas as fotografias têm alt escrito à mão", () => {
    const projetos = [...GALERIA_ALARMES.projetos, ...GALERIA_OBRAS.projetos];
    for (const p of projetos) {
      expect(p.alt.length).toBeGreaterThan(15);
      // O WordPress gera o alt a partir do nome do ficheiro — "camera preta",
      // "akarme de incendio". Nenhum alt nosso deve parecer-se com o caminho.
      const raiz = p.imagem.split("/").pop()!.replace(/\.\w+$/, "");
      expect(p.alt.toLowerCase()).not.toContain(raiz.toLowerCase());
    }
  });
});
