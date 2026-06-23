/* Sección: Sobre mí
   Contiene la rueda de palabras (wheel) y el efecto de tipeo (typing).
   Expone window.initSobreMi() y window.stopSobreMi() para que nav.js los invoque. */

// ── Rueda de palabras ──────────────────────────────────────────
const RADIUS        = 84;
const SIZE          = 220;
const CENTER        = SIZE / 2;
const SPEED         = 0.20;
const TOP_THRESHOLD = 20;

let _rotation  = 0;
let _wheelRAF  = null;
let _wheelEls  = [];   // se populan al iniciar, cuando el DOM ya existe

function _stepWheel() {
  _rotation = (_rotation + SPEED) % 360;
  const n = _wheelEls.length;

  _wheelEls.forEach((el, i) => {
    const angle = ((i * 360 / n) + _rotation) % 360;
    const rad   = (angle - 90) * Math.PI / 180;

    el.style.left = (CENTER + RADIUS * Math.cos(rad)) + 'px';
    el.style.top  = (CENTER + RADIUS * Math.sin(rad)) + 'px';

    const distFromTop = Math.min(angle, 360 - angle);
    el.classList.toggle('wheel-active', distFromTop < TOP_THRESHOLD);
  });

  _wheelRAF = requestAnimationFrame(_stepWheel);
}

// ── Efecto de tipeo ────────────────────────────────────────────
const TYPING_LINE = {
  id:    'typing-tech',
  text:  'Soy un gran apasionado de la tecnología — es donde me encuentro más y donde me destaco considerablemente.',
  speed: 26,
};

function _typeText(el, text, speed, onDone) {
  let i = 0;
  el.textContent = '';

  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  el.appendChild(cursor);

  const interval = setInterval(() => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i]), cursor);
      i++;
    } else {
      clearInterval(interval);
      cursor.classList.add('blink');
      setTimeout(() => { cursor.remove(); if (onDone) onDone(); }, 1200);
    }
  }, speed);
}

// ── API pública ────────────────────────────────────────────────
window.initSobreMi = function () {
  // Tipeo — espera que terminen los reveal-items antes de arrancar
  const el = document.getElementById(TYPING_LINE.id);
  if (el) {
    el.textContent = '';
    setTimeout(() => _typeText(el, TYPING_LINE.text, TYPING_LINE.speed), 1250);
  }

  // Rueda — lee los elementos del DOM en el momento de iniciar
  if (!_wheelRAF) {
    _wheelEls = [...document.querySelectorAll('.wheel-word')];
    _stepWheel();
  }
};

window.stopSobreMi = function () {
  if (_wheelRAF) {
    cancelAnimationFrame(_wheelRAF);
    _wheelRAF = null;
  }
};
