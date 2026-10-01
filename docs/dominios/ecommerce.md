# Domínio: e-commerce

Regras que valem **só** para sistemas de loja: loja virtual, Mercado Livre, Shopee, atendimento ao consumidor final.
O núcleo (formatos de dado, integrações, segurança, visual) continua valendo; este arquivo acrescenta o que é específico de loja.

> Outros domínios (CRM, representantes, produção) ganham um arquivo próprio nesta pasta quando o primeiro sistema daquele tipo for construído.

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

## Entidades de loja

Além do cliente (ver [03-dados.md](../03-dados.md)), todo sistema de loja usa **pelo menos** estes campos com estes nomes.

**Produto (`products`)**

| Campo | Tipo | Observação |
|---|---|---|
| `sku` | texto | chave única |
| `parent_sku` | texto | SKU pai, se for variação |
| `name` | texto | |
| `gtin` | texto | EAN, se tiver |
| `cost_cents` | inteiro | custo unitário |
| `price_cents` | inteiro | preço de tabela |
| `stock_qty` | inteiro | ver "fonte da verdade" em [04-integracoes.md](../04-integracoes.md) |
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

## Status de pedido unificado

Cada canal tem seus próprios status. Internamente, **todo sistema de loja usa só estes** (também valem para pedidos de representantes):

| Status | Significa | Ação |
|---|---|---|
| `awaiting_payment` | Aguardando pagamento | Não separar |
| `paid` | Pago | Separar e faturar |
| `invoiced` | NF-e emitida | Embalar |
| `ready_to_ship` | Embalado, etiqueta pronta | Postar / aguardar coleta |
| `shipped` | Enviado | Mandar rastreio |
| `delivered` | Entregue | Pós-venda |
| `cancel_requested` | Cancelamento solicitado | **NÃO enviar** |
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

## Mensagens para o cliente da loja

O tom segue a [voz da marca](../01-marca.md#voz-da-marca-yan-nunes), adaptado ao consumidor final: "você", frases curtas, resolve primeiro e explica depois, no máximo 1 emoji e nenhum em mensagem de problema. Prazo de transportadora é "previsão", nunca promessa.

### Variáveis padrão

Bots, n8n, planilhas e templates do WhatsApp usam **sempre** estes nomes (os mesmos campos das entidades acima):

| Variável | Exemplo |
|---|---|
| `{{first_name}}` | Ana |
| `{{order_number}}` | 10234 |
| `{{channel}}` | site |
| `{{order_total}}` | R$ 129,90 |
| `{{payment_url}}` | https://... |
| `{{tracking_code}}` | AA123456789BR |
| `{{tracking_url}}` | https://... |
| `{{estimated_delivery}}` | 08/10 |

### Mensagens padrão (canais próprios)

> **Atenção:** no Mercado Livre e na Shopee a conversa com o comprador acontece **dentro da plataforma** e passar contato, link externo ou chamar no WhatsApp viola as regras (e o ML nem entrega o telefone real do comprador). Os modelos abaixo são para **loja própria, WhatsApp e Instagram**.

**Pedido confirmado**
```
Oi, {{first_name}}! Seu pedido #{{order_number}} foi confirmado ✅
Já estamos separando. Assim que sair para entrega, te mando o rastreio por aqui.
```

**Pedido enviado**
```
{{first_name}}, seu pedido #{{order_number}} saiu para entrega 📦
Rastreio: {{tracking_code}}
Acompanhe aqui: {{tracking_url}}
Previsão de entrega: {{estimated_delivery}}
```

**Atraso**
```
{{first_name}}, seu pedido #{{order_number}} está com atraso na transportadora.
Já abri um chamado com eles e vou te atualizando por aqui. Se preferir, posso te oferecer [alternativa].
```

**Pós-venda (3 dias após a entrega)**
```
Oi, {{first_name}}! Chegou tudo certinho com o pedido #{{order_number}}?
Se tiver qualquer problema, me responde aqui que eu resolvo.
```

**Carrinho abandonado (1 hora depois)**
```
{{first_name}}, vi que você deixou alguns itens no carrinho 🛒
Seu pedido de {{order_total}} ainda está reservado: {{payment_url}}
Ficou alguma dúvida? Me chama aqui.
```

### WhatsApp Business API (oficial)

- Fora da janela de 24h desde a última mensagem do cliente, só é possível enviar **templates aprovados pela Meta**.
- Nome do template: `categoria_assunto_v1`, em minúsculas. Exemplos: `utility_pedido_enviado_v1`, `marketing_carrinho_abandonado_v1`.
- Categoria `marketing` só para quem deu opt-in (ver [06-seguranca-lgpd.md](../06-seguranca-lgpd.md)).

## Títulos de anúncio

Estrutura: **Produto + Marca + Modelo + Atributo principal + Variação**

| Canal | Regra |
|---|---|
| Mercado Livre | Limite curto (em geral 60 caracteres — confira na categoria). Sem "promoção", "frete grátis", emoji ou símbolo: o ML proíbe/penaliza. |
| Shopee | Limite maior. Use as palavras que o cliente busca, sem repetir a mesma palavra várias vezes. |
| Loja própria | Título limpo para quem lê; palavra-chave de SEO vai no meta title. |

Exemplo (ML): `Camiseta Básica Algodão Masculina Marca X Preta Gola Redonda`

## Fotos de produto

| Regra | Valor |
|---|---|
| Tamanho | 1200 × 1200 px (quadrada, serve para ML, Shopee e loja) |
| Primeira foto | Fundo branco puro, produto ocupando ~85% da imagem, sem texto, logo ou selo (o ML exige em muitas categorias) |
| Demais fotos | Detalhe, uso/ambientado, medidas, embalagem |
| Formato | JPG (qualidade ~85%) ou WebP na loja própria |
| Nome do arquivo | `SKU_01.jpg`, `SKU_02.jpg`... (ex.: `CAM-BASIC-PRT-M_01.jpg`) |
