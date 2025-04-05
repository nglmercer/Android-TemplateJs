import EpJson from './json/ep/AnimeInfo.json';
import lastepJson from './json/ep/lastep.json';
import { infofetchget,urltemplateInfo, urlepisodetemplate, episodeInfofetchget, token } from '/src/fetch/fetch.js';
import { UrlOrIframeManager } from '/src/player/iframe.js';
const iframeManager = new UrlOrIframeManager('#miContenedorIframe');
console.log("lastepJson",lastepJson);
// crear varios    <anime-carousel class="Episodios_carrousel"></anime-carousel> segun si EpJson.data.temporadas tiene mas de 1

async function animeInfoRender(data) {
    /*  static properties = {
    title: { type: String },
    genre: { type: String },
    synopsis: { type: String },
    season: { type: Number },
    episodes: { type: Number },
    category: { type: String },
    posterUrl: { type: String },
    characters: { type: Array },
    categories: { type: Array }
  };
*/
    const posterInfo = document.getElementById('poster-info');
    posterInfo.title = data.nombreCatalogo;
    posterInfo.synopsis = data.descripcionCatalogo;
    const category_buttons = document.getElementById('category-buttons');
    category_buttons.categories = getCategories(data.categorias);
    const season_info = document.querySelector('season-info');
    console.log("anime-card", data);
    //    season: { type: Number },    episodes: { type: Number },
    season_info.season = getTempsandEpisodes(data.temporadas).season;
    season_info.episodes = getTempsandEpisodes(data.temporadas).episodes;
    /*        "categorias": [
            {
                "idCategoria": 53,
                "nombreCategoria": "Acci\u00f3n"
            },
            {
                "idCategoria": 23,
                "nombreCategoria": "Aventuras"
            },
            {
                "idCategoria": 54,
                "nombreCategoria": "Ciencia Ficci\u00f3n"
            },
            {
                "idCategoria": 62,
                "nombreCategoria": "Latino"
            },
            {
                "idCategoria": 47,
                "nombreCategoria": "Terror"
            }
        ]*/
    
}
const Episodios_carrousel = document.getElementById('Episodios_carrousel');

