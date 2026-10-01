# Changelog

Todas as mudanças relevantes do padrão ficam registradas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versões em [SemVer](https://semver.org/lang/pt-BR/).

## [Não lançado]

### Adicionado

- Site público em https://systemdesing.vercel.app: a vitrine passa a ser o `index.html` da raiz, com descrição para o Google, prévia de compartilhamento (`og.png`), `robots.txt` e `sitemap.xml`. `ui/vitrine.html` redireciona para a página inicial.

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
