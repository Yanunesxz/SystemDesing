# 0005 — Menu no celular: gaveta ou abas embaixo

- **Data:** 2026-10-01
- **Status:** aceita

## Contexto

Na v0.1, o menu lateral virava uma barra horizontal rolável no topo do celular. Com mais de quatro itens, metade do menu ficava escondida e ninguém percebia que dava para rolar. Os sistemas reais analisados resolviam isso cada um de um jeito: gaveta em uns, abas embaixo em outros, barra rolável em outros.

Quem usa o sistema também é diferente: quem está no escritório abre o menu de vez em quando; quem está na rua (representante, entregador, vistoria) troca de tela o tempo todo, com uma mão.

## Decisão

Dois modelos, escolhidos pelo tipo de uso:

- **Gaveta** (padrão), para sistemas de escritório: botão de menu na barra do topo abre o menu por cima da tela.
- **Abas embaixo**, para apps de rua: 3 a 5 destinos fixos embaixo, ao alcance do polegar; o resto vai em "Mais".

No computador os dois são iguais: menu lateral fixo, que pode recolher para só ícones.

## Alternativas consideradas

- **Só gaveta:** o representante que troca de tela 50 vezes por dia teria dois toques a cada troca.
- **Só abas:** sistema de escritório com 10 páginas não cabe em 5 abas.
- **Manter a barra rolável:** esconde itens sem avisar.

## Consequências

- Componentes novos: `.yn-nav-toggle`, `.yn-scrim`, `.yn-shell--tabs`, `.yn-tabbar`, `.yn-sidebar__toggle` (recolher), `.yn-context`, `.yn-sidebar__user`.
- A marcação da v0.1 (sem botão de menu e sem abas) continua com a barra rolável, para não quebrar sistemas antigos. Sistema novo usa gaveta ou abas.
- O `CLAUDE.md` de cada sistema diz qual modelo ele usa.
- Telas completas de exemplo em `ui/exemplos/`.
