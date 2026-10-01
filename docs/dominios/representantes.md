# Domínio: representantes e pedidos B2B

Para sistemas de **força de vendas**: representante (ou vendedor interno) monta pedido para lojas, o escritório aprova e o ERP fatura. Também cobre a loja que compra sozinha por login próprio ou por link de vitrine.

O núcleo (formatos de dado, integrações, segurança, visual) continua valendo; este arquivo acrescenta o que é específico de pedido B2B.

> **O sistema não substitui o ERP.** Estoque, faturamento e nota fiscal continuam no ERP. O sistema cuida de catálogo, pedido, carteira e acompanhamento, e conversa com o ERP pelo contrato de [04-integracoes.md](../04-integracoes.md#6-integração-com-erp).

## Papéis

| Código | Quem | Vê e faz |
|---|---|---|
| `rep` | Representante | Os próprios clientes e pedidos; monta pedido; faz triagem do que a loja mandou |
| `inside_sales` | Vendedor interno | Como o representante, para a carteira interna |
| `manager` | Gerente comercial | A equipe toda; aprova; vê painel |
| `finance` | Financeiro | Aprovação financeira, condições de pagamento |
| `admin` | Administrador | Usuários, tabelas, integrações |
| `store` | Loja logada | Os próprios pedidos; repetir pedido |
| `guest` | Visitante de vitrine | Só o catálogo do link, por tempo limitado |

- Permissões finas por usuário (aprovar, faturar, importar) além do padrão do papel: `null` = padrão do papel; lista = personalizado.
- A regra de permissão está no pacote `shared`: a tela esconde e a API nega **pela mesma função**. E o banco também restringe por RLS ([06](../06-seguranca-lgpd.md)).

## Entidades

| Entidade | Campos principais |
|---|---|
| `products` | `code` (SKU), nome, categoria, fotos, `is_active` |
| `product_variants` | produto, cor, tamanho, `code`, `is_active` |
| `price_tables` | nome, `is_active`, `external_id` (ERP) |
| `product_prices` | tabela, produto/variação, `price_cents`, faixa (ex.: tamanho maior) |
| `customers` | ver [03-dados.md](../03-dados.md#cliente) + `price_table_id`, `owner_id` (representante), `is_blocked` |
| `rep_price_tables` | quais tabelas cada representante pode usar |
| `payment_conditions` | prazo, `min_order_cents` |
| `orders` | `code`, cliente, `owner_id`, `price_table_id` (**a tabela que precificou fica gravada**), status, totais em centavos, desconto, `local_id` (offline), `external_id` (ERP) |
| `order_items` | produto/variação, quantidade, `unit_price_cents` (de tabela) |
| `order_status_history` | de, para, quem, quando (por gatilho) |
| `order_invoices` | nota do ERP: número, data, itens faturados |
| `share_links` | vitrine ou convite: hash do token, validade, uso único |

## Status do pedido

| Código | Rótulo | Quem age |
|---|---|---|
| `draft` | Rascunho | Representante |
| `pending_rep` | Aguardando representante | Representante (triagem do pedido que a loja mandou) |
| `pending_approval` | Aguardando aprovação | Gerente / financeiro |
| `approved` | Aprovado | Escritório (enviar ao ERP) |
| `sent_erp` | No ERP | ERP |
| `error_erp` | Erro no ERP | Escritório |
| `rejected` | Recusado | — (motivo obrigatório) |
| `cancelled` | Cancelado | — (motivo obrigatório) |

- As transições permitidas ficam numa tabela no `shared` (`ORDER_STATUS_FLOW`). Nada pula etapa fora dela.
- **Faturado e entregue são carimbos**, não status: `invoiced_at`, `invoiced_total_cents`, `delivered_at`.
- **Status para quem comprou:** a loja e o representante veem uma versão simples: `sent` (Enviado) → `approved` (Aprovado) → `delivered` (Entregue), e `rejected` (Recusado) como desvio.
- Pedido faturado não pode ser cancelado no sistema: cancela-se no ERP.

## Preço

- Cada cliente tem **uma tabela de preço**; cada representante tem o conjunto de tabelas que pode usar.
- A tabela que precificou o pedido **fica gravada no pedido**. Mudar a tabela do cliente depois não muda pedido antigo.
- Tabela desativada no ERP some das escolhas, mas quem já está nela continua até alguém trocar.
- **O servidor sempre recalcula o preço** e ignora o preço que veio do navegador.
- Desconto: a tela aceita % ou R$; o servidor guarda **um número só** (percentual com casas suficientes). Itens ficam com preço de tabela; o total sai com o desconto.
- **Pedido mínimo avisa, não bloqueia.** Cliente bloqueado mostra selo, não trava. É decisão do negócio de cada cliente: registre em `docs/decisoes/` do sistema.

## Pedido por grade

Para confecção e produtos com variação:

- O pedido é montado por **cor → quantidade por tamanho**, com total ao vivo.
- Variação esgotada aparece **tracejada**, não some.
- Faixa de preço por tamanho (tamanho maior custa mais) é avisada na hora.
- **Original × faturado:** depois do faturamento, a tela mostra a diferença peça por peça entre o que foi pedido e o que o ERP faturou.

## Carteira

- **Situação do cliente calculada**, não digitada, a partir da última compra: `active`, `cooling` (esfriando), `cold` (esfriado), com **uma régua só**, configurável pelo admin (dias sem comprar).
- Cliente marcado como inativo exige motivo de lista fechada; "outro" exige nota.
- Cliente só de varejo ou inativo sai da régua.

## Metas e bônus

- Meta por representante por mês (`period` = data com dia 1).
- Bônus por **faixas**: vale só a faixa mais alta atingida. Conta só pedido enviado ao ERP.
- Na tela: régua com as faixas, posição atual, "garantido" e "falta R$ X para a próxima".

## Offline

Representante trabalha na rua: o app segue a regra de PWA de [05-stack-e-projeto.md](../05-stack-e-projeto.md#app-que-funciona-sem-internet-pwa) (fila com `local_id`, envio um por vez, atualização em momento seguro).

## Links e vitrine

- **Vitrine temporária:** link com o catálogo e a tabela do cliente, validade de 1 a 24 h, para mandar no WhatsApp. O pedido que a loja faz por ela entra como `pending_rep`.
- **Convite:** link de uso único para a loja criar o próprio login.
- Token guardado só como hash; copiar e "enviar no WhatsApp" na própria tela.

## Telas típicas

Catálogo (card de produto, busca, filtro por categoria, botão flutuante do carrinho) · Novo pedido (grade, desconto, condição, resumo) · Pedidos (lista com filtros e seleção em lote) · Triagem do representante (card com Aprovar/Recusar) · Clientes e ficha · Painel do gerente (indicadores, ranking, metas) · Integração (saúde do ERP) · Minha área (versão do app, instalar, avisos no celular).

**Componentes do padrão:** menu no celular em **abas embaixo** (`.yn-shell--tabs`), `.yn-catalog` + `.yn-product`, `.yn-qty`, `.yn-grade`, `.yn-fab` (carrinho), `.yn-banner` "sem internet", `.yn-decision` (triagem com motivo), `.yn-ranking` e `.yn-meter` (metas). Tela de exemplo: [`ui/exemplos/menu-abas.html`](../../ui/exemplos/menu-abas.html).
