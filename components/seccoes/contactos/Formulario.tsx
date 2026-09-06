"use client";

import { useId, useState } from "react";

import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { SECTORES } from "@/lib/conteudo/comum";
import { FORMULARIO, PEDIDO } from "@/lib/conteudo/contactos";
import { esquemaPedido, errosPorCampo, type ErrosPorCampo } from "@/lib/formulario";
import { emailHref, site, telefoneHref } from "@/lib/site";

type Estado = "parado" | "aEnviar" | keyof typeof FORMULARIO.estados;

/**
 * O formulário de orçamento.
 *
 * É para aqui que aponta cada botão "Peça um Orçamento Gratuito" das nove
 * páginas — é o único ponto de conversão do site inteiro.
 *
 * ## O que o de jsk.pt faz mal, e que aqui não se repete
 *
 * - **Não tem uma única `<label>`.** Os campos identificam-se por
 *   `placeholder`, que desaparece assim que a pessoa começa a escrever e que
 *   um leitor de ecrã não anuncia como rótulo. Defeito #31.
 * - **Não pede consentimento nenhum** para tratar os dados. Defeito #23.
 * - **Não tem protecção de spam.** Defeito #37. Aqui é um engodo — um campo
 *   escondido que um robô preenche e uma pessoa não. Vale menos do que um
 *   captcha e custa infinitamente menos: sem pedidos a terceiros, sem cookies,
 *   sem pôr ninguém a identificar semáforos. É a única protecção compatível
 *   com um site que não põe um único cookie.
 *
 * ## É um componente de cliente, e é o segundo do site
 *
 * O outro é a `NavegacaoSectores`, que precisa do caminho actual. Este precisa
 * de estado: o que se escreveu, o que falhou, e em que ponto do envio está.
 * Não contradiz o `docs/movimento.md` — o que lá está escrito é que **o
 * movimento** é CSS e não há JavaScript de animação. Um formulário não é
 * movimento.
 *
 * ## Nunca finge que enviou
 *
 * A validação corre **duas vezes**, com o mesmo esquema: aqui, para a pessoa
 * ver o erro sem esperar pela rede, e na rota, porque validação de cliente não
 * é validação. E quando não há canal de envio configurado, o que aparece é
 * isso mesmo, com o telefone à frente — não um "obrigado" por cima de uma
 * mensagem que ninguém recebeu.
 */
