/**
 * A copy da `/contactos/`, transcrita do HTML de jsk.pt.
 *
 * Nada aqui foi reescrito. O que se acrescenta, e é preciso dizê-lo, são os
 * **rótulos do formulário**: o de jsk.pt não tem uma única `<label>` — os
 * campos identificam-se só por `placeholder`, que é o defeito #31 e desaparece
 * assim que a pessoa começa a escrever. Um rótulo não é copy do cliente; é a
 * peça que faltava para o campo ser utilizável.
 *
 * As quatro caixas de sector são as do site actual, com os mesmos valores.
 */

export const TITULO = "Fale Connosco";

export const ENTRADA =
  "Entre em contacto com a nossa equipa e descubra como podemos ajudá-lo.";

export const PEDIDO = {
  /* No site actual isto é um `heading` com `Peça aqui o seu…` por cima do
     `Orçamento Gratuito`. É um eyebrow, que a gramática deste site proíbe por
     omissão — mas aqui não é um rótulo inventado a decorar um título: é meia
     frase cujo fim é o título. Fica junto, e lê-se como uma frase só. */
  antes: "Peça aqui o seu",
  titulo: "Orçamento Gratuito",

  paragrafos: [
    "Peça já o seu orçamento ou esclareça as suas dúvidas. Estamos prontos para ajudar.",
    "Na JSK, valorizamos cada contacto. Seja para pedir um orçamento, agendar uma visita técnica ou simplesmente esclarecer uma dúvida, estamos disponíveis para o ajudar. Responderemos com a maior brevidade possível.",
  ],
} as const;

/**
 * Os rótulos do formulário.
 *
 * O `obrigatorio` não vira um asterisco no rótulo: o site actual põe `*` no
 * fim de cada `placeholder` e mais nada, o que obriga quem usa leitor de ecrã
 * a adivinhar. Aqui o campo leva `required` a sério e o rótulo diz `opcional`
 * quando **não** é obrigatório — é a forma que se lê em voz alta sem legenda.
 */
export const FORMULARIO = {
  titulo: "Peça um Orçamento Gratuito",

  campos: {
    nome: { rotulo: "Nome completo", ajuda: null },
    email: { rotulo: "Email", ajuda: null },
    telefone: { rotulo: "Telemóvel", ajuda: null },
    sectores: {
      rotulo: "Em que o podemos ajudar?",
      ajuda: "Escolha um ou mais. Opcional.",
    },
    mensagem: {
      rotulo: "Mensagem",
      ajuda: "Diga-nos o que precisa — quanto mais souber, melhor o orçamento.",
    },
  },

  /* Exigido pelo RGPD e ausente do formulário actual — defeito #23. O texto
     aponta para a política, que é onde as condições estão escritas. */
  consentimento:
    "Autorizo a JSK a usar estes dados para responder ao meu pedido.",

  enviar: "Enviar",
  aEnviar: "A enviar…",

  /* O que se diz em cada desfecho. Nenhum deles finge que a mensagem seguiu. */
  estados: {
    sucesso: {
      titulo: "Recebemos o seu pedido.",
      texto: "Respondemos com a maior brevidade possível.",
    },
    invalido: {
      titulo: "Falta alguma coisa.",
      texto: "Veja os campos assinalados e tente outra vez.",
    },
    /* O caso em que ainda não há canal de envio configurado. Ver o
       `.env.example` e `app/api/contacto/route.ts`. */
    indisponivel: {
      titulo: "O envio automático ainda não está ligado.",
      texto:
        "A sua mensagem não foi enviada. Ligue-nos ou escreva-nos directamente — respondemos na mesma.",
    },
    erro: {
      titulo: "Não foi possível enviar.",
      texto:
        "A sua mensagem não seguiu. Tente outra vez daqui a pouco, ou ligue-nos directamente.",
    },
  },
} as const;

/**
 * Os três canais directos.
 *
 * A morada abre o Google Maps **num separador**, e não um mapa embebido: um
 * `iframe` do Google põe cookies de terceiros e obriga o site inteiro a ter
 * banner de consentimento, o que contraria a decisão 7 do
 * `docs/decisoes-pendentes.md`. Decidido com o Gonçalo a 6 de Setembro de 2026.
 *
 * Os rótulos são os do site actual — `Endereço`, `Telemóvel`, `Email` — com o
 * `Telemóvel` a mostrar agora o número certo, que é o `929 153 103`
 * confirmado na mesma conversa.
 */
export const CANAIS = {
  titulo: "Onde nos encontra",
  morada: "Endereço",
  telefone: "Telemóvel",
  email: "Email",
} as const;
