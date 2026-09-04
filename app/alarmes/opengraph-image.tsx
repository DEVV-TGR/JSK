import { cartaoOg, tamanhoOg, tipoOg } from "@/components/og/CartaoOg";

export const alt = "JSK Alarmes — soluções completas de segurança";
export const size = tamanhoOg;
export const contentType = tipoOg;

export default function Og() {
  return cartaoOg({ titulo: "Alarmes e Videovigilância", olho: "JSK Alarmes" });
}
