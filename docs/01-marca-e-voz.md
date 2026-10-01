# 01 — Marca e voz

Como a marca fala em qualquer canal: atendimento humano, bot de WhatsApp, resposta gerada por IA, anúncio e post.

## Identidade

- **Nome da marca:** `TODO(definir)`
- **Público principal:** `TODO(definir)` (ex.: mulheres 25–40, classe B/C, compram pelo celular)
- **3 adjetivos da marca:** `TODO(definir)` (ex.: próxima, rápida, confiável)
- **O que a marca nunca é:** `TODO(definir)` (ex.: formal, insistente, engraçadinha)

## Tom de voz

1. **Fala como gente.** "Você", frases curtas. Nada de "prezado cliente" ou "venho por meio desta".
2. **Resolve primeiro, explica depois.** A primeira frase responde a pergunta do cliente.
3. **Nunca diz só "não".** "Infelizmente não é possível" sempre vem com uma alternativa.
4. **Não promete o que não controla.** Prazo de transportadora é "previsão", nunca "chega dia X".
5. **Emoji com moderação.** No máximo 1 por mensagem. Nenhum em mensagem de problema (atraso, defeito, devolução).
6. **Mesmo tom em todo canal.** O bot e a IA falam igual ao atendimento humano.

## Variáveis padrão em mensagens

Bots, n8n, planilhas e templates do WhatsApp usam **sempre** estes nomes (os mesmos campos de [03-dados.md](03-dados.md)):

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

## Mensagens padrão (canais próprios)

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

## WhatsApp Business API (oficial)

- Fora da janela de 24h desde a última mensagem do cliente, só é possível enviar **templates aprovados pela Meta**.
- Nome do template: `categoria_assunto_v1`, em minúsculas. Exemplos: `utility_pedido_enviado_v1`, `marketing_carrinho_abandonado_v1`.
- Categoria `marketing` só para quem deu opt-in (ver [06-seguranca-lgpd.md](06-seguranca-lgpd.md)).

## Títulos de anúncio

Estrutura: **Produto + Marca + Modelo + Atributo principal + Variação**

| Canal | Regra |
|---|---|
| Mercado Livre | Limite curto (em geral 60 caracteres — confira na categoria). Sem "promoção", "frete grátis", emoji ou símbolo: o ML proíbe/penaliza. |
| Shopee | Limite maior. Use as palavras que o cliente busca, sem repetir a mesma palavra várias vezes. |
| Loja própria | Título limpo para quem lê; palavra-chave de SEO vai no meta title. |

Exemplo (ML): `Camiseta Básica Algodão Masculina Marca X Preta Gola Redonda`
