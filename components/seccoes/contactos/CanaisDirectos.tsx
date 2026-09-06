import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { CANAIS } from "@/lib/conteudo/contactos";
import { emailHref, site, telefoneHref, urlMapa } from "@/lib/site";

/**
 * Os três canais directos, e o fecho da página.
 *
 * **A `BandaOrcamento` não entra nesta página**, e é a única das nove onde
 * isso acontece: o botão dela aponta para `/contactos/`, e numa página que já
 * *é* o pedido de orçamento isso era uma ligação para si própria. O fecho
 * continua a resolver em amarelo, como a gramática pede — só que aqui o que
 * fecha é a alternativa ao formulário, não um caminho para ele.
 *
 * **A morada abre o Google Maps num separador, e não um mapa embebido.** Um
 * `iframe` do Google põe cookies de terceiros e obriga o site inteiro a ter
 * banner de consentimento, o que contraria a decisão 7 do
 * `docs/decisoes-pendentes.md` — hoje este site não põe um único cookie, e é a
 * única posição totalmente limpa em RGPD que ele tem. Decidido com o Gonçalo a
 * 6 de Setembro de 2026.
 *
 * O `urlMapa` de `lib/site.ts` é a forma documentada da Google, e não o URL de
 * sessão do Safari que o site actual tem colado da barra de endereço.
 */
export function CanaisDirectos() {
  const canais = [
    {
      rotulo: CANAIS.morada,
      valor: site.morada.linha,
      nota: `${site.morada.codigoPostal} ${site.morada.localidade}`,
      href: urlMapa,
      icone: "morada" as const,
      externo: true,
    },
    {
      rotulo: CANAIS.telefone,
      valor: site.telefone,
      nota: null,
      href: telefoneHref,
      icone: "telefone" as const,
      externo: false,
    },
    {
      rotulo: CANAIS.email,
      valor: site.email,
      nota: null,
      href: emailHref,
      icone: "correio" as const,
      externo: false,
    },
  ];

  return (
    <>
      <div className="banda-perigo" aria-hidden="true" />
      <Seccao terreno="amarelo">
        <Medida>
          <h2 className="text-cena font-titulo max-w-[var(--medida-titulo)] font-extrabold">
            {CANAIS.titulo}
          </h2>

          <ul className="mt-[var(--espaco-bloco)] grid gap-x-10 gap-y-8 sm:grid-cols-3">
            {canais.map((canal, indice) => (
              <li
                key={canal.rotulo}
                className="entra border-asfalto/25 border-t pt-6"
                style={{ "--i": indice } as React.CSSProperties}
              >
                <p className="font-titulo flex items-center gap-2.5 text-[0.75rem] font-bold tracking-[0.16em] uppercase">
                  <Icone nome={canal.icone} className="size-4" />
                  {canal.rotulo}
                </p>

                <a
                  href={canal.href}
                  {...(canal.externo
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="font-titulo mt-3 block text-[1.25rem] font-bold underline decoration-2 underline-offset-4"
                >
                  {canal.valor}
                </a>

                {canal.nota && (
                  <p className="mt-1 text-[0.9375rem]">{canal.nota}</p>
                )}
              </li>
            ))}
          </ul>
        </Medida>
      </Seccao>
    </>
  );
}
