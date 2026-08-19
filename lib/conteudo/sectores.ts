import type { NomeIcone } from "@/components/ui/Icone";

/**
 * Os quatro sectores da JSK.
 *
 * Este array manda na navegação, nos cartões da homepage, na coluna "Setores"
 * do rodapé e no sitemap. É de propósito: no site antigo cada um destes sítios
 * tem a sua própria lista escrita à mão, e já divergiram.
 *
 * ⚠️ **A ordem mudou.** O site antigo tem a navegação por Alarmes → Obras →
 * Web → Screens e os cartões da homepage por Alarmes → Obras → Screens → Web.
 * A ordem dos cartões é a que está certa, porque é a que corresponde à
 * numeração 01–04 que aparece impressa neles. É essa que fica, nos dois sítios.
 */
export type Sector = {
  id: "alarmes" | "obras" | "screens" | "web";
  /** O nome como aparece em todo o lado. */
  nome: string;
  rota: `/${string}/`;
  icone: NomeIcone;
  /** O subtítulo do herói da página do sector. */
  tagline: string;
  /** O texto do cartão na homepage. */
  resumo: string;
  /** A imagem do cartão na homepage. */
  capa: string;
  /** A imagem do herói da página do sector. */
  heroi: string;
};

export const SECTORES: readonly Sector[] = [
  {
    id: "alarmes",
    nome: "JSK Alarmes",
    rota: "/alarmes/",
    icone: "escudo",
    tagline: "Soluções completas de segurança para proteger o que mais importa.",
    resumo:
      "Garantimos a sua segurança e tranquilidade com tecnologia de ponta e soluções personalizadas para proteger o que mais importa",
    capa: "/alarmes/02-camara-termica.webp",
    heroi: "/heroi/alarmes.webp",
  },
  {
    id: "obras",
    nome: "JSK Obras",
    rota: "/obras/",
    icone: "capacete",
    tagline: "Transformamos espaços com qualidade, confiança e dedicação",
    resumo:
      "Damos uma nova vida aos espaços através de remodelações de alta qualidade, com inovação, bom gosto e atenção a cada detalhe",
    capa: "/sectores/obras.webp",
    heroi: "/heroi/obras.webp",
  },
  {
    id: "screens",
    nome: "JSK Screens",
    rota: "/screens-led/",
    icone: "ecra",
    tagline:
      "Não deixe a sua marca para amanhã: anuncie hoje com os screens Led da JSK!",
    resumo:
      "Garantimos que a sua mensagem chegue mais longe com screens LED modernos, para um impacto e visibilidade únicos",
    capa: "/heroi/screens.webp",
    heroi: "/heroi/screens.webp",
  },
  {
    id: "web",
    nome: "JSK Web",
    rota: "/web/",
    icone: "codigo",
    tagline:
      "Criamos a sua presença digital com design único e resultados garantidos",
    // ⚠️ Este texto credita a XquisiteVision, mas a página /web/ credita a
    // DevPlus. É o defeito #6 e está por decidir — ver
    // docs/decisoes-pendentes.md #2. Fica transcrito como está até alguém
    // dizer qual é o parceiro.
    resumo:
      "Websites modernos e funcionais, desenvolvidos pela XquisiteVision e promovidos pela JSK, para garantir a sua marca com impacto online.",
    capa: "/sectores/web.webp",
    heroi: "/heroi/web.webp",
  },
];

/** Os itens da navegação principal, na ordem em que aparecem. */
export const NAVEGACAO = [
  { rota: "/", nome: "Home" },
  ...SECTORES.map((s) => ({ rota: s.rota, nome: s.nome })),
  { rota: "/sobre-nos/", nome: "Sobre Nós" },
  { rota: "/contactos/", nome: "Contactos" },
] as const;

export function sector(id: Sector["id"]): Sector {
  const achado = SECTORES.find((s) => s.id === id);
  if (!achado) throw new Error(`sector desconhecido: ${id}`);
  return achado;
}
