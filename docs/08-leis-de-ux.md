# 08 — Leis de UX

São regras de psicologia que explicam por que uma tela é fácil ou difícil de usar. No padrão Yan Nunes, cada lei vira **uma regra que dá para conferir** na tela. Use na fase 2 do [processo de criação](00-processo-de-criacao.md), ao desenhar, e de novo na fase 5, ao conferir.

Muitas já estão nos componentes `yn-*`: quem usa o padrão já segue sem pensar. O que sobra é decisão de quem desenha a tela.

## Resumo

| # | Lei | O que diz | O que o sistema faz |
|---|---|---|---|
| 1 | Lei de Hick | Mais opções, decisão mais lenta | Um botão principal por tela; menu com até 8 itens por grupo |
| 2 | Lei de Fitts (tamanho) | Alvo pequeno é difícil de acertar | 44px de toque; a ação principal é o maior botão |
| 3 | Lei de Jakob | A pessoa espera que funcione como os outros sites | Padrões conhecidos: busca no topo, carrinho no canto, logo leva ao início |
| 4 | Lei da proximidade | O que está perto parece do mesmo grupo | Rótulo colado no campo; grupos separados por espaço maior |
| 5 | Lei de Miller | A memória curta guarda uns 7 itens | Informação em blocos: máscaras, formulário em seções |
| 6 | Limiar de Doherty | Resposta em menos de 0,4 s mantém o ritmo | O botão reage na hora; esqueleto enquanto carrega |
| 7 | Efeito Von Restorff | O diferente é lembrado | Só uma coisa se destaca por tela |
| 8 | Lei de Fitts (distância) | Alvo longe demora mais | Ações em sequência ficam juntas; ação principal no alcance do polegar |
| 9 | Efeito de posição serial | Lembra-se do primeiro e do último | O mais usado vai no começo do menu; o que pede ação vai no topo da lista |
| 10 | Regra do pico-fim | Vale o momento mais forte e o fim | Confirmação de sucesso caprichada, com o próximo passo |
| 11 | Efeito Zeigarnik | O que ficou pela metade gruda na cabeça | Mostrar rascunho, progresso e o que falta |
| 12 | Navalha de Occam | O mais simples que resolve é o melhor | Campo, tela ou etapa sem motivo sai |
| 13 | Lei de Tesler | A complexidade não some, muda de lado | O sistema faz o trabalho chato (CEP, cálculo, valor padrão) |
| 14 | Lei de Postel | Aceite qualquer formato, guarde no formato certo | CPF com ou sem ponto; telefone com ou sem 55 |
| 15 | Lei de Murphy | Se pode dar errado, vai dar | Sem internet, clique duplo e integração parada pensados antes |
| 16 | Lei da semelhança | O que é parecido parece ter a mesma função | Mesma ação, mesmo visual, em todo o sistema |
| 17 | Conectividade uniforme | O que está ligado parece relacionado | O que é do mesmo assunto fica no mesmo card ou ligado por linha |
| 18 | Lei de Parkinson | A tarefa ocupa todo o tempo que tiver | Prazo visível e verdadeiro |
| 19 | Carga cognitiva | Esforço mental para usar a tela | Um assunto por tela, texto curto, valor padrão |
| 20 | Efeito gradiente de meta | Perto da meta, a pessoa acelera | Mostrar quanto falta |

## Cada lei, na prática

### 1. Lei de Hick
- **O que diz:** quanto mais opções e mais parecidas, mais a pessoa demora para escolher.
- **Regra:** um botão principal por tela (`.yn-btn--primary`). Menu com até 8 itens por grupo. Mais de 5 filtros vão para trás de um botão "Filtros". Escolha entre muitos itens vira busca com lista (`.yn-combobox`), não um `select` com 300 clientes.
- **Exemplo:** na loja, "Comprar" é o único botão forte do produto. "Favoritar" e "Compartilhar" são discretos.

### 2. Lei de Fitts (tamanho)
- **O que diz:** o tempo para acertar um alvo depende do tamanho dele.
- **Regra:** 44px de toque no celular (o `componentes.css` já faz). O rótulo da caixa de seleção também é clicável (`<label>`). A ação principal é o maior botão da tela.
- **Exemplo:** o "+" da quantidade no catálogo do representante tem 44px, não 24px.

### 3. Lei de Jakob
- **O que diz:** as pessoas passam a maior parte do tempo em outros sites e esperam que o seu funcione igual.
- **Regra:**
  - o logo leva ao início;
  - a busca fica no topo;
  - o carrinho fica no canto de cima (loja) ou no botão flutuante (app de rua);
  - o menu fica à esquerda no computador;
  - ícone sempre com o mesmo significado (os ícones Lucide do padrão);
  - nenhum gesto escondido que a pessoa precise adivinhar.
