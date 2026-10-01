# 02 — Visual

Toda tela (sistema, CRM, painel, site, e-mail) usa os mesmos **design tokens** (variáveis com nome fixo para cor, fonte, espaçamento, borda e sombra) e os mesmos **componentes**.

Para ver tudo funcionando, abra **https://systemdesing.vercel.app** (ou o [`index.html`](../index.html) da raiz no navegador): é a vitrine do design system, com cada componente funcionando, o código para copiar e o gerador de tema do cliente.
O resumo destas regras para mandar a uma IA está em [`PADRAO-YAN-NUNES.md`](../PADRAO-YAN-NUNES.md).

## A regra

**Nenhum sistema escreve cor ou tamanho "solto".** Nada de `color: #000` no código: sempre `color: var(--color-text)`.
Quem define os valores é [`ui/tokens.css`](../ui/tokens.css). Quem define os componentes é [`ui/componentes.css`](../ui/componentes.css).

## Duas camadas: a sua base e a cor do cliente

| Camada | O que tem | Quem decide |
|---|---|---|
| **Base Yan Nunes** | Fonte Manrope, pesos, cinzas, cores de status, espaçamento, bordas, componentes, crédito no rodapé | Yan Nunes. Igual em todo sistema. |
| **Tema do cliente** | **Só** a cor principal (`--color-brand`) e a cor do texto em cima dela (`--color-brand-contrast`) | O cliente |

Sem cliente (sistemas e produtos da própria Yan Nunes), vale o **tema Yan Nunes**: botão preto no tema claro e branco no tema escuro.

Por que só uma cor? Porque é o suficiente para o sistema "ser do cliente" e impede que cada projeto vire uma identidade diferente para manter. A cor do cliente aparece em: botão principal, item ativo do menu e destaques de seleção. **Nunca** em texto corrido, status ou no crédito.

### Como criar o tema de um cliente

1. Abra https://systemdesing.vercel.app, vá em **A cor do cliente** e digite a cor (ex.: `#D7263D`).
2. A página confere o contraste, escolhe se o texto do botão é branco ou preto e, se a cor sumir no fundo preto, cria uma variação para o tema escuro.
3. Clique em **Copiar CSS** e salve como `tema-cliente.css` no sistema do cliente (modelo em [`templates/tema-cliente.css`](../templates/tema-cliente.css)).

## Como carregar no sistema

```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="color-scheme" content="light dark">
<script>
  try { var t = localStorage.getItem("tema"); if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; } catch (e) {}
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..700&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.2.0/ui/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.2.0/ui/componentes.css">
<link rel="stylesheet" href="tema-cliente.css"> <!-- só em sistema de cliente -->
```

