# Instruções para IA — NOME-DO-SISTEMA

<!--
  Copie este arquivo para a raiz de cada sistema novo.
  Outras IAs de código (Cursor, Copilot, Codex...) leem AGENTS.md: se usar alguma, copie também com esse nome.
  Ao atualizar o padrão, atualize a versão abaixo.
-->

Este sistema segue o padrão **SystemDesing v0.1.0**: https://github.com/Yanunesxz/SystemDesing/tree/v0.1.0
Em caso de dúvida, a regra completa está lá. Se algo deste sistema precisar fugir do padrão, pergunte antes e registre o motivo em `docs/decisoes/`.

## Regras não negociáveis

**Idioma**
- Código (variáveis, funções, tabelas, campos) em inglês, `snake_case` em Python e banco.
- Mensagens para cliente, documentação, commits e telas em português do Brasil.

**Dados**
- Dinheiro: inteiro em centavos, campo terminando em `_cents`. Nunca float.
- Data e hora: ISO 8601 em UTC no armazenamento; exibir em `America/Sao_Paulo`.
- Telefone: só dígitos com DDI 55 + DDD (`5511987654321`). Ao buscar cliente pelo telefone, comparar com e sem o 9.
- CPF, CNPJ e CEP: texto só com dígitos.
- SKU: `CAT-MODELO-COR-TAM`, maiúsculo, só A-Z, 0-9 e hífen, máx. 20 caracteres. O mesmo SKU em todos os canais. Nunca reaproveitar.
- `channel`: `mercadolivre`, `shopee`, `site`, `whatsapp`, `instagram`.
- Status de pedido: só `awaiting_payment`, `paid`, `invoiced`, `ready_to_ship`, `shipped`, `delivered`, `cancel_requested`, `cancelled`, `returned`.
- Pedido é único por `channel` + `external_id`.

**Integrações**
- Webhook responde 200 imediatamente e processa depois.
- Toda operação é idempotente (upsert por `channel` + `external_id`).
- Retry com espera crescente em erro de rede/5xx; respeitar `Retry-After` no 429; não repetir outros 4xx.
- Converter dado externo para o formato padrão assim que entra.
- Mercado Livre: salvar o novo refresh token a cada renovação.
- Nunca contatar comprador de marketplace fora da plataforma.

**Segurança**
- Segredos só em variável de ambiente. `.env` nunca no Git.
- Nunca logar token, CPF ou telefone completo.
- Campanha de marketing só para cliente com `marketing_opt_in = true`.

**Visual**
- Usar `tokens.css` do padrão e as variáveis `var(--...)`. Nunca cor ou tamanho fixo no código.
- Um botão principal por tela. Mobile primeiro.

**Voz**
- Mensagens ao cliente: diretas, "você", sem "prezado". Resolve primeiro, explica depois. No máximo 1 emoji; nenhum em mensagem de problema.
- Variáveis de mensagem: `{{first_name}}`, `{{order_number}}`, `{{tracking_code}}`, `{{tracking_url}}`, `{{estimated_delivery}}`, `{{order_total}}`, `{{payment_url}}`.

## Sobre este sistema

- **O que faz:** TODO
- **Canais que toca:** TODO
- **Fonte da verdade do estoque:** TODO
- **Como rodar:** TODO
- **Como testar:** TODO
