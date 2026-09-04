import type { NomeIcone } from "@/components/ui/Icone";

/**
 * A copy da homepage, transcrita de jsk.pt.
 *
 * Nada aqui foi reescrito. O que mudou, e só isto:
 *
 * - saíram os espaços de largura zero (U+200B) que o WordPress deixou em
 *   `Tudo Num Só Lugar​` — defeito #11;
 * - a hierarquia de títulos foi arrumada (ver `TITULO` mais abaixo);
 * - a maiusculação a meio das frases é a do texto, não a do CSS: o tema antigo
 *   tinha `text-transform: capitalize` em todos os títulos, e era isso que
 *   escrevia `Tudo Num Só Lugar` e `Sobre a Jsk`. Palavras iguais, caixa
 *   diferente.
 */

/**
 * O título da página.
 *
 * O site antigo tem como H1 a saudação `Bem-Vindo à JSK`, com um H6 por cima —
 * defeito #19. Uma saudação não diz a ninguém o que a empresa faz, e é a
 * primeira linha que a pesquisa mostra.
 *
 * A frase que faz esse trabalho já existe no site: é o título da secção
 * seguinte. Sobe a H1 e a saudação desce para a secção de apresentação, onde
 * uma saudação faz sentido. Nenhuma palavra foi inventada nem apagada — é
 * ordem, que é marcação, não texto.
 */
export const TITULO = "Segurança, construção e impacto. Tudo num só lugar.";

export const HEROI = {
  entrada:
    "Na JSK, combinamos experiência técnica com criatividade para oferecer soluções completas em segurança, construção e comunicação visual. Garantimos projetos eficientes, modernos e à medida das suas necessidades.",
  primaria: { texto: "Peça um Orçamento Gratuito", href: "/contactos/" },
  secundaria: { texto: "Quem Somos", href: "/sobre-nos/" },
} as const;

export const APRESENTACAO = {
  titulo: "Bem-vindo à JSK",
  paragrafos: [
    "Bem-vindo ao site da JSK! Somos uma marca que oferece serviços de qualidade em sistemas de alarme e segurança, remodelações, e instalação de screens LED. O nosso compromisso é com a excelência, proporcionando soluções à medida, que combinam inovação, confiança e atenção ao detalhe.",
    "Descubra como os nossos serviços podem elevar os seus projectos, garantindo segurança e um impacto visual que se destaca. Vamos trabalhar juntos!",
  ],
} as const;

/**
 * Os quatro cartões de sector.
 *
 * O `Saiba Mais` da JSK Obras apontava para `#` no site antigo — um link que
 * não vai a lado nenhum, na homepage, no cartão de um dos negócios da empresa.
 * Defeito #2.
 */
export const CARTOES = [
  {
    nome: "JSK Alarmes",
    href: "/alarmes/",
    icone: "alarme",
    texto:
      "Garantimos a sua segurança e tranquilidade com tecnologia de ponta e soluções personalizadas para proteger o que mais importa",
  },
  {
    nome: "JSK Obras",
    href: "/obras/",
    icone: "obra",
    texto:
      "Damos uma nova vida aos espaços através de remodelações de alta qualidade, com inovação, bom gosto e atenção a cada detalhe",
  },
  {
    nome: "JSK Screens",
    href: "/screens-led/",
    icone: "ecra",
    texto:
      "Garantimos que a sua mensagem chegue mais longe com screens LED modernos, para um impacto e visibilidade únicos",
  },
  {
    /**
     * ⚠️ O texto original credita a XquisiteVision, mas a página `/web/`
     * credita a DevPlus. É a mesma empresa em dois sítios do mesmo site.
     * A frase fica **exactamente como está no site actual** até alguém dizer
     * qual é a certa — ver `docs/decisoes-pendentes.md`, ponto 2.
     */
    nome: "JSK Web",
    href: "/web/",
    icone: "web",
    texto:
      "Websites modernos e funcionais, desenvolvidos pela XquisiteVision e promovidos pela JSK, para garantir a sua marca com impacto online.",
  },
] as const satisfies readonly {
  nome: string;
  href: string;
  icone: NomeIcone;
  texto: string;
}[];

export const DIFERENCIAIS = {
  titulo: "O que nos torna únicos?",
  itens: [
    {
      icone: "escudo",
      titulo: "Equipa Certificada",
      texto:
        "A nossa equipa é experiente, certificada e está em constante formação.",
    },
    {
      icone: "relogio",
      titulo: "Resposta Imediata",
      texto:
        "Priorizamos a rapidez no contacto, orçamento e execução, porque sabemos que o seu tempo é valioso.",
    },
    {
      icone: "telefone",
      titulo: "Atendimento Direto",
      texto:
        "Soluções ajustadas às suas necessidades, com apoio próximo e profissional.",
    },
    {
      icone: "obra",
      titulo: "Serviços Integrados",
      texto:
        "Alarmes, obras e publicidade digital com soluções integradas num só parceiro.",
    },
    {
      icone: "camara",
      titulo: "Alta Tecnologia",
      texto:
        "Usamos equipamentos modernos e fiáveis para garantir qualidade e eficiência.",
    },
    {
      icone: "certo",
      titulo: "Foco na Qualidade",
      texto:
        "Rigor em todo o processo — do planeamento à execução final — para garantir a sua total satisfação.",
    },
  ],
} as const satisfies {
  titulo: string;
  itens: readonly { icone: NomeIcone; titulo: string; texto: string }[];
};

/**
 * Os contadores.
 *
 * ⚠️ **Números por confirmar.** São os valores exactos que o site actual
 * mostra, transcritos e não arredondados. São afirmações de facto sobre o
 * negócio e vão para uma banda em destaque — ver `docs/decisoes-pendentes.md`,
 * ponto 8. Se algum não for verdade, muda-se aqui e muda em todo o lado.
 *
 * `Projetos de ScreensConcluídos` levava o espaço a faltar no site antigo —
 * defeito #8.
 */
export const CONTADORES = [
  { valor: 1280, etiqueta: "Projetos de Alarmes Concluídos" },
  { valor: 102, etiqueta: "Projetos de Obras Concluídos" },
  { valor: 9, etiqueta: "Projetos de Screens Concluídos" },
  { valor: 1391, etiqueta: "Clientes Satisfeitos" },
] as const;
