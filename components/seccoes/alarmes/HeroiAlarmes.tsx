import { Botao } from "@/components/ui/Botao";
import { Icone } from "@/components/ui/Icone";
import { Medida, Seccao } from "@/components/ui/Seccao";
import { ENTRADA, SERVICOS, TITULO } from "@/lib/conteudo/alarmes";
import { BANDA_ORCAMENTO, ORCAMENTO } from "@/lib/conteudo/comum";
import { telefoneHref } from "@/lib/site";

/**
 * A chapa de título da `/alarmes/`.
 *
 * O herói do site actual é o `banner-alarmes.jpg` de bordo a bordo. Aqui não
 * entra fotografia nenhuma, pela mesma razão da homepage: a gramática deste
 * site diz que o primeiro ecrã é uma chapa de sinalização, e uma chapa carrega
 * no primeiro fotograma. A fotografia da JSK Alarmes está na galeria, que é
 * onde ela prova alguma coisa.
 *
 * O nome parte-se em duas linhas de propósito. Cabia numa só — mas um sinal de
 * trânsito com duas linhas é mais alto, e a altura é o que aqui faz o efeito de
 * escala. Continua a ser um `<h1>` com o texto `JSK Alarmes`: os `<span>` são
 * disposição, e um leitor de ecrã lê-os como uma frase só.
 */
export function HeroiAlarmes() {
  const linhas = TITULO.split(" ");

  return (
    <Seccao terreno="asfalto" topo={false} className="relative">
      <Medida className="afasta flex min-h-[max(30rem,calc(100svh-4.5rem))] flex-col justify-center py-20">
        <h1 className="monta text-chapa font-titulo font-extrabold">
          {linhas.map((linha, indice) => (
            <span
              key={linha}
              className="block"
              style={{ "--i": indice } as React.CSSProperties}
            >
              {linha}
            </span>
          ))}
        </h1>

        <p
          className="entra text-guia text-grafite mt-8 max-w-[42ch]"
          style={{ "--i": 2 } as React.CSSProperties}
        >
          {ENTRADA}
        </p>

        <div
          className="entra mt-10 flex flex-wrap gap-4"
          style={{ "--i": 3 } as React.CSSProperties}
        >
          <Botao href={ORCAMENTO.href}>{ORCAMENTO.texto}</Botao>
          <Botao href={telefoneHref} aspecto="risco-claro">
            <Icone nome="telefone" className="size-5" />
            {BANDA_ORCAMENTO.chamada}
          </Botao>
        </div>

        {/* A placa suplementar: o que a página vai dizer, dito já.

            Não é um eyebrow — está por baixo do título, não por cima — nem um
            contador de secção. São os quatro nomes de serviço, os mesmos que o
            painel abre a seguir, para que o primeiro ecrã diga o que a empresa
            faz sem precisar de uma fotografia para o dizer. */}
        <ul
          className="border-betao mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t pt-6"
          aria-label="Serviços"
        >
          {SERVICOS.itens.map((servico, indice) => (
            <li
              key={servico.titulo}
              className="entra text-grafite flex items-center gap-2.5 text-[0.8125rem] tracking-[0.06em]"
              style={{ "--i": 4 + indice } as React.CSSProperties}
            >
              <Icone
                nome={servico.icone}
                className="text-amarelo size-4"
              />
              {servico.titulo}
            </li>
          ))}
        </ul>
      </Medida>
    </Seccao>
  );
}
