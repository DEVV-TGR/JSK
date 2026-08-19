/**
 * Os contadores da homepage.
 *
 * ⚠️ **Estes números são afirmações de facto sobre o negócio**, e vão para uma
 * banda em destaque. Não se arredondam, não se actualizam e não se "melhoram"
 * sem alguém confirmar que continuam verdadeiros — ver
 * docs/decisoes-pendentes.md #8.
 *
 * O terceiro rótulo está escrito "Projetos de ScreensConcluídos" no site
 * antigo, sem espaço. Corrigido.
 */
export type Contador = {
  valor: number;
  rotulo: string;
};

export const NUMEROS: readonly Contador[] = [
  { valor: 1280, rotulo: "Projetos de Alarmes Concluídos" },
  { valor: 102, rotulo: "Projetos de Obras Concluídos" },
  { valor: 9, rotulo: "Projetos de Screens Concluídos" },
  { valor: 1391, rotulo: "Clientes Satisfeitos" },
];
