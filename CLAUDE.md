# Instruções para IA — repositório SystemDesing

Este repositório **é o padrão** da Yan Nunes — Sistemas & Consultoria. Todos os outros sistemas seguem o que está aqui: mudar algo aqui muda a regra para tudo.

## Ao editar este repositório

- Escreva tudo em português do Brasil, direto, com exemplos reais de sistemas de empresa: CRM, representantes de vendas, produção e e-commerce (Mercado Livre, Shopee, loja virtual, WhatsApp).
- Regra que vale para qualquer sistema vai em `docs/01` a `docs/06`. Regra de um tipo de negócio vai em `docs/dominios/`.
- Aprendizado vindo de sistema de cliente entra **genérico**: nunca nome do cliente, de pessoas, números, preços, prazos internos ou regras comerciais dele.
- Toda mudança de regra:
  1. Atualiza o documento em `docs/`.
  2. Atualiza `PADRAO-YAN-NUNES.md` (ver abaixo).
  3. Entra no `CHANGELOG.md` com a versão correta (PATCH / MINOR / MAJOR — ver `README.md`).
  4. Se for decisão importante (muda formato de dado, stack, visual ou obriga sistemas a mudar), cria um registro em `decisoes/` a partir de `decisoes/0000-template.md`.
- **`PADRAO-YAN-NUNES.md` é o documento que vai para as IAs.** Toda regra nova ou alterada em `docs/` ou `ui/` também entra lá, no mesmo commit:
  - mudou cor, fonte, ícone ou medida → atualize as seções 2, 3, 4 e 6;
  - componente novo → linha na tabela de componentes da seção 5 e card na vitrine;
  - mudou `ui/tokens.css` ou `ui/componentes.css` → substitua o CSS do Anexo pelo conteúdo novo dos arquivos;
  - mudou `ui/tailwind.css` → substitua o bloco `@theme` da seção 5 (precisa ficar idêntico ao arquivo);
  - domínio novo em `docs/dominios/` → link na seção 0 e no README;
  - mudou a versão → atualize o número no topo, nos links do jsDelivr e no Anexo.
- Mudou `ui/tokens.css` ou `ui/componentes.css`? Confira a vitrine (`index.html` na raiz) e as telas de `ui/exemplos/` nos temas claro e escuro, com o tema padrão e com uma cor de cliente, em 375px e 1280px. Componente novo entra também na vitrine, num card com exemplo funcionando, e precisa funcionar nos dois temas e no celular.
- Visual: só Manrope, sem itálico, só preto/branco/cinza + cores de status. Cor do cliente só em `--color-brand`.
- Nunca apague um `TODO(definir)` sem colocar a decisão no lugar.
- Informações sobre APIs de terceiros (Mercado Livre, Shopee, Meta/WhatsApp) mudam: quando citar limites ou prazos, indique que devem ser conferidos na documentação oficial.

## Nunca colocar aqui

Repositório público: nada de tokens, senhas, preços, margens, propostas, contratos ou dados de clientes.
