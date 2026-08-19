"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { NAVEGACAO } from "@/lib/conteudo/sectores";
import { site, telefoneHref } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * O cabeçalho do site.
 *
 * **Uma árvore de DOM, não duas.** O site antigo tem o `#ast-desktop-header` e
 * o `#ast-mobile-header` os dois no HTML, cada um com a sua cópia completa da
 * navegação, e alterna entre eles com `display: none` aos 921px. Isso quer
 * dizer que cada página serve a navegação duas vezes, que um leitor de ecrã
 * pode encontrar as duas, e que uma alteração feita numa pode não chegar à
 * outra.
 *
 * Aqui há uma lista de links. Em ecrã largo é uma barra; em ecrã estreito vive
 * dentro de um `<dialog>`.
 */
export function Cabecalho() {
  const [preso, setPreso] = useState(false);
  const [aberto, setAberto] = useState(false);
  const sentinela = useRef<HTMLDivElement>(null);
  const dialogo = useRef<HTMLDialogElement>(null);
  const caminho = usePathname();

  /* O estado "já se fez scroll" vem de um observador sobre um elemento de 1px
     no topo da página, não de um listener de `scroll`. Um listener dispara
     dezenas de vezes por segundo e obriga o browser a recalcular a página em
     cada uma — é o que a página /web/ do site antigo faz, sem throttle e sem
     `requestAnimationFrame`. */
  useEffect(() => {
    const alvo = sentinela.current;
    if (!alvo) return;
    const observador = new IntersectionObserver(
      ([entrada]) => setPreso(!entrada.isIntersecting),
      { rootMargin: "-24px 0px 0px 0px" },
    );
    observador.observe(alvo);
    return () => observador.disconnect();
  }, []);

  /* Navegar fecha o menu. Sem isto, seguir um link deixava o painel aberto por
     cima da página nova. */
  useEffect(() => {
    setAberto(false);
  }, [caminho]);

  useEffect(() => {
    const elemento = dialogo.current;
    if (!elemento) return;
    if (aberto && !elemento.open) elemento.showModal();
    if (!aberto && elemento.open) elemento.close();
  }, [aberto]);

  return (
    <>
      <div ref={sentinela} aria-hidden className="absolute top-0 h-px w-full" />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40",
          "transition-[background-color,box-shadow] duration-300 ease-saida",
          preso ? "bg-carvao/95 shadow-2 backdrop-blur-sm" : "bg-transparent",
        )}
      >
        <div className="envolvente flex h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0 rounded-botao"
            aria-label={`${site.nome} — início`}
          >
            <Image
              src="/marca/logo.webp"
              alt=""
              width={420}
              height={330}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAVEGACAO.map((item) => (
                <li key={item.rota}>
                  <LigacaoNav rota={item.rota} activa={caminho === item.rota}>
                    {item.nome}
                  </LigacaoNav>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden shrink-0 lg:block">
            <Botao href="/contactos/" icone="setaDireita">
              Peça um Orçamento
            </Botao>
          </div>

          <button
            type="button"
            onClick={() => setAberto(true)}
            className="premivel -mr-2 grid size-12 place-items-center rounded-botao text-papel lg:hidden"
            aria-label="Abrir o menu"
            aria-expanded={aberto}
          >
            <Icone nome="menu" />
          </button>
        </div>
      </header>

      <MenuMovel
        ref={dialogo}
        caminho={caminho}
        aoFechar={() => setAberto(false)}
      />
    </>
  );
}

function LigacaoNav({
  rota,
  activa,
  children,
}: {
  rota: string;
  activa: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={rota}
      aria-current={activa ? "page" : undefined}
      className="group relative block px-3 py-2 text-nota font-medium text-papel"
    >
      {children}
      {/* O sublinhado cresce da esquerda, com `transform`. O tema antigo faz o
          item inteiro deslizar para cima — mexe na altura da linha e empurra
          os vizinhos. */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-x-3 bottom-1 h-0.5 origin-left bg-amarelo",
          "transition-transform duration-200 ease-saida",
          activa ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
        )}
      />
    </Link>
  );
}

function MenuMovel({
  ref,
  caminho,
  aoFechar,
}: {
  ref: React.RefObject<HTMLDialogElement | null>;
  caminho: string;
  aoFechar: () => void;
}) {
  return (
    <dialog
      ref={ref}
      onClose={aoFechar}
      /* O `<dialog>` nativo trata do foco preso, do Escape e da inertização do
         resto da página. Um painel feito à mão com um `div` precisa de tudo
         isso escrito de raiz, e é quase sempre onde se esquece uma peça. */
      className="painel-movel m-0 h-full max-h-none w-full max-w-none bg-carvao p-0 text-papel lg:hidden"
    >
      <div className="envolvente flex h-20 items-center justify-end">
        <button
          type="button"
          onClick={aoFechar}
          className="premivel -mr-2 grid size-12 place-items-center rounded-botao"
          aria-label="Fechar o menu"
        >
          <Icone nome="cruz" />
        </button>
      </div>

      <nav aria-label="Principal" className="envolvente pt-8">
        <ul className="flex flex-col">
          {NAVEGACAO.map((item) => (
            <li key={item.rota} className="border-b border-papel/12">
              <Link
                href={item.rota}
                aria-current={caminho === item.rota ? "page" : undefined}
                className={cn(
                  "block py-5 font-titulo text-gama font-semibold",
                  caminho === item.rota && "text-amarelo",
                )}
              >
                {item.nome}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-3">
          <Botao href="/contactos/" icone="setaDireita">
            Peça um Orçamento Gratuito
          </Botao>
          <Botao href={telefoneHref} variante="sobreTinta" icone="telefone">
            {site.telefone}
          </Botao>
        </div>
      </nav>
    </dialog>
  );
}
