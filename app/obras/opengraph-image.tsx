import { cartaoOg, tamanhoOg, tipoOg } from "@/components/og/CartaoOg";

export const alt = "JSK Obras — transformamos espaços";
export const size = tamanhoOg;
export const contentType = tipoOg;

export default function Og() {
  return cartaoOg({ titulo: "Obras e Remodelações", olho: "JSK Obras" });
}
