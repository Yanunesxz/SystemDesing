# 03 — Dados

O documento mais importante do repositório. Se cada sistema guardar dado de um jeito, nada conversa com nada: o relatório não fecha, a integração quebra e a IA se perde.

Vale para **todo** sistema: CRM, vendas, produção, loja. Regras específicas de cada tipo de negócio ficam em [dominios/](dominios/).

## Formatos obrigatórios

| Dado | Formato | Exemplo | Por quê |
|---|---|---|---|
| Dinheiro | Inteiro em **centavos**, campo terminando em `_cents` | `12990` = R$ 129,90 | Número decimal (float) erra conta: `0.1 + 0.2 = 0.30000000000000004` |
| Data e hora | ISO 8601 em **UTC** no armazenamento; exibir em `America/Sao_Paulo` | `2026-10-01T14:30:00Z` | Sem confusão de fuso nem de horário de verão |
| Só data | `AAAA-MM-DD` | `2026-10-01` | Ordena certo em qualquer planilha |
| Telefone | Só dígitos, com DDI 55 + DDD | `5511987654321` | É o formato que a API do WhatsApp usa |
| CPF / CNPJ | Texto, só dígitos | `"12345678909"` | Máscara é só na tela; texto não perde zero à esquerda |
| CEP | Texto, 8 dígitos | `"01310100"` | Idem |
| E-mail | Minúsculo, sem espaços | `ana@email.com` | Evita cliente duplicado |
| UF | 2 letras maiúsculas | `SP` | |
| Sim/Não | `true` / `false` | `true` | Nunca "sim", "S", "x" |
| ID externo | Texto, sempre junto com a origem (`source`; em pedido de loja, `channel`) | `source=bling`, `external_id="2000001234567890"` | ID de marketplace e ERP não cabe em número inteiro comum |

> **Pegadinha do WhatsApp:** em alguns números brasileiros, o WhatsApp devolve o telefone **sem o 9** do celular (`551187654321`). Ao procurar o cliente pelo telefone, compare com e sem o 9.

## Nomes de campos

- Inglês, `snake_case`: `customer_id`, `created_at`, `total_cents`.
- Dinheiro termina em `_cents`; data e hora em `_at`; só data em `_on` (ex.: `due_on`); quantidade em `_qty`; sim/não começa com `is_` ou `has_` (ex.: `is_active`).
- ID de outro sistema: `external_id` + `source` (de onde veio), nunca só o número.
- Toda tabela tem `id`, `created_at` e `updated_at`.

## Status

Todo processo com etapas (pedido, oportunidade do CRM, ordem de produção, chamado) segue a mesma regra:

1. Lista fechada de status, em inglês `snake_case`, registrada no domínio do sistema.
2. Cada status tem um **rótulo em português** para a tela e **uma cor fixa** (ver [02-visual.md](02-visual.md)).
3. Dado vindo de fora (marketplace, ERP) é convertido para essa lista assim que entra.

Exemplo completo: status de pedido em [dominios/ecommerce.md](dominios/ecommerce.md#status-de-pedido-unificado).

## Cliente

Cliente pode ser empresa (CRM, representantes, consultoria) ou pessoa (loja). Todo sistema usa **pelo menos** estes campos:

| Campo | Tipo | Observação |
|---|---|---|
| `id` | texto | |
| `type` | texto | `company` (empresa) ou `person` (pessoa) |
| `name` | texto | razão social ou nome completo |
| `trade_name` | texto | nome fantasia (empresa) |
| `first_name` | texto | pessoa: o que vai nas mensagens |
| `document` | texto | CPF/CNPJ só dígitos |
| `email`, `phone` | texto | formatos acima |
| `zip_code`, `city`, `state` | texto | |
| `source` | texto | de onde veio (indicação, site, Instagram, canal de venda...) |
| `marketing_opt_in` | sim/não | ver [06-seguranca-lgpd.md](06-seguranca-lgpd.md) |
| `marketing_opt_in_at` | data e hora | quando e onde autorizou |
| `created_at` | data e hora | |
