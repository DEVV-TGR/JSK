import { SECTORES, type Sector } from "@/lib/conteudo/sectores";
import { SERVICOS_ALARMES, SERVICOS_OBRAS } from "@/lib/conteudo/servicos";
import { site } from "@/lib/site";

/**
 * Os dados estruturados do site.
 *
 * O site antigo não tem uma linha de JSON-LD em nenhuma das dez páginas — só a
 * microdata que o tema Astra põe por omissão (`WPHeader`, `WPFooter`,
 * `Organization` na marca). Para um negócio local, isso não diz à Google nem
 * onde fica, nem o que faz, nem como se lhe telefona.
 *
 * ⚠️ **Um `<script>` por objecto, nunca um array no topo.** Um array não tem
 * `@context`, e há consumidores que fazem `JSON.parse(bloco)["@context"]` sem
 * verificar — rebenta, e rebenta em silêncio num validador de terceiros que
 * ninguém está a ver.
 *
 * ⚠️ **Sem `aggregateRating` e sem `openingHours`.** O primeiro exige
 * avaliações reais e a Google penaliza as fabricadas. O segundo não está
 * confirmado em lado nenhum — e um horário inventado aqui passa a ser o horário
 * que a Google mostra a toda a gente que procurar a JSK.
 */

const ID_EMPRESA = `${site.url}/#empresa`;

function Bloco({ dados }: { dados: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dados) }}
    />
  );
}

export function EmpresaLd() {
  return (
    <Bloco
      dados={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": ID_EMPRESA,
        name: site.nome,
        alternateName: `${site.nome} Alarmes`,
        description: site.descricao,
        url: site.url,
        image: `${site.url}/marca/logo.webp`,
        logo: `${site.url}/marca/logo.webp`,
        telephone: site.telefone.replace(/\s/g, ""),
        email: site.email,
        ...(site.nif ? { vatID: site.nif, taxID: site.nif } : {}),
        ...(site.denominacaoSocial ? { legalName: site.denominacaoSocial } : {}),
        address: {
          "@type": "PostalAddress",
          streetAddress: site.morada.linha,
          postalCode: site.morada.codigoPostal,
          addressLocality: site.morada.localidade,
          addressRegion: site.morada.concelho,
          addressCountry: site.morada.pais,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Portugal",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviços JSK",
          itemListElement: SECTORES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.nome,
              description: s.resumo,
              url: `${site.url}${s.rota}`,
            },
          })),
        },
      }}
    />
  );
}

/** As listas de serviços que já existem em `lib/conteudo/servicos.ts`. */
const CATALOGOS: Partial<Record<Sector["id"], readonly { titulo: string }[]>> = {
  alarmes: SERVICOS_ALARMES.servicos,
  obras: SERVICOS_OBRAS.servicos,
};

export function ServicoLd({ id }: { id: Sector["id"] }) {
  const sector = SECTORES.find((s) => s.id === id);
  if (!sector) return null;

  const catalogo = CATALOGOS[id];

  return (
    <Bloco
      dados={{
        "@context": "https://schema.org",
        "@type": "Service",
        name: sector.nome,
        serviceType: sector.nome,
        description: sector.resumo,
        url: `${site.url}${sector.rota}`,
        provider: { "@id": ID_EMPRESA },
        areaServed: { "@type": "AdministrativeArea", name: "Portugal" },
        ...(catalogo
          ? {
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: `Serviços ${sector.nome}`,
                itemListElement: catalogo.map((servico) => ({
                  "@type": "Offer",
                  itemOffered: { "@type": "Service", name: servico.titulo },
                })),
              },
            }
          : {}),
      }}
    />
  );
}
