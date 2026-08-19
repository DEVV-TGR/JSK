/**
 * Testemunhos de clientes.
 *
 * ⚠️ **Está vazio de propósito, e o site trata isso como "não mostrar a
 * secção".**
 *
 * O site antigo tem quatro testemunhos, em `/`, `/alarmes/` e `/obras/`. São
 * todos **Lorem Ipsum**, assinados por personas de stock — John Allison, CEO
 * of Manufacture Company; Alicia Potter, Graphic Designer; Edward B. Suarez,
 * Song Writer; Anna Patricia, Manager of Finance Consultant — com fotografias
 * que vêm do template "Roofing" da Astra, carregadas em 2020. O cabeçalho da
 * secção está em inglês e com um erro de gramática: "Here's What Our Client
 * Say About Us".
 *
 * Um testemunho é uma afirmação sobre uma pessoa real que disse uma coisa
 * real. Não se inventa, não se traduz do latim de encher e não se recicla de
 * um template. Enquanto não houver testemunhos verdadeiros, a secção não
 * aparece — ver docs/decisoes-pendentes.md #1.
 */
export type Testemunho = {
  texto: string;
  autor: string;
  papel: string;
  foto: string | null;
  destaque?: boolean;
};

export const TESTEMUNHOS: readonly Testemunho[] = [];