class EpisodesCarousel {
    constructor(data) {
        this.data = data;
        this.animes = parseEpisodes(this.data.capitulos, this.data)

    }
    initialize() {
        const animeCarousel = document.createElement('anime-carousel');
        const id = this.data.idTemporada;
        animeCarousel.id = id;
        animeCarousel.animes = this.animes;
        return animeCarousel;
    }
}
renderTemporadas(EpJson.data.temporadas);
function renderTemporadas(temporadas) {
    if (!temporadas) return;
    if (!Array.isArray(temporadas)) return;
    Episodios_carrousel.innerHTML = '';
    temporadas.forEach(temporada => {
        const seasonContainer = document.createElement('div');
        seasonContainer.className = 'season-container';
    
        const seasonTitle = document.createElement('h3');
        seasonTitle.textContent = temporada.nombreTemporada;
        seasonTitle.className = 'season-title m-10'; // Nueva clase más específica
        
        // Subtítulo con número de episodios (cambio h4 por p para mejor semántica)
        const seasonEpisodes = document.createElement('p'); // Cambio de h4 a p
        seasonEpisodes.textContent = `${stringEpisodes(temporada.capitulos).number} ${stringEpisodes(temporada.capitulos).isCapitulos}`;
        seasonEpisodes.className = 'season-episodes m-10'; // Nueva clase específica
        
        // Resto del código sigue igual
        seasonContainer.appendChild(seasonTitle);
        seasonContainer.appendChild(seasonEpisodes);
    
        // Crear carrusel
        const newCarousel = new EpisodesCarousel(temporada);
        const carouselElement = newCarousel.initialize();
        carouselElement.addEventListener('anime-selected', (e) => {
            episodeInfofetchget(urlepisodetemplate(e.detail.id)).then(response => {
                console.log("response",response);
                if (response && response.data){
                  getandsetEpisode(response.data);
                }
            });
        });
        seasonContainer.appendChild(carouselElement);
        // Agregar contenedor de temporada al DOM
        Episodios_carrousel.appendChild(seasonContainer);
    });
}
// devolvemos un objeto con number y si es episodios o episodio o capitulos capitulos
function stringEpisodes(array) {
    const arrayLength = array.length;
    return {
        number: arrayLength,
        isEpisodes: arrayLength > 1 ? "episodios" : "episodio",
        isCapitulos: arrayLength > 1 ? "capitulos" : "capitulo"
    }
}
animeInfoRender(EpJson.data);
async function getandsetEpisode(data) {
    console.log("data getandsetEpisode", data);
    /*    "data": {
        "idCapitulo": 64580,
        "numeroCapitulo": 1,
        "imagenCapitulo": "",
        "catalogoCapitulo": 5018,
        "meGustasCapitulo": 1,
        "noMeGustasCapitulo": 0,
        "reproduccionesCapitulo": 20,
        "descripcionCapitulo": null,
        "tituloCapitulo": null,
        "pathCapitulo": null,
        "tiempoCapitulo": 117,
        "temporadaCapitulo": 117,
        "idTemporada": 117,
        "numeroTemporada": 1,
        "nombreTemporada": "Botsuraku Yotei no Kizoku dakedo, Hima Datta kara Mahou wo Kiwamete mita ",
        "descripcionTemporada": "Mientras disfruta inocentemente despu\u00e9s del trabajo, la vida de un hombre cambia para siempre. Se despierta en el cuerpo de Liam Hamilton, el hijo menor de una casa noble al borde del colapso. En medio del caos, Liam se da cuenta de que finalmente tiene tiempo para aprender y practicar magia. Una vez que comienza, su vida da un giro a\u00fan mayor. \u00bfPodr\u00e1 Liam dominar la magia y salvar a su noble familia? \u00a1Comienza la fantas\u00eda aristocr\u00e1tica!",
        "portadaTemporada": "https:\/\/i.ibb.co\/CKMwP5hr\/2.jpg",
        "catalogoTemporada": 5018,
        "nsfw": 0,
        "idCatalogo": 5018,
        "nombreCatalogo": "Botsuraku Yotei no Kizoku dakedo, Hima Datta kara Mahou wo Kiwamete mita",
        "tipoCatalogo": 1,
        "estadoCatalogo": 1,
        "imagenPortadaCatalogo": "https:\/\/i.ibb.co\/ZzpK7x8R\/1.jpg",
        "imagenFondoCatalogo": "https:\/\/i.ibb.co\/k2cPT0w5\/3.jpg",
        "descripcionCatalogo": "Mientras disfruta inocentemente despu\u00e9s del trabajo, la vida de un hombre cambia para siempre. Se despierta en el cuerpo de Liam Hamilton, el hijo menor de una casa noble al borde del colapso. En medio del caos, Liam se da cuenta de que finalmente tiene tiempo para aprender y practicar magia. Una vez que comienza, su vida da un giro a\u00fan mayor. \u00bfPodr\u00e1 Liam dominar la magia y salvar a su noble familia? \u00a1Comienza la fantas\u00eda aristocr\u00e1tica!",
        "nsfwCatalogo": 0,
        "recomendacionCatalogo": 0,
        "trailerCatalogo": "https:\/\/youtu.be\/IPq9ROWnsuA?si=3RnJ0_215R37JVCA",
        "servidores": []
    },*/
    /*
    {
    title: { type: String },
    chapter: { type: Number },
    playCount: { type: Number },
    likes: { type: Number },
    dislikes: { type: Number }
  }
    */
   const media_mediacontrols = document.querySelector('media-controls');//media-controls
   if (media_mediacontrols) {
    media_mediacontrols.title = data.nombreCatalogo;
    media_mediacontrols.chapter = data.numeroCapitulo;
    media_mediacontrols.playCount = data.reproduccionesCapitulo;
    media_mediacontrols.likes = data.meGustasCapitulo;
    media_mediacontrols.dislikes = data.noMeGustasCapitulo;
   }
   if (data.id || data.idCapitulo){
    const existID = data.id || data.idCapitulo;
   // iframeManager.updateContent();
   console.log("data.id",existID, getURLPARAMS(existID));
   // localPlayer = "/src/player/index.html" + getURLPARAMS(existID);
   const urlToplayer = "/src/player/index.html" + getURLPARAMS(existID);
   iframeManager.updateContent(urlToplayer);
   const set_content_element = document.querySelector('set-content');
   const pageChangedEvent = new CustomEvent('page-changed', {
        detail: { pageNumber: parseInt( 1) },
        bubbles: true,
        composed: true
    });
    set_content_element.dispatchEvent(pageChangedEvent);
   }
}
function getURLPARAMS(ID) {
    // Verifica si el ID es válido (opcional pero recomendado)
    if (ID === null || ID === undefined || ID === '') {
        console.warn("getURLPARAMS fue llamado con un ID inválido.");
        // Decide qué hacer: retornar string vacío, lanzar error, etc.
        // Por ahora, retornaremos un string vacío para evitar errores en la concatenación.
        return "";
    }

    // Verifica si el token es válido (opcional pero recomendado)
     if (!token) {
        console.error("El token de autorización no está definido o es inválido.");
        // Decide qué hacer. Quizás retornar string vacío o lanzar error.
        return "";
     }

    // Crea el objeto con los nombres de parámetro deseados
    const params = {
        "capitulo": ID, // <--- Cambio clave aquí: de "episode" a "capitulo"
        "Authorization": token
    };

    // Usa URLSearchParams para construir la cadena de consulta correctamente codificada
    const queryString = new URLSearchParams(params).toString();

    // Retorna la cadena precedida por '?'
    return `?${queryString}`;
}
function getTempsandEpisodes(temporadas) {
    if (!temporadas) return null;
    if (!Array.isArray(temporadas)) return null;
    // retornar un objeto con .length; y sumar del array.capitulos segun el numero de temporadas.length
    return {
        length: temporadas.length,
        season: temporadas.length,
        episodes: temporadas.reduce((acc, cur) => acc + cur.capitulos.length, 0)
    }
}
/* epJson.data:         "idCatalogo": 4944,
        "nombreCatalogo": "solo leveling",
        "tipoCatalogo": 1,
        "estadoCatalogo": 2,
        "imagenPortadaCatalogo": "https:\/\/i.ibb.co\/1Lq0Cvs\/5955834.jpg",
        "imagenFondoCatalogo": "https:\/\/i.ibb.co\/RB6LD03\/solo-leveling-arise-jinwoo.webp",
        "descripcionCatalogo": "Solo Leveling es un anime basado en la popular novela web y manhwa del mismo nombre. La historia sigue a Jinwoo Sung, un cazador d\u00e9bil en un mundo donde portales a dimensiones llenas de monstruos aparecen regularmente. Despu\u00e9s de un incidente que casi lo mata, Jinwoo obtiene la habilidad de \"subir de nivel\" como en un videojuego, permiti\u00e9ndole volverse cada vez m\u00e1s fuerte de manera infinita. A medida que crece en poder, descubre oscuros secretos sobre los portales, el mundo y su propio destino. El anime destaca por sus intensas batallas, desarrollo de personajes y una narrativa llena de acci\u00f3n y misterio.",
        "nsfwCatalogo": 0,
        "recomendacionCatalogo": 0,
        "trailerCatalogo": "https:\/\/www.youtube.com\/embed\/8VJR7fTv30k?si=963vdBAyQ0kjEAv3",
        "temporadas": []

        */

