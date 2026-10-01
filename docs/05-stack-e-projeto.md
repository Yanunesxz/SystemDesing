# 05 — Stack e estrutura de projeto

## Stack padrão

> Decisão completa em [decisoes/0004-stack-web-typescript.md](../decisoes/0004-stack-web-typescript.md). É a stack que os sistemas da Yan Nunes já usam.

| Camada | Padrão | Observação |
|---|---|---|
| Front | **React + Vite + TypeScript** (`strict`) | React Router para rotas |
| Estilo | **Tailwind 4** + ponte [`ui/tailwind.css`](../ui/tailwind.css) | Mais `tokens.css` e `componentes.css` no `<head>` (ver [02-visual.md](02-visual.md)) |
| Ícones | `lucide-react` | Traço 1,75 |
| Banco, login, arquivos | **Supabase** | RLS obrigatória ([06](06-seguranca-lgpd.md)); Storage privado |
| Funções no servidor | **Supabase Edge Functions** | Webhooks, chamadas com segredo |
| API própria | **Node + TypeScript + Fastify** + Zod | Só quando há integração pesada (ERP, filas) |
| Regras compartilhadas | Pacote `shared` (monorepo **pnpm**) | Preço, permissão, status e validação iguais no front e na API |
| Automação | **n8n** | Acima de ~15 nós ou com regra de negócio: vira código |
| Hospedagem | **Vercel** (front) e **Railway** (API, n8n, Evolution) | A Vercel publica só a `main` |
| Testes | **Vitest** | Toda regra pura tem teste |
| Qualidade | ESLint + Prettier + `tsc --noEmit` | Rodam no CI |
| IA | Claude API | Ver as regras de dados em [06](06-seguranca-lgpd.md) |
| Construção | Claude Code e Lovable | Os dois passam pelo mesmo PR |

Regra: **ferramenta nova só entra com registro em `decisoes/`** explicando por que a padrão não serve.

## Idioma

- **Código, banco e status:** inglês, `snake_case` no banco e `camelCase` no TypeScript (`customer_id` / `customerId`). Uma língua só: nada de `created_at` numa tabela e `criado_em` na outra.
- **Tudo que pessoa lê** (telas, mensagens, documentação, commits): português do Brasil.
- Pastas de tela podem ter nome em português (`src/modules/pedidos/`): é o que a equipe procura. Tipos, funções e campos ficam em inglês.

## Nome de repositório

Minúsculo, com hífen. Produto próprio começa com `yn-`; sistema de cliente começa com `cliente-`:

| Exemplo | O que é |
|---|---|
| `yn-crm` | Produto Yan Nunes CRM |
| `yn-sales` | Produto Yan Nunes Sales (representantes) |
| `cliente-acme-sac` | Sistema sob medida para um cliente (`cliente-nome-o-que-faz`) |
| `n8n-fluxos` | Exportação (JSON) dos fluxos do n8n |

## Estrutura de pastas (app web)

```
cliente-acme-sac/
├── CLAUDE.md               ← copiado de templates/ (importa o padrão)
├── PADRAO-YAN-NUNES.md     ← copiado do SystemDesing
├── ESTADO.md               ← onde o projeto está (templates/ESTADO.md)
├── README.md
├── .env.example            ← nomes das variáveis, SEM valores
├── vercel.json             ← templates/vercel.json (cabeçalhos de segurança)
├── .github/workflows/ci.yml
├── docs/decisoes/          ← decisões deste sistema, uma por arquivo
├── scripts/                ← tarefas de linha de comando (ensaio por padrão)
├── supabase/
│   ├── migrations/         ← AAAAMMDDHHMMSS_o_que_faz.sql (versão única)
│   └── functions/          ← Edge Functions
└── src/
    ├── main.tsx, App.tsx
    ├── index.css           ← @import "tailwindcss" + ponte do padrão
    ├── components/         ← layout/ e ui/ (peças reaproveitadas)
    ├── modules/<tela>/     ← uma pasta por tela ou módulo
    ├── data/               ← actions.ts, queries.ts, store.ts, api.ts
    ├── lib/                ← supabase.ts, dates.ts, format.ts, business-hours.ts
    └── types/              ← tipos do domínio, fonte única
```

Com API própria, vira monorepo pnpm: `apps/web`, `apps/api` e `packages/shared`.

## Camadas: a tela nunca mexe no dado direto

```
tela → actions (grava + registra na linha do tempo + avisa) → store / api → banco
tela → queries (lê e calcula) ← store / api
```

- Toda escrita passa por uma função em `data/actions.ts`. Ela grava, registra o evento na linha do tempo e mostra o aviso.
- Toda leitura que calcula (fila, prazo, situação do cliente) está em `data/queries.ts` e é **função pura**, com teste.
- Rótulo e cor de cada lista fechada (status, prioridade, canal) ficam num arquivo só (`lib/labels.ts`). A conta usa sempre o **código** (`won`, `lost`), nunca o rótulo. Trocar o nome que aparece na tela não muda nenhum número.
- Regra usada pela tela e pela API (preço, permissão, transição de status) mora no pacote `shared`: o botão some para quem a API vai negar, pela **mesma** regra.

## Modo demonstração

Todo sistema roda **sem banco**, para vender, treinar e testar:

- Sem `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, o app entra em modo demonstração: sem login, dados num store em memória.
- Abre **vazio**. Com `VITE_SAMPLE_DATA=true`, carrega dados de exemplo **inventados** (nunca dado real de cliente) com datas relativas a "agora", para o exemplo não envelhecer.
- As integrações são simuladas (ex.: botão "o celular leu o QR").
- Uma faixa visível diz "Modo demonstração" em todas as telas.
- "Recomeçar" volta ao estado inicial.
- As telas e as `actions` não sabem em que modo estão: só o `store`/`api` muda.

## App que funciona sem internet (PWA)

Para quem trabalha na rua (representante, entregador, técnico):

- `vite-plugin-pwa` em modo **`prompt`** (nunca `autoUpdate`): a versão nova só entra quando a pessoa toca em "Atualizar", sem perder o que estava fazendo.
- Fotos em cache primeiro (*CacheFirst*); dados na rede primeiro (*NetworkFirst*).
- Escrita offline vai para uma **fila** no IndexedDB (Dexie) com `local_id` (UUID gerado no aparelho), número de tentativas e último erro.
- A fila é enviada **uma por vez**; o servidor devolve o que falhou e o aparelho só apaga o que foi aceito.
- O servidor não duplica: índice único `(company_id, local_id)`.
- Outro usuário entrou no aparelho? O cache é apagado. Atualização do banco local **nunca** apaga a fila.
- Na tela: selo "Offline", faixa "Online de novo: 3 pedidos enviados" e indicação de item ainda não enviado.
- **Nunca** guardar senha no aparelho, nem em hash (ver [06](06-seguranca-lgpd.md)).

## Aviso de versão nova (todo app web)

- O build gera `/version.json` com a versão; a Vercel serve esse arquivo sem cache.
- O app confere de tempos em tempos e, quando muda, mostra a faixa "Versão nova disponível · Atualizar agora".
- Tela carregada por demanda (`lazy`) tem um limite de erro: se o arquivo da versão antiga sumiu depois de um deploy, recarrega a página.
- A versão aparece em Configurações, para o suporte saber o que a pessoa está usando.

## Banco: migrações

- Arquivo `supabase/migrations/AAAAMMDDHHMMSS_o_que_faz.sql`. **Versão única**: o CI falha se duas migrações tiverem o mesmo número.
- **Idempotente** (`create ... if not exists`, `on conflict do nothing`) e com cabeçalho: o que faz, risco, como reverter e uma consulta para conferir.
- **Compatível com o deploy:** o código novo funciona antes e depois da migração. Coluna nova é opcional até o código que depende dela subir. Se precisar, o código detecta a coluna e responde "migração pendente" em vez de quebrar.
- Migração aplicada por script ou CI, nunca colada à mão no painel sem registro.

## Scripts de linha de comando

- Ficam em `scripts/`, em Node ESM (`.mjs`), lendo segredos só do `.env` (`node --env-file=.env`).
- **Ensaio por padrão:** só gravam com `--executar`. Sem a flag, mostram o que fariam.
- **Nunca imprimem dado pessoal** (nome, telefone, CPF): imprimem códigos e contagens.
- Podem rodar de novo sem duplicar nada.
- Senha nunca vai em arquivo: é digitada na hora ou gerada e mostrada **uma vez**.

## CI e publicação

`.github/workflows/ci.yml` (modelo em [`templates/ci.yml`](../templates/ci.yml)) roda em todo PR:

1. `tsc --noEmit`, ESLint e testes;
2. build;
3. checagens do projeto (ex.: toda rota de topo tem item no menu; nenhuma migração com versão repetida).

- A `main` é protegida: entra só por PR.
- **Mudança visual global** (tema, layout, componente usado em muitas telas) só entra depois de o Yan aprovar olhando o preview.
- A Vercel publica só a `main` (`git.deploymentEnabled`), para não estourar a cota com cada branch.

## Commits e branches

- Branch: `tipo/descricao-curta` (ex.: `fix/fila-duplicada`).
- Mensagem em português, minúscula, no imperativo: `tipo(escopo): descrição`.

| Tipo | Quando |
|---|---|
| `feat` | Funcionalidade nova |
| `fix` | Correção de erro |
| `docs` | Só documentação |
| `refactor` | Mudança de código sem mudar comportamento |
| `perf` | Desempenho |
| `test` | Testes |
| `style` | Visual, sem mudar comportamento |
| `build` / `ci` | Build, dependências, CI |
| `chore` | Resto |

Ex.: `fix(pedidos): recalcular preço no servidor ao editar item`

## Contexto para a IA (todo sistema)

Sistemas são feitos com IA. Ela precisa saber, em toda sessão nova, as regras, o estado e as decisões:

| Arquivo | O que tem | Regra |
|---|---|---|
| `CLAUDE.md` | Só as regras **vigentes** do sistema + `@PADRAO-YAN-NUNES.md` | Curto. Regra que mudou é substituída, não empilhada |
| `docs/decisoes/NNNN-*.md` | Uma decisão por arquivo: data, quem pediu, contexto, decisão, consequências | Decisão substituída aponta para a nova |
| `ESTADO.md` | Onde o projeto está, o que falta, o que está quebrado | **Atualizado em todo PR**, com a data no topo |
| `PROMPT-NOVO-CHAT.md` | Texto para começar uma sessão nova | Modelo em [`templates/`](../templates/PROMPT-NOVO-CHAT.md) |

- **Para o estado do projeto, vale o código**, não o que está escrito: a IA confere `git status` e `git log` antes de confiar em qualquer documento.
- Nenhum desses arquivos leva segredo ou dado pessoal.

## Configuração e logs

- Tudo que muda entre ambientes vem de **variável de ambiente**. `.env` nunca vai para o Git; `.env.example` vai, sem valores.
- Nada com prefixo `VITE_` é secreto: vai para o navegador.
- Variável obrigatória sem valor faz o servidor **falhar ao subir**, com mensagem clara. Nada de valor padrão para credencial.
- Logs: uma linha por evento, em JSON, sem dado pessoal: `{"ts":"...","level":"info","source":"erp","op":"fetch_orders","count":42,"ms":230}`.

## Testes mínimos

Toda regra pura tem teste: preço, desconto, transição de status, fila, prazo em horário útil, telefone, documento, conversão de dado externo. São elas que, quando quebram, quebram tudo em silêncio.
