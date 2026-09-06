import { NextResponse } from "next/server";

import { esquemaPedido, errosPorCampo } from "@/lib/formulario";
import { site } from "@/lib/site";

/**
 * A entrega do pedido de orçamento.
 *
 * O `.env.example` prometia esta rota desde o início do projecto e ela nunca
 * tinha sido escrita. É esta.
 *
 * ## A regra que governa tudo o resto
 *
 * **Nunca fingir que enviou.** Se não há canal configurado, se a validação
 * falha, se o provedor devolve erro — o visitante fica a saber, com o número
 * de telefone à frente. Um formulário que diz "obrigado" e deita a mensagem
 * fora é pior do que um formulário que não existe: a pessoa fica à espera de
 * uma resposta que ninguém vai dar.
 *
 * ## Os três desfechos
 *
 * | Situação | Estado | O que o formulário mostra |
 * |---|---|---|
 * | `CONTACTO_PROVEDOR` vazio | 503 | "O envio automático ainda não está ligado" + telefone |
 * | Dados inválidos | 400 | O erro em cada campo |
 * | Provedor recusou | 502 | "Não foi possível enviar" + telefone |
 *
 * O 503 vem **antes** da validação, e é deliberado: sem canal de envio a
 * mensagem não segue por mais correcta que esteja, e mandar a pessoa corrigir
 * campos para depois lhe dizer que não dá era fazê-la trabalhar para nada.
 *
 * ## Porque não há aqui um `try` à volta de tudo
 *
 * Há, mas só à volta da chamada ao provedor. Um erro de programação nosso deve
 * rebentar e aparecer nos registos, não ser engolido e transformado num
 * "tente outra vez" que esconde o defeito.
 */

/** Nunca pré-renderizada: lê variáveis de ambiente e recebe `POST`. */
export const dynamic = "force-dynamic";

export async function POST(pedido: Request) {
  const provedor = process.env.CONTACTO_PROVEDOR?.trim();

  if (!provedor) {
    return NextResponse.json(
      { estado: "indisponivel" as const },
      { status: 503 },
    );
  }

  let corpo: unknown;

  try {
    corpo = await pedido.json();
  } catch {
    return NextResponse.json({ estado: "invalido" as const }, { status: 400 });
  }

  const validado = esquemaPedido.safeParse(corpo);

  if (!validado.success) {
    return NextResponse.json(
      { estado: "invalido" as const, erros: errosPorCampo(validado.error) },
      { status: 400 },
    );
  }

  const destino = process.env.CONTACTO_DESTINO?.trim() || site.email;

  try {
    if (provedor === "resend") {
      await entregarPorResend(validado.data, destino);
    } else if (provedor === "formspree") {
      await entregarPorFormspree(validado.data);
    } else {
      /* Um valor de `CONTACTO_PROVEDOR` que ninguém implementou é um erro de
         configuração, não do visitante. Responde como indisponível, que é o
         que de facto é, e deixa rasto nos registos. */
      console.error(`CONTACTO_PROVEDOR desconhecido: ${provedor}`);
      return NextResponse.json(
        { estado: "indisponivel" as const },
        { status: 503 },
      );
    }
  } catch (erro) {
    console.error("Falha a entregar o pedido de orçamento:", erro);
    return NextResponse.json({ estado: "erro" as const }, { status: 502 });
  }

  return NextResponse.json({ estado: "sucesso" as const });
}

/**
 * O corpo da mensagem, em texto simples.
 *
 * Sem HTML: quem a lê é a caixa de correio da empresa, e um email de texto
 * chega lá inteiro em qualquer cliente. O `Responder` do leitor vai direito a
 * quem escreveu, por causa do `reply_to`.
 */
function mensagem(dados: {
  nome: string;
  email: string;
  telefone: string;
  sectores: string[];
  mensagem: string;
}) {
  const sectores =
    dados.sectores.length > 0 ? dados.sectores.join(", ") : "(não indicou)";

  return [
    `Nome:      ${dados.nome}`,
    `Email:     ${dados.email}`,
    `Telemóvel: ${dados.telefone}`,
    `Sectores:  ${sectores}`,
    "",
    dados.mensagem,
  ].join("\n");
}

async function entregarPorResend(
  dados: Awaited<ReturnType<typeof esquemaPedido.parse>>,
  destino: string,
) {
  const chave = process.env.RESEND_API_KEY;
  if (!chave) throw new Error("RESEND_API_KEY em falta");

  const resposta = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${chave}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      /* O remetente tem de ser um domínio verificado na Resend. Não é o email
         de quem escreveu — um `From` forjado é o que faz a mensagem cair no
         spam. Quem escreveu vai no `reply_to`. */
      from: `Site JSK <site@${new URL(site.url).hostname}>`,
      to: [destino],
      reply_to: dados.email,
      subject: `Pedido de orçamento — ${dados.nome}`,
      text: mensagem(dados),
    }),
  });

  if (!resposta.ok) {
    throw new Error(`Resend respondeu ${resposta.status}`);
  }
}

async function entregarPorFormspree(
  dados: Awaited<ReturnType<typeof esquemaPedido.parse>>,
) {
  const id = process.env.FORMSPREE_ID;
  if (!id) throw new Error("FORMSPREE_ID em falta");

  const resposta = await fetch(`https://formspree.io/f/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      sectores: dados.sectores.join(", "),
      mensagem: dados.mensagem,
      _subject: `Pedido de orçamento — ${dados.nome}`,
    }),
  });

  if (!resposta.ok) {
    throw new Error(`Formspree respondeu ${resposta.status}`);
  }
}
