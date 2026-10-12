# Clube Íntegros — redesign em revisão

## O que é
Página de vendas estática do Clube Íntegros (plano anual R$ 597, mensal R$ 97). HTML, CSS e JS puros, sem build. Redesign fornecido por Kevin e convertido do export do editor; preservar a copy e a direção visual da peça.

## Produção
- Domínio: `clube.integros.org`
- Hospedagem: Cloudflare Pages, projeto `clube-integros` (`clube-integros.pages.dev`)
- DNS: CNAME `clube` apontando para `clube-integros.pages.dev`, gerenciado na Hostinger

## Deploy
Todo push em `main` roda `.github/workflows/deploy.yml`, que publica a pasta via `wrangler pages deploy`. Os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` ficam no repositório. Não rodar `wrangler pages deploy` manual em produção.

## Configuração da oferta
Os links de checkout estão no `index.html`, confirmados contra o JavaScript da página pública em 12/10/2026. Confirmar os termos comerciais da nova copy antes de publicar.

## Imagens
O redesign referencia imagens externas de Wikimedia Commons e `fundamentos.integros.org`. A pasta `img/` anterior permanece preservada. Revisar disponibilidade e créditos antes de publicar.
