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
4. Onde vai rodar: **web** (navegador) ou **app** (celular)? Quem usa trabalha na rua (precisa funcionar sem internet)?
5. Qual o **tipo de negócio**? Se for um destes, siga também o domínio (leia o link; se não conseguir abrir, peça o arquivo):
   - Representantes e pedidos B2B: https://raw.githubusercontent.com/Yanunesxz/SystemDesing/main/docs/dominios/representantes.md
   - CRM comercial: https://raw.githubusercontent.com/Yanunesxz/SystemDesing/main/docs/dominios/crm.md
   - Atendimento / SAC: https://raw.githubusercontent.com/Yanunesxz/SystemDesing/main/docs/dominios/atendimento.md
   - Loja e marketplaces: https://raw.githubusercontent.com/Yanunesxz/SystemDesing/main/docs/dominios/ecommerce.md

**Stack padrão** (use se o pedido não disser outra): React + Vite + TypeScript `strict` + Tailwind 4 + `lucide-react` + Supabase (Postgres com RLS, Auth, Storage privado, Edge Functions), front na Vercel. API própria em Node + Fastify só quando houver integração pesada. Testes com Vitest.

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
- Tamanhos permitidos: 12, 14, 16, 18, 20, 24 e 30px. Tabelas e formulários usam **14px**. 36 e 48px só em site e página de apresentação, nunca dentro de sistema.
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

## 4. Ícones: Lucide

