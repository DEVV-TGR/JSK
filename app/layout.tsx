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
        {/* O motor que falta ao Safari.

            Até ao Safari 26 não existe `animation-timeline`, e o site inteiro
            cai no estado final: completo, legível, e absolutamente parado. No
            iPhone isso é toda a gente, porque no iOS todos os browsers são
            WebKit por baixo — a app do Chrome incluída. O gesto que dá nome a
            este site, a casa que se arma enquanto se desce, não acontecia para
            metade de quem entra.

            Três coisas a saber antes de alguém mexer aqui:

            1. **Corre antes da pintura, e tem de ser.** Carregado depois, o
               Safari pinta a página completa e só então os elementos saltam
               para o início da animação — conteúdo que aparece e desaparece,
               que é pior do que não ter movimento nenhum. Daí o `document.write`
               enquanto o documento ainda está a ser lido.
            2. **O `document.write` é guardado por `readyState`.** Chamado
               depois de o documento fechar, apaga a página inteira. O ramo do
               `else` existe só para esse caso nunca acontecer.
            3. **O Chrome não paga nada.** A detecção é a mesma que o
               `movimento.css` usa no `@supports`, por isso quem suporta nunca
               pede o ficheiro. São 17 KB comprimidos, e só para quem precisa.

            O polyfill é o `flackr/scroll-timeline`, a implementação de
            referência da especificação. Ele próprio volta a testar o suporte e
            não faz nada se o browser souber — a detecção aqui é para poupar o
            pedido, não para o proteger. Ver `docs/movimento.md`. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!CSS.supports('animation-timeline','view()')){" +
              "var u='/polyfill/scroll-timeline.js';" +
              "if(document.readyState==='loading'){document.write('<script src=\"'+u+'\"><\\/script>')}" +
              "else{var s=document.createElement('script');s.src=u;document.head.appendChild(s)}}",
          }}
        />
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
