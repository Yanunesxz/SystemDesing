# SystemDesing — o padrão Yan Nunes

**YAN NUNES — Sistemas & Consultoria.** Este repositório é a fonte única da verdade para tudo que a Yan Nunes cria: produtos próprios (CRM, Sales, Production), sistemas sob medida para clientes, automações, integrações, site e conteúdo.

> **Regra de ouro:** se não está aqui, não é padrão. Se é padrão, está aqui.

Ele junta duas coisas que costumam ser confundidas:

- **Design System** (identidade): marca, fonte, cores, componentes de tela, voz.
- **System Design** (engenharia): formato dos dados, integrações, stack, segurança.

O objetivo: qualquer sistema novo, feito por você ou por outro desenvolvedor da equipe, nasce com a mesma cara e a mesma qualidade, sem reinventar nada.

## O que tem aqui

| Arquivo / pasta | Para que serve |
|---|---|
| [docs/01-marca.md](docs/01-marca.md) | Posicionamento, atributos, produtos, regras do símbolo, crédito "Criado por", voz |
| [docs/02-visual.md](docs/02-visual.md) + [ui/](ui/) | Manrope, paleta, tema do cliente, componentes de painel |
| [docs/03-dados.md](docs/03-dados.md) | Formatos obrigatórios, nomes de campos, status, cliente |
| [docs/04-integracoes.md](docs/04-integracoes.md) | Dono de cada dado, webhooks, retry, tokens OAuth, logs |
| [docs/05-stack-e-projeto.md](docs/05-stack-e-projeto.md) | Stack, nomes de repositório, pastas, commits |
| [docs/06-seguranca-lgpd.md](docs/06-seguranca-lgpd.md) | Segredos, contas, LGPD, backup |
| [docs/dominios/](docs/dominios/) | Regras de um tipo de negócio. Hoje: [e-commerce](docs/dominios/ecommerce.md) |
| [templates/](templates/) | Arquivos para copiar ao criar um sistema |
| [decisoes/](decisoes/) | Registro de decisões: o que foi decidido e por quê |
| [checklists/novo-sistema.md](checklists/novo-sistema.md) | Passo a passo para começar um sistema já no padrão |

**Ver o visual funcionando:** abra [`ui/preview.html`](ui/preview.html) no navegador. É um painel de exemplo com o gerador de tema do cliente.

## Como um sistema "segue" este padrão

Documento que ninguém lê não é padrão, é enfeite. Por isso existem três mecanismos concretos:

1. **A IA lê as regras.** Copie [`templates/CLAUDE.md`](templates/CLAUDE.md) para a raiz de cada sistema. O Claude Code (e outras IAs de código, renomeando para `AGENTS.md`) segue o padrão sem você repetir nada. Vale também para dev novo: é a primeira coisa que ele lê.
2. **O visual é importado, não copiado.** Os CSS vêm direto deste repositório, com versão fixa:

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/tokens.css">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.1.0/ui/componentes.css">
   ```

   Mudou algo aqui? Cria uma versão nova e cada sistema troca o `@v...` quando estiver pronto.
3. **Cada sistema declara a versão que segue.** No README de todo sistema: `Padrão: SystemDesing v0.1.0`.

## Versionamento

Segue [SemVer](https://semver.org/lang/pt-BR/):

- **PATCH** (`0.1.1`): correção de texto, exemplo novo, ajuste que não muda regra.
- **MINOR** (`0.2.0`): regra ou componente novo que não obriga ninguém a mudar nada.
- **MAJOR** (`1.0.0`): mudança que obriga a alterar sistemas existentes (ex.: renomear um token).

Toda mudança entra no [CHANGELOG.md](CHANGELOG.md). Mudança de regra importante gera um registro em [decisoes/](decisoes/).
Para publicar uma versão, crie a tag no GitHub (`v0.1.0`): é ela que o link do jsDelivr usa.

## ⚠️ Este repositório é público

Ele precisa ser público para o link do jsDelivr funcionar. Então **nunca** coloque aqui: tokens, senhas, preços, margens, propostas, contratos, dados de clientes ou qualquer número do negócio. Isso vai em repositório privado.

## Status

`v0.1.0` — primeira versão. Tudo marcado com **`TODO(definir)`** ainda precisa de uma decisão antes de virar regra.
