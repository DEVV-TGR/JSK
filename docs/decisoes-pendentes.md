# Decisões pendentes

Onze pontos do site actual que **não se podem resolver sem o cliente**. Estão
aqui em vez de estarem resolvidos por conta própria, e é isso que o
`CLAUDE.md` manda fazer.

Cada um traz o que está lá hoje, porque é que bloqueia, e as saídas possíveis.
À medida que forem respondidos, a resposta fica escrita aqui por baixo, com a
data — este ficheiro é o registo, não uma lista de afazeres.

---

## 1. Testemunhos — bloqueia três páginas

**O que está lá:** três testemunhos em `/`, `/alarmes/` e `/obras/`, mais um em
destaque em `/alarmes/` e `/obras/`. Todos em **Lorem Ipsum**, com personas de
stock — *John Allison, CEO of Manufacture Company*; *Alicia Potter, Graphic
Designer*; *Edward B. Suarez, Song Writer*; *Anna Patricia, Manager of Finance
Consultant* — e fotografias que vêm do template "Roofing" da Astra
(`roofing-client-1.jpg` e companhia, carregadas em 2020, anos antes do site).

O cabeçalho da secção em `/alarmes/` e `/obras/` está em inglês e com um erro
de gramática: `Here's What Our Client Say About Us`.

**Porque bloqueia:** um testemunho não se inventa. É uma afirmação sobre uma
pessoa real que disse uma coisa real.

**Saídas:** (a) testemunhos verdadeiros de clientes da JSK, com autorização;
(b) a secção sai das três páginas; (c) troca por uma faixa de clientes ou
parceiros, que é factual e não precisa de citação.

---

## 2. Quem assina a JSK Web — DevPlus ou XquisiteVision?

**O que está lá:** a página `/web/` credita a **DevPlus** (`devplus.pt`), com um
botão "Visite a DevPlus" e uma secção cuja classe CSS ainda se chama
`xquisite-section`. O cartão da homepage e o rodapé de todas as páginas creditam
a **XquisiteVision** (`xquisitevision.pt`), que também assina o desenho do site
(`Design by XquisiteVision`).

**Porque bloqueia:** é o nome de um parceiro comercial em todas as páginas.
Parece uma mudança de parceiro aplicada ao `/web/` (última alteração em Agosto
de 2026) e nunca propagada à homepage nem ao rodapé — mas parecer não chega.

**Mais uma peça, encontrada ao montar a página:** a fotografia de topo do
`/web/` — o ficheiro `image.png`, de 2,1 MB — mostra dois monitores com a
palavra **XquisiteVision** escrita no ecrã. Ou seja, a página que credita a
DevPlus no texto tem a marca antiga impressa na imagem. Seja qual for a
decisão, esta fotografia tem de ser substituída ou editada.

---

## 3. NIF e denominação social — em falta

**O que está lá:** nada. Nem NIF, nem nome legal da empresa, em nenhuma das dez
páginas.

**Porque bloqueia:** a indicação é obrigatória num sítio de prestação de
serviços em Portugal (DL 7/2004, artigo 10.º). Não há de onde os deduzir.

Assim que chegarem, entram em `lib/site.ts` e aparecem no rodapé e no JSON-LD.

---

## 4. Qual é o telefone

**O que está lá:** dois números ao mesmo tempo.

| Sítio | Mostra | Marca |
|---|---|---|
| Rodapé (todas as páginas) | `+351 963 085 319` | `tel:(+351) 929 153 103` |
| Botão "Lige-nos Agora" | — | `tel:(+351)929153103` |
| `/contactos/` | `+351 963 085 319` | `tel:(+351)963 085 319` ✅ |

Ou seja: em todas as páginas menos uma, quem carrega no número do rodapé liga
para um número diferente daquele que está a ler. E o logótipo tem um número
**gravado no bitmap** (o ficheiro chama-se `Sinal-JSK-com-Numero-de-Telefone`),
que pode ser um terceiro valor ou um dos dois.

