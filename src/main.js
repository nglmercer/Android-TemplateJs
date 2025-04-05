// main.js
import catalogo from './json/catalogo.json';      
/* import { ResponsiveNavbar } from './components/responsive-navbar.js';
import { AnimeCarousel } from './components/anime-carousel.js';
import './components/animeCard.js';
import './assets/fonts.css'; */
import './import.js';
import { recomendadofetchget,estadosfetchget,verifyToken } from './fetch/fetch.js';
import { AnimeCardparser } from './utils/dataparser.js';
// main.js - How to use both components together
/* import { infofetchget,urltemplateInfo } from './fetch/fetch.js';
infofetchget(urltemplateInfo(4944)).then(response => {
    console.log("response",response);
}); */
// You can manipulate the components programmatically

// Añade el componente a tu HTML en algún punto
function setAnimeCard(element,data) {
    console.log("data", data);
    element.data = data;
    element.title = data.title;
    element.seasons = data.seasons?.length;
    element.imageUrl = data.imageUrl;
}
document.addEventListener('DOMContentLoaded', async () => {
  const mainanime_card = document.querySelector('anime-card');
  const recomendadofetchgetdata = await recomendadofetchget();
  setAnimeCard(mainanime_card,AnimeCardparser(recomendadofetchgetdata));
  mainanime_card.addEventListener('watch-anime', (e) => {
    console.log(`Starting to watch:`, e.detail);
    const data = e.detail.data;
    if (!data) return;
    const linkToRedirect = data.id ? `/index2.html?ver=${data.id}` : '/index2.html';
    window.location.href = linkToRedirect;
  });
  console.log("catalogo", catalogo);  
  initializecarousels(catalogo);
  const estadosfetchgetdata = await estadosfetchget();
  console.log("estadosfetchgetdata",estadosfetchgetdata);
  if (estadosfetchgetdata){
    initializecarousels(estadosfetchgetdata);
  }
/*   setTimeout(() => {
    const adminPanel = document.querySelector('admin-panel');
    adminPanel.adminMessage = 'BIENVENIDO A KOINIMA!';
  }, 3000); */
    
  
});
function initializecarousels(catalogo) {
  // Usamos un array de configuraciones para no repetir lógica
  const carousels = [
    { data: catalogo.emision, status: '¡En emision!', selector: '.Emision_carousel' },
    { data: catalogo.finalizado, status: '¡Finalizado!', selector: '.Finalizado_carousel' },
    { data: catalogo.proximamente, status: '¡Próximamente!', selector: '.proximamente_carousel' },
  ];
  
  carousels.forEach(({ data, status, selector }) => {
    setCarousel(data, status, selector);
  });
}
function setCarousel(data, status, selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.animes = parseItems(data, { status });
  } else {
    console.warn(`No se encontró el elemento para el selector: ${selector}`);
  }
}

    
/* 
{
  title: 'Botsuraku Yotei no Kizoku dakedo, Hima Datta kara Mahou wo Kiwamete mita',
  altTitle: 'Botsuraku Yotei no Kizoku dakedo, Hima Datta kara Mahou wo Kiwamete mita',
  imageUrl: 'https://i.ibb.co/CKMwP5hr/2.jpg',
  episodes: '1 - 12',
  languages: 'japones',
  status: '¡En emision!'
},
// /*/

function parseItems(items, moredata) {
  if (!items) return null;
  if (!Array.isArray(items)) return null;
  return items.map(item => {
    const id = item.idCatalogo || item.catalogoCapitulo
    const title = item.title || item.nombreCatalogo;
    const altTitle = item.altTitle || item.nombreTemporada;
    const imageUrl = item.imageUrl || item.imagenFondoCatalogo || item.portadaTemporada;
    const episodes = item.episodes || item.numeroCapitulo;
    const languages =  obtenerNombre(item.lenguajes) || item.lenguaje;
    const status = item.status || moredata.status;
    return {
      id,
      title,
      altTitle,
      imageUrl,
      episodes,
      languages,
      status
    }
  });
}
/**

 */
// function obtener de un array de objetos un nombre el primero que encuentre en string array[i].nombre
function obtenerNombre(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].nombre) {
      return array[i].nombre;
    }
  }
  return null;
}