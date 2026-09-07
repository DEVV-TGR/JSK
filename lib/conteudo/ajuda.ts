import type { NomeIcone } from "@/components/ui/Icone";
import { site, urlMapa } from "@/lib/site";

/**
 * As perguntas frequentes do painel de ajuda.
 *
 * ## Nenhuma resposta é nova
 *
 * Cada uma sai de texto que já está noutro módulo de `lib/conteudo/`, e cada
 * uma diz em comentário de onde veio. É a regra do `CLAUDE.md` aplicada ao pé
 * da letra — o texto do site é o texto do cliente — e é também o que faz este
 * painel valer alguma coisa: não acrescenta promessas, arruma as que já
 * existem por debaixo da pergunta que as procura.
 *
 * Quando a resposta é uma frase inteira do cliente, está aqui **verbatim** e
 * assinalada. Quando é uma enumeração — os quatro pontos de um serviço, os
 * três blocos de uma página — as palavras são as dele e o que se acrescenta é
 * a pontuação que transforma uma lista de rótulos numa frase.
 *
 * ## O que este ficheiro deliberadamente não responde
 *
 * Preço, prazo, zona de cobertura, garantia, mensalidade da monitorização,
 * horário de atendimento. São as seis perguntas que um cliente faz primeiro e
 * **nenhuma delas tem resposta em jsk.pt**. Inventar um horário aqui é
 * inventar o horário que a Google mostra a toda a gente; inventar um prazo é
 * assinar um compromisso em nome de outra pessoa. Ficam à espera do cliente, e
 * entram neste ficheiro no dia em que ele as responder.
 *
 * A única que entra é o preço — e entra para dizer que depende, com a frase do
 * próprio site, encaminhando para orçamento. É a diferença entre não responder
 * e responder mal.
 *
 * ## Os textos da moldura são interface, não copy
 *
 * `AJUDA.saudacao`, `AJUDA.confirmacao` e os rótulos dos botões não são
 * transcrição de lado nenhum: são a voz do próprio widget, como o `Enviar` do
 * formulário ou o `Saltar para o conteúdo` do `layout.tsx`. Tratam por
 * **você**, que é o tratamento de todo o jsk.pt.
 */

export type Pergunta = {
  /** O que a pessoa carrega. Curto: é um botão, não um título. */
  pergunta: string;
  /** A resposta em parágrafos. Quase sempre um só. */
  resposta: readonly string[];
  /** Os pontos, quando a resposta é uma enumeração do cliente. */
  lista?: readonly string[];
  /** Para quem quiser a página inteira em vez do resumo. */
  leiaMais?: { texto: string; href: string; externo?: boolean };
};

export type Ramo = {
  /** Vai para o `id` do painel e para as chaves do React. */
  id: string;
  /** O rótulo do botão no primeiro ecrã. */
  nome: string;
  icone: NomeIcone;
  perguntas: readonly Pergunta[];
};

/* ═══════════════════════════════════════════════════════════════════════════
   JSK Alarmes — tudo de `lib/conteudo/alarmes.ts`
   ═══════════════════════════════════════════════════════════════════════════ */

