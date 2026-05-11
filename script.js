// Este código sirve para que cuando hagas clic en el menú, la página baje suavemente
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function (evento) {
        evento.preventDefault();
        const dondeVoy = document.querySelector(this.getAttribute('href'));
        
        if (dondeVoy) {
            dondeVoy.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Este código hace que las secciones aparezcan con un efecto cuando vas bajando (scroll)
const misSecciones = document.querySelectorAll('.seccion-normal');

const aparecerAlBajar = new IntersectionObserver((elementos) => {
    elementos.forEach(el => {
        if (el.isIntersecting) {
            el.target.classList.add('seccion-visible');
        }
    });
}, { threshold: 0.15 });

misSecciones.forEach(sec => {
    // Les pongo un estilo inicial para que estén un poco abajo y transparentes
    sec.style.opacity = "0";
    sec.style.transform = "translateY(30px)";
    sec.style.transition = "all 0.8s ease-out";
    aparecerAlBajar.observe(sec);
});

document.addEventListener('scroll', () => {
    misSecciones.forEach(sec => {
        const posicion = sec.getBoundingClientRect();
        if (posicion.top < window.innerHeight * 0.8) {
            sec.style.opacity = "1";
            sec.style.transform = "translateY(0)";
        }
    });
});