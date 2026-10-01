# Padrão Yan Nunes — instruções para a IA

> **Para a IA que recebeu este arquivo:** você vai criar ou alterar um sistema, site ou tela da **YAN NUNES — Sistemas & Consultoria**. Siga tudo o que está aqui. Se o pedido conflitar com uma regra, avise e pergunte antes de seguir; não improvise.
>
> Versão **0.1.0** · Fonte oficial: https://github.com/Yanunesxz/SystemDesing

---

## 0. Antes de começar, confirme

Pergunte só o que **não** estiver claro no pedido:

1. É **produto da Yan Nunes** ou **sistema de um cliente**?
2. Se for de cliente: **nome do cliente** e **cor principal** dele (hexadecimal, ex.: `#D7263D`).
3. Qual o **nome do sistema ou produto** (ex.: "Yan Nunes CRM", "Pedidos Acme")?
4. Onde vai rodar: **web** (navegador) ou **app** (celular)?

---

## 1. A marca (contexto)

- **YAN NUNES — Sistemas & Consultoria.** Sistemas sob medida, CRM, sistemas para representantes de vendas, sistemas de produção, automações e consultoria.
- **Posicionamento:** entende a operação da empresa e transforma problemas em soluções tecnológicas.
- **Atributos:** rápido, excelente, certeiro. Visual **tecnológico, sério e atual**: simples, moderno, preto, branco e cinza.
- **Produtos próprios** se chamam "Yan Nunes" + uma palavra: Yan Nunes CRM, Yan Nunes Sales, Yan Nunes Production.
- **Nunca:** visual colorido, degradê, brilho, sombra pesada, cara de "empresa de informática genérica" ou de template pronto.

---

## 2. Fonte: Manrope em tudo

| Peso | Onde usar |
|---|---|
| **Bold 700** | Títulos, números de destaque, logo ("YAN") |
| **SemiBold 600** | Subtítulos, ênfase no meio do texto |
| **Medium 500** | Menus, botões, rótulos, navegação, cabeçalho de tabela, etiquetas |
| **Regular 400** | Texto, descrições, tabelas, campos |

- **Proibido itálico.** A Manrope não tem itálico. Destaque é por peso.
- **Números em tabelas e indicadores com largura fixa** (`font-variant-numeric: tabular-nums`).
- Tamanhos permitidos: 12, 14, 16, 18, 20, 24 e 30px. Tabelas e formulários usam **14px**.
- Rótulos pequenos (título de card, cabeçalho de tabela) em **MAIÚSCULAS**, 12px, Medium, espaçamento entre letras de 0.12em.
- Web: Google Fonts, `family=Manrope:wght@400..700`. App: pacote do Google Fonts da plataforma (ex.: `google_fonts` no Flutter).

---

## 3. Cores

**Regra:** só preto, branco e cinza. As únicas outras cores permitidas são **as de status** e **a cor principal do cliente**.

### Neutros

| Função | Tema claro | Tema escuro |
|---|---|---|
| Fundo da página | `#FFFFFF` | `#000000` |
| Fundo secundário (menu lateral, cabeçalho de tabela) | `#F5F5F5` | `#101010` |
| Card | `#FFFFFF` | `#202020` |
| Borda | `#E5E5E5` | `#3A3A3A` |
| Borda de campo | `#D4D4D4` | `#4A4A4A` |
| Texto | `#000000` | `#F5F5F5` |
| Texto secundário | `#5C5C5C` | `#A3A3A3` |
| Decoração (linhas, ícones) | `#808080` | `#808080` |

> O cinza `#808080` **nunca** é usado em texto: reprova no contraste.

### Status (iguais em todo sistema)

| Significado | Tema claro | Tema escuro | Exemplos |
|---|---|---|---|
| Sucesso / concluído | `#116329` | `#3FB950` | Entregue, pago, ativo, meta batida |
| Em andamento | `#0550AE` | `#58A6FF` | Faturado, enviado, em produção |
| Atenção | `#7A5200` | `#D29922` | Aguardando, atrasado, pendente |
| Erro / perda | `#B3121F` | `#FF7B72` | Cancelado, recusado, erro |

### Cor principal

