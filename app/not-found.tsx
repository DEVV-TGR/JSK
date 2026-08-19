import type { Metadata } from "next";

import { Botao } from "@/components/ui/Botao";
import { Heroi } from "@/components/seccoes/Heroi";
import { Seccao } from "@/components/ui/Seccao";
import { SECTORES } from "@/lib/conteudo/sectores";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false },
};

export default function NaoEncontrada() {
  return (
    <>
      <Heroi
        titulo="Página não encontrada"
        subtitulo="A página que procura mudou de sítio ou nunca existiu. Estes são os caminhos mais prováveis."
        imagem="/heroi/institucional.webp"
        alt=""
      />
      <Seccao>
        <div className="flex flex-wrap gap-4">
          <Botao href="/" icone="setaDireita">
            Voltar ao início
          </Botao>
          {SECTORES.map((s) => (
            <Botao key={s.id} href={s.rota} variante="secundario">
              {s.nome}
            </Botao>
          ))}
        </div>
      </Seccao>
    </>
  );
}
