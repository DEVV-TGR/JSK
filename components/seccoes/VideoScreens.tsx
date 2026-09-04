import { Envolvente } from "@/components/ui/Envolvente";
import { Olho } from "@/components/ui/Olho";
import { INTRO_SCREENS } from "@/lib/conteudo/paginas";

/**
 * A apresentação dos screens LED, com a demonstração em vídeo.
 *
 * O vídeo do site antigo tem `autoplay loop controls muted` e nenhum poster —
 * o bloco fica preto até alguém carregar em play.
 *
 * `preload="metadata"` faz o browser buscar só o cabeçalho do ficheiro e
 * desenhar o primeiro quadro. São uns KB, e evitam um rectângulo preto a
 * meio da página — que é como um bloco partido se parece. Um poster a sério
 * seria melhor ainda, mas gerá-lo precisa do ffmpeg; o comando está no fim de
 * `npm run assets`. Ver public/README.md.
 *
 * `playsInline` porque sem ele o Safari do iPhone abre o vídeo em ecrã
 * inteiro por conta própria assim que alguém lhe toca.
 */
export function VideoScreens() {
  return (
    <section className="bg-papel py-seccao">
      <Envolvente>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="revela lg:col-span-5">
            <Olho>Comunicação visual</Olho>
            <h2 className="mt-5 text-beta">{INTRO_SCREENS.titulo}</h2>
            <p className="mt-6 max-w-medida text-tinta-suave">
              {INTRO_SCREENS.paragrafo}
            </p>

            <ul className="mt-8 flex flex-wrap gap-3">
              {INTRO_SCREENS.destaques.map((destaque) => (
                <li
                  key={destaque}
                  className="rounded-full border border-linha-forte px-4 py-2 text-nota font-medium"
                >
                  {destaque}
                </li>
              ))}
            </ul>
          </div>

          <div className="revela lg:col-span-7">
            <div className="overflow-hidden rounded-painel border border-linha bg-carvao shadow-2">
              <video
                controls
                muted
                loop
                playsInline
                preload="metadata"
                controlsList="nodownload"
                className="aspect-video w-full object-cover"
              >
                <source src="/screens/demo.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </Envolvente>
    </section>
  );
}
