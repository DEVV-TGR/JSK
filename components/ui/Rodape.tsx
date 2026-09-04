import Link from "next/link";

import { Icone } from "@/components/ui/Icone";
import { Medida } from "@/components/ui/Seccao";
import { RODAPE } from "@/lib/conteudo/comum";
import { emailHref, site, telefoneHref, urlMapa } from "@/lib/site";

export function Rodape() {
  return (
    <footer className="bg-asfalto text-papel pt-20 pb-10">
      <Medida>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="chapa font-titulo inline-grid h-11 place-items-center px-3 text-[1.375rem] leading-none font-extrabold tracking-[0.06em]">
              {site.nome}
            </p>
            <p className="text-grafite mt-6 max-w-[38ch] text-[0.9375rem] leading-relaxed">
              {RODAPE.sobre}
            </p>
          </div>

          <div>
            <TituloColuna>{RODAPE.contactos.titulo}</TituloColuna>
            <ul className="mt-6 space-y-4">
              <li>
                <a
                  href={urlMapa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-grafite hover:text-amarelo inline-flex items-start gap-3 text-[0.9375rem] [transition:color_160ms_ease]"
                >
                  <Icone nome="morada" className="size-5 translate-y-0.5" />
                  {site.morada.linha}
                </a>
              </li>
              <li>
                {/* O número que se lê e o número que se marca saem os dois de
                    `site.telefone`. No site antigo eram dois widgets diferentes
                    escritos à mão, e mostravam um número enquanto marcavam
                    outro — em todas as páginas. Defeito #1. */}
                <a
                  href={telefoneHref}
                  className="text-grafite hover:text-amarelo inline-flex items-center gap-3 text-[0.9375rem] [transition:color_160ms_ease]"
                >
                  <Icone nome="telefone" className="size-5" />
                  {site.telefone}
                </a>
              </li>
              <li>
                <a
                  href={emailHref}
                  className="text-grafite hover:text-amarelo inline-flex items-center gap-3 text-[0.9375rem] [transition:color_160ms_ease]"
                >
                  <Icone nome="correio" className="size-5" />
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <ColunaDeLinks
            titulo={RODAPE.links.titulo}
            itens={RODAPE.links.itens}
          />
          <ColunaDeLinks
            titulo={RODAPE.setores.titulo}
            itens={RODAPE.setores.itens}
          />
        </div>

        <div className="border-betao text-grafite mt-16 border-t pt-8 text-[0.8125rem]">
          <p>{RODAPE.copyright}</p>
        </div>
      </Medida>
    </footer>
  );
}

function TituloColuna({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-etiqueta font-titulo font-bold tracking-[0.14em] uppercase">
      {children}
    </h2>
  );
}

function ColunaDeLinks({
  titulo,
  itens,
}: {
  titulo: string;
  itens: readonly { texto: string; href: string }[];
}) {
  return (
    <div>
      <TituloColuna>{titulo}</TituloColuna>
      <ul className="mt-6 space-y-3.5">
        {itens.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-grafite hover:text-amarelo text-[0.9375rem] [transition:color_160ms_ease]"
            >
              {item.texto}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
