# Changelog

Todas as mudanças relevantes do padrão ficam registradas aqui.
Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/) e versões em [SemVer](https://semver.org/lang/pt-BR/).

## [0.1.0] - 2026-10-01

### Adicionado

- Estrutura inicial do repositório de padrões da Yan Nunes — Sistemas & Consultoria.
- Marca: posicionamento, atributos (rápido, excelente, certeiro), arquitetura de produtos, requisitos do símbolo, crédito "Criado por" e voz.
- Visual: Manrope com mapa de pesos, paleta preto/branco/cinza, cores de status, tema claro/escuro e tema por cliente (`ui/tokens.css`).
- Componentes de painel com prefixo `yn-` (`ui/componentes.css`): botões, card, indicador, tabela, etiqueta de status, formulário, layout com menu lateral e crédito.
- Página de exemplo com gerador de tema do cliente e checagem de contraste (`ui/preview.html`).
- Dados: formatos obrigatórios, nomes de campos, regra de status e cliente (empresa ou pessoa).
- Domínio e-commerce: SKU, canais, entidades de loja, status de pedido unificado (Mercado Livre e Shopee), mensagens de atendimento, títulos de anúncio e fotos de produto.
- Integrações: dono de cada dado, webhooks, idempotência, retry, tokens OAuth, logs.
- Stack e estrutura de projeto, segurança e LGPD.
- Templates para novos sistemas (`CLAUDE.md`, `README.md`, `tema-cliente.css`, `.env.example`, `.gitignore`, `.editorconfig`).
- Registro de decisões (0001 a 0003) e checklist de novo sistema.
