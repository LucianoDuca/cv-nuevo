/* Sección: Habilidades — hint de scroll */

const scrollHint = document.getElementById('scroll-hint');

if (scrollHint) {
  setTimeout(() => {
    scrollHint.classList.add('visible');
    setTimeout(() => scrollHint.classList.remove('visible'), 4000);
  }, 1200);
}
