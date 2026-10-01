# 0003 — Identidade visual: Manrope, preto e branco, tema por cliente

- **Data:** 2026-10-01
- **Status:** aceita

## Contexto

A Yan Nunes entrega produtos próprios (CRM, Sales, Production) e sistemas sob medida para clientes. Cada cliente quer o sistema "com a cara dele", mas manter uma identidade diferente por projeto não escala, principalmente quando entrarem outros desenvolvedores.

A marca quer parecer tecnológica, séria e atual, com preto, branco e cinza, sem parecer empresa de informática genérica. A mesma fonte deve aparecer na marca, no site e dentro dos sistemas.

## Decisão

1. **Fonte única: Manrope** (Google Fonts, licença aberta). Bold/SemiBold para títulos e destaques, Medium para menus, botões e rótulos, Regular para texto e tabelas. Sem itálico (a fonte não tem).
2. **Paleta da marca:** preto `#000000`, branco `#FFFFFF`, cinza escuro `#202020`, cinza médio `#808080`, com tons de apoio para a interface. Cor fora disso só nos status (sucesso, andamento, atenção, erro).
3. **Duas camadas:** a base Yan Nunes é fixa; o cliente escolhe **só** a cor principal (`--color-brand`). O texto sobre ela (branco ou preto) e a variação do tema escuro saem do gerador em `ui/vitrine.html`.
4. **Crédito obrigatório** "Criado por Yan Nunes" no rodapé de todo sistema de cliente, sempre neutro.

## Alternativas consideradas

- **Inter:** mais neutra e um pouco mais compacta em tabela, mas é a fonte padrão de metade dos SaaS. Não diferencia nem conversa com o logo.
- **Cliente escolhe paleta completa:** cada sistema vira um projeto de design diferente para manter, e a assinatura Yan Nunes some.
- **Monocromático puro, sem cor de cliente:** o cliente não se sente dono do sistema; difícil de vender.
- **Cinza médio `#808080` como texto secundário:** reprova no contraste (3,95:1 no branco). Ficou só para linhas, ícones e crédito.

## Consequências

- Todo sistema carrega Manrope + `ui/tokens.css` + `ui/componentes.css`; sistema de cliente carrega também um `tema-cliente.css` com duas variáveis.
- Trocar a cor de um cliente é editar um arquivo de 4 linhas.
- O tema padrão usa `:where()` no CSS para que o tema do cliente sempre vença, em qualquer ordem de carregamento.
- O logo vetorial ainda não existe: o crédito usa só o nome até o símbolo em SVG ficar pronto.
