# 0001 — Um repositório único de padrões

- **Data:** 2026-10-01
- **Status:** aceita

## Contexto

Cada sistema (CRM, sistemas de vendas e produção, automações, integrações, lojas) estava sendo criado do zero, com cores, formatos de dados e jeitos de integrar diferentes. Resultado: retrabalho, dado que não bate entre sistemas e IA de código gerando cada sistema de um jeito. Com equipe crescendo, isso piora.

## Decisão

Todo padrão — visual, voz, dados, integrações, stack e segurança — fica neste repositório, versionado. Cada sistema:

1. Copia `templates/CLAUDE.md` para a raiz (a IA de código segue as regras).
2. Importa `ui/tokens.css` e `ui/componentes.css` pela URL versionada do jsDelivr.
3. Declara no README qual versão do padrão segue.

## Alternativas consideradas

- **Notion / Google Docs:** fácil de escrever, mas a IA de código não lê, não tem versão e o CSS não pode ser importado de lá.
- **Padrão dentro de cada sistema:** vira cópia desatualizada em poucas semanas.

## Consequências

- O repositório precisa ser **público** (para o jsDelivr). Nada sensível entra aqui.
- Mudança de regra exige versão nova e entrada no `CHANGELOG.md`.
- Sistemas antigos podem ficar numa versão antiga do padrão até serem atualizados — e isso fica visível no README deles.
