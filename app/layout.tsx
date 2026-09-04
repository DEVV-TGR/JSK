import type { Metadata } from "next";
import { Archivo, Roboto } from "next/font/google";

import { Cabecalho } from "@/components/ui/Cabecalho";
import { Rodape } from "@/components/ui/Rodape";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * As fontes vêm do `next/font`, que as descarrega na build e as serve do nosso
 * domínio. O site em WordPress punha um `<link>` para `fonts.googleapis.com`,
 * o que é um pedido a terceiros com o IP de quem visita — e uma ligação a mais
 * a estabelecer antes de o texto poder aparecer.
 *
 * A Archivo substitui a Work Sans. A Work Sans veio do template Astra
 * "Roofing" e não de um manual de marca; é suave de mais para segurar um
 * título do tamanho de uma chapa de sinalização. A Archivo é variável, o que
 * significa um só ficheiro para todos os pesos que usamos.
 */
const titulo = Archivo({
  subsets: ["latin"],
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
      <body>
        {/* O primeiro elemento focável da página salta a navegação. Sem ele,
            quem usa teclado ou leitor de ecrã atravessa os seis itens do menu
            em cada uma das nove páginas antes de chegar ao texto. */}
        <a
          href="#conteudo"
          className="bg-amarelo text-asfalto sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-4 focus-visible:left-4 focus-visible:z-100 focus-visible:px-5 focus-visible:py-3 focus-visible:font-bold"
        >
          Saltar para o conteúdo
        </a>

        <Cabecalho />
        <main id="conteudo">{children}</main>
        <Rodape />
      </body>
    </html>
  );
}
