import type { DadosContacto } from "@/lib/contacto";
import { site } from "@/lib/site";

/**
 * Para onde vai um pedido de orçamento.
 *
 * ⚠️ **Ainda não vai a lado nenhum, e é de propósito.**
 *
 * O fornecedor de email está por decidir. Enquanto a variável
 * `CONTACTO_PROVEDOR` estiver vazia, esta função devolve `nao-configurado`, a
 * rota responde 503 e o formulário diz ao visitante para telefonar ou escrever
 * directamente — mostrando o número e a morada, que funcionam.
 *
 * O modo de falha a evitar a todo o custo é o formulário dizer "enviado" e a
 * mensagem evaporar-se. Um pedido de orçamento perdido é um cliente perdido, e
 * ninguém dá por isso: nem quem escreveu, que ficou à espera, nem a JSK, que
 * nunca soube que alguém escreveu. É por isso que o caminho feliz é o único que
 * devolve `ok`.
 *
 * Para ligar, ver a secção "Ligar a entrega de email" do README.
 */
export type ResultadoEntrega =
  | { ok: true }
  | { ok: false; motivo: "nao-configurado" | "falhou" };

export async function entregar(dados: DadosContacto): Promise<ResultadoEntrega> {
  const provedor = process.env.CONTACTO_PROVEDOR?.trim();

  if (!provedor) {
    // Fica no registo do servidor. Se um dia alguém esquecer a variável em
    // produção, é aqui que se vê — e vê-se com o pedido inteiro, para que a
    // mensagem não se perca só porque a configuração faltava.
    console.error(
      "[contacto] CONTACTO_PROVEDOR não está definido. Pedido não entregue:",
      JSON.stringify({ ...dados, empresa: undefined }),
    );
    return { ok: false, motivo: "nao-configurado" };
  }

  console.error(`[contacto] fornecedor "${provedor}" ainda não está implementado.`);
  return { ok: false, motivo: "nao-configurado" };
}

/** A caixa que recebe os pedidos. */
export const destino = process.env.CONTACTO_DESTINO?.trim() || site.email;
