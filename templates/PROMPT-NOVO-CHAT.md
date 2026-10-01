# Prompt para começar uma sessão nova — NOME-DO-SISTEMA

<!--
  Copie este arquivo para a raiz do sistema e mantenha atualizado.
  Cole o conteúdo na primeira mensagem de uma sessão nova de IA (Claude Code, Lovable, ChatGPT).
  Atualizado em: AAAA-MM-DD
  Nada de senha, token, chave ou dado pessoal aqui. Segredo que passou por chat já vazou.
-->

## Onde você está

Você vai trabalhar no **NOME-DO-SISTEMA**, da Yan Nunes — Sistemas & Consultoria.
- O que é: UMA FRASE (ex.: central de atendimento por WhatsApp para uma marca de cosméticos).
- Para quem: QUEM USA (ex.: 5 atendentes e 1 coordenadora).
- Stack: React + Vite + TypeScript + Tailwind 4 + Supabase (padrão Yan Nunes).
- Repositório: OWNER/REPO. Produção: URL.

## Quem vence quando os documentos discordam

1. Para **regras do negócio**: o documento do cliente em `docs/` vence.
2. Para **visual, dados e segurança**: `PADRAO-YAN-NUNES.md` vence.
3. Para **o estado do projeto**: vale o **código**. Nenhum documento (nem este) vence o que está no Git.

## Leia antes de qualquer coisa

1. `CLAUDE.md` (regras vigentes deste sistema).
2. `ESTADO.md` (o que está pronto, o que falta, o que está quebrado).
3. `PADRAO-YAN-NUNES.md` (padrão visual e técnico).
4. As decisões em `docs/decisoes/` que tocam o que você vai mexer.

## Regras invioláveis deste sistema

- LISTE AQUI 3 A 8 REGRAS (ex.: "a IA nunca responde sozinha ao cliente").

## Como verificar antes de dizer que terminou

- `npm run build` (ou `pnpm verify`) sem erro.
- Abrir as telas que mudaram em **1280px e 375px**, nos temas **claro e escuro**.
- Testar com um usuário de cada papel afetado.
- Atualizar `ESTADO.md` no mesmo PR.

## Como eu gosto de trabalhar

- Português do Brasil, direto, sem enrolação. Aponte erro e risco, mesmo que seja duro.
- Uma branch e um PR por assunto. Nunca push direto na `main`.
- Mudança visual global só entra depois de eu aprovar no preview.
- "Mesclar sem aplicar não é mesclar": se o PR tem migração, ela precisa estar aplicada.

## Sua primeira resposta

1. Rode `git status` e `git log --oneline -10`. **Não confie em commit citado em documento**: confira.
2. Resuma em 5 linhas o que entendeu do estado do projeto.
3. Liste o que vai fazer antes de mexer em qualquer arquivo.
