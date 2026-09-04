import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

/**
 * O cartão que aparece quando alguém partilha uma página do site.
 *
 * O site antigo não tem **nenhuma** imagem Open Graph. Uma ligação para
 * jsk.pt colada no WhatsApp ou no Facebook aparece como um rectângulo cinzento
 * com um título — que é a diferença entre parecer uma empresa e parecer um
 * link suspeito.
 *
 * ⚠️ Isto é renderizado pelo Satori, não por um browser. **Só flexbox** — não
 * há grid, não há `position: absolute` com `inset`, e cada elemento com mais de
 * um filho precisa de `display: flex` declarado à mão.
 */
export const tamanhoOg = { width: 1200, height: 630 };
export const tipoOg = "image/png";

export function cartaoOg({ titulo, olho }: { titulo: string; olho?: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#141414",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* O filete amarelo no topo — a marca sem precisar do logótipo, que
            tem o número de telefone gravado e ficaria ilegível a esta escala. */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 12,
            backgroundColor: "#fdd000",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          {olho && (
            <div
              style={{
                display: "flex",
                color: "#fdd000",
                fontSize: 26,
                letterSpacing: 4,
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              {olho}
            </div>
          )}
          <div
            style={{
              display: "flex",
              color: "#ffffff",
              fontSize: titulo.length > 34 ? 62 : 76,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -1,
            }}
          >
            {titulo}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            color: "#9a9a95",
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>{site.tagline}</div>
          <div style={{ display: "flex", color: "#ffffff" }}>{site.dominio}</div>
        </div>
      </div>
    ),
    tamanhoOg,
  );
}
