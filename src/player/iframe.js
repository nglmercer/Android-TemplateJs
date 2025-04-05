class UrlOrIframeManager {
    /**
     * Inicializa el gestor para un contenedor específico.
     * @param {string} iframeContainerSelector - Selector CSS del elemento que contendrá el iframe.
     */
    constructor(iframeContainerSelector) {
        this.containerElement = document.querySelector(iframeContainerSelector);
        if (!this.containerElement) {
            throw new Error(`Elemento contenedor no encontrado con el selector: ${iframeContainerSelector}`);
        }
        this.currentUrl = null; // Almacena la URL del iframe actualmente mostrado
        this.currentIframe = null; // Almacena la referencia al elemento iframe actual
        console.log('UrlOrIframeManager inicializado para el contenedor:', this.containerElement);
    }

    /**
     * Actualiza el contenido del contenedor. Muestra un iframe si la URL es válida,
     * o limpia el contenedor si la URL es inválida o nula.
     * Rerenderiza (reemplaza) el iframe si la URL cambia.
     * @param {string | null | undefined} url - La URL a cargar en el iframe.
     */
    updateContent(url) {
        // Limpiar y normalizar la URL (convertir a string y quitar espacios)
        const trimmedUrl = url ? String(url).trim() : null;

        // Caso 1: URL inválida o vacía -> Limpiar contenedor
        if (!trimmedUrl) {
            if (this.currentUrl !== null) { // Solo limpiar si había algo antes
                console.log('URL inválida o no proporcionada. Limpiando contenedor.');
                this.clearContainer();
            } else {
                 console.log('URL inválida o no proporcionada, y el contenedor ya estaba vacío.');
            }
            return; // Terminar ejecución aquí
        }

        // Caso 2: La URL es la misma que la actual -> No hacer nada
        if (trimmedUrl === this.currentUrl) {
            console.log(`La URL '${trimmedUrl}' ya está cargada. No se requiere acción.`);
            return; // Terminar ejecución aquí
        }

        // Caso 3: URL válida y diferente -> Crear o reemplazar iframe
        console.log(`Actualizando contenido. Nueva URL: ${trimmedUrl}`);
        this._createOrReplaceIframe(trimmedUrl);
        this.currentUrl = trimmedUrl; // Actualizar la URL actual registrada
    }

    /**
     * Limpia completamente el contenido del elemento contenedor y resetea el estado.
     */
    clearContainer() {
        if (this.currentIframe) {
            try {
                this.containerElement.removeChild(this.currentIframe);
                 console.log('Iframe anterior eliminado.');
            } catch (error) {
                // Podría fallar si el nodo ya no está en el DOM por alguna razón
                console.warn('Error al intentar eliminar el iframe anterior:', error);
            }
        }
        // Alternativa más simple pero potencialmente menos performante si hay muchos listeners:
        // this.containerElement.innerHTML = '';
        this.currentIframe = null;
        this.currentUrl = null; // Importante resetear la URL
    }

    /**
     * Método privado para crear y añadir el iframe al contenedor.
     * Asume que el contenedor ya ha sido limpiado si era necesario.
     * @param {string} url - La URL válida para el src del iframe.
     * @private
     */
    _createOrReplaceIframe(url) {
        // Limpiar primero por si acaso (aunque updateContent ya lo chequea)
        this.clearContainer();

        // Crear el elemento iframe
        const iframe = document.createElement('iframe');
        iframe.src = url;
        iframe.title = "Contenido Embebido"; // Accesibilidad
        iframe.style.border = 'none'; // Estilos básicos
        iframe.style.width = '100%';
        iframe.style.height = 'max(200px,100%)'; // Puedes ajustar esto o usar CSS
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"; // Permisos
        iframe.allowFullscreen = true;

        // Añadir al contenedor
        this.containerElement.appendChild(iframe);
        this.currentIframe = iframe; // Guardar referencia al nuevo iframe

        console.log(`Iframe creado y añadido para la URL: ${url}`);
        console.warn('Recuerda: La carga del contenido puede ser bloqueada por el sitio de origen (X-Frame-Options, CSP).');
    }

    /**
     * Redirige la ventana del navegador a la URL especificada.
     * @param {string} url - La URL a la que se redirigirá.
     */
    redirectTo(url) {
         const trimmedUrl = url ? String(url).trim() : null;
         if (!trimmedUrl) {
              console.warn('Se intentó redirigir a una URL inválida.');
              return;
         }
         if (confirm(`¿Estás seguro de que quieres navegar a ${trimmedUrl}?`)) {
             console.log('Redirigiendo la ventana a:', trimmedUrl);
             window.location.href = trimmedUrl;
         } else {
             console.log('Redirección cancelada.');
         }
     }

    /**
     * Obtiene la URL actualmente cargada en el iframe gestionado.
     * @returns {string | null} La URL actual o null si no hay iframe.
     */
    getCurrentUrl() {
        return this.currentUrl;
    }
}
export { UrlOrIframeManager }