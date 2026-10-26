# 00 — Processo de criação

Todo projeto novo da Yan Nunes segue estas fases, nesta ordem: sistema, site, loja, automação ou integração. Cada fase termina num **portão**, e só se passa para a próxima com o portão fechado. Vale para quem cria e para a IA que ajuda a criar.

O resto do padrão diz **como** cada coisa é feita: visual, dados, segurança, diagnóstico. Este documento diz **em que ordem** e **quando está pronto para seguir**.

| Fase | O que sai | Portão: só passa quando... |
|---|---|---|
| 1. Entender | Problema em uma frase, número de sucesso, perfil, o que fica fora | O dono concorda, por escrito, com o problema, o número e o que fica fora |
| 2. Desenhar | Tarefas principais, telas com todos os estados, protótipo no modo demonstração | Quem vai usar faz a tarefa principal no celular, sem ajuda |
| 3. Modelar | Tabelas, status, papéis, RLS, integrações | RLS testada com um usuário de cada papel |
| 4. Construir | Sistema no padrão, em PRs pequenos | Build e testes verdes; telas conferidas em 375, 768, 1280 e 1920px, claro e escuro |
| 5. Conferir | Diagnóstico, teste com gente de verdade, teste do que dá errado | Diagnóstico sem "Falhou" e checklist de entrega completo |
| 6. Entregar | Sistema publicado, acessos, treinamento, suporte | O dono confirma, por escrito, que recebeu tudo |
| 7. Acompanhar | Número de sucesso medido, próximos passos | Medição feita em 2 e em 4 semanas |

Em cada fase também tem **comunicação com o cliente**: o que avisar e com que modelo de mensagem está em [09-comunicacao.md](09-comunicacao.md).

## 1. Entender (antes de qualquer tela)

Responda por escrito:

- **O problema em uma frase** e quanto tempo ou dinheiro ele custa hoje. Ex.: "O representante perde 40 minutos por dia digitando pedido no WhatsApp e 1 em cada 10 pedidos chega com erro."
- **Dá para resolver sem sistema novo?** Recurso do ERP, do Mercado Livre ou da Shopee, uma planilha bem feita, uma automação no n8n. Sistema novo só quando nenhum desses resolve.
- **Quem usa**:
  - quantas pessoas e com que papel;
  - onde trabalham: escritório (menu gaveta) ou rua (abas embaixo);
  - em que aparelho, e se a internet é ruim.
- **Produto Yan Nunes ou de cliente?** Se for de cliente, qual a cor dele.
- **Tipo de negócio:** siga também o domínio, se existir ([dominios/](dominios/)).
- **Perfil do Diagnóstico:**
  - tem página pública?
  - vende online?
  - usa rastreamento?
  - guarda dado pessoal?
- **Dono de cada dado** (estoque, cliente, preço) e com que sistemas conversa.
- **Como vamos saber que deu certo:** 1 a 3 números medidos antes e depois. Ex.: minutos para lançar um pedido, pedidos com erro por semana, tempo da primeira resposta no SAC.
- **O que fica fora da primeira versão.** Escrever o que *não* vai ser feito evita a discussão no fim.

**Sai:** a seção "Sobre este sistema" do `CLAUDE.md` e o `README.md` preenchidos ([templates/](../templates/)).

## 2. Desenhar o fluxo e as telas

- Liste as **tarefas principais** (de 3 a 7). Para cada uma, desenhe o caminho mais curto e conte os toques. Ex.: "lançar pedido: cliente → produtos → quantidade → enviar, em 4 toques".
- Para **cada tela**, responda:
  - o que a pessoa faz aqui;
  - qual a ação principal (uma só);
  - como fica carregando, vazia, com erro, sem dados e depois de dar certo;
  - qual o texto de cada botão e aviso.
