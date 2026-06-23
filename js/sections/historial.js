/* Sección: Historial laboral — carrusel infinito con dots, flechas y overlay */

const CARD_GAP = 22;
const N        = 5;
const TRANS_MS = 520;

let current     = N + 2;  // carta 2 (2022–2024) centrada al inicio
let pendingJump = null;

const track       = document.getElementById('histTrack');
const viewport    = document.getElementById('histViewport');
const btnPrev     = document.getElementById('histPrev');
const btnNext     = document.getElementById('histNext');
const histOverlay = document.getElementById('histOverlay');
const dotsWrap    = document.getElementById('histDots');

/* ── 3 sets: set1 (clones atrás), set2 (reales), set3 (clones adelante) ── */
const realSlides = [...document.querySelectorAll('.hist-slide')];
for (let c = 0; c < 2; c++) {
  realSlides.forEach(s => track.appendChild(s.cloneNode(true)));
}
const allSlides = [...track.querySelectorAll('.hist-slide')]; // 15 total

/* ── Dots ─────────────────────────────────────────────────── */
realSlides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'hist-dot';
  d.setAttribute('aria-label', `Período ${i + 1}`);
  d.addEventListener('click', () => navTo(i));
  dotsWrap.appendChild(d);
});

/* ── Posicionamiento ──────────────────────────────────────── */
function cardWidth() {
  return allSlides[0].offsetWidth || 260;
}

function getOffset() {
  const cw = cardWidth();
  return viewport.offsetWidth / 2 - cw / 2 - current * (cw + CARD_GAP);
}

function applySlideStyles() {
  allSlides.forEach((slide, i) => {
    const dist    = Math.abs(i - current);
    const scale   = dist === 0 ? 1.08 : Math.max(0.82, 1 - dist * 0.06);
    const opacity = dist === 0 ? 1    : Math.max(0.30, 1 - dist * 0.18);
    const blur    = dist === 0 ? 0    : Math.min(dist * 0.8, 2.5);

    slide.style.transform = `scale(${scale})`;
    slide.style.opacity   = opacity;
    slide.style.filter    = blur > 0 ? `blur(${blur}px)` : 'none';
    slide.style.zIndex    = dist === 0 ? '2' : '1';
    slide.classList.toggle('is-center', i === current);
  });

  const realIdx = ((current % N) + N) % N;
  [...dotsWrap.children].forEach((d, i) => d.classList.toggle('active', i === realIdx));
}

function applyStyles() {
  track.style.transform = `translateX(${getOffset()}px)`;
  applySlideStyles();
}

function silentJump(newCurrent) {
  pendingJump = null;
  track.style.transition = 'none';
  allSlides.forEach(s => { s.style.transition = 'none'; });
  current = newCurrent;
  track.style.transform = `translateX(${getOffset()}px)`;
  applySlideStyles();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    track.style.transition = '';
    allSlides.forEach(s => { s.style.transition = ''; });
  }));
}

function goTo(idx) {
  if (pendingJump) { clearTimeout(pendingJump); pendingJump = null; }
  current = idx;
  applyStyles();
  if (current >= N * 2) {
    pendingJump = setTimeout(() => silentJump(current - N), TRANS_MS + 60);
  } else if (current < N) {
    pendingJump = setTimeout(() => silentJump(current + N), TRANS_MS + 60);
  }
}

function navTo(realIdx) { goTo(N + realIdx); }

/* ── Flechas ──────────────────────────────────────────────── */
btnPrev.addEventListener('click', () => goTo(current - 1));
btnNext.addEventListener('click', () => goTo(current + 1));

/* ── Touch ────────────────────────────────────────────────── */
let touchStartX = null;
viewport.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
viewport.addEventListener('touchend', e => {
  if (touchStartX === null) return;
  const delta = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(delta) > 50) delta > 0 ? btnNext.click() : btnPrev.click();
  touchStartX = null;
}, { passive: true });

/* ── Click en carta ───────────────────────────────────────── */
track.addEventListener('click', e => {
  const slide = e.target.closest('.hist-slide');
  if (!slide) return;
  const i       = allSlides.indexOf(slide);
  const realIdx = ((i % N) + N) % N;
  if (realIdx === ((current % N) + N) % N) {
    openOverlay(slide);
  } else {
    navTo(realIdx);
  }
});

/* ── Overlay ──────────────────────────────────────────────── */
function openOverlay(slide) {
  if (pendingJump) { clearTimeout(pendingJump); pendingJump = null; }
  document.getElementById('histOverlayLabel').textContent = slide.querySelector('.hist-glass-label').textContent;
  document.getElementById('histOverlayTitle').textContent = slide.querySelector('.hist-glass-title').textContent;
  document.getElementById('histOverlayBody').innerHTML   = slide.querySelector('.hist-detail').innerHTML;
  histOverlay.classList.add('open');
}

function closeOverlay() { histOverlay.classList.remove('open'); }

document.getElementById('histClose').addEventListener('click', closeOverlay);
histOverlay.addEventListener('click', e => { if (e.target === histOverlay) closeOverlay(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && histOverlay.classList.contains('open')) closeOverlay();
});

/* ── Resize ───────────────────────────────────────────────── */
window.addEventListener('resize', () => silentJump(current));

/* ── Init ─────────────────────────────────────────────────── */
requestAnimationFrame(() => silentJump(current));
