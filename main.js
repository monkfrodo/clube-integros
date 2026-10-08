/* ===== CONFIGURAÇÃO — só mexa aqui ===== */
const CHECKOUT_URL = "#";      // link do checkout (Hotmart, Kiwify, Stripe...)
const OFFER_END    = null;     // ex.: "2026-10-31T23:59:00-03:00" — null esconde a data
/* ======================================= */

document.querySelectorAll("[data-checkout]").forEach(a => {
  if (CHECKOUT_URL !== "#") a.href = CHECKOUT_URL;
});

document.getElementById("year").textContent = new Date().getFullYear();

// Data-limite (só aparece se você definir OFFER_END)
if (OFFER_END) {
  const end = new Date(OFFER_END);
  const fmt = end.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
  const hora = end.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  const txt = `A reabertura vai até ${fmt}, às ${hora}`;
  ["deadline", "deadline-2"].forEach(id => {
    const el = document.getElementById(id);
    if (el && end > new Date()) { el.textContent = txt; el.hidden = false; }
  });
}

// Pinturas reais: se img/*.jpg existir, entra por cima da tela pintada.
document.querySelectorAll(".plate").forEach(p => {
  const m = /url\(['"]?(.+?)['"]?\)/.exec(p.getAttribute("style") || "");
  if (!m) return;
  const img = new Image();
  img.onload = () => p.classList.add("is-loaded");
  img.src = m[1];
});

// Revelação ao rolar
const targets = document.querySelectorAll(".prose p, .catalog li, .col, .ledger, .ticket, .after, details, .work, blockquote, .closing__inner > *");
targets.forEach(t => t.classList.add("fade"));
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: .12 });
  targets.forEach(t => io.observe(t));
} else {
  targets.forEach(t => t.classList.add("in"));
}