- Confira as telas com as [leis de UX](08-leis-de-ux.md).
- Monte primeiro no **modo demonstração**, com dados de exemplo e sem banco ([05](05-stack-e-projeto.md#modo-demonstração)). Mostre no celular de quem vai usar.

**Portão:** a pessoa que vai usar faz a tarefa principal sozinha. Se travou, o desenho muda agora, que é barato.

## 3. Modelar os dados e a segurança

- Tabelas e status em inglês, status em lista fechada, dinheiro em centavos, data com fuso ([03](03-dados.md)).
- Papéis, o que cada um vê e altera, e a RLS de cada tabela ([06](06-seguranca-lgpd.md)).
- Integrações: quem é dono do dado, webhook, idempotência e o que acontece quando o outro lado cai ([04](04-integracoes.md)).
- Decisão que muda formato de dado vai para `docs/decisoes/` do sistema.

**Portão:** RLS testada pela API com um usuário de cada papel; o que não podia ler ou alterar foi negado.

## 4. Construir

- Stack, pastas e camadas de [05](05-stack-e-projeto.md). Visual só com tokens e componentes `yn-*` ([02](02-visual.md)).
- **Desde o primeiro PR:** tema claro e escuro, responsivo pelo espaço, aba Diagnóstico e crédito no rodapé.
- **Um assunto por branch e por PR.** CI verde antes de mesclar. `ESTADO.md` atualizado em todo PR.
- Mudança visual global só entra depois de aprovada na prévia.

**Portão:** build e testes verdes; cada tela que mudou conferida em 375, 768, 1280 e 1920px, no claro e no escuro.

## 5. Conferir

- Aba Diagnóstico sem nenhum "Falhou". Os itens "Conferir" vão para o `ESTADO.md`, com data e quem conferiu ([07](07-diagnostico-e-conformidade.md)).
- Teste com uma pessoa de verdade de cada papel, fazendo as tarefas principais.
- Teste o que dá errado:
  - sem internet;
  - clique duplo em salvar;
  - lista com mais de 1.000 linhas;
  - integração fora do ar;
  - usuário sem permissão tentando entrar.
- Página pública: textos legais revisados por advogado.

**Portão:** checklist de entrega do `PADRAO-YAN-NUNES.md` completo.

## 6. Entregar

- Publicado pela `main`, no domínio certo, com as variáveis no painel da hospedagem.
- **Acesso do administrador** entregue ao dono, com senha provisória que ele troca no primeiro acesso. O dono do sistema é o cliente, não a Yan Nunes.
- **Treinamento:** um vídeo de até 5 minutos por papel e uma página com "como fazer as 3 tarefas principais".
- **Suporte:** quem chamar, em que horário, e como desligar rápido se der problema.
- Versão `1.0.0` no `CHANGELOG.md` do sistema e `Padrão: SystemDesing vX.Y.Z` no `README.md`.

**Portão:** o dono confirma por escrito que recebeu o acesso, o treinamento e o canal de suporte.

## 7. Acompanhar

- Meça o número de sucesso da fase 1 em **2 e em 4 semanas** e mande o resultado para o dono.
- Pedido de mudança vira item em "Próximos passos" do `ESTADO.md`, com um PR por assunto. Pedido fora do combinado é escopo novo e vira proposta nova (sem preço neste repositório).
- Versão nova do padrão: atualize quando fizer sentido, com o prompt de atualização.
- Aprendeu algo que vale para todos os sistemas? Volta para o SystemDesing, de forma **genérica**.

## Regras do processo

1. **Nada começa pelo código.** Primeiro o problema, depois a tela, depois o dado.
2. **Pequeno primeiro.** A primeira versão faz bem as tarefas principais; o resto vem depois.
3. **Toda decisão por escrito:** no `ESTADO.md`, em `docs/decisoes/` ou numa mensagem guardada. Combinado de boca não vale.
4. **Nunca dado real em teste e nunca segredo no chat** (nem com a IA).
5. **A IA segue o mesmo processo.** Ao receber um projeto novo, ela:
   - pergunta o que falta da fase 1;
   - propõe tarefas, telas e dados (fases 2 e 3) e espera aprovação;
   - só então constrói, em PRs pequenos;
   - termina com o checklist de entrega.
6. **Em Lovable, v0 ou Bolt** (que já geram tela na primeira mensagem), a primeira entrega é o **protótipo no modo demonstração**, sem banco, para o portão da fase 2. Prompt de partida: [`templates/PROMPT-NOVO-PROJETO.md`](../templates/PROMPT-NOVO-PROJETO.md).
