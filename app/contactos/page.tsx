import type { Metadata } from "next";

import { CanaisDirectos } from "@/components/seccoes/contactos/CanaisDirectos";
import { Formulario } from "@/components/seccoes/contactos/Formulario";
import { HeroiContactos } from "@/components/seccoes/contactos/HeroiContactos";
import { PEDIDO, TITULO } from "@/lib/conteudo/contactos";

export const metadata: Metadata = {
  title: TITULO,
  description: PEDIDO.paragrafos[1],
  alternates: { canonical: "/contactos/" },
};

/**
 * A `/contactos/`, em três cenas.
 *
 * É a página mais importante do site e a mais curta, e as duas coisas são a
 * mesma: **é para aqui que aponta cada botão "Peça um Orçamento Gratuito" das
 * nove páginas.** Quem chega já decidiu. O trabalho é não a atrapalhar.
 *
 * Por isso — e ao contrário das outras seis — **não tem cena fixa nenhuma.**
 * Um `pin` de 300svh entre o título e o formulário seria pôr uma animação à
 * frente de alguém que veio pedir um orçamento. O movimento que há é o de
 * entrada, escalonado, e mais nada.
 *
 * A sequência de terrenos é asfalto → papel → amarelo. Três cenas, três
 * terrenos, nenhum par de escuros encostados.
 *
 * **A `BandaOrcamento` também não entra**, e é a única das nove páginas onde
 * isso acontece: o botão dela aponta para aqui. O fecho continua a resolver em
 * amarelo, mas com os canais directos — a alternativa ao formulário, não um
 * caminho para ele.
 */
export default function Contactos() {
  return (
    <>
      <HeroiContactos />
      <Formulario />
      <CanaisDirectos />
    </>
  );
}