| Situação | Botão principal e item ativo do menu | Texto em cima |
|---|---|---|
| Produto Yan Nunes, tema claro | `#000000` | `#FFFFFF` |
| Produto Yan Nunes, tema escuro | `#FFFFFF` | `#000000` |
| Sistema de cliente | **cor do cliente** | branco ou preto, o que der mais contraste (mínimo 4,5:1) |

A cor do cliente aparece **só** no botão principal, no item ativo do menu e em destaques de seleção. **Nunca** em texto corrido, títulos, status ou no rodapé "Criado por".
Se a cor do cliente sumir no fundo preto do tema escuro (contraste abaixo de 3:1 com `#000000`), use uma versão mais clara dela no tema escuro.

---

## 4. Web: como montar a tela

### Carregue sempre isto no `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..700&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/componentes.css">

<!-- Só em sistema de cliente: -->
<style>
  :root { --color-brand: #D7263D; --color-brand-contrast: #FFFFFF; }
</style>
```

> Se os links do jsDelivr não carregarem, copie os dois CSS do **Anexo** deste documento para arquivos do projeto.

### Regras de código

- **Nunca** escreva cor, fonte ou tamanho fixo. Use as variáveis (`var(--color-text)`, `var(--space-4)`...) e as classes `yn-*`.
- Tema claro e escuro funcionam sozinhos (seguem o aparelho). Para forçar: `<html data-theme="dark">` ou `"light"`.
- Espaçamentos só da escala: 4, 8, 12, 16, 20, 24, 32, 48, 64px (`--space-1` a `--space-16`).

### Estrutura padrão de um sistema (copie)

```html
<div class="yn-shell">
  <aside class="yn-sidebar">
    <!-- Produto Yan Nunes: -->
    <div class="yn-sidebar__brand"><span>Yan <span class="yn-light">Nunes</span></span><span class="yn-sidebar__product">CRM</span></div>
    <!-- Sistema de cliente: <div class="yn-sidebar__brand">Nome do Cliente</div> -->
    <nav class="yn-nav" aria-label="Menu principal">
      <a href="/" aria-current="page">Visão geral</a>
      <a href="/clientes">Clientes</a>
      <a href="/pedidos">Pedidos</a>
    </nav>
  </aside>

  <div class="yn-main">
    <header class="yn-topbar">
      <div>
        <p class="yn-eyebrow">Vendas</p>
        <h1>Visão geral</h1>
      </div>
      <button class="yn-btn yn-btn--primary" type="button">Novo pedido</button>
    </header>

    <main class="yn-content">
      <!-- conteúdo da tela -->
    </main>

    <!-- Obrigatório em sistema de cliente: -->
    <footer class="yn-credit">
      <span>Criado por</span>
      <a href="https://github.com/Yanunesxz" rel="noopener" target="_blank"> <!-- link provisório até o site existir -->
        <span class="yn-credit__name"><strong>Yan</strong> Nunes</span>
      </a>
    </footer>
  </div>
</div>
```

### Componentes

| Componente | HTML |
|---|---|
| Botão principal (**um por tela**) | `<button class="yn-btn yn-btn--primary">Salvar</button>` |
| Botão secundário | `<button class="yn-btn yn-btn--secondary">Cancelar</button>` |
| Botão discreto | `<button class="yn-btn yn-btn--ghost">Detalhes</button>` |
| Botão de perigo | `<button class="yn-btn yn-btn--danger">Excluir</button>` |
| Card | `<section class="yn-card">...</section>` |
| Indicador | `<div class="yn-card yn-kpi"><p class="yn-eyebrow">Vendas do mês</p><p class="yn-kpi__value">R$ 248.930,50</p><span class="yn-kpi__delta yn-kpi__delta--up">+12,4% vs. mês anterior</span></div>` |
| Tabela | `<div class="yn-table-wrap"><table class="yn-table">...</table></div>`; valores com `<td class="yn-num">` |
| Etiqueta de status | `<span class="yn-badge" data-tone="success">Ativo</span>` (`success`, `info`, `warning`, `danger`) |
| Campo | `<div class="yn-field"><label class="yn-label" for="cnpj">CNPJ</label><input class="yn-input" id="cnpj"><span class="yn-hint">Só números.</span></div>` |
| Rótulo pequeno | `<p class="yn-eyebrow">Pedidos no mês</p>` |
| Texto secundário | `<span class="yn-muted">...</span>` |

Os cards de indicador ficam em grade: `display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));`

### React, Tailwind, shadcn/ui (Lovable, v0, Bolt...)

- Coloque os links do `<head>` no `index.html` (ou no layout raiz) e use as classes `yn-*` em `className`.
- Usando **shadcn/ui**, configure as variáveis dele com as cores da seção 3, no formato que o projeto já usa:

| shadcn | Valor |
|---|---|
| `--background` / `--foreground` | Fundo da página / Texto |
| `--card` / `--card-foreground` | Card / Texto |
| `--muted` / `--muted-foreground` | Fundo secundário / Texto secundário |
| `--border` / `--input` | Borda / Borda de campo |
| `--primary` / `--primary-foreground` | Cor principal / Texto em cima |
| `--destructive` | Erro |
| `--ring` | Texto (contorno de foco) |
| `--radius` | `0.375rem` (6px) |

- Fonte do Tailwind: `fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] }`.

---

## 5. App (celular) ou outra tecnologia

Use as tabelas da seção 3 e estas medidas:

| Elemento | Especificação |
|---|---|
| Botão | 40px de altura, 16px de padding lateral, borda arredondada 6px, texto 14px Medium |
| Campo | 40px de altura, 12px de padding lateral, borda 1px (borda de campo), arredondada 6px, texto 14px Regular |
| Card | Borda 1px, arredondada 10px, padding 20px |
| Tabela | Célula com 12px vertical e 16px lateral; cabeçalho 12px Medium, maiúsculas, fundo secundário |
| Etiqueta de status | 12px Medium, totalmente arredondada, texto na cor do status, fundo com 12% da mesma cor, bolinha de 6px antes do texto |
| Menu lateral | 248px de largura, fundo secundário. No celular, vira uma barra horizontal no topo |
| Foco do teclado | Contorno de 2px na cor do texto, afastado 2px |

---

## 6. Regras de interface

1. **Um botão principal por tela.** O resto é secundário ou discreto.
2. **Mobile primeiro.** Funciona em 375px de largura, sem rolagem lateral.
3. **Contraste mínimo de 4,5:1** em todo texto.
4. **Bordas pouco arredondadas** (4 a 10px). Nada de bolha.
5. **Sem degradê, brilho, sombra pesada, emoji como ícone** ou ilustração genérica.
6. **Tema claro e escuro** sempre.
7. **Estado vazio explica o próximo passo:** "Nenhum pedido ainda. Lance o primeiro em Novo pedido."

---

## 7. Textos

- Português do Brasil, tratando por "você". Frase curta, **verbo no começo** ("Salvar pedido", "Ver clientes").
- Fale da **operação** do usuário, não da tecnologia.
- Sem jargão nem exagero ("solução inovadora", "revolucionário").

| Situação | Errado | Certo |
|---|---|---|
| Sucesso | "Operação realizada com sucesso!" | "Pedido salvo." |
| Erro | "Erro inesperado." | "Não deu para salvar: o CNPJ está incompleto." |
| Vazio | "Nenhum registro encontrado." | "Nenhum cliente ainda. Cadastre o primeiro em Novo cliente." |
| Confirmação | "Tem certeza?" | "Excluir o pedido #4821? Isso não pode ser desfeito." |

---

## 8. Dados

| Dado | Como guardar | Como mostrar |
|---|---|---|
| Dinheiro | Inteiro em **centavos**, campo `*_cents` (`12990`) | `R$ 129,90` |
| Data e hora | ISO 8601 em **UTC**, campo `*_at` | `01/10/2026 14:30`, horário de São Paulo |
| Só data | `AAAA-MM-DD`, campo `*_on` | `01/10/2026` |
| Telefone | Só dígitos com 55 + DDD (`5511987654321`) | `(11) 98765-4321` |
| CPF / CNPJ / CEP | Texto, só dígitos | Com máscara |
| Sim/Não | `true` / `false`, campo `is_*` ou `has_*` | "Sim" / "Não" |
| ID de outro sistema | Texto em `external_id` + origem em `source` | — |

- Código (variáveis, funções, tabelas, campos) em **inglês**, `snake_case`. Tudo que o usuário lê, em **português**.
- Toda tabela do banco tem `id`, `created_at` e `updated_at`.
- Status são uma lista fechada em inglês (`awaiting_payment`, `paid`...), com rótulo em português na tela e a cor da seção 3.

---

## 9. Segurança e integrações

- Senhas, tokens e chaves **só em variável de ambiente**. Nunca no código. O `.env` nunca vai para o Git.
- Nunca registrar em log token, CPF ou telefone completo.
- Marketing só para quem autorizou (`marketing_opt_in = true`), conforme a LGPD.
- Webhook responde na hora e processa depois. Tudo pode ser repetido sem duplicar dados (atualiza se existe, cria se não existe).
- Cada dado tem um sistema dono (estoque, clientes, preços); os outros só leem dele.

**Sistema de loja** (Mercado Livre, Shopee, loja virtual): siga também https://github.com/Yanunesxz/SystemDesing/blob/main/docs/dominios/ecommerce.md. SKU no formato `CAT-MODELO-COR-TAM`. Nunca contatar comprador de marketplace fora da plataforma.

---

## 10. Antes de entregar, confira

- [ ] Manrope carregada, sem itálico, pesos certos (Bold títulos, Medium botões e menus, Regular texto).
- [ ] Nenhuma cor fora da seção 3; nenhuma cor ou tamanho fixo no código.
- [ ] Um botão principal por tela, na cor principal.
- [ ] Funciona em tema claro e escuro, e no celular (375px) sem rolagem lateral.
- [ ] Valores alinhados à direita com números de largura fixa.
- [ ] Textos no tom da seção 7.
- [ ] Sistema de cliente: cor do cliente só nos lugares permitidos e rodapé "Criado por Yan Nunes".
- [ ] Dinheiro em centavos, datas em UTC, segredos em variável de ambiente.

---

## Anexo — CSS do padrão

Use só se os links do jsDelivr (seção 4) não carregarem. É o mesmo conteúdo, versão 0.1.0.

### ui/tokens.css

```css
/*
 * SystemDesing — design tokens v0.1.0
 * Yan Nunes · Sistemas & Consultoria
 * https://github.com/Yanunesxz/SystemDesing
 *
 * TRÊS PARTES
 *  0. PALETA DA MARCA: os valores brutos (preto, branco, cinzas).
 *     Os sistemas não usam direto; usam os tokens --color-* da base.
 *  1. BASE (fixa em todo sistema): fonte Manrope, neutros, cores de status,
 *     espaçamento e bordas. Não muda por cliente.
 *  2. TEMA (muda por cliente): só --color-brand e --color-brand-contrast.
 *     Sem cliente, vale o tema Yan Nunes (preto no claro, branco no escuro).
 *     Para um cliente, carregue DEPOIS deste arquivo um tema-cliente.css
 *     (modelo em templates/tema-cliente.css, gerador em ui/preview.html).
 *
 * O tema padrão usa :where() (peso zero no CSS) de propósito: qualquer
 * :root do tema do cliente vence, no claro e no escuro.
 *
 * Fonte: carregue a Manrope no <head> (ver docs/02-visual.md).
 */

