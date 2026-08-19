import { beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/contacto/route";
import { esquemaContacto } from "@/lib/contacto";

/**
 * A escada de defesas da rota de contacto, degrau a degrau.
 *
 * O que estes testes protegem não é a rota — é a promessa que o formulário faz
 * a quem escreve. O pior resultado possível é o botão dizer "enviado" e a
 * mensagem evaporar-se: quem escreveu fica à espera e a JSK nunca soube que
 * alguém escreveu. Por isso o caminho feliz, hoje, tem de devolver 503.
 */

const VALIDO = {
  nome: "Maria Silva",
  email: "maria@exemplo.pt",
  telefone: "912 345 678",
  servicos: ["JSK Alarmes"],
  mensagem: "Gostaria de um orçamento para alarme numa moradia em Vila do Conde.",
  consentimento: true,
  empresa: "",
};

/** Cada teste parte de um IP diferente, senão o limite de ritmo contamina-os. */
let contador = 0;
function pedido(corpo: unknown, extra: Record<string, string> = {}) {
  contador += 1;
  return new Request("https://jsk.pt/api/contacto", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-forwarded-for": `10.0.0.${contador}`,
      ...extra,
    },
    body: typeof corpo === "string" ? corpo : JSON.stringify(corpo),
  });
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

describe("as regras, partilhadas com o browser", () => {
  it("aceita um pedido bem preenchido", () => {
    expect(esquemaContacto.safeParse(VALIDO).success).toBe(true);
  });

  it("os serviços são opcionais", () => {
    expect(esquemaContacto.safeParse({ ...VALIDO, servicos: [] }).success).toBe(true);
  });

  it("exige o consentimento", () => {
    const r = esquemaContacto.safeParse({ ...VALIDO, consentimento: false });
    expect(r.success).toBe(false);
  });

  it("aceita um telefone como as pessoas o escrevem", () => {
    for (const t of ["912345678", "912 345 678", "+351 912 345 678", "(351) 912-345-678"]) {
      expect(esquemaContacto.safeParse({ ...VALIDO, telefone: t }).success).toBe(true);
    }
  });

  it("recusa um email malformado", () => {
    expect(esquemaContacto.safeParse({ ...VALIDO, email: "maria@" }).success).toBe(false);
  });
});

describe("a rota", () => {
  it("o caminho feliz devolve 503 enquanto a entrega não estiver ligada", async () => {
    const r = await POST(pedido(VALIDO));
    expect(r.status).toBe(503);
    const corpo = await r.json();
    expect(corpo.erro).toBe("nao-configurado");
    // Tem de dizer a quem escreveu por onde chegar à JSK.
    expect(corpo.telefone).toBeTruthy();
    expect(corpo.email).toBeTruthy();
  });

  it("nunca devolve ok enquanto não houver fornecedor", async () => {
    const r = await POST(pedido(VALIDO));
    await expect(r.json()).resolves.not.toHaveProperty("ok", true);
  });

  it("a armadilha responde 200 e não entrega nada", async () => {
    const r = await POST(pedido({ ...VALIDO, empresa: "Robô, Lda." }));
    expect(r.status).toBe(200);
    expect(await r.json()).toEqual({ ok: true });
  });

  it("um corpo enorme é recusado sem se tentar interpretar", async () => {
    const r = await POST(pedido(JSON.stringify({ mensagem: "x".repeat(50_000) })));
    expect(r.status).toBe(413);
  });

  it("JSON ilegível devolve 400", async () => {
    const r = await POST(pedido("{ isto não é json"));
    expect(r.status).toBe(400);
  });

  it("campos inválidos devolvem 400 e dizem quais", async () => {
    const r = await POST(pedido({ ...VALIDO, email: "maria@", mensagem: "curta" }));
    expect(r.status).toBe(400);
    const corpo = await r.json();
    expect(corpo.erro).toBe("dados-invalidos");
    expect(corpo.campos.map((c: { campo: string }) => c.campo)).toEqual(
      expect.arrayContaining(["email", "mensagem"]),
    );
  });

  it("uma origem de outro domínio é recusada", async () => {
    const r = await POST(pedido(VALIDO, { origin: "https://outro-sitio.example" }));
    expect(r.status).toBe(403);
  });

  it("o sexto pedido do mesmo IP em dez minutos é travado", async () => {
    const ip = "10.9.9.9";
    const fazer = () =>
      POST(
        new Request("https://jsk.pt/api/contacto", {
          method: "POST",
          headers: { "content-type": "application/json", "x-forwarded-for": ip },
          body: JSON.stringify(VALIDO),
        }),
      );

    for (let i = 0; i < 5; i += 1) {
      expect((await fazer()).status).not.toBe(429);
    }
    expect((await fazer()).status).toBe(429);
  });
});

describe("o endereço para onde o formulário envia", () => {
  it("tem barra final, senão apanha um 308 em cada envio", async () => {
    const { ROTA_CONTACTO } = await import("@/lib/contacto");
    expect(ROTA_CONTACTO).toBe("/api/contacto/");
    expect(ROTA_CONTACTO.endsWith("/")).toBe(true);
  });

  it("o formulário usa a constante e não um literal", async () => {
    const { readFileSync } = await import("node:fs");
    const { join } = await import("node:path");
    const origem = readFileSync(
      join(import.meta.dirname, "..", "components", "seccoes", "FormularioContacto.tsx"),
      "utf8",
    );
    expect(origem).toContain("fetch(ROTA_CONTACTO");
    expect(origem).not.toMatch(/fetch\(["']\/api/);
  });
});
