document.addEventListener('DOMContentLoaded', () => {
  // Animar las cards con delay escalonado
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.5}s`;
  });

  // Variables música
  const pantallaInicio = document.getElementById('inicioMusical');
  const btnInicio = document.getElementById('iniciarMusica');
  const btnMusica = document.getElementById('toggleMusic');
  const btnMusicaAlterna = document.getElementById('toggleMusicAlt');
  let alternaSonando = false;

  const cancionAuto = new Audio('Hoy Tengo Que Decirte Papá.mp3');
  cancionAuto.loop = true;
  cancionAuto.volume = 0.3;

  const musica = new Audio('Quiero Parecerme a Mi Papá.mp3');
  musica.loop = true;
  musica.volume = 0.4;

  const musicaAlterna = new Audio('HIMNO DEL AMERICA.mp3'); 
  musicaAlterna.loop = true;
  musicaAlterna.volume = 0.4;

  let fondoSonando = false;

  // Función para actualizar botón de música con icono y texto
  function actualizarTextoBoton(play) {
    if (play) {
      btnMusica.setAttribute('aria-pressed', 'true');
      btnMusica.innerHTML = '<span class="icon">⏸️</span> <span class="text">Pausar Música</span>';
    } else {
      btnMusica.setAttribute('aria-pressed', 'false');
      btnMusica.innerHTML = '<span class="icon">▶️</span> <span class="text">Reproducir Música</span>';
    }
  }
  actualizarTextoBoton(false);
  btnMusicaAlterna.addEventListener('click', () => {
   if (alternaSonando) {
      musicaAlterna.pause();
      btnMusicaAlterna.setAttribute('aria-pressed', 'false');
      btnMusicaAlterna.innerHTML = '<span class="icon">▶️</span> <span class="text">Reproducir Tu Himno 🦅</span>';
    } else {
      // Pausar las otras músicas si están sonando
      if (!musica.paused) {
        musica.pause();
        fondoSonando = false;
        actualizarTextoBoton(false);
      }
      if (!cancionAuto.paused) {
        cancionAuto.pause();
        cancionAuto.currentTime = 0;
      }

      musicaAlterna.play();
      btnMusicaAlterna.setAttribute('aria-pressed', 'true');
      btnMusicaAlterna.innerHTML = '<span class="icon">⏸️</span> <span class="text">Pausar Otra Canción</span>';
    }

    alternaSonando = !alternaSonando;
  });

  // Cuando se inicia la experiencia musical
  btnInicio.addEventListener('click', () => {
    cancionAuto.play();
    pantallaInicio.classList.add('fade-out');
    setTimeout(() => {
      pantallaInicio.style.display = 'none';
      const main = document.querySelector('main');
      if (main) main.classList.add('aparecer');
    }, 1200);
  });

  // Toggle música de fondo
  btnMusica.addEventListener('click', () => {
    if (fondoSonando) {
      musica.pause();
      actualizarTextoBoton(false);
      musica1.pause();
      actualizarTextoBoton(false);
    } else {
      if (!cancionAuto.paused) {
        cancionAuto.pause();
        cancionAuto.currentTime = 0;
      }
      musica.play();
      actualizarTextoBoton(true);
      musica1.play();
      actualizarTextoBoton(true);
    }
    fondoSonando = !fondoSonando;
  });

  // Lightbox personalizado para imágenes
  document.querySelectorAll('.lightbox').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const imgSrc = this.getAttribute('href');
      const overlay = document.createElement('div');
      overlay.classList.add('lightbox-overlay');
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = 'Foto ampliada';
      img.classList.add('lightbox-img');
      overlay.appendChild(img);
      document.body.appendChild(overlay);
      overlay.addEventListener('click', () => {
        overlay.remove();
      });
    });
  });

  // Botón para descargar todas las imágenes
  const btnDescargar = document.getElementById('descargarImagenes');
  if (btnDescargar) {
    btnDescargar.addEventListener('click', () => {
      const links = document.querySelectorAll('.lightbox');
      links.forEach((link, index) => {
        const a = document.createElement('a');
        a.href = link.href;
        a.download = `recuerdo${index + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    });
  }

  // Modal para anécdotas
  const modal = document.getElementById('modalAnecdota');
  const modalTexto = document.getElementById('modalTexto');
  const cerrarModal = document.getElementById('cerrarModal');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const anecdota = card.getAttribute('data-anecdota');
      if (modalTexto && modal) {
        modalTexto.textContent = anecdota;
        modal.style.display = 'flex';
      }
    });
  });

  if (cerrarModal) {
    cerrarModal.addEventListener('click', () => {
      if (modal) modal.style.display = 'none';
    });
  }

  window.addEventListener('click', (e) => {
    if (modal && e.target === modal) {
      modal.style.display = 'none';
    }
  });

    // Pausar música de fondo y automática al reproducir el mensaje de voz
  const mensajeAudio = document.getElementById('mensajeAudio');
  if (mensajeAudio) {
    mensajeAudio.addEventListener('play', () => {
      if (!musica.paused) {
        musica.pause();
        fondoSonando = false;
        actualizarTextoBoton(false);
      }
      if (!cancionAuto.paused) {
        cancionAuto.pause();
        cancionAuto.currentTime = 0;
      }
    });
  }

});