- **Só Lucide** (https://lucide.dev). Nunca emoji como ícone, Font Awesome, Material Icons ou ícone de outra família.
- **Traço 1,75.** Tamanho **16px** em botões e campos, **20px** no menu, **24px** em destaque.
- Cor: a mesma do texto ao lado (`currentColor`).
- Botão só com ícone sempre tem `aria-label` (ex.: `aria-label="Filtrar"`).
- Web: `<i data-lucide="search"></i>` + script da seção 5. React (Lovable, v0): `lucide-react`, `<Search size={16} strokeWidth={1.75} />`. App: o pacote Lucide da plataforma.
- Ícones mais usados: `users` (clientes), `shopping-cart` (pedidos), `package` (produtos), `factory` (produção), `truck` (entrega), `file-text` (documentos), `chart-column` (relatórios), `search`, `filter`, `plus`, `download`, `upload`, `settings`, `bell`, `calendar`, `plug` (integrações), `refresh-cw` (sincronizar).

---

## 5. Web: como montar a tela

### Carregue sempre isto no `<head>`

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@400..700&display=swap">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/componentes.css">
<script src="https://cdn.jsdelivr.net/npm/lucide@1.49.0/dist/umd/lucide.min.js" defer></script>
<script>addEventListener("DOMContentLoaded", () => lucide.createIcons());</script>

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
| Botão só com ícone | `<button class="yn-btn yn-btn--secondary yn-btn--icon" aria-label="Filtrar"><i data-lucide="filter"></i></button>` |
| Botão carregando | `<button class="yn-btn yn-btn--primary" aria-busy="true" disabled>Salvando</button>` |
| Campo com erro | `<input class="yn-input" aria-invalid="true" aria-describedby="e1"><span class="yn-error" id="e1">Informe um e-mail válido.</span>` |
| Campo com ícone | `<div class="yn-input-wrap"><i data-lucide="search"></i><input class="yn-input" type="search"></div>` |
| Caixa de seleção / opção única | `<label class="yn-check"><input type="checkbox"> Enviar NF por e-mail</label>` |
| Chave liga/desliga | `<label class="yn-check"><input type="checkbox" role="switch" class="yn-switch"> Avisar no WhatsApp</label>` |
| Avatar / categoria | `<span class="yn-avatar">CM</span>` · `<span class="yn-chip">Atacado</span>` |
| Abas | `<div class="yn-tabs" role="tablist"><button class="yn-tab" role="tab" aria-selected="true">Resumo</button>...</div>` |
| Trilha / paginação | `<nav class="yn-breadcrumb"><ol><li><a>Clientes</a></li>...</ol></nav>` · `<nav class="yn-pagination">...<button aria-current="page">3</button></nav>` |
| Dica | `<button class="yn-btn yn-btn--secondary yn-tooltip" data-tooltip="Atualizado há 2 min">...</button>` |
| Menu de ações | `<details class="yn-menu"><summary class="yn-btn yn-btn--secondary">Ações</summary><div class="yn-menu__list"><button>Editar</button></div></details>` |
| Sanfona | `<details class="yn-accordion"><summary>Pergunta</summary><p>Resposta</p></details>` |
| Aviso na tela | `<div class="yn-alert" data-tone="success"><i data-lucide="circle-check"></i><div><strong class="yn-alert__title">Pedido salvo</strong>O faturamento já recebeu.</div></div>` |
| Aviso rápido | `<div class="yn-toast-region" aria-live="polite"><div class="yn-toast">Pedido salvo.</div></div>` |
| Janela / painel lateral | `<dialog class="yn-modal">` ou `<dialog class="yn-drawer">`, aberto com `showModal()`; dentro, `.yn-dialog__header` e `.yn-dialog__footer` |
| Progresso / carregando | `<progress class="yn-progress" value="65" max="100"></progress>` · `<span class="yn-spinner"></span>` · `<div class="yn-skeleton"></div>` |
| Estado vazio | `<div class="yn-empty"><span class="yn-empty__icon"><i data-lucide="inbox"></i></span><p class="yn-empty__title">Nenhum pedido ainda</p><p>Explica o próximo passo.</p></div>` |
| Etapas | `<ol class="yn-steps"><li class="yn-step" data-state="done"><span class="yn-step__dot"></span><div><p class="yn-step__title">Faturado</p><p class="yn-step__meta">NF 18.204</p></div></li></ol>` (`done`, `current`, `pending`) |
| Envio de arquivos | `<label class="yn-dropzone">...<input type="file" hidden></label>` + uma `<div class="yn-file">` por arquivo |

Os cards de indicador ficam em grade: `display: grid; gap: var(--space-4); grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));`

### React + Tailwind 4 (Lovable, v0, Bolt, Claude Code)

1. Coloque os links do `<head>` (acima) no `index.html` e use as classes `yn-*` em `className` quando servirem.
2. No CSS principal (ex.: `src/index.css`), logo depois de `@import "tailwindcss";`, cole **exatamente** este bloco. Ele apaga a paleta do Tailwind (`bg-blue-500` e afins deixam de existir) e cria as cores do padrão:

```css
@theme inline {
  --color-*: initial;

  --color-page: var(--color-bg);
  --color-panel: var(--color-surface);
  --color-raised: var(--color-surface-raised);
  --color-line: var(--color-border);
  --color-line-strong: var(--color-border-strong);
  --color-ink: var(--color-text);
  --color-muted: var(--color-text-muted);
  --color-decor: var(--color-silver);

  --color-primary: var(--color-brand);
  --color-primary-hover: var(--color-brand-hover);
  --color-primary-subtle: var(--color-brand-subtle);
  --color-on-primary: var(--color-brand-contrast);

  --color-tone-success: var(--color-success);
  --color-tone-info: var(--color-info);
  --color-tone-warning: var(--color-warning);
  --color-tone-danger: var(--color-danger);

  --color-ring: var(--color-focus);

  --font-*: initial;
  --font-sans: "Manrope", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;

  --radius-*: initial;
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 10px;
  --radius-full: 999px;
}
```

3. Use só estas classes de cor: `bg-page` (fundo), `bg-panel` (menu, cabeçalho de tabela), `bg-raised` (card), `border-line`, `border-line-strong` (campo), `text-ink`, `text-muted`, `text-decor`, `bg-primary` + `text-on-primary` + `hover:bg-primary-hover` (botão principal), `bg-primary-subtle`, `text-tone-success|info|warning|danger` e `bg-tone-*/10` (status), `outline-ring` (foco). Raios: `rounded-sm|md|lg|full`.
4. O espaçamento do Tailwind já é de 4 em 4px: use a escala normal (`p-4`, `gap-6`).
5. **Proibido:** cor crua (`#2563eb`, `bg-blue-600`), `rounded-xl`/`2xl`, `shadow-xl`, `text-[11px]`, remapear a paleta para fazer o tema escuro. O tema escuro e a cor do cliente já vêm dos tokens.

**shadcn/ui:** se o projeto já usa, aponte as variáveis dele para os tokens: `--background: var(--color-bg)`, `--foreground: var(--color-text)`, `--card: var(--color-surface-raised)`, `--muted: var(--color-surface)`, `--muted-foreground: var(--color-text-muted)`, `--border: var(--color-border)`, `--input: var(--color-border-strong)`, `--primary: var(--color-brand)`, `--primary-foreground: var(--color-brand-contrast)`, `--destructive: var(--color-danger)`, `--ring: var(--color-focus)`, `--radius: 0.375rem`.

---

## 6. App (celular) ou outra tecnologia

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

## 7. Regras de interface

1. **Um botão principal por tela.** O resto é secundário ou discreto.
2. **Mobile primeiro.** Funciona em 375px de largura, sem rolagem lateral.
3. **Contraste mínimo de 4,5:1** em todo texto.
4. **Bordas pouco arredondadas** (4 a 10px). Nada de bolha.
5. **Sem degradê, brilho, sombra pesada, emoji como ícone** ou ilustração genérica.
6. **Tema claro e escuro** sempre.
7. **Estado vazio explica o próximo passo:** "Nenhum pedido ainda. Lance o primeiro em Novo pedido."
8. **Falha ≠ vazio ≠ sem dado:** erro ao carregar mostra "Não deu para carregar" + "Tentar de novo"; lista vazia mostra o próximo passo; métrica sem base mostra "Sem dados" (nunca 0 ou NaN).
9. **Texto mínimo de 12px**, um `h1` por tela, botão só com ícone com `aria-label`, foco sempre visível, sem itálico.
10. **Área de toque de 44px** no celular (botão, campo, item de lista).
11. **Modal:** Esc fecha; clicar fora só fecha modal de leitura; pergunta antes de descartar o que foi digitado; trava os botões enquanto grava; foco no primeiro campo.
12. **Formulário longo:** seções, botões de ação fixos no rodapé, aviso ao sair sem salvar.
13. **Estado na URL:** aba, filtro e página atuais ficam no endereço, para o link funcionar quando compartilhado.
14. **Faixa no topo** para: modo demonstração, sem internet, versão nova disponível.

---

## 8. Textos

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

## 9. Dados

| Dado | Como guardar | Como mostrar |
|---|---|---|
| Dinheiro | Inteiro em **centavos** (`bigint`), campo `*_cents` (`12990`) | `R$ 129,90` |
| Data e hora | `timestamptz`, campo `*_at` | `01/10/2026 14:30`, sempre com `timeZone: "America/Sao_Paulo"` explícito |
| Só data | `date` `AAAA-MM-DD`, campo `*_on`; ler como data **local** | `01/10/2026` |
| Código humano | `PREFIXO-0001` gerado por sequência no banco (`ORD-1205`) | Igual |
| Telefone | Só dígitos com 55 + DDD (`5511987654321`) | `(11) 98765-4321` |
| CPF / CNPJ / CEP | Texto, só dígitos | Com máscara |
| Sim/Não | `true` / `false`, campo `is_*` ou `has_*` | "Sim" / "Não" |
| ID de outro sistema | Texto em `external_id` + origem em `source` | — |

- Código (variáveis, funções, tabelas, campos) em **inglês**, `snake_case`. Tudo que o usuário lê, em **português**.
- Toda tabela do banco tem `id` (uuid), `created_at` e `updated_at` (por gatilho). Responsável é chave estrangeira (`owner_id`), nunca nome em texto.
- Status são uma lista fechada em inglês (`awaiting_payment`, `paid`...), com rótulo em português na tela e a cor da seção 3. A conta usa o **código**, nunca o rótulo.
- **Fato não é status:** faturado, entregue, pago são carimbos (`invoiced_at`, `delivered_at`). Recusado ≠ cancelado. Encerrar com desfecho negativo exige **motivo de lista fechada**.
- **Preço, desconto e total sempre recalculados no servidor.** Nunca conta com ponto flutuante no TypeScript: calcule em centavos.
- **Trava otimista:** gravar com o `updated_at` lido; se mudou, avisar "Outra pessoa alterou este registro".
- **Histórico:** mudança de status por gatilho, edição com antes/depois, cópia em `jsonb` antes de excluir.
- **Nunca inventar dado:** o que falta aparece como "A cadastrar".
- O Supabase devolve no máximo **1.000 linhas** sem avisar: pagine, e filtre no banco, nunca baixando tudo para o navegador.
- Horário útil e prazos calculados num módulo só, com fuso de São Paulo explícito.

---

## 10. Segurança, integrações e projeto

**Segurança**

- **RLS obrigatória em toda tabela, por papel e por dono.** A tela esconder o botão não é segurança: qualquer pessoa logada chama a API direto. Proibido "logado = acesso a tudo".
- Ninguém altera o **próprio** papel ou permissões (coluna protegida). Chave `service_role` só no servidor, nunca com prefixo `VITE_`.
- Funções no servidor conferem a sessão **e** o papel no banco antes de agir.
- **Nunca guardar senha no navegador**, nem em hash. Senha provisória mostrada uma vez, troca no primeiro acesso.
- Arquivos em bucket **privado**, exibidos por URL assinada. Foto ou documento de cliente nunca em bucket público.
- Webhook com segredo no **cabeçalho** ou HMAC, nunca na URL. CORS restrito. `vercel.json` com cabeçalhos de segurança.
- IA recebe o **mínimo** de dado pessoal; ela sugere, nunca responde sozinha ao cliente.
- Senhas, tokens e chaves **só em variável de ambiente**. Nunca no código, no README ou colados no chat. O `.env` nunca vai para o Git.
- Nunca registrar em log token, CPF ou telefone completo.
- Marketing só para quem autorizou (`marketing_opt_in = true`), conforme a LGPD.
- Webhook responde na hora e processa depois. Tudo pode ser repetido sem duplicar dados (atualiza se existe, cria se não existe).
- Cada dado tem um sistema dono (estoque, clientes, preços); os outros só leem dele.
- Integração com ERP: consulta incremental (`?since=`), lote máximo, erro sempre `{error, code, statusCode}`, log sem dado pessoal, tela de saúde da integração.
- WhatsApp: API oficial por padrão; Evolution API (não oficial) só com o risco registrado e número dedicado.

**Projeto**

- Camadas: tela → `actions` (grava + registra na linha do tempo + avisa) → store/api. Leitura que calcula fica em funções puras com teste.
- **Modo demonstração:** sem as variáveis do Supabase, o sistema roda com dados em memória, abre vazio, e mostra dados de exemplo inventados com `VITE_SAMPLE_DATA=true`.
- **Aviso de versão nova** com `/version.json`. App de quem trabalha na rua funciona sem internet, com fila que reenvia sem duplicar.
- Migrações `AAAAMMDDHHMMSS_nome.sql`, versão única, idempotentes e com instrução de como reverter.
- Scripts gravam só com `--executar` e nunca imprimem dado pessoal.
- Mantenha `ESTADO.md` atualizado em todo PR e as decisões em `docs/decisoes/`.

**Sistema de loja** (Mercado Livre, Shopee, loja virtual): siga também https://github.com/Yanunesxz/SystemDesing/blob/main/docs/dominios/ecommerce.md. SKU no formato `CAT-MODELO-COR-TAM`. Nunca contatar comprador de marketplace fora da plataforma.

---

## 11. Antes de entregar, confira

- [ ] Manrope carregada, sem itálico, pesos certos (Bold títulos, Medium botões e menus, Regular texto).
- [ ] Ícones só do Lucide, traço 1,75; botão só com ícone tem `aria-label`.
- [ ] Nenhuma cor fora da seção 3; nenhuma cor ou tamanho fixo no código; nenhum componente inventado quando existe um `yn-*` que resolve.
- [ ] Um botão principal por tela, na cor principal.
- [ ] Funciona em tema claro e escuro, e no celular (375px) sem rolagem lateral.
- [ ] Valores alinhados à direita com números de largura fixa.
- [ ] Textos no tom da seção 8.
- [ ] Sistema de cliente: cor do cliente só nos lugares permitidos e rodapé "Criado por Yan Nunes".
- [ ] Dinheiro em centavos, datas com fuso de São Paulo explícito, segredos em variável de ambiente.
- [ ] RLS testada: logado com cada papel, tentei ler e alterar pela API o que não devia, e foi negado.
- [ ] Falha, vazio e sem dados têm telas diferentes.
- [ ] Modo demonstração funciona sem banco.
- [ ] `ESTADO.md` atualizado.

---

## Anexo — CSS do padrão

Use só se os links do jsDelivr (seção 5) não carregarem. É o mesmo conteúdo, versão 0.1.0.

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
 *     (modelo em templates/tema-cliente.css, gerador em ui/vitrine.html).
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
  --text-4xl: 2.25rem;  /* 36px: só em site e apresentação, nunca dentro de sistema */
  --text-5xl: 3rem;     /* 48px: só em site e apresentação, nunca dentro de sistema */

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
 * Todas as classes começam com "yn-". Exemplos de uso em ui/vitrine.html.
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

/* Ícones: Lucide (lucide.dev). <i data-lucide="search"></i> + lucide.createIcons().
   Traço sempre 1,75. Tamanho padrão 16px; .yn-icon-20 no menu, .yn-icon-24 em destaque. */
svg.lucide {
  width: 16px;
  height: 16px;
  flex: none;
  stroke-width: 1.75;
}

svg.lucide.yn-icon-20 { width: 20px; height: 20px; }
svg.lucide.yn-icon-24 { width: 24px; height: 24px; }

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

/* Só ícone: sempre com aria-label */
.yn-btn--icon {
  width: 40px;
  padding: 0;
}

/* Carregando: <button class="yn-btn ..." aria-busy="true" disabled>Salvando</button> */
.yn-btn[aria-busy="true"] {
  cursor: progress;
  opacity: 0.85;
}

.yn-btn[aria-busy="true"]::before {
  content: "";
  width: 14px;
  height: 14px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: yn-spin 0.7s linear infinite;
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

.yn-input::placeholder {
  color: var(--color-text-muted);
  opacity: 1;
}

.yn-input:disabled {
  background: var(--color-surface);
  color: var(--color-text-muted);
  cursor: not-allowed;
}

.yn-input[aria-invalid="true"] {
  border-color: var(--color-danger);
}

textarea.yn-input {
  min-height: 96px;
  padding: 10px var(--space-3);
  line-height: var(--leading-normal);
  resize: vertical;
}

/* Mensagem de erro do campo: <span class="yn-error" id="email-erro">...</span> + aria-describedby */
.yn-error svg { width: 14px; height: 14px; }

.yn-error {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-danger);
}

/* Campo com ícone: <div class="yn-input-wrap"><i data-lucide="search"></i><input class="yn-input"></div> */
.yn-input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.yn-input-wrap > svg {
  position: absolute;
  left: var(--space-3);
  color: var(--color-text-muted);
  pointer-events: none;
}

.yn-input-wrap > .yn-input {
  padding-left: 36px;
}

/* ---------- Seleção ---------- */
.yn-fieldset {
  display: grid;
  gap: var(--space-2);
  min-width: 0;
  margin: 0;
  padding: 0;
  border: 0;
}

.yn-fieldset > legend {
  margin-bottom: var(--space-2);
  padding: 0;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
}

/* Caixa de seleção e opção única: <label class="yn-check"><input type="checkbox"> Texto</label> */
.yn-check {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--text-sm);
  cursor: pointer;
}

