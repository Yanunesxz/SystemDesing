# 04 — Integrações

Regras para qualquer código ou automação (n8n, script, API) que conversa com outro sistema: ERP, CRM, gateway de pagamento, WhatsApp, Mercado Livre, Shopee, loja.

## 1. Cada dado tem UM dono

Para cada dado importante, **um único sistema** é a fonte da verdade; os outros só **recebem** dele. Exemplos:

- **Estoque:** o ERP ou o sistema de produção. Dois sistemas alterando estoque por conta própria = venda sem produto.
- **Cadastro de clientes:** o CRM. O sistema de representantes lê de lá, não cria cadastro paralelo.
- **Preço e tabela comercial:** um lugar só; o representante nunca digita preço "de cabeça".

Em todo projeto, registre em `docs/decisoes/` do sistema quem é o dono de cada dado.

Escreva esse "dicionário de dados" no `README` do sistema: para cada dado, quem é o dono e quem só lê.

## 2. Webhook: responde rápido, processa depois

1. Recebeu a notificação → salva → responde `200` **imediatamente**.
2. O processamento (buscar pedido, baixar estoque, mandar mensagem) acontece **depois**, numa fila ou em outro fluxo.
3. Se demorar para responder, a plataforma considera falha, reenvia e pode desativar o seu webhook. O Mercado Livre exige resposta em fração de segundo (confira o limite atual na documentação).

A notificação do Mercado Livre só diz **qual** recurso mudou (ex.: `/orders/2000001234567890`). Os dados você busca na API em seguida.

**Segurança do webhook:**

- O segredo vai no **cabeçalho** (`x-webhook-token`) ou numa assinatura **HMAC** conferida em tempo constante. **Nunca na URL** (`?chave=...`): URL vai parar em log, histórico e print.
- Teste obrigatório: a chamada **sem** o segredo é recusada.
- CORS restrito ao domínio do sistema, nunca `*` em função que grava.

**Um adaptador por provedor:** cada provedor (Evolution, API oficial, Z-API, Shopify...) tem um adaptador que converte o que chega para **um evento único do sistema**. O resto do código não sabe de qual provedor veio. Trocar de provedor é trocar o adaptador.

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

## 6. Integração com ERP

O ERP é dono de estoque, faturamento e nota fiscal. O sistema da Yan Nunes **não substitui o ERP**: conversa com ele por um contrato claro.

**Quando o ERP não manda webhook, ele consulta o sistema (polling):**

| Regra | Como |
|---|---|
| Autenticação | Chave por cliente/marca no cabeçalho `X-API-Key`, guardada como segredo |
| Consulta incremental | `GET /pedidos?since=<data ISO com fuso>`. O servidor pega a hora **antes** de consultar e devolve como próximo `since`, para não perder nada que entrou durante a consulta |
| Confirmação | O ERP confirma cada item recebido e devolve o número dele (`external_id`) |
| Lote | Máximo de 1.000 registros por chamada |
| Erro | Sempre no mesmo formato: `{ "error": "mensagem", "code": "CODIGO", "statusCode": 409 }` |
| Liga/desliga | Cada fluxo (envio manual, automático, carga inicial) é um **canal** que o admin liga e desliga por empresa. Canal fechado responde `409 CHANNEL_CLOSED` |
| Eco | O sistema não devolve ao ERP o que o próprio ERP mandou |
| Versão | `/v1` só ganha campos novos; mudança que quebra vira `/v2` |
| Log | Toda chamada em `integration_log` (rota, quantidade, tempo, erro) **sem dado pessoal** |

**Na tela:**

- **Saúde da integração:** canais ligados, última chamada de cada rota, itens na fila, último erro.
- **"Sincronizar agora"** com tempo limite.
- **Pedir ao sistema externo e esperar:** ao "Lançar no ERP", a tela consulta a cada 3 s e desiste em 3 min com mensagem clara ("O ERP ainda não respondeu. O pedido continua na fila; confira em Integração."). Nunca fica girando para sempre.

## 7. WhatsApp

| Caminho | Quando usar | Risco |
|---|---|---|
| **API oficial (Meta Cloud API)** | Padrão. Volume alto, marketing, número principal da marca | Custo por conversa; templates aprovados |
| **Evolution API** (não oficial, por QR) | Atendimento 1 a 1 com orçamento curto | **O número pode ser banido.** Exige registro em `docs/decisoes/` do sistema, com o cliente ciente, e número/chip **dedicado** |

Para os dois:

- O identificador do contato pode vir como número (`5511987654321@s.whatsapp.net`) ou como identificador oculto (`@lid`). Guarde os dois e procure o cliente pelo telefone **com e sem o 9**.
- Mensagem idempotente pelo id do WhatsApp (único no banco); status de entrega (`sent → delivered → read`) **nunca anda para trás**.
- Mídia recebida vai para bucket **privado** (ver [06](06-seguranca-lgpd.md)).
- **Robô de boas-vindas:** no máximo uma vez a cada 24 h por contato, calado se uma pessoa falou com o cliente nos últimos dias, com lista de números de teste antes de ligar para todos.
- **Mensagem de ausência** fora do horário útil: uma vez por dia por contato.
- Importar histórico do aparelho traz conversa pessoal: só com chip dedicado e definindo a data mínima.
- **IA só sugere:** classifica, resume e sugere resposta; **nunca responde sozinha ao cliente**. Sem chave de IA, o sistema cai numa leitura por regras (número do pedido, CPF, e-mail).

## 8. Converta na entrada

Todo dado de canal externo é convertido para o formato de [03-dados.md](03-dados.md) **assim que entra**: status unificado, centavos, telefone só dígitos, data em UTC.
Dentro do sistema, ninguém mais lida com o formato do ML ou da Shopee.

## 9. Log de toda chamada

Cada chamada externa registra: data e hora, `channel`, operação, `external_id`, código HTTP, tempo de resposta.
**Nunca** registre token, CPF ou telefone completo.

## 10. Nomes de variáveis de ambiente

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

## 11. Teste antes de ligar em produção

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
