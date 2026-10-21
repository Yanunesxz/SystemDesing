# 07 — Diagnóstico e conformidade

Todo sistema da Yan Nunes tem a aba **Diagnóstico**. Ela testa 17 regras de lei, acessibilidade e responsivo nas páginas do próprio sistema e diz o que está certo, o que falhou e o que precisa ser conferido por uma pessoa.

**Cada sistema segue só o que faz sentido para ele.** Quatro perguntas (o perfil) decidem quais regras valem. Um CRM interno não precisa de aviso de cookies nem de política de reembolso; uma loja virtual precisa de tudo. A regra que não vale aparece como **Não se aplica**, com o motivo.

> Isto é um alerta técnico, não parecer jurídico. Leis e guias mudam: confira o texto atual da lei e leve os itens em vermelho a um advogado antes de publicar.

## O perfil do sistema

| Pergunta | Opção | Sim, por exemplo | Não, por exemplo |
|---|---|---|---|
| Tem página aberta ao público, sem login? | `publico` | Site, loja virtual, landing page, catálogo público, formulário de contato | CRM, SAC, app de representante: tudo atrás do login |
| Vende ou cobra online? | `vende` | Checkout, link de pagamento, assinatura | Pedido que vai para o ERP e é faturado fora |
| Usa rastreamento? | `rastreamento` | Meta Pixel, Google Analytics, Tag Manager, TikTok, Hotjar, Clarity | Nenhum script de terceiros que mede visita ou grava tela |
| Guarda dado pessoal? | `dadosPessoais` | Nome, e-mail, telefone, CPF, endereço de cliente | Painel só com números da empresa |

O perfil fica no `CLAUDE.md` do sistema e no código da aba. Mudou o sistema (abriu uma loja, colocou um Pixel)? Mude o perfil no mesmo PR.

## Quais regras valem para cada tipo

| # | Regra | Vale quando | CRM ou SAC interno | App de representante | Site com formulário | Loja virtual |
|---|---|---|---|---|---|---|
| 1 | Política de privacidade | Página pública | — | — | Sim | Sim |
| 2 | Termos de serviço | Página pública ou vende | — | — | Sim | Sim |
| 3 | Aviso de cookies | Página pública com rastreamento | — | — | Se rastrear | Sim |
| 4 | Política de reembolso | Vende | — | — | — | Sim |
| 5 | Formulários na LGPD | Página pública com dado pessoal | — | — | Sim | Sim |
| 6 | Só dados necessários | Dado pessoal | Sim | Sim | Sim | Sim |
| 7 | Scripts de tracking | Sempre | Sim | Sim | Sim | Sim |
| 8 | Acessibilidade | Sempre | Sim | Sim | Sim | Sim |
| 9 | Alt nas imagens | Sempre | Sim | Sim | Sim | Sim |
| 10 | Contraste corrigido | Sempre | Sim | Sim | Sim | Sim |
| 11 | Navegação por teclado | Sempre | Sim | Sim | Sim | Sim |
| 12 | Sem promessas falsas | Página pública | — | — | Sim | Sim |
| 13 | Copyright das imagens | Página pública | — | — | Sim | Sim |
| 14 | Dados da empresa | Página pública | — | — | Sim | Sim |
| 15 | Conformidade LGPD | Dado pessoal | Sim | Sim | Sim | Sim |
| 16 | Riscos jurídicos | Sempre (resumo) | Sim | Sim | Sim | Sim |
| 17 | Responsivo ao espaço disponível | Sempre | Sim | Sim | Sim | Sim |

Um CRM interno fica com 9 regras; uma loja virtual, com as 17.

## As 17 regras

Cada regra diz o que é o certo e como a aba testa: **automático** (a aba confere sozinha), **conferir** (uma pessoa confirma) ou os dois.

### 1. Política de privacidade
- Página `/privacidade`: quem é a empresa, que dados coleta, para quê, com quem compartilha, por quanto tempo guarda, quem é o encarregado (DPO) e como pedir acesso, correção ou exclusão. Com a data da última atualização.
- Link no rodapé de toda página pública (`.yn-legal`) e perto de todo formulário.
- Modelo: [`templates/legal/politica-de-privacidade.md`](../templates/legal/politica-de-privacidade.md).
- **Teste:** automático (procura o link) + conferir o texto.
- **Base:** LGPD (Lei 13.709/2018), arts. 6º, 9º e 18.

