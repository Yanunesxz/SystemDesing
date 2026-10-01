# SystemDesing — o padrão de todos os meus sistemas

Fonte única da verdade para **tudo** que eu construir ou configurar: loja virtual, painéis, automações (n8n), bots de WhatsApp, integrações com Mercado Livre e Shopee, planilhas e prompts de IA.

> **Regra de ouro:** se não está aqui, não é padrão. Se é padrão, está aqui.

Este repositório junta duas coisas que costumam ser confundidas:

- **Design System** (identidade): cores, fontes, tom de voz, mensagens, fotos de produto.
- **System Design** (engenharia): formato dos dados, SKU, status de pedido, como integrar APIs, segurança.

Os dois servem ao mesmo objetivo: qualquer sistema novo nasce igual aos outros, sem reinventar nada.

## O que tem aqui

| Arquivo / pasta | Para que serve | Quem consome |
|---|---|---|
| [docs/01-marca-e-voz.md](docs/01-marca-e-voz.md) | Tom de voz, mensagens padrão de atendimento, títulos de anúncio | Bots, IA, equipe |
| [docs/02-visual.md](docs/02-visual.md) + [tokens/](tokens/) | Cores, fontes, espaçamentos (design tokens) e fotos de produto | Loja, painéis, landing pages |
| [docs/03-dados.md](docs/03-dados.md) | SKU, formatos (dinheiro, telefone, data), entidades e status de pedido unificado | Toda planilha, banco e integração |
| [docs/04-integracoes.md](docs/04-integracoes.md) | Webhooks, retry, tokens OAuth, fonte da verdade do estoque | Todo código de integração |
| [docs/05-stack-e-projeto.md](docs/05-stack-e-projeto.md) | Stack padrão, estrutura de pastas, nomes, logs | Todo repositório novo |
| [docs/06-seguranca-lgpd.md](docs/06-seguranca-lgpd.md) | Segredos, dados de cliente, LGPD | Tudo |
| [templates/](templates/) | Arquivos para copiar ao criar um sistema novo | Repositórios novos |
| [decisoes/](decisoes/) | Registro de decisões (o que foi decidido e por quê) | Eu daqui a 6 meses |
| [checklists/novo-sistema.md](checklists/novo-sistema.md) | Passo a passo para começar um sistema já no padrão | Eu |

## Como um sistema "segue" este padrão

Documento que ninguém lê não é padrão, é enfeite. Por isso existem três mecanismos concretos:

1. **A IA lê as regras.** Copie [`templates/CLAUDE.md`](templates/CLAUDE.md) para a raiz de cada sistema. Claude Code (e outras IAs de código, renomeando para `AGENTS.md`) passam a seguir o padrão sem você repetir nada.
2. **O visual é importado, não copiado.** O CSS de tokens é carregado direto deste repositório, com versão fixa:

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/tokens/tokens.css">
   ```

   Mudou a cor da marca? Altera aqui, cria uma versão nova e cada sistema troca o `@v...` quando estiver pronto.
3. **Cada sistema declara a versão que segue.** No README de todo sistema: `Padrão: SystemDesing v0.1.0`.

## Versionamento

Segue [SemVer](https://semver.org/lang/pt-BR/):

- **PATCH** (`0.1.1`): correção de texto, exemplo novo, ajuste que não muda regra.
- **MINOR** (`0.2.0`): regra nova que não obriga ninguém a mudar nada.
- **MAJOR** (`1.0.0`): mudança que obriga a alterar sistemas existentes (ex.: novo formato de SKU).

Toda mudança entra no [CHANGELOG.md](CHANGELOG.md). Mudança de regra importante gera um registro em [decisoes/](decisoes/).
Para publicar uma versão: crie a tag no GitHub (`v0.1.0`) — é ela que o link do jsDelivr usa.

## ⚠️ Este repositório é público

Ele precisa ser público para o link do jsDelivr funcionar. Então **nunca** coloque aqui: tokens, senhas, preço de custo, margem, fornecedores, dados de clientes ou qualquer número do negócio. Isso vai em repositório privado.

## Status

`v0.1.0` — primeira versão. Tudo marcado com **`TODO(definir)`** ainda precisa de uma decisão antes de virar regra.
