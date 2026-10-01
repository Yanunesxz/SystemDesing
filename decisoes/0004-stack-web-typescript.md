# 0004 — Stack de sistemas web em TypeScript

- **Data:** 2026-10-01
- **Status:** aceita (substitui a [0002](0002-stack-padrao.md))

## Contexto

A decisão 0002 propunha Python + FastAPI. Na análise de três sistemas reais da Yan Nunes (um CRM comercial, uma central de atendimento e um app B2B de representantes), **nenhum** usa Python. Os três foram feitos com:

- React + Vite + TypeScript no front;
- Supabase (Postgres, Auth, Storage, Edge Functions) como banco e backend;
- Vercel para o front;
- Railway para o que precisa ficar ligado (API própria, n8n, Evolution API);
- Claude Code e Lovable para escrever o código.

Um padrão que ninguém segue não é padrão. A stack oficial passa a ser a que já funciona.

## Decisão

| Camada | Padrão |
|---|---|
| Front | **React 18+ + Vite + TypeScript** em modo `strict` |
| Estilo | **Tailwind 4** com a ponte `ui/tailwind.css` + `ui/tokens.css` + `ui/componentes.css` |
| Ícones | `lucide-react` (traço 1,75) |
| Rotas | React Router |
| Banco, login e arquivos | **Supabase**: Postgres com RLS obrigatória, Auth, Storage privado, Edge Functions |
| API própria (só quando precisar) | **Node + TypeScript + Fastify**, com Zod para validar entrada |
| Regras compartilhadas | Pacote `shared` (monorepo pnpm) quando front e API usam a mesma regra |
| Automação | **n8n** (até ~15 nós; acima disso ou com regra de negócio, vira código) |
| WhatsApp | API oficial da Meta; Evolution API só com registro de risco (ver `docs/04`) |
| Hospedagem | **Vercel** (front, só a `main` publica) e **Railway** (API, n8n, Evolution) |
| Testes | **Vitest** para regra pura (preço, fila, prazo, status) e rotas |
| Qualidade | ESLint + Prettier + `tsc --noEmit` no CI |
| IA | Claude API |

Python continua permitido para script de dados ou IA isolado, com registro em `docs/decisoes/` do sistema.

## Alternativas consideradas

- **Manter Python + FastAPI:** ninguém usa; obrigaria a reescrever tudo ou a viver em desacordo com o padrão.
- **Next.js:** bom, mas os sistemas são painéis internos atrás de login; o Vite é mais simples e é o que o Lovable gera.
- **Backend só em Supabase, sem API própria:** é o caminho padrão. A API própria entra quando há integração pesada (ERP, filas) ou regra que não cabe em RLS + Edge Function.

## Consequências

- `docs/05-stack-e-projeto.md` e o documento das IAs passam a descrever essa stack.
- Os sistemas existentes **não precisam mudar**: eles já estão nela. O que muda é o que eles precisam corrigir para seguir o resto do padrão (tokens, RLS, nomes de campos), quando forem mexidos.
- A ponte do Tailwind 4 elimina a paleta crua do Tailwind, que hoje é a maior fonte de divergência visual.
