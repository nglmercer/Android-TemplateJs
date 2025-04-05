import 'plyr/dist/plyr.css';
import Plyr from 'plyr';

// Variable global para almacenar la instancia del reproductor
let playerInstance = null;

/**
 * Función para inicializar o actualizar el reproductor Plyr
 * @param {Object} options - Opciones para configurar el reproductor
 * @param {string} options.videoId - ID del video de YouTube
 * @param {string} [options.containerSelector] - Selector del contenedor del reproductor (opcional, por defecto '#player')
 */
function setupPlayer(options) {
  const { videoId, containerSelector = '#player' } = options;

  // Validar que se haya proporcionado un videoId
  if (!videoId) {
    console.error('El ID del video es requerido.');
    return;
  }

  // Seleccionar el contenedor del reproductor
  const container = document.querySelector(containerSelector);
  if (!container) {
    console.error(`No se encontró el contenedor con el selector: ${containerSelector}`);
    return;
  }

  // Si ya existe una instancia del reproductor, destruirla
  if (playerInstance) {
    playerInstance.destroy();
    playerInstance = null;
  }

  // Actualizar los atributos del contenedor para el nuevo video
  container.setAttribute('data-plyr-provider', 'youtube');
  container.setAttribute('data-plyr-embed-id', videoId);

  // Inicializar el reproductor Plyr
  playerInstance = new Plyr(container, {
    controls: [
      'play-large',
      'play',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'captions',
      'settings',
      'fullscreen'
    ],
    youtube: {
      iv_load_policy: 3, // Deshabilitar las sugerencias de video
      modestbranding: 1, // Ocultar el logo de YouTube
      rel: 0, // Deshabilitar videos relacionados
      showinfo: 0 // Ocultar información del video
    }
  });

  // Manejar eventos si es necesario
  playerInstance.on('ready', () => {
    console.log('Reproductor listo');
  });

  playerInstance.on('play', () => {
    console.log('Reproduciendo video');
  });
}
export default setupPlayer;