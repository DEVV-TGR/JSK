import type { MetadataRoute } from "next";

import { ROTAS_PUBLICAS, site } from "@/lib/site";

/**
 * Gerado a partir de `ROTAS_PUBLICAS`, para que não haja uma segunda lista de
 * páginas a divergir da primeira. O sitemap do WordPress incluía o template do
 * rodapé (`/elementor-hf/footer/`), uma página órfã em construção e um arquivo
 * de autores — três coisas que não são páginas do site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return ROTAS_PUBLICAS.map((rota) => ({
    url: `${site.url}${rota}`,
    changeFrequency: rota === "/" ? "monthly" : "yearly",
    priority: prioridade(rota),
  }));
}

function prioridade(rota: string): number {
  if (rota === "/") return 1;
  if (rota.startsWith("/termos") || rota.startsWith("/politica")) return 0.3;
  return 0.8;
}