/* ---------- 0. PALETA DA MARCA ---------- */
:root {
  --yn-black: #000000;     /* preto da marca */
  --yn-white: #FFFFFF;     /* branco da marca */
  --yn-gray-900: #202020;  /* cinza escuro da marca */
  --yn-gray-500: #808080;  /* cinza médio da marca: reprova como texto (3,95:1 no branco) */

  /* Tons de apoio da interface */
  --yn-gray-950: #101010;
  --yn-gray-800: #3A3A3A;
  --yn-gray-700: #4A4A4A;
  --yn-gray-600: #5C5C5C;
  --yn-gray-400: #A3A3A3;
  --yn-gray-300: #D4D4D4;
  --yn-gray-200: #E5E5E5;
  --yn-gray-100: #F5F5F5;
}

/* ---------- 1. BASE ---------- */
:root {
  color-scheme: light;

  /* Neutros */
  --color-bg: var(--yn-white);
  --color-surface: var(--yn-gray-100);
  --color-surface-raised: var(--yn-white);
  --color-border: var(--yn-gray-200);
  --color-border-strong: var(--yn-gray-300);
  --color-text: var(--yn-black);
  --color-text-muted: var(--yn-gray-600);
  --color-silver: var(--yn-gray-500); /* só decoração: linhas, ícones, crédito. Nunca texto pequeno. */

  /* Status: iguais em todo sistema, não mudam por cliente */
  --color-success: #116329;
  --color-warning: #7A5200;
  --color-danger: #B3121F;
  --color-info: #0550AE;

  /* Foco do teclado: sempre na cor do texto, visível com qualquer cor de cliente */
  --color-focus: var(--color-text);

  /* Tipografia: Manrope em tudo (marca, site e sistema).
     Bold/SemiBold: logo, títulos, destaques
     Medium: menus, botões, rótulos, navegação
     Regular: texto, descrições, tabelas
     Manrope não tem itálico: destaque é por peso. */
  --font-sans: "Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --text-xs: 0.75rem;   /* 12px */
  --text-sm: 0.875rem;  /* 14px: padrão de tabela e formulário */
  --text-base: 1rem;    /* 16px */
  --text-lg: 1.125rem;  /* 18px */
  --text-xl: 1.25rem;   /* 20px */
  --text-2xl: 1.5rem;   /* 24px */
  --text-3xl: 1.875rem; /* 30px */

  --weight-regular: 400;
  --weight-medium: 500;
  --weight-semibold: 600;
  --weight-bold: 700;

  --tracking-tight: -0.02em; /* títulos */
  --tracking-wide: 0.12em;   /* rótulos em maiúsculas, como "SISTEMAS & CONSULTORIA" */

  --leading-tight: 1.2;
  --leading-normal: 1.5;

  /* Espaçamento: escala de 4px */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-12: 48px;
  --space-16: 64px;

  /* Bordas: pouco arredondadas, visual sóbrio */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-full: 999px;

  /* Sombras */
  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.08);

  /* Movimento */
  --duration-fast: 120ms;
  --duration-normal: 200ms;

  /* Layout de painel */
  --sidebar-width: 248px;
  --topbar-height: 56px;
  --content-max: 1280px;
}