.yn-check input:not(.yn-switch) {
  width: 16px;
  height: 16px;
  margin: 0;
  accent-color: var(--color-brand);
  cursor: inherit;
}

.yn-check:has(input:disabled) {
  color: var(--color-text-muted);
  cursor: not-allowed;
}

/* Chave liga/desliga: <input type="checkbox" role="switch" class="yn-switch"> */
.yn-switch {
  appearance: none;
  position: relative;
  flex: none;
  width: 36px;
  height: 20px;
  margin: 0;
  background: var(--color-border-strong);
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background-color var(--duration-fast);
}

.yn-switch::before {
  content: "";
  position: absolute;
  top: 2px;
  left: 2px;
  width: 16px;
  height: 16px;
  background: var(--yn-white);
  border-radius: 50%;
  box-shadow: var(--shadow-sm);
  transition: transform var(--duration-fast);
}

.yn-switch:checked { background: var(--color-brand); }
.yn-switch:checked::before { transform: translateX(16px); background: var(--color-brand-contrast); }

.yn-range {
  width: 100%;
  margin: 0;
  accent-color: var(--color-brand);
}

/* ---------- Pessoas e categorias ---------- */
.yn-avatar {
  display: inline-grid;
  flex: none;
  place-items: center;
  width: 32px;
  height: 32px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  font-size: var(--text-xs);
  font-weight: var(--weight-semibold);
  color: var(--color-text);
}

