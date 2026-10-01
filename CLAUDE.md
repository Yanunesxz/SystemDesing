# Instruções para IA — repositório SystemDesing

Este repositório **é o padrão** da Yan Nunes — Sistemas & Consultoria. Todos os outros sistemas seguem o que está aqui: mudar algo aqui muda a regra para tudo.

## Ao editar este repositório

- Escreva tudo em português do Brasil, direto, com exemplos reais de sistemas de empresa: CRM, representantes de vendas, produção e e-commerce (Mercado Livre, Shopee, loja virtual, WhatsApp).
- Regra que vale para qualquer sistema vai em `docs/01` a `docs/06`. Regra de um tipo de negócio vai em `docs/dominios/`.
- Toda mudança de regra:
  1. Atualiza o documento em `docs/`.
  2. Atualiza o resumo em `templates/CLAUDE.md` se a regra for "não negociável".
  3. Entra no `CHANGELOG.md` com a versão correta (PATCH / MINOR / MAJOR — ver `README.md`).
  4. Se for decisão importante (muda formato de dado, stack, visual ou obriga sistemas a mudar), cria um registro em `decisoes/` a partir de `decisoes/0000-template.md`.
- Mudou `ui/tokens.css` ou `ui/componentes.css`? Confira `ui/preview.html` nos temas claro e escuro, com o tema padrão e com uma cor de cliente.
- Visual: só Manrope, sem itálico, só preto/branco/cinza + cores de status. Cor do cliente só em `--color-brand`.
- Nunca apague um `TODO(definir)` sem colocar a decisão no lugar.
- Informações sobre APIs de terceiros (Mercado Livre, Shopee, Meta/WhatsApp) mudam: quando citar limites ou prazos, indique que devem ser conferidos na documentação oficial.

## Nunca colocar aqui

Repositório público: nada de tokens, senhas, preços, margens, propostas, contratos ou dados de clientes.
