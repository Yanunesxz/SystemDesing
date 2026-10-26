# Checklist — sistema novo

Use antes de escrever a primeira linha de código ou montar o primeiro fluxo. A ordem do trabalho e o portão de cada fase estão em [00-processo-de-criacao.md](../docs/00-processo-de-criacao.md); este checklist é o que não pode faltar em cada uma.

## Antes de começar (fase 1)

- [ ] Escrevi em **uma frase** o problema que o sistema resolve e quanto tempo/dinheiro ele economiza.
- [ ] Verifiquei se não dá para resolver com uma ferramenta que já uso (ERP, recurso nativo do ML/Shopee, n8n).
- [ ] Sei com quais sistemas ele conversa (ERP, CRM, marketplaces, WhatsApp...).
- [ ] Sei quem é o dono de cada dado que ele altera (estoque, clientes, preços).
- [ ] Sei se é produto Yan Nunes ou sistema de cliente (cliente = tema com a cor dele + crédito no rodapé).
- [ ] Sei se quem usa trabalha no escritório (menu gaveta) ou na rua (abas embaixo).
- [ ] Respondi o perfil do sistema (página pública? vende online? rastreamento? dado pessoal?) e sei quais das 17 regras de [07](../docs/07-diagnostico-e-conformidade.md) valem.
- [ ] Defini de 1 a 3 números de sucesso, com o valor de hoje, e o que fica fora da primeira versão.
- [ ] O dono aprovou o resumo do entendimento por escrito (modelo 1 de [09-comunicacao.md](../docs/09-comunicacao.md)).

## Telas (fase 2)

- [ ] Listei as tarefas principais (3 a 7) e o caminho mais curto de cada uma, contando os toques.
- [ ] Cada tela tem uma ação principal e todos os estados: carregando, vazia, com erro, sem dados e sucesso.
- [ ] Conferi as telas com as 8 perguntas de [08-leis-de-ux.md](../docs/08-leis-de-ux.md#como-conferir-uma-tela).
- [ ] Quem vai usar fez a tarefa principal no protótipo (modo demonstração), no celular, sem ajuda.

## Criação do repositório

- [ ] Nome no padrão de [05-stack-e-projeto.md](../docs/05-stack-e-projeto.md) (`yn-...` ou `cliente-...`).
- [ ] Repositório **privado** (se tiver qualquer dado ou regra do negócio).
- [ ] Copiei `PADRAO-YAN-NUNES.md` para a raiz do sistema.
- [ ] Copiei de `templates/` também `ESTADO.md`, `PROMPT-NOVO-CHAT.md`, `vercel.json` e `ci.yml` (em `.github/workflows/`).
- [ ] Copiei de `templates/`: `CLAUDE.md` (também como `AGENTS.md`), `README.md`, `.env.example`, `.gitignore`, `.editorconfig` (e `tema-cliente.css` se for de cliente).
- [ ] Preenchi a seção "Sobre este sistema" do `CLAUDE.md` e a versão do padrão no `README.md`.
- [ ] Sem repositório (criando direto no ChatGPT, Lovable, v0)? Anexei `PADRAO-YAN-NUNES.md` na primeira mensagem.

## Durante o desenvolvimento (fases 3 e 4)

- [ ] Dados no formato de [03-dados.md](../docs/03-dados.md) (centavos, fuso explícito, telefone, nomes em inglês, status, código humano, trava otimista) e do domínio em [dominios/](../docs/dominios/), se houver.
- [ ] Ponte do Tailwind 4 colada no CSS principal; nenhuma cor crua.
- [ ] Integrações seguindo [04-integracoes.md](../docs/04-integracoes.md) (webhook rápido, idempotência, retry).
- [ ] Telas com `ui/tokens.css` + `ui/componentes.css`, Manrope e a estrutura de [02-visual.md](../docs/02-visual.md#estrutura-de-um-sistema).
- [ ] Tema claro e escuro: segue o aparelho, botão de trocar no topo, escolha guardada, sem piscar ao abrir.
- [ ] Responsivo: conferido em 375px, 768px, 1280px e 1920px, sem rolagem lateral, tela de trabalho usando a largura toda, 44px de toque no celular.
- [ ] Aba Diagnóstico em `/diagnostico` (só administrador), com o perfil certo e as páginas principais.
- [ ] Textos e mensagens seguindo a voz de [01-marca.md](../docs/01-marca.md).
- [ ] Avisos e notificações seguindo [09-comunicacao.md](../docs/09-comunicacao.md#dentro-do-sistema): só o que pede ação, com link direto, nada sensível no texto, cada pessoa escolhe o que recebe.
- [ ] Resumo da semana mandado ao cliente (modelo 3), com o que preciso dele e até quando.
- [ ] Crédito "Criado por Yan Nunes" no rodapé (sistema de cliente).
- [ ] Testes nas funções puras (preço, status, fila, prazo, conversão).
- [ ] Modo demonstração funcionando sem banco.

## Antes de ligar em produção (fases 5 e 6)

- [ ] Testado em sandbox / usuário de teste.
- [ ] **RLS por papel e por dono** em toda tabela, testada pela API com um usuário de cada papel.
- [ ] Buckets privados; nenhum arquivo de cliente público.
- [ ] Segredos no painel da hospedagem, não no código nem no README.
- [ ] Logs sem token, CPF ou telefone completo.
- [ ] Aviso de erro chegando no grupo interno.
- [ ] Sei como desligar rápido se der problema (e quem avisar).
- [ ] Diagnóstico rodado sem nenhum "Falhou"; itens "Conferir" registrados no `ESTADO.md`; páginas legais revisadas por advogado (se houver página pública).
- [ ] Acesso de administrador, treinamento (vídeo de até 5 min por papel) e canal de suporte entregues; o dono confirmou por escrito (modelo 5).

## Depois da entrega (fase 7)

- [ ] Número de sucesso medido em 2 e em 4 semanas e mandado ao dono (modelo 6).
- [ ] Pedidos novos viraram itens em "Próximos passos" do `ESTADO.md`; o que estava fora do combinado virou proposta nova.
- [ ] O que aprendi e vale para todos os sistemas voltou para o SystemDesing, de forma genérica.
