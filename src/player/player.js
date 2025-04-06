//import JASSUB from 'jassub'
import Hls from 'hls.js';
import Plyr from 'plyr';
const apibase = "https://api.koinima.com";
const SUBTITLES_OCTOPUS_WORKER_URL = '/assets/js/subtitles-octopus-worker.js';
const FONT_FILES = ['/fonts/Arial.ttf', '/fonts/TimesNewRoman.ttf']; // Añade aquí 
const subtitleUrlTemplate = (id, token) => {
    return apibase + `/res/subtitulos/${id}/v1?Authorization=${token}`;
}
async function fetchSubtitles(url) {
    if (!url) {
        console.warn('No subtitle file specified');
        return null;
    }

    try {
        console.log('Fetching subtitles:', url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Server response error: ${response.status}`);
        }

        const contentType = response.headers.get('content-type');
        const isJson = contentType?.includes('application/json');

        const data = isJson ? await response.json() : await response.text();
        const subtitleData = isJson ? (data.subtitleFile || data.subtitle) : data;

        console.log('Subtitles fetched successfully:', isJson ? 'JSON' : 'Text');
        if (!subtitleData) {
            const urlTofetch = getsubandset(data);
            return await fetchnewsubtitles(urlTofetch);
        } else {
            return subtitleData;
        }
    } catch (error) {
        console.error('Error fetching subtitles:', error);
        return null;
    }
};
function getsubandset(subtitles) {
    // buscar de un array el primero que tenga .url
    console.log("subtitles", subtitles);
    if (!subtitles) return;
    if (!Array.isArray(subtitles)) return;
    const subtitle = subtitles.find(subtitle => subtitle.ruta);
    return subtitle.ruta;
}
async function fetchnewsubtitles(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const text = await response.text();
        return text;
    } catch (error) {
        console.error('Error fetching subtitles:', error);
        return null;
    }
}
class VideoPlayer {
    constructor() {
        this.player = null;
        this.hls = null;
        this.video = document.querySelector('video');
        this.urlParams = new URLSearchParams(window.location.search);
        this.videoUrl = apibase + `/res2/video/master/${this.urlParams.get('capitulo')}?Authorization=${this.urlParams.get('Authorization')}`;
        this.localVideoUrl = `http://localhost:4200/api/m3u8/${this.urlParams.get('capitulo')}`;
        this.octopusInstance = null;
        this.initialize();
    }

    initialize() {
        this.video.querySelector('source').src = this.videoUrl;
        this.setupPlayer()
    }

    setupPlayer() {
        const source = this.video.querySelector('source').src;
        Hls.isSupported() ? this.initializeHls(source) : this.initializeBasicPlayer();
    }

    initializeHls(source) {
        this.hls = new Hls({});
        this.hls.loadSource(source);
        this.hls.subtitleTrack = 0;
        this.hls.subtitleDisplay = false;
        this.hls.attachMedia(this.video);
        window.hls = this.hls;

        this.hls.on(Hls.Events.MANIFEST_PARSED, this.handleManifestParsed.bind(this));
    }

    handleManifestParsed(event, data) {
        console.log("handleManifestParsed");
        const availableQualities = [0, ...this.hls.levels.map(l => l.height)];
        const subtitleTracks = data.subtitles || data.subtitleTracks || [];
        this.player = new Plyr(this.video, this.getPlayerOptions(data, availableQualities, subtitleTracks));
        this.setupPlayerEvents();

        this.hls.audioTrack = this.player.config.audioTrack.options[0];
        this.updateQuality(this.hls.levels[0].height);
        this.initializeSubtitlesOctopus();
    }

    getPlayerOptions(data, availableQualities, subtitleTracks) {
        const audioTracks = this.hls.audioTrackController.tracks;
        const availableAudioTracks = audioTracks.map((_, index) => index).slice(1);
        const labelsTracks = Object.fromEntries(
            audioTracks.slice(1).map((track, i) => [(i + 1).toString(), track.name])
        );

        return {
            quality: {
                default: 0,
                options: availableQualities,
                forced: true,
                onChange: this.updateQuality.bind(this),
            },
            audioTrack: {
                options: availableAudioTracks,
                selected: availableAudioTracks[0],
                onChange: this.handleAudioTrackChange.bind(this),
                showUnrecognizedLabel: true,
            },
            i18n: {
                audioTrack: 'Idioma',
                quality: 'Calidad',
                captions: 'Subtitulos',
                'captions.off': 'Desactivar subtitulos',
                'captions.settings': 'Configuración de subtitulos',
                speed: 'Velocidad',
                audioTrackLabel: labelsTracks,
                qualityLabel: { 0: 'Auto' },
            },
            listeners: { captions: true },
            storage: { enabled: true, key: 'plyr' },
            captions: { active: true, update: true, language: 'auto' },
            autoplay: true,
            controls: [
                'play-large', 'play', 'progress', 'current-time',
                'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
            ],
        };
    }

    setupPlayerEvents() {
        this.player.on('languagechange', () => {
            setTimeout(() => this.hls.subtitleTrack = this.player.currentTrack, 0);
        });

        this.hls.on(Hls.Events.LEVEL_SWITCHED, this.handleQualitySwitch.bind(this));

        this.player.on('ready', () => {
            this.updateQuality(0);
            this.addCustomCaptionsButton();
        });
    }

    handleQualitySwitch(event, data) {
        const span = document.querySelector(".plyr__menu__container [data-plyr='quality'][value='0'] span");
        const levelHeight = this.hls.levels[data.level].height;
        span.innerHTML = this.hls.autoLevelEnabled ? `AUTO (${levelHeight}p)` : 'AUTO';
        this.initializeSubtitlesOctopus();
    }

    updateQuality(newQuality) {
        if (newQuality === 0) {
            this.hls.currentLevel = -1;
        } else {
            this.hls.levels.forEach((level, index) => {
                if (level.height === newQuality) {
                    this.hls.currentLevel = index;
                }
            });
        }
    }

    handleAudioTrackChange(newTrack) {
        this.hls.audioTrack = parseInt(newTrack);
    }

    initializeBasicPlayer() {
        this.player = new Plyr(this.video, {
            captions: { active: true, update: true, language: 'en' },
            autoplay: true,
        });
    }

    addCustomCaptionsButton() {
        const captionsMenu = document.querySelector('.plyr__menu__container [role="menu"]');
        if (!captionsMenu) return;

        const customToggle = document.createElement('button');
        customToggle.type = 'button';
        customToggle.classList.add('plyr__control');
        customToggle.setAttribute('aria-pressed', 'true');

        let isCustomCaptionsActive = true;
        this.updateToggleText(customToggle, isCustomCaptionsActive);

        customToggle.addEventListener('click', () => {
            isCustomCaptionsActive = !isCustomCaptionsActive;
            this.updateToggleText(customToggle, isCustomCaptionsActive);

            if (isCustomCaptionsActive) {
                // Add your JASSUB initialization here
            } else if (this.jassub) {
                this.jassub.freeTrack();
            }
        });

        captionsMenu.appendChild(customToggle);
    }
    initializeJassub() {
        try {
            // --- ¡IMPORTANTE! ---
            // Determina la URL correcta para tu archivo de subtítulos (.ass/.ssa)
            // Este es solo un ejemplo basado en tu URL de video, AJÚSTALO.
            const suburl = subtitleUrlTemplate(this.urlParams.get('capitulo'), this.urlParams.get('Authorization'));
            // O si usas la URL local:
            // const subtitleUrl = `http://localhost:4200/api/subtitles/${this.urlParams.get('capitulo')}.ass`;


/*             if (!this.jassub) {
                console.log('Creando nueva instancia de JASSUB');
                setTimeout(async () => {
                    const subtoString = await fetchSubtitles(suburl);
                    console.log('Intentando inicializar JASSUB con URL:', suburl, subtoString);

                    this.jassub = new JASSUB({
                        video: this.video, // Pasa el elemento de video
                        subContent: subtoString,
                        // Opcional: puedes añadir más configuraciones aquí si es necesario
                        // workerUrl: '/jassub/jassub-worker.js', // Si usas workers
                        // wasmUrl: '/jassub/jassub-worker.wasm', // Si usas workers
                    });
                }, 100);
            } */
            //    this.jassub.setTrackByUrl(subtoString);
        } catch (e) {
            console.log("error jassub", e);
        }
    }
    async initializeSubtitlesOctopus() {
        // 1. Comprobar si la librería está cargada
        if (typeof SubtitlesOctopus === 'undefined') {
            console.error('SubtitlesOctopus no está cargado. Asegúrate de incluir el script.');
            return;
        }

        // 2. Evitar re-inicialización si ya existe una instancia activa
        if (this.octopusInstance) {
            console.log('SubtitlesOctopus ya está inicializado.');
             this.octopusInstance.canvas.style.display = ''; // Asegurarse de que sea visible
            return;
        }

        // 3. Obtener la URL de los subtítulos
        const subUrl = subtitleUrlTemplate(this.urlParams.get('capitulo'), this.urlParams.get('Authorization'));

        try {
            console.log("Intentando obtener contenido de subtítulos desde:", subUrl);
            // 4. Obtener el CONTENIDO (string) de los subtítulos usando tu función
            const subtitleContent = await fetchSubtitles(subUrl);

            if (!subtitleContent || typeof subtitleContent !== 'string') {
                console.warn('No se pudo obtener el contenido de los subtítulos o no es un string.');
                return; // Salir si no hay contenido
            }

            console.log('Contenido de subtítulos obtenido, inicializando SubtitlesOctopus...');

            // 5. Definir las opciones para SubtitlesOctopus
            const options = {
                video: this.video,              // Elemento video HTML
                subContent: subtitleContent,    // <<< CONTENIDO del archivo .ass/.ssa
                fonts: FONT_FILES,              // Array de URLs a los archivos de fuentes TFF/OTF/WOFF
                workerUrl: SUBTITLES_OCTOPUS_WORKER_URL, // URL al script worker
                debug: true,                   // Activar logs de depuración (útil durante el desarrollo)
                // legacyWorkerUrl: '/assets/js/subtitles-octopus-legacy-worker.js' // Para navegadores antiguos si es necesario
                // onReady: () => { console.log('SubtitlesOctopus listo!'); }, // Callback opcional
                // onError: (error) => { console.error('Error en SubtitlesOctopus:', error); }, // Callback de error
            };

            // 6. Crear la instancia de SubtitlesOctopus
            this.octopusInstance = new SubtitlesOctopus(options);
            console.log('Instancia de SubtitlesOctopus creada:', this.octopusInstance);

            // Sincronizar estado inicial (opcional pero recomendado)
            // if (this.player.paused) this.octopusInstance.setIsPaused(true);
            // this.octopusInstance.setRate(this.player.speed);
            // this.octopusInstance.setCurrentTime(this.player.currentTime);

            // Actualizar el botón de toggle si existe
            const toggleButton = document.querySelector('.plyr__menu__container button') || document.querySelector('.plyr__controls button'); // Ajustar selector si es necesario
             if (toggleButton && toggleButton.textContent.includes('Subtítulos =>')) { // Ser más específico
                 this.updateToggleText(toggleButton, true);
             }


        } catch (error) {
            console.error('Error al inicializar SubtitlesOctopus:', error);
             this.octopusInstance = null; // Asegurarse de que no quede una instancia parcial
        }
    }
    /**
     * Limpia la pista de subtítulos actual de JASSUB.
     */
    destroyJassubTrack() {
        if (this.jassub) {
            console.log('Liberando pista de JASSUB');
            this.jassub.freeTrack(); // Detiene el renderizado y libera recursos de la pista
            // Nota: No destruyas la instancia (`this.jassub.destroy()`) aquí
            // si solo quieres *alternar* los subtítulos.
            // `destroy()` eliminaría completamente JASSUB.
        }
    }
    updateToggleText(element, isActive) {
        element.innerHTML = `Subtítulos => ${isActive ? '🟢 ON' : '🔴 OFF'}`;
    }
}

new VideoPlayer();