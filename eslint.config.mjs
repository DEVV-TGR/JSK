import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Omissões do eslint-config-next, repetidas porque declarar `globalIgnores`
    // substitui as dele em vez de as somar.
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // As skills dos agentes são código de terceiros que não é nosso para
    // corrigir. Sem esta linha o lint devolve mais de cem avisos que não são do
    // site e que escondem os que são.
    ".claude/**",
  ]),
]);

export default eslintConfig;
