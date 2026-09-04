import { afterEach, describe, expect, it, vi } from "vitest";

/**
 * A resolução do endereço do site.
 *
 * Este ficheiro existe por causa de um defeito concreto. O `site.url` era
 * `process.env.NEXT_PUBLIC_SITE_URL ?? "https://jsk.pt"`, e o `??` só recua em
 * `null` e `undefined`. Na Vercel a variável existia **vazia**: a string vazia
 * passou pelo `??`, chegou ao `new URL("")` do `metadataBase` e rebentou a
 * build inteira com `ERR_INVALID_URL` e `input: ''`. Em desenvolvimento a
 * variável nem existe, o recuo funcionava, e por isso o defeito só apareceu no
 * primeiro deploy.
 *
 * O caso da string vazia é o que interessa aqui. Os outros estão à volta dele.
 */

/** O módulo lê o ambiente uma vez, por isso cada caso precisa de o recarregar. */
async function resolver(ambiente: Record<string, string | undefined>) {
  vi.resetModules();
  for (const [chave, valor] of Object.entries(ambiente)) {
    if (valor === undefined) vi.stubEnv(chave, "");
    else vi.stubEnv(chave, valor);
  }
  const modulo = await import("@/lib/site");
  return modulo.resolverUrl();
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe("o endereço do site", () => {
  it("uma variável VAZIA não passa — é o defeito que partiu o deploy", async () => {
    const url = await resolver({
      NEXT_PUBLIC_SITE_URL: "",
      NEXT_PUBLIC_VERCEL_URL: "",
      VERCEL_URL: "",
    });
    expect(url).toBe("https://jsk.pt");
    expect(() => new URL(url)).not.toThrow();
  });

  it("só espaços também não passa", async () => {
    const url = await resolver({
      NEXT_PUBLIC_SITE_URL: "   ",
      NEXT_PUBLIC_VERCEL_URL: "",
      VERCEL_URL: "",
    });
    expect(url).toBe("https://jsk.pt");
  });

  it("usa o valor quando ele existe mesmo", async () => {
    const url = await resolver({ NEXT_PUBLIC_SITE_URL: "https://jsk.pt" });
    expect(url).toBe("https://jsk.pt");
  });

  it("tira a barra final, senão o sitemap gera //alarmes/", async () => {
    const url = await resolver({ NEXT_PUBLIC_SITE_URL: "https://jsk.pt/" });
    expect(url).toBe("https://jsk.pt");
  });

  it("a Vercel dá o anfitrião sem esquema, e isso resolve-se", async () => {
    const url = await resolver({
      NEXT_PUBLIC_SITE_URL: "",
      NEXT_PUBLIC_VERCEL_URL: "jsk-git-fundacao.vercel.app",
      VERCEL_URL: "",
    });
    expect(url).toBe("https://jsk-git-fundacao.vercel.app");
  });

  it("uma pré-visualização não reclama o domínio a sério", async () => {
    // Senão seria a pré-visualização a competir com o site nos resultados.
    const url = await resolver({
      NEXT_PUBLIC_SITE_URL: "",
      NEXT_PUBLIC_VERCEL_URL: "jsk-abc123.vercel.app",
      VERCEL_URL: "",
    });
    expect(url).not.toContain("jsk.pt");
  });

  it("lixo rebenta com uma mensagem que diz onde ir mexer", async () => {
    await expect(resolver({ NEXT_PUBLIC_SITE_URL: "isto :: não é um url" })).rejects.toThrow(
      /NEXT_PUBLIC_SITE_URL/,
    );
  });
});

describe("o que o resto do site assume", () => {
  it("o site.url é sempre um URL válido e sem barra final", async () => {
    vi.resetModules();
    const { site } = await import("@/lib/site");
    expect(() => new URL(site.url)).not.toThrow();
    expect(site.url.endsWith("/")).toBe(false);
  });

  it("cada rota concatenada dá um URL com uma só barra", async () => {
    vi.resetModules();
    const { site, ROTAS_PUBLICAS } = await import("@/lib/site");
    for (const rota of ROTAS_PUBLICAS) {
      const url = `${site.url}${rota}`;
      expect(url).not.toMatch(/[^:]\/\//);
      expect(() => new URL(url)).not.toThrow();
    }
  });
});
