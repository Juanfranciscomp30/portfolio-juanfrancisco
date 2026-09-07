/* ===============================================
   MENU MOVIL (boton hamburguesa)
   =============================================== */
const navLinks = document.getElementById('navLinks');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', function () {
  navLinks.classList.toggle('open');
});

// cuando el usuario hace click en un link del menu movil, lo cerramos
const navLinkItems = document.querySelectorAll('.nav-link');

for (let i = 0; i < navLinkItems.length; i++) {
  navLinkItems[i].addEventListener('click', function () {
    navLinks.classList.remove('open');
  });
}

/* ===============================================
   MARCAR EN EL MENU LA SECCION EN LA QUE ESTAMOS
   Comparamos la posicion del scroll con la posicion
   de cada seccion en la pagina
   =============================================== */
const sections = document.querySelectorAll('main > section');

window.addEventListener('scroll', function () {
  let currentSection = '';

  sections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;
    if (window.scrollY >= sectionTop) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinkItems.forEach(function (link) {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentSection) {
      link.classList.add('active');
    }
  });
});

/* ===============================================
   EFECTO DE APARICION AL HACER SCROLL
   Recorremos todos los elementos con la clase reveal
   y comprobamos si ya estan visibles en pantalla
   =============================================== */
const revealElements = document.querySelectorAll('.reveal');

function checkReveal() {
  const windowHeight = window.innerHeight;

  revealElements.forEach(function (el) {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 100) {
      el.classList.add('in');
    }
  });
}

window.addEventListener('scroll', checkReveal);
window.addEventListener('load', checkReveal);

/* ===============================================
   TERMINAL DEL HERO - efecto de escritura
   Vamos añadiendo una letra cada poco tiempo con
   setInterval hasta completar la palabra
   =============================================== */
const cmdText = document.getElementById('typedCmd');
const cmdCursor = document.getElementById('cmdCursor');
const outputText = document.getElementById('typedOutput');

const comando = 'whoami';
const respuesta = 'Frontend dev con base en sistemas y redes, especializado en construir interfaces sólidas y automatizar datos.';

let letraActual = 0;

function escribirComando() {
  if (letraActual < comando.length) {
    cmdText.textContent = comando.substring(0, letraActual + 1);
    letraActual++;
    setTimeout(escribirComando, 90);
  } else {
    setTimeout(mostrarRespuesta, 400);
  }
}

function mostrarRespuesta() {
  cmdCursor.style.display = 'none';
  outputText.innerHTML = '<span class="accent">&gt;</span> ' + respuesta;
}

// esperamos medio segundo antes de empezar a escribir
setTimeout(escribirComando, 500);

/* ===============================================
   ACORDEON DE LA SECCION TRAYECTORIA
   Cada capa se abre y se cierra al hacer click,
   usando la clase "open" que ya tenemos en el CSS
   =============================================== */
const capas = document.querySelectorAll('.stack-layer');

capas.forEach(function (capa) {
  const cabecera = capa.querySelector('.layer-head');

  cabecera.addEventListener('click', function () {
    capa.classList.toggle('open');
  });
});

// abrimos la primera capa (la mas reciente) para que se vea de ejemplo
document.querySelector('.stack-layer[data-layer="3"]').classList.add('open');

/* ===============================================
   FORMULARIO DE CONTACTO
   En vez de enviar el formulario a un servidor,
   abrimos el correo del usuario con los datos rellenos
   =============================================== */
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nombre = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const asunto = document.getElementById('subject').value;
  const mensaje = document.getElementById('message').value;

  const cuerpoCorreo = mensaje + '\n\n— ' + nombre + ' (' + email + ')';

  window.location.href = 'mailto:juanfranciscomoralesplaza30@gmail.com?subject=' + encodeURIComponent(asunto) + '&body=' + encodeURIComponent(cuerpoCorreo);

  formNote.textContent = 'Abriendo tu cliente de correo...';
  form.reset();
});