export function Formulario() {
  const id = useId();
  const [estado, setEstado] = useState<Estado>("parado");
  const [erros, setErros] = useState<ErrosPorCampo>({});

  async function enviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const dados = new FormData(evento.currentTarget);
    const pedido = {
      nome: String(dados.get("nome") ?? ""),
      email: String(dados.get("email") ?? ""),
      telefone: String(dados.get("telefone") ?? ""),
      sectores: dados.getAll("sectores").map(String),
      mensagem: String(dados.get("mensagem") ?? ""),
      consentimento: dados.get("consentimento") === "on",
      empresa: String(dados.get("empresa") ?? ""),
    };

    const validado = esquemaPedido.safeParse(pedido);

    if (!validado.success) {
      setErros(errosPorCampo(validado.error));
      setEstado("invalido");
      return;
    }

    setErros({});
    setEstado("aEnviar");

    try {
      /* Com barra final, como todo o site: o `trailingSlash: true` do
         `next.config.ts` responde 308 a `/api/contacto` e o browser repete o
         `POST` no endereço certo. Funciona à mesma, mas custa uma ida e volta
         em cada envio — e é evitável escrevendo o endereço como ele é. */
      const resposta = await fetch("/api/contacto/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validado.data),
      });

      const corpo = (await resposta.json().catch(() => ({}))) as {
        estado?: Estado;
        erros?: ErrosPorCampo;
      };

      if (corpo.erros) setErros(corpo.erros);
      setEstado(corpo.estado ?? (resposta.ok ? "sucesso" : "erro"));
    } catch {
      /* Rede em baixo, ou o visitante ficou sem ligação a meio. */
      setEstado("erro");
    }
  }

  if (estado === "sucesso") {
    return (
      <Seccao terreno="papel" id="orcamento">
        <Medida>
          <Resultado estado="sucesso" />
        </Medida>
      </Seccao>
    );
  }

  const aEnviar = estado === "aEnviar";

  return (
    <Seccao terreno="papel" id="orcamento">
      <Medida>
        <p className="font-titulo text-chumbo text-[0.75rem] font-bold tracking-[0.16em] uppercase">
          {PEDIDO.antes}
        </p>
        <h2 className="text-cena font-titulo mt-2 max-w-[var(--medida-titulo)] font-extrabold">
          {PEDIDO.titulo}
        </h2>

        <p className="text-guia text-chumbo entra mt-8 sm:columns-2 sm:gap-14">
          {PEDIDO.paragrafos.join(" ")}
        </p>

        <form
          onSubmit={enviar}
          noValidate
          className="border-asfalto mt-[var(--espaco-bloco)] border-2 p-6 sm:p-10 lg:p-14"
        >
          <h3 className="font-titulo text-[1.25rem] font-bold">
            {FORMULARIO.titulo}
          </h3>

          {estado !== "parado" && estado !== "aEnviar" && (
            <div className="mt-8">
              <Resultado estado={estado} />
            </div>
          )}

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <Campo
              id={`${id}-nome`}
              nome="nome"
              rotulo={FORMULARIO.campos.nome.rotulo}
              tipo="text"
              autoComplete="name"
              erro={erros.nome}
            />
            <Campo
              id={`${id}-email`}
              nome="email"
              rotulo={FORMULARIO.campos.email.rotulo}
              tipo="email"
              autoComplete="email"
              erro={erros.email}
            />
            <Campo
              id={`${id}-telefone`}
              nome="telefone"
              rotulo={FORMULARIO.campos.telefone.rotulo}
              tipo="tel"
              autoComplete="tel"
              erro={erros.telefone}
            />
          </div>

          {/* As quatro caixas são os quatro sectores, com os mesmos valores do
              site actual. Um `fieldset` com `legend` e não um parágrafo solto:
              é o que faz um leitor de ecrã anunciar a pergunta antes de cada
              caixa em vez de as ler soltas. */}
          <fieldset className="mt-8">
            <legend className="font-titulo text-[0.9375rem] font-bold">
              {FORMULARIO.campos.sectores.rotulo}
            </legend>
            <p className="text-chumbo mt-1 text-[0.875rem]">
              {FORMULARIO.campos.sectores.ajuda}
            </p>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {SECTORES.map((sector) => (
                <label
                  key={sector.href}
                  className="border-asfalto/15 hover:border-asfalto flex cursor-pointer items-center gap-3 border p-3 text-[0.9375rem] [transition:border-color_160ms_ease]"
                >
                  <input
                    type="checkbox"
                    name="sectores"
                    value={sector.nome}
                    className="accent-amarelo size-4"
                  />
                  {sector.nome}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-8">
            <Rotulo para={`${id}-mensagem`}>
              {FORMULARIO.campos.mensagem.rotulo}
            </Rotulo>
            <p className="text-chumbo mt-1 text-[0.875rem]">
              {FORMULARIO.campos.mensagem.ajuda}
            </p>
            <textarea
              id={`${id}-mensagem`}
              name="mensagem"
              rows={6}
              required
              aria-invalid={erros.mensagem ? true : undefined}
              aria-describedby={erros.mensagem ? `${id}-mensagem-erro` : undefined}
              className="border-asfalto/25 focus:border-asfalto mt-3 block w-full border bg-transparent px-4 py-3 text-[1.0625rem] [transition:border-color_160ms_ease]"
            />
            {erros.mensagem && <Erro id={`${id}-mensagem-erro`}>{erros.mensagem}</Erro>}
          </div>

          {/* O engodo. Escondido de quem vê e de quem ouve, e fora da ordem do
              teclado — quem chega aqui é um robô que preenche tudo o que
              encontra. Não é `display: none`: há robôs que ignoram campos não
              renderizados. */}
          <div className="absolute left-[-9999px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor={`${id}-empresa`}>Empresa</label>
            <input
              id={`${id}-empresa`}
              name="empresa"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label className="mt-8 flex cursor-pointer items-start gap-3 text-[0.9375rem] leading-snug">
            <input
              type="checkbox"
              name="consentimento"
              required
              aria-invalid={erros.consentimento ? true : undefined}
              className="accent-amarelo mt-0.5 size-4 shrink-0"
            />
            {FORMULARIO.consentimento}
          </label>
          {erros.consentimento && <Erro>{erros.consentimento}</Erro>}

          <div className="mt-8">
            <Botao tipo="submit">
              {aEnviar ? FORMULARIO.aEnviar : FORMULARIO.enviar}
            </Botao>
          </div>
        </form>
      </Medida>
    </Seccao>
  );
}

function Rotulo({ para, children }: { para: string; children: React.ReactNode }) {
  return (
    <label htmlFor={para} className="font-titulo block text-[0.9375rem] font-bold">
      {children}
    </label>
  );
}

function Campo({
  id,
  nome,
  rotulo,
  tipo,
  autoComplete,
  erro,
}: {
  id: string;
  nome: string;
  rotulo: string;
  tipo: "text" | "email" | "tel";
  autoComplete: string;
  erro?: string;
}) {
  return (
    <div>
      <Rotulo para={id}>{rotulo}</Rotulo>
      <input
        id={id}
        name={nome}
        type={tipo}
        required
        autoComplete={autoComplete}
        aria-invalid={erro ? true : undefined}
        aria-describedby={erro ? `${id}-erro` : undefined}
        className="border-asfalto/25 focus:border-asfalto mt-3 block w-full border bg-transparent px-4 py-3 text-[1.0625rem] [transition:border-color_160ms_ease]"
      />
      {erro && <Erro id={`${id}-erro`}>{erro}</Erro>}
    </div>
  );
}

/**
 * A mensagem de erro de um campo.
 *
 * A cor é `chumbo` e não vermelho, e o erro leva sempre o ícone `errado` à
 * frente: a paleta tem seis valores e nenhum é vermelho, e um erro assinalado
 * só pela cor não chega a quem não a distingue.
 */
function Erro({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <p
      id={id}
      className="text-chumbo mt-2 flex items-center gap-2 text-[0.875rem]"
    >
      <Icone nome="errado" className="size-3.5 shrink-0 stroke-[2.5]" />
      {children}
    </p>
  );
}

/**
 * O desfecho do envio.
 *
 * Os três que não são sucesso trazem o telefone e o email à frente — porque em
 * todos eles a mensagem **não** seguiu, e dizê-lo sem dar a alternativa era
 * deixar a pessoa sem caminho nenhum.
 *
 * `role="status"` e `aria-live`: quem não vê a página tem de saber que alguma
 * coisa mudou depois de carregar em Enviar.
 */
function Resultado({ estado }: { estado: keyof typeof FORMULARIO.estados }) {
  const { titulo, texto } = FORMULARIO.estados[estado];
  const correu = estado === "sucesso";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`border-2 p-6 ${correu ? "border-amarelo bg-amarelo/10" : "border-asfalto/25"}`}
    >
      <p className="font-titulo flex items-center gap-3 text-[1.0625rem] font-bold">
        <Icone
          nome={correu ? "certo" : "errado"}
          className={`size-5 shrink-0 stroke-[2.5] ${correu ? "text-amarelo" : "text-chumbo"}`}
        />
        {titulo}
      </p>
      <p className="text-chumbo mt-2 text-[0.9375rem] leading-relaxed">{texto}</p>

      {!correu && (
        <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <a href={telefoneHref} className="font-titulo font-bold underline">
            {site.telefone}
          </a>
          <a href={emailHref} className="font-titulo font-bold underline">
            {site.email}
          </a>
        </p>
      )}
    </div>
  );
}
