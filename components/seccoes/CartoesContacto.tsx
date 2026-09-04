import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { Revela } from "@/components/ui/Revela";
import { emailHref, site, telefoneHref, urlMapa } from "@/lib/site";

type Cartao = {
  icone: NomeIcone;
  rotulo: string;
  valor: string;
  href: string;
  externo?: boolean;
};

/**
 * Morada, telefone e email.
 *
 * O que se lê e o que se marca saem os dois de `lib/site.ts` — no rodapé do
 * site antigo não saem, e por isso mostram números diferentes.
 *
 * A ligação do mapa também: a do site antigo é um URL de sessão do Safari
 * copiado da barra de endereço, com `client=safari&rls=en&oe=UTF-8&um=1` e um
 * `geocode` opaco pelo meio.
 */
const CARTOES: readonly Cartao[] = [
  {
    icone: "morada",
    rotulo: "Endereço",
    valor: `${site.morada.linha}, ${site.morada.codigoPostal} ${site.morada.localidade}`,
    href: urlMapa,
    externo: true,
  },
  { icone: "telefone", rotulo: "Telemóvel", valor: site.telefone, href: telefoneHref },
  { icone: "email", rotulo: "Email", valor: site.email, href: emailHref },
];

export function CartoesContacto() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {CARTOES.map((cartao, i) => (
        <li key={cartao.rotulo}>
          <Revela ordem={i} className="h-full">
            <a
              href={cartao.href}
              {...(cartao.externo
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="premivel flex h-full flex-col rounded-cartao border border-linha bg-papel p-7 shadow-1 hover:shadow-2"
            >
              <Icone nome={cartao.icone} className="size-6 text-ocre" />
              <span className="olho mt-5">{cartao.rotulo}</span>
              <span className="mt-2 font-titulo font-semibold">{cartao.valor}</span>
            </a>
          </Revela>
        </li>
      ))}
    </ul>
  );
}
