"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";

import { Botao } from "@/components/ui/Botao";
import { Campo, CampoTexto } from "@/components/ui/Campo";
import { Icone } from "@/components/ui/Icone";
import {
  ROTA_CONTACTO,
  SERVICOS_DISPONIVEIS,
  TEXTO_CONSENTIMENTO,
  esquemaContacto,
} from "@/lib/contacto";
import { emailHref, site, telefoneHref } from "@/lib/site";
import { cn } from "@/lib/utils";

type Erros = Partial<Record<string, string>>;
type Estado =
  | { tipo: "parado" }
  | { tipo: "a-enviar" }
  | { tipo: "entregue" }
  | { tipo: "indisponivel" }
  | { tipo: "falhou" };

/**
 * O formulário de pedido de orçamento.
 *
 * Os mesmos campos do Contact Form 7 do site antigo, com três diferenças que
 * não são de desenho:
 *
 * - **Etiquetas visíveis.** Lá os campos são só `placeholder`: um leitor de
 *   ecrã anuncia "caixa de texto" e mais nada, e o texto desaparece assim que
 *   se começa a escrever — quem estiver a rever o que preencheu já não sabe o
 *   que era cada caixa.
 * - **Consentimento.** O site antigo recolhe nome, email e telefone sem pedir
 *   autorização nenhuma, e tem uma política de privacidade que diz que a pede.
 * - **Nunca finge que enviou.** Enquanto a entrega não estiver ligada, a
 *   resposta é honesta e mostra o telefone e o email.
 */
export function FormularioContacto({ className }: { className?: string }) {
  const id = useId();
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<Estado>({ tipo: "parado" });
  const formulario = useRef<HTMLFormElement>(null);

  async function submeter(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);

    const candidato = {
      nome: String(dados.get("nome") ?? ""),
      email: String(dados.get("email") ?? ""),
      telefone: String(dados.get("telefone") ?? ""),
      servicos: dados.getAll("servicos").map(String),
      mensagem: String(dados.get("mensagem") ?? ""),
      consentimento: dados.get("consentimento") === "sim",
      empresa: String(dados.get("empresa") ?? ""),
    };

    const validado = esquemaContacto.safeParse(candidato);
    if (!validado.success) {
      const novos: Erros = {};
      for (const problema of validado.error.issues) {
        const campo = problema.path.join(".");
        novos[campo] ??= problema.message;
      }
      setErros(novos);
      setEstado({ tipo: "parado" });

      /* O foco vai para o primeiro campo com erro. Sem isto, quem navega com
         teclado ou leitor de ecrã fica no botão e tem de percorrer o
         formulário todo para descobrir o que está mal. */
      const primeiro = Object.keys(novos)[0];
      formulario.current
        ?.querySelector<HTMLElement>(`[name="${primeiro}"]`)
        ?.focus();
      return;
    }

    setErros({});
    setEstado({ tipo: "a-enviar" });

    try {
      const resposta = await fetch(ROTA_CONTACTO, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(validado.data),
      });

      if (resposta.ok) {
        setEstado({ tipo: "entregue" });
        formulario.current?.reset();
        return;
      }
      setEstado({ tipo: resposta.status === 503 ? "indisponivel" : "falhou" });
    } catch {
      setEstado({ tipo: "falhou" });
    }
  }

  if (estado.tipo === "entregue") {
    return (
      <div className={cn("rounded-cartao border border-linha bg-amarelo-veu p-8", className)}>
        <Icone nome="visto" className="size-8 text-ocre" />
        <h3 className="mt-4 text-delta font-titulo font-semibold">
          Recebemos o seu pedido
        </h3>
        <p className="mt-3 text-nota text-tinta-suave">
          Respondemos com a maior brevidade possível.
        </p>
      </div>
    );
  }

  return (
    <form ref={formulario} onSubmit={submeter} noValidate className={cn("flex flex-col gap-5", className)}>
      <Campo
        id={`${id}-nome`}
        name="nome"
        rotulo="Nome completo"
        autoComplete="name"
        maxLength={100}
        required
        erro={erros.nome}
      />
      <Campo
        id={`${id}-email`}
        name="email"
        type="email"
        rotulo="Email"
        autoComplete="email"
        maxLength={200}
        required
        erro={erros.email}
      />
      <Campo
        id={`${id}-telefone`}
        name="telefone"
        type="tel"
        rotulo="Telemóvel"
        autoComplete="tel"
        maxLength={30}
        required
        erro={erros.telefone}
      />

      <fieldset className="flex flex-col gap-3">
        <legend className="font-titulo text-nota font-semibold">
          Em que o podemos ajudar?
        </legend>
        <div className="flex flex-col gap-2">
          {SERVICOS_DISPONIVEIS.map((servico) => (
            <label key={servico} className="flex items-center gap-3 text-nota">
              <input
                type="checkbox"
                name="servicos"
                value={servico}
                className="size-[1.125rem] accent-tinta"
              />
              {servico}
            </label>
          ))}
        </div>
      </fieldset>

      <CampoTexto
        id={`${id}-mensagem`}
        name="mensagem"
        rotulo="Mensagem"
        maxLength={2000}
        required
        erro={erros.mensagem}
      />

      <div className="flex flex-col gap-2">
        <label className="flex items-start gap-3 text-nota">
          <input
            type="checkbox"
            name="consentimento"
            value="sim"
            aria-invalid={erros.consentimento ? true : undefined}
            className="mt-0.5 size-[1.125rem] shrink-0 accent-tinta"
          />
          <span>
            {TEXTO_CONSENTIMENTO.replace("Política de Privacidade.", "")}
            <Link href="/politica-de-privacidade/" className="text-ocre underline">
              Política de Privacidade
            </Link>
            .
          </span>
        </label>
        {erros.consentimento && (
          <p className="text-nota font-medium text-perigo">{erros.consentimento}</p>
        )}
      </div>

      {/* A armadilha. `aria-hidden` e `tabIndex={-1}` para que ninguém a
          encontre com o teclado nem com um leitor de ecrã; fora do ecrã em vez
          de `display: none`, porque há robôs que ignoram campos escondidos. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-empresa`}>Empresa</label>
        <input id={`${id}-empresa`} name="empresa" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-2">
        <Botao icone="setaDireita" type="submit" disabled={estado.tipo === "a-enviar"}>
          {estado.tipo === "a-enviar" ? "A enviar…" : "Enviar pedido"}
        </Botao>
      </div>

      <p aria-live="polite" className="sr-only">
        {estado.tipo === "a-enviar" ? "A enviar o pedido." : ""}
      </p>

      {(estado.tipo === "indisponivel" || estado.tipo === "falhou") && (
        <div role="alert" className="rounded-cartao border border-perigo/30 bg-perigo/5 p-6">
          <p className="font-titulo font-semibold">
            Não conseguimos enviar o seu pedido.
          </p>
          <p className="mt-2 text-nota text-tinta-suave">
            Pedimos desculpa. Fale connosco directamente — respondemos na mesma.
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-nota">
            <a href={telefoneHref} className="flex items-center gap-2 font-medium">
              <Icone nome="telefone" className="size-5 text-ocre" />
              {site.telefone}
            </a>
            <a href={emailHref} className="flex items-center gap-2 font-medium">
              <Icone nome="email" className="size-5 text-ocre" />
              {site.email}
            </a>
          </div>
        </div>
      )}
    </form>
  );
}
