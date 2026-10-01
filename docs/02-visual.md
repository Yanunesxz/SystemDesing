# 02 — Visual

Toda tela (sistema, CRM, painel, site, e-mail) usa os mesmos **design tokens** (variáveis com nome fixo para cor, fonte, espaçamento, borda e sombra) e os mesmos **componentes**.

Para ver tudo funcionando, abra [`ui/preview.html`](../ui/preview.html) no navegador. Ela é um painel de exemplo com o gerador de tema do cliente.
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

1. Abra `ui/preview.html`, digite a cor do cliente (ex.: `#D7263D`).
2. A página confere o contraste, escolhe se o texto do botão é branco ou preto e, se a cor sumir no fundo preto, cria uma variação para o tema escuro.
3. Clique em **Copiar CSS** e salve como `tema-cliente.css` no sistema do cliente (modelo em [`templates/tema-cliente.css`](../templates/tema-cliente.css)).

## Como carregar no sistema

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..700&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/componentes.css">
<link rel="stylesheet" href="tema-cliente.css"> <!-- só em sistema de cliente -->
```

**Tailwind:** aponte as cores para os tokens no `tailwind.config.js`:
```js
theme: { extend: {
  colors: { brand: "var(--color-brand)", surface: "var(--color-surface)", muted: "var(--color-text-muted)" },
  fontFamily: { sans: ["Manrope", "system-ui", "sans-serif"] },
} }
```

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

Todos em [`ui/componentes.css`](../ui/componentes.css), com prefixo `yn-`:

| Componente | Classe |
|---|---|
| Botões | `.yn-btn` + `--primary` (um por tela), `--secondary`, `--ghost`, `--danger` |
| Card | `.yn-card` |
| Indicador | `.yn-kpi`, `.yn-kpi__value`, `.yn-kpi__delta--up/--down` |
| Tabela | `.yn-table-wrap` > `.yn-table`, números com `.yn-num` |
| Etiqueta de status | `.yn-badge[data-status]` ou `.yn-badge[data-tone]` |
| Formulário | `.yn-field`, `.yn-label`, `.yn-input`, `.yn-hint` |
| Layout de painel | `.yn-shell` > `.yn-sidebar` + `.yn-main` > `.yn-topbar` + `.yn-content` |
| Assinatura no menu | `.yn-sidebar__brand` + `.yn-sidebar__product` |
| Crédito | `.yn-credit` |

## Crédito "Criado por"

Obrigatório no fim de todo sistema entregue a cliente (regras de marca em [01-marca.md](01-marca.md#crédito-criado-por)):

```html
<footer class="yn-credit">
  <span>Criado por</span>
  <a href="TODO-site-yan-nunes" rel="noopener" target="_blank">
    <img class="yn-credit__mark" src="simbolo-yn.svg" alt=""> <!-- quando o vetor existir -->
    <span class="yn-credit__name"><strong>Yan</strong> Nunes</span>
  </a>
</footer>
```

O componente já é neutro, pequeno, com uma linha fina de cada lado (como a tagline do logo) e fica mais visível ao passar o mouse.

## Regras de interface

1. **Um botão principal por tela.** O resto é secundário ou discreto.
2. **Contraste mínimo 4,5:1** entre texto e fundo. A página de exemplo confere isso para a cor do cliente.
3. **Mobile primeiro.** Representante de vendas usa o sistema no celular, na rua. O menu vira uma barra horizontal abaixo de 768px.
4. **Espaçamento só na escala** (`--space-1` a `--space-16`, múltiplos de 4px).
5. **Bordas pouco arredondadas** (4–10px). Visual sóbrio, nada de "bolha".
6. **Sem efeitos:** sem degradê, brilho ou sombra pesada. A versão 3D do logo nunca entra em sistema.
7. **Tema claro e escuro** em todo sistema, seguindo o aparelho da pessoa.
8. **Foco do teclado sempre visível** (contorno na cor do texto).
