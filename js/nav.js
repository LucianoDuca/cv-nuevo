/* Navegación entre secciones, sidebar y menú hamburguesa.
   Llama a initX() / stopX() definidos en js/sections/. */

const sidebar   = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const overlay   = document.getElementById('overlay');
const navItems  = document.querySelectorAll('.nav-item');
const sections  = document.querySelectorAll('.page-section');

function triggerReveal(section) {
  section.querySelectorAll('.reveal-item').forEach(el => {
    el.classList.remove('playing');
    void el.offsetWidth;
    el.classList.add('playing');
  });
}

function showSection(id) {
  // Detener lógica activa de cualquier sección
  if (window.stopSobreMi)      window.stopSobreMi();
  if (window.stopHistCarousel) window.stopHistCarousel();
  if (window.stopHabilidades)  window.stopHabilidades();

  sections.forEach(s => {
    s.classList.remove('active');
    s.style.display = 'none';
  });
  navItems.forEach(n => n.classList.remove('active'));

  const target = document.getElementById(id);
  const btn    = document.querySelector(`.nav-item[data-section="${id}"]`);

  if (target) {
    target.style.display = 'flex';
    requestAnimationFrame(() => {
      target.classList.add('active');
      triggerReveal(target);

      if (id === 'sobre-mi'  && window.initSobreMi)     window.initSobreMi();
      if (id === 'historial' && window.initHistCarousel) window.initHistCarousel();
      if (id === 'habilidades' && window.initHabilidades) window.initHabilidades();
    });
  }
  if (btn) btn.classList.add('active');
}

function closeMobileMenu() {
  sidebar.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('open');
}

navItems.forEach(item => {
  item.addEventListener('click', () => {
    showSection(item.dataset.section);
    closeMobileMenu();
  });
});

hamburger.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  overlay.classList.toggle('open', isOpen);
});

overlay.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

// Inicialización: ocultar todas las secciones inactivas y revelar la activa
sections.forEach(s => {
  if (!s.classList.contains('active')) {
    s.style.display = 'none';
  } else {
    triggerReveal(s);
  }
});