### 2. Termos de serviço
- Página `/termos`: quem pode usar, o que é proibido, responsabilidades, cancelamento, foro e data.
- Modelo: [`templates/legal/termos-de-uso.md`](../templates/legal/termos-de-uso.md).
- **Teste:** automático (link) + conferir o texto.
- **Base:** Código Civil e Código de Defesa do Consumidor (Lei 8.078/1990).

### 3. Aviso de cookies
- Só em página pública que usa rastreamento. Cookie só de funcionamento (login, tema escolhido) dispensa o aviso.
- Componente `.yn-consent` na primeira visita, com **Recusar e Aceitar do mesmo tamanho e da mesma cor**, e Configurar.
- Nada de rastreamento antes do aceite. A escolha fica em `localStorage` com a chave `consentimento`: `{"analytics": false, "marketing": false, "em": "2026-10-21T14:00:00Z"}`.
- Página `/cookies` com a lista do que é usado, e um link "Preferências de cookies" no rodapé que reabre o aviso.
- **Teste:** automático (aviso existe, tem botão de recusar, cookie de rastreamento antes do aceite) + conferir em aba anônima.
- **Base:** LGPD, arts. 7º e 8º; guia de cookies da ANPD (confira a versão atual).

### 4. Política de reembolso
- Só se vende online. Página `/reembolso`:
  - arrependimento em 7 dias na compra online, com devolução do valor pago, frete incluído;
  - troca por defeito;
  - como pedir, prazos e forma de estorno.
- Link no rodapé e no checkout.
- Modelo: [`templates/legal/politica-de-reembolso.md`](../templates/legal/politica-de-reembolso.md).
- **Teste:** automático (link) + conferir o texto.
- **Base:** CDC, arts. 26 e 49; Decreto 7.962/2013.

### 5. Formulários na LGPD
- Todo formulário público com dado pessoal diz para que serve e tem link para a política de privacidade.
- Caixa de receber ofertas (e-mail, WhatsApp, SMS) **começa desmarcada** e é separada do envio. O aceite é gravado com data (`marketing_opt_in` e `marketing_opt_in_at`, ver [06-seguranca-lgpd.md](06-seguranca-lgpd.md)).
- **Teste:** automático (caixa pré-marcada, link para a política).
- **Base:** LGPD, arts. 7º, 8º e 9º.

### 6. Só dados necessários
- Cada campo pessoal tem um motivo: emitir nota, entregar, cobrar, falar com o cliente.
- Campo que nenhuma tela usa sai da tela e do banco.
- Dado sensível (saúde, alergia, religião, raça, biometria, vida sexual, filiação sindical, opinião política) só com base legal específica e acesso restrito.
- **Teste:** automático (lista campos sensíveis e campos como CPF, nascimento e renda) + conferir o motivo de cada um.
- **Base:** LGPD, art. 6º, III, e art. 11.

### 7. Scripts de tracking
- Lista de cada rastreador com o motivo, no `ESTADO.md` do sistema. Carregar só depois do aceite.
- **Sistema interno não rastreia**: gravação de tela (Hotjar, Clarity) mostra dado de cliente.
- **Teste:** automático (scripts, recursos carregados, variáveis globais e cookies de Meta, Google, TikTok, Hotjar, Clarity, LinkedIn, Pinterest, HubSpot, RD Station e outros).
- **Base:** LGPD, arts. 7º e 8º.

### 8. Acessibilidade
- `<html lang="pt-BR">`, um `h1` por tela, todo botão e campo com nome (texto, `<label>` ou `aria-label`), texto de 12px ou mais, zoom liberado (`user-scalable=no` é proibido).
- Telas principais testadas com o leitor de tela do celular (TalkBack ou VoiceOver).
- **Teste:** automático + conferir com leitor de tela.
- **Base:** Lei Brasileira de Inclusão (Lei 13.146/2015), art. 63; WCAG 2.2 nível AA.

### 9. Alt nas imagens
- Toda `<img>` tem `alt`: descreve a imagem ("Camiseta básica preta, frente") ou fica vazio (`alt=""`) se for só enfeite. Nunca o nome do arquivo.
- **Teste:** automático.
- **Base:** LBI, art. 63; WCAG 2.2, critério 1.1.1.

