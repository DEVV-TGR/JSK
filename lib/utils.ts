import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes e deixa a última ganhar quando há conflito.
 *
 * Sem o `twMerge`, `cn("px-4", "px-8")` devolveria as duas e o resultado
 * dependia da ordem em que o Tailwind as escreveu no ficheiro — que não é a
 * ordem em que aparecem aqui.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
