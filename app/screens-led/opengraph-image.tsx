import { cartaoOg, tamanhoOg, tipoOg } from "@/components/og/CartaoOg";

export const alt = "JSK Screens — comunicação visual de alto impacto";
export const size = tamanhoOg;
export const contentType = tipoOg;

export default function Og() {
  return cartaoOg({ titulo: "Aluguer e Venda de Screens LED", olho: "JSK Screens" });
}
