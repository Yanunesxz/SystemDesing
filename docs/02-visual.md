# 02 — Visual

Toda tela (loja, painel, landing page, e-mail) usa os mesmos **design tokens**: variáveis com nome fixo para cor, fonte, espaçamento, borda e sombra.

## A regra

**Nenhum sistema escreve cor ou tamanho "solto".** Nada de `color: #1E5BD6` no código: sempre `color: var(--color-brand)`.
Assim, trocar a cor da marca é alterar **um** arquivo: [`tokens/tokens.css`](../tokens/tokens.css).

Para ver todos os tokens aplicados (tema claro e escuro), abra [`tokens/preview.html`](../tokens/preview.html) no navegador.

## Como usar

**HTML simples / landing page**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/tokens/tokens.css">
<style>
  .botao { background: var(--color-brand); color: var(--color-brand-contrast); padding: var(--space-3) var(--space-5); border-radius: var(--radius-md); }
</style>
```

**Tailwind** — aponte as cores do Tailwind para os tokens no `tailwind.config.js`:
```js
theme: { extend: { colors: { brand: "var(--color-brand)", surface: "var(--color-surface)" } } }
```

**Loja em plataforma (Nuvemshop, Shopify etc.)** — cole o conteúdo de `tokens.css` no campo de CSS personalizado do tema e use as variáveis nas customizações.

## Paleta

> `TODO(definir)`: os valores atuais são **provisórios**. Troque pelas cores reais da marca em `tokens/tokens.css`.

| Token | Uso |
|---|---|
| `--color-brand` | Botão principal, links, destaque da marca |
| `--color-accent` | Selo de promoção, destaque secundário (com moderação) |
| `--color-bg` / `--color-surface` | Fundo da página / fundo de cards e painéis |
| `--color-text` / `--color-text-muted` | Texto principal / texto secundário |
| `--color-success` / `--warning` / `--danger` / `--info` | Feedback: pago, atenção, erro/cancelado, informação |

## Regras de interface

1. **Um botão principal por tela.** O resto é secundário.
2. **Contraste mínimo 4.5:1** entre texto e fundo (confira em https://webaim.org/resources/contrastchecker/).
3. **Mobile primeiro.** A maior parte do tráfego de e-commerce vem do celular: desenhe para 375px de largura e depois expanda.
4. **Espaçamento só na escala** (`--space-1` a `--space-16`, múltiplos de 4px).
5. **Status de pedido sempre com a mesma cor** em todo painel:

| Status (ver [03-dados.md](03-dados.md)) | Cor |
|---|---|
| `awaiting_payment`, `cancel_requested` | `--color-warning` |
| `paid`, `invoiced`, `ready_to_ship`, `shipped` | `--color-info` |
| `delivered` | `--color-success` |
| `cancelled`, `returned` | `--color-danger` |

## Tipografia

- Fonte padrão: **Inter** (Google Fonts, gratuita, ótima em tela pequena e em painel com números). `TODO(definir)` se a marca tiver fonte própria.
- Tamanhos: use só a escala `--text-xs` a `--text-3xl`.

## Fotos de produto

| Regra | Valor |
|---|---|
| Tamanho | 1200 × 1200 px (quadrada, serve para ML, Shopee e loja) |
| Primeira foto | Fundo branco puro, produto ocupando ~85% da imagem, sem texto, logo ou selo (o ML exige em muitas categorias) |
| Demais fotos | Detalhe, uso/ambientado, medidas, embalagem |
| Formato | JPG (qualidade ~85%) ou WebP na loja própria |
| Nome do arquivo | `SKU_01.jpg`, `SKU_02.jpg`... (ex.: `CAM-BASIC-PRT-M_01.jpg`) |