// funcion para sacar de un array de objetos a un array de strings
function getCategories(array) {
    let newArray = [];
    if (!array) return null;
    for (let i = 0; i < array.length; i++) {
      if (array[i].nombre || array[i].nombreCategoria) {
        newArray.push(array[i].nombre || array[i].nombreCategoria);
      }
    }
    return newArray;
  }
  /*capitulos: Array(12) [ {…}, {…}, {…}, … ]
​​
0: Object { idCapitulo: 63500, numeroCapitulo: 1, catalogoCapitulo: 4944, … }
​​​
catalogoCapitulo: 4944
​​​
descripcionCapitulo: null
​​​
idCapitulo: 63500
​​​
imagenCapitulo: ""
​​​
meGustasCapitulo: 2
​​​
noMeGustasCapitulo: 0
​​​
numeroCapitulo: 1
​​​
pathCapitulo: null
​​​
reproduccionesCapitulo: 47
​​​
temporadaCapitulo: 18
​​​
tiempoCapitulo: 18
​​​
tituloCapitulo: null*/
function parseEpisodes(capitulos, data) {
     // keys-title, altTitle, imageUrl, episodes, languages, status
    return capitulos.map(episode => {
        return {
            id: episode.idCapitulo,
            title: episode.tituloCapitulo || data.nombreTemporada,
            altTitle: episode.tituloCapitulo || data.nombreTemporada,
            imageUrl: episode.imagenCapitulo || data.portadaTemporada,
            episodes: episode.numeroCapitulo,
            languages: episode.lenguajes,
            status: episode.numeroCapitulo
        }
    });
}
export {animeInfoRender, renderTemporadas};