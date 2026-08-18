# Inventário do jsk.pt — o documento de especificação

Levantamento completo do site em WordPress tal como estava em **18 de Agosto de
2026**, feito antes de se escrever uma linha de código. É daqui que sai todo o
conteúdo do site novo: a copy está transcrita palavra por palavra, e é a
transcrição que manda, não a memória de quem escreve o componente.

O que está aqui dentro:

| Secção | O que traz |
|---|---|
| A | Stack e infra-estrutura do site antigo |
| B | Mapa das 10 páginas |
| C | Estrutura secção a secção, com a copy verbatim |
| D | Tokens de desenho: cores, escala tipográfica, componentes, breakpoints |
| E | Os 22 assets, com URL e tamanho |
| F | Formulário, contactos, ausência de analytics |
| G | SEO e meta, por página |
| H | O que é o negócio |
| — | A lista dos **40 defeitos** encontrados |

Os defeitos estão numerados e essa numeração é referida ao longo do código —
quando um comentário diz "resolve o defeito #1", é a este documento que se
refere. Ver `docs/decisoes-pendentes.md` para os que não se podem corrigir sem
o cliente responder.

O levantamento está em inglês porque foi assim que foi produzido; a copy
transcrita lá dentro é a portuguesa do cliente e não foi tocada.

---

# JSK.PT — Full Technical & Content Inventory

## A) Tech stack & infrastructure

**Verdict: WordPress + Astra theme + Elementor Pro page builder.** Not Next.js, not headless, not static. Classic PHP-rendered WP.

`curl -sSI https://jsk.pt/` returns a deliberately sparse header set:
```
HTTP/2 200
server: nginx
date: Tue, 18 Aug 2026 22:18:06 GMT
content-type: text/html; charset=UTF-8
vary: Accept-Encoding
age: 0
accept-ranges: bytes
```
No `x-powered-by`, no `cf-ray`, no `x-vercel-*`, no CDN fingerprint. `age: 0` + `accept-ranges` suggests a reverse-proxy/page-cache layer in front of nginx. No `strict-transport-security`, no `x-frame-options`, no CSP — zero security headers.

**Evidence of the stack:**

| Signal | Value |
|---|---|
| `<meta name="generator">` | `WordPress 7.0.4` |
| `<meta name="generator">` | `Elementor 4.2.2; features: additional_custom_breakpoints; settings: css_print_method-internal, google_font-enabled, font_display-swap` |
| `<html lang>` | `pt-PT` |
| Theme | Astra `4.11.7` — `/wp-content/themes/astra/assets/css/minified/main.min.css?ver=4.11.7` |
| REST API | `https://jsk.pt/wp-json/` live and public |
| robots.txt | `Disallow: /wp-admin/` |
| XML-RPC | `https://jsk.pt/xmlrpc.php?rsd` advertised in head |
| RSS | `/feed/` and `/comments/feed/` both exposed |

**Plugins detected** (from asset paths + REST namespaces):
- `elementor` 4.2.2 + `elementor-pro` 3.25.0/3.26.0/3.26.2 + `pro-elements` 3.32.1 (version skew — mixed builds)
- `header-footer-elementor` (HFE) 2.6.1 — builds the footer
- `ht-mega-for-elementor` 2.9.7 — HT Mega addons (bootstrap, popper, waypoints)
- `contact-form-7` 6.1.2
- `astra-sites` (Astra Starter Templates onboarding — still installed, ships `template-preview/main.js` on the front end)
- REST namespaces reveal more: `zipwp/v1`, `zipwp-images/v1`, `elementor-ai/v1`, `elementor-one/v1`, `nps-survey/v1`, `gutenberg-templates/v1`, `getting-started/v1`, `htmega/v1`, `htmegaopt/v1`, `hfe/v1`, `astra/v1`

**robots.txt** (`https://jsk.pt/robots.txt`):
```
User-agent: *
Disallow: /wp-admin/
Allow: /wp-admin/admin-ajax.php

Sitemap: https://jsk.pt/wp-sitemap.xml
```

**Sitemap:** `/sitemap.xml` is **empty** (returns nothing). The real one is the WP core sitemap at `/wp-sitemap.xml`:
- `/wp-sitemap-posts-page-1.xml` — the 10 pages
- `/wp-sitemap-posts-elementor-hf-1.xml` — one entry: `https://jsk.pt/elementor-hf/footer/`
- `/wp-sitemap-users-1.xml` — **author archive exposed** (user enumeration)

**Routing:** `http://` → `https://` OK. `www.jsk.pt` → apex OK. Trailing-slash-less URLs 301 to slashed. `/screens` → `/screens-led/`. 404s return a proper `404` with title `Página não encontrada – JSK`.

---

## B) Site map — every page

10 pages total. All top-level, no hierarchy, all `menu_order: 0`.

| URL | WP ID | `<title>` | Purpose |
|---|---|---|---|
| `https://jsk.pt/` | 7 | `JSK – A Sua Melhor Solução` | Homepage — brand intro, 4 business units, USPs, counters, testimonials, inline quote form |
| `https://jsk.pt/alarmes/` | 147 | `JSK Alarmes – JSK` | Security division: alarms, CCTV, 24h monitoring, fire detection |
| `https://jsk.pt/obras/` | 1207 | `JSK Obras – JSK` | Construction/renovation division |
| `https://jsk.pt/screens-led/` | 162 | `JSK Screens – JSK` | LED screen rental & sale |
| `https://jsk.pt/web/` | 1435 | `JSK Web – JSK` | Web design division, in partnership with DevPlus |
| `https://jsk.pt/sobre-nos/` | 119 | `Sobre Nós – JSK` | About: mission, vision, differentiators |
| `https://jsk.pt/contactos/` | 1633 | `Contactos – JSK` | Contact details + quote form |
| `https://jsk.pt/termos-e-condicoes/` | 1174 | `Termos e Condições – JSK` | Terms of service |
| `https://jsk.pt/politica-de-privacidade/` | 1182 | `Política de Privacidade – JSK` | GDPR/RGPD privacy policy |
| `https://jsk.pt/construcao/` | 22 | `Em Construção – JSK` | **Orphan "under construction" holding page — still live and indexable, not linked from any nav** |

Also live: `https://jsk.pt/elementor-hf/footer/` (the footer template, ID 154, rendered standalone and in the sitemap).

**Primary nav** (identical desktop + mobile, `ast-hf-menu-1`), in order:
`Home` · `JSK Alarmes` · `JSK Obras` · `JSK Web` · `JSK Screens` · `Sobre Nós` · `Contactos`
Plus a header CTA button: **`Peça um Orçamento Gratuito`** → `/contactos/`

Note the nav order (Web before Screens) does **not** match the homepage card order (Alarmes, Obras, Screens, Web).

---

## C) Per-page structure, top to bottom

### Global header (Astra header builder, not Elementor)
- Left: logo `<img width="104" height="80">`, alt `sinal jsk com número de telefone`, links to `/`
- Right: nav `<ul>` then CTA button
- Menu classes: `astra-menu-animation-slide-up`, `ast-menu-hover-style-underline`, `submenu-with-border`, `stack-on-mobile`
- Mobile header is a separate DOM block (`#ast-mobile-header`), toggled at 921px. `Main Menu` is the mobile toggle label. Site title/tagline both `display:none`.
- Logo: 83px desktop, 104px ≤921px

### Global CTA band + footer (Elementor template ID 154, via HFE)
Appears identically on **all 10 pages**.

**CTA band** — container `7932c30`, `padding: 200px 40px 120px`, background `linear-gradient(180deg, rgba(0,5,47,0) 16%, #000000 16%)`, with a `::before` overlay of `Design-sem-nome-3.png` positioned `bottom right`, `background-size: contain`.
- H2: **`Orçamento sem compromisso?`**
- Button: `Peça um Orçamento Gratuito` → `/contactos/`
- Button w/ `fas fa-phone`: `Lige-nos Agora` → `tel:(+351)929153103` *(typo — should be "Ligue-nos")*

