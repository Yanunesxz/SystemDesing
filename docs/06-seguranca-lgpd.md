# 06 — Segurança e LGPD

## Segredos (tokens, senhas, chaves de API)

1. Ficam em variável de ambiente (`.env` local, painel de segredos na hospedagem, Secrets do Supabase e do GitHub). **Nunca** no código, no README, na planilha, no print do grupo ou **colado no chat com a IA**.
2. `.env` está no `.gitignore` de todo projeto. Sempre.
3. **Vazou? Revogue na hora** no painel da plataforma (Supabase, Meta, Anthropic, ERP) e gere outro. Apagar o commit ou a mensagem não adianta: o histórico guarda tudo. Segredo que passou pelo chat **já vazou**.
4. Um token por sistema. Se um vazar, você revoga só ele.
5. Nada de valor padrão para credencial no código (`password || "admin"`). Variável obrigatória faltando faz o servidor **não subir**.
6. Nada de usuário e senha de exemplo no README ou em seed que vá para produção.
7. Repositório público (como este): nem custo, nem margem, nem fornecedor, nem nome ou dado de cliente.
8. Arquivo com dado do cliente (planilha de preços, backup, export) **nunca** entra no Git.

## Contas

- **Autenticação em dois fatores (2FA)** em: Supabase, Vercel, Railway, GitHub, Meta Business, Google, ERP, banco, gateway de pagamento.
- Cada pessoa da equipe tem o próprio acesso. Senha compartilhada não tem dono quando dá problema.
- Saiu alguém da equipe: remover acesso no mesmo dia.

## Acesso aos dados: a regra mora no banco

**A tela esconder o botão não é segurança.** Qualquer pessoa logada consegue chamar a API do Supabase direto, sem a tela.

| Regra | Como |
|---|---|
| **RLS obrigatória em toda tabela** | Com políticas **por papel e por dono**, espelhando exatamente o que a tela permite. Ex.: o representante só lê os clientes e pedidos em que `owner_id = auth.uid()` |
| Proibido "logado = acesso a tudo" | Política `using (auth.role() = 'authenticated')` sem mais nada é um furo, não uma política |
| Papel protegido | Ninguém altera o **próprio** papel ou permissões. Coluna de papel só muda por gestor, protegida por gatilho ou política |
| Chave `service_role` | Só no servidor (Edge Function, API). Nunca no navegador, nunca com prefixo `VITE_` |
| API própria com `service_role` | Se o isolamento ficar só no código da API, registre a decisão em `docs/decisoes/` e cubra com testes de rota por papel |
| Função no servidor | Confere a sessão **e** o papel no banco antes de agir; não confia no que o navegador diz |
| Teste de acesso | Antes de publicar: logar com um usuário de cada papel e tentar ler e alterar o que não devia, **pela API** |

## Login e sessão

- Login pelo Supabase Auth (ou JWT próprio com acesso curto, ~1 h, e renovação separada que não vale nas rotas comuns).
- Cadastro aberto desligado: quem cria usuário é o admin, com **senha provisória** mostrada **uma vez** e troca obrigatória no primeiro acesso.
- Senha provisória sem caracteres ambíguos (`0/O`, `1/l`).
- Quem perde o acesso tem a sessão derrubada.
- **Nunca guardar senha no navegador**, nem em hash. App offline: desbloqueio local por PIN com derivação de chave (PBKDF2 ou Argon2, com *salt*), ou exigir estar online no primeiro acesso do dia.
- Link compartilhável (convite, vitrine): token aleatório guardado **só como hash** no banco, com validade e, se for convite, uso único.
- Limite de tentativas no login (ex.: 10 por minuto).

## Navegador e hospedagem

- `vercel.json` com cabeçalhos de segurança (modelo em [`templates/vercel.json`](../templates/vercel.json)): `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, HSTS.
- CORS restrito ao domínio do sistema. `*` só em função pública de leitura.
- Webhook com segredo no cabeçalho ou HMAC, nunca na URL ([04](04-integracoes.md)).

## Arquivos

- Bucket do Storage **privado** por padrão. A tela mostra o arquivo por **URL assinada** de curta duração.
- Público só para o que é público de verdade (logo, foto de produto do catálogo).
- Foto, documento ou áudio enviado por cliente **nunca** em bucket público.

## LGPD — dados de clientes

| Regra | Na prática |
|---|---|
| Coletar só o necessário | Precisa de CPF para emitir NF. Não precisa de data de nascimento para vender camiseta. |
| Marketing só com autorização | `marketing_opt_in = true` com data e canal registrados (`marketing_opt_in_at`). **Campanha confere isso antes de enviar.** Sem autorização, nada de campanha. |
| Consentimento antes de pedir dado | No atendimento, registre o consentimento com data antes de pedir documento ou foto. |
| Cliente pode pedir para sair | Pedido de exclusão ou "pare de mandar mensagem" é atendido em até 15 dias e registrado (`opt_out_at`). |
| Dado de marketplace é do pedido | Dados de comprador do ML e da Shopee servem **só** para entregar aquele pedido. Não importar para lista de marketing. |
| Canal público | Nenhum dado pessoal em resposta pública (Instagram, Reclame Aqui): a conversa vai para o privado. |
| Log não guarda dado pessoal | Mascarar: telefone `5511*****4321`, CPF `***.456.789-**`. Script imprime código, não nome. |
| Planilha com dado de cliente | Compartilhada só com quem precisa, nunca com "qualquer pessoa com o link". |

**Dado sensível** (LGPD, art. 11): saúde (inclusive foto de reação ou lesão), biometria, religião, opinião política. Exige base legal específica, bucket privado, acesso só de quem precisa e registro de quem viu.

## IA e dados

A IA (Claude API ou outra) é **operadora** dos dados: o que vai para ela sai do seu controle.

- Mande **o mínimo**: o resumo do caso em vez da conversa inteira; nunca CPF, documento ou dado de saúde se a tarefa não precisa.
- A IA **sugere**, não decide nem responde sozinha ao cliente.
- Registre no sistema que a IA é usada e para quê (política de privacidade do cliente).
- Relatório gerado por IA com nomes e valores de clientes só com autorização do cliente dono dos dados.

## Backup

- Banco de dados: backup automático diário (o Supabase faz no plano pago; no gratuito, exporte com frequência definida no sistema).
- Backup local nunca vai para o Git e não inclui hash de senha.
- Fluxos do n8n: exporte o JSON para o repositório `n8n-fluxos` a cada mudança.
