# Instruções para IA — NOME-DO-SISTEMA

<!--
  Copie este arquivo para a raiz de cada sistema novo.
  Outras IAs de código (Cursor, Copilot, Codex...) leem AGENTS.md: se usar alguma, copie também com esse nome.
  Ao atualizar o padrão, atualize a versão abaixo.
-->

Este sistema é da **Yan Nunes — Sistemas & Consultoria** e segue o padrão **SystemDesing v0.1.0**: https://github.com/Yanunesxz/SystemDesing/tree/v0.1.0
Em caso de dúvida, a regra completa está lá. Se algo deste sistema precisar fugir do padrão, pergunte antes e registre o motivo em `docs/decisoes/`.

## Regras não negociáveis

**Idioma**
- Código (variáveis, funções, tabelas, campos) em inglês, `snake_case` em Python e banco.
- Telas, mensagens, documentação e commits em português do Brasil.

**Dados**
- Dinheiro: inteiro em centavos, campo terminando em `_cents`. Nunca float.
- Data e hora: ISO 8601 em UTC no armazenamento (`_at`); exibir em `America/Sao_Paulo`. Só data: `AAAA-MM-DD` (`_on`).
- Telefone: só dígitos com DDI 55 + DDD (`5511987654321`). Ao buscar pelo telefone, comparar com e sem o 9.
- CPF, CNPJ e CEP: texto só com dígitos. Máscara só na tela.
- ID de outro sistema: `external_id` (texto) + `source`. Nunca só o número.
- Toda tabela tem `id`, `created_at`, `updated_at`.
- Status: lista fechada em inglês `snake_case`, com rótulo em português e cor fixa.

**Integrações**
- Cada dado tem um dono (estoque, clientes, preços). Os outros sistemas só leem dele.
- Webhook responde 200 imediatamente e processa depois.
- Toda operação é idempotente (upsert por `source` + `external_id`).
- Retry com espera crescente em erro de rede/5xx; respeitar `Retry-After` no 429; não repetir outros 4xx.
- Converter dado externo para o formato padrão assim que entra.

**Segurança**
- Segredos só em variável de ambiente. `.env` nunca no Git.
- Nunca logar token, CPF ou telefone completo.
- Campanha de marketing só para quem tem `marketing_opt_in = true`.

**Visual**
- Carregar Manrope + `ui/tokens.css` + `ui/componentes.css` do padrão (e `tema-cliente.css`, se for sistema de cliente).
- Usar só `var(--...)` e as classes `yn-*`. Nunca cor, fonte ou tamanho fixo no código.
- Manrope: Bold em títulos e destaques, Medium em menus/botões/rótulos, Regular em texto e tabelas. **Sem itálico.**
- Preto, branco e cinza. Cor do cliente só em `--color-brand` (botão principal, menu ativo). Cores de status só para status.
- Números em tabela e indicador com `tabular-nums` (`.yn-num`, `.yn-table`).
- Um botão principal por tela. Mobile primeiro. Tema claro e escuro.
- Sistema de cliente: rodapé com o crédito `.yn-credit` ("Criado por Yan Nunes"), sempre neutro.

**Voz**
- Fala da operação do usuário, não da tecnologia. Frase curta, verbo no começo ("Salvar pedido").
- Erro diz o que houve e como resolver: "Não deu para salvar: o CNPJ está incompleto."
- Sem "Operação realizada com sucesso!", sem "Erro inesperado", sem "prezado".

**Domínio** (apague o que não se aplica)
- E-commerce: seguir `docs/dominios/ecommerce.md` do padrão (SKU `CAT-MODELO-COR-TAM`, `channel`, status de pedido unificado). Nunca contatar comprador de marketplace fora da plataforma. Mercado Livre: salvar o novo refresh token a cada renovação.

## Sobre este sistema

- **O que faz:** TODO
- **Produto Yan Nunes ou cliente:** TODO
- **Sistemas com que conversa:** TODO
- **Dono de cada dado (estoque, clientes, preços):** TODO
- **Como rodar:** TODO
- **Como testar:** TODO