**Footer, 4 columns:**
1. Text: `A JSK é especialista em obras, segurança e telas publicitárias, oferecendo soluções inovadoras e de qualidade com foco na excelência e satisfação do cliente.` + logo (links to `https://jsk.pt`)
2. H4 `Contactos` — icon list:
   - `fas fa-map-marker-alt` `JSK Alarmes, Vilar do Pinheiro` → Google Maps link
   - `fas fa-phone-alt` `+351 963 085 319` → `tel:(+351) 929 153 103` ← **mismatch**
   - `fas fa-envelope` `jskalarmes@gmail.com` → `mailto:`
3. H4 `Links` — `Sobre Nós` · `Fale Connosco` · `Termos e Condições` · `Política de Privacidade`
4. H4 `Setores` — `JSK Alarmes` → `/alarmes/` · `JSK Obras` → `/obras` · `JSK Web` **(no link)** · `JSK Screens` → `/screens`

**Copyright bar** (two `copyright.default` widgets):
`Copyright © 2026 JSK` · `Design by XquisiteVision` → `https://xquisitevision.pt`

---

### 1. Homepage `/`

Elementor doc `elementor-7`. 32 containers/sections.

**S1 — Hero** (`443e42b`, `min-height:700px`, bg `ChatGPT-Image-10_08_2025-22_10_03.png`, overlay opacity `0.3`, `mix-blend-mode: multiply`, `::before` overlay `Design-sem-nome-3.png`)
- H6 eyebrow: `A sua melhor solução`
- H1: `Bem-Vindo à JSK`
- Body: `Na JSK, combinamos experiência técnica com criatividade para oferecer soluções completas em segurança, construção e comunicação visual. Garantimos projetos eficientes, modernos e à medida das suas necessidades.`
- Buttons: `Quem Somos` → `/sobre-nos/` · `Peça um Orçamento Gratuito` → `/contactos/`

**S2 — Intro + inline quote form** (two columns)
- Left: H2 `Segurança, Construção E Impacto. Tudo Num Só Lugar​` *(note: trailing U+200B zero-width space in source)*
- Left body (two paragraphs split by `<br><br>`):
  `Bem-vindo ao site da JSK! Somos uma marca que oferece serviços de qualidade em sistemas de alarme e segurança, remodelações, e instalação de screens LED. O nosso compromisso é com a excelência, proporcionando soluções à medida, que combinam inovação, confiança e atenção ao detalhe.`
  `Descubra como os nossos serviços podem elevar os seus projectos, garantindo segurança e um impacto visual que se destaca. Vamos trabalhar juntos!`
- Divider widget
- Right: a floating white card (column `3f1dadf`: `border-radius:4px`, `box-shadow: 0px 104px 104px -40px rgba(0,0,0,0.16)`, `margin: -105px 0 0 80px`, `padding: 48px 48px 0`)
  - H4: `Peça um Orçamento Gratuito`
  - **The full CF7 form** (HT Mega `htmega-form-style-6` wrapper) — same form 1632 as `/contactos/`

**S3 — Four sector cards** (4 tall image blocks, each `min-height:400px`, `overlay-opacity:0.6`, `padding:40px`, `gap:8px`)

| # | H4 | H3 | Copy | CTA |
|---|---|---|---|---|
| `01.` | | `JSK Alarmes` | `Garantimos a sua segurança e tranquilidade com tecnologia de ponta e soluções personalizadas para proteger o que mais importa` | `Saiba Mais` → `/alarmes/` |
| `02.` | | `JSK Obras` | `Damos uma nova vida aos espaços através de remodelações de alta qualidade, com inovação, bom gosto e atenção a cada detalhe` | `Saiba Mais` → **`#` (broken)** |
| `03.` | | `JSK Screens` | `Garantimos que a sua mensagem chegue mais longe com screens LED modernos, para um impacto e visibilidade únicos` | `Saiba Mais` → `/screens-led` |
| `04.` | | `JSK Web` | `Websites modernos e funcionais, desenvolvidos pela XquisiteVision e promovidos pela JSK, para garantir a sua marca com impacto online.` | `Saiba Mais` → `/web/` |

Backgrounds in order: `camera-termica-e1754606272717.jpg` (`ce3be5e`), `479443651_9414483188616414_...n.jpg` (`302849a`), `PHOTO-2025-03-21-16-07-21.webp` (`84f1d01`), `XV_JSKWEB.png` (`110eba9`).

**S4 — USP grid** — H2 `O que nos torna únicos?`, then 6 `icon-box` widgets:

| H4 | Copy |
|---|---|
| `Equipa Certificada` | `A nossa equipa é experiente, certificada e está em constante formação.` |
| `Resposta Imediata` | `Priorizamos a rapidez no contacto, orçamento e execução, porque sabemos que o seu tempo é valioso.` |
| `Atendimento Direto` | `Soluções ajustadas às suas necessidades, com apoio próximo e profissional.` |
| `Serviços Integrados` | `Alarmes, obras e publicidade digital com soluções integradas num só parceiro.` |
| `Alta Tecnologia` | `Usamos equipamentos modernos e fiáveis para garantir qualidade e eficiência.` |
| `Foco na Qualidade` | `Rigor em todo o processo — do planeamento à execução final — para garantir a sua total satisfação.` |

Icons in this area: `fa-certificate`, `fa-clock`, `fa-handshake`, `fa-brain`, `fa-trophy`, `fa-wallet`, `fa-tag`, `fa-hard-hat`.

**S5 — Animated counters** (Elementor `counter` widget, `jquery-numerator` + `waypoints`, animate from 0; number font-size 40px, title 12px):

| Label | Target value |
|---|---|
| `Projetos de Alarmes Concluídos` | `1280` |
| `Projetos de Obras Concluídos` | `102` |
| `Projetos de ScreensConcluídos` *(missing space)* | `9` |
| `Clientes Satisfeitos` | `1391` |

**S6 — Testimonials** — 3 columns, each `padding: 40px 30px`, each preceded by a `fas fa-quote-left` icon. **All three are untranslated Lorem Ipsum with stock personas:**
- `Penatibus eros congue aliquet lectus in imperdiet vel mattis sed enim enim pulvinar posuere augue duis lorem lectus at facilisi in nibh at quam in justo, sit auctor morbi eget aliquam lorem gravida fringilla pretium vestibulum mauris.` — **John Allison**, `CEO of Manufacture Company`, avatar `roofing-client-1.jpg`
- `Erat elit et, amet eget morbi enim, potenti urna, blandit tincidunt faucibus eu diam tincidunt interdum pharetra et diam viverra lacinia integer quam iaculis facilisis viverra quam leo proin semper aenean morbi fames integer vitae ipsum.` — **Alicia Potter**, `Graphic Designer`, avatar `roofing-client-2.jpg`
- `Neque amet at sit elementum et proin lacus vestibulum amet bibendum purus dolor turpis platea sodales senectus purus donec elit molestie scelerisque amet nullam tincidunt arcu odio enim ut nunc vel, tristique dictumst adipiscing elit ultrices.` — **Edward B. Suarez**, `Song Writer`, avatar `roofing-client-3.jpg`

**S7** — empty container `31afc4c` (renders nothing).

Then global CTA band + footer.

---

### 2. `/alarmes/`

**Hero** (`90f8eb1`, bg `banner-alarmes.jpg`): H1 `JSK Alarmes` / sub `Soluções completas de segurança para proteger o que mais importa.`

**Services**: H2 `Os Nossos Serviços`
Intro: `Na JSK Alarmes, oferecemos soluções completas de segurança para proteger o que mais importa: a sua família, a sua casa ou o seu negócio.`
`Com tecnologia de ponta e uma equipa de profissionais qualificados, disponibilizamos os seguintes serviços:`

