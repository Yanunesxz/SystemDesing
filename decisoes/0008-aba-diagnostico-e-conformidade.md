# 0008 — Aba Diagnóstico com 17 regras de conformidade, por perfil

- **Data:** 2026-10-21
- **Status:** aceita

## Contexto

Regras de lei, acessibilidade e responsivo ficavam espalhadas, e ninguém conferia se cada sistema seguia. Página sem política de privacidade, caixa de oferta já marcada, Pixel rodando antes do aceite, imagem sem descrição e quadro rolando de lado com metade do monitor vazia só apareciam quando alguém reclamava.

Ao mesmo tempo, nem toda regra vale para todo sistema: um CRM interno não precisa de aviso de cookies nem de política de reembolso.

## Decisão

- Todo sistema tem a aba **Diagnóstico** (`/diagnostico`, só administrador), montada pelo `ui/diagnostico.js`. Ela testa 17 regras nas páginas do próprio sistema, em várias larguras e nos dois temas.
- As 17 regras: política de privacidade, termos, aviso de cookies, política de reembolso, formulários na LGPD, só dados necessários, scripts de tracking, acessibilidade, alt nas imagens, contraste, navegação por teclado, sem promessas falsas, copyright das imagens, dados da empresa, conformidade LGPD, riscos jurídicos e responsivo ao espaço disponível.
- **Cada sistema segue só o que faz sentido para ele.** Um perfil de quatro perguntas (página pública, vende online, rastreamento, dado pessoal) decide quais regras valem; as outras aparecem como "Não se aplica", com o motivo.
- O que dá para testar sozinho é automático; o resto vira lista para conferir.

## Alternativas consideradas

- **Só checklist em documento:** ninguém confere depois da entrega.
- **Ferramenta paga de acessibilidade ou de cookies:** custo por sistema e não cobre as regras do padrão (crédito, largura, perfil).
- **Todas as regras em todo sistema:** obriga sistema interno a ter aviso de cookies e reembolso sem motivo, e a lista vira ruído.

## Consequências

- Componentes novos: `.yn-audit`, `.yn-consent` (aviso de cookies) e `.yn-legal` (rodapé com os dados da empresa). Script novo: `ui/diagnostico.js`.
- `templates/vercel.json` passa de `X-Frame-Options: DENY` para `SAMEORIGIN` + `frame-ancestors 'self'`: o próprio sistema precisa abrir as suas páginas para testá-las; outro site continua sem poder.
- Modelos de páginas legais em `templates/legal/`.
- O perfil do sistema entra no `CLAUDE.md` de cada sistema.
- O resultado é alerta técnico, não parecer jurídico: os itens em vermelho vão para um advogado.