- **Exemplo:** o checkout segue a ordem do Mercado Livre e da Shopee (endereço, frete, pagamento, revisão). Não invente outra.

### 4. Lei da proximidade
- **O que diz:** coisas perto uma da outra parecem do mesmo grupo.
- **Regra:** rótulo colado no campo (4px), campos do mesmo assunto juntos e grupos separados por 24px ou mais. As ações de um item ficam no próprio item, não num botão solto no topo.
- **Exemplo:** no card do produto, preço, frete e parcelamento ficam juntos, longe do nome do vendedor.

### 5. Lei de Miller
- **O que diz:** a memória de curto prazo guarda uns 7 itens de cada vez.
- **Regra:** informação em blocos:
  - máscaras: `123.456.789-00`, `(11) 98765-4321`, `R$ 1.234,56`;
  - formulário longo em seções (`.yn-form-section`);
  - número grande sempre formatado;
  - nunca pedir para a pessoa lembrar algo de outra tela: mostre o contexto (cliente, pedido) no topo.
- **Exemplo:** o código de rastreio aparece em grupos e tem botão de copiar.

### 6. Limiar de Doherty
- **O que diz:** se o sistema responde em menos de 0,4 segundo, a pessoa continua no ritmo; acima disso, ela se distrai.
- **Regra:**
  - o botão muda na hora (`aria-busy`, "Salvando");
  - a tela mostra o resultado antes de o servidor confirmar, quando é seguro;
  - esqueleto (`.yn-skeleton`) quando a carga demora;
  - lista grande paginada no banco;
  - tela principal abrindo em até 2 segundos no 4G.
- **Exemplo:** mover um card no funil muda a coluna na hora; se o servidor recusar, o card volta e um aviso explica.

### 7. Efeito Von Restorff
- **O que diz:** o que é diferente do resto é o que a pessoa lembra.
- **Regra:** só uma coisa se destaca por tela. A cor da marca vai só na ação principal, no item ativo do menu e na seleção. Cor de status só quando pede atenção. Nada piscando.
- **Exemplo:** na lista de pedidos, só "Atrasado" fica em vermelho; o resto fica neutro.

### 8. Lei de Fitts (distância)
- **O que diz:** quanto mais longe o alvo, mais tempo para chegar nele.
- **Regra:**
  - ações usadas em sequência ficam juntas;
  - no celular, a ação principal fica no alcance do polegar: rodapé fixo do formulário, abas embaixo ou botão flutuante;
  - ação perigosa (Excluir) fica longe da principal.
- **Exemplo:** no app do representante, "Adicionar" e "Carrinho" ficam embaixo, onde o dedo já está.

### 9. Efeito de posição serial
- **O que diz:** de uma lista, lembra-se melhor do primeiro e do último item.
- **Regra:** no menu, o item mais usado vai primeiro e o segundo mais importante vai por último. Na lista, o que pede ação vai no topo (atrasados, sem resposta). Nas abas embaixo, Início fica na ponta esquerda e Carrinho ou Pedidos na direita.
- **Exemplo:** na fila do SAC, os casos vencendo aparecem primeiro, não os mais antigos.

### 10. Regra do pico-fim
- **O que diz:** a pessoa julga a experiência pelo momento mais forte e pelo final, não pela média.
- **Regra:** o momento de sucesso é caprichado, com confirmação clara e o próximo passo ("Pedido #4821 enviado. O faturamento já recebeu. Ver pedido"). O fim de um fluxo nunca é tela vazia nem erro genérico. Na loja, a mensagem pós-venda e a de entrega no WhatsApp contam como fim.
- **Exemplo:** depois de pagar, a tela mostra o prazo de entrega e o link para acompanhar, não só "Obrigado".

### 11. Efeito Zeigarnik
- **O que diz:** o que ficou pela metade gruda na cabeça e puxa a pessoa de volta.
- **Regra:**
  - rascunho salvo sozinho;
  - "Alterações não salvas" no rodapé do formulário;
  - progresso do cadastro ("3 de 5");
  - carrinho lembrado entre visitas;
  - pendências com contador no menu (`.yn-count`).
- **Exemplo:** o pedido começado no celular sem internet continua lá quando a conexão volta.

### 12. Navalha de Occam
- **O que diz:** entre duas soluções que resolvem, a mais simples é a melhor.
- **Regra:** todo campo, tela ou etapa precisa de motivo; o que ninguém usa sai. Uma tela que resolve é melhor que duas. Isso também é LGPD: dado que não é pedido não vaza (regra 6 de [07](07-diagnostico-e-conformidade.md)).
- **Exemplo:** cadastro de cliente da loja pede nome, e-mail e telefone. CPF só no checkout, para a nota.

