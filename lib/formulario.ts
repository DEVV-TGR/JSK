import { z } from "zod";

import { SECTORES } from "@/lib/conteudo/comum";

/**
 * O esquema do pedido de orçamento.
 *
 * **Vive aqui, sozinho, porque é usado nos dois lados**: o componente valida
 * antes de enviar, para a pessoa ver o erro sem esperar pela rede, e a rota
 * valida outra vez, porque validação de cliente não é validação — qualquer um
 * pode fazer o `POST` à mão. Um esquema partilhado é o que garante que as duas
 * respostas nunca divergem.
 *
 * O `zod` estava no `package.json` desde o início do projecto e nunca tinha
 * sido importado. Era para isto.
 */

/* `readonly string[]` e não a união literal que o `as const` do `SECTORES`
   produz: o que entra pelo `POST` é uma string qualquer, e é precisamente isso
   que se quer comparar. */
const SECTORES_VALIDOS: readonly string[] = SECTORES.map(
  (sector) => sector.nome,
);

export const esquemaPedido = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Diga-nos como se chama.")
    .max(120, "Nome demasiado longo."),

  email: z.email("Este email não parece estar certo.").max(200),

  /**
   * Telefone permissivo de propósito.
   *
   * Um número português tem nove dígitos, mas há quem escreva com indicativo,
   * com espaços, com pontos ou com `+351`. Exigir um formato é rejeitar
   * pedidos de gente que os escreveu bem à maneira dela. Conta-se os dígitos e
   * mais nada: nove é o mínimo, e o `+` de indicativo é permitido.
   */
  telefone: z
    .string()
    .trim()
    .min(9, "Faltam dígitos neste número.")
    .max(40)
    .refine(
      (valor) => (valor.match(/\d/g) ?? []).length >= 9,
      "Faltam dígitos neste número.",
    ),

  /** As quatro caixas do site actual, com os mesmos valores. Opcional. */
  sectores: z
    .array(z.string())
    .default([])
    .refine(
      (lista) => lista.every((item) => SECTORES_VALIDOS.includes(item)),
      "Sector desconhecido.",
    ),

  mensagem: z
    .string()
    .trim()
    .min(10, "Escreva um pouco mais, para o orçamento sair certo.")
    .max(4000, "Mensagem demasiado longa."),

  /* Obrigatório, e é o consentimento do RGPD que o formulário actual não tem —
     defeito #23. `literal(true)` e não `boolean`: uma caixa por marcar tem de
     falhar, não de passar como `false`. */
  consentimento: z.literal(true, {
    error: "Precisamos da sua autorização para lhe responder.",
  }),

  /**
   * O engodo, contra spam automático — defeito #37.
   *
   * Um campo escondido de quem vê e de quem ouve, que um robô preenche e uma
   * pessoa não. Vale menos do que um captcha e custa infinitamente menos: sem
   * pedidos a terceiros, sem cookies, sem pôr ninguém a identificar
   * semáforos. É a única protecção compatível com um site sem cookies.
   */
  empresa: z
    .string()
    .max(0, "Pedido rejeitado.")
    .optional()
    .transform(() => undefined),
});

export type Pedido = z.infer<typeof esquemaPedido>;

/**
 * Os erros por campo, na forma que o componente usa.
 *
 * O `flatten` do zod devolve arrays; aqui fica só a primeira mensagem de cada
 * campo, que é a única que o formulário mostra.
 */
export type ErrosPorCampo = Partial<Record<keyof Pedido, string>>;

export function errosPorCampo(erro: z.ZodError<Pedido>): ErrosPorCampo {
  const saida: ErrosPorCampo = {};

  for (const problema of erro.issues) {
    const campo = problema.path[0];
    if (typeof campo === "string" && !(campo in saida)) {
      saida[campo as keyof Pedido] = problema.message;
    }
  }

  return saida;
}
