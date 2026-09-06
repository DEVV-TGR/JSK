@AGENTS.md

# Como se trabalha neste projecto

## Perguntar. Não assumir.

Regra número um, acima de qualquer outra instrução de eficiência ou de
autonomia: **não assumir nada**. Perguntar.

Quem fala com o cliente é o Gonçalo. As decisões de desenho, a escolha das
fotografias, o número de telefone que está certo, o que o cliente quis dizer
com cada comentário — são dele. Não são para inferir a partir de um documento.
Um plano escrito em `docs/` é o registo de uma conversa, não uma autorização
para executar.

Isto vale mesmo quando:

- o documento parece completo e não ambíguo;
- a resposta parece óbvia;
- adiantar trabalho pareceria útil;
- já se percebeu o padrão dos tópicos anteriores.

A excepção, e só ela: quando o Gonçalo disser **"assume"**. Enquanto não
disser, perguntar.

## Um tópico de cada vez

O ciclo é sempre este, por esta ordem:

1. Aparece **um** tópico. Um, não a lista toda.
2. **Fazer as perguntas** sobre esse tópico, antes de escrever código.
3. Ele responde, e fornece as fotografias ou os ficheiros necessários.
4. Só então implementar.
5. Um PR para esse tópico. Ele aprova ou rejeita antes de se avançar.

Não avançar para o tópico seguinte sem ele o trazer.

**Não ir buscar nem produzir imagens por iniciativa própria.** As fotografias
vêm dele. Se um tópico precisa de uma imagem que não existe, dizer isso e
esperar — não recortar, não gerar, não escolher da pasta o que parece servir.

### Porque é que isto está escrito aqui

Esta secção veio da Taskuinha, onde foi escrita depois de uma primeira ronda em
que se executaram oito tópicos de uma vez, com todas as decisões por conta
própria. Seis PRs. Um foi aproveitado.

O trabalho não estava mal feito — estava feito sem ele. O custo de perguntar
primeiro é uma mensagem; o custo de assumir foram cinco PRs deitados fora.

## O texto do site é o texto do cliente

Regra específica deste projecto, e a que mais depressa se quebra sem se dar por
isso.

O conteúdo em `lib/conteudo/` é a transcrição do que está em jsk.pt. **Não se
reescreve, não se "melhora", não se resume, não se inventa.** Se uma frase
parece fraca, isso é uma conversa a ter com o cliente, não uma edição a fazer.

O que **se** corrige, e só isto:

- gralhas identificadas na lista de defeitos (`docs/inventario-jsk-pt.md`);
- espaços de largura zero (U+200B) e outros caracteres invisíveis;
- hierarquia de títulos e marcação — que é estrutura, não texto.

Números — contadores de projectos, anos de experiência, clientes satisfeitos —
são afirmações de facto sobre o negócio. Não se arredondam nem se actualizam
sem alguém confirmar.

E não se inventa um testemunho, um horário, uma avaliação ou um NIF. Um horário
inventado num JSON-LD passa a ser o horário que a Google mostra a toda a gente.

## Commits directos na `main`

Trabalha-se na `main` e commita-se na `main`. **Sem branch por tópico, sem PR,
sem merge de aprovação.**

Isto mudou a 6 de Setembro de 2026, e a versão anterior desta secção mandava o
contrário. A razão da mudança: quem mexe no repo é uma pessoa, e a revisão
acontece na conversa — página a página, com o resultado à vista. Um PR seria
uma segunda revisão do que já foi aprovado a olho.

O que **não** mudou:

- Nada de worktrees. O `.claude/settings.json` desliga o isolamento por
  worktree de propósito.
- Nunca `push --force`.
- **Perguntar antes de fazer push.** Commitar é local; o push sai da máquina
  para um repositório partilhado, e esse passo confirma-se.
- Um commit por tópico. O que caiu foi o branch e o PR, não a granularidade —
  a mensagem de commit continua a ser onde o porquê fica escrito.

## Antes de dizer que está pronto

```
npm run lint
npx tsc --noEmit
npm run build
npm test
```

As quatro. "Compila" não é "está pronto" — um build verde passa por cima de
erros de runtime, e é para isso que o teste de fumo do CI existe.

## Língua

Ficheiros, pastas, variáveis, funções, tipos e comentários em português.
`Cabecalho`, não `Header`. `seccoes/`, não `sections/`.

Comentários explicam **porquê**, não o quê. Um comentário que descreve a linha
que está por baixo é ruído; um que explica a decisão que levou àquela linha
poupa a próxima pessoa de a desfazer.

## Armadilhas que já morderam nos repos irmãos

Estão aqui porque custaram tempo lá e o padrão repete-se.

- **Tailwind v4: `hover:` dentro de `@layer components` compila para nada.**
  A variante precisa de estar na classe utilitária, não na regra da camada.
- **`animation-range` fechado em `cover` deixa o último bloco preso.** O bloco
  imediatamente antes do rodapé nunca completa a animação e fica a meia
  opacidade para sempre. Fechar em `entry`.
- **Regras fora de `@layer` ganham sempre às de dentro.** Se uma `transition`
  vive fora da camada, tem de declarar todas as propriedades que quer animar —
  um `transition-colors` ao lado é descartado em silêncio.
- **A opacidade come o contraste e não aparece em tabela nenhuma.** Um texto
  que passa a 7:1 em cheio pode reprovar a `opacity: .7`.
- **`<Seccao className="pt-0">` não anula um `py-*` da própria `Seccao`.** O
  `sm:py-24` é escrito depois no CSS gerado e volta a ganhar a partir dos
  640px. É por isso que a `Seccao` tem props `topo`/`fundo` em vez de se
  esperar que uma classe por fora a desligue.
- **`:hover` fica preso no telemóvel.** Um toque dispara `:hover` e o estado só
  sai no toque seguinte. Todo o hover vai atrás de
  `@media (hover: hover) and (pointer: fine)`.
- **Playwright só em Chromium deixa passar o que só parte no Safari do iPhone.**
  A configuração corre também em `iPhone 14`, e é de propósito.

## Decisões de arquitectura, e porque estão assim

- **Sem `next-intl`.** O site é `pt-PT` e mais nada: não tem `hreflang`, não tem
  tradução, nunca teve. Acrescentá-lo custa um segmento `[locale]`, um
  `proxy.ts`, `messages/*.json` e tira a copy de TypeScript tipado para JSON sem
  tipos. Se um dia houver inglês, o molde é o `DEVV-TGR/SantoBurga` inteiro.
- **Sem `motion`, sem `lenis`, sem GSAP.** O movimento é CSS. Nove páginas
  estáticas não justificam dezenas de KB de runtime de animação, e um site de
  segurança que anima o título letra a letra lê-se como menos sério, não mais.
  Ver `docs/movimento.md`.
- **Sem `src/`.** `app/`, `lib/` e `components/` na raiz, como no
  `DEVV-TGR/DevPlus-SIte`, que é o irmão mais próximo: institucional, de
  angariação, numa só língua.
- **A copy vive em módulos TypeScript, não em MDX nem em JSON.** Os mesmos
  blocos repetem-se entre páginas — o processo de quatro passos é igual em
  `/alarmes/` e `/obras/`, a banda de orçamento é igual nas nove. No WordPress
  isso era o mesmo texto colado N vezes, livre para divergir. E divergiu: a
  numeração dos serviços de `/obras/` está `01., 01., 02.`. Num módulo
  partilhado o número vem do `index` e esse erro passa a ser impossível.