.yn-avatar-group { display: flex; }
.yn-avatar-group .yn-avatar { box-shadow: 0 0 0 2px var(--color-surface-raised); }
.yn-avatar-group .yn-avatar + .yn-avatar { margin-left: -6px; }

/* Categoria ou filtro ativo: <span class="yn-chip">Atacado</span> */
.yn-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  min-height: 28px;
  padding: 0 10px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  color: var(--color-text);
  white-space: nowrap;
}

.yn-chip button {
  display: inline-grid;
  place-items: center;
  margin: 0 -4px 0 0;
  padding: 2px;
  background: none;
  border: 0;
  border-radius: var(--radius-sm);
  color: var(--color-text-muted);
  cursor: pointer;
}

.yn-chip button:hover { color: var(--color-text); }
.yn-chip button svg { width: 14px; height: 14px; }

/* ---------- Navegação ---------- */
.yn-breadcrumb ol {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.yn-breadcrumb li + li::before {
  content: "›";
  margin-right: var(--space-2);
  color: var(--color-silver);
}

.yn-breadcrumb a { color: inherit; text-decoration: none; }
.yn-breadcrumb a:hover { color: var(--color-text); text-decoration: underline; }
.yn-breadcrumb [aria-current="page"] { font-weight: var(--weight-medium); color: var(--color-text); }

/* Abas: <div role="tablist" class="yn-tabs"><button role="tab" class="yn-tab" aria-selected="true">...</button></div> */
.yn-tabs {
  display: flex;
  gap: var(--space-6);
  overflow-x: auto;
  border-bottom: 1px solid var(--color-border);
}

.yn-tab {
  margin-bottom: -1px;
  padding: 10px 0;
  background: none;
  border: 0;
  border-bottom: 2px solid transparent;
  font: inherit;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  white-space: nowrap;
  color: var(--color-text-muted);
  cursor: pointer;
}

.yn-tab:hover { color: var(--color-text); }
.yn-tab[aria-selected="true"] { border-bottom-color: var(--color-text); color: var(--color-text); }

.yn-pagination {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-1);
}

