# Changelog

Todas as mudanças relevantes do padrão ficam registradas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versões em [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- Site público em https://systemdesing.vercel.app: a vitrine passa a ser o `index.html` da raiz, com descrição para o Google, prévia de compartilhamento (`og.png`), `robots.txt` e `sitemap.xml`. `ui/vitrine.html` redireciona para a página inicial.

- Ponte Tailwind 4 (`ui/tailwind.css`): apaga a paleta crua do Tailwind e cria as classes de cor do padrão (`bg-page`, `bg-raised`, `text-ink`, `bg-primary`...). Testada com Tailwind 4.3.
- Domínios novos, a partir da análise de três sistemas reais (de forma genérica): [representantes e pedidos B2B](docs/dominios/representantes.md), [CRM comercial](docs/dominios/crm.md) e [atendimento/SAC](docs/dominios/atendimento.md), incluindo produtos regulados.
- Dados: código humano por sequência, trava otimista, histórico e auditoria, status interno × status para o cliente, fato ≠ status, "nunca inventar dado", falha ≠ vazio ≠ sem dado, horário útil com fuso explícito, limite de 1.000 linhas do Supabase, duas fontes para o mesmo dado.
- Integrações: contrato com ERP por consulta incremental, segurança de webhook, adaptador por provedor, regras de WhatsApp (oficial × Evolution).
- Segurança: RLS obrigatória por papel e por dono, papel protegido, login e sessão, arquivos privados, dado sensível, IA e dados.
- Projeto: camadas, modo demonstração, PWA offline, aviso de versão nova, migrações, scripts em ensaio, CI, commits com escopo, contexto para IA.
- Templates: `PROMPT-NOVO-CHAT.md`, `ESTADO.md`, `vercel.json` (cabeçalhos de segurança) e `ci.yml`.

### Mudado

- Stack padrão: React + Vite + TypeScript + Tailwind 4 + Supabase + Vercel ([decisão 0004](decisoes/0004-stack-web-typescript.md), substitui a 0002).
- Documento das IAs: stack, domínios, Tailwind 4, dados, segurança e checklist atualizados.
- Regras de interface: texto mínimo de 12px, um `h1` por tela, área de toque de 44px, tema escuro só por tokens, proibido cor crua do Tailwind.

### Corrigido

- Vitrine: barra de rolagem aparente no menu horizontal em telas estreitas.

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
