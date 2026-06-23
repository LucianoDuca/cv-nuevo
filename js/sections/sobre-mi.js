/* Sección: Sobre mí — rueda de palabras + efecto de tipeo */

// ── Rueda ──────────────────────────────────────────────────────
const RADIUS        = 84;
const SIZE          = 220;
const CENTER        = SIZE / 2;
const SPEED         = 0.20;
const TOP_THRESHOLD = 20;

let rotation = 0;
const wheelEls = [...document.querySelectorAll('.wheel-word')];

function stepWheel() {
  rotation = (rotation + SPEED) % 360;
  const n = wheelEls.length;

  wheelEls.forEach((el, i) => {
    const angle = ((i * 360 / n) + rotation) % 360;
    const rad   = (angle - 90) * Math.PI / 180;
    el.style.left = (CENTER + RADIUS * Math.cos(rad)) + 'px';
    el.style.top  = (CENTER + RADIUS * Math.sin(rad)) + 'px';
    el.classList.toggle('wheel-active', Math.min(angle, 360 - angle) < TOP_THRESHOLD);
  });

  requestAnimationFrame(stepWheel);
}

// ── Tipeo ──────────────────────────────────────────────────────
const TYPING_TEXT  = 'Soy un gran apasionado de la tecnología — es donde me encuentro más y donde me destaco considerablemente.';
const TYPING_SPEED = 26;

function typeText(el, text, speed) {
  let i = 0;
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'typing-cursor';
  cursor.textContent = '|';
  el.appendChild(cursor);

  const interval = setInterval(() => {
    if (i < text.length) {
      el.insertBefore(document.createTextNode(text[i++]), cursor);
    } else {
      clearInterval(interval);
      cursor.classList.add('blink');
      setTimeout(() => cursor.remove(), 1200);
    }
  }, speed);
}

// ── Inicio automático ──────────────────────────────────────────
stepWheel();

const typingEl = document.getElementById('typing-tech');
if (typingEl) setTimeout(() => typeText(typingEl, TYPING_TEXT, TYPING_SPEED), 1250);
