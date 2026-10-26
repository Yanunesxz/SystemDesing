# 0010 — Processo de criação e comunicação fazem parte do padrão

- **Data:** 2026-10-26
- **Status:** aceita

## Contexto

Até a v0.3, o padrão dizia **como** cada coisa é feita (visual, dados, segurança, diagnóstico), mas não **em que ordem** nem **quando está pronto para seguir**. Na prática, o projeto começava pela tela, ou direto pelo código numa IA que gera tudo na primeira mensagem. O problema e o número de sucesso ficavam só na conversa, e o que não ia ser feito só aparecia na hora da entrega.

A comunicação com o cliente também mudava de projeto para projeto: decisão combinada por áudio e esquecida, semanas sem notícia, pedido fora do combinado aceito calado. Dentro do sistema era igual: aviso demais, aviso sem link para agir, dado pessoal aparecendo na tela bloqueada do celular.

## Decisão

- Todo projeto novo segue as **7 fases** de [docs/00](../docs/00-processo-de-criacao.md): entender, desenhar, modelar, construir, conferir, entregar, acompanhar. Cada fase tem um **portão**, e só se passa para a próxima com ele fechado. A IA segue o mesmo processo, e em ferramenta que gera tela na hora a primeira entrega é o protótipo no modo demonstração.
- Toda tela é conferida com as **20 leis de UX** de [docs/08](../docs/08-leis-de-ux.md), pelas 8 perguntas de "Como conferir uma tela".
- A comunicação segue [docs/09](../docs/09-comunicacao.md):
  - com o cliente, cada assunto no canal certo, toda decisão por escrito, resumo semanal e os 7 modelos de mensagem;
  - dentro do sistema, aviso só do que pede ação, do canal mais leve ao mais forte, com link direto e sem nada sensível no texto.
- O `PADRAO-YAN-NUNES.md` leva o resumo das três coisas (seções 0, 7 e 8), para a IA seguir sem abrir o repositório. Projeto do zero começa pelo [`templates/PROMPT-NOVO-PROJETO.md`](../templates/PROMPT-NOVO-PROJETO.md).

## Alternativas consideradas

- **Deixar o processo para cada projeto:** é o que já acontecia, e cada um começava de um jeito.
- **Documento de processo separado, fora do padrão:** a IA não recebe, e o que a IA não recebe ela não segue.
- **Metodologia pronta (Scrum, Design Sprint) inteira:** pesada para projeto de uma pessoa ou de equipe pequena. Ficou só o que muda o resultado: o portão, a decisão por escrito e o teste com quem vai usar.

## Consequências

- Nenhum projeto novo começa pelo código. A primeira entrega é o resumo do entendimento, e depois o protótipo.
- `ESTADO.md` ganha a fase atual, o portão e o número de sucesso. `CLAUDE.md` do sistema ganha o número de sucesso e o que fica fora.
- Não obriga sistema existente a mudar nada de código (por isso é MINOR). Projeto em andamento adota a partir da fase em que está.
