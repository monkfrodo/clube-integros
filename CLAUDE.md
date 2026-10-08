# Clube Íntegros — página de reabertura

## O que é
Página de vendas estática do Clube Íntegros (plano anual R$ 597, mensal R$ 97). HTML, CSS e JS puros, sem build.

## Produção
- Domínio: `clube.integros.org`
- Hospedagem: Cloudflare Pages, projeto `clube-integros` (`clube-integros.pages.dev`)
- DNS: CNAME `clube` apontando para `clube-integros.pages.dev`, gerenciado na Hostinger

## Deploy
Todo push em `main` roda `.github/workflows/deploy.yml`, que publica a pasta via `wrangler pages deploy`. Os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` ficam no repositório. Não rodar `wrangler pages deploy` manual em produção.

## Configuração da oferta
Topo do `main.js`: links de checkout (anual e mensal) e `OFFER_END` (data final da reabertura, `null` esconde).

## Imagens
`img/`: pinturas de domínio público (Met e Cleveland Museum of Art). Créditos no rodapé do `index.html`.