**Está em `lib/site.ts`:** `+351 963 085 319`, por ser o único onde o que se lê
e o que se marca coincidem. É uma escolha provisória à espera de confirmação.

---

## 5. A página `/construcao/`

**O que está lá:** uma página "Em Construção" órfã — não está na navegação, mas
está viva, indexável e no sitemap. Usa um cabeçalho diferente do resto do site
(sem menu) e quatro fotografias vindas do Facebook.

**Saídas:** apagar e 301 para `/`; manter com `noindex`; ou recuperar o
conteúdo (tem texto sobre a empresa que não existe em mais lado nenhum).

---

## 6. O `[email de contacto]` da política de privacidade

**O que está lá:** a secção 5 da política diz, textualmente,
*"contactando-nos através de [email de contacto]"* — o marcador nunca foi
preenchido.

Ligado a isto: o endereço do site é `jskalarmes@gmail.com`, uma caixa Gmail.
Vale a pena decidir se passa a uma do domínio.

---

## 7. Cookies e analytics

**O que está lá:** a política de privacidade diz que se recolhem cookies e
endereços IP. O site **não põe um único cookie**, não tem banner nenhum, e não
tem Google Analytics, GTM, Meta Pixel nem nada parecido.

É o pior dos dois mundos: o texto legal descreve uma recolha que não existe.

**Saídas:**
1. **Sem analytics, sem banner** — e corrige-se a política para dizer a verdade.
   É a única posição totalmente limpa em RGPD, e poupa o banner, que é sempre o
   pior elemento de qualquer página. *(recomendada)*
2. **Vercel Analytics** — sem cookies e sem identificador persistente. Não exige
   consentimento prévio, mas exige uma menção na política.
3. **GA4 / Meta Pixel** — obriga a banner de consentimento a sério, com Consent
   Mode v2 e bloqueio antes da escolha. Só se houver campanhas pagas a
   justificá-lo.

Seja qual for, a política é reescrita para bater certo com o que ficar
instalado.

---

## 8. Os números dos contadores

**O que está lá:** `1280` projectos de alarmes, `102` de obras, `9` de screens,
`1391` clientes satisfeitos.

**Porque bloqueia:** são afirmações de facto sobre o negócio, e vão para uma
banda em destaque na homepage. Continuam verdadeiras?

---

## 9. Legendas da galeria de `/obras/`

**O que está lá:** a galeria de `/alarmes/` tem seis fotografias, cada uma com
duas ou três legendas curtas ("Câmara de Segurança com Visão Térmica", "Acesso
Remoto em Tempo Real"). A de `/obras/` tem quatro fotografias e **nenhuma
legenda**.

Há legendas para escrever, ou o bloco fica assim de propósito?

---

## 10. Os termos omitem a JSK Web

**O que está lá:** os Termos e Condições dizem aplicar-se aos serviços da JSK
*"nas áreas de alarmes, obras e painéis publicitários"*. A JSK Web não é
mencionada, apesar de ser um dos quatro sectores do site.

Texto legal — não se emenda sem quem o escreveu.

---

## 11. Logótipo e fotografias de herói

**O logótipo** tem o número de telefone gravado na imagem. Consequências: o
número não é seleccionável, não é clicável, não escala, e pode estar a mostrar o
número errado em todas as páginas (ver decisão 4). O rodapé serve hoje o
original de 943px num espaço de uns 80px.

**Saídas:** (a) o cliente dá o vector sem o número — o melhor; (b) traçamo-lo a
partir do bitmap; (c) fica assim e assume-se a limitação por escrito.

**As fotografias de herói** de `/`, `/sobre-nos/` e `/contactos/` são a mesma
imagem gerada por IA — o ficheiro chama-se `ChatGPT-Image-10_08_2025-22_10_03.png`.
É a primeira coisa que um visitante vê de uma empresa de segurança. Há
fotografia real de uma instalação ou de uma obra?