### 13. Lei de Tesler
- **O que diz:** toda tarefa tem uma complexidade que não some; ou o sistema carrega, ou a pessoa carrega.
- **Regra:**
  - o sistema faz o trabalho chato: CEP preenche o endereço, frete e total calculados sozinhos;
  - valor padrão bem escolhido (representante e tabela de preço do cliente já marcados);
  - importar planilha em vez de digitar;
  - preço sempre recalculado no servidor.
- **Exemplo:** o representante escolhe o cliente e o sistema já traz a condição de pagamento dele.

### 14. Lei de Postel
- **O que diz:** aceite o que a pessoa digitar do jeito que ela digitar, e devolva sempre no formato certo.
- **Regra:**
  - aceitar CPF com ou sem ponto, telefone com ou sem 55 e DDD, valor com vírgula ou ponto, texto colado com espaços sobrando;
  - guardar padronizado ([03](03-dados.md));
  - o erro diz o formato certo, com exemplo, e nunca apaga o que foi digitado.
- **Exemplo:** colar "(11) 9 8765-4321" no campo de WhatsApp funciona e grava `5511987654321`.

### 15. Lei de Murphy
- **O que diz:** se algo pode dar errado, vai dar.
- **Regra:** pense no erro antes de acontecer:
  - sem internet: fila que reenvia sem duplicar;
  - clique duplo: botão trava enquanto grava;
  - dado faltando: "A cadastrar", nunca inventado;
  - integração parada: faixa no topo;
  - excluir: confirmação com o nome do item e, quando der, "Desfazer";
  - backup testado.
- **Exemplo:** se o ERP cair, o pedido fica na fila com status "Aguardando ERP" e ninguém perde venda.

### 16. Lei da semelhança
- **O que diz:** coisas parecidas parecem ter a mesma função.
- **Regra:** mesma ação, mesmo visual, em todo o sistema (componentes `yn-*`). Nunca dois visuais para a mesma ação, nem o mesmo visual para ações diferentes. Um link nunca parece botão de perigo.
- **Exemplo:** "Pago" é a mesma etiqueta verde na lista, na ficha e no relatório.

### 17. Conectividade uniforme
- **O que diz:** coisas ligadas por linha ou dentro da mesma caixa parecem relacionadas, mais até do que coisas só próximas.
- **Regra:** o que é do mesmo assunto fica no mesmo card (`.yn-card`) ou ligado por linha (`.yn-steps`, `.yn-timeline`). Para separar assuntos, use outra caixa ou um divisor.
- **Exemplo:** o histórico do pedido usa uma linha ligando as etapas, do recebido ao entregue.

### 18. Lei de Parkinson
- **O que diz:** a tarefa se espalha até ocupar todo o tempo disponível.
- **Regra:** prazo visível e verdadeiro (`.yn-deadline`): tempo para responder no SAC, data da próxima ligação no CRM, validade da proposta. Urgência falsa é proibida ("só hoje" que não é só hoje; regra 12 de [07](07-diagnostico-e-conformidade.md)).
- **Exemplo:** "Responder em 12 min" no topo da conversa faz o atendente responder antes.

### 19. Carga cognitiva
- **O que diz:** é o esforço mental que a tela exige. Quanto menos, melhor.
- **Regra:**
  - um assunto por tela;
  - texto curto, com verbo no começo;
  - palavras do negócio, nunca jargão técnico ("Pedido não enviado ao ERP", não "Erro 500");
  - valor padrão sempre que der;
  - opção avançada escondida até precisar.
- **Exemplo:** o filtro de pedidos abre com "Este mês" e "Meus pedidos" já escolhidos.

### 20. Efeito gradiente de meta
- **O que diz:** quanto mais perto da meta, mais a pessoa se esforça.
- **Regra:** mostrar quanto falta:
  - régua de meta (`.yn-meter`) para representante e vendedor;
  - etapas do cadastro e do checkout;
  - "Faltam R$ 40,00 para o frete grátis".

  Começar com progresso quando é verdade (ex.: a primeira etapa já concluída).
- **Exemplo:** "Faltam 3 clientes para a meta do mês" na tela inicial do representante.

## Como conferir uma tela

Antes de mandar uma tela para aprovação, responda:

1. Qual é a **uma** ação principal? Ela é o botão mais forte e fica no alcance do dedo? (1, 2, 7, 8)
2. Funciona como os sites que a pessoa já usa? (3, 16)
3. Dá para entender os grupos sem ler tudo? (4, 5, 17)
4. Tem algo que dá para tirar? (12, 19)
5. O sistema fez o trabalho chato e aceitou o que a pessoa digitou? (13, 14)
6. Como fica quando dá errado, quando demora e quando dá certo? (6, 10, 15)
7. A pessoa sabe o que falta e até quando? (11, 18, 20)
8. O mais importante está no começo do menu e no topo da lista? (9)
