import { NextResponse } from "next/server";

import { esquemaContacto } from "@/lib/contacto";
import { entregar } from "@/lib/entrega";
import { site } from "@/lib/site";

/**
 * Recebe os pedidos de orçamento.
 *
 * As defesas estão por ordem do mais barato para o mais caro, de propósito: o
 * que se rejeita numa comparação de strings nunca chega a custar um `JSON.parse`
 * de meio megabyte. O formulário do site antigo não tem nenhuma — nem
 * reCAPTCHA, nem honeypot, nem limite de envios.
 */

/** 16 KB chega e sobra para cinco campos. */
const LIMITE_CORPO = 16 * 1024;

/** Por IP, numa janela deslizante. */
const JANELA_MS = 10 * 60 * 1000;
const MAXIMO_POR_JANELA = 5;

/**
 * A memória vive no processo. Numa função sem estado isso quer dizer que se
 * perde a cada arranque a frio e que não é partilhada entre instâncias — ou
 * seja, **não é uma defesa contra um ataque distribuído**. É o suficiente para
 * o que se vê num site destes: um robô a repetir o mesmo formulário. Se um dia
 * fizer falta a sério, é um KV e não este Map.
 */
const registos = new Map<string, number[]>();

function demasiadosPedidos(ip: string): boolean {
  const agora = Date.now();
  const recentes = (registos.get(ip) ?? []).filter((t) => agora - t < JANELA_MS);
  recentes.push(agora);
  registos.set(ip, recentes);

  // Sem isto o Map cresce para sempre num processo de vida longa.
  if (registos.size > 5000) {
    for (const [chave, marcas] of registos) {
      if (marcas.every((t) => agora - t >= JANELA_MS)) registos.delete(chave);
    }
  }

  return recentes.length > MAXIMO_POR_JANELA;
}

export async function POST(pedido: Request) {
  /* 1 — Origem. Um POST vindo de outro domínio não tem nada que fazer aqui.
     A CSP já declara `form-action 'self'`, mas isso é uma instrução ao
     browser, e quem ataca não usa browser. */
  const origem = pedido.headers.get("origin");
  if (origem && new URL(origem).host !== new URL(site.url).host) {
    const anfitriao = pedido.headers.get("host");
    if (!anfitriao || new URL(origem).host !== anfitriao) {
      return NextResponse.json({ erro: "origem-invalida" }, { status: 403 });
    }
  }

  /* 2 — Tamanho. Lido em bytes, sem acreditar no `content-length`: quem envia
     o corpo também escreve o cabeçalho. */
  const bruto = await pedido.text();
  if (bruto.length > LIMITE_CORPO) {
    return NextResponse.json({ erro: "corpo-grande" }, { status: 413 });
  }

  /* 3 — Ritmo. */
  const ip =
    pedido.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    pedido.headers.get("x-real-ip") ??
    "desconhecido";
  if (demasiadosPedidos(ip)) {
    return NextResponse.json({ erro: "demasiados-pedidos" }, { status: 429 });
  }

  /* 4 — JSON. */
  let corpo: unknown;
  try {
    corpo = JSON.parse(bruto);
  } catch {
    return NextResponse.json({ erro: "json-invalido" }, { status: 400 });
  }

  /* 5 — Armadilha. Responde 200 e não entrega nada. Um robô que receba um erro
     ajusta-se e volta; um que receba sucesso vai-se embora convencido. */
  if (
    typeof corpo === "object" &&
    corpo !== null &&
    "empresa" in corpo &&
    typeof corpo.empresa === "string" &&
    corpo.empresa.length > 0
  ) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  /* 6 — Conteúdo. */
  const validado = esquemaContacto.safeParse(corpo);
  if (!validado.success) {
    return NextResponse.json(
      {
        erro: "dados-invalidos",
        campos: validado.error.issues.map((i) => ({
          campo: i.path.join("."),
          mensagem: i.message,
        })),
      },
      { status: 400 },
    );
  }

  /* 7 — Entrega. */
  const resultado = await entregar(validado.data);
  if (!resultado.ok) {
    /* 503, não 500: o pedido está bem, o serviço é que não está a postos. E o
       corpo leva os contactos directos, para que o formulário possa dizer a
       quem escreveu por onde chegar à JSK — em vez de "algo correu mal". */
    return NextResponse.json(
      {
        erro: resultado.motivo,
        telefone: site.telefone,
        email: site.email,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
