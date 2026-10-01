# 0007 — Crédito "Criado por" em uma linha pequena

- **Data:** 2026-10-01
- **Status:** aceita

## Contexto

Na v0.1 o crédito era `—— CRIADO POR YAN NUNES ——`: maiúsculas espaçadas e uma linha de cada lado, imitando a assinatura do logo. No rodapé dos sistemas ele chamava mais atenção que o necessário.

## Decisão

O crédito vira uma linha só, como marca d'água: `Criado por Yan Nunes`, 12px, cinza, sem moldura, sem linhas dos lados e sem maiúsculas. Continua obrigatório em sistema de cliente e nunca usa a cor do cliente.

## Alternativas consideradas

- **Manter o formato da v0.1:** grande demais para o rodapé de um sistema de trabalho.
- **Só o símbolo:** o símbolo em vetor ainda não existe, e sozinho não diz quem fez.

## Consequências

- Marcação nova: `<footer class="yn-credit">Criado por <a href="...">Yan Nunes</a></footer>`.
- A marcação antiga (`<span>Criado por</span>` + `.yn-credit__name`) continua funcionando e já aparece pequena com o CSS novo.
