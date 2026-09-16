document.querySelectorAll('a[href^="#"]').forEach((enlace) => {
  enlace.addEventListener('click', function (evento) {
    const destino = document.querySelector(this.getAttribute('href'));
    if (destino) {
      evento.preventDefault();
      destino.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

const prefiereMenosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const seccionesAnimables = document.querySelectorAll('.seccion.con-animacion');

if (prefiereMenosMovimiento || !('IntersectionObserver' in window)) {
  seccionesAnimables.forEach((seccion) => seccion.classList.add('seccion-visible'));
} else {
  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('seccion-visible');
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  seccionesAnimables.forEach((seccion) => observador.observe(seccion));
  setTimeout(() => {
    seccionesAnimables.forEach((seccion) => seccion.classList.add('seccion-visible'));
  }, 1200);
}