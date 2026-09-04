import Image from "next/image";
import Link from "next/link";

import { Envolvente } from "@/components/ui/Envolvente";
import { Icone } from "@/components/ui/Icone";
import { RODAPE } from "@/lib/conteudo/paginas";
import { SECTORES } from "@/lib/conteudo/sectores";
import { emailHref, site, telefoneHref, urlMapa } from "@/lib/site";

/**
 * O rodapé.
 *
 * Duas coisas mudaram em relação ao site antigo, e as duas são estruturais:
 *
 * - **Os títulos das colunas eram `<h4>`.** Aparecem nas nove páginas, o que
 *   dava a cada página três cabeçalhos de nível quatro que não têm nada a ver
 *   com o conteúdo dela. Passam a `<p class="olho">` dentro de um `<nav>` com
 *   `aria-labelledby` — quem navega por cabeçalhos deixa de tropeçar neles, e
 *   quem navega por regiões continua a encontrá-los pelo nome.
 * - **O telefone.** O rodapé antigo mostra `+351 963 085 319` e o `href` por
 *   baixo é `tel:(+351) 929 153 103`. Em todas as páginas, quem carrega no
 *   número liga para outro. Aqui o texto e o `href` saem os dois de
 *   `site.telefone` — ver lib/site.ts.
 */
export function Rodape() {
  return (
    <footer className="bg-tinta text-papel">
      <Envolvente className="grid gap-12 py-seccao md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-6">
          <Image
            src="/marca/logo.webp"
            alt={`${site.nome} — ${site.tagline}`}
            width={420}
            height={330}
            className="h-16 w-auto"
          />
          <p className="max-w-sm text-nota text-papel/70">{site.descricao}</p>
        </div>

        <nav aria-labelledby="rodape-contactos" className="flex flex-col gap-5">
          <p id="rodape-contactos" className="olho">
            {RODAPE.colunas.contactos}
          </p>
          <ul className="flex flex-col gap-4 text-nota">
            <li>
              <a
                href={urlMapa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-papel/80"
              >
                <Icone nome="morada" className="mt-0.5 size-5 text-amarelo" />
                <span>
                  {site.morada.linha}
                  <br />
                  {site.morada.codigoPostal} {site.morada.localidade}
                </span>
              </a>
            </li>
            <li>
              <a href={telefoneHref} className="flex items-center gap-3 text-papel/80">
                <Icone nome="telefone" className="size-5 text-amarelo" />
                <span>{site.telefone}</span>
              </a>
            </li>
            <li>
              <a href={emailHref} className="flex items-center gap-3 text-papel/80">
                <Icone nome="email" className="size-5 text-amarelo" />
                <span>{site.email}</span>
              </a>
            </li>
          </ul>
        </nav>

        <nav aria-labelledby="rodape-links" className="flex flex-col gap-5">
          <p id="rodape-links" className="olho">
            {RODAPE.colunas.links}
          </p>
          <ul className="flex flex-col gap-3 text-nota">
            {RODAPE.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-papel/80">
                  {link.texto}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="rodape-setores" className="flex flex-col gap-5">
          <p id="rodape-setores" className="olho">
            {RODAPE.colunas.setores}
          </p>
          <ul className="flex flex-col gap-3 text-nota">
            {/* No site antigo o "JSK Web" desta coluna não tem link nenhum, e
                os outros três apontam para `/obras` e `/screens` sem barra
                final — dois redireccionamentos de cada vez que alguém lá
                carrega. Saem todos do mesmo array. */}
            {SECTORES.map((s) => (
              <li key={s.id}>
                <Link href={s.rota} className="text-papel/80">
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Envolvente>

      <div className="border-t border-papel/12">
        <Envolvente className="flex flex-col gap-2 py-6 text-nota text-papel/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.nome}
            {site.nif && ` · NIF ${site.nif}`}
          </p>
          <p>
            Design by{" "}
            <a
              href={RODAPE.credito.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-papel/80"
            >
              {RODAPE.credito.texto}
            </a>
          </p>
        </Envolvente>
      </div>
    </footer>
  );
}