### 10. Contraste corrigido
- Texto normal com 4,5:1; texto grande (24px, ou 18,66px em negrito) com 3:1. **No tema claro e no escuro.**
- Use os tokens do padrão. Para a cor do cliente, use o gerador da vitrine.
- **Teste:** automático, nos dois temas (troca pelo `data-theme` do padrão). Texto sobre imagem ou degradê vai para "conferir".
- **Base:** LBI, art. 63; WCAG 2.2, critério 1.4.3.

### 11. Navegação por teclado
- Tudo que se clica é `<button>` ou `<a href>`, nunca `<div onClick>`.
- Tab percorre a tela na ordem de leitura e o foco sempre aparece. Enter e Espaço acionam, Esc fecha janela e menu. O foco nunca fica preso.
- **Teste:** automático (elemento que parece clicável mas o Tab não alcança, `tabindex` maior que 0) + conferir no teclado.
- **Base:** LBI, art. 63; WCAG 2.2, critérios 2.1.1 e 2.4.7.

### 12. Sem promessas falsas
- Nada que não dá para provar: "garantido", "100%", "cura", "o melhor do Brasil", "resultado em 7 dias", urgência que não é verdade ("só hoje", "últimas unidades").
- Produto regulado (cosmético, alimento, saúde) só promete o que o registro permite.
- **Teste:** automático (procura as expressões no texto) + conferir anúncios e posts, que ficam fora do sistema.
- **Base:** CDC, art. 37 (publicidade enganosa); Código do Conar; regras da Anvisa.

### 13. Copyright das imagens
- Cada imagem tem origem registrada no próprio `<img>`: `data-origem="propria"`, `"cliente"`, `"banco:Nome do banco"` ou `"licenca:CC-BY Autor"`.
- Nada copiado do Google, de concorrente ou de rede social.
- **Teste:** automático (imagem sem `data-origem`, imagem puxada de outro site) + conferir a licença.
- **Base:** Lei de Direitos Autorais (Lei 9.610/1998).

### 14. Dados da empresa
- Rodapé `.yn-legal` em toda página pública: razão social, CNPJ, endereço com CEP, e-mail e telefone.
- **Teste:** automático (procura CNPJ, CEP, e-mail e telefone no texto da página).
- **Base:** Decreto 7.962/2013, art. 2º; CDC.

### 15. Conformidade LGPD
Lista para conferir (registre onde está cada item no `ESTADO.md` do sistema):
- Encarregado (DPO) com nome e e-mail publicados na política.
- Canal para o titular pedir acesso, correção, exclusão e portabilidade, respondido dentro do prazo da lei.
- Base legal anotada para cada dado: contrato, obrigação legal, consentimento ou legítimo interesse.
- Prazo de guarda e de exclusão de cada dado.
- RLS por papel e por dono testada pela API (ver [06-seguranca-lgpd.md](06-seguranca-lgpd.md)).
- Contrato com cada operador (banco, hospedagem, WhatsApp, ERP) e onde os dados ficam guardados.
- Plano de incidente: quem avisa a ANPD e os titulares, e em quanto tempo.
- Registros de acesso guardados por 6 meses, se o sistema é oferecido ao público com fins econômicos.

**Base:** LGPD, arts. 6º, 18, 37, 41, 46 e 48; Marco Civil da Internet (Lei 12.965/2014), art. 15.

### 16. Riscos jurídicos
- Resumo automático das regras que falharam ou pedem atenção, com a lei de cada uma e o nível:
  - **Alto**, quando a regra falhou;
  - **Médio**, quando pede atenção.
- Comece pelos itens Alto e leve a lista a um advogado antes de publicar ou de mudar o que o sistema coleta.

