# Domínio: atendimento (SAC)

Para centrais de **atendimento ao cliente** (SAC, pós-venda, suporte), principalmente por WhatsApp, com outros canais em volta.

O núcleo (formatos de dado, integrações, segurança, visual) continua valendo; este arquivo acrescenta o que é específico de atendimento.

## A ideia central: o caso

O atendimento não trabalha com ticket solto: trabalha com **jornada**. O centro é o **caso** (`case`), que junta num lugar só pedido, conversa, logística, evidências, prazos e ações.

| Entidade | O que é |
|---|---|
| `cases` | O problema do cliente. `code` humano (`SAC-0001`, gerado por sequência no banco), título, cliente, canal, categoria, pipeline e etapa, prioridade com motivo, **com quem está a vez**, responsável, pedido vinculado |
| `case_deadlines` | Prazos do caso, cada um com tipo, vencimento, `met_at` (cumprido) ou `closed_at` (fechado sem contar) |
| `external_tickets` | Chamado aberto **fora** (transportadora, operador logístico, fornecedor): número, SLA, cobranças feitas, retorno |
| `case_events` | Linha do tempo: o que aconteceu, quem fez, e o **lado** (`customer`, `internal`, `partner`) |
| `case_solutions` | Soluções propostas (reenvio, reembolso, troca), com aprovação: `pending`, `approved`, `denied` |
| `case_reminders` | Promessas e lembretes: prometido ao cliente, cobrar parceiro, atualizar cliente |
| `conversations` | Conversa com o cliente num canal: dono (`owner_id`), não lidas, fixada |
| `messages` | Mensagem: autor (`customer`, `agent`, `system` = nota interna), status de entrega, anexo, `edited_at`, `deleted_at`, `is_automatic` |
| `categories` | **Macro → micro**: a macro é fixa, a micro é editável (com pipeline e prioridade sugeridos) |
| `reply_templates` | Respostas prontas por canal e tom, com `{{variaveis}}` e quem editou por último |
| `incidents` | Problema que afeta muitos clientes (ex.: atraso geral da transportadora) |

## Listas fechadas

| Lista | Códigos |
|---|---|
| Prioridade | `low`, `normal`, `high`, `critical` |
| Grupo na fila | `urgent`, `priority`, `in_order` |
| Canal | `whatsapp`, `email`, `instagram`, `facebook`, `tiktok`, `complaint_site` (privados × públicos) |
| Entrega da mensagem | `sending`, `sent`, `delivered`, `read`, `failed` |
| Pipeline base | `new` → `in_progress` → `waiting_customer` → `waiting_area` → `resolved` |
| Com quem está a vez | `support`, `customer`, `partner`, `finance`, `quality`, `management` |
| Chamado externo | `open`, `answered`, `closed` |

Encerrar o caso exige **motivo de lista fechada**. Encerrar fecha os prazos abertos; reabrir mantém o histórico.

## Regra da fila

A fila é **transparente**: cada conversa mostra **por que** está naquela posição.

1. Urgentes furam a fila.
2. Dentro do grupo, vale a **primeira** mensagem sem resposta. Mandar mensagem de novo não muda o lugar.
3. Nota interna, mensagem automática e envio com erro **não** contam como resposta.
4. A conversa sobe de grupo depois de um tempo sem resposta, em horas úteis, configurável (um limite para o primeiro contato, outro para quem já está em atendimento).
5. A IA só pode **subir** a prioridade, nunca descer.
6. Uma fila por pessoa + a **Entrada** (conversa sem dono). O cliente volta para a mesma pessoa.
7. "Distribuir" manda para quem está online com menos gente esperando. Também: "Passar para…", "Assumir", "Marcar como atendida".
8. "Como funciona a fila" fica visível na própria tela.

## Prazos

- Prazo em **horas úteis** (SLA interno, primeira resposta) e em **dias corridos** (lei, regulatório) são diferentes; cada prazo diz qual é. Cálculo único em `lib/business-hours.ts` ([03-dados.md](../03-dados.md#horário-útil-e-prazos)).
- Estados do selo de prazo: no prazo, **vencendo** (perto do fim), **vencido**, cumprido, encerrado.
- Prazo do Código de Defesa do Consumidor (arrependimento, defeito) é lei pública: **confira na legislação vigente** antes de codificar.

## Automação assistida

O sistema **sugere**, a pessoa decide:

- **Próximo passo com o porquê:** o caso mostra a próxima ação sugerida e o motivo, com o checklist da etapa.
- Reembolso, exceção e promessa de data são **decisão humana**, nunca automáticas.
- Decisão da coordenação fica registrada (quem, quando, por quê) e visível para todos.
- **Trava de duplicidade:** não deixa pedir reenvio ou reembolso duas vezes para o mesmo pedido.
- Personalizar o caso (mudar prioridade, categoria) exige motivo e grava antes → depois na linha do tempo.

## Passagem de turno

Cada caso tem um resumo em três partes: **problema**, **feito**, **pendente**. Quem assume lê isso, não a conversa inteira.

## Fluxos base (pipelines)

Atraso na entrega · Entregue e não recebido (prova de entrega → acareação → reenvio ou reembolso) · Avaria (evidências → ressarcimento do parceiro → solução ao cliente) · Devolução · Cancelamento e estorno · Arrependimento · Reputação (classificar → levar ao privado → responder em público) · Lead comercial que chegou pelo SAC.

## Produtos regulados (cosméticos, saúde, alimentos)

Reclamação sobre o efeito do produto não é só atendimento, é **vigilância**:

- Classificação preliminar: **queixa técnica**, **evento adverso**, **evento adverso grave** ou misto. **Na dúvida, sobe** para o mais grave.
- Grave aciona a coordenação na hora e cria prazo regulatório em **dias corridos**, contado do relato.
- Nenhuma compensação antes do parecer técnico. Sair da classificação grave exige justificativa.
- Foto ou relato de reação é **dado de saúde** (sensível): bucket privado, acesso restrito ([06](../06-seguranca-lgpd.md)).
- A norma muda: **confira a regra vigente do órgão regulador** (ex.: Anvisa) antes de codificar prazos e classificações.

## Métricas

Tempo até a primeira resposta (em horas úteis), espera em faixas, volume por hora, por pessoa e por canal, casos vencidos. Métrica sem base mostra "Sem dados", nunca zero ([03](../03-dados.md#nunca-inventar-dado)). Gráfico sempre com "ver como tabela".

## Telas típicas

Minha fila (indicadores, comigo agora, lembretes) · **Mensagens** (três painéis: lista de conversas, conversa, painel do caso) · Casos (lista com filtros) · **Caso 360º** (operação à esquerda, prazos e lembretes à direita, linha do tempo) · Pipelines (kanban) · Supervisão (exceções para aprovar, vencidos, filas de cada pessoa) · Base de conhecimento (respostas prontas com Copiar) · Categorias · Relatórios · Conexão do WhatsApp (QR) · Equipe.
