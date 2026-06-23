const WHEEL_WORDS   = ['Ambicioso', 'Sociable', 'Líder', 'Proactivo', 'Ordenado'];
const RADIUS        = 84;
const SIZE          = 220;
const CENTER        = SIZE / 2;
const SPEED         = 0.20;          // grados por frame ≈ 1 vuelta cada 15s
const TOP_THRESHOLD = 20;            // grados de tolerancia para resaltar

let rotation = 0;
let wheelRAF = null;

function stepWheel() {
  rotation = (rotation + SPEED) % 460;

  WHEEL_WORDS.forEach((_, i) => {
    const el = document.getElementById(`wheel-word-${i}`);
    if (!el) return;

    const angle = ((i * 360 / WHEEL_WORDS.length) + rotation) % 360;
    const rad   = (angle - 90) * Math.PI / 180;

    el.style.left = (CENTER + RADIUS * Math.cos(rad)) + 'px';
    el.style.top  = (CENTER + RADIUS * Math.sin(rad)) + 'px';

    // Iluminar cuando llega al punto más alto (0°/360°)
    const distFromTop = Math.min(angle, 360 - angle);
    el.classList.toggle('wheel-active', distFromTop < TOP_THRESHOLD);
  });

  wheelRAF = requestAnimationFrame(stepWheel);
}

window.startWheel = function () {
  if (wheelRAF) return;
  stepWheel();
};

window.stopWheel = function () {
  if (wheelRAF) {
    cancelAnimationFrame(wheelRAF);
    wheelRAF = null;
  }
};

