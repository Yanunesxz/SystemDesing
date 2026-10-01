# 06 — Segurança e LGPD

## Segredos (tokens, senhas, chaves de API)

1. Ficam em variável de ambiente (`.env` local, painel de segredos na hospedagem). **Nunca** no código, na planilha ou no print enviado no grupo.
2. `.env` está no `.gitignore` de todo projeto. Sempre.
3. **Vazou? Revogue na hora** no painel da plataforma (ML, Shopee, Meta, Anthropic) e gere outro. Apagar o commit não adianta: o histórico do Git guarda tudo.
4. Um token por sistema. Se um vazar, você revoga só ele.
5. Este repositório e qualquer repo público: nem custo, nem margem, nem fornecedor.

## Contas

- **Autenticação em dois fatores (2FA)** em: Mercado Livre, Shopee, Meta Business, Google, GitHub, banco, gateway de pagamento.
- Cada pessoa da equipe tem o próprio acesso. Senha compartilhada não tem dono quando dá problema.
- Saiu alguém da equipe: remover acesso no mesmo dia.

## LGPD — dados de clientes

| Regra | Na prática |
|---|---|
| Coletar só o necessário | Precisa de CPF para emitir NF. Não precisa de data de nascimento para vender camiseta. |
| Marketing só com autorização | `marketing_opt_in = true` com data e canal registrados (`marketing_opt_in_at`). Sem isso, nada de campanha no WhatsApp. |
| Cliente pode pedir para sair | Pedido de exclusão ou "pare de mandar mensagem" é atendido em até 15 dias e registrado. |
| Dado de marketplace é do pedido | Dados de comprador do ML e da Shopee servem **só** para entregar aquele pedido. Não importar para lista de marketing. |
| Log não guarda dado pessoal | Mascarar: telefone `5511*****4321`, CPF `***.456.789-**`. |
| Planilha com dado de cliente | Compartilhada só com quem precisa, nunca com "qualquer pessoa com o link". |

## Backup

- Banco de dados: backup automático diário (o Supabase faz no plano pago; no gratuito, exporte `TODO(definir)` frequência).
- Fluxos do n8n: exporte o JSON para o repositório `n8n-fluxos` a cada mudança.
