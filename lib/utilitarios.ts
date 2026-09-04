import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Junta classes e resolve conflitos do Tailwind.
 *
 * Sem isto, um `className` passado de fora fica *antes* das classes do
 * componente no atributo, e quem ganha no CSS é a que foi escrita mais tarde
 * na folha — não a que vem por último no atributo. O resultado é uma classe
 * que se passa e não faz nada, sem erro nenhum a dizê-lo.
 */
export function cn(...classes: ClassValue[]) {
  return twMerge(clsx(classes));
}
