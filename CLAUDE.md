# Instruções para IA — repositório SystemDesing

Este repositório **é o padrão** que todos os outros sistemas seguem. Mudar algo aqui muda a regra para tudo.

## Ao editar este repositório

- Escreva tudo em português do Brasil, direto e com exemplos de e-commerce (Mercado Livre, Shopee, loja virtual, WhatsApp, Instagram).
- Toda mudança de regra:
  1. Atualiza o documento em `docs/`.
  2. Atualiza o resumo em `templates/CLAUDE.md` se a regra for "não negociável".
  3. Entra no `CHANGELOG.md` com a versão correta (PATCH / MINOR / MAJOR — ver `README.md`).
  4. Se for decisão importante (muda formato de dado, stack ou obriga sistemas a mudar), cria um registro em `decisoes/` a partir de `decisoes/0000-template.md`.
- Mudou um token em `tokens/tokens.css`? Confira a página `tokens/preview.html` nos temas claro e escuro.
- Nunca apague um `TODO(definir)` sem colocar a decisão no lugar.
- Informações sobre APIs de terceiros (Mercado Livre, Shopee, Meta/WhatsApp) mudam: quando citar limites ou prazos, indique que devem ser conferidos na documentação oficial.

## Nunca colocar aqui

Repositório público: nada de tokens, senhas, preço de custo, margem, fornecedores ou dados de clientes.
