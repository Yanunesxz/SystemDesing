# 09 — Comunicação

Duas frentes:
1. **Com o cliente**, durante o projeto e depois da entrega.
2. **Do sistema com quem usa**: avisos, notificações e o que dizer quando algo para.

O tom é sempre a voz da marca ([01-marca.md](01-marca.md)): direto, falando da operação, verbo no começo, sem jargão técnico.

## Com o cliente

### Regras

1. **Cada assunto no canal certo:**

   | Assunto | Canal |
   |---|---|
   | Recado rápido, dúvida, aviso de prévia pronta | WhatsApp, no grupo do projeto (com o dono e quem decide) |
   | Decisão, escopo, aprovação, entrega | Por escrito e guardado (e-mail ou documento), mesmo que o aviso vá pelo WhatsApp |
   | Problema no sistema em uso | WhatsApp na hora, e o resumo por escrito depois |
   | Assunto delicado: atraso, mudança de escopo, erro nosso | Ligação ou áudio curto, e logo depois por escrito |

2. **Toda decisão por escrito.** Combinado por áudio ou ligação vira texto no mesmo dia.
3. **Resumo toda semana**, no mesmo dia, mesmo quando avançou pouco. Silêncio gera ansiedade e cobrança.
4. **Mostrar em vez de descrever:** link da prévia ou vídeo de 1 minuto da tela.
5. **Prazo com folga, dizendo o que depende de quem.** Nunca prometa data que depende de um acesso ou de uma resposta do cliente sem dizer isso.
6. **Mudança de escopo:** reconheça, separe e dê opções ("depois da entrega, ou agora trocando por X"). Nunca aceite calado nem recuse seco.
7. **Má notícia primeiro e cedo.** Atraso é avisado assim que se sabe, com a nova data e o que muda.
8. **Sem jargão:** "o ERP não respondeu", não "timeout no endpoint".
9. **Nunca senha nem dado sensível por WhatsApp ou e-mail.** Acesso chega pelo convite do próprio sistema.
10. **Horário:** mensagem que não é urgente vai em horário comercial.

### O que comunicar em cada fase

| Fase do [processo](00-processo-de-criacao.md) | O que comunicar | Modelo |
|---|---|---|
| 1. Entender | Resumo do entendimento, para o dono confirmar | 1 |
| 2. Desenhar | Link do protótipo e o que testar | 2 |
| 3 e 4. Modelar e construir | Resumo da semana; prévia de cada mudança visual | 3 e 2 |
| Qualquer fase | Pedido fora do combinado | 4 |
| 6. Entregar | Acessos, treinamento e suporte | 5 |
| 7. Acompanhar | Resultado em 2 e em 4 semanas | 6 |
| Sistema em uso | Problema (incidente) | 7 |

### Modelos de mensagem

Prontos para WhatsApp; o mesmo texto serve para e-mail. Troque o que está entre colchetes. Valores e preços não entram aqui: proposta comercial fica fora deste repositório.

**1. Entendimento (fase 1)**
```text
Oi, [nome]! Resumo do que entendi, para você confirmar:

Problema: [uma frase].
Quem usa: [papéis e onde trabalham].
Vamos medir: [número de sucesso: como está hoje e onde queremos chegar].
A primeira versão faz: [3 a 5 tarefas].
Fica para depois: [lista].

Está certo? Se estiver, responde "ok" que eu sigo para as telas.
```

**2. Prévia para testar (fase 2 e toda mudança visual)**
```text
[nome], a prévia de [tela ou tarefa] está pronta: [link]

Abre no celular e tenta [tarefa, ex.: lançar um pedido para um cliente].
Os dados são de exemplo: pode mexer à vontade.
Me conta onde travou ou o que estranhou. Preciso do seu retorno até [dia] para manter o prazo.
```

**3. Resumo da semana**
```text
Resumo da semana · [projeto]

Feito: [2 a 4 itens, na linguagem do negócio].
Próxima semana: [2 a 3 itens].
Preciso de você: [decisão, acesso ou dado] até [dia]. (ou: nada por enquanto)
Entrega: [prazo mantido / novo prazo e por quê].
```

**4. Pedido fora do combinado**
```text
[nome], [o pedido] não estava no combinado da primeira versão. Dá para fazer de dois jeitos:

1. Depois da entrega, como próxima etapa.
2. Agora, tirando [item] da primeira versão ou passando a entrega para [data].

Qual você prefere?
```

