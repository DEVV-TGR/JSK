import { cartaoOg, tamanhoOg, tipoOg } from "@/components/og/CartaoOg";

export const alt = "JSK Web — a sua presença digital";
export const size = tamanhoOg;
export const contentType = tipoOg;

export default function Og() {
  return cartaoOg({ titulo: "Web Design e Presença Digital", olho: "JSK Web" });
}
