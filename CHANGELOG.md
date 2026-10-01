# Changelog

Todas as mudanças relevantes do padrão ficam registradas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versões em [SemVer](https://semver.org/lang/pt-BR/).

## [0.2.0] - 2026-10-01

### Adicionado

- **Tema claro e escuro obrigatório** em todo sistema: começa igual ao aparelho, botão de lua/sol no topo, escolha Aparelho · Claro · Escuro, guardada no navegador e aplicada sem piscar ([decisão 0006](decisoes/0006-tema-claro-e-escuro-obrigatorio.md)). Classes `.yn-only-light` / `.yn-only-dark` para o ícone do botão.
- **Estrutura de um sistema** explicada peça por peça (desenho, tabela e HTML comentado) e o script da casca (gaveta, menu recolhido e tema) em `docs/02-visual.md` e no documento das IAs.
- **Guia de responsivo:** larguras (768px e 960px), toque de 44px, o que cada componente vira no celular, regras (sem rolagem lateral, `100dvh`, área segura, zoom liberado) e como testar.
- **Menu no celular em dois modelos** ([decisão 0005](decisoes/0005-menu-no-celular-dois-modelos.md)): gaveta (`.yn-nav-toggle` + `.yn-scrim`) e abas embaixo (`.yn-shell--tabs` + `.yn-tabbar`). Menu lateral recolhível (`data-sidebar="collapsed"`), seletor de empresa/filial (`.yn-context`), usuário no fim do menu (`.yn-sidebar__user`), grupos (`.yn-nav__label`) e contadores.
- Telas completas para copiar em `ui/exemplos/` (gaveta e abas embaixo).
- Componentes novos: botão pequeno (`.yn-btn--sm`), contador (`.yn-count`), filtro rápido (`button.yn-chip[aria-pressed]` em `.yn-chips`), prazo (`.yn-deadline`), escolha de visão ou tema (`.yn-segmented`), busca com lista (`.yn-combobox` + `.yn-listbox`), faixa no topo (`.yn-banner`), folha de baixo (`.yn-sheet`), quadro kanban com mover pelas setas (`.yn-kanban`), histórico (`.yn-timeline`), caixa de mensagens (`.yn-inbox`, `.yn-thread`, `.yn-bubble`, `.yn-composer`), catálogo (`.yn-catalog`, `.yn-product`), quantidade (`.yn-qty`), grade tamanho × cor (`.yn-grade`), botão flutuante (`.yn-fab`), decisão com motivo (`.yn-decision`), ficha de dados (`.yn-dl`), falha ao carregar (`.yn-empty[data-state="error"]`), "Sem dados" no indicador, gráficos sem biblioteca (`.yn-bars`, `.yn-columns`, `.yn-as-table`), ranking (`.yn-ranking`), régua de meta (`.yn-meter`), ficha 360 (`.yn-split`), próximo passo (`.yn-next`), formulário longo (`.yn-form-section`, `.yn-form-grid`, `.yn-form-footer`), tabela que vira cards no celular (`.yn-table--stack`) e `.yn-sr-only`.
- Tokens: `--sidebar-collapsed-width`, `--tabbar-height` e `--touch-min`.
- Vitrine: seção **Telas completas**, 35 grupos, menu em gaveta no celular, seletor de tema e telas de exemplo dentro de um celular, seguindo o tema e a cor de cliente da página.
- Site público em https://systemdesing.vercel.app: a vitrine passa a ser o `index.html` da raiz, com descrição para o Google, prévia de compartilhamento (`og.png`), `robots.txt` e `sitemap.xml`. `ui/vitrine.html` redireciona para a página inicial.

- Ponte Tailwind 4 (`ui/tailwind.css`): apaga a paleta crua do Tailwind e cria as classes de cor do padrão (`bg-page`, `bg-raised`, `text-ink`, `bg-primary`...). Testada com Tailwind 4.3.
- Domínios novos, a partir da análise de três sistemas reais (de forma genérica): [representantes e pedidos B2B](docs/dominios/representantes.md), [CRM comercial](docs/dominios/crm.md) e [atendimento/SAC](docs/dominios/atendimento.md), incluindo produtos regulados.
- Dados: código humano por sequência, trava otimista, histórico e auditoria, status interno × status para o cliente, fato ≠ status, "nunca inventar dado", falha ≠ vazio ≠ sem dado, horário útil com fuso explícito, limite de 1.000 linhas do Supabase, duas fontes para o mesmo dado.
- Integrações: contrato com ERP por consulta incremental, segurança de webhook, adaptador por provedor, regras de WhatsApp (oficial × Evolution).
- Segurança: RLS obrigatória por papel e por dono, papel protegido, login e sessão, arquivos privados, dado sensível, IA e dados.
- Projeto: camadas, modo demonstração, PWA offline, aviso de versão nova, migrações, scripts em ensaio, CI, commits com escopo, contexto para IA.
- Templates: `PROMPT-NOVO-CHAT.md`, `ESTADO.md`, `vercel.json` (cabeçalhos de segurança) e `ci.yml`.

### Mudado

- **Crédito "Criado por" em uma linha pequena**, como marca d'água: sem linhas dos lados, sem maiúsculas e sem moldura ([decisão 0007](decisoes/0007-credito-em-uma-linha.md)). A marcação antiga continua funcionando.
- Menu lateral fica parado enquanto a página rola (`position: sticky`, altura da tela) e os ícones do menu têm 20px.
- Tela de toque (`pointer: coarse`): botões, campos, itens de menu e de lista com 44px; campos com letra de 16px (evita o zoom automático do iPhone).
- Barra do topo no celular: título menor e as ações descem para a linha de baixo quando não cabem.
- Atalho de teclado (`.yn-kbd`) com 12px, como pede a regra de texto mínimo.
- Stack padrão: React + Vite + TypeScript + Tailwind 4 + Supabase + Vercel ([decisão 0004](decisoes/0004-stack-web-typescript.md), substitui a 0002).
- Documento das IAs: stack, domínios, Tailwind 4, dados, segurança e checklist atualizados.
- Regras de interface: texto mínimo de 12px, um `h1` por tela, área de toque de 44px, tema escuro só por tokens, proibido cor crua do Tailwind.

### Corrigido

- Vitrine: barra de rolagem aparente no menu horizontal em telas estreitas.
- Sistemas sem botão de menu (marcação da v0.1) mantêm a barra horizontal no celular, para não quebrar.

## [0.1.0] - 2026-10-01

### Adicionado

- Estrutura inicial do repositório de padrões da Yan Nunes — Sistemas & Consultoria.
- Marca: posicionamento, atributos (rápido, excelente, certeiro), arquitetura de produtos, requisitos do símbolo, crédito "Criado por" e voz.
- Visual: Manrope com mapa de pesos, paleta preto/branco/cinza, cores de status, tema claro/escuro e tema por cliente (`ui/tokens.css`).
- Componentes de painel com prefixo `yn-` (`ui/componentes.css`): botões, card, indicador, tabela, etiqueta de status, formulário, layout com menu lateral e crédito.
- Vitrine do design system (`ui/vitrine.html`): 20 grupos em Fundamentos, Componentes básicos e Componentes de sistema, cada um funcionando, com "ver código", cópia de tokens, busca, filtros e gerador de tema do cliente com checagem de contraste.
- Ícones: Lucide, traço 1,75, tamanhos 16/20/24.
- Componentes: estados de botão (carregando, só ícone), campos com erro, área de texto, campo com ícone, caixa de seleção, opção única, chave liga/desliga, controle deslizante, avatares, etiquetas de categoria, trilha de navegação, abas, paginação, dica, menu de ações, sanfona, avisos, aviso rápido, janela, painel lateral, barra de progresso, carregamento, estado vazio, etapas, envio de arquivos e atalho de teclado.
- Dados: formatos obrigatórios, nomes de campos, regra de status e cliente (empresa ou pessoa).
- Domínio e-commerce: SKU, canais, entidades de loja, status de pedido unificado (Mercado Livre e Shopee), mensagens de atendimento, títulos de anúncio e fotos de produto.
- Integrações: dono de cada dado, webhooks, idempotência, retry, tokens OAuth, logs.
- Stack e estrutura de projeto, segurança e LGPD.
- Templates para novos sistemas (`CLAUDE.md`, `README.md`, `tema-cliente.css`, `.env.example`, `.gitignore`, `.editorconfig`).
- Registro de decisões (0001 a 0003) e checklist de novo sistema.
- `PADRAO-YAN-NUNES.md`: documento único e autocontido para anexar em qualquer IA ao criar um sistema (regras, cores em hexadecimal, HTML da estrutura, componentes, adaptação para shadcn/ui e apps, checklist de entrega e os CSS completos no anexo).
