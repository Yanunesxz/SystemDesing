# 01 — Marca

Quem é a Yan Nunes, como ela se apresenta e como a marca aparece nos sistemas.

## Identidade

| | |
|---|---|
| **Nome** | YAN NUNES |
| **Assinatura** | Sistemas & Consultoria |
| **Nome da empresa** | `TODO(definir)`: foram exploradas opções como YNX e Nunex. Até decidir, a marca é YAN NUNES. |
| **Visão** | Começa como marca pessoal e cresce para uma empresa de tecnologia, com equipe de desenvolvedores, clientes recorrentes e produtos próprios. |

## Posicionamento

> **A Yan Nunes entende a operação da empresa e transforma problemas em soluções tecnológicas.**

Não vende "um sistema pronto": entende o problema e cria ou adapta a solução. Atua de forma ampla, sem nicho único:

- sistemas personalizados;
- CRM;
- sistemas para representantes de vendas;
- sistemas de produção;
- automações e integrações;
- consultoria em tecnologia.

**Nunca** se apresentar só como "faço sistemas" ou "desenvolvedor freelancer". O assunto é a operação do cliente; o sistema é a ferramenta.

## Atributos

| Atributo | Na prática |
|---|---|
| **Rápido** | Responde no mesmo dia, entrega por etapas curtas, mostra algo funcionando cedo. |
| **Excelente** | Visual limpo, dado correto, sistema que não quebra. Nada de "depois eu arrumo". |
| **Certeiro** | Resolve o problema que importa, sem enrolação nem funcionalidade inútil. |

A marca deve parecer **tecnológica, séria e atual**. Pessoal e autoral, mas **nunca amadora**.

## Arquitetura de marca

```
YAN NUNES — Sistemas & Consultoria      ← marca-mãe
├── Yan Nunes CRM
├── Yan Nunes Sales                     ← sistema para representantes de vendas
├── Yan Nunes Production
└── Yan Nunes Systems                   ← sistemas sob medida
```

- Nome do produto = **YAN NUNES** + nome curto em inglês, uma palavra.
- Na interface, o produto aparece ao lado da assinatura: `YAN NUNES · CRM` (classe `.yn-sidebar__product`).
- Quando o nome da empresa for decidido, ele substitui "Yan Nunes" nos produtos. A estrutura continua a mesma.

## Símbolo e logo

**Situação atual:** existe só uma imagem 3D (prata metálico com brilho, em fundo preto). Funciona como capa e post, mas **não** como logo de sistema.

**O conceito:** monograma geométrico **Y + N**, com construção que passa ideia de conexão, integração e tecnologia. A referência são marcas com um símbolo que se reconhece sozinho (Nike, Playboy, Pringles).

**Versões obrigatórias** `TODO(definir)`: o vetor ainda não existe.

| Versão | Uso |
|---|---|
| Símbolo + nome + assinatura, plano, preto | Fundo claro: site, proposta, PDF |
| Símbolo + nome + assinatura, plano, branco | Fundo escuro: site, Instagram, apresentação |
| Só símbolo, preto e branco | Avatar, crédito "Criado por", marca d'água |
| Símbolo simplificado para 16–32px | Favicon, ícone de app (os cortes internos fecham em tamanho pequeno) |
| Versão 3D atual | **Só** capa, post e apresentação. Nunca em sistema. |

**Regras do vetor:**

- SVG, cor sólida, sem degradê, brilho ou sombra.
- Área de respiro em volta do símbolo = altura da haste do N.
- Tamanho mínimo: 16px (versão simplificada); 24px (versão completa do símbolo).
- Texto do logo em Manrope: "YAN" em Bold, "NUNES" em Regular; "SISTEMAS & CONSULTORIA" em Medium, maiúsculas, espaçamento largo, com uma linha fina de cada lado.

## Crédito "Criado por"

Todo sistema entregue a um cliente leva, no fim da página, uma linha pequena:

```
Criado por Yan Nunes
```

- Componente `.yn-credit` (ver [02-visual.md](02-visual.md#crédito-criado-por)).
- Sempre neutro (cinza): **nunca** na cor do cliente.
- Como marca d'água: uma linha de 12px, sem moldura, sem linhas dos lados e sem maiúsculas. Não compete com o sistema.
- Quando o símbolo em vetor existir, ele entra pequeno antes do nome.
- O link aponta para o site da Yan Nunes, com o texto "Yan Nunes" (sem palavras de propaganda no link). `TODO(definir)`: URL do site.
- **Coloque no contrato** que o crédito faz parte da entrega. Cliente que quiser tirar paga a versão sem marca (white label).

## Voz da marca Yan Nunes

Vale para site, Instagram, propostas, e-mails e textos dentro dos sistemas.

1. **Fala da operação, não da tecnologia.** "Seus representantes lançam o pedido no celular e o faturamento recebe na hora", não "sistema web responsivo com API REST".
2. **Frase curta, verbo no começo.** "Salvar pedido", "Ver clientes", "Gerar relatório".
3. **Sem jargão e sem exagero.** Nada de "solução inovadora de ponta" ou "revolucionário".
4. **Mostra resultado com número.** "Pedido que levava 2 dias agora leva 10 minutos."
5. **Trata por "você"** e explica como quem já resolveu esse problema antes.

**Mensagens do sistema:**

| Situação | Errado | Certo |
|---|---|---|
| Sucesso | "Operação realizada com sucesso!" | "Pedido salvo." |
| Erro | "Erro inesperado." | "Não deu para salvar: o CNPJ está incompleto." |
| Vazio | "Nenhum registro encontrado." | "Nenhum pedido ainda. Lance o primeiro em Novo pedido." |
| Confirmação | "Tem certeza?" | "Excluir o pedido #4821? Isso não pode ser desfeito." |

> Mensagens para o **cliente final de uma loja** (WhatsApp, rastreio, pós-venda) ficam em [dominios/ecommerce.md](dominios/ecommerce.md).

## Público

`TODO(definir)`: perfil do cliente ideal. Por exemplo: porte da empresa, setor, quem decide a compra e qual dor faz ela procurar a Yan Nunes.