/* ---------- 2. TEMA PADRÃO: Yan Nunes ---------- */
:where(:root) {
  --color-brand: var(--yn-black);
  --color-brand-contrast: var(--yn-white);
}

/* Derivados do tema: calculados a partir da cor do cliente. Não sobrescreva. */
:root {
  --color-brand-hover: color-mix(in oklab, var(--color-brand), var(--color-brand-contrast) 15%);
  --color-brand-edge: color-mix(in oklab, var(--color-brand), var(--color-text) 20%);
  --color-brand-subtle: color-mix(in oklab, var(--color-brand) 10%, var(--color-bg));
}

/* ---------- TEMA ESCURO ---------- */
/* Segue o sistema operacional, a menos que a página force data-theme="light" */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;

    --color-bg: var(--yn-black);
    --color-surface: var(--yn-gray-950);
    --color-surface-raised: var(--yn-gray-900);
    --color-border: var(--yn-gray-800);
    --color-border-strong: var(--yn-gray-700);
    --color-text: var(--yn-gray-100);
    --color-text-muted: var(--yn-gray-400);
    --color-silver: var(--yn-gray-500);

    --color-success: #3FB950;
    --color-warning: #D29922;
    --color-danger: #FF7B72;
    --color-info: #58A6FF;

    --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
    --shadow-md: 0 4px 12px rgb(0 0 0 / 0.5);
  }

  :where(:root:not([data-theme="light"])) {
    --color-brand: var(--yn-white);
    --color-brand-contrast: var(--yn-black);
  }
}

