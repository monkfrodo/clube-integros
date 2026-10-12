(() => {
  'use strict';

  const $ = (selector) => document.querySelector(selector);
  const sections = [...document.querySelectorAll('[data-screen-label]')];
  const label = $('#section-label');
  const progress = $('#scroll-progress');
  const rail = [...document.querySelectorAll('[data-go-section]')];
  const mobileBar = $('.mobile-bar');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = matchMedia('(pointer: fine)');
  let scrollQueued = false;

  function updateScroll() {
    scrollQueued = false;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0})`;

    if (!reducedMotion.matches) {
      document.querySelectorAll('[data-par]').forEach((element) => {
        const box = element.parentElement.getBoundingClientRect();
        const offset = (box.top + box.height / 2 - innerHeight / 2) * Number(element.dataset.par);
        element.style.transform = `translate3d(0,${offset}px,0)`;
      });
    }

    let active = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top < innerHeight * 0.45) active = index;
    });
    const name = sections[active]?.dataset.screenLabel.replace(/^\d+\s*/, '') || '';
    if (label) label.textContent = `[ ${String(active + 1).padStart(2, '0')} / ${String(sections.length).padStart(2, '0')} · ${name} ]`;
    rail.forEach((button, index) => {
      const current = active === index;
      button.setAttribute('aria-current', current ? 'location' : 'false');
      const title = button.querySelector('span:first-child');
      const line = button.querySelector('span:last-child');
      title.style.opacity = current && innerWidth >= 1440 ? '1' : '0';
      line.style.width = current ? '28px' : '12px';
      line.style.background = current ? 'var(--acc,#b3121b)' : 'rgba(241,237,232,.35)';
    });
    if (mobileBar) mobileBar.hidden = !(innerWidth < 760 && scrollY > 700 && !/Oferta|Final/.test(name));
  }

  function requestScroll() {
    if (!scrollQueued) {
      scrollQueued = true;
      requestAnimationFrame(updateScroll);
    }
  }
  window.addEventListener('scroll', requestScroll, { passive: true });
  window.addEventListener('resize', requestScroll, { passive: true });
  requestScroll();

  rail.forEach((button, index) => button.addEventListener('click', () => {
    const section = sections[index];
    if (section) window.scrollTo({
      top: section.getBoundingClientRect().top + scrollY - 60,
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
  }));

  const symptomButtons = [...document.querySelectorAll('[data-symptom]')];
  const symptomCount = $('#symptom-count');
  const symptomVerdict = $('#symptom-verdict');
  function updateSymptoms() {
    const count = symptomButtons.filter((button) => button.getAttribute('aria-pressed') === 'true').length;
    if (symptomCount) symptomCount.textContent = String(count);
    if (symptomVerdict) symptomVerdict.textContent = count === 0
      ? 'Nenhum? Então talvez o Clube não seja pra você.'
      : count < 3 ? 'Já é o suficiente pra desconfiar da conta.'
      : 'O problema não é você. É o modelo.';
  }
  symptomButtons.forEach((button) => button.addEventListener('click', () => {
    const pressed = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(pressed));
    const box = button.querySelector('span:first-child');
    const text = button.querySelector('span:last-child');
    box.textContent = pressed ? '✓' : '';
    box.style.background = pressed ? 'var(--acc,#b3121b)' : 'transparent';
    box.style.borderColor = pressed ? 'var(--acc,#b3121b)' : 'rgba(241,237,232,.4)';
    text.style.color = pressed ? '#f1ede8' : '#c9c2ba';
    updateSymptoms();
  }));
  updateSymptoms();

  document.querySelectorAll('[data-faq]').forEach((button) => button.addEventListener('click', () => {
    const opening = button.getAttribute('aria-expanded') !== 'true';
    document.querySelectorAll('[data-faq]').forEach((other) => {
      other.setAttribute('aria-expanded', 'false');
      other.querySelector('span:last-child').textContent = '+';
      document.getElementById(other.getAttribute('aria-controls')).hidden = true;
    });
    if (opening) {
      button.setAttribute('aria-expanded', 'true');
      button.querySelector('span:last-child').textContent = '−';
      document.getElementById(button.getAttribute('aria-controls')).hidden = false;
    }
  }));

  const counter = $('#acervo-count');
  const counterTarget = $('#acervo-counter');
  if (counter && counterTarget && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      if (reducedMotion.matches) return;
      const start = performance.now();
      function frame(time) {
        const part = Math.min(1, (time - start) / 1600);
        counter.textContent = String(Math.round(500 * (1 - (1 - part) ** 3)));
        if (part < 1) requestAnimationFrame(frame);
      }
      counter.textContent = '0';
      requestAnimationFrame(frame);
    }, { threshold: 0.35 });
    observer.observe(counterTarget);
  }

  if (finePointer.matches && !reducedMotion.matches) {
    const ring = $('#cursor-ring');
    const dot = $('#cursor-dot');
    const spot = $('#cursor-spot');
    const hero = $('#hero-card');
    let mouseX = innerWidth / 2, mouseY = innerHeight / 2;
    let ringX = mouseX, ringY = mouseY, scale = 1, targetScale = 1;
    window.addEventListener('mousemove', (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      targetScale = event.target.closest('a,button') ? 1.9 : 1;
    }, { passive: true });
    function animateCursor() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      scale += (targetScale - scale) * 0.2;
      if (ring) ring.style.transform = `translate3d(${ringX}px,${ringY}px,0) scale(${scale})`;
      if (dot) dot.style.transform = `translate3d(${mouseX}px,${mouseY}px,0)`;
      if (spot) {
        spot.style.setProperty('--mx', `${ringX}px`);
        spot.style.setProperty('--my', `${ringY}px`);
      }
      if (hero) {
        const dx = ringX / innerWidth - 0.5;
        const dy = ringY / innerHeight - 0.5;
        hero.style.transform = `perspective(900px) rotate(2.2deg) rotateY(${dx * 10}deg) rotateX(${-dy * 8}deg) translate(${dx * 14}px,${dy * 10}px)`;
      }
      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);
  }

})();
