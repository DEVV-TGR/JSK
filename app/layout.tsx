import type { Metadata } from "next";
import { Roboto, Work_Sans } from "next/font/google";

import { BandaOrcamento } from "@/components/BandaOrcamento";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { site } from "@/lib/site";

import "./globals.css";

/**
 * As fontes vêm do `next/font`, que as descarrega na build e as serve do nosso
 * domínio. O site antigo põe um `<link>` para `fonts.googleapis.com`: um
 * pedido a terceiros com o IP de quem visita, e mais uma ligação a estabelecer
 * antes de o texto poder aparecer.
 *
 * Só os pesos que se usam. O tema antigo declara ainda o Roboto Slab, que não
 * é usado em lado nenhum.
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
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.nome,
    url: site.url,
  },
};

export default function RaizLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={`${titulo.variable} ${corpo.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {/* O cabeçalho é fixo e a navegação repete-se nas nove páginas. Sem um
            salto, quem navega só com o teclado percorre catorze links antes de
            chegar ao texto — em todas as páginas, todas as vezes. */}
        <a
          href="#conteudo"
          className="sr-only rounded-botao bg-amarelo px-6 py-3 font-titulo font-semibold text-amarelo-tinta focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50"
        >
          Saltar para o conteúdo
        </a>

        <Cabecalho />

        <main id="conteudo" className="flex-1">
          {children}
        </main>

        <BandaOrcamento />
        <Rodape />
      </body>
    </html>
  );
}
