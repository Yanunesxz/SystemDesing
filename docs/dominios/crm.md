# Domínio: CRM comercial

Para sistemas de **gestão comercial**: carteira de clientes, funis de venda, atividades, tarefas, atendimento pós-venda e pré-venda (SDR).

O núcleo (formatos de dado, integrações, segurança, visual) continua valendo; este arquivo acrescenta o que é específico de CRM.

## Papéis e recortes

| Código | Quem | Recorte |
|---|---|---|
| `manager` | Gestor | Tudo; configura funis, usuários, permissões |
| `supervisor` | Supervisor | A equipe dele |
| `inside_sales` | Vendedor interno | Os próprios negócios (ou a equipe, com permissão) |
| `rep` | Representante | **Sempre** só os próprios clientes e negócios |
| `sdr` | Pré-venda | A fila de leads |

- **Catálogo de permissões por módulo** (ver clientes, editar clientes, ver equipe, configurar funil...), com o **padrão do papel** e a opção de lista **personalizada** por usuário. Menu e rotas usam a mesma fonte.
- Os recortes ("só os meus", funis visíveis, número de WhatsApp de cada um) são aplicados **no banco por RLS**, não só na tela ([06](../06-seguranca-lgpd.md)).
- Quando a pessoa vê só parte dos dados, a tela diz isso numa faixa ("Você está vendo só os seus clientes").

## Entidades

| Entidade | Campos principais |
|---|---|
| `customers` | ver [03-dados.md](../03-dados.md#cliente) + segmento, rede, endereços, campos personalizados |
| `contacts` | pessoa de contato: nome, cargo, telefones, e-mails. **Um contato pertence a um cliente só** |
| `pipelines` | nome, área (`sales` ou `support`), etapas (ordem, `is_archived`), checklist por etapa |
| `deals` | `code`, título, `value_cents`, pipeline, etapa, `outcome`, origem, `owner_id`, motivo de perda, `closed_at`, pedido vinculado |
| `activities` | tipo (`call`, `whatsapp`, `email`, `meeting`, `note`), cliente/negócio, quem, quando, resultado |
| `tasks` | tipo, título, `due_on`, `owner_id`, `requested_by`, `done_at` |
| `tickets` | atendimento pós-venda: `code`, prioridade, pipeline de suporte |
| `leads` | pré-venda: origem, status, tentativas, passagem para vendedor |
| `custom_fields` | dicionário global (texto, número, data, lista, sim/não, moeda) e quais são obrigatórios em cada pipeline |
| `marketing_events` | formulário, landing page, anúncio, indicação, feira, com UTMs |

## Funil (kanban)

- Cada negócio está numa **etapa** (coluna) e tem um **desfecho** (`outcome`): `open`, `won`, `lost`. O rótulo do desfecho é configurável por pipeline (venda: Aberto/Ganho/Perdido; suporte: Em aberto/Resolvido/Cancelado).
- **Encerrar não tira o card da etapa.** Ganhos e perdidos ficam em raias próprias, mas guardam a etapa onde fecharam: assim dá para medir **perda por etapa**.
- **Perder exige motivo** de lista fechada; dá para trocar o motivo sem reabrir. **Reabrir exige escolher a etapa.**
- Toda conta usa o código (`won`, `lost`), **nunca o rótulo**: renomear não muda relatório.
- Negócio parado **esfria**: selo "esfriando" e "frio" pelo tempo desde a última atividade, com limites configuráveis.
- Negócio aberto **sem próxima atividade marcada** = em risco.
- Pipeline só é excluído vazio; o pipeline padrão não é excluído; etapa com card encerrado é **arquivada**, não apagada.

**Motivos de perda (base, cada sistema ajusta):** `price`, `timing`, `has_supplier`, `no_response`, `no_contact`, `no_fit`, `financial_issue`, `territory_conflict`, `other`.

## Cadência sem contato

Tentativa de contato sem resposta segue uma cadência fixa: 1ª tentativa → 2ª tentativa → perda com motivo `no_contact`. Cada tentativa registra canal e data. A pessoa não decide no achismo quando desistir.

## Situação do cliente

Calculada (não digitada) a partir da última compra, com **uma régua só**, configurável:

| Código | Rótulo |
|---|---|
| `lead` | Lead (nunca comprou) |
| `active` | Ativo |
| `inactive_recent` | Inativo recente |
| `inactive_old` | Inativo antigo |
| `lost` | Perdido (manual, com motivo) |
| — | "Sem dados" quando não há base para calcular |

- Última compra vinda de duas fontes (CRM e ERP): nenhuma sobrescreve a outra; vale a mais recente.
- Nunca ter duas réguas diferentes (ex.: uma no painel e outra no termômetro do representante).

## Pré-venda (SDR)

- Status do lead: `qualifying`, `pending`, `qualified`, `not_qualified`, `opt_out`.
- Passagem para o vendedor com **protocolo**: checklist do que foi levantado, para o vendedor não perguntar de novo.
- `opt_out` é respeitado em toda campanha ([06](../06-seguranca-lgpd.md)).

## Tarefas

- Grupos: **Atrasadas**, **Hoje**, **Próximas**, **Concluídas**. Datas relativas: "Hoje", "Amanhã", "Ontem".
- Delegação: quem pediu (`requested_by`) e quem faz (`owner_id`).

## Automação

Regras no formato **QUANDO** (evento) → **SE** (condição) → **ENTÃO** (ação), guardadas no banco, com registro de cada execução. Campanha só envia para quem tem `marketing_opt_in`.

## Telas típicas

Dashboard (indicadores que levam à tela que trabalha o número) · Meu dia (quem chamar hoje) · Clientes e **ficha 360º** (dados à esquerda, o que importa hoje à direita, linha do tempo unificada) · Funis (abas por funil, kanban, construtor de filtros com conjuntos salvos) · Página do negócio (linha do tempo, próxima atividade, protocolo) · Tarefas · Tickets · Mensagens (caixa de entrada) · Usuários e permissões · Configurações (pipelines, campos personalizados).

**Componentes do padrão:** menu no celular em **gaveta**, `.yn-kanban` (colunas `data-lane="won"`/`"lost"`; card se move pelas setas), `.yn-split` (ficha 360º), `.yn-next` (próxima atividade), `.yn-timeline`, `.yn-chips` (filtros rápidos), `.yn-segmented` (lista ou quadro), `.yn-deadline` (sem contato há X dias). Tela de exemplo: [`ui/exemplos/menu-gaveta.html`](../../ui/exemplos/menu-gaveta.html).