/* Tema escuro forçado pela página: <html data-theme="dark"> */
:root[data-theme="dark"] {
  color-scheme: dark;

  --color-bg: var(--yn-black);
  --color-surface: var(--yn-gray-950);
  --color-surface-raised: var(--yn-gray-900);
  --color-border: var(--yn-gray-800);
  --color-border-strong: var(--yn-gray-700);
  --color-text: var(--yn-gray-100);
  --color-text-muted: var(--yn-gray-400);
  --color-silver: var(--yn-gray-500);

  --color-success: #3FB950;
  --color-warning: #D29922;
  --color-danger: #FF7B72;
  --color-info: #58A6FF;

  --shadow-sm: 0 1px 2px rgb(0 0 0 / 0.4);
  --shadow-md: 0 4px 12px rgb(0 0 0 / 0.5);
}

:where(:root[data-theme="dark"]) {
  --color-brand: var(--yn-white);
  --color-brand-contrast: var(--yn-black);
}
```

### ui/componentes.css

```css
/*
 * SystemDesing — componentes de painel v0.1.0
 * Yan Nunes · Sistemas & Consultoria
 *
 * Requer ui/tokens.css carregado ANTES.
 * Todas as classes começam com "yn-". Exemplos de uso em ui/preview.html.
 *
 * Pesos da Manrope: Bold/SemiBold em títulos e destaques, Medium em menus,
 * botões e rótulos, Regular em texto e tabelas.
 */

