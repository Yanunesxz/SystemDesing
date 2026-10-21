# 0009 — Responsivo pelo espaço disponível, não só pelo aparelho

- **Data:** 2026-10-21
- **Status:** aceita

## Contexto

Na v0.2, o conteúdo parava em 1280px e os componentes só mudavam pelo tamanho do aparelho. Num monitor largo, o funil de vendas rolava de lado enquanto metade da tela ficava vazia. E a mesma ficha, aberta num painel lateral estreito, não empilhava, porque o aparelho era "grande".

## Decisão

- **Tela de trabalho** (lista, quadro, tabela, painel, mensagens) usa toda a largura que sobra ao lado do menu. **Tela de formulário ou de leitura** usa `.yn-content--narrow` (960px).
- A página, o `.yn-content` e o novo `.yn-container` passam a ser áreas que respondem ao espaço (`container-type: inline-size`). Ficha 360, formulário longo, caixa de mensagens, tabela que vira cards e rodapé do formulário mudam pela largura de onde estão.
- O menu continua mudando pelo tamanho do aparelho (gaveta ou abas no celular).

## Alternativas consideradas

- **Manter o limite de 1280px:** desperdiça monitor e faz quadro e tabela rolarem de lado sem necessidade.
- **Centralizar o conteúdo:** some a sobra dos dois lados, mas o espaço continua desperdiçado.

## Consequências

- `.yn-content` não tem mais `max-width`. Token novo `--content-narrow`; `--content-max` fica só por compatibilidade.
- Sistema que atualizar para a v0.3 vê as telas de trabalho mais largas; tela de formulário precisa de `.yn-content--narrow`.
- Exige navegador com container queries (todos os atuais).
- A regra 17 do Diagnóstico testa: rolagem lateral, tela de trabalho usando menos de 80% do espaço e quadro rolando com espaço sobrando.
