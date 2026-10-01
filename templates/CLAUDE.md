# Instruções para IA — NOME-DO-SISTEMA

<!--
  Como usar em cada sistema novo:
  1. Copie PADRAO-YAN-NUNES.md (da raiz do SystemDesing) para a raiz deste sistema.
  2. Copie este arquivo como CLAUDE.md. A linha "@PADRAO-YAN-NUNES.md" faz o Claude Code ler o padrão inteiro.
  3. Outras IAs de código (Cursor, Copilot, Codex...) leem AGENTS.md: copie este arquivo também com esse nome.
  4. Copie também ESTADO.md e PROMPT-NOVO-CHAT.md de templates/.

  Este arquivo tem só as regras VIGENTES. Regra que mudou é substituída aqui, não empilhada.
  O histórico (o que foi decidido, quando, por quem e por quê) vai em docs/decisoes/, um arquivo por decisão.
-->

Este sistema segue o padrão Yan Nunes. Leia e siga:

@PADRAO-YAN-NUNES.md

Antes de começar qualquer tarefa, leia `ESTADO.md`. Para o estado do projeto, vale o código: confira `git status` e `git log`.

## Sobre este sistema

- **O que faz:** TODO
- **Produto Yan Nunes ou cliente:** TODO
- **Se for de cliente, cor principal:** TODO (ex.: `#D7263D`)
- **Domínio:** TODO (representantes, CRM, atendimento, e-commerce ou outro; ver `docs/dominios/` do SystemDesing)
- **Sistemas com que conversa:** TODO
- **Dono de cada dado (estoque, clientes, preços):** TODO
- **Papéis e o que cada um vê:** TODO
- **Como rodar:** TODO
- **Como testar:** TODO

## Regras vigentes deste sistema

- TODO (só o que vale hoje; cada regra aponta para a decisão em `docs/decisoes/`)

## Ao terminar uma tarefa

1. Build e testes sem erro.
2. Telas conferidas em 1280px e 375px, claro e escuro.
3. `ESTADO.md` atualizado no mesmo PR.
