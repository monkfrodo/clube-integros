/* ===== CONFIGURAÇÃO — só mexa aqui ===== */
const CHECKOUT_ANUAL   = "https://pay.assiny.com.br/567707/node/lDJo3D";   // plano anual (R$ 597)
const CHECKOUT_MENSAL  = "https://pay.assiny.com.br/vHsATx/node/P7CRt7";   // plano mensal (R$ 97)
const OFFER_END        = null;  // ex.: "2026-10-31T23:59:00-03:00". null esconde a data
/* ======================================= */

document.querySelectorAll("[data-checkout]").forEach(a => {
  if (CHECKOUT_ANUAL !== "#") a.href = CHECKOUT_ANUAL;
});
document.querySelectorAll("[data-checkout-monthly]").forEach(a => {
  if (CHECKOUT_MENSAL !== "#") a.href = CHECKOUT_MENSAL;
});

document.getElementById("year").textContent = new Date().getFullYear();

if (OFFER_END) {
  const end = new Date(OFFER_END);
  if (end > new Date()) {
    const dia = end.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
    const hora = end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const txt = `Reabertura até ${dia}, às ${hora}`;
    ["deadline", "deadline-2"].forEach(id => {
      const el = document.getElementById(id);
      if (el) { el.textContent = txt; el.hidden = false; }
    });
  }
}

// Barra fixa no celular: aparece depois da primeira dobra e some quando a oferta está na tela
(function () {
  const bar = document.getElementById("sticky");
  const hero = document.querySelector(".entry");
  const offer = document.getElementById("oferta");
  if (!bar || !hero || !offer || !("IntersectionObserver" in window)) return;
  let heroOut = false, offerIn = false;
  const update = () => { bar.hidden = !(heroOut && !offerIn); };
  new IntersectionObserver(es => { heroOut = !es[0].isIntersecting; update(); }).observe(hero);
  new IntersectionObserver(es => { offerIn = es[0].isIntersecting; update(); }, { threshold: .05 }).observe(offer);
})();
