import { ROTAS_PUBLICAS, site } from "@/lib/site";

/**
 * Página de espera da Fase 1.
 *
 * O esqueleto tem de compilar e responder antes de haver desenho, e é isso que
 * esta página prova. É substituída na Fase 6 pela homepage a sério.
 */
export default function Inicio() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-xs font-semibold uppercase tracking-[0.16em]">
        {site.tagline}
      </p>
      <h1 className="mt-4 text-5xl">{site.nome}</h1>
      <p className="mt-6 text-lg">{site.descricao}</p>

      <h2 className="mt-16 text-2xl">Rotas previstas</h2>
      <ul className="mt-4 space-y-1">
        {ROTAS_PUBLICAS.map((rota) => (
          <li key={rota}>
            <code>{rota}</code>
          </li>
        ))}
      </ul>
    </main>
  );
}
