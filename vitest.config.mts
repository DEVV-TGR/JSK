import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

/**
 * O `@/` tem de estar aqui também.
 *
 * O `tsconfig.json` resolve-o para o editor e para o `tsc`, e o Next resolve-o
 * na build — mas o Vitest tem o seu próprio resolvedor e não lê nenhum dos
 * dois. Sem isto, um teste que importe de `@/lib/...` falha a carregar e a
 * mensagem fala de um módulo que não existe, o que manda quem a lê procurar no
 * sítio errado.
 */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    include: ["testes/**/*.test.ts"],
  },
});