.yn-pagination a,
.yn-pagination button {
  display: inline-grid;
  place-items: center;
  min-width: 32px;
  height: 32px;
  padding: 0 var(--space-2);
  background: none;
  border: 0;
  border-radius: var(--radius-md);
  font: inherit;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  font-variant-numeric: tabular-nums;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
}

.yn-pagination a:hover,
.yn-pagination button:hover { background: var(--color-surface); }

.yn-pagination [aria-current="page"] {
  background: var(--color-brand);
  color: var(--color-brand-contrast);
}

/* ---------- Dica, menu e sanfona ---------- */
/* Dica: <button class="yn-btn yn-btn--icon yn-tooltip" data-tooltip="Exportar" aria-label="Exportar"> */
.yn-tooltip { position: relative; }

.yn-tooltip::after {
  content: attr(data-tooltip);
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  z-index: 10;
  padding: 6px 10px;
  background: var(--color-text);
  border-radius: var(--radius-sm);
  font-size: var(--text-xs);
  font-weight: var(--weight-medium);
  letter-spacing: 0;
  text-transform: none;
  white-space: nowrap;
  color: var(--color-bg);
  opacity: 0;
  pointer-events: none;
  transform: translateX(-50%);
  transition: opacity var(--duration-fast);
}

.yn-tooltip:hover::after,
.yn-tooltip:focus-visible::after { opacity: 1; }

