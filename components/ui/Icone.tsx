import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Os ícones do site, desenhados aqui dentro.
 *
 * O site antigo carrega o Font Awesome **três vezes** — a v4.7 e a v5.15.3 que
 * o Elementor traz, mais a v6.0 que a página /web/ vai buscar ao cdnjs — e o
 * eicons duas. São cinco ficheiros de tipos, mais de 400 KB, e uma ligação a um
 * CDN de terceiros, para desenhar catorze símbolos.
 *
 * Estes são SVG inline: entram no HTML, não pedem nada a ninguém, herdam a cor
 * do texto e escalam com ele. Traço de 1,5px, cantos redondos, todos na mesma
 * grelha de 24 — para que ao lado uns dos outros pareçam da mesma mão.
 */

const SIMBOLOS = {
  /* ── Sectores ─────────────────────────────────────────────────────────── */
  escudo: <path d="M12 3 19 6v5c0 4.4-2.9 8.3-7 10-4.1-1.7-7-5.6-7-10V6l7-3Z" />,
  capacete: (
    <>
      <path d="M6 16v-3.5a6 6 0 0 1 12 0V16" />
      <path d="M10 7.7V5.6a2 2 0 1 1 4 0v2.1" />
      <path d="M3.6 16h16.8a1 1 0 0 1 1 1v.6a1.4 1.4 0 0 1-1.4 1.4H4a1.4 1.4 0 0 1-1.4-1.4V17a1 1 0 0 1 1-1Z" />
    </>
  ),
  ecra: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="1.8" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  codigo: <path d="m9 8-4 4 4 4M15 8l4 4-4 4" />,

  /* ── Contacto ─────────────────────────────────────────────────────────── */
  telefone: (
    <path d="M15.6 21A12.6 12.6 0 0 1 3 8.4 2.4 2.4 0 0 1 5.4 6h1.7a1 1 0 0 1 1 .8l.6 3a1 1 0 0 1-.5 1.1l-1.3.7a10 10 0 0 0 4.5 4.5l.7-1.3a1 1 0 0 1 1.1-.5l3 .6a1 1 0 0 1 .8 1v1.7A2.4 2.4 0 0 1 15.6 21Z" />
  ),
  email: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.8" />
      <path d="m3.8 7 7.2 5a1.7 1.7 0 0 0 2 0l7.2-5" />
    </>
  ),
  morada: (
    <>
      <path d="M12 21.2S19 15.4 19 10.4a7 7 0 1 0-14 0c0 5 7 10.8 7 10.8Z" />
      <circle cx="12" cy="10.2" r="2.5" />
    </>
  ),

  /* ── Diferenciais ─────────────────────────────────────────────────────── */
  certificado: (
    <>
      <circle cx="12" cy="8.8" r="5.3" />
      <path d="m8.4 13.2-1.3 7.6 4.9-2.5 4.9 2.5-1.3-7.6" />
    </>
  ),
  raio: <path d="M13.2 2.5 4.8 13.6H11l-.9 7.9 8.4-11.1H12Z" />,
  pessoas: (
    <>
      <circle cx="9" cy="7.6" r="3.6" />
      <path d="M2.6 20.2a6.4 6.4 0 0 1 12.8 0" />
      <path d="M16 4.4a3.6 3.6 0 0 1 0 6.9M17.4 14a6.4 6.4 0 0 1 4 6.2" />
    </>
  ),
  camadas: <path d="m12 3 9 4.6-9 4.6-9-4.6L12 3ZM3 12.4l9 4.6 9-4.6M3 16.9l9 4.6 9-4.6" />,
  chip: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="2" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
      <path d="M9.5 2.5V5m5-2.5V5m-5 14v2.5m5-2.5v2.5M2.5 9.5H5m-2.5 5H5m14-5h2.5m-2.5 5h2.5" />
    </>
  ),
  estrela: (
    <path d="m12 3.4 2.65 5.37 5.93.86-4.29 4.18 1.01 5.9L12 16.93l-5.3 2.78 1.01-5.9-4.29-4.18 5.93-.86Z" />
  ),

  /* ── Interface ────────────────────────────────────────────────────────── */
  visto: <path d="m4.5 12.4 5 5L19.5 7" />,
  cruz: <path d="m6.5 6.5 11 11m0-11-11 11" />,
  setaDireita: <path d="M4 12h15m-6-6 6 6-6 6" />,
  setaExterna: <path d="M8 16 18 6m-8 0h8v8" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  relogio: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <path d="M12 6.8V12l3.5 2.1" />
    </>
  ),
  alvo: (
    <>
      <circle cx="12" cy="12" r="8.8" />
      <circle cx="12" cy="12" r="4.6" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  olho: (
    <>
      <path d="M2.2 12S6 5.8 12 5.8 21.8 12 21.8 12 18 18.2 12 18.2 2.2 12 2.2 12Z" />
      <circle cx="12" cy="12" r="2.7" />
    </>
  ),
  paleta: (
    <>
      <path d="M12 3.2a8.8 8.8 0 1 0 0 17.6 1.7 1.7 0 0 0 1.7-1.7c0-.45-.18-.86-.47-1.16a1.63 1.63 0 0 1 1.17-2.77h2a4.4 4.4 0 0 0 4.4-4.4c0-4.2-3.94-7.57-8.8-7.57Z" />
      <circle cx="8.2" cy="9" r="1" />
      <circle cx="12" cy="7.2" r="1" />
      <circle cx="15.8" cy="9" r="1" />
    </>
  ),
  camara: (
    <>
      <path d="M4 7.4 17 4l1.9 6.6-13 3.4Z" />
      <path d="m6.4 13.8 1.5 5.3 3.5-1-1.4-4.9" />
      <path d="m18.9 10.6 2.6-.7M11.5 20.5h9.5" />
    </>
  ),
  chama: (
    <path d="M12 2.8s5.2 4.2 5.2 8.9a5.2 5.2 0 0 1-10.4 0C6.8 7 12 2.8 12 2.8Zm0 18.4a3 3 0 0 0 3-3c0-2-3-4.2-3-4.2s-3 2.2-3 4.2a3 3 0 0 0 3 3Z" />
  ),
} as const;

export type NomeIcone = keyof typeof SIMBOLOS;

/** As aspas são cheias, não traçadas — um traço fino com esta forma some-se. */
const CHEIOS: ReadonlySet<string> = new Set<NomeIcone>([]);

type Props = {
  nome: NomeIcone;
  className?: string;
  /**
   * O texto que um leitor de ecrã lê. Sem ele o ícone é decorativo e fica
   * escondido — que é o caso quando está ao lado de uma palavra que já diz a
   * mesma coisa.
   */
  rotulo?: string;
};

export function Icone({ nome, className, rotulo }: Props) {
  const simbolo: ReactNode = SIMBOLOS[nome];
  const cheio = CHEIOS.has(nome);

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-6 shrink-0", className)}
      fill={cheio ? "currentColor" : "none"}
      stroke={cheio ? "none" : "currentColor"}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={rotulo ? "img" : undefined}
      aria-label={rotulo}
      aria-hidden={rotulo ? undefined : true}
    >
      {simbolo}
    </svg>
  );
}
