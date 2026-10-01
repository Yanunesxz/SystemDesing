# 04 — Integrações

Regras para qualquer código ou automação (n8n, script, API) que conversa com Mercado Livre, Shopee, WhatsApp, ERP, gateway de pagamento ou loja.

## 1. Estoque tem UM dono

Defina **um único sistema** como fonte da verdade do estoque (ERP, planilha mestre ou banco próprio). Os canais só **recebem** o estoque dele.
Dois sistemas alterando estoque por conta própria = venda sem produto e reclamação no ML.

`TODO(definir)`: qual é a fonte da verdade do estoque hoje? → registrar em `decisoes/`.

## 2. Webhook: responde rápido, processa depois

1. Recebeu a notificação → salva → responde `200` **imediatamente**.
2. O processamento (buscar pedido, baixar estoque, mandar mensagem) acontece **depois**, numa fila ou em outro fluxo.
3. Se demorar para responder, a plataforma considera falha, reenvia e pode desativar o seu webhook. O Mercado Livre exige resposta em fração de segundo (confira o limite atual na documentação).

A notificação do Mercado Livre só diz **qual** recurso mudou (ex.: `/orders/2000001234567890`). Os dados você busca na API em seguida.

## 3. Tudo é idempotente

A mesma notificação **vai** chegar duas ou mais vezes. Processar de novo não pode duplicar nada.

- Salvar pedido = **upsert** por `channel` + `external_id` (atualiza se existe, cria se não existe).
- Guarde quais eventos já foram processados.
- Baixa de estoque amarrada ao pedido: se o pedido já baixou estoque, não baixa de novo.

## 4. Falhou? Tenta de novo, com calma

- Erro de rede ou `5xx`: tenta de novo com espera crescente (1s, 2s, 4s, 8s, 16s), no máximo 5 vezes.
- `429` (muitas requisições): respeite o cabeçalho `Retry-After`.
- `4xx` (exceto 429): **não** tente de novo — o erro é seu. Registre no log e avise.
- Esgotou as tentativas: avisa no canal interno (WhatsApp/Telegram da equipe) com canal, operação e ID.

## 5. Tokens OAuth

| Plataforma | Comportamento (confira na doc oficial) | Cuidado |
|---|---|---|
| Mercado Livre | Access token dura ~6h. O refresh token **só pode ser usado uma vez** e cada renovação devolve um novo. | Salve o novo refresh token **toda vez**. Esquecer isso derruba a integração. |
| Shopee | Access token dura ~4h; refresh token ~30 dias. | Renove antes de expirar, não depois do erro. |
| WhatsApp (Meta) | Use token de **usuário do sistema** (não expira como o token temporário de teste). | Nunca use o token temporário em produção. |

Tokens ficam em variável de ambiente ou no banco — **nunca** no código (ver [06-seguranca-lgpd.md](06-seguranca-lgpd.md)).

## 6. Converta na entrada

Todo dado de canal externo é convertido para o formato de [03-dados.md](03-dados.md) **assim que entra**: status unificado, centavos, telefone só dígitos, data em UTC.
Dentro do sistema, ninguém mais lida com o formato do ML ou da Shopee.

## 7. Log de toda chamada

Cada chamada externa registra: data e hora, `channel`, operação, `external_id`, código HTTP, tempo de resposta.
**Nunca** registre token, CPF ou telefone completo.

## 8. Nomes de variáveis de ambiente

```
ML_CLIENT_ID
ML_CLIENT_SECRET
ML_REDIRECT_URI
SHOPEE_PARTNER_ID
SHOPEE_PARTNER_KEY
SHOPEE_SHOP_ID
WHATSAPP_TOKEN
WHATSAPP_PHONE_NUMBER_ID
ANTHROPIC_API_KEY
DATABASE_URL
```

Prefixo do serviço + o que é, em maiúsculas. Lista completa em [`templates/.env.example`](../templates/.env.example).

## 9. Teste antes de ligar em produção

- Mercado Livre: crie usuários de teste pela API.
- Shopee: use o ambiente de teste (sandbox) do Open Platform.
- WhatsApp: teste com o número de teste da Meta antes de usar o número da loja.

## Exemplo: pedido pago no Mercado Livre

```
Notificação "orders_v2" chega
  → salva o evento e responde 200
  → (fila) busca /orders/{id} e /shipments/{id}
  → converte para o pedido padrão (status unificado, centavos)
  → upsert por channel=mercadolivre + external_id
  → se virou "paid": baixa estoque na fonte da verdade
  → avisa a equipe no grupo interno: "Novo pedido ML #... — CAM-BASIC-PRT-M x2"
```

Repare: **não** manda WhatsApp para o comprador do ML (proibido pelas regras do marketplace).
