/* Sección: Habilidades
   Maneja el hint de scroll que aparece brevemente al entrar a la sección. */

const _scrollHint = document.getElementById('scroll-hint');

window.initHabilidades = function () {
  if (!_scrollHint) return;
  setTimeout(() => {
    _scrollHint.classList.add('visible');
    setTimeout(() => _scrollHint.classList.remove('visible'), 4000);
  }, 1200);
};

window.stopHabilidades = function () {
  if (_scrollHint) _scrollHint.classList.remove('visible');
};