/* Menu de ações: <details class="yn-menu"><summary class="yn-btn yn-btn--secondary">Ações</summary><div class="yn-menu__list">...</div></details> */
.yn-menu {
  position: relative;
  display: inline-block;
}

.yn-menu > summary { list-style: none; }
.yn-menu > summary::-webkit-details-marker { display: none; }

.yn-menu__list {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  z-index: 20;
  display: grid;
  min-width: 180px;
  padding: var(--space-1);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.yn-menu__list button,
.yn-menu__list a {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) 10px;
  background: none;
  border: 0;
  border-radius: var(--radius-sm);
  font: inherit;
  font-size: var(--text-sm);
  text-align: left;
  text-decoration: none;
  color: var(--color-text);
  cursor: pointer;
}

.yn-menu__list button:hover,
.yn-menu__list a:hover { background: var(--color-surface); }

.yn-menu__list .yn-menu__item--danger { color: var(--color-danger); }

/* Sanfona: <details class="yn-accordion"><summary>Pergunta</summary><p>Resposta</p></details> */
.yn-accordion { border-bottom: 1px solid var(--color-border); }

.yn-accordion > summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: 14px 0;
  list-style: none;
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  cursor: pointer;
}

.yn-accordion > summary::-webkit-details-marker { display: none; }

