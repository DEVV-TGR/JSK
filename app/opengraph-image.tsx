import { cartaoOg, tamanhoOg, tipoOg } from "@/components/og/CartaoOg";

export const alt = "JSK — Segurança, Construção e Impacto. Tudo Num Só Lugar";
export const size = tamanhoOg;
export const contentType = tipoOg;

export default function Og() {
  return cartaoOg({
    titulo: "Segurança, Construção e Impacto",
    olho: "JSK",
  });
}
