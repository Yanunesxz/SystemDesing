# 0006 — Tema claro e escuro obrigatório, com escolha da pessoa

- **Data:** 2026-10-01
- **Status:** aceita

## Contexto

Desde a v0.1 os tokens têm tema claro e escuro seguindo o aparelho. Mas não havia regra de **oferecer a troca**, nem de guardar a escolha, e cada sistema fazia o escuro de um jeito (alguns remapeando a paleta do framework, o que quebra a cor do cliente). Quem trabalha à noite ou em galpão escuro precisa do escuro; quem usa no sol precisa do claro, mesmo com o aparelho no outro modo.

## Decisão

Todo sistema do padrão tem modo claro e modo escuro, sem exceção:

- começa igual ao aparelho;
- tem botão de lua/sol na barra do topo e a escolha Aparelho · Claro · Escuro em Configurações;
- guarda a escolha no navegador (`localStorage`, chave `tema`) e, com login, no perfil;
- aplica a escolha com um script de uma linha no `<head>`, para a tela não piscar;
- o escuro vem só dos tokens.

## Alternativas consideradas

- **Só seguir o aparelho:** a pessoa não consegue trocar sem mudar o celular inteiro.
- **Só claro:** cansa a vista à noite e gasta mais bateria em tela OLED.

## Consequências

- Componente novo `.yn-segmented` e classes `.yn-only-light` / `.yn-only-dark` (ícone do botão de tema sem script).
- O bloco do `<head>` no `PADRAO-YAN-NUNES.md` ganha o script do tema.
- Sistemas existentes precisam do botão de tema e do script no próximo ajuste visual.