/* ---------- Base ---------- */
body {
  margin: 0;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  margin: 0;
  font-weight: var(--weight-bold);
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  text-wrap: balance;
}

h1 { font-size: var(--text-2xl); }
h2 { font-size: var(--text-lg); }
h3, h4 { font-size: var(--text-base); }

/* Manrope não tem itálico: o navegador só entortaria a letra. Destaque é por peso. */
em, i, cite {
  font-style: normal;
  font-weight: var(--weight-semibold);
}

a {
  color: inherit;
  text-decoration-thickness: 1px;
  text-underline-offset: 0.2em;
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition: none !important;
    animation: none !important;
  }
}

/* ---------- Texto ---------- */
/* Rótulo em maiúsculas com espaçamento largo — eco do "SISTEMAS & CONSULTORIA" do logo */
.yn-eyebrow {
  margin: 0;
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.yn-muted {
  color: var(--color-text-muted);
}

/* Número em coluna: largura fixa e alinhado à direita */
.yn-num {
  font-variant-numeric: tabular-nums;
  text-align: right;
  white-space: nowrap;
}

/* ---------- Botões ---------- */
.yn-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  min-height: 40px;
  padding: 0 var(--space-4);
  border: 1px solid transparent;
  border-radius: var(--radius-md);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: background-color var(--duration-fast), border-color var(--duration-fast);
}

.yn-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Principal: a única coisa na cor do cliente. Um por tela. */
.yn-btn--primary {
  background: var(--color-brand);
  border-color: var(--color-brand-edge);
  color: var(--color-brand-contrast);
}

.yn-btn--primary:hover:not(:disabled) {
  background: var(--color-brand-hover);
}

.yn-btn--secondary {
  background: var(--color-surface-raised);
  border-color: var(--color-border-strong);
  color: var(--color-text);
}

.yn-btn--secondary:hover:not(:disabled),
.yn-btn--ghost:hover:not(:disabled) {
  background: var(--color-surface);
}

.yn-btn--ghost {
  background: transparent;
  color: var(--color-text);
}

.yn-btn--danger {
  background: transparent;
  border-color: currentColor;
  color: var(--color-danger);
}

/* ---------- Card ---------- */
.yn-card {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

/* ---------- Indicador (KPI) ---------- */
.yn-kpi {
  display: grid;
  gap: var(--space-2);
  align-content: start;
}

.yn-kpi__value {
  margin: 0;
  font-size: var(--text-2xl);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-tight);
  line-height: var(--leading-tight);
  font-variant-numeric: tabular-nums;
}

.yn-kpi__delta {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-muted);
}

.yn-kpi__delta--up { color: var(--color-success); }
.yn-kpi__delta--down { color: var(--color-danger); }

/* ---------- Tabela ---------- */
.yn-table-wrap {
  overflow-x: auto;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
}

.yn-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-sm);
  font-variant-numeric: tabular-nums;
}

.yn-table th {
  padding: var(--space-3) var(--space-4);
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: var(--tracking-wide);
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
  color: var(--color-text-muted);
}

.yn-table td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--color-border);
  white-space: nowrap;
}

.yn-table tbody tr:last-child td { border-bottom: 0; }
.yn-table tbody tr:hover { background: var(--color-surface); }
.yn-table .yn-num { text-align: right; }

/* ---------- Etiqueta de status ---------- */
/* Use o status unificado de docs/03-dados.md: <span class="yn-badge" data-status="paid">Pago</span> */
.yn-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: var(--radius-full);
  background: color-mix(in oklab, currentColor 12%, transparent);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  white-space: nowrap;
  color: var(--color-text-muted);
}