const ALARMES: readonly Pergunta[] = [
  {
    pergunta: "Que sistemas de alarme instalam?",
    /* `SERVICOS.itens[0]` — o título do serviço e os seus quatro pontos. */
    resposta: ["Instalamos sistemas de alarme para casa e para empresa:"],
    lista: [
      "Alarmes residenciais e comerciais",
      "Sensores de movimento",
      "Sensores de abertura",
      "Alarmes perimetrais",
    ],
    leiaMais: { texto: "Ver JSK Alarmes", href: "/alarmes/" },
  },
  {
    pergunta: "Fazem videovigilância?",
    /* `SERVICOS.itens[1]` — `Sistemas de Videovigilância` e os seus pontos. */
    resposta: ["Fazemos. Os sistemas de videovigilância incluem:"],
    lista: [
      "Câmaras de segurança",
      "Acesso remoto",
      "Gravação de imagens",
      "Sistemas inteligentes",
    ],
    leiaMais: { texto: "Ver JSK Alarmes", href: "/alarmes/" },
  },
  {
    pergunta: "A monitorização é 24 horas?",
    /* `SERVICOS.itens[2]` — o título é `Monitorização 24 Horas`. */
    resposta: ["É. A monitorização 24 horas assenta em três peças:"],
    lista: [
      "Central de monitorização",
      "Resposta imediata",
      "Monitorização remota",
    ],
    leiaMais: { texto: "Ver JSK Alarmes", href: "/alarmes/" },
  },
  {
    pergunta: "Também fazem deteção de incêndio?",
    /* `SERVICOS.itens[3]` — `Alarmes Contra Incêndios`. */
    resposta: ["Fazemos, com alarmes contra incêndios:"],
    lista: [
      "Detetores de fumo e calor",
      "Integração com sistemas de extinção",
      "Alerta à central",
    ],
    leiaMais: { texto: "Ver JSK Alarmes", href: "/alarmes/" },
  },
  {
    pergunta: "Instalam em casa ou só em empresas?",
    /* `SERVICOS.itens[0].pontos[0]` diz `Alarmes Residenciais e Comerciais`, e
       `PROJECTOS.intro` diz que os trabalhos foram `realizados em residências e
       empresas`. A resposta é a soma dos dois. */
    resposta: [
      "Nos dois. Os alarmes são residenciais e comerciais, e os projetos de instalação e monitorização que mostramos foram realizados em residências e empresas.",
    ],
    leiaMais: { texto: "Ver os projetos", href: "/alarmes/" },
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   JSK Obras — tudo de `lib/conteudo/obras.ts`
   ═══════════════════════════════════════════════════════════════════════════ */

const OBRAS: readonly Pergunta[] = [
  {
    pergunta: "Que tipo de obras fazem?",
    /* Os títulos dos três `SERVICOS.blocos`. */
    resposta: ["O trabalho divide-se em três frentes:"],
    lista: [
      "Transformações de espaços",
      "Acabamentos e revestimentos",
      "Instalações e infraestruturas",
    ],
    leiaMais: { texto: "Ver JSK Obras", href: "/obras/" },
  },
  {
    pergunta: "Fazem remodelação de cozinhas e casas de banho?",
    /* `SERVICOS.blocos[0].itens`, as sete linhas. */
    resposta: ["Fazemos. Dentro das transformações de espaços cabe:"],
    lista: [
      "Remodelação de cozinhas e casas de banho",
      "Reorganização e otimização de espaços interiores",
      "Substituição de portas e janelas",
      "Criação de espaços abertos (open space)",
      "Melhoria de isolamento térmico e acústico",
      "Instalação de armários e mobiliário por medida",
      "Atualização de sistemas de iluminação embutida",
    ],
    leiaMais: { texto: "Ver JSK Obras", href: "/obras/" },
  },
  {
    pergunta: "E pintura, pavimentos e revestimentos?",
    /* `SERVICOS.blocos[1].itens`. */
    resposta: ["Também. Nos acabamentos e revestimentos fazemos:"],
    lista: [
      "Pintura interior e exterior",
      "Aplicação de revestimentos (azulejos, pedra, madeira, etc.)",
      "Instalação de pavimentos (madeira, laminado, cerâmica, etc.)",
      "Colocação de tetos falsos e paredes divisórias",
      "Aplicação de papel de parede e vinis decorativos",
      "Restauro de superfícies antigas",
      "Tratamento e impermeabilização de paredes",
    ],
    leiaMais: { texto: "Ver JSK Obras", href: "/obras/" },
  },
  {
    pergunta: "Fazem instalações elétricas e canalização?",
    /* `SERVICOS.blocos[2].itens`. */
    resposta: ["Fazemos. As instalações e infraestruturas incluem:"],
    lista: [
      "Instalações elétricas e de iluminação",
      "Instalações hidráulicas e de gás",
      "Sistemas de climatização e ventilação",
      "Instalação de painéis solares e sistemas de energia renovável",
      "Sistemas de aquecimento de água",
      "Instalação de redes de internet e telecomunicações",
    ],
    leiaMais: { texto: "Ver JSK Obras", href: "/obras/" },
  },
  {
    pergunta: "Só aceitam obras grandes?",
    /* `SERVICOS.intro[1]`, verbatim. */
    resposta: [
      "Seja uma renovação total ou apenas uma melhoria pontual, garantimos profissionalismo e atenção a cada detalhe.",
    ],
    leiaMais: { texto: "Ver JSK Obras", href: "/obras/" },
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   JSK Screens — tudo de `lib/conteudo/screens.ts`
   ═══════════════════════════════════════════════════════════════════════════ */

const SCREENS: readonly Pergunta[] = [
  {
    pergunta: "Para que serve um ecrã LED?",
    /* `INTRO.texto`, verbatim até `no mercado.` */
    resposta: [
      "Os screen LED são uma ferramenta moderna e eficaz de marketing, que oferece comunicação visual de alto impacto. Destacam-se pela versatilidade, visibilidade e capacidade de exibir conteúdos personalizados, funcionando bem em ambientes internos e externos.",
    ],
    leiaMais: { texto: "Ver JSK Screens", href: "/screens-led/" },
  },
  {
    pergunta: "Compro ou alugo?",
    /* `COMPARACAO.intro`, verbatim. É o único bloco do site que já é um guia de
       decisão — cabe aqui sem uma palavra mudada. */
    resposta: [
      "A escolha entre comprar ou alugar um screen LED depende da frequência com que realiza eventos e do seu orçamento. Se organiza eventos regularmente e está à procura de uma solução a longo prazo, a compra pode ser a melhor opção. No entanto, se os seus eventos forem esporádicos ou se preferir não investir inicialmente, o aluguer oferece flexibilidade e menor custo imediato.",
      "Na JSK, ajudamos a analisar as suas necessidades para tomar a melhor decisão.",
    ],
    leiaMais: { texto: "Ver comprar vs alugar", href: "/screens-led/" },
  },
  {
    pergunta: "O que ganho em alugar?",
    /* `COMPARACAO.opcoes[1]`. As desvantagens vêm com as vantagens de
       propósito: o site actual dá-lhes o mesmo ✔️ verde e isso faz uma lista de
       contras ler-se como uma lista de prós — defeito #9. Aqui vão em prosa,
       separadas pela palavra `Em contrapartida`. */
    resposta: [
      "Alugar dá custo inicial mais baixo, sem preocupação com manutenção, adequação a eventos pontuais e variedade de opções.",
      "Em contrapartida: custo contínuo, limitações na personalização e dependência externa.",
    ],
    leiaMais: { texto: "Ver comprar vs alugar", href: "/screens-led/" },
  },
  {
    pergunta: "E o que ganho em comprar?",
    /* `COMPARACAO.opcoes[0]`, com a mesma regra do de cima. */
    resposta: [
      "Comprar é um investimento a longo prazo, com recuperação do investimento, personalização e flexibilidade, e manutenção e controle do seu lado.",
      "Em contrapartida: alto custo inicial e custos de manutenção e armazenamento.",
    ],
    leiaMais: { texto: "Ver comprar vs alugar", href: "/screens-led/" },
  },
  {
    pergunta: "Servem para a rua?",
    /* `APLICACOES.blocos` — os dois, com os seus itens. */
    resposta: ["Servem para interior e para exterior:"],
    lista: [
      "Interior: espaços comerciais, espaços corporativos, feiras e eventos",
      "Exterior: outdoors, fachadas, feiras e eventos",
    ],
    leiaMais: { texto: "Ver JSK Screens", href: "/screens-led/" },
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   JSK Web — tudo de `lib/conteudo/web.ts`
   ═══════════════════════════════════════════════════════════════════════════ */

const WEB: readonly Pergunta[] = [
  {
    pergunta: "Quem faz os sites?",
    /* `APRESENTACAO.texto`, verbatim. */
    resposta: [
      "Através da nossa parceria com a DevPlus, oferecemos soluções completas para transformar a sua visão digital em realidade.",
    ],
    leiaMais: { texto: "Ver JSK Web", href: "/web/" },
  },
  {
    pergunta: "O que está incluído?",
    /* Os nomes dos seis `SERVICOS.itens`. */
    resposta: ["São seis frentes:"],
    lista: [
      "Web design",
      "Desenvolvimento",
      "Menus e ecrãs digitais",
      "Painel de gestão",
      "Branding",
      "Motion e interação",
    ],
    leiaMais: { texto: "Ver JSK Web", href: "/web/" },
  },
  {
    pergunta: "Fazem menus digitais com QR code?",
    /* `SERVICOS.itens[2].texto`, verbatim. */
    resposta: [
      "Levamos a sua ementa para onde os clientes olham: no telemóvel por QR code e num ecrã dentro do espaço, em loop. Muda o preço num sítio e muda em todo o lado.",
    ],
    leiaMais: { texto: "Ver JSK Web", href: "/web/" },
  },
  {
    pergunta: "Posso alterar o site sozinho?",
    /* `SERVICOS.itens[3].texto`, verbatim. */
    resposta: [
      "Um painel só seu, feito à medida do que precisa de mudar no dia a dia. Publica, edita, apaga e deixa coisas agendadas — sem código e sem esperar por nós.",
    ],
    leiaMais: { texto: "Ver JSK Web", href: "/web/" },
  },
  {
    pergunta: "Também fazem logótipo?",
    /* `SERVICOS.itens[4].texto`, verbatim. */
    resposta: [
      "Tratamos da cara da sua marca, do logótipo às cores e às regras de uso. Fica com uma imagem que se reconhece à distância — no site, na montra ou na farda.",
    ],
    leiaMais: { texto: "Ver JSK Web", href: "/web/" },
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   A JSK — o que atravessa os quatro sectores

   Sem este ramo, `Como peço um orçamento?` teria de ser repetida quatro vezes
   — e quatro cópias da mesma resposta é exactamente o que o `CLAUDE.md` diz
   que aconteceu no WordPress e que os módulos partilhados vieram impedir.
   ═══════════════════════════════════════════════════════════════════════════ */

const JSK: readonly Pergunta[] = [
  {
    pergunta: "Como peço um orçamento?",
    /* `ORCAMENTO.texto` de `comum.ts` diz `Peça um Orçamento Gratuito`, e
       `BANDA_ORCAMENTO.titulo` diz `Orçamento sem compromisso?`. Os canais são
       os que a `/contactos/` já tem. */
    resposta: [
      "Pelo formulário da página de contactos, por telefone ou por WhatsApp — o que lhe der mais jeito. O orçamento é gratuito e sem compromisso.",
    ],
    leiaMais: { texto: "Ir para contactos", href: "/contactos/" },
  },
  {
    pergunta: "Como funciona, do primeiro contacto ao fim?",
    /* Os quatro `PROCESSO.passos` de `comum.ts`, com o título de cada um a
       abrir a linha. A numeração não entra no texto: seria a mesma armadilha do
       defeito #7, em que os serviços de `/obras/` estão numerados 01., 01., 02.
       porque alguém a escreveu à mão. */
    resposta: ["Em quatro passos:"],
    lista: [
      "Consulta — trabalhamos consigo para perceber as suas necessidades e avaliar a melhor solução.",
      "Orçamento — apresentamos um orçamento claro e ajustado ao seu projeto.",
      "Instalação — executamos o serviço com rapidez, segurança e qualidade.",
      "Inspeção — verificamos todos os detalhes para garantir o funcionamento ideal.",
    ],
  },
  {
    pergunta: "Quanto custa?",
    /* `PROCESSO.passos[1].texto` de `comum.ts`, verbatim na primeira frase.
       Não há um único preço em jsk.pt, e é por isso que esta pergunta responde
       com o processo em vez de com um número. */
    resposta: [
      "Depende do que precisa. Apresentamos um orçamento claro e ajustado ao seu projeto, gratuito e sem compromisso.",
      "Diga-nos o que quer fazer e respondemos com um valor.",
    ],
    leiaMais: { texto: "Pedir orçamento", href: "/contactos/" },
  },
  {
    pergunta: "Tenho de contratar várias empresas?",
    /* `DIFERENCIAIS.itens[3].texto` de `inicio.ts`, verbatim, mais o fragmento
       da visão em `sobre.ts` — `soluções completas num só parceiro`. */
    resposta: [
      "Não. Alarmes, obras e publicidade digital com soluções integradas num só parceiro.",
    ],
    leiaMais: { texto: "Sobre a JSK", href: "/sobre-nos/" },
  },
  {
    pergunta: "Onde ficam?",
    /* Sai de `site.morada`, não de uma frase escrita à mão — é a mesma razão
       pela qual `lib/site.ts` existe. O mapa é o `urlMapa`, que é a forma
       documentada da Google e não o URL de sessão do Safari que o site actual
       tem colado da barra de endereço. */
    resposta: [`Em ${site.morada.localidade}, ${site.morada.concelho}.`],
    leiaMais: { texto: "Ver no mapa", href: urlMapa, externo: true },
  },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   A árvore
   ═══════════════════════════════════════════════════════════════════════════ */

/**
 * Os cinco ramos, pela ordem em que se percorre o site.
 *
 * A ordem dos quatro sectores é Alarmes → Obras → Screens → Web, a mesma de
 * `SECTORES` em `comum.ts` e a mesma dos cartões da homepage. O site antigo
 * punha a Web antes das Screens no menu e ao contrário nos cartões — defeito
 * #15, e não vale a pena repeti-lo aqui.
 */
export const RAMOS: readonly Ramo[] = [
  { id: "alarmes", nome: "Alarmes", icone: "alarme", perguntas: ALARMES },
  { id: "obras", nome: "Obras", icone: "obra", perguntas: OBRAS },
  { id: "screens", nome: "Screens", icone: "ecra", perguntas: SCREENS },
  { id: "web", nome: "Web", icone: "web", perguntas: WEB },
  { id: "jsk", nome: "A JSK", icone: "escudo", perguntas: JSK },
] as const;

/**
 * A moldura do painel.
 *
 * Estes textos são a voz do widget, não transcrição de jsk.pt — como o
 * `Enviar` do formulário ou o `Saltar para o conteúdo` do `layout.tsx`.
 * Tratam por você, que é o tratamento de todo o site.
 */
export const AJUDA = {
  /* O que o leitor de ecrã anuncia no botão. `Ajuda` sozinho não diz o que
     acontece ao carregar. */
  abrir: "Perguntas frequentes",
  fechar: "Fechar",
  titulo: "Perguntas frequentes",

  /* O painel abre já com a pergunta feita, para não ser uma caixa vazia à
     espera de que alguém adivinhe o que ela faz. */
  saudacao: "Olá! Sobre o que quer saber?",
  escolhaPergunta: "Diga-me o que precisa:",

  voltar: "Voltar",
  recomecar: "Outra pergunta",

  /* O ponto onde o painel admite os seus limites. É a razão de ele existir com
     escape em vez de acabar na última resposta. */
  confirmacao: "Isto respondeu à sua dúvida?",
  respondeu: "Sim, obrigado",
  naoRespondeu: "Quero falar com alguém",

  falar: {
    titulo: "Fale connosco.",
    texto:
      "Respondemos com a maior brevidade possível. Escolha por onde prefere:",
    whatsapp: "WhatsApp",
    telefone: "Ligar",
    formulario: "Pedir orçamento",
  },

  /* Sempre visível no fundo do painel, em qualquer ecrã. Quem já sabe que quer
     falar com uma pessoa não tem de percorrer perguntas até lá chegar. */
  atalho: "Falar com a JSK",
} as const;
