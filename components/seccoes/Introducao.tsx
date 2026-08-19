import { Botao } from "@/components/ui/Botao";
import { Olho } from "@/components/ui/Olho";
import { Revela } from "@/components/ui/Revela";
import { Seccao } from "@/components/ui/Seccao";
import { INTRODUCAO_INICIO, TITULO_FORMULARIO } from "@/lib/conteudo/paginas";
import { emailHref, site, telefoneHref } from "@/lib/site";
import { Icone } from "@/components/ui/Icone";

/**
 * A apresentação da empresa, na homepage, com o cartão de orçamento ao lado.
 *
 * No site antigo o cartão flutua sobre a secção com `margin: -105px 0 0 80px` e
 * uma `box-shadow: 0px 104px 104px -40px rgba(0,0,0,.16)` — 104px de desfoque
 * com 40px de contracção não descreve luz nenhuma. Aqui o cartão sobe um pouco
 * sobre a secção anterior, mas com uma sombra que corresponde a essa altura.
 *
 * ⚠️ O formulário a sério entra na Fase 9, quando houver para onde enviar o que
 * se escreve nele. Até lá o cartão leva os contactos directos — que funcionam.
 * Um formulário que finge enviar é pior do que não haver formulário.
 */
export function Introducao() {
  return (
    <Seccao>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Revela className="lg:col-span-7">
          <Olho>Bem-vindo</Olho>
          <h2 className="mt-5 text-beta">{INTRODUCAO_INICIO.titulo}</h2>
          <div className="mt-6 flex max-w-medida flex-col gap-4 text-tinta-suave">
            {INTRODUCAO_INICIO.paragrafos.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <span
            aria-hidden
            className="mt-8 block h-1 w-24 bg-amarelo"
          />
        </Revela>

        <Revela ordem={1} className="lg:col-span-5">
          <div className="rounded-painel border border-linha bg-papel p-8 shadow-2 lg:-mt-24">
            <h3 className="text-delta font-titulo font-semibold">
              {TITULO_FORMULARIO}
            </h3>
            <p className="mt-3 text-nota text-tinta-suave">
              Diga-nos o que precisa. Respondemos com a maior brevidade possível.
            </p>

            <ul className="mt-7 flex flex-col gap-4 text-nota">
              <li>
                <a href={telefoneHref} className="flex items-center gap-3">
                  <Icone nome="telefone" className="size-5 text-ocre" />
                  <span>{site.telefone}</span>
                </a>
              </li>
              <li>
                <a href={emailHref} className="flex items-center gap-3">
                  <Icone nome="email" className="size-5 text-ocre" />
                  <span>{site.email}</span>
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <Botao href="/contactos/" icone="setaDireita" className="w-full justify-between">
                Peça o seu orçamento
              </Botao>
            </div>
          </div>
        </Revela>
      </div>
    </Seccao>
  );
}