O `<script>` de uma linha aplica o tema que a pessoa escolheu antes de a tela aparecer (ver [Tema claro e escuro](#tema-claro-e-escuro-obrigatório)).

### Tailwind 4 (stack padrão)

Copie o bloco `@theme` de [`ui/tailwind.css`](../ui/tailwind.css) para o CSS principal do projeto, logo depois de `@import "tailwindcss";`. Ele:

- **apaga a paleta do Tailwind**: `bg-blue-500`, `text-slate-900` e afins deixam de existir, então nenhuma cor fora do padrão entra no sistema, nem por engano da IA;
- cria as classes de cor do padrão, que seguem tema claro, escuro e cor do cliente sozinhas;
- define Manrope e os raios do padrão.

| Classe | Token | Uso |
|---|---|---|
| `bg-page` | `--color-bg` | Fundo da página |
| `bg-panel` | `--color-surface` | Menu lateral, cabeçalho de tabela |
| `bg-raised` | `--color-surface-raised` | Card |
| `border-line` / `border-line-strong` | `--color-border` / `--color-border-strong` | Borda / borda de campo |
| `text-ink` / `text-muted` | `--color-text` / `--color-text-muted` | Texto / secundário |
| `text-decor` | `--color-silver` | Linhas e ícones decorativos |
| `bg-primary` / `hover:bg-primary-hover` / `text-on-primary` | `--color-brand` e derivados | Botão principal (cor do cliente) |
| `bg-primary-subtle` | `--color-brand-subtle` | Seleção suave |
| `text-tone-success` (e `info`, `warning`, `danger`) | Status | Texto de status; `bg-tone-success/10` para fundo suave |
| `outline-ring` | `--color-focus` | Foco |
| `rounded-sm` / `rounded-md` / `rounded-lg` | 4 / 6 / 10px | `rounded-xl` e maiores não existem |

O espaçamento do Tailwind já é de 4 em 4px (`p-4` = 16px), igual ao padrão. As classes `yn-*` de `componentes.css` continuam valendo e podem ser misturadas com as do Tailwind.

**shadcn/ui:** configure as variáveis dele com os tokens (tabela no documento das IAs, seção 5).

## Tema claro e escuro (obrigatório)

**Todo sistema tem modo claro e modo escuro.** Sem exceção: sistema interno, sistema de cliente, app de rua, painel de TV, site.

| Regra | Como fazer |
|---|---|
| Começa igual ao aparelho | Sem `data-theme` no `<html>`, o CSS segue o tema do celular ou do computador (`prefers-color-scheme`). |
| A pessoa pode trocar | Botão de lua/sol na barra do topo (troca na hora) e a escolha **Aparelho · Claro · Escuro** (`.yn-segmented`) em Configurações ou no menu da conta. |
| A escolha fica guardada | `localStorage`, chave `tema`, valor `light` ou `dark` (sem chave = igual ao aparelho). Com login, guarde também no perfil para valer em outro aparelho. |
| Não pisca ao abrir | Script de uma linha no `<head>` aplica a escolha guardada antes de a tela aparecer. |
| Só tokens | O escuro vem **só** dos tokens. Proibido `.dark .bg-white {…}`, remapear a paleta do framework ou escrever cor fixa. |
| Imagem e logo | Logo, gráfico em imagem e ilustração têm versão para fundo escuro (ou fundo próprio). Foto não muda. |
| Conferido nos dois | Toda tela é conferida no claro e no escuro antes de entregar. |

No `<head>`, antes dos CSS:

```html
<meta name="color-scheme" content="light dark">
<script>
  try { var t = localStorage.getItem("tema"); if (t === "light" || t === "dark") document.documentElement.dataset.theme = t; } catch (e) {}
</script>
```

Trocar o tema (o mesmo código serve para o botão do topo e para o `.yn-segmented`):

```js
function temaEscuroAgora() {
  const t = document.documentElement.dataset.theme;
  return t ? t === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
}

// valor: "light", "dark" ou "" (igual ao aparelho)
function definirTema(valor) {
  const raiz = document.documentElement;
  if (valor) raiz.dataset.theme = valor; else delete raiz.dataset.theme;
  try { valor ? localStorage.setItem("tema", valor) : localStorage.removeItem("tema"); } catch (e) {}
}

// Botão do topo: mostra a lua no claro e o sol no escuro
botaoTema.addEventListener("click", () => definirTema(temaEscuroAgora() ? "light" : "dark"));
```

```html
<!-- Em Configurações ou no menu da conta -->
<div class="yn-segmented" role="group" aria-label="Tema">
  <button type="button" aria-pressed="true" onclick="definirTema('')"><i data-lucide="monitor"></i>Aparelho</button>
  <button type="button" aria-pressed="false" onclick="definirTema('light')"><i data-lucide="sun"></i>Claro</button>
  <button type="button" aria-pressed="false" onclick="definirTema('dark')"><i data-lucide="moon"></i>Escuro</button>
</div>
```

**React:** o script de uma linha vai no `index.html` (não num componente, senão pisca). As funções acima viram `src/lib/tema.ts`, e o estado do `.yn-segmented` lê `localStorage.getItem("tema") ?? ""`.


## Tipografia: Manrope em tudo

A mesma família na marca, no site e dentro dos sistemas. É isso que faz a interface parecer Yan Nunes mesmo com a cor do cliente.

| Peso | Uso | Token |
|---|---|---|
| **Bold 700** | Logo ("YAN"), títulos, números de destaque (KPI) | `--weight-bold` |
| **SemiBold 600** | Subtítulos, ênfase no meio do texto | `--weight-semibold` |
| **Medium 500** | Menus, botões, rótulos, navegação, cabeçalho de tabela, etiquetas | `--weight-medium` |
| **Regular 400** | Texto, descrições, tabelas, campos | `--weight-regular` |

**Regras:**

- **Sem itálico.** A Manrope não tem; o navegador só entorta a letra. Destaque é por peso.
- **Números em tabela e indicador usam largura fixa** (`font-variant-numeric: tabular-nums`, já aplicado em `.yn-table`, `.yn-num` e `.yn-kpi__value`). Assim as colunas de valores ficam alinhadas.
- Tamanhos só da escala `--text-xs` (12px) a `--text-3xl` (30px). Tabela e formulário usam 14px (`--text-sm`).
- Rótulo pequeno em maiúsculas com espaçamento largo (`.yn-eyebrow`) repete a assinatura "SISTEMAS & CONSULTORIA" do logo. Use em título de card e cabeçalho de tabela, não em texto corrido.

## Paleta

**Cores da marca:**

| Token | Valor | Uso |
|---|---|---|
| `--yn-black` | `#000000` | Texto no tema claro, fundo no tema escuro, botão padrão |
| `--yn-white` | `#FFFFFF` | Fundo no tema claro, botão padrão no tema escuro |
| `--yn-gray-900` | `#202020` | Cards e painéis no tema escuro |
| `--yn-gray-500` | `#808080` | Linhas, ícones, crédito. **Nunca texto pequeno.** |

> **Atenção:** o cinza médio `#808080` tem contraste de só **3,95:1** no branco e **4,13:1** no cinza escuro. O mínimo para texto é 4,5:1. Por isso o texto secundário usa `#5C5C5C` no tema claro e `#A3A3A3` no escuro.

Os tons de apoio (`--yn-gray-100` a `--yn-gray-950`) existem para fundos, bordas e texto secundário. Os sistemas **não** usam `--yn-*` direto: usam os tokens de função abaixo, que já trocam sozinhos entre claro e escuro.

| Token de função | Claro | Escuro |
|---|---|---|
| `--color-bg` | branco | preto |
| `--color-surface` | `#F5F5F5` | `#101010` |
| `--color-surface-raised` (cards) | branco | `#202020` |
| `--color-border` | `#E5E5E5` | `#3A3A3A` |
| `--color-text` | preto | `#F5F5F5` |
| `--color-text-muted` | `#5C5C5C` | `#A3A3A3` |
| `--color-brand` | preto (ou cor do cliente) | branco (ou cor do cliente) |

**Status** (únicas cores fora do preto e branco, iguais em todo sistema):

| Token | Significa | Exemplos |
|---|---|---|
| `--color-success` | Concluído, deu certo | Entregue, pago, meta batida |
| `--color-info` | Em andamento | Faturado, enviado, em produção |
| `--color-warning` | Precisa de atenção | Aguardando pagamento, cancelamento solicitado, atrasado |
| `--color-danger` | Erro, perda, parado | Cancelado, devolvido, erro de integração |

Na tela, use a etiqueta `.yn-badge` com `data-status` (status de pedido) ou `data-tone="success|info|warning|danger"` (qualquer outro).

## Componentes

Todos em [`ui/componentes.css`](../ui/componentes.css), com prefixo `yn-`. Cada um tem exemplo funcionando e código para copiar na [vitrine](https://systemdesing.vercel.app).

| Grupo | Componente | Classe |
|---|---|---|
| Básicos | Botões | `.yn-btn` + `--primary` (um por tela), `--secondary`, `--ghost`, `--danger`, `--icon`, `--sm` (pequeno, dentro de card e quadro); carregando com `aria-busy="true"` |
| | Campos | `.yn-field`, `.yn-label`, `.yn-input` (também em `textarea` e `select`), `.yn-hint`, `.yn-error` + `aria-invalid="true"`, `.yn-input-wrap` (campo com ícone) |
| | Busca com lista | `.yn-combobox` > `input[role="combobox"]` + `.yn-listbox[role="listbox"]` com `[role="option"]`, `.yn-listbox__meta`, `.yn-listbox__empty` |
| | Seleção | `.yn-check` (caixa e opção única), `.yn-fieldset`, `.yn-switch` (chave), `.yn-range`, `.yn-segmented` (2 a 4 opções: tema, lista ou quadro) |
| | Pessoas e etiquetas | `.yn-avatar`, `.yn-avatar-group`, `.yn-chip`, `.yn-badge[data-status]` ou `[data-tone]`, `.yn-count` (contador) |
| | Filtros e prazos | `button.yn-chip[aria-pressed]` em `.yn-chips` (filtro rápido), `.yn-deadline[data-state="soon/late/done/paused"]` |
| | Navegação | `.yn-breadcrumb`, `.yn-tabs` + `.yn-tab`, `.yn-pagination` |
| | Contexto | `.yn-tooltip[data-tooltip]`, `.yn-menu` (com `<details>`; `--block` e `__list--up`), `.yn-accordion` |
| | Avisos e sobreposições | `.yn-alert[data-tone]`, `.yn-banner[data-tone]` (faixa no topo), `.yn-toast-region` + `.yn-toast`, `.yn-modal`, `.yn-drawer` e `.yn-sheet` (com `<dialog>`), `.yn-progress`, `.yn-spinner`, `.yn-skeleton` |
| Sistema | Layout de painel | `.yn-shell` (`--tabs`, `data-nav`, `data-sidebar`) > `.yn-sidebar` + `.yn-scrim` + `.yn-main` > `.yn-topbar` + `.yn-content`; `.yn-nav-toggle`, `.yn-tabbar` |
| | Menu lateral | `.yn-sidebar__head`, `.yn-sidebar__brand` + `.yn-sidebar__product`, `.yn-sidebar__toggle`, `.yn-context`, `.yn-nav__label`, `.yn-sidebar__user` |
| | Card e indicador | `.yn-card`, `.yn-kpi`, `.yn-kpi__value` (`--empty` para "Sem dados"), `.yn-kpi__delta--up/--down` |
| | Tabela | `.yn-table-wrap` > `.yn-table` (`--stack` vira cards no celular), números com `.yn-num` |
| | Ficha de dados | `.yn-dl` (`--rows` um por linha); `dd` vazio mostra "—" |
| | Etapas e histórico | `.yn-steps` > `.yn-step[data-state]`; `.yn-timeline` > `.yn-timeline__item[data-tone]` |
| | Quadro | `.yn-kanban` > `.yn-kanban__col` (`data-lane="won/lost"`) > `.yn-kanban__card`, mover com `.yn-kanban__actions` |
| | Mensagens | `.yn-inbox` > `.yn-inbox__list` + `.yn-thread` > `.yn-bubble[data-from="them/me/note/system"]` + `.yn-composer` |
| | Catálogo e pedido | `.yn-catalog` > `.yn-product`, `.yn-qty`, `.yn-grade`, `.yn-fab` |
| | Decisão | `.yn-decision` (fatos + aprovar/reprovar; reprovar pede motivo) |
| | Gráficos | `.yn-bars`, `.yn-columns` (com `--value` de 0 a 100), `.yn-as-table` (ver como tabela) |
| | Metas | `.yn-ranking`, `.yn-meter` (`--value`, `--expected`, `data-state`) |
| | Ficha 360 e próximo passo | `.yn-split` > `.yn-split__aside`; `.yn-next[data-state="late"]` |
| | Formulário longo | `.yn-form-section`, `.yn-form-grid`, `.yn-field--full`, `.yn-form-footer` |
| | Arquivos | `.yn-dropzone`, `.yn-file` (`data-state="error"` no erro) |
| | Vazio e erro | `.yn-empty`; `.yn-empty[data-state="error"]` + `.yn-empty__code` para falha ao carregar |
| | Crédito | `.yn-credit` |

## Estrutura de um sistema

Todo sistema tem a mesma casca. Quem já usou um sistema da Yan Nunes acha tudo no mesmo lugar no próximo.

```
┌───────────────┬───────────────────────────────────────────────┐
│ .yn-sidebar   │ .yn-banner   (só quando há aviso da tela toda)  │
│               ├───────────────────────────────────────────────┤
│ marca     [⇤] │ .yn-topbar   [☰]  título            ação  [☾]  │
│ [empresa ▾]   ├───────────────────────────────────────────────┤
│               │ .yn-content                                   │
│ .yn-nav       │   o conteúdo da tela (até 1280px de largura)  │
│  Visão geral  │                                               │
│  Pedidos  (3) │                                               │
│  CADASTROS    │                                               │
│  Clientes     │                                               │
│               ├───────────────────────────────────────────────┤
│ [JR] Juliana  │ .yn-credit   Criado por Yan Nunes             │
└───────────────┴───────────────────────────────────────────────┘
```

| Peça | Classe | Para que serve | Quando usar |
|---|---|---|---|
| Casca | `.yn-shell` | Menu à esquerda, conteúdo à direita | Sempre |
| Menu lateral | `.yn-sidebar` | Fica parado enquanto a página rola; rola sozinho se for comprido | Sempre (some no modelo abas, no celular) |
| Linha de cima do menu | `.yn-sidebar__head` > `.yn-sidebar__brand` + `.yn-sidebar__toggle` | Assinatura do produto ou nome do cliente; botão de recolher | Sempre |
| Contexto | `.yn-menu.yn-menu--block` > `.yn-context` | Trocar de empresa, filial, loja ou equipe | Só se a pessoa trabalha em mais de uma |
| Navegação | `.yn-nav` | Páginas do sistema. Atual com `aria-current="page"`, grupos com `.yn-nav__label`, pendências com `.yn-count` | Sempre; até 8 itens por grupo |
| Usuário | `.yn-sidebar__user` | Avatar, nome, papel e menu (perfil, tema, sair) | Sistema com login |
| Fundo da gaveta | `.yn-scrim` | Escurece a tela atrás do menu aberto no celular | Modelo gaveta |
| Coluna principal | `.yn-main` | Tudo o que fica à direita do menu | Sempre |
| Faixa no topo | `.yn-banner` | Modo demonstração, sem internet, versão nova, integração parada | Só quando acontece |
| Barra do topo | `.yn-topbar` | Botão do menu (`.yn-nav-toggle`, só no celular), título (`.yn-eyebrow` + `h1`), a ação principal e o botão de tema | Sempre |
| Conteúdo | `.yn-content` | A tela em si, em grade com 24px entre blocos | Sempre |
| Crédito | `.yn-credit` | "Criado por Yan Nunes", uma linha pequena | Sistema de cliente |
| Abas embaixo | `.yn-tabbar` | Menu do celular no modelo abas | Modelo abas |

### Menu no celular: dois modelos

| Modelo | Para quem | Como monta |
|---|---|---|
| **Gaveta** (padrão) | Quem trabalha no escritório: CRM, SAC, financeiro, produção | `.yn-shell` + botão `.yn-nav-toggle` na barra do topo + `.yn-scrim`. Aberta = `data-nav="open"` no `.yn-shell`. Fecha ao tocar fora, no Esc e ao escolher um item. Ao abrir, o foco vai para o primeiro item; ao fechar, volta para o botão. |
| **Abas embaixo** | Quem trabalha na rua: representante, entregador, vistoria | `.yn-shell.yn-shell--tabs` + `<nav class="yn-tabbar">` com **3 a 5** destinos (ícone + nome curto). O resto vai em "Mais", que abre uma folha de baixo (`.yn-sheet`). Botão flutuante (`.yn-fab`) e avisos sobem acima das abas sozinhos. |

No computador os dois são iguais: menu lateral fixo, que recolhe para só ícones com `data-sidebar="collapsed"` no `.yn-shell` (guarde a escolha no navegador; cada link leva `title` com o nome).

Telas completas para copiar: [`ui/exemplos/menu-gaveta.html`](../ui/exemplos/menu-gaveta.html) e [`ui/exemplos/menu-abas.html`](../ui/exemplos/menu-abas.html) (abertas também na vitrine, seção **Telas completas**).

## Responsivo

**Mobile primeiro:** desenhe para 375px e depois aproveite o espaço maior. Representante, entregador e dono de loja usam o sistema no celular.

### Larguras

| Faixa | Largura | O que acontece |
|---|---|---|
| Celular | até 768px | Menu vira gaveta ou abas embaixo; uma coluna; 16px de margem lateral; título menor; ações da barra do topo descem para a linha de baixo |
| Tablet e notebook pequeno | 769px a 960px | Menu lateral fixo (recolha se apertar); ficha 360 ainda empilhada; grades se ajustam sozinhas |
| Computador | acima de 960px | Tudo lado a lado; o conteúdo para em 1280px e não estica além disso |
| Tela de toque | qualquer largura com dedo (`pointer: coarse`) | Tudo que se aperta tem 44px; campos com letra de 16px (abaixo disso o iPhone dá zoom sozinho) |

Só existem esses cortes: **768px** (celular) e **960px** (ficha 360). O resto se ajusta sem corte, com grade `auto-fit`.

### O que cada peça vira no celular

| Peça | Computador | Celular |
|---|---|---|
| Menu | Lateral fixo, recolhível | Gaveta (botão ☰) ou abas embaixo |
| Barra do topo | Título e ações na mesma linha | Título menor; ações descem |
| Indicadores | Até 4 por linha | 1 ou 2 por linha |
| Tabela | Completa | Rola de lado dentro do `.yn-table-wrap`, ou vira cards com `.yn-table--stack` + `data-label` em cada célula |
| Filtros rápidos (`.yn-chips`) | Quebram linha | Uma linha que rola de lado |
| Quadro (kanban) | Colunas lado a lado | Rola de lado, uma coluna por vez |
| Caixa de mensagens | Lista e conversa juntas | Lista **ou** conversa (`data-view="thread"`), com botão de voltar |
| Ficha 360 | Resumo fixo à esquerda | Resumo em cima, abas embaixo |
| Formulário longo | Título da seção à esquerda | Seções empilhadas; botões do rodapé ocupam a largura |
| Folha de baixo (`.yn-sheet`) | Janela no meio | Sobe de baixo, com alça |
| Botão flutuante (`.yn-fab`) | Evite | Carrinho ou "novo pedido" no canto de baixo |
| Grade de produtos | Quantos couberem | 2 por linha |

### Regras

1. **Nunca rolagem lateral na página.** Só rola de lado o que foi feito para isso: tabela larga, quadro, grade de tamanho e cor, filtros rápidos e abas.
2. **Grade sem corte fixo:** `grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr))`. O `min(100%, …)` impede que a coluna estoure no celular.
3. **Altura de tela:** `100dvh`, não `100vh` (no celular a barra do navegador come parte do `100vh`).
4. **Coisa presa embaixo** (abas, botão flutuante, rodapé de formulário) soma `env(safe-area-inset-bottom)` para não ficar atrás da barra do iPhone. Os componentes já fazem isso; em página nova, use `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
5. **Nunca bloqueie o zoom** (`user-scalable=no` é proibido). A tela tem que funcionar com zoom de 200%.
6. **Imagem** com `max-width: 100%` e proporção fixa (`aspect-ratio`) para não pular quando carrega.
7. **Texto longo quebra:** nome de cliente, e-mail e endereço usam `overflow-wrap: anywhere` ou cortam com reticências e mostram tudo no detalhe.
8. **Uma ação principal visível** no celular: no topo, no rodapé fixo do formulário ou no botão flutuante. Nunca escondida dentro de um menu.

### Como testar

No Chrome, F12 → ícone de celular (modo dispositivo). Confira cada tela que mudou em:

| Largura | Representa |
|---|---|
| 375px | Celular pequeno (iPhone SE, Android básico) |
| 390–430px | Celular comum |
| 768px | Tablet em pé (o corte) |
| 1280px | Notebook |
| 1440px ou mais | Monitor |

Em cada uma: **claro e escuro**, sem rolagem lateral, menu abrindo e fechando, nenhum texto cortado sem reticências, botões com 44px no celular.


## Ícones: Lucide

- Biblioteca única: **[Lucide](https://lucide.dev)** (gratuita, mesmo traço em todos os ícones). Nunca emoji, Font Awesome ou ícone de outra família.
- **Traço 1,75.** Tamanhos: **16px** em botões e campos, **20px** no menu, **24px** em destaque.
- Web: `<script src="https://cdn.jsdelivr.net/npm/lucide@1.49.0/dist/umd/lucide.min.js"></script>`, `<i data-lucide="search"></i>` e `lucide.createIcons()` no fim da página. O `componentes.css` já força o traço e o tamanho.
- React (Lovable, v0): pacote `lucide-react` com `strokeWidth={1.75}` e `size={16}`.
- Botão só com ícone sempre tem `aria-label`.

## Crédito "Criado por"

Obrigatório no fim de todo sistema entregue a cliente (regras de marca em [01-marca.md](01-marca.md#crédito-criado-por)):

```html
<footer class="yn-credit">Criado por <a href="TODO-site-yan-nunes" rel="noopener" target="_blank">Yan Nunes</a></footer>
```

Uma linha só, como marca d'água: texto de 12px, cinza, sem moldura, sem linhas dos lados e sem maiúsculas. O nome fica sublinhado ao passar o mouse. Quando o símbolo em vetor existir, ele entra antes do nome: `<img class="yn-credit__mark" src="simbolo-yn.svg" alt="">`.

## Regras de interface

1. **Um botão principal por tela.** O resto é secundário ou discreto.
2. **Contraste mínimo 4,5:1** entre texto e fundo. A página de exemplo confere isso para a cor do cliente.
3. **Mobile primeiro.** Representante de vendas usa o sistema no celular, na rua. Funciona em 375px sem rolagem lateral (ver [Responsivo](#responsivo)).
4. **Espaçamento só na escala** (`--space-1` a `--space-16`, múltiplos de 4px).
5. **Bordas pouco arredondadas** (4–10px). Visual sóbrio, nada de "bolha".
6. **Sem efeitos:** sem degradê, brilho ou sombra pesada. A versão 3D do logo nunca entra em sistema.
7. **Tema claro e escuro em todo sistema, sem exceção.** Começa igual ao aparelho, a pessoa troca pelo botão do topo e a escolha fica guardada (ver [Tema claro e escuro](#tema-claro-e-escuro-obrigatório)). O tema escuro vem **só dos tokens**: proibido remapear a paleta do framework ou sobrescrever classe por classe (`.dark .bg-white {…}`).
8. **Foco do teclado sempre visível** (contorno na cor do texto). Proibido `outline: none` sem substituto.
9. **Nada de cor crua:** nem `#2563eb` no código, nem `bg-blue-600` do Tailwind. Só tokens e as classes da ponte.
10. **Texto mínimo de 12px.** Nada de 10 ou 11px, nem em selo ou metadado.
11. **Um `h1` por tela.** O título da página; o resto é `h2`/`h3`.
12. **Botão só com ícone tem `aria-label`** (o `title` sozinho não basta).
13. **Área de toque de 44px** no celular (`pointer: coarse`) para botão, campo e item de lista. O `componentes.css` já aumenta sozinho.
14. **Sem itálico** em lugar nenhum (nem para "mensagem apagada"): use o texto secundário.
