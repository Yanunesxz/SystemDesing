# 0011 — Segurança como regra conferida: SRI, CSP, CI e regra 18 do Diagnóstico

- **Data:** 2026-11-03
- **Status:** aceita

## Contexto

O `docs/06` cobria segredos, RLS, login, arquivos e LGPD, mas deixava aberto o que mais vaza dado em sistema pequeno feito com IA:

- chave secreta no código que vai para o navegador (variável `VITE_` com a `service_role`, chave da IA no front);
- link público com o número do pedido (`/pedido/4817` → `4818` mostra o cliente de outra pessoa);
- texto de fora virando HTML (nome de cliente, mensagem do WhatsApp, pergunta do marketplace);
- pagamento confirmado pelo endereço de volta da tela;
- pacote ou script de terceiros que muda sozinho;
- nenhum roteiro para quando vaza.

E o próprio padrão tinha um furo: todo sistema carrega `tokens.css`, `componentes.css` e o `diagnostico.js` do jsDelivr **sem `integrity`**. O `diagnostico.js` roda na tela do administrador, com a sessão dele. Se este repositório ou o CDN fossem comprometidos, o código de fora rodaria em todos os sistemas de uma vez. A vitrine também era publicada sem os cabeçalhos de segurança que o padrão exige dos sistemas.

## Decisão

1. `docs/06` ganha as regras que faltavam: variável `VITE_`, o que vem de fora é texto, filtro do Supabase sem juntar texto, links públicos com token, CSP, dependências e CDN com `integrity`, envio e exportação de arquivo, pagamento, *prompt injection*, ambientes e o roteiro de incidente.
2. **Todo arquivo de CDN entra com versão fixa, `integrity` e `crossorigin="anonymous"`**, a começar pelos arquivos do padrão. O hash de cada versão fica no `PADRAO-YAN-NUNES.md`, e o workflow `.github/workflows/conferir.yml` reprova o PR deste repositório quando o hash não bate com o arquivo. Tag publicada nunca é movida.
3. `templates/vercel.json` ganha uma CSP completa para a stack padrão. Para ela funcionar sem liberar script na página, o script do tema em React sai do HTML e vai para `public/tema.js`.
4. `templates/ci.yml` roda `npm audit` (falha alta ou crítica), gitleaks e uma trava contra chave secreta com prefixo `VITE_`. Entra o `templates/dependabot.yml`.
5. A aba Diagnóstico ganha a **regra 18, Segurança no navegador**, que vale para todo sistema: chave secreta no HTML e nos scripts do próprio site, senha no `localStorage`, HTTPS, formulário para `http://`, cabeçalhos de segurança e arquivo de CDN sem versão fixa ou sem `integrity`.
6. A vitrine passa a ter `vercel.json` com os cabeçalhos de segurança.

## Alternativas consideradas

- **Copiar os arquivos do padrão para dentro de cada sistema em vez do CDN:** resolve o risco do CDN, mas acaba com a atualização por versão (o `@v...`) e faz cada sistema guardar uma cópia que ninguém atualiza. O `integrity` dá a mesma proteção mantendo o link.
- **CSP com `'unsafe-inline'` para não mexer no script do tema:** a CSP deixaria de barrar justamente o script injetado, que é o motivo de ela existir.
- **Hash do script do tema na CSP:** quebra quando a IA ou o formatador mudam um espaço no script. O arquivo `public/tema.js` não quebra.
- **gitleaks pela action oficial:** pede licença para conta de organização. O binário da release, com versão fixa, roda igual em qualquer conta.
- **Regra 18 lendo a CSP a fundo (`'unsafe-inline'`, `*`):** dá falso alarme em página estática simples. A aba confere se os cabeçalhos existem; a qualidade da CSP fica no modelo e na revisão do PR.

## Consequências

- Sistema que atualizar para a v0.5.0 troca a linha inteira dos links (com o `integrity`), não só o número da versão. Linha com o `integrity` de outra versão faz o CSS não carregar: o erro aparece na hora, no console.
- Quem adotar a CSP do modelo move o script do tema para `public/tema.js` e lista na CSP cada domínio novo que usar.
- A aba Diagnóstico pode acusar **Falhou** em sistemas que já estavam no ar: chave secreta exposta é revogada no painel da plataforma antes de qualquer outra coisa.
- HTTPS e cabeçalhos só são testados no endereço publicado: o Diagnóstico passa a ser rodado lá também, não só em `localhost`.
- A regra 18 não testa o servidor. RLS, funções e webhooks continuam no teste de acesso pela API, com um usuário de cada papel.

> **v0.5.1 (2026-11-11):** a tag `v0.5.0` saiu antes do merge, com o conteúdo da v0.4.1. Esta decisão entra em vigor na v0.5.1; não use `@v0.5.0`.
