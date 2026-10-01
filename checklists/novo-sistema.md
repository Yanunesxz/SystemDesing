# Checklist — sistema novo

Use antes de escrever a primeira linha de código ou montar o primeiro fluxo.

## Antes de começar

- [ ] Escrevi em **uma frase** o problema que o sistema resolve e quanto tempo/dinheiro ele economiza.
- [ ] Verifiquei se não dá para resolver com uma ferramenta que já uso (ERP, recurso nativo do ML/Shopee, n8n).
- [ ] Sei com quais sistemas ele conversa (ERP, CRM, marketplaces, WhatsApp...).
- [ ] Sei quem é o dono de cada dado que ele altera (estoque, clientes, preços).
- [ ] Sei se é produto Yan Nunes ou sistema de cliente (cliente = tema com a cor dele + crédito no rodapé).
- [ ] Sei se quem usa trabalha no escritório (menu gaveta) ou na rua (abas embaixo).

## Criação do repositório

- [ ] Nome no padrão de [05-stack-e-projeto.md](../docs/05-stack-e-projeto.md) (`yn-...` ou `cliente-...`).
- [ ] Repositório **privado** (se tiver qualquer dado ou regra do negócio).
- [ ] Copiei `PADRAO-YAN-NUNES.md` para a raiz do sistema.
- [ ] Copiei de `templates/` também `ESTADO.md`, `PROMPT-NOVO-CHAT.md`, `vercel.json` e `ci.yml` (em `.github/workflows/`).
- [ ] Copiei de `templates/`: `CLAUDE.md` (também como `AGENTS.md`), `README.md`, `.env.example`, `.gitignore`, `.editorconfig` (e `tema-cliente.css` se for de cliente).
- [ ] Preenchi a seção "Sobre este sistema" do `CLAUDE.md` e a versão do padrão no `README.md`.
- [ ] Sem repositório (criando direto no ChatGPT, Lovable, v0)? Anexei `PADRAO-YAN-NUNES.md` na primeira mensagem.

## Durante o desenvolvimento

- [ ] Dados no formato de [03-dados.md](../docs/03-dados.md) (centavos, fuso explícito, telefone, nomes em inglês, status, código humano, trava otimista) e do domínio em [dominios/](../docs/dominios/), se houver.
- [ ] Ponte do Tailwind 4 colada no CSS principal; nenhuma cor crua.
- [ ] Integrações seguindo [04-integracoes.md](../docs/04-integracoes.md) (webhook rápido, idempotência, retry).
- [ ] Telas com `ui/tokens.css` + `ui/componentes.css`, Manrope e a estrutura de [02-visual.md](../docs/02-visual.md#estrutura-de-um-sistema).
- [ ] Tema claro e escuro: segue o aparelho, botão de trocar no topo, escolha guardada, sem piscar ao abrir.
- [ ] Responsivo: conferido em 375px, 768px e 1280px, sem rolagem lateral, 44px de toque no celular.
- [ ] Textos e mensagens seguindo a voz de [01-marca.md](../docs/01-marca.md).
- [ ] Crédito "Criado por Yan Nunes" no rodapé (sistema de cliente).
- [ ] Testes nas funções puras (preço, status, fila, prazo, conversão).
- [ ] Modo demonstração funcionando sem banco.

## Antes de ligar em produção

- [ ] Testado em sandbox / usuário de teste.
- [ ] **RLS por papel e por dono** em toda tabela, testada pela API com um usuário de cada papel.
- [ ] Buckets privados; nenhum arquivo de cliente público.
- [ ] Segredos no painel da hospedagem, não no código nem no README.
- [ ] Logs sem token, CPF ou telefone completo.
- [ ] Aviso de erro chegando no grupo interno.
- [ ] Sei como desligar rápido se der problema (e quem avisar).
