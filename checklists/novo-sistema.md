# Checklist — sistema novo

Use antes de escrever a primeira linha de código ou montar o primeiro fluxo.

## Antes de começar

- [ ] Escrevi em **uma frase** o problema que o sistema resolve e quanto tempo/dinheiro ele economiza.
- [ ] Verifiquei se não dá para resolver com uma ferramenta que já uso (ERP, recurso nativo do ML/Shopee, n8n).
- [ ] Sei quais canais ele toca (`mercadolivre`, `shopee`, `site`, `whatsapp`, `instagram`).
- [ ] Sei quem é a fonte da verdade de cada dado que ele altera (principalmente **estoque**).

## Criação do repositório

- [ ] Nome no padrão `área-o-que-faz` ([05-stack-e-projeto.md](../docs/05-stack-e-projeto.md)).
- [ ] Repositório **privado** (se tiver qualquer dado ou regra do negócio).
- [ ] Copiei de `templates/`: `CLAUDE.md`, `README.md`, `.env.example`, `.gitignore`, `.editorconfig`.
- [ ] Preenchi a seção "Sobre este sistema" do `CLAUDE.md` e a versão do padrão no `README.md`.

## Durante o desenvolvimento

- [ ] Dados no formato de [03-dados.md](../docs/03-dados.md) (centavos, UTC, telefone, SKU, status unificado).
- [ ] Integrações seguindo [04-integracoes.md](../docs/04-integracoes.md) (webhook rápido, idempotência, retry).
- [ ] Telas usando `tokens.css`.
- [ ] Mensagens ao cliente seguindo [01-marca-e-voz.md](../docs/01-marca-e-voz.md).
- [ ] Testes nas funções de conversão.

## Antes de ligar em produção

- [ ] Testado em sandbox / usuário de teste.
- [ ] Segredos no painel da hospedagem, não no código.
- [ ] Logs sem token, CPF ou telefone completo.
- [ ] Aviso de erro chegando no grupo interno.
- [ ] Sei como desligar rápido se der problema (e quem avisar).