.yn-badge::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

.yn-badge[data-status="awaiting_payment"],
.yn-badge[data-status="cancel_requested"],
.yn-badge[data-tone="warning"] { color: var(--color-warning); }

.yn-badge[data-status="paid"],
.yn-badge[data-status="invoiced"],
.yn-badge[data-status="ready_to_ship"],
.yn-badge[data-status="shipped"],
.yn-badge[data-tone="info"] { color: var(--color-info); }

.yn-badge[data-status="delivered"],
.yn-badge[data-tone="success"] { color: var(--color-success); }

.yn-badge[data-status="cancelled"],
.yn-badge[data-status="returned"],
.yn-badge[data-tone="danger"] { color: var(--color-danger); }

/* ---------- Formulário ---------- */
.yn-field {
  display: grid;
  gap: var(--space-1);
  min-width: 0;
}

.yn-label {
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

.yn-input {
  box-sizing: border-box;
  width: 100%;
  min-height: 40px;
  padding: 0 var(--space-3);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border-strong);
  border-radius: var(--radius-md);
  font: inherit;
  font-size: var(--text-sm);
  color: var(--color-text);
}

.yn-input:focus-visible {
  outline-offset: 0;
  border-color: var(--color-focus);
}

.yn-hint {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
}

/* ---------- Layout de painel ---------- */
.yn-shell {
  display: grid;
  grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
  min-height: 100vh;
}

.yn-sidebar {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  padding: var(--space-5) var(--space-3);
  background: var(--color-surface);
  border-right: 1px solid var(--color-border);
}

/* Assinatura no menu: "YAN NUNES" (Yan em Bold, Nunes em Regular) + nome do produto */
.yn-sidebar__brand {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: var(--space-2);
  padding: 0 var(--space-3);
  font-size: var(--text-base);
  font-weight: var(--weight-bold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
}

.yn-sidebar__brand .yn-light {
  font-weight: var(--weight-regular);
}

/* Produto: YAN NUNES · CRM, YAN NUNES · SALES... */
.yn-sidebar__product {
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text-muted);
}

.yn-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.yn-nav a {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  text-decoration: none;
  white-space: nowrap;
  color: var(--color-text-muted);
}

.yn-nav a:hover {
  background: var(--color-surface-raised);
  color: var(--color-text);
}

.yn-nav a[aria-current="page"] {
  background: var(--color-brand);
  color: var(--color-brand-contrast);
}

.yn-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.yn-topbar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  min-height: var(--topbar-height);
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border);
}

.yn-content {
  box-sizing: border-box;
  display: grid;
  align-content: start;
  gap: var(--space-6);
  flex: 1;
  width: 100%;
  max-width: var(--content-max);
  padding: var(--space-6);
}

@media (max-width: 768px) {
  .yn-shell { grid-template-columns: minmax(0, 1fr); }

  .yn-sidebar {
    gap: var(--space-3);
    padding: var(--space-3) var(--space-4);
    border-right: 0;
    border-bottom: 1px solid var(--color-border);
  }

  .yn-sidebar__brand { padding: 0; }
  .yn-nav { flex-direction: row; overflow-x: auto; }
  .yn-topbar, .yn-content { padding-inline: var(--space-4); }
}

/* ---------- Crédito "Criado por" ---------- */
/* Obrigatório no rodapé de todo sistema entregue. Sempre neutro, nunca na cor do cliente. */
.yn-credit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-3);
  padding: var(--space-6) var(--space-4);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--color-text-muted);
}

/* As linhas dos lados repetem as da tagline do logo */
.yn-credit::before,
.yn-credit::after {
  content: "";
  flex: 0 1 var(--space-8);
  height: 1px;
  background: var(--color-silver);
}

.yn-credit a {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  text-decoration: none;
  color: var(--color-text);
  opacity: 0.75;
  transition: opacity var(--duration-fast);
}

.yn-credit a:hover { opacity: 1; }

/* Símbolo YN em SVG — quando a versão vetorial existir */
.yn-credit__mark {
  width: auto;
  height: 14px;
}

.yn-credit__name {
  font-weight: var(--weight-regular);
}

.yn-credit__name strong {
  font-weight: var(--weight-bold);
}
```