4 blocks, each H6 number + H4 title + `fas fa-check-circle` icon-list:
- `01.` **`Instalação de Sistemas de Alarme`** — `✔️ Alarmes Residenciais e Comerciais` / `✔️ Sensores de Movimento` / `✔️ Sensores de Abertura` / `✔️ Alarmes Perimetrais`
- `02.` **`Sistemas De Videovigilância​`** — `✔️ Câmaras de Segurança` / `✔️ Acesso Remoto` / `✔️ Gravação de Imagens` / `✔️ Sistemas Inteligentes`
- `03.` **`Monitorização 24 Horas`** — `✔️ Central de Monitorização` / `✔️ Resposta Imediata` / `✔️ Monitorização Remota`
- `04.` **`Alarmes Contra Incêndios`** — `✔️ Detetores de Fumo e Calor` / `✔️ Integração com Sistemas de Extinção` / `✔️ Alerta à Central`

**Projects gallery**: H2 `Alguns dos nossos Projetos`
Intro: `Conheça alguns dos nossos projetos de instalação e monitorização do sistemas de aiarme, realizados em residencias e empresas.` *(typos in source: "do sistemas", "aiarme", "residencias")*

6 image cards (portrait, ~768–797×1024) with caption lines:
| Image | Captions |
|---|---|
| `camera-preta-e1754606226885.jpg` | `Câmara de Segurança com Exterior Robusto` / `Acesso Remoto em Tempo Real` |
| `camera-termica-e1754606272717.jpg` | `Câmara de Segurança com Visão Térmica` / `Acesso Remoto em Tempo Real​` / `Ideal para zonas com Baixa Visibilidade` |
| `sensores-de-abertura-scaled-e1754606453926.jpg` | `Sensor Magnético Discreto` / `Instalação em Espaços Residenciais e Comerciais` / `Compatível com Sistemas Remotos` |
| `teclado.jpg` | `Sistema Inteligente de Controlo de Acessos` / `Leitura Biométrica` / `Interface Digital Moderna` |
| `camera-e-sensor.jpg` | `Câmara de Segurança de Interior` / `Sensores de movimento` / `Monitorização Remota Contínua` |
| `akarme-de-incendio-e1754606123466.jpg` *(filename typo)* | `Deteção de Fumo e Calor` / `Alerta Imediato em Caso de Incêndio` / `Integração com Sistema de Alarme` |

**Process**: H2 `O Nosso Processo` — 4 steps (`01.`–`04.`), identical wording to `/obras/`:
- `Consulta` — `Trabalhamos consigo para perceber as suas necessidades e avaliar a melhor solução.`
- `Orçamento` — `Apresentamos um orçamento claro e ajustado ao seu projeto.`
- `Instalação` — `Executamos o serviço com rapidez, segurança e qualidade.`
- `Inspeção` — `Verificamos todos os detalhes para garantir o funcionamento ideal.`

**Testimonials** — **English heading left in place: `Here’s What Our Client Say About Us`** (H6, also grammatically wrong). Featured quote H3:
`“Quis sed sagittis lorem eget venenatis, enim nisl tellus sem convallis diam vitae arcu odio bibendum eu pretium dolor aliquam scelerisque tortor, odio euismod.”` — **Anna Patricia**, `Manager of Finance Consultant`, photo `roofing-featured-client-photo.png`, section bg `roofing-img-04.jpg`. Then the same 3 Lorem Ipsum testimonials as the homepage.

---

### 3. `/obras/`

**Hero** (bg `Banner-Obras.jpeg`): H1 `JSK Obras` / `Transformamos espaços com qualidade, confiança e dedicação`

**Services**: H2 `Os Nossos Serviços`
`Na JSK Obras, ajudamos a transformar o seu espaço para que se adapte às suas necessidades e estilo.`
`Seja uma renovação total ou apenas uma melhoria pontual, garantimos profissionalismo e atenção a cada detalhe.`

Three blocks — **numbering is buggy: `01.`, `01.`, `02.`**
- `01.` **`Transformações de Espaços`** — `✔️ Remodelação de cozinhas e casas de banho` / `✔️ Reorganização e otimização de espaços interiores` / `✔️ Substituição de portas e janelas` / `✔️ Criação de espaços abertos (open space)` / `✔️ Melhoria de isolamento térmico e acústico` / `✔️ Instalação de armários e mobiliário por medida` / `✔️ Atualização de sistemas de iluminação embutida`
- `01.` **`Acabamentos e Revestimentos`** — `✔️ Pintura interior e exterior` / `✔️ Aplicação de revestimentos (azulejos, pedra, madeira, etc.)` / `✔️ Instalação de pavimentos (madeira, laminado, cerâmica, etc.)` / `✔️ Colocação de tetos falsos e paredes divisórias` / `✔️ Aplicação de papel de parede e vinis decorativos` / `✔️ Restauro de superfícies antigas` / `✔️ Tratamento e impermeabilização de paredes`
- `02.` **`Instalações e Infraestruturas`** — `✔️ Instalações elétricas e de iluminação` / `✔️ Instalações hidráulicas e de gás` / `✔️ Sistemas de climatização e ventilação` / `✔️ Instalação de painéis solares e sistemas de energia renovável` / `✔️ Sistemas de aquecimento de água` / `✔️ Instalação de redes de internet e telecomunicações`

**Projects**: H2 `Alguns dos nossos Projetos`
`Conheça alguns dos nossos projetos de remodelação e melhoria de espaços, realizados em residências e estabelecimentos comerciais.`
Images: `Obras-cozinha-1.jpeg`, `Obras-cozinha-2.jpeg`, `Obras-Panda-Pet.jpeg`, `Obras-Panda-Pet-2.jpeg` — **no captions** (unlike `/alarmes/`).

**Process** + **Testimonials** — byte-identical to `/alarmes/`.

---

### 4. `/screens-led/`

**Hero** (`26b72d3`, bg `PHOTO-2025-03-21-16-07-21.webp`): H1 `JSK Screens` / `Não deixe a sua marca para amanhã: anuncie hoje com os screens Led da JSK!`

**Intro**: H2 `Aluguer e Venda Screens Led`
`Os screen LED são uma ferramenta moderna e eficaz de marketing, que oferece comunicação visual de alto impacto. Destacam-se pela versatilidade, visibilidade e capacidade de exibir conteúdos personalizados, funcionando bem em ambientes internos e externos, e ajudando marcas a sobressair no mercado.`
Three badges: `Alta Visibilidade` · `Conteúdo Dinâmico` · `Eficiênciae Durabilidade` *(missing space)*

**Video**: `<video autoplay loop controls muted controlsList="nodownload">` → `Video-WhatsApp-2025-09-16-as-08.53.13_1e4c33cd.mp4` (1.27 MB) — self-hosted, no poster frame.

**Comparison**: H2 `Comprar vs alugar`
`A escolha entre comprar ou alugar um screen LED depende da frequência com que realiza eventos e do seu orçamento. Se organiza eventos regularmente e está à procura de uma solução a longo prazo, a compra pode ser a melhor opção. No entanto, se os seus eventos forem esporádicos ou se preferir não investir inicialmente, o aluguer oferece flexibilidade e menor custo imediato. Na JSK, ajudamos a analisar as suas necessidades para tomar a melhor decisão.`

- H3 `Comprar` — `Vantagens:` `✔️ Investimento a longo prazo` / `✔️ Recuperação do investimento` / `✔️ Personalização e flexibilidade` / `✔️ Manutenção e controle`; `Desvantagens:` `✔️ Alto custo inicial` / `✔️ Custos de manutenção e armazenamento`
- H3 `Alugar` — `Vantagens:` `✔️ Custo inicial mais baixo` / `✔️ Sem preocupação com manutenção` / `✔️ Adequação a eventos pontuais` / `✔️ Variedade de opções`; `Desvantagens:` `✔️ Custo contínuo` / `✔️ Limitações na personalização` / `✔️ Dependência externa`

⚠️ The **disadvantages** lists reuse the same green `✔️` checkmark as the advantages — a content bug worth fixing in the rebuild.

