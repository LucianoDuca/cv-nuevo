const sidebar   = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');
const overlay   = document.getElementById('overlay');

function closeMobileMenu() {
  sidebar.classList.remove('open');
  hamburger.classList.remove('open');
  overlay.classList.remove('open');
}

hamburger.addEventListener('click', () => {
  const isOpen = sidebar.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  overlay.classList.toggle('open', isOpen);
});

overlay.addEventListener('click', closeMobileMenu);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileMenu(); });

// Disparar animaciones de reveal
document.querySelectorAll('.reveal-item').forEach(el => el.classList.add('playing'));
