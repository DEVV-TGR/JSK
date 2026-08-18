import type { Metadata } from "next";
import { Roboto, Work_Sans } from "next/font/google";

import { site } from "@/lib/site";

import "./globals.css";

/**
 * As fontes vêm do `next/font`, que as descarrega na build e as serve do nosso
 * domínio. O site em WordPress punha um `<link>` para `fonts.googleapis.com`,
 * o que é um pedido a terceiros com o IP de quem visita — e uma ligação a mais
 * a estabelecer antes de o texto poder aparecer.
 */
const titulo = Work_Sans({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--fonte-titulo",
  display: "swap",
});

const corpo = Roboto({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--fonte-corpo",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nome} — ${site.tagline}`,
    template: `%s — ${site.nome}`,
  },
  description: site.descricao,
};

export default function RaizLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={`${titulo.variable} ${corpo.variable}`}>
      <body>{children}</body>
    </html>
  );
}
