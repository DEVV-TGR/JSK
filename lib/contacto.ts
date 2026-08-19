import { z } from "zod";

import { SECTORES } from "@/lib/conteudo/sectores";

/**
 * As regras do formulário de orçamento, num sítio só.
 *
 * São usadas **duas vezes**: no browser, para responder de imediato a quem
 * escreve, e no servidor, porque um POST não tem de passar pelo formulário. A
 * validação do lado do cliente é uma cortesia; a do servidor é a que conta.
 *
 * Os campos são os mesmos do Contact Form 7 que o site antigo usa (`your-name`,
 * `your-email`, `tel-number`, `your-services[]`, `your-message`), com nomes em
 * português — e mais um que ele não tem: o consentimento.
 */

/**
 * O endereço para onde o formulário envia.
 *
 * ⚠️ **A barra final não é cosmética.** O `trailingSlash: true` do
 * `next.config.ts` aplica-se também às rotas de API: um `POST /api/contacto`
 * apanha um 308 para `/api/contacto/` antes de chegar ao servidor. Um browser
 * segue esse redireccionamento e preserva o método e o corpo — um 308 é
 * precisamente isso —, mas paga um salto de rede em cada envio, e há clientes
 * e proxies que não o seguem. Com a barra, não há salto nenhum.
 */
export const ROTA_CONTACTO = "/api/contacto/";

/** Os limites existem para o servidor, não para o desenho. */
export const LIMITES = {
  nome: 100,
  email: 200,
  telefone: 30,
  mensagem: 2000,
} as const;

export const SERVICOS_DISPONIVEIS = SECTORES.map((s) => s.nome);

export const esquemaContacto = z.object({
  nome: z
    .string()
    .trim()
    .min(2, "Escreva o seu nome.")
    .max(LIMITES.nome, "O nome é demasiado longo."),

  email: z
    .string()
    .trim()
    .max(LIMITES.email, "O email é demasiado longo.")
    .pipe(z.email("Escreva um endereço de email válido.")),

  telefone: z
    .string()
    .trim()
    .min(9, "Escreva um número de telefone com pelo menos 9 dígitos.")
    .max(LIMITES.telefone, "O número é demasiado longo.")
    // Espaços, traços, barras e parênteses são como as pessoas escrevem um
    // número de telefone. Recusá-los é fazer o visitante adivinhar o formato.
    .regex(/^[\d\s+()./-]+$/, "O número só pode ter dígitos e espaços."),

  servicos: z.array(z.enum(SERVICOS_DISPONIVEIS as [string, ...string[]])).default([]),

  mensagem: z
    .string()
    .trim()
    .min(10, "Diga-nos um pouco mais sobre o que precisa.")
    .max(LIMITES.mensagem, "A mensagem é demasiado longa."),

  consentimento: z.literal(true, {
    error: "É preciso concordar com a política de privacidade.",
  }),

  /**
   * Armadilha para robôs: um campo escondido que uma pessoa nunca vê e um
   * preenchedor automático preenche sempre. Chama-se "empresa" e não
   * "honeypot" porque o nome vai no HTML.
   */
  empresa: z.string().max(0).optional().or(z.literal("")),
});

export type DadosContacto = z.infer<typeof esquemaContacto>;

export const TEXTO_CONSENTIMENTO =
  "Autorizo o tratamento dos meus dados para efeitos de resposta a este pedido, nos termos da Política de Privacidade.";