### 17. Responsivo ao espaço disponível
- Nada de rolagem lateral na página, em nenhuma largura.
- **Tela de trabalho** (lista, quadro, tabela, painel, mensagens) usa toda a largura do monitor (`.yn-content`). Tela de formulário ou de leitura usa `.yn-content--narrow` (960px).
- Componente que mora num espaço menor que a tela (painel lateral, metade da tela) fica dentro de `.yn-container`. Assim ele se ajusta à largura de onde está, não só ao tamanho do aparelho. Ver [02-visual.md](02-visual.md#responsivo).
- **Teste:** automático:
  - rolagem lateral em cada largura, apontando o elemento que causa;
  - tela de trabalho que usa menos de 80% do espaço;
  - quadro ou tabela que rola de lado com espaço sobrando.

  Toque de 44px: conferir no celular.
- **Base:** padrão Yan Nunes; WCAG 2.2, critério 1.4.10.

## A aba Diagnóstico

**Onde fica:** endereço `/diagnostico`, no grupo **Sistema** do menu, com o ícone `stethoscope`.

**Quem vê:** só o administrador.
- A rota é protegida.
- O botão some do menu para quem não é administrador.
- A aba não lê nada do banco: abre as páginas com a sessão de quem está logado e só vê o que essa pessoa já vê.

**Como montar** (o script é o [`ui/diagnostico.js`](../ui/diagnostico.js), sem dependência):

```html
<section id="diagnostico" aria-label="Diagnóstico"></section>
<script src="https://cdn.jsdelivr.net/gh/Yanunesxz/SystemDesing@v0.3.0/ui/diagnostico.js"></script>
<script>
  YNDiagnostico.montar(document.getElementById("diagnostico"), {
    perfil: { publico: false, vende: false, rastreamento: false, dadosPessoais: true },
    paginas: ["/", "/clientes", "/pedidos", "/configuracoes"],
    larguras: [375, 1280, 1920]
  });
</script>
```

React (o mesmo script, carregado no `index.html` ou copiado para `src/lib/diagnostico.js` e importado):

```tsx
export function Diagnostico() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (ref.current) window.YNDiagnostico.montar(ref.current, { perfil: PERFIL, paginas: PAGINAS });
  }, []);
  return <section ref={ref} aria-label="Diagnóstico" />;
}
```

| Opção | Para que serve | Padrão |
|---|---|---|
| `perfil` | As quatro respostas do perfil | `{ publico: false, vende: false, rastreamento: false, dadosPessoais: true }` |
| `paginas` | Telas a testar. Coloque as principais e todas as públicas: início, cadastro, contato, checkout | `["/"]` |
| `larguras` | Larguras do teste de responsivo | `[375, 1280, 1920]` |
| `esperar` | Milissegundos para a tela carregar os dados antes de ler | `1500` |

**Resultado:**
- cada regra recebe **OK**, **Atenção**, **Falhou**, **Conferir** ou **Não se aplica**;
- cada uma traz o que foi achado, como resolver e a base legal;
- **Copiar relatório** gera um texto para colar no chat da IA ou mandar ao suporte.

**Cuidados:**
- Abrir a página é igual a visitar. Não liste página que grava alguma coisa só de abrir. O analytics pode contar a visita.
- O servidor precisa deixar o sistema abrir as próprias páginas dentro dele: `X-Frame-Options: SAMEORIGIN` e `frame-ancestors 'self'` (já no [`templates/vercel.json`](../templates/vercel.json)). Com `DENY`, a aba avisa que não conseguiu abrir.
- O teste de contraste no tema escuro troca o `data-theme` da página por um instante. Sistema que faz o escuro de outro jeito (classe `.dark`) é avisado: o tema escuro precisa vir dos tokens.

**Quando rodar:**
- antes de todo deploy que muda tela;
- depois de colocar qualquer script de terceiros;
- uma vez por mês.

Os itens **Conferir** confirmados vão para o `ESTADO.md` com data e quem conferiu.

## O que a aba entende (convenções)

| Convenção | Onde |
|---|---|
| Rodapé legal `.yn-legal` com links e dados da empresa | Toda página pública |
| Rotas `/privacidade`, `/termos`, `/reembolso`, `/cookies` | Páginas legais |
| Aviso `.yn-consent` + `localStorage` `consentimento` | Página pública com rastreamento |
| `data-origem` no `<img>` | Toda foto ou ilustração de página pública |
| `.yn-content` / `.yn-content--narrow` / `.yn-container` | Telas de trabalho, formulário e texto, áreas menores |
| `data-theme` no `<html>` | Tema claro e escuro |

## Páginas legais: modelos

Em [`templates/legal/`](../templates/legal/): política de privacidade, termos de uso, política de reembolso e política de cookies. São **esqueletos com as seções certas**, não texto pronto: cada sistema preenche com a sua realidade e um advogado revisa antes de publicar.