.yn-accordion > summary::after {
  content: "+";
  font-size: var(--text-lg);
  font-weight: var(--weight-regular);
  line-height: 1;
  color: var(--color-text-muted);
}

.yn-accordion[open] > summary::after { content: "−"; }

.yn-accordion > :not(summary) {
  margin: 0 0 14px;
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* ---------- Avisos e sobreposições ---------- */
/* Aviso: <div class="yn-alert" data-tone="success" role="status"><i data-lucide="circle-check"></i><div><strong class="yn-alert__title">Título</strong>Texto</div></div> */
.yn-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: 14px var(--space-4);
  background: color-mix(in oklab, currentColor 10%, transparent);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

.yn-alert > svg { margin-top: 2px; }

.yn-alert__title {
  display: block;
  font-weight: var(--weight-semibold);
}

.yn-alert[data-tone="success"] { color: var(--color-success); }
.yn-alert[data-tone="info"] { color: var(--color-info); }
.yn-alert[data-tone="warning"] { color: var(--color-warning); }
.yn-alert[data-tone="danger"] { color: var(--color-danger); }

/* Aviso rápido: <div class="yn-toast-region" aria-live="polite"><div class="yn-toast">...</div></div> */
.yn-toast-region {
  position: fixed;
  right: var(--space-4);
  bottom: calc(var(--space-4) + env(safe-area-inset-bottom, 0px));
  z-index: 50;
  display: grid;
  gap: var(--space-2);
  max-width: min(360px, calc(100vw - 32px));
}

.yn-toast {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  background: var(--color-text);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  font-size: var(--text-sm);
  font-weight: var(--weight-medium);
  color: var(--color-bg);
  animation: yn-rise var(--duration-normal) ease-out;
}

/* Janela e painel lateral: <dialog class="yn-modal"> e <dialog class="yn-drawer"> com showModal() */
.yn-modal,
.yn-drawer {
  box-sizing: border-box;
  padding: var(--space-6);
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  color: var(--color-text);
}

.yn-modal {
  width: min(480px, calc(100vw - 32px));
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
}

.yn-drawer {
  inset: 0 0 0 auto;
  width: min(400px, 100vw);
  height: 100%;
  max-height: none;
  margin: 0;
  border-width: 0 0 0 1px;
}

.yn-modal::backdrop,
.yn-drawer::backdrop { background: rgb(0 0 0 / 0.45); }

.yn-dialog__header h2 { font-size: var(--text-lg); }

.yn-dialog__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.yn-dialog__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-2);
  margin-top: var(--space-6);
}

/* Barra de progresso: <progress class="yn-progress" value="65" max="100">65%</progress> */
.yn-progress {
  appearance: none;
  display: block;
  width: 100%;
  height: 6px;
  overflow: hidden;
  background: var(--color-border);
  border: 0;
  border-radius: var(--radius-full);
}

.yn-progress::-webkit-progress-bar { background: var(--color-border); border-radius: var(--radius-full); }
.yn-progress::-webkit-progress-value { background: var(--color-text); border-radius: var(--radius-full); }
.yn-progress::-moz-progress-bar { background: var(--color-text); border-radius: var(--radius-full); }

.yn-spinner {
  display: inline-block;
  flex: none;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: yn-spin 0.7s linear infinite;
}