**Applications**: H2 `Ecrãs LED: Soluções para Interior e Exterior`
- H3 `Ecrãs Para interior` — `✔️ Espaços comerciais` / `✔️ Espaços corporativos` / `✔️ Feiras e eventos`
- H3 `Ecrãs Para Exterior` — `✔️ Outdoors` / `✔️ Fachadas` / `✔️ Feiras e eventos`

Image `JSK-Screens.png`. **No testimonials, no process block** on this page.

---

### 5. `/web/`

**Hero** (`90f8eb1`, bg `image.png` — 2.1 MB): H1 `JSK Web` / `Criamos a sua presença digital com design único e resultados garantidos` / button w/ `far fa-share-square`: `Visite a DevPlus` → `https://devplus.pt` (`target="_blank"`, no `rel="noopener"`)

**Then an Elementor HTML widget containing a complete nested HTML document** — `<!DOCTYPE html><html lang="pt"><head>…<title>JSK Web - JSK</title>` with its own `<link>` to `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css` and `https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&family=Work+Sans:wght@300;400;500;600;700&display=swap`, its own `<style>`, `<body>`, and `<script>`. This is invalid nesting and duplicates Font Awesome (v6 CDN on top of the v4/v5 already bundled by Elementor). **This whole block should become native components in a rebuild.**

