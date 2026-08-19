# JSK — jsk.pt

Site da **JSK**, empresa de Vilar do Pinheiro com quatro sectores: alarmes e
segurança electrónica, obras e remodelações, screens LED e web.

Reconstrução do site que estava em WordPress (tema Astra + Elementor Pro) em
código nosso: mesmas páginas, mesmo conteúdo, desenho próprio.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Vercel.

Sem CMS, sem base de dados, sem JavaScript de terceiros. Todo o conteúdo vive
em módulos TypeScript tipados em `lib/conteudo/`.

## Arrancar

```bash
npm install
npm run dev
```

Antes de dizer que está pronto, as quatro:

```bash
npm run lint
npx tsc --noEmit
npm run build
npm test
```

## Como está organizado

```
app/          rotas (App Router). Uma pasta por página, com barra final.
components/
  ui/         primitivos — Botao, Seccao, Campo, Icone…
  seccoes/    secções de página — Heroi, Processo, Galeria…
  og/         cartão partilhado pelas imagens Open Graph
lib/
  site.ts     marca, contactos e rotas. FONTE ÚNICA.
  conteudo/   toda a copy, tipada
scripts/      importação de assets e verificação de conteúdo
docs/         o inventário do site antigo e as decisões pendentes
testes/       vitest (unidade) e playwright (visual)
originais/    os assets em bruto do cliente. Fora do git.
```

Duas leituras antes de mexer em conteúdo:

- **`docs/inventario-jsk-pt.md`** — o levantamento completo do site antigo. É a
  especificação deste projecto: a copy, os tokens, os assets e os 40 defeitos
  encontrados.
- **`docs/decisoes-pendentes.md`** — os onze pontos que não se podem resolver
  sem o cliente.

E `CLAUDE.md`, que diz como se trabalha aqui.

## Assets

Os originais não estão versionados. Para os trazer de jsk.pt e gerar as versões
optimizadas em `public/`:

```bash
npm run assets
```

## Ligar a entrega de email

⚠️ **O formulário de orçamento ainda não envia.** Enquanto a variável
`CONTACTO_PROVEDOR` estiver vazia, a rota `/api/contacto` responde 503 e o
formulário diz ao visitante para telefonar ou escrever directamente — nunca
finge que enviou.

Para o ligar, copia o `.env.example` para `.env.local`, escolhe o fornecedor e
preenche a chave. As mesmas variáveis têm de ficar nas Environment Variables do
projecto na Vercel.

## Antes de publicar

- [ ] `NEXT_PUBLIC_SITE_URL` a apontar para o domínio final — **ou fora de vez.**
      Uma variável definida mas vazia não é o mesmo que não a ter; o código
      trata os dois casos, mas deixá-la vazia nas definições da Vercel é
      convidar a próxima confusão
- [ ] entrega de email ligada e testada com um envio a sério
- [ ] NIF e denominação social preenchidos em `lib/site.ts`
- [ ] telefone confirmado (hoje há dois em circulação — ver decisões pendentes)
- [ ] testemunhos resolvidos
- [ ] política de privacidade sem marcadores por preencher
- [ ] crédito de desenho decidido (DevPlus ou XquisiteVision)
- [ ] `/construcao/` resolvida
- [ ] logótipo definitivo
- [ ] `robots.ts` a permitir a indexação só depois do DNS mudado