/* Carregando conteúdo: <div class="yn-skeleton" style="width: 60%"></div> */
.yn-skeleton {
  height: 12px;
  background: var(--color-border);
  border-radius: var(--radius-sm);
  animation: yn-pulse 1.4s ease-in-out infinite;
}

/* ---------- Peças de sistema ---------- */
/* Estado vazio: sempre diz o próximo passo */
.yn-empty {
  display: grid;
  justify-items: center;
  gap: var(--space-2);
  padding: var(--space-8) var(--space-4);
  text-align: center;
}

.yn-empty__icon {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  margin-bottom: var(--space-1);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  color: var(--color-text-muted);
}

.yn-empty__title {
  margin: 0;
  font-size: var(--text-base);
  font-weight: var(--weight-semibold);
}

.yn-empty p:not(.yn-empty__title) {
  max-width: 36ch;
  margin: 0 0 var(--space-2);
  font-size: var(--text-sm);
  color: var(--color-text-muted);
}

/* Etapas: <ol class="yn-steps"><li class="yn-step" data-state="done|current|pending">...</li></ol> */
.yn-steps {
  display: grid;
  margin: 0;
  padding: 0;
  list-style: none;
}

.yn-step {
  position: relative;
  display: grid;
  grid-template-columns: 24px minmax(0, 1fr) auto;
  gap: var(--space-3);
  align-items: start;
  padding-bottom: var(--space-5);
}

.yn-step:last-child { padding-bottom: 0; }

.yn-step::before {
  content: "";
  position: absolute;
  top: 28px;
  bottom: 4px;
  left: 11.5px;
  width: 1px;
  background: var(--color-border-strong);
}

.yn-step:last-child::before { display: none; }

.yn-step__dot {
  display: grid;
  place-items: center;
  width: 24px;
  height: 24px;
  box-sizing: border-box;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border-strong);
  border-radius: 50%;
  color: var(--color-text-muted);
}

.yn-step__dot svg { width: 14px; height: 14px; }

.yn-step[data-state="done"] .yn-step__dot {
  background: var(--color-text);
  border-color: var(--color-text);
  color: var(--color-bg);
}

.yn-step[data-state="current"] .yn-step__dot {
  border: 2px solid var(--color-text);
  color: var(--color-text);
}

.yn-step p { margin: 0; }
.yn-step__title { font-size: var(--text-sm); font-weight: var(--weight-medium); }
.yn-step[data-state="pending"] .yn-step__title { color: var(--color-text-muted); }

.yn-step__meta {
  font-size: var(--text-xs);
  font-variant-numeric: tabular-nums;
  color: var(--color-text-muted);
}

/* Arquivos */
.yn-dropzone {
  display: grid;
  justify-items: center;
  gap: 6px;
  padding: var(--space-6) var(--space-4);
  border: 1px dashed var(--color-border-strong);
  border-radius: var(--radius-lg);
  font-size: var(--text-sm);
  text-align: center;
  color: var(--color-text-muted);
}

.yn-dropzone strong { font-weight: var(--weight-semibold); color: var(--color-text); }
.yn-dropzone[data-dragging] { background: var(--color-surface); border-color: var(--color-text); }

.yn-file {
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  gap: var(--space-3);
  align-items: center;
  padding: var(--space-3) 0;
  border-bottom: 1px solid var(--color-border);
  font-size: var(--text-sm);
}

.yn-file:last-child { border-bottom: 0; }
.yn-file p { margin: 0; }
.yn-file .yn-progress { margin-block: 6px 4px; }
.yn-file[data-state="error"] > svg,
.yn-file[data-state="error"] .yn-file__meta { color: var(--color-danger); }
.yn-file__name { overflow: hidden; font-weight: var(--weight-medium); text-overflow: ellipsis; white-space: nowrap; }
.yn-file__meta { font-size: var(--text-xs); color: var(--color-text-muted); }

/* Atalho de teclado: <kbd class="yn-kbd">Ctrl K</kbd> */
.yn-kbd {
  padding: 1px 6px;
  background: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-bottom-width: 2px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--color-text-muted);
}

/* ---------- Animações ---------- */
@keyframes yn-spin { to { transform: rotate(360deg); } }
@keyframes yn-pulse { 50% { opacity: 0.45; } }
@keyframes yn-rise { from { opacity: 0; transform: translateY(8px); } }

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
