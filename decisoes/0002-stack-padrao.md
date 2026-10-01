# 0002 — Stack padrão

- **Data:** 2026-10-01
- **Status:** proposta

## Contexto

Operação de e-commerce com um dono que está aprendendo programação e automação. Precisa de ferramentas que:

- resolvam rápido o que é simples (webhook → planilha → mensagem);
- permitam evoluir para código quando a regra fica complexa;
- tenham muito material em português e boa integração com IA.

## Decisão

| Camada | Escolha |
|---|---|
| Automação simples | n8n |
| Código | Python 3.12+ |
| API própria | FastAPI |
| Banco | PostgreSQL (Supabase no início) |
| Planilha | Google Sheets apenas para visualização e entrada manual da equipe |
| IA | Claude API |
| Hospedagem | `TODO(definir)` |

Regra de passagem: **automação no n8n que passou de ~15 nós, tem regra de negócio importante (preço, estoque, cobrança) ou já quebrou duas vezes vira código Python com teste.**

## Alternativas consideradas

- **Make / Zapier:** mais simples no início, mas o custo por operação cresce com o volume de pedidos e o n8n pode ser auto-hospedado.
- **Node.js / TypeScript:** ótimo para web, mas Python tem a curva de aprendizado mais suave para scripts, dados e IA.
- **Planilha como banco:** quebra com volume, não tem integridade e duas pessoas editando ao mesmo tempo corrompem dado.

## Consequências

- Todo sistema novo começa com essa stack, salvo registro em `decisoes/` justificando outra.
- Vale estudar Python + SQL básico antes de qualquer outra linguagem.
