# 03 — Dados

O documento mais importante do repositório. Se cada sistema guardar dado de um jeito, nada conversa com nada: o relatório não fecha, a integração quebra e a IA se perde.

Vale para **todo** sistema: CRM, vendas, produção, loja. Regras específicas de cada tipo de negócio ficam em [dominios/](dominios/).

## Formatos obrigatórios

| Dado | Formato | Exemplo | Por quê |
|---|---|---|---|
| Dinheiro | Inteiro em **centavos** (`bigint`), campo terminando em `_cents` | `12990` = R$ 129,90 | Número decimal (float) erra conta: `0.1 + 0.2 = 0.30000000000000004` |
| Data e hora | `timestamptz`, ISO 8601 com fuso; exibir **sempre** com `timeZone: "America/Sao_Paulo"` explícito | `2026-10-01T14:30:00Z` | Sem `timeZone`, a tela usa o fuso do computador da pessoa |
| Só data | `date`, `AAAA-MM-DD`; ler como data **local** (nunca `new Date("2026-10-01")`, que vira 21h do dia anterior) | `2026-10-01` | Ordena certo e não "volta um dia" |
| Mês de referência | `date` com dia 1 | `2026-10-01` | Competência, meta do mês |
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
- Toda tabela tem `id` (uuid), `created_at` e `updated_at` (atualizado por gatilho no banco).
- Responsável, dono, vendedor: sempre **chave estrangeira** (`owner_id`), nunca o nome em texto.
- Sistema com mais de uma empresa no mesmo banco: `company_id` em **toda** tabela.

## Dinheiro na prática

- Banco: `bigint` em centavos (`total_cents`). Sistema antigo com `numeric(12,2)` pode continuar, mas **nenhuma conta em ponto flutuante no TypeScript**: converta para centavos, calcule, formate só na tela.
- Preço, desconto e total são **sempre recalculados no servidor**. O valor que vem do navegador é ignorado.
- Desconto guardado como um número só (percentual com casas suficientes, ou valor em centavos), nunca os dois brigando.
- `null` é "sem valor"; `0` é zero de verdade. Nunca use `0` para dizer "não informado".

## Código legível

Registro que as pessoas citam ao telefone ganha um **código humano**, além do uuid:

- Formato `PREFIXO-0001` (ex.: `CUS-0042`, `ORD-1205`, `TCK-0315`), gerado por **sequência no banco** com gatilho. Nunca pelo navegador.
- Nunca muda depois de criado.
- O uuid continua sendo a chave de verdade; o código é para gente.

## Histórico e auditoria

| O quê | Como |
|---|---|
| Mudança de status | Tabela `<entidade>_status_history` preenchida por **gatilho** (de, para, quem, quando) |
| Edição de cadastro | Tabela de mudanças com `{campo: {antes, depois}}`, quem e quando |
| Exclusão | Cópia em `jsonb` (`deleted_<entidade>`) antes de apagar, com quem e por quê |
| Coluna que só o servidor grava | Protegida por gatilho (ex.: papel do usuário, status de entrega) |
| Eventos do processo | Linha do tempo da entidade: cada `action` registra um evento |

## Edição ao mesmo tempo

**Trava otimista:** a gravação manda o `updated_at` que a tela leu (`update ... where id = ? and updated_at = ?`). Se outra pessoa gravou antes, nada é sobrescrito: a tela avisa "Outra pessoa alterou este registro" e recarrega.

## Status

Todo processo com etapas (pedido, oportunidade do CRM, ordem de produção, chamado) segue a mesma regra:

1. Lista fechada de status, em inglês `snake_case`, registrada no domínio do sistema.
2. Cada status tem um **rótulo em português** para a tela e **uma cor fixa** (ver [02-visual.md](02-visual.md)).
3. Dado vindo de fora (marketplace, ERP) é convertido para essa lista assim que entra.

Exemplo completo: status de pedido em [dominios/ecommerce.md](dominios/ecommerce.md#status-de-pedido-unificado).

## Status: duas leituras e carimbos

- **Status interno × status para o cliente:** o escritório vê todas as etapas (`pending_approval`, `sent_erp`...); o cliente e o representante veem uma versão simples (`sent`, `approved`, `delivered`, `rejected`). As duas listas ficam no domínio, com o mapeamento.
- **Fato não é status:** faturado, entregue e pago são **carimbos** (`invoiced_at`, `delivered_at`, `paid_at`), independentes do status. Assim dá para desfazer um faturamento sem reescrever o histórico.
- **Recusado não é cancelado:** cada desfecho tem o próprio código (`rejected` ≠ `cancelled` ≠ `lost`).
- Encerrar com desfecho negativo (perder, cancelar, inativar) exige **motivo de lista fechada**. "Outro" exige nota.

## Nunca inventar dado

- O que falta aparece como **"A cadastrar"** ou **"A confirmar"** na tela, nunca como zero ou valor de exemplo.
- Métrica sem base devolve `null` e a tela mostra "Sem dados", nunca `0`, `NaN` ou `100%`.
- **Falha ≠ vazio ≠ sem dado:** "não consegui carregar" (erro, com "Tentar de novo"), "não tem nada" (estado vazio, com o próximo passo) e "não dá para calcular" (sem dados) são três telas diferentes.

## Horário útil e prazos

- Um **único** módulo (`lib/business-hours.ts`) calcula horário útil para tudo: prazo, fila, métrica e o selo "aberto/fechado" do topo. Nunca repetir a regra no banco, no n8n e na tela.
- Fuso sempre `America/Sao_Paulo` explícito, nunca o do navegador.
- Feriados numa tabela (`holidays`), não fixos no código.
- Prazo em **horas úteis** (SLA interno) é diferente de prazo em **dias corridos** (lei, regulatório). Cada prazo diz qual é.

## Listas grandes

- O Supabase (PostgREST) devolve **no máximo 1.000 linhas** e corta o resto **sem avisar**. Toda consulta que pode passar disso pagina, e integração que precisa de tudo **falha alto** se não conseguir trazer tudo.
- Filtro, busca e recorte por usuário são feitos **no banco**, nunca baixando a tabela inteira para filtrar no navegador.

## Duas fontes para o mesmo dado

Quando o mesmo dado vem de dois lugares (ex.: última compra no CRM e no ERP): nenhuma fonte sobrescreve a outra; cada uma fica no seu campo com a origem, e a tela usa a mais recente. O dono de cada dado está definido em [04-integracoes.md](04-integracoes.md).

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
| `code` | texto | código legível (`CUS-0042`) |
| `owner_id` | uuid | responsável (vendedor, representante) |
| `created_at`, `updated_at` | data e hora | |

- Documento validado com dígito verificador (CPF e CNPJ) numa função compartilhada.
- Endereço: CEP busca rua e cidade (ViaCEP) com tempo limite, **sem apagar o que a pessoa já digitou**.
- Um contato (pessoa, telefone, e-mail) pertence a **um** cliente. Achou repetido? Junta, não duplica.
- Juntar ou excluir cliente mostra antes o impacto em números (pedidos, conversas) e para onde vão os vínculos.
