import { cartaoOg, tamanhoOg, tipoOg } from "@/components/og/CartaoOg";

export const alt = "Sobre a JSK";
export const size = tamanhoOg;
export const contentType = tipoOg;

export default function Og() {
  return cartaoOg({ titulo: "Compromisso, inovação e qualidade", olho: "Sobre Nós" });
}