**5. Entrega (fase 6)**
```text
[nome], o [sistema] está no ar: [link]

Seu acesso de administrador chegou no seu e-mail. Troque a senha no primeiro acesso.
Treinamento: [link do vídeo, 5 min] e o guia das 3 tarefas principais: [link].
Suporte: [canal], [dias e horário]. Se algo parar, chame em [canal de urgência].

Me confirma que recebeu tudo? Em 2 semanas eu te mando como está [número de sucesso].
```

**6. Resultado (fase 7)**
```text
[nome], [2 ou 4] semanas de [sistema]:

[número de sucesso]: antes [x], agora [y].
Ajustes que vocês pediram: [lista].
Sigo com [o próximo] se você concordar.
```

**7. Problema no sistema (incidente)**
```text
[nome], aviso: [o que parou, na linguagem do negócio] desde [hora].

O que já fizemos: [ação].
Enquanto isso: [o que a equipe pode fazer; ex.: os pedidos ficam na fila e sobem sozinhos].
Próxima atualização: até [hora].
```
Depois que resolver, mande por escrito:
- o que aconteceu;
- por quê;
- o que mudou para não repetir.

Sem culpar ninguém.

## Dentro do sistema

### Onde cada aviso aparece

| Situação | Onde |
|---|---|
| Resultado do que a pessoa acabou de fazer | Na tela: `.yn-toast` para sucesso; erro no próprio campo (`.yn-error`) ou em `.yn-alert` |
| Algo que vale para a tela inteira (sem internet, integração parada, versão nova) | `.yn-banner` no topo |
| Algo que pede ação depois | Contador no menu (`.yn-count`) e lista de pendências |
| Algo urgente para quem não está no sistema | E-mail ou WhatsApp, com link direto para a ação |

### Regras de notificação

1. **Só avisa o que pede ação ou o que a pessoa espera** ("seu pedido saiu"). O resto vai para o histórico.
2. **Do mais leve ao mais forte:** na tela, depois e-mail, e WhatsApp só para o que é urgente ou que a pessoa pediu.
3. **Cliente final (comprador):**
   - aviso do pedido (confirmação, nota, envio, entrega) pode ir sempre, porque faz parte da compra;
   - promoção e novidade só com `marketing_opt_in` registrado ([06](06-seguranca-lgpd.md)).
4. **Horário:**
   - aviso que não é urgente só em horário comercial, no fuso de São Paulo;
   - muitos avisos viram um resumo por dia.
5. **Todo aviso diz o que aconteceu e o que fazer**, com link direto para fazer.
6. **Nada sensível no texto do aviso.** Ele aparece na tela bloqueada do celular: sem CPF, endereço, dado de saúde ou senha.
7. **Cada pessoa escolhe o que recebe e por qual canal** (Configurações → Avisos). Obrigatório só o essencial: segurança e senha.
8. **WhatsApp oficial:** mensagem que a empresa começa usa modelo aprovado e respeita a janela de atendimento. Confira as regras atuais na documentação oficial da Meta.

### Textos de aviso

| Situação | Texto |
|---|---|
| Deu certo | "Pedido #4821 salvo." |
| Deu errado, com saída | "Não deu para salvar: o CNPJ está incompleto." |
| Algo fora do ar | "O ERP não está respondendo. Os pedidos ficam na fila e sobem quando ele voltar." |
| Confirmação | "Excluir o pedido #4821? Isso não pode ser desfeito." |
| Pendência | "3 pedidos esperando a sua aprovação." |
| Aviso por e-mail ou WhatsApp | "Pedido #4821 de Mercado São Jorge foi faturado. Ver pedido: [link]" |
| Voltou ao normal | "Tudo funcionando de novo desde 14:20." |

### Quando algo para

- Faixa no topo (`.yn-banner` com `data-tone="danger"`) dizendo o que parou, o que continua funcionando e o que fazer.
- O sistema segura o trabalho quando dá (fila que reenvia sem duplicar), para ninguém perder venda.
- Quando volta, a faixa some e aparece "Tudo funcionando de novo desde [hora]".
- O dono do sistema recebe o modelo 7 acima, antes de descobrir sozinho.

## Com a IA

- O que a IA precisa saber fica **nos arquivos**, não no chat: `CLAUDE.md`, `ESTADO.md`, `PROMPT-NOVO-CHAT.md` e `docs/decisoes/` ([05](05-stack-e-projeto.md#contexto-para-a-ia-todo-sistema)).
- Uma conversa por assunto. Comece pelo `PROMPT-NOVO-CHAT.md` e termine pedindo a atualização do `ESTADO.md`.
- Nunca cole segredo, senha ou dado de cliente no chat.
