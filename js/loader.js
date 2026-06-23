/* Carga los HTML de cada sección y luego inicializa los scripts en orden */
(async function () {
  const SECTIONS = ['inicio', 'sobre-mi', 'habilidades', 'historial', 'extra'];
  const main = document.getElementById('mainContent');

  try {
    const htmls = await Promise.all(
      SECTIONS.map(name =>
        fetch(`sections/${name}.html`).then(r => {
          if (!r.ok) throw new Error(`No se pudo cargar sections/${name}.html`);
          return r.text();
        })
      )
    );
    htmls.forEach(html => main.insertAdjacentHTML('beforeend', html));
  } catch (err) {
    console.error('[loader] Error cargando secciones:', err);
    return;
  }

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = src;
      s.onload  = resolve;
      s.onerror = () => reject(new Error(`Error al cargar ${src}`));
      document.body.appendChild(s);
    });
  }

  /* Scripts de sección — cada uno en su propio archivo, en orden de dependencia.
     historial.js necesita .hist-slide en el DOM antes de ejecutarse.
     nav.js necesita que todos los scripts de sección estén listos. */
  await loadScript('js/sections/inicio.js');
  await loadScript('js/sections/sobre-mi.js');
  await loadScript('js/sections/habilidades.js');
  await loadScript('js/sections/historial.js');
  await loadScript('js/sections/extra.js');
  await loadScript('js/nav.js');
})();
