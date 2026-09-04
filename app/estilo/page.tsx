import { notFound } from "next/navigation";

import { Botao } from "@/components/ui/Botao";
import { Cartao } from "@/components/ui/Cartao";
import { Contador } from "@/components/ui/Contador";
import { Campo, CampoTexto } from "@/components/ui/Campo";
import { Icone, type NomeIcone } from "@/components/ui/Icone";
import { ListaVerificada } from "@/components/ui/ListaVerificada";
import { Olho } from "@/components/ui/Olho";
import { Seccao } from "@/components/ui/Seccao";
import { TituloSeccao } from "@/components/ui/TituloSeccao";

/**
 * O sistema de desenho todo numa página, para se ver de uma vez o que existe e
 * como se comporta lado a lado.
 *
 * Só em desenvolvimento. Em produção dá 404 — não é uma página do site e não
 * tem nada que apareça numa pesquisa.
 */
export default function Estilo() {
  if (process.env.NODE_ENV === "production") notFound();

  const cores = [
    ["amarelo", "bg-amarelo text-amarelo-tinta"],
    ["amarelo-claro", "bg-amarelo-claro text-tinta"],
    ["amarelo-veu", "bg-amarelo-veu text-tinta"],
    ["amarelo-fundo", "bg-amarelo-fundo text-tinta"],
    ["ocre", "bg-ocre text-papel"],
    ["tinta", "bg-tinta text-papel"],
    ["tinta-suave", "bg-tinta-suave text-papel"],
    ["carvao", "bg-carvao text-papel"],
    ["papel-fundo", "bg-papel-fundo text-tinta border border-linha"],
    ["linha", "bg-linha text-tinta"],
    ["linha-forte", "bg-linha-forte text-papel"],
    ["perigo", "bg-perigo text-papel"],
  ] as const;

  const icones: NomeIcone[] = [
    "escudo", "capacete", "ecra", "codigo", "telefone", "email", "morada",
    "certificado", "raio", "pessoas", "camadas", "chip", "estrela", "visto",
    "cruz", "setaDireita", "setaExterna", "menu", "relogio", "alvo", "olho",
    "paleta", "camara", "chama",
  ];

  return (
    <main>
      <Seccao>
        <Olho>Sistema de desenho</Olho>
        <h1 className="mt-5 text-alfa">JSK</h1>
        <p className="mt-5 max-w-medida text-tinta-suave">
          Os tokens e os primitivos, lado a lado. Se um valor não estiver aqui,
          não devia estar em lado nenhum.
        </p>
      </Seccao>

      <Seccao fundo="alternado" topo={false}>
        <TituloSeccao olho="Cor" titulo="A paleta" />
        <div className="mt-bloco grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {cores.map(([nome, classe]) => (
            <div key={nome} className={`rounded-cartao p-6 ${classe}`}>
              <span className="font-titulo text-nota font-semibold">{nome}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-medida text-nota text-tinta-suave">
          O amarelo é superfície e acento. Onde é preciso amarelo que se lê sobre
          papel, é o ocre. Os rácios estão verificados em{" "}
          <code>testes/contraste.test.ts</code>.
        </p>
      </Seccao>

      <Seccao>
        <TituloSeccao olho="Tipo" titulo="A escala" />
        <div className="mt-bloco flex flex-col gap-6">
          <p className="text-alfa">Alfa — título de herói</p>
          <p className="text-beta">Beta — título de secção</p>
          <p className="text-gama">Gama — subtítulo</p>
          <p className="text-delta font-titulo font-semibold">Delta — título de cartão</p>
          <p className="max-w-medida">
            Corpo — Na JSK, combinamos experiência técnica com criatividade para
            oferecer soluções completas em segurança, construção e comunicação
            visual.
          </p>
          <p className="text-nota text-tinta-suave">Nota — texto de apoio</p>
        </div>
      </Seccao>

      <Seccao fundo="alternado">
        <TituloSeccao olho="Acção" titulo="Botões" />
        <div className="mt-bloco flex flex-wrap items-center gap-4">
          <Botao href="/contactos/" icone="setaDireita">
            Peça um Orçamento Gratuito
          </Botao>
          <Botao href="/sobre-nos/" variante="secundario">
            Quem Somos
          </Botao>
          <Botao variante="fantasma">Fantasma</Botao>
          <Botao disabled>Desligado</Botao>
        </div>
        <div className="mt-6 rounded-cartao bg-carvao p-8">
          <Botao variante="sobreTinta" icone="telefone">
            Ligue-nos Agora
          </Botao>
        </div>
      </Seccao>

      <Seccao>
        <TituloSeccao olho="Símbolos" titulo="Ícones" />
        <div className="mt-bloco grid grid-cols-4 gap-4 sm:grid-cols-6 lg:grid-cols-8">
          {icones.map((nome) => (
            <div
              key={nome}
              className="flex flex-col items-center gap-2 rounded-cartao border border-linha p-4"
            >
              <Icone nome={nome} />
              <span className="text-center text-[0.6875rem] text-tinta-suave">
                {nome}
              </span>
            </div>
          ))}
        </div>
      </Seccao>

      <Seccao fundo="alternado">
        <TituloSeccao olho="Superfícies" titulo="Cartões e listas" />
        <div className="mt-bloco grid gap-6 md:grid-cols-3">
          <Cartao interactivo>
            <h3 className="text-delta font-titulo font-semibold">Cartão</h3>
            <p className="mt-3 text-tinta-suave">Papel, com contorno e elevação.</p>
          </Cartao>
          <Cartao fundo="veu">
            <h3 className="text-delta font-titulo font-semibold">Véu</h3>
            <ListaVerificada
              className="mt-4"
              itens={["Alarmes Residenciais e Comerciais", "Sensores de Movimento"]}
            />
          </Cartao>
          <Cartao fundo="tinta">
            <h3 className="text-delta font-titulo font-semibold">Tinta</h3>
            <ListaVerificada
              className="mt-4"
              tipo="nao"
              itens={["Alto custo inicial", "Custos de manutenção"]}
            />
          </Cartao>
        </div>
      </Seccao>

      <Seccao fundo="tinta">
        <TituloSeccao olho="Números" titulo="Contadores" className="[&_h2]:text-papel" />
        <div className="mt-bloco grid grid-cols-2 gap-8 lg:grid-cols-4">
          <Contador valor={1280} rotulo="Projetos de Alarmes Concluídos" />
          <Contador valor={102} rotulo="Projetos de Obras Concluídos" />
          <Contador valor={9} rotulo="Projetos de Screens Concluídos" />
          <Contador valor={1391} rotulo="Clientes Satisfeitos" />
        </div>
      </Seccao>

      <Seccao>
        <TituloSeccao olho="Entrada" titulo="Campos de formulário" />
        <div className="mt-bloco grid max-w-2xl gap-5">
          <Campo id="demo-nome" rotulo="Nome completo" placeholder="Maria Silva" />
          <Campo
            id="demo-email"
            rotulo="Email"
            type="email"
            erro="Escreva um endereço de email válido."
          />
          <CampoTexto
            id="demo-msg"
            rotulo="Mensagem"
            nota="Diga-nos o que precisa e respondemos com a maior brevidade possível."
          />
        </div>
      </Seccao>
    </main>
  );
}
