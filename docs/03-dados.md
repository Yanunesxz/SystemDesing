# 03 — Dados

O documento mais importante do repositório. Se cada sistema guardar dado de um jeito, nada conversa com nada: estoque não sincroniza, relatório não fecha e a IA se perde.

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
| ID externo | Texto, sempre junto com o canal | `channel=mercadolivre`, `external_id="2000001234567890"` | ID do ML não cabe em número inteiro comum |

> **Pegadinha do WhatsApp:** em alguns números brasileiros, o WhatsApp devolve o telefone **sem o 9** do celular (`551187654321`). Ao procurar o cliente pelo telefone, compare com e sem o 9.

## Canais

Valores fixos para o campo `channel`:

`mercadolivre` · `shopee` · `site` · `whatsapp` · `instagram`

Canal novo (Amazon, Magalu, TikTok Shop...) entra aqui antes de entrar em qualquer sistema.

## SKU

Formato: **`CAT-MODELO-COR-TAM`**

| Parte | Regra | Exemplo |
|---|---|---|
| `CAT` | 3 letras da categoria | `CAM` (camiseta), `CAL` (calça) |
| `MODELO` | 3 a 6 letras/números do modelo | `BASIC`, `OVER01` |
| `COR` | 3 letras | `PRT` (preto), `BRA` (branco), `AZM` (azul-marinho) |
| `TAM` | Tamanho ou `U` (único) | `P`, `M`, `G`, `GG`, `38`, `U` |

Exemplo completo: `CAM-BASIC-PRT-M`

**Regras:**

1. Só `A-Z`, `0-9` e hífen. Sem acento, espaço ou minúscula. Máximo 20 caracteres.
2. **O mesmo produto físico tem o mesmo SKU em todos os canais** (ML, Shopee, loja, ERP, planilha). É por ele que o estoque sincroniza.
3. **SKU nunca é reaproveitado**, mesmo depois que o produto sai de linha.
4. Anúncio com variações: o SKU pai é `CAT-MODELO` (ex.: `CAM-BASIC`); cada variação é um SKU filho.
5. Kit: começa com `KIT-` e tem a composição registrada (ex.: `KIT-CAM3-PRT-M` = 3 × `CAM-BASIC-PRT-M`).
6. SKU **não** é código de barras: EAN/GTIN fica no campo `gtin`.

`TODO(definir)`: tabela de categorias e cores do catálogo real.

| CAT | Categoria | | COR | Cor |
|---|---|---|---|---|
| `TODO` | | | `PRT` | Preto |
| | | | `BRA` | Branco |

## Entidades mínimas

Nomes de campo em inglês, `snake_case`. Todo sistema que guarda essas informações usa **pelo menos** estes campos com estes nomes.

**Produto (`products`)**

| Campo | Tipo | Observação |
|---|---|---|
| `sku` | texto | chave única |
| `parent_sku` | texto | SKU pai, se for variação |
| `name` | texto | |
| `gtin` | texto | EAN, se tiver |
| `cost_cents` | inteiro | custo unitário |
| `price_cents` | inteiro | preço de tabela |
| `stock_qty` | inteiro | ver "fonte da verdade" em [04-integracoes.md](04-integracoes.md) |
| `weight_g`, `length_cm`, `width_cm`, `height_cm` | inteiro | embalado; frete depende disso |
| `status` | texto | `active`, `paused`, `discontinued` |
| `created_at`, `updated_at` | data e hora | |

**Pedido (`orders`)**

| Campo | Tipo | Observação |
|---|---|---|
| `id` | texto | ID interno |
| `channel` | texto | ver "Canais" |
| `external_id` | texto | ID do pedido no canal; `channel` + `external_id` é único |
| `order_number` | texto | número que o cliente vê |
| `status` | texto | ver "Status de pedido" |
| `customer_id` | texto | |
| `subtotal_cents`, `shipping_cents`, `discount_cents`, `total_cents` | inteiro | |
| `fees_cents` | inteiro | **comissão + tarifas do canal** — sem isso você não sabe sua margem real |
| `created_at`, `paid_at`, `shipped_at`, `delivered_at` | data e hora | |

**Item do pedido (`order_items`)**: `order_id`, `sku`, `quantity`, `unit_price_cents`.

**Cliente (`customers`)**

| Campo | Tipo | Observação |
|---|---|---|
| `id` | texto | |
| `name`, `first_name` | texto | `first_name` é o que vai nas mensagens |
| `document` | texto | CPF/CNPJ só dígitos |
| `email`, `phone` | texto | formatos acima |
| `zip_code`, `city`, `state` | texto | |
| `channel` | texto | canal de origem |
| `marketing_opt_in` | sim/não | ver [06-seguranca-lgpd.md](06-seguranca-lgpd.md) |
| `marketing_opt_in_at` | data e hora | quando e onde autorizou |
| `created_at` | data e hora | |

## Status de pedido unificado

Cada canal tem seus próprios status. Internamente, **todo sistema usa só estes**:

| Status | Significa | Ação |
|---|---|---|
| `awaiting_payment` | Aguardando pagamento | Não separar |
| `paid` | Pago | Separar e faturar |
| `invoiced` | NF-e emitida | Embalar |
| `ready_to_ship` | Embalado, etiqueta pronta | Postar / aguardar coleta |
| `shipped` | Enviado | Mandar rastreio |
| `delivered` | Entregue | Pós-venda |
| `cancel_requested` | Cancelamento pedido | **NÃO enviar** |
| `cancelled` | Cancelado | Devolver item ao estoque |
| `returned` | Devolvido | Conferir produto e estoque |

### Mapeamento por canal

> Baseado na documentação pública das APIs. **Confira na doc oficial antes de programar** ([developers.mercadolivre.com.br](https://developers.mercadolivre.com.br) e [open.shopee.com](https://open.shopee.com)): status mudam.

| Interno | Mercado Livre | Shopee | Loja própria |
|---|---|---|---|
| `awaiting_payment` | pedido `payment_required`, `payment_in_process` | `UNPAID` | `TODO(definir)` |
| `paid` | pedido `paid` + envio `pending` / `handling` | `READY_TO_SHIP` | |
| `invoiced` | controle interno / ERP (NF emitida) | controle interno / ERP | |
| `ready_to_ship` | envio `ready_to_ship` | `PROCESSED` | |
| `shipped` | envio `shipped` | `SHIPPED` | |
| `delivered` | envio `delivered` | `TO_CONFIRM_RECEIVE`, `COMPLETED` | |
| `cancel_requested` | pedido `pending_cancel` | `IN_CANCEL` | |
| `cancelled` | pedido `cancelled` | `CANCELLED` | |
| `returned` | devolução/reclamação (API de claims) | `TO_RETURN` | |

No Mercado Livre o status vem de dois lugares: o **pedido** (`/orders`) diz se pagou; o **envio** (`/shipments`) diz onde está o pacote.