Its content:
- `<section class="services-section" style="padding-top: 120px;">`
  - H2 `Os Nossos Serviços Web`
  - Sub: `Através da nossa parceria com a **DevPlus**, oferecemos soluções completas para transformar a sua visão digital em realidade.`
  - 3 `.service-card`s (`grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, `gap: 30px`, `border-radius: 15px`, `box-shadow: 0 10px 30px rgba(0,0,0,0.1)`, hover `translateY(-5px)`):
    - `fas fa-palette` — H3 `Web Design` — `Criamos sites personalizados que refletem a identidade da sua marca e destacam o seu negócio.`
    - `fas fa-bullseye` — H3 `Foco em Resultados` — `Transformamos visitantes em clientes através de design estratégico e experiência otimizada.`
    - `fas fa-eye` — H3 `Identidade Visual` — `Desenvolvemos identidades de marca únicas e coerentes para destacar o seu negócio.`
- `<section class="xquisite-section">` *(class name still says "xquisite")*
  - `.xquisite-logo`: `DevPlus©`
  - H2 `A Sua Visão, O Nosso Desafio`
  - `A JSK Web trabalha em parceria com a **DevPlus** para criar experiências digitais autênticas que fazem a diferença no seu negócio.`
  - `**Design único. Resultados reais. 100% de clientes satisfeitos.**`
  - `.cta-button` → `Visitar DevPlus` → `https://devplus.pt`
- Inline `<script>`: a hand-rolled scroll reveal — sets `.service-card` to `opacity:0; translateY(30px)` then reveals on scroll via `getBoundingClientRect()` on an unthrottled `scroll` listener.

**⚠️ Brand inconsistency:** this page credits **DevPlus**, but the homepage card and the global footer credit **XquisiteVision**. There's also an unused hero CSS block (`.hero-section` with `linear-gradient(135deg, #FDD000 0%, #f4c430 100%)`, `min-height: 80vh`) that never renders — dead code.

---

### 6. `/sobre-nos/`

**Hero** (`6293501`, bg `ChatGPT-Image-10_08_2025-22_10_03.png` + `Design-sem-nome-3.png` overlay): H1 `Sobre a Jsk` *(note the odd `Jsk` casing — a side-effect of the global `text-transform: capitalize` on headings)* / `Compromisso, inovação e qualidade em cada projeto.`

**Excellence block**: H2 `Compromisso com a Excelência`
`Na JSK unimos experiência, inovação e qualidade para oferecer soluções em obras, sistemas de alarme e telas publicitárias. Adaptamo-nos às necessidades de cada cliente, garantindo segurança, eficiência e impacto visual.`
`Trabalhamos com tecnologia de ponta, materiais de qualidade e uma equipa dedicada. Cada projeto é um compromisso com a confiança e a satisfação dos nossos clientes.`
Checklist: `Experiência Comprovada` / `Soluções Personalizadas` / `Tecnologia de Ponta` / `Compromisso com a Qualidade`
Image `JSK-Image2-e1756316573928.jpg`

**Mission/Vision** (2 columns):
- H3 `A Nossa Missão` — `Na JSK, a nossa missão é fornecer soluções integradas e de alta qualidade nas áreas de segurança eletrónica, construção civil e publicidade digital. Comprometemo-nos a responder com eficiência e rigor às necessidades dos nossos clientes, garantindo confiança, inovação e resultados duradouros em cada projeto. Trabalhamos com foco na excelência técnica, proximidade no atendimento e dedicação total à satisfação do cliente.`
- H3 `A Nossa Visão` — `Ser uma referência nacional nas áreas em que atuamos, destacando-nos pela inovação contínua, pela fiabilidade dos nossos serviços e pela capacidade de entregar soluções completas num só parceiro. Ambicionamos crescer de forma sustentável, promovendo relações sólidas com os nossos clientes e contribuindo para um futuro mais seguro, moderno e visualmente impactante.`

**Differentiators**: H2 `O que nos distingue?`
`Na JSK, acreditamos que a diferença está nos detalhes. O nosso compromisso com a excelência reflete-se em cada projeto, garantindo soluções eficazes e à medida de cada cliente. O que nos torna únicos?`
- H4 `Experiência` — `Contamos com uma equipa experiente e qualificada, garantindo rigor, confiança e resultados duradouros com atenção ao detalhe.`
- H4 `Inovação` — `Apostamos em tecnologia de ponta para oferecer soluções modernas, eficientes e fiáveis nas áreas de segurança, construção e publicidade.`
- H4 `compromisso` *(lowercase in source; rendered capitalised by CSS)* — `Trabalhamos com dedicação e foco na qualidade para oferecer soluções personalizadas que superam as expectativas dos nossos clientes.`

---

### 7. `/contactos/`

**Hero** (`32bc527`, bg `ChatGPT-Image-10_08_2025-22_10_03.png`): H1 `Fale Connosco` / `Entre em contacto com a nossa equipa e descubra como podemos ajudá-lo.`

Widget order: `hfe-infocard` → `text-editor` → `heading` → `text-editor` ×2 → `icon-box` ×3 → `heading` → `htmega-contactform-addons`

- Eyebrow: `Peça aqui o seu…`
- H2: `Orçamento Gratuito`
- `Peça já o seu orçamento ou esclareça as suas dúvidas. Estamos prontos para ajudar.`
- `Na JSK, valorizamos cada contacto. Seja para pedir um orçamento, agendar uma visita técnica ou simplesmente esclarecer uma dúvida, estamos disponíveis para o ajudar. Responderemos com a maior brevidade possível.`
- Three icon-boxes (H5 labels):
  - `fas fa-map-marker-alt` — H5 `Endereço` — `JSK Alarmes, Vilar do Pinheiro` → Google Maps
  - `fas fa-phone` — H5 `Telemóvel` — `+351 963 085 319` → `tel:(+351)963 085 319` ✅ *(correct here, unlike the footer)*
  - `fas fa-envelope` — H5 `Email` — `jskalarmes@gmail.com`
- H4 `Peça um Orçamento Gratuito` + the CF7 form

---

### 8–9. Legal pages

**`/termos-e-condicoes/`** — H1 `Termos e Condições` / `Regulamento aplicável ao uso do site e aos serviços prestados pela JSK nas áreas de alarmes, obras e painéis publicitários.` Nine numbered sections: `1. Definições` · `2. Acesso ao Site` · `3. Prestação dos Serviços` · `4. Propriedade Intelectual` · `5. Preços e Pagamentos` · `6. Garantias e Responsabilidade` · `7. Cancelamentos e Devoluções` · `8. Alterações aos Termos e Condições` · `9. Lei Aplicável e Foro Competente`. Notably **omits JSK Web** from the covered sectors.

**`/politica-de-privacidade/`** — H1 `Política de Privacidade` / `Como a JSK recolhe, utiliza e protege as informações pessoais dos seus clientes e visitantes, em conformidade com o RGPD.` Seven sections: `1. Recolha de Dados` · `2. Finalidade do Tratamento` · `3. Partilha de Dados` · `4. Conservação dos Dados` · `5. Direitos dos Titulares` · `6. Segurança` · `7. Alterações à Política de Privacidade`.
**⚠️ Section 5 contains an unfilled placeholder:** `…contactando-nos através de [email de contacto].`
It also says cookies are collected, but there is **no cookie banner and no cookie policy** anywhere on the site.

---

### 10. `/construcao/` (orphan)

Uses a **different, stripped header** (no nav — just `Skip to content`). Content: `EM CONSTRUÇÃO` / `JSK` / H `Os Nossos Sectores` / `Segurança, Construção e Visibilidade para o seu negócio`, then three cards:
- `JSK Alarmes` — `Soluções de segurança com alarmes, videovigilância e monitorização 24/7 para proteger o que mais importa.`
- `JSK Obras` — `Construção, remodelações e manutenção com qualidade, eficiência e cumprimento de prazos.`
- `JSK Screens` — `Soluções de publicidade e comunicação visual com painéis digitais, telas de grande formato e suportes personalizados para dar máxima visibilidade à sua marca.`

Then `Sobre a JSK`:
`A JSK está pronta para superar todas as expectativas dos nossos clientes que procuram os nossos serviços.`
`A nossa equipa é formada e atualizada com as tendências e novidades do mercado, estando preparada para sugerir o sistema ideal, desde o seu dimensionamento até à instalação, realizada por técnicos altamente qualificados.`
`O diferencial do nosso trabalho está na qualidade dos profissionais, no atendimento pré e pós-venda, na facilidade de negociação e na eficiência dos serviços que oferecemos. Tudo isto com os preços mais competitivos do mercado.`

Uses four Facebook-sourced photos (`479443651_…`, `482000770_…`, `485343569_…`, `485758255_…`). **Should be deleted or `noindex`ed** — it's in the sitemap.

---

## D) Design system

### Typography
Loaded via `https://fonts.googleapis.com/css?family=Roboto:400,500|Work+Sans:600&display=fallback&ver=4.11.7`, plus locally-hosted Elementor copies at `/wp-content/uploads/elementor/google-fonts/css/roboto.css` and `robotoslab.css`.

| Role | Family | Weight |
|---|---|---|
| Body / buttons / inputs | `'Roboto', sans-serif` | 400, 16px / 1rem, `line-height: 1.65em` |
| All headings + site title | `'Work Sans', sans-serif` | 600, `line-height: 1.1em`, **`text-transform: capitalize`** |
| Buttons | inherit | 500, 16px, `line-height:1em`, `letter-spacing: .5px` |
| Elementor global "Secondary" | `Roboto Slab` | 400 (declared, barely used) |

**Type scale** (desktop → ≤921px → ≤544px):
| | Desktop | ≤921px | ≤544px |
|---|---|---|---|
| H1 | 64px, lh 1.4 | 56px | 32px |
| H2 | 48px, lh 1.3 | 32px | 24px |
| H3 | 32px, lh 1.3 | 24px | 22px |
| H4 | 24px, lh 1.2 | — | 20px |
| H5 | 16px, lh 1.2 | — | — |
| H6 | 14px, lh 1.25 | — | — |
| root `html` | 100% | 91.2% | 91.2% |

Also: `.entry-title` 26px, `.widget-title` 22px, counter number 40px / title 12px.

### Colour palette

The brand is **yellow + black**. Core tokens (Astra globals, mirrored into Elementor as `--e-global-color-astglobalcolorN`):

| Token | Hex | Role |
|---|---|---|
| `--ast-global-color-0` | **`#FDD000`** | **Primary brand yellow** — links, buttons, borders, accents |
| `--ast-global-color-1` | `#000000` | Hover/active state |
| `--ast-global-color-2` | `#000000` | Headings / body text |
| `--ast-global-color-3` | `#000000` | — |
| `--ast-global-color-4` | `#FEF9E1` | Pale cream (secondary bg) |
| `--ast-global-color-5` | `#FFFFFF` | Primary background |
| `--ast-global-color-6` | `#F9F0C8` | Subtle yellow-tint background |
| `--ast-global-color-7` | `#000000` | Alternate background |
| `--ast-global-color-8` | `#000000` | — |

Frequency count across homepage CSS (`grep -oE '#[0-9a-fA-F]{3,8}|rgba?\(...\)'`):
```
76  #000000      58  #FDD000     24  #F3F3F3     18  #FFFFFF
15  #f3f3f3      10  #ffffff      9  rgba(0, 0, 0, 0.08)
 7  rgba(0, 0, 0, 0.16)           5  #fdd000
 5  rgba(219, 221, 238, 0.41)     4  rgba(0,0,0,0.05)
 2  #fbfbfb       2  #FEF9E1      2  #F9F0C8     2  rgba(0, 0, 0, 0.2)
 1  #EEEEEE       1  #FAFAFA      1  #F8FAFC     1  #e7e7e7
 1  #e6e6e6       1  #dddddd      1  #3a3a3a
```
`#F3F3F3` is the **button text colour** (not pure white) — `.elementor-button`, `.wp-block-button__link`, `.ast-custom-button` all use `color:#f3f3f3` on a `#FDD000` background. That's a **contrast-failure**: near-white text on yellow. Worth fixing on rebuild.

Leftover/unused defaults still in the CSS: Elementor's stock `--e-global-color-primary:#6EC1E4`, `--e-global-color-secondary:#54595F`, `--e-global-color-text:#7A7A7A`, `--e-global-color-accent:#61CE70`, plus the full WordPress core block palette (`#ff6900`, `#fcb900`, `#7bdcb5`, `#00d084`, `#8ed1fc`, `#0693e3`, `#9b51e0`, `#cf2e2e`, `#f78da7`, `#abb8c3`…). None are used by the design.

Selection: `::selection { background-color:#fdd000; color:#000000; }`

### Layout & breakpoints

| Variable | Value |
|---|---|
| `--ast-normal-container-width` | `1200px` |
| `--ast-narrow-container-width` | `750px` |
| `.ast-container` max-width ≥922px | `1240px` |
| Elementor `--content-width` | `1260px` |
| Elementor `--container-max-width` | `1200px` desktop / `1024px` tablet / `767px` mobile |
| `/web/` custom `.container` | `max-width: 1200px; padding: 0 20px` |

Container padding scale: `--ast-container-default-xlg-padding: 6.67em` down through `lg 5.67em`, `slg 4.34em`, `md 3.34em`, `sm 6.67em`, `xs 2.4em`, `xxs 1.4em`.

Breakpoints, by frequency:
```
42×  @media (max-width: 921px)     ← main tablet/mobile break (Astra)
37×  @media (max-width: 544px)     ← mobile
 8×  @media (min-width: 922px)     ← desktop
 3×  @media (max-width: 767px)     ← Elementor mobile
 3×  @media (max-width: 1024px)    ← Elementor tablet
 2×  @media (min-width: 768px)
 2×  @media (max-width: 1024px) and (min-width: 768px)
 1×  @media (min-width: 1025px)
 1×  @media (min-width: 1201px)
```
Note the **two competing breakpoint systems**: Astra uses 544/921/922, Elementor uses 767/768/1024/1025. Reconcile these in a rebuild.

Header/mobile switch: `@media (max-width:921.9px){#ast-desktop-header{display:none}}` and `@media (min-width:922px){#ast-mobile-header{display:none}}` — the desktop and mobile headers are **both in the DOM**, duplicating the entire nav.

Layout is **flexbox-first** (Elementor "containers", `e-con` / `e-con-boxed` / `e-con-full` / `e-flex`), not CSS Grid — except the `/web/` custom block which uses `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`.

### Components

- **Buttons**: `border-radius: 4px` (all four corners), `padding: 14px 32px`, `1px` solid border, `font-weight: 500`, `16px`, `line-height: 1em`, `letter-spacing: .5px`. Default `bg #FDD000 / border #FDD000 / color #f3f3f3`; hover `bg + border → var(--ast-global-color-1)` (`#000000`), `color #f3f3f3`. Outline variant: `2px` border, transparent-ish.
- **Cards**: `border-radius: 4px`; homepage form card `box-shadow: 0px 104px 104px -40px rgba(0,0,0,0.16)` (very dramatic). `/web/` cards use `border-radius: 15px` + `box-shadow: 0 10px 30px rgba(0,0,0,0.1)` — inconsistent with the rest of the site.
- **Sector cards**: `min-height: 400px`, `padding: 40px`, `gap: 8px`, background image with `--overlay-opacity: 0.6`.
- **Hero**: `min-height: 700px` (desktop) / `500px`, `--overlay-opacity: 0.3`, `--overlay-mix-blend-mode: multiply`, inner padding `0 64px 0 40px`.
- **Shadow tokens**: `--ast-shadow-style-guide: 0px 0px 4px 0 #00000057`; recurring `rgba(0,0,0,0.08)`, `rgba(0,0,0,0.16)`, `rgba(0,0,0,0.05)`.
- **Focus states**: `outline-style: dotted; outline-width: thin` — Astra default, weak.
- **Icons**: **Font Awesome** (Elementor bundles v4.7.0 `font-awesome.min.css` *and* v5.15.3 `fontawesome/solid/regular/brands`; `/web/` additionally pulls **v6.0.0 from cdnjs**). Plus **eicons 5.34.0 & 5.53.0** (Elementor's own set). Full icon inventory below.

Icons in use sitewide:
```
24× fas fa-check-circle    17× fas fa-phone        9× fas fa-quote-left
 9× fas fa-map-marker-alt   9× fas fa-envelope     8× fas fa-wrench
 8× fas fa-tv               8× fas fa-phone-alt    8× fas fa-file
 8× fas fa-code             8× fas fa-chevron-up   8× fas fa-camera
 8× far fa-file             8× far fa-address-card 2× fas fa-trophy
 1× each: fa-wallet, fa-tag, fa-palette, fa-hard-hat, fa-handshake,
          fa-eye, fa-clock, fa-certificate, fa-bullseye, fa-brain,
          far fa-share-square
```

### Animations & interactions

**Deliberately minimal — there is no animation library on this site.** No AOS, no GSAP, no Swiper, no Slick, no Lottie, no ScrollMagic. Confirmed: zero Elementor entrance animations (`elementor-invisible` count = 0, no `_animation` settings anywhere). Every `data-settings` on the homepage is just `{"background_background":"classic"}`.

What actually moves:
1. **Number counters** — `jquery-numerator.min.js` 0.2.1 + `waypoints.js`, animating `data-from-value="0"` → `data-to-value="N"` on scroll-into-view.
2. **Menu**: `astra-menu-animation-slide-up` + `ast-menu-hover-style-underline`.
3. **CSS transitions**: `.site-logo-img img { transition: all 0.2s linear }`; card `transition: background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s`.
4. **`/web/` only**: a hand-written scroll-reveal on `.service-card` (`opacity 0.6s ease, transform 0.6s ease`) plus `transform: translateY(-5px)` and `translateY(-3px)` hovers.
5. **Lightbox**: Elementor's built-in — only one `data-elementor-open-lightbox=""` on the footer logo, and it's set to empty (default/off).
6. `ht-mega` ships `animation.css` and `htmega-keyframes.css` but nothing consumes them.

---

## E) Assets inventory

**Logo:** `https://jsk.pt/wp-content/uploads/2025/08/cropped-cropped-Sinal-JSK-com-Numero-de-Telefone-e1754857762844-1-1.png`
- 943px wide native, 98.6 KB PNG, alt `sinal jsk com número de telefone`
- Rendered at 104×80 in header (`…-1-1-104x80.png`); srcset also has `-300x230`, `-768x588`
- Displayed at 83px desktop / 104px ≤921px (per Astra CSS) — served larger than needed
- Footer uses the **full 943px original** unresized (`hfe-site-logo-img`)
- The name suggests it's a **road-sign-style logo with a phone number baked into the image** — which means the phone number is not selectable/updatable text

**Favicon / site icon:** base `…-e1754857762844-1.png` (WP `site_icon` ID 1403)
- `…-1-32x32.png` (`rel="icon" sizes="32x32"`)
- `…-1-192x192.png` (`rel="icon" sizes="192x192"`)
- `…-1-180x180.png` (`rel="apple-touch-icon"`)

**OG image:** ❌ **None.** No `og:image` anywhere on the site.

| Asset | Size | Type | Role |
|---|---|---|---|
| `2025/08/ChatGPT-Image-10_08_2025-22_10_03.png` | **2.04 MB** | PNG | Hero bg — homepage, `/sobre-nos/`, `/contactos/`. AI-generated |
| `2025/10/image.png` | **2.10 MB** | PNG | Hero bg — `/web/`. Untitled filename |
| `2025/10/XV_JSKWEB.png` | 662 KB | PNG | Homepage "JSK Web" card bg |
| `2025/08/PHOTO-2025-03-21-16-07-21.webp` | 297 KB | WebP | `/screens-led/` hero + homepage Screens card |
| `2025/08/banner-alarmes.jpg` | 299 KB | JPEG | `/alarmes/` hero |
| `2025/08/Banner-Obras.jpeg` | 276 KB | JPEG | `/obras/` hero |
| `2025/08/JSK-Image2-e1756316573928.jpg` | 157 KB | JPEG | `/sobre-nos/` excellence section |
| `2025/09/JSK-Screens.png` | 80 KB | PNG | `/screens-led/` illustration |
| `2025/09/Video-WhatsApp-2025-09-16-as-08.53.13_1e4c33cd.mp4` | **1.27 MB** | MP4 | `/screens-led/` autoplay video |
| `2025/07/Design-sem-nome-3.png` | 15 KB | PNG | **Global decorative overlay** — `::before` on hero + footer CTA, `bottom right`, `contain` |
| `2025/08/camera-termica-e1754606272717.jpg` | — | JPEG | Homepage Alarmes card bg + `/alarmes/` gallery |
| `2025/07/479443651_9414483188616414_6752833514133670875_n.jpg` | — | JPEG | Homepage Obras card bg (Facebook-derived filename) |

**`/alarmes/` gallery** (portrait, served at 637×1024 / 768×1024 / 797×1024): `camera-preta-e1754606226885.jpg`, `camera-termica-e1754606272717.jpg`, `sensores-de-abertura-scaled-e1754606453926.jpg`, `teclado.jpg`, `camera-e-sensor.jpg`, `akarme-de-incendio-e1754606123466.jpg`

**`/obras/` gallery:** `Obras-cozinha-1.jpeg`, `Obras-cozinha-2.jpeg`, `Obras-Panda-Pet.jpeg`, `Obras-Panda-Pet-2.jpeg`

**`/construcao/` (orphan):** `482000770_9528299337234798_…_n.jpg`, `485343569_1528774958042801_…_n.jpg`, `485758255_1529511604635803_…-e1754002613532.jpg` + the `479443651_…` above

**🔴 Leftover Astra "Roofing" starter-template stock assets, still live:**
- `2020/08/roofing-client-1.jpg`, `-2.jpg`, `-3.jpg` — testimonial avatars (48×48) on `/`, `/alarmes/`, `/obras/`
- `2020/08/roofing-featured-client-photo.png` — featured testimonial photo
- `2021/03/roofing-img-04.jpg` — testimonial section background on `/alarmes/` and `/obras/`

**Format observations:** almost everything is PNG/JPEG. Only one WebP. No AVIF. No `<picture>` elements. Backgrounds are CSS `url()` so they get no `srcset` and no lazy-loading. `loading="lazy"` appears only on the small `<img>` avatars. The two 2 MB hero PNGs are the single biggest performance problem — they should be ~150 KB WebP/AVIF.

---

## F) Functionality

### Forms
**One form, Contact Form 7 ID 1632**, embedded twice: on `/contactos/` (`wpcf7-f1632-p1633-o1`) and inline on the homepage (`wpcf7-f1632-p7-o1`). Wrapped by HT Mega (`htmega-form-wrapper htmega-form-style-6`).

Posts to itself: `action="/contactos/#wpcf7-f1632-p1633-o1"` / `action="/#wpcf7-f1632-p7-o1"`, `method="post"`, `novalidate="novalidate"`. Actual submission is AJAX to `/wp-json/contact-form-7/v1/contact-forms/1632/feedback`.

| Field | `name` | Type | Placeholder | Required |
|---|---|---|---|---|
| Name | `your-name` | `text` (`maxlength=400`, `autocomplete="name"`) | `Nome completo*` | ✅ |
| Email | `your-email` | `email` (`maxlength=400`, `autocomplete="email"`) | `Email*` | ✅ |
| Phone | `tel-number` | `tel` (`maxlength=400`) | `Número de telemóvel*` | ✅ |
| Services | `your-services[]` | 4 checkboxes | — | ❌ |
| Message | `your-message` | `textarea` (`cols=40 rows=10 maxlength=2000`) | `Mensagem*` | ✅ |
| Submit | — | `submit` | value `Enviar` | — |

Checkbox values: `JSK Alarmes`, `JSK Obras`, `JSK Screens`, `JSK Web`.
Hidden fields: `_wpcf7=1632`, `_wpcf7_version=6.1.2`, `_wpcf7_locale=pt_PT`, `_wpcf7_unit_tag`, `_wpcf7_container_post`, `_wpcf7_posted_data_hash`.
Form label: `aria-label="Formulário de contacto"`.

Custom CSS on the widget (`.elementor-element-750685b`), verbatim from source:
```css
/* Checkboxes alinhadas verticalmente à esquerda */
.wpcf7-form .wpcf7-checkbox { display:flex; flex-direction:column; align-items:flex-start; gap:2px; }
.wpcf7-form .wpcf7-list-item { margin:0 !important; display:flex; align-items:center; }
.wpcf7-form .wpcf7-list-item input[type="checkbox"] { height:17px; margin:0 10px 0 0; cursor:pointer; accent-color:#000; }
.wpcf7-form .wpcf7-list-item label { margin:0; cursor:pointer; font-size:15px; }
```
Text inputs are `height: 55px`.

**⚠️ Accessibility:** the form is placeholder-only — **no `<label>` elements at all**. **⚠️ No spam protection:** no reCAPTCHA, no hCaptcha, no honeypot, no Turnstile detected. **⚠️ No GDPR consent checkbox** despite the privacy policy.

### Contact information

| | Value |
|---|---|
| Address | `JSK Alarmes, Vilar do Pinheiro` (postcode `4485-891`, from the Maps link) |
| Phone (displayed) | `+351 963 085 319` |
| Phone (in `tel:` hrefs) | `(+351) 929 153 103` — **conflicting** |
| Email | `jskalarmes@gmail.com` (free Gmail, not a domain address) |
| **NIF / VAT** | ❌ **Absent** — legally required for a Portuguese business site |
| Company legal name / registration | ❌ Absent |

**🔴 Phone number bug, precisely:**
- Footer (all pages): displays `+351 963 085 319`, href is `tel:(+351) 929 153 103` — **click-to-call dials the wrong number**
- `Lige-nos Agora` button (all pages): `tel:(+351)929153103`
- `/contactos/` icon-box: displays `+351 963 085 319`, href `tel:(+351)963 085 319` — ✅ correct
- Also, `tel:` values contain spaces and parentheses — should be normalised to `tel:+351963085319`

### Maps
❌ **No embedded map.** `<iframe>` count is **0 on every page**. The address is only a hyperlink:
`https://www.google.com/maps?client=safari&rls=en&oe=UTF-8&um=1&ie=UTF-8&fb=1&gl=pt&sa=X&geocode=Kb0rIwYGaCQNMXJXWSHxrxQr&daddr=4485-891+Vilar+do+Pinheiro`
(a raw Safari-session URL that was copy-pasted from a browser — should be a clean Maps/`geo:` link).

### Social, WhatsApp, chat
❌ **None.** No Facebook, Instagram, LinkedIn, YouTube, TikTok links. No `wa.me` / `api.whatsapp.com`. No chat widget. The only outbound links on the whole site are `https://xquisitevision.pt` and `https://devplus.pt`.

### Analytics & tracking
❌ **Completely absent.** Grepping every page for `gtag`, `googletagmanager`, `G-*`, `UA-*`, `GTM-*`, `fbq`, `connect.facebook.net`, `hotjar`, `clarity.ms` returns **zero matches**. No Google Analytics, no GTM, no Meta Pixel, no Search Console verification meta tag, no consent-mode script.

External domains contacted, in total: `jsk.pt`, `fonts.googleapis.com`, `cdnjs.cloudflare.com` (`/web/` only), `schema.org` (microdata attr, no request), `gmpg.org`, `s.w.org`, `api.w.org`.

### Cookie banner
❌ **None.** Despite the privacy policy stating cookies and IP addresses are collected.

### Language switcher
❌ None. Single-language `pt-PT`. No `hreflang`, no WPML/Polylang.

### E-commerce / booking
❌ None. No WooCommerce, no cart, no booking/scheduling. Lead-gen only.

### Other
- `/feed/`, `/comments/feed/`, `/xmlrpc.php`, `/wp-json/`, `/wp-sitemap-users-1.xml` all publicly exposed
- `#ast-scroll-top` styling exists but the element is **not rendered** — the `fa-chevron-up` icons are loaded but unused
- Astra Starter Templates preview script (`astra-sites/.../template-preview/main.js`) still loads on the front end

---

## G) SEO / meta — per page

**The SEO layer is essentially empty.** No SEO plugin (no Yoast, no Rank Math, no AIOSEO) is installed.

| Page | `<title>` | Meta description | OG tags | JSON-LD | Canonical |
|---|---|---|---|---|---|
| `/` | `JSK – A Sua Melhor Solução` | ❌ | ❌ | ❌ | ❌ |
| `/alarmes/` | `JSK Alarmes – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/obras/` | `JSK Obras – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/screens-led/` | `JSK Screens – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/web/` | `JSK Web – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/sobre-nos/` | `Sobre Nós – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/contactos/` | `Contactos – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/termos-e-condicoes/` | `Termos e Condições – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/politica-de-privacidade/` | `Política de Privacidade – JSK` | ❌ | ❌ | ❌ | ❌ |
| `/construcao/` | `Em Construção – JSK` | ❌ | ❌ | ❌ | ❌ |

The **only** meta tags present sitewide:
```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name='robots' content='max-image-preview:large' />
<meta name="generator" content="Elementor 4.2.2; …">
<meta name="generator" content="WordPress 7.0.4" />
```

**Structured data:** no JSON-LD anywhere. Only Astra's default **microdata** attributes: `itemtype="https://schema.org/WPHeader"`, `WPFooter`, `Organization` (on `.site-branding`), `SiteNavigationElement`. That's insufficient — there's no `LocalBusiness`, no `Service`, no `PostalAddress`, no `telephone`, no `openingHours`, no `AggregateRating`.

**Heading hygiene issues:**
- Homepage H1 is `Bem-Vindo à JSK` — a greeting, not a keyword-bearing heading
- Homepage uses an H6 (`A sua melhor solução`) as an eyebrow *above* the H1 — heading order violation
- `/alarmes/` and `/obras/` use H6 for `01.`–`04.` step numbers and for `Here’s What Our Client Say About Us` — semantic misuse
- Footer column headings are H4s on every page, so every page has 3 extra H4s
- Site description `A Sua Melhor Solução` exists in WP (`<title>` on home, and `bloginfo`) but the tagline element is `display:none`

**Other SEO gaps:** no `og:*`/`twitter:*`, no canonical tags, no `hreflang`, no image `sizes` for background images, alt text is auto-generated from filenames (`roofing client 3`, `camera preta`, `akarme de incendio`, `default-logo`), and `/construcao/` is indexable duplicate-ish content.

---

## H) What is the business?

**JSK** (`jsk.pt`, tagline **`A Sua Melhor Solução`** — "Your Best Solution") is a small Portuguese multi-service company based in **Vilar do Pinheiro** (Vila do Conde, Porto district; postcode 4485-891). It positions itself as a **single-partner provider across four divisions**, which is the site's central pitch — repeated as `Serviços Integrados`: *"Alarmes, obras e publicidade digital com soluções integradas num só parceiro."*

The elevator pitch, verbatim from the footer:
> `A JSK é especialista em obras, segurança e telas publicitárias, oferecendo soluções inovadoras e de qualidade com foco na excelência e satisfação do cliente.`

And from the homepage:
> `Segurança, Construção E Impacto. Tudo Num Só Lugar`

**The four divisions:**

1. **JSK Alarmes** — electronic security. Residential and commercial alarm installation, motion and door/window sensors, perimeter alarms, CCTV with remote access and recording, 24-hour monitoring centre with immediate response, and fire detection (smoke/heat detectors integrated with extinguishing systems). This appears to be the founding/core business — the address is literally written as `JSK Alarmes, Vilar do Pinheiro` and the email is `jskalarmes@gmail.com`.

2. **JSK Obras** — construction and renovation. Kitchen and bathroom remodelling, interior reconfiguration and open-plan conversions, doors and windows, thermal and acoustic insulation, bespoke cabinetry, recessed lighting; finishes (painting, tiling, stone, wood, flooring, false ceilings, partitions, wallpaper, surface restoration, waterproofing); and infrastructure (electrical, plumbing and gas, HVAC, solar panels and renewables, water heating, network and telecoms cabling).

3. **JSK Screens** — LED display **rental and sale** for advertising and events, indoor and outdoor (retail and corporate spaces, trade fairs, billboards, building façades). The page is consultative rather than transactional — a buy-vs-rent decision guide rather than a catalogue or price list.

4. **JSK Web** — website design and brand identity, delivered **through a partner agency rather than in-house**. The `/web/` page credits **DevPlus** (`devplus.pt`); the homepage card and the site-wide footer credit **XquisiteVision** (`xquisitevision.pt`), which also signs the site's own design (`Design by XquisiteVision`). This looks like a partner switch that was applied to `/web/` (last modified 2026-08-09) but never propagated to the homepage (2025-10-22) or the footer.

**Business model:** pure lead generation. Every conversion path funnels to one thing — a free quote. `Peça um Orçamento Gratuito` appears in the header, the homepage hero, the inline homepage form card, the CTA band on all 10 pages, and the `/contactos/` form heading. The secondary path is a phone call (`Lige-nos Agora`). No prices, no e-commerce, no booking. The stated sales process is a uniform 4-step flow: `Consulta` → `Orçamento` → `Instalação` → `Inspeção`.

**Claimed scale** (homepage counters): 1,280 alarm projects, 102 construction projects, 9 screen projects, 1,391 satisfied clients.

**Self-described positioning:** certified and continuously-trained team, immediate response, direct/personal service, integrated offering, modern equipment, and quality focus from planning to final execution. Mission is `soluções integradas e de alta qualidade nas áreas de segurança eletrónica, construção civil e publicidade digital`; vision is `ser uma referência nacional nas áreas em que atuamos`.

---

## Rebuild checklist — issues found

**Content / correctness**
1. 🔴 Footer `tel:` href dials `(+351) 929 153 103` while displaying `+351 963 085 319` — wrong number on every page
2. 🔴 Homepage "JSK Obras" card `Saiba Mais` → `#` (dead link)
3. 🔴 Testimonials are Lorem Ipsum with stock personas (John Allison, Alicia Potter, Edward B. Suarez, Anna Patricia) on `/`, `/alarmes/`, `/obras/`
4. 🔴 English heading `Here’s What Our Client Say About Us` untranslated (and ungrammatical) on `/alarmes/` and `/obras/`
5. 🔴 Privacy policy placeholder unfilled: `contactando-nos através de [email de contacto]`
6. 🔴 Brand conflict: DevPlus (`/web/`) vs XquisiteVision (homepage + footer)
7. 🟠 `/obras/` service numbering is `01., 01., 02.`
8. 🟠 Typos: `Lige-nos Agora` → `Ligue-nos Agora`; `Projetos de ScreensConcluídos`; `Eficiênciae Durabilidade`; `do sistemas de aiarme`; `residencias`; `akarme-de-incendio` filename
9. 🟠 `/screens-led/` uses `✔️` for *disadvantages* as well as advantages
10. 🟠 Footer "JSK Web" in Setores has no link
11. 🟠 Stray zero-width spaces (U+200B) in `Tudo Num Só Lugar​`, `Videovigilância​`, `Acesso Remoto em Tempo Real​`
12. 🟠 `/construcao/` orphan page live and in the sitemap
13. 🟠 Leftover Astra "Roofing" starter stock images (`roofing-client-1/2/3.jpg`, `roofing-featured-client-photo.png`, `roofing-img-04.jpg`)
14. 🟠 Terms page omits JSK Web from covered sectors
15. 🟠 Nav order (Web before Screens) ≠ homepage card order (Screens before Web)

**SEO**
16. 🔴 Zero meta descriptions, zero OG/Twitter tags, zero canonicals, zero JSON-LD across all 10 pages
17. 🔴 No `LocalBusiness`/`Service` structured data for a local business
18. 🟠 `/sitemap.xml` empty (only `/wp-sitemap.xml` works)
19. 🟠 H1 is a greeting; H6 used above H1; H6 used for step numbers
20. 🟠 Filename-derived alt text throughout

**Legal**
21. 🔴 No NIF / VAT number, no legal company name — required in Portugal
22. 🔴 Cookie banner absent while the privacy policy claims cookies are collected
23. 🟠 No GDPR consent checkbox on the contact form
24. 🟠 Generic Gmail address instead of a domain mailbox

**Performance**
25. 🔴 Two 2 MB hero PNGs (`ChatGPT-Image-…png` 2.04 MB, `image.png` 2.10 MB) used as CSS backgrounds — no srcset, no lazy-load
26. 🔴 Font Awesome loaded three times over (v4.7 + v5.15.3 + v6.0 from cdnjs on `/web/`) plus eicons twice (5.34.0 and 5.53.0)
27. 🟠 Astra Starter Templates preview JS shipping to visitors
28. 🟠 Footer logo serves the full 943px original for an ~80px slot
29. 🟠 Desktop and mobile headers both in the DOM
30. 🟠 `/web/` scroll handler is unthrottled and un-`rAF`ed

**Accessibility**
31. 🔴 Form is placeholder-only — no `<label>` elements
32. 🔴 `#F3F3F3` button text on `#FDD000` yellow — contrast failure
33. 🟠 Dotted thin focus outlines
34. 🟠 `target="_blank"` without `rel="noopener noreferrer"` on DevPlus links

**Security / hygiene**
35. 🟠 No security headers at all (no HSTS, CSP, X-Frame-Options, X-Content-Type-Options)
36. 🟠 `xmlrpc.php`, `/wp-json/`, `/feed/`, and `/wp-sitemap-users-1.xml` (user enumeration) all exposed
37. 🟠 No spam protection on the contact form
38. 🟠 Elementor version skew: `elementor-pro` 3.25.0/3.26.0/3.26.2 assets alongside `pro-elements` 3.32.1
39. 🟠 `/web/` embeds a full nested `<!DOCTYPE html>` document inside an Elementor HTML widget (invalid markup, dead `.hero-section` CSS)
40. 🟠 Two competing breakpoint systems (Astra 544/921/922 vs Elementor 767/768/1024/1025)