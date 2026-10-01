# 05 — Stack e estrutura de projeto

## Stack padrão

> Status: **proposta** — ver [decisoes/0002-stack-padrao.md](../decisoes/0002-stack-padrao.md). Confirme antes de começar o próximo sistema.

| Necessidade | Ferramenta padrão | Quando NÃO usar |
|---|---|---|
| Automação simples (webhook → planilha → WhatsApp) | **n8n** | Lógica com muita regra ou que precisa de teste: vira código |
| Código (integrações, scripts, IA) | **Python 3.12+** | — |
| API própria | **FastAPI** (Python) | — |
| Banco de dados | **PostgreSQL** (Supabase no começo) | — |
| Planilha | **Google Sheets** só para visualizar e para a equipe preencher | Nunca como banco de um sistema que vende |
| Telas e painéis | HTML + [`ui/tokens.css`](../ui/tokens.css) e [`ui/componentes.css`](../ui/componentes.css) | — |
| IA | **Claude API** (Anthropic) | — |
| Hospedagem | `TODO(definir)` | — |

Regra: **ferramenta nova só entra com registro em `decisoes/`** explicando por que a padrão não serve.

## Idioma

- **Código** (variáveis, funções, tabelas, campos): inglês. As APIs de ML, Shopee e Meta são em inglês; misturar idioma confunde.
- **Tudo que pessoa lê** (mensagens para cliente, documentação, commits, telas): português do Brasil.

## Nome de repositório

Minúsculo, com hífen. Produto próprio começa com `yn-`; sistema de cliente começa com `cliente-`:

| Exemplo | O que é |
|---|---|
| `yn-crm` | Produto Yan Nunes CRM |
| `yn-sales` | Produto Yan Nunes Sales (representantes) |
| `cliente-acme-producao` | Sistema sob medida para um cliente (`cliente-nome-o-que-faz`) |
| `integracao-ml-estoque` | Sincroniza estoque com o Mercado Livre |
| `n8n-fluxos` | Exportação (JSON) dos fluxos do n8n |

## Estrutura de pastas (projeto Python)

```
integracao-ml-estoque/
├── CLAUDE.md            ← copiado de templates/ (regras para a IA)
├── README.md            ← copiado de templates/
├── .env.example         ← nomes das variáveis, SEM valores
├── .gitignore
├── .editorconfig
├── pyproject.toml
├── src/
│   └── integracao_ml_estoque/
│       ├── main.py
│       ├── config.py        ← lê variáveis de ambiente
│       ├── models.py        ← entidades de docs/03-dados.md
│       ├── integrations/    ← um arquivo por canal: mercadolivre.py, shopee.py, whatsapp.py
│       └── services/        ← regras de negócio
├── tests/
└── docs/
    └── decisoes/            ← decisões específicas deste sistema
```

## Commits

Mensagem em português, com prefixo:

| Prefixo | Quando |
|---|---|
| `feat:` | Funcionalidade nova |
| `fix:` | Correção de erro |
| `docs:` | Só documentação |
| `refactor:` | Mudança de código sem mudar comportamento |
| `chore:` | Configuração, dependências |

Ex.: `fix: salvar novo refresh token do ML após renovar`

## Configuração

- Tudo que muda entre ambientes (tokens, URLs, IDs) vem de **variável de ambiente**.
- `.env` **nunca** vai para o Git; `.env.example` vai, sem valores.

## Logs

- Uma linha por evento, em JSON: `{"ts": "...", "level": "info", "channel": "mercadolivre", "op": "fetch_order", "external_id": "...", "ms": 230}`
- Níveis: `debug` (só desenvolvimento), `info` (aconteceu), `warning` (estranho mas seguiu), `error` (falhou e precisa de alguém).

## Testes mínimos

Toda função de conversão tem teste: SKU, telefone, centavos, status do canal → status unificado. São elas que, quando quebram, quebram tudo em silêncio.
