# SystemDesing — o padrão Yan Nunes

**YAN NUNES — Sistemas & Consultoria.** Este repositório é a fonte única da verdade para tudo que a Yan Nunes cria: produtos próprios (CRM, Sales, Production), sistemas sob medida para clientes, automações, integrações, site e conteúdo.

> **Regra de ouro:** se não está aqui, não é padrão. Se é padrão, está aqui.

## 👉 Vai criar um sistema? Mande este arquivo para a IA

**[`PADRAO-YAN-NUNES.md`](PADRAO-YAN-NUNES.md)** é o documento único para anexar no ChatGPT, Claude, Lovable, v0, Cursor ou qualquer outra IA junto com o pedido. Ele tem tudo que ela precisa, sem depender de abrir o resto do repositório:

- fonte e pesos;
- cores em hexadecimal;
- a estrutura de um sistema explicada peça por peça, com HTML pronto e o script do menu e do tema;
- tema claro e escuro (obrigatório) e como ser responsivo, do celular ao monitor, pelo espaço disponível;
- a aba Diagnóstico, com as 17 regras de conformidade e quais valem para cada tipo de sistema;
- componentes;
- o processo de criação, fase por fase, e as leis de UX;
- textos, avisos e modelos de mensagem para o cliente;
- formatos de dados;
- checklist de entrega;
- os dois CSS completos no anexo.

O resto do repositório é o detalhe e o histórico de cada regra.

**Projeto novo do zero?** Mande o `PADRAO-YAN-NUNES.md` junto com o [`templates/PROMPT-NOVO-PROJETO.md`](templates/PROMPT-NOVO-PROJETO.md) preenchido. A IA segue as fases do processo e não pula para o código.

Ele junta três coisas que costumam ser confundidas:

- **Design System** (identidade): marca, fonte, cores, componentes de tela, voz.
- **System Design** (engenharia): formato dos dados, integrações, stack, segurança.
- **Processo** (como se cria): fases com portão, leis de UX e comunicação com o cliente e com quem usa o sistema.

O objetivo: qualquer projeto novo, feito por você, por outro desenvolvedor da equipe ou por uma IA, nasce com a mesma cara, a mesma qualidade e o mesmo jeito de trabalhar, sem reinventar nada.

## O que tem aqui

| Arquivo / pasta | Para que serve |
|---|---|
| [PADRAO-YAN-NUNES.md](PADRAO-YAN-NUNES.md) | **O documento para mandar à IA** (resumo autocontido de tudo) |
| [docs/00-processo-de-criacao.md](docs/00-processo-de-criacao.md) | As 7 fases de todo projeto (entender, desenhar, modelar, construir, conferir, entregar, acompanhar), cada uma com o portão para seguir |
| [docs/01-marca.md](docs/01-marca.md) | Posicionamento, atributos, produtos, regras do símbolo, crédito "Criado por", voz |
| [docs/02-visual.md](docs/02-visual.md) + [ui/](ui/) | Manrope, paleta, tema claro e escuro, tema do cliente, estrutura de um sistema, responsivo, componentes, ponte do Tailwind 4 |
| [ui/exemplos/](ui/exemplos/) | Telas completas para copiar: [menu gaveta](ui/exemplos/menu-gaveta.html) (escritório), [abas embaixo](ui/exemplos/menu-abas.html) (rua) e [aba Diagnóstico](ui/exemplos/diagnostico.html) |
| [templates/legal/](templates/legal/) | Esqueletos de política de privacidade, termos de uso, reembolso e cookies |
| [docs/03-dados.md](docs/03-dados.md) | Formatos obrigatórios, nomes de campos, status, cliente |
| [docs/04-integracoes.md](docs/04-integracoes.md) | Dono de cada dado, webhooks, retry, tokens OAuth, logs |
| [docs/05-stack-e-projeto.md](docs/05-stack-e-projeto.md) | Stack (React + TypeScript + Supabase), pastas, camadas, modo demonstração, offline, migrações, CI, contexto para IA |
| [docs/06-seguranca-lgpd.md](docs/06-seguranca-lgpd.md) | Segredos, RLS por papel, login, arquivos privados, LGPD, IA e dados |
| [docs/07-diagnostico-e-conformidade.md](docs/07-diagnostico-e-conformidade.md) + [ui/diagnostico.js](ui/diagnostico.js) | A aba Diagnóstico: 17 regras (privacidade, cookies, reembolso, acessibilidade, contraste, responsivo...), o perfil que decide quais valem e como a aba testa |
| [docs/08-leis-de-ux.md](docs/08-leis-de-ux.md) | As 20 leis de UX, o que cada uma diz, a regra que vira no sistema e as 8 perguntas para conferir uma tela |
| [docs/09-comunicacao.md](docs/09-comunicacao.md) | Comunicação com o cliente (canais, regras e 7 modelos de mensagem) e do sistema com quem usa (avisos, notificações, quando algo para) |
| [docs/dominios/](docs/dominios/) | Regras de um tipo de negócio: [representantes e pedidos B2B](docs/dominios/representantes.md), [CRM comercial](docs/dominios/crm.md), [atendimento/SAC](docs/dominios/atendimento.md) e [e-commerce](docs/dominios/ecommerce.md) |
| [templates/](templates/) | Arquivos para copiar ao criar um sistema, incluindo o [prompt de projeto novo](templates/PROMPT-NOVO-PROJETO.md) |
| [decisoes/](decisoes/) | Registro de decisões: o que foi decidido e por quê |
| [checklists/novo-sistema.md](checklists/novo-sistema.md) | Passo a passo para começar um sistema já no padrão |

