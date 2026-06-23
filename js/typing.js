const TYPING_LINE = {
  id:    'typing-tech',
  text:  'Soy un gran apasionado de la tecnología — es donde me encuentro más y donde me destaco considerablemente.',
  speed: 26,
};

function typeText(el, text, speed, onDone) {
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

window.startTyping = function () {
  const el = document.getElementById(TYPING_LINE.id);
  if (el) {
    el.textContent = '';
    // Esperar que los reveal-items (hasta --i:6) terminen antes de tipear
    setTimeout(() => typeText(el, TYPING_LINE.text, TYPING_LINE.speed), 1250);
  }
};
