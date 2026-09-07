"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { Icone } from "@/components/ui/Icone";
import { AJUDA, RAMOS, type Pergunta, type Ramo } from "@/lib/conteudo/ajuda";
import { telefoneHref, whatsappCom, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utilitarios";

/**
 * O painel de ajuda: um chat sem chat.
 *
 * Tem a forma dos assistentes que toda a gente já sabe usar — bolha no canto,
 * painel que abre, perguntas que se carregam — e **não tem modelo nenhum por
 * trás**. As perguntas são finitas, as respostas estão escritas em
 * `lib/conteudo/ajuda.ts`, e cada uma sai de texto que já está no site. Não há
 * pedido à rede, não há inferência, não há nada que possa responder uma coisa
 * hoje e outra amanhã.
 *
 * O que ele resolve: jsk.pt não tem forma nenhuma de tirar uma dúvida sem ser
 * a preencher o formulário e esperar. Quem quer saber se a JSK faz
 * videovigilância tem de encontrar a resposta sozinho no meio de nove páginas.
 *
 * ## Onde ele admite os limites
 *
 * Debaixo de cada resposta está `Isto respondeu à sua dúvida?`, e o `Não` leva
 * ao WhatsApp, ao telefone e ao formulário — com a pergunta já escrita na
 * mensagem. Um painel de perguntas frequentes que não tenha saída é uma
 * parede: as seis perguntas mais frequentes de todas (preço, prazo, zona,
 * garantia, mensalidade, horário) **não têm resposta em jsk.pt** e por isso não
 * estão lá dentro. O escape é o que impede que isso seja um beco.
 *
 * ## É um componente de cliente, e é o terceiro
 *
 * Os outros são a `NavegacaoSectores`, que precisa do caminho actual, e o
 * `Formulario`, que precisa de estado. Este precisa de estado também: em que
 * ecrã vai. Não contradiz o `docs/movimento.md` — o que lá está escrito é que
 * **o movimento** é CSS e não há JavaScript de animação. Uma máquina de três
 * ecrãs não é movimento.
 *
 * ## Não guarda nada, e é de propósito
 *
 * Sem cookies, sem `localStorage`, sem `sessionStorage`. O estado vive em
 * memória e desaparece ao recarregar. É a decisão 7 do
 * `docs/decisoes-pendentes.md`: este site não põe um único registo no browser
 * de ninguém, e é a única posição totalmente limpa em RGPD que ele tem. Um
 * histórico de conversa guardado valeria pouco e custava o banner de
 * consentimento à totalidade do site.
 *
 * ## Foco em vez de `aria-live`
 *
 * A troca de ecrã move o foco para o título do ecrã novo, e **não** há região
 * `aria-live`. As duas coisas juntas são um erro conhecido: o leitor de ecrã
 * anuncia a alteração da região viva *e* o elemento que recebeu o foco, e a
 * pessoa ouve o mesmo texto duas vezes. Aqui o conteúdo novo aparece como
 * resposta directa a um clique — é síncrono com o gesto de quem o pediu — e
 * nesse caso a gestão de foco é a forma correcta. Também resolve o problema
 * prático de o botão que se carregou desaparecer do DOM: sem isto, o foco
 * caía no `<body>` e a navegação por teclado recomeçava do princípio.
 */

type Ecra =
  | { nome: "ramos" }
  | { nome: "perguntas"; ramo: Ramo }
  | { nome: "resposta"; ramo: Ramo; pergunta: Pergunta }
  /* `pergunta` é `null` quando se chega aqui pelo atalho do rodapé do painel,
     sem ter passado por pergunta nenhuma. */
  | { nome: "falar"; pergunta: Pergunta | null };

/* As classes das opções. Contorno, como o `Botao aspecto="risco-claro"`.

   O `transition` declara as três propriedades **por nome**. Nunca `all`: uma
   regra que declare `all` apanha propriedades que ninguém quis animar, e uma
   que declare de menos descarta em silêncio o que se quis.

   O `hover:` é seguro em qualquer sítio deste projecto porque o
   `app/globals.css` redefine a variante inteira dentro de
   `@media (hover: hover) and (pointer: fine)` — sem isso, um toque no
   telemóvel deixava o estado preso até ao toque seguinte. */
const OPCAO = cn(
  "flex w-full cursor-pointer items-center gap-3 rounded-[2px] px-4 py-3 text-left",
  "border-papel/25 border",
  "text-[0.9375rem] leading-snug",
  "hover:border-amarelo hover:text-amarelo",
  "[transition:border-color_160ms_ease,color_160ms_ease]",
);

export function Ajuda() {
  const idPainel = useId();
  const [aberto, setAberto] = useState(false);
  const [ecra, setEcra] = useState<Ecra>({ nome: "ramos" });

  const gatilho = useRef<HTMLButtonElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const titulo = useRef<HTMLParagraphElement>(null);

  const fechar = useCallback(() => {
    setAberto(false);
    /* Volta ao princípio. Quem fecha a meio de uma resposta e reabre não quer
       continuar de onde ficou — quer perguntar outra coisa. E é coerente com
       não guardar nada: o painel não tem memória em lado nenhum. */
    setEcra({ nome: "ramos" });
    gatilho.current?.focus();
  }, []);

  /* O foco entra no painel ao abrir e segue o título a cada troca de ecrã.
     Ver a nota do cabeçalho sobre porque não há `aria-live`. */
  useEffect(() => {
    if (aberto) titulo.current?.focus();
  }, [aberto, ecra]);

  /* `Escape` fecha, de qualquer sítio dentro ou fora do painel. */
  useEffect(() => {
    if (!aberto) return;

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") fechar();
    }

    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto, fechar]);

  /* Carregar fora fecha. O `pointerdown` e não o `click`: num rato, o `click`
     só dispara ao soltar, e arrastar uma selecção de texto de dentro do painel
     para fora fechava-o a meio do gesto. */
  useEffect(() => {
    if (!aberto) return;

    function aoCarregar(evento: PointerEvent) {
      const alvo = evento.target as Node;
      if (painel.current?.contains(alvo)) return;
      if (gatilho.current?.contains(alvo)) return;
      /* Sem `gatilho.current?.focus()` aqui: quem carregou noutro sítio da
         página quer ir para lá, e não que o foco lhe salte para trás. */
      setAberto(false);
      setEcra({ nome: "ramos" });
    }

    document.addEventListener("pointerdown", aoCarregar);
    return () => document.removeEventListener("pointerdown", aoCarregar);
  }, [aberto]);

  const perguntaActual = ecra.nome === "resposta" ? ecra.pergunta : null;

  return (
    <>
      {aberto && (
        <div
          ref={painel}
          id={idPainel}
          role="dialog"
          aria-label={AJUDA.titulo}
          className={cn(
            /* `z-50`, abaixo do `z-100` do «Saltar para o conteúdo». Esse tem
               de continuar a ser o primeiro focável da página. */
            "fixed right-4 bottom-[5.25rem] left-4 z-50 sm:left-auto sm:w-[23.5rem]",
            "bg-betao border-papel/15 flex flex-col rounded-[2px] border",
            "shadow-[0_1.5rem_3rem_rgba(0,0,0,0.55)]",
            /* `dvh` e não `vh`: no iPhone a barra do Safari entra e sai, e com
               `vh` o rodapé do painel ficava por baixo dela. */
            "max-h-[min(30rem,calc(100dvh-9rem))]",
            "ajuda-entra",
          )}
        >
          <Cabeca ecra={ecra} aoFechar={fechar} />

          <div className="overscroll-contain px-5 pb-5 [scrollbar-width:thin] overflow-y-auto">
            <Corpo ecra={ecra} refTitulo={titulo} irPara={setEcra} />
          </div>

          {/* O atalho vive fora do corpo e está sempre lá. Quem já sabe que
              quer falar com uma pessoa não tem de percorrer perguntas até
              chegar ao fim de uma. */}
          {ecra.nome !== "falar" && (
            <div className="border-papel/15 border-t px-5 py-3">
              <button
                type="button"
                onClick={() =>
                  setEcra({ nome: "falar", pergunta: perguntaActual })
                }
                className={cn(
                  "font-titulo flex cursor-pointer items-center gap-2 text-[0.75rem] font-bold tracking-[0.14em] uppercase",
                  "hover:text-amarelo [transition:color_160ms_ease]",
                )}
              >
                <Icone nome="telefone" className="size-3.5" />
                {AJUDA.atalho}
              </button>
            </div>
          )}
        </div>
      )}

      <button
        ref={gatilho}
        type="button"
        onClick={() => (aberto ? fechar() : setAberto(true))}
        aria-expanded={aberto}
        aria-controls={idPainel}
        aria-label={aberto ? AJUDA.fechar : AJUDA.abrir}
        title={aberto ? AJUDA.fechar : AJUDA.abrir}
        /* Preto com filete amarelo, e **não** a `.chapa` amarela.

           Duas razões, e as duas apareceram a olhar para o site a andar:

           1. **A banda de orçamento é amarela.** Um botão fixo em `.chapa`
              desaparecia dentro dela — ficava um ícone a flutuar sobre amarelo,
              sem forma. Preto separa-se do amarelo e do asfalto, que são os
              dois únicos terrenos que este site tem.
           2. **O amarelo é o apelo à acção.** É a cor do `Peça um Orçamento
              Gratuito`, que é o único ponto de conversão do site. Um botão de
              ajuda com a mesma cor competia com ele em todos os ecrãs.

           O `hover` inverte para a chapa: é o mesmo par de cores ao contrário,
           13.3:1 nos dois sentidos. */
        className={cn(
          "fixed right-4 bottom-4 z-50 size-14 cursor-pointer",
          "bg-asfalto text-amarelo flex items-center justify-center rounded-[2px]",
          "shadow-[inset_0_0_0_2px_currentColor]",
          "hover:bg-amarelo hover:text-asfalto",
          "[transition:background-color_180ms_ease,color_180ms_ease]",
        )}
      >
        <Icone nome={aberto ? "errado" : "balao"} className="size-7" />
      </button>
    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   A cabeça: o título do ecrã e o botão de fechar
   ═══════════════════════════════════════════════════════════════════════════ */

function Cabeca({ ecra, aoFechar }: { ecra: Ecra; aoFechar: () => void }) {
  /* Dentro de um ramo, a cabeça diz qual — senão, três ecrãs abaixo já não se
     sabe se as perguntas são de alarmes ou de obras. */
  const onde =
    ecra.nome === "perguntas" || ecra.nome === "resposta"
      ? ecra.ramo.nome
      : AJUDA.titulo;

  return (
    <div className="border-papel/15 flex items-center justify-between gap-3 border-b px-5 py-4">
      <p className="font-titulo text-[0.75rem] font-bold tracking-[0.14em] uppercase">
        {onde}
      </p>

      <button
        type="button"
        onClick={aoFechar}
        aria-label={AJUDA.fechar}
        className={cn(
          "-mr-1 cursor-pointer p-1",
          "hover:text-amarelo [transition:color_160ms_ease]",
        )}
      >
        <Icone nome="errado" className="size-5" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   O corpo: os quatro ecrãs
   ═══════════════════════════════════════════════════════════════════════════ */

function Corpo({
  ecra,
  refTitulo,
  irPara,
}: {
  ecra: Ecra;
  refTitulo: React.RefObject<HTMLParagraphElement | null>;
  irPara: (ecra: Ecra) => void;
}) {
  /* O `tabIndex={-1}` é o que torna o título focável por código sem o pôr na
     ordem de tabulação. É para aqui que o foco salta a cada troca de ecrã. */
  const tituloProps = {
    ref: refTitulo,
    tabIndex: -1,
    className: "text-[1rem] leading-snug font-medium outline-none",
  };

  if (ecra.nome === "ramos") {
    return (
      <div className="pt-5">
        <p {...tituloProps}>{AJUDA.saudacao}</p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {RAMOS.map((ramo) => (
            <button
              key={ramo.id}
              type="button"
              onClick={() => irPara({ nome: "perguntas", ramo })}
              className={cn(OPCAO, "gap-2.5")}
            >
              <Icone nome={ramo.icone} className="size-5" />
              {ramo.nome}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (ecra.nome === "perguntas") {
    return (
      <div className="pt-5">
        <Voltar aoVoltar={() => irPara({ nome: "ramos" })} />
        <p {...tituloProps}>{AJUDA.escolhaPergunta}</p>

        <div className="mt-4 grid gap-2">
          {ecra.ramo.perguntas.map((pergunta) => (
            <button
              key={pergunta.pergunta}
              type="button"
              onClick={() =>
                irPara({ nome: "resposta", ramo: ecra.ramo, pergunta })
              }
              className={OPCAO}
            >
              {pergunta.pergunta}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (ecra.nome === "resposta") {
    const { pergunta, ramo } = ecra;

    return (
      <div className="pt-5">
        <Voltar aoVoltar={() => irPara({ nome: "perguntas", ramo })} />
        <p {...tituloProps}>{pergunta.pergunta}</p>

        {/* A resposta. O `papel/85` fica de fora de propósito: a opacidade come
            o contraste e não aparece em tabela nenhuma — um texto que passa a
            cheio pode reprovar a `.85`. Aqui é `cal`, que é um valor da paleta
            e é medível. */}
        <div className="text-cal mt-3 grid gap-2.5 text-[0.9375rem] leading-relaxed">
          {pergunta.resposta.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}

          {pergunta.lista && (
            <ul className="mt-1 grid gap-2">
              {pergunta.lista.map((ponto) => (
                <li key={ponto} className="flex gap-2.5">
                  <Icone
                    nome="certo"
                    className="text-amarelo mt-0.5 size-4 shrink-0"
                  />
                  <span>{ponto}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {pergunta.leiaMais && <LeiaMais {...pergunta.leiaMais} />}

        <div className="border-papel/15 mt-5 border-t pt-4">
          <p className="text-[0.9375rem]">{AJUDA.confirmacao}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => irPara({ nome: "ramos" })}
              className={cn(OPCAO, "w-auto px-4 py-2.5")}
            >
              {AJUDA.respondeu}
            </button>

            <button
              type="button"
              onClick={() => irPara({ nome: "falar", pergunta })}
              className={cn(
                "chapa hover:bg-papel cursor-pointer px-4 py-2.5",
                "font-titulo text-[0.8125rem] font-bold tracking-[0.06em] uppercase",
                "[transition:background-color_180ms_ease]",
              )}
            >
              {AJUDA.naoRespondeu}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* `falar` — o escape. */
  return (
    <div className="pt-5">
      <Voltar aoVoltar={() => irPara({ nome: "ramos" })} />
      <p {...tituloProps}>{AJUDA.falar.titulo}</p>

      <p className="text-cal mt-2 text-[0.9375rem] leading-relaxed">
        {AJUDA.falar.texto}
      </p>

      <div className="mt-4 grid gap-2">
        {/* O WhatsApp leva a pergunta escrita na caixa de texto. Sem isso, a
            conversa abre em branco, a pessoa repete o que já tinha carregado, e
            quem recebe não sabe de onde veio o contacto.

            Não leva o verde da marca: a paleta deste site tem seis valores e
            nenhum deles é verde. Acrescentar um sétimo por causa de um botão
            partia o sistema — é a mesma decisão que pôs as desvantagens da
            `/screens-led/` a cinzento em vez de a vermelho. */}
        <a
          href={
            ecra.pergunta ? whatsappCom(ecra.pergunta.pergunta) : whatsappHref
          }
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "chapa hover:bg-papel flex items-center justify-center gap-2.5 px-4 py-3",
            "font-titulo text-[0.875rem] font-bold tracking-[0.06em] uppercase",
            "[transition:background-color_180ms_ease]",
          )}
        >
          <Icone nome="whatsapp" preenchido className="size-5" />
          {AJUDA.falar.whatsapp}
        </a>

        <a href={telefoneHref} className={cn(OPCAO, "justify-center")}>
          <Icone nome="telefone" className="size-5" />
          {AJUDA.falar.telefone}
        </a>

        <Link href="/contactos/" className={cn(OPCAO, "justify-center")}>
          <Icone nome="correio" className="size-5" />
          {AJUDA.falar.formulario}
        </Link>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   Duas peças pequenas
   ═══════════════════════════════════════════════════════════════════════════ */

function Voltar({ aoVoltar }: { aoVoltar: () => void }) {
  return (
    <button
      type="button"
      onClick={aoVoltar}
      className={cn(
        "text-grafite mb-3 flex cursor-pointer items-center gap-1.5",
        "font-titulo text-[0.75rem] font-bold tracking-[0.14em] uppercase",
        "hover:text-amarelo [transition:color_160ms_ease]",
      )}
    >
      {/* A seta aponta para a direita no ficheiro; aqui vai ao contrário. */}
      <Icone nome="seta" className="size-3.5 rotate-180" />
      {AJUDA.voltar}
    </button>
  );
}

function LeiaMais({
  texto,
  href,
  externo,
}: {
  texto: string;
  href: string;
  externo?: boolean;
}) {
  const classes = cn(
    "text-amarelo mt-4 inline-flex items-center gap-2",
    "font-titulo text-[0.8125rem] font-bold tracking-[0.06em] uppercase",
    "underline decoration-2 underline-offset-4",
  );

  /* Sem `noopener`, a página que abre fica com uma referência para esta em
     `window.opener` e pode reescrever-lhe o endereço — defeito #34. */
  if (externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {texto}
        <Icone nome="seta" className="size-3.5" />
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {texto}
      <Icone nome="seta" className="size-3.5" />
    </Link>
  );
}
