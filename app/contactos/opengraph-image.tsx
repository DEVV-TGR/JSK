import { cartaoOg, tamanhoOg, tipoOg } from "@/components/og/CartaoOg";

export const alt = "Contactos da JSK";
export const size = tamanhoOg;
export const contentType = tipoOg;

export default function Og() {
  return cartaoOg({ titulo: "Peça um Orçamento Gratuito", olho: "Contactos" });
}