**Ver o visual funcionando:** **https://systemdesing.vercel.app** — a vitrine do design system: fundamentos, componentes básicos, componentes de sistema e telas completas, cada um funcionando, com o código para copiar e o gerador de tema do cliente. O arquivo é o [`index.html`](index.html) da raiz; abra no navegador para ver sem internet.

## Como um sistema "segue" este padrão

Documento que ninguém lê não é padrão, é enfeite. Por isso existem três mecanismos concretos:

1. **A IA lê as regras.** Em conversa (ChatGPT, Claude, Lovable), anexe [`PADRAO-YAN-NUNES.md`](PADRAO-YAN-NUNES.md). Em repositório de código, copie esse arquivo para a raiz junto com [`templates/CLAUDE.md`](templates/CLAUDE.md), que manda o Claude Code ler o padrão (para outras IAs, copie também como `AGENTS.md`). Vale também para dev novo: é a primeira coisa que ele lê.
2. **O visual é importado, não copiado.** Os CSS vêm direto deste repositório, com versão fixa:

   ```html
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.4.0/ui/tokens.css">
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.4.0/ui/componentes.css">
   ```

   Mudou algo aqui? Cria uma versão nova e cada sistema troca o `@v...` quando estiver pronto.
3. **Cada sistema declara a versão que segue.** No README de todo sistema: `Padrão: SystemDesing v0.4.0`.

## Versionamento

Segue [SemVer](https://semver.org/lang/pt-BR/):

- **PATCH** (`0.1.1`): correção de texto, exemplo novo, ajuste que não muda regra.
- **MINOR** (`0.2.0`): regra ou componente novo que não obriga ninguém a mudar nada.
- **MAJOR** (`1.0.0`): mudança que obriga a alterar sistemas existentes (ex.: renomear um token).

Toda mudança entra no [CHANGELOG.md](CHANGELOG.md). Mudança de regra importante gera um registro em [decisoes/](decisoes/).
Para publicar uma versão, crie a release no GitHub com a tag no formato `v0.4.0` (v minúsculo e os pontos), escolhida no botão **Tag**, não no título. É essa tag que o link do jsDelivr usa.

## ⚠️ Este repositório é público

Ele precisa ser público para o link do jsDelivr funcionar. Então **nunca** coloque aqui: tokens, senhas, preços, margens, propostas, contratos, dados de clientes ou qualquer número do negócio. Isso vai em repositório privado.

## Status

`v0.4.0` — processo de criação com portões, leis de UX e comunicação (com o cliente e dentro do sistema), sobre a v0.3 (aba Diagnóstico, responsivo pelo espaço) e a v0.2 (componentes de negócio, menu no celular, tema claro/escuro obrigatório). Tudo marcado com **`TODO(definir)`** ainda precisa de uma decisão antes de virar regra.
