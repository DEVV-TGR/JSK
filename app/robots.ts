import type { MetadataRoute } from "next";

import { site } from "@/lib/site";

/**
 * ⚠️ Enquanto o site viver num domínio de pré-visualização da Vercel, é essa
 * pré-visualização que a Google indexa. Só apontar o `NEXT_PUBLIC_SITE_URL`
 * para jsk.pt depois de o DNS estar mudado.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
