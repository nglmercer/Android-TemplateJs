// Archivo: main.js
import './components/search-filter.js';
import {searchfetchpost, paginafetchPOST} from './fetch/fetch.js';
const payloadExample = {"nombreCatalogo":"blue","tiposCatalogo":"[]","estadosCatalogo":"[]","categoriasCatalogo":"[]"}
const testdata = [
    {
      "idCatalogo": 4990,
      "nombreCatalogo": "Blue Exorcist ",
      "tipoCatalogo": 1,
      "estadoCatalogo": 2,
      "imagenPortadaCatalogo": "https:\/\/i.ibb.co\/V22PcnH\/cead08fd2ced6e6dbe056ce0381da6ff.jpg",
      "imagenFondoCatalogo": "https:\/\/i.ibb.co\/1dB80g0\/Anime-Blue-Exorcist-Special-Visual-Shimane-Illuminati-Saga.jpg",
      "descripcionCatalogo": "\r\nBlue Exorcist (Ao no Exorcist) es un popular anime y manga creado por Kazue Kato. La serie se centra en Rin Okumura, un adolescente que descubre ser el hijo de Satan\u00e1s. Aunque posee un gran poder demon\u00edaco, Rin decide oponerse a su destino y convertirse en un exorcista para luchar contra su padre y proteger a la humanidad.\r\n\r\nSinopsis:\r\nRin y su hermano gemelo Yukio fueron criados por el Padre Shiro Fujimoto, un sacerdote exorcista. Tras un ataque de demonios, Rin descubre su origen demon\u00edaco y su herencia: la espada Kurikara, que sella sus poderes. Al desencadenar su poder, Rin se compromete a ingresar a la Academia de la Verdadera Cruz, una escuela para futuros exorcistas. All\u00ed, entrena junto a otros estudiantes mientras enfrenta peligros, desvela conspiraciones y lucha por reconciliar su naturaleza humana y demon\u00edaca.\r\n\r\nTemas:\r\nIdentidad y prop\u00f3sito: Rin lucha contra sus or\u00edgenes y busca definir qui\u00e9n es realmente.\r\nRelaciones familiares: La compleja relaci\u00f3n entre Rin, Yukio y su herencia demon\u00edaca es central.\r\nAmistad y trabajo en equipo: Los compa\u00f1eros de Rin enfrentan juntos desaf\u00edos sobrenaturales.\r\nAdaptaciones:\r\nManga: Publicado desde 2009, el manga sigue en curso y profundiza m\u00e1s en la historia.\r\nAnime:\r\nPrimera temporada (2011): Cubre los primeros arcos del manga con un final original.\r\nKyoto Saga (2017): Sigue fielmente el arco de Kyoto del manga.\r\nTercera temporada: Confirmada para 2024.\r\nPel\u00edcula (2012): Presenta una historia original independiente del manga.",
      "nsfwCatalogo": 0,
      "recomendacionCatalogo": 0,
      "trailerCatalogo": "https:\/\/drive.google.com\/file\/d\/1b0kfgxOv5aCraRQ2QVPnOzTbXoLlyMyE\/preview"
  }
  ]
/*
const objectFilter = [
{
    "label": "Catergorias",//categoriasCatalogo
    "value": []
    "options": [
    {"label":"Accion","value":1 }]

},
{
    "label": "Tipos",//tiposCatalogo
    "value": []
    "options": [
    {"label":"Anime","value":1 },
    {"label":"Pelicula","value":2 }]
    {"label":"Especial","value":3 },
},
{
    "label": "Estados",//estadosCatalogo
    "value": []
    "options": [
    {"label":"En emision","value":1 },
    {"label":"Finalizado","value":2 },
    {"label":"Próximamente","value":3 }]
}
]
const getsearchresult = searchfetchpost("https://api.koinima.com/catalogos/buscar",payloadExample);
console.log(getsearchresult);
 */
//
document.addEventListener('DOMContentLoaded',async function() {
    const searchFilter = document.querySelector('search-filter');
    const grid1 = document.getElementById('grid1');

    console.log(searchFilter);
    searchFilter.addEventListener('filtrar', async (e) => {
        if (!e.detail || !e.detail.busqueda) return;
    //    console.log("searchResult",e.detail, "parseSearchResult", parseSearchResult(e.detail));
        const payloadExample = parseSearchResult(e.detail);
        const responseSearch = await searchfetchpost("https://api.koinima.com/catalogos/buscar",payloadExample);
        console.log("responseSearch",responseSearch);
        if (responseSearch && responseSearch.data){
            grid1.animes = parseItems(responseSearch.data);
        }
    });
    grid1.animes = [
      {
        title: 'Botsuraku Yotei no Kizoku dakedo, Hima Datta kara Mahou wo Kiwamete mita',
        altTitle: 'Botsuraku Yotei no Kizoku dakedo, Hima Datta kara Mahou wo Kiwamete mita',
        imageUrl: 'https://i.ibb.co/CKMwP5hr/2.jpg',
        episodes: '1 - 12',
        languages: 'japones',
        status: '¡En emision!'
      },
      {
        title: 'Guild no Uketsukejou desu ga, Zangyou wa Iya nanode Boss wo Solo Toubatsu Shiyou to Omoimasu',
        altTitle: 'Guild no Uketsukejou desu ga, Zangyou wa Iya nanode Boss wo Solo Toubatsu Shiyou to Omoimasu',
        imageUrl: 'https://i.ibb.co/CdGJW9M/04.png',
        episodes: '1 - 10',
        languages: 'japones',
        status: '¡En emision!'
      },
      {
        title: 'Zenshuu',
        altTitle: 'Zenshuu',
        imageUrl: 'https://i.ibb.co/HpqcjmVr/03.webp',
        episodes: '1 - 11',
        languages: 'japones, español',
        status: '¡En emision!'
      },
      {
        title: 'Trapezium',
        altTitle: 'trapezium',
        imageUrl: 'https://i.ibb.co/JFRvm3dN/03.webp',
        episodes: '1 - 1',
        languages: 'japones',
        status: '¡En emision!'
      },
      {
        title: 'Fuguushoku "Kanteishi" ga Jitsu wa Saikyou Datta',
        altTitle: 'Fuguushoku "Kanteishi" ga Jitsu wa Saikyou Datta',
        imageUrl: 'https://i.ibb.co/SwVhYbM6/02.jpg',
        episodes: '1 - 10',
        languages: 'japones',
        status: '¡En emision!'
      },
      {
        title: 'Momentary Lily',
        altTitle: 'Momentary Lily',
        imageUrl: 'https://i.ibb.co/YBDf23mC/03.png',
        episodes: '1 - 10',
        languages: 'japones',
        status: '¡En emision!'
      }
    ];
    const defaultItems = await paginafetchPOST();
    console.log("defaultItems",defaultItems);
    if (defaultItems && defaultItems.data){
        const parseitems = parseItems(defaultItems.data);
        console.log("parseitems",parseitems);
        grid1.animes = parseitems;
    }
    // Escuchar eventos personalizados
    grid1.addEventListener('anime-selected', (event) => {
      const data = event.detail;
      console.log("anime-selected", data);
      const linkToRedirect = data.id ? `/index2.html?ver=${data.id}` : '/index2.html';
      console.log("linkToRedirect", linkToRedirect);
      window.location.href = linkToRedirect;
    });
/*     const newparsedItems = parseItems(testdata);
    console.log("newparsedItems", newparsedItems, testdata);
    grid1.animes = newparsedItems; */
});
function parseSearchResult(data) {
/*     let payloadExample = {
        "nombreCatalogo":"searchinput",
        "tiposCatalogo":"[]",
        "estadosCatalogo":"[]",
        "categoriasCatalogo":"[]"
    } */
    return {
        nombreCatalogo: data.nombreCatalogo || data.busqueda,
/*         tiposCatalogo: data.tiposCatalogo || data.tipos,
        estadosCatalogo: data.estadosCatalogo || data.estados,
        categoriasCatalogo: data.categoriasCatalogo || data.categorias */
        tiposCatalogo: "[]",
        estadosCatalogo: "[]",
        categoriasCatalogo: "[]"
    }
}
function parseItems(items, moredata) {
    if (!items) return null;
    if (!Array.isArray(items)) return null;
    return items.map(item => {
      const id = item.idCatalogo;
      const title = item.title || item.nombreCatalogo;
      const altTitle = item.altTitle || item.nombreTemporada || title;
      const imageUrl = item.imageUrl || item.imagenFondoCatalogo || item.portadaTemporada;
      const episodes = item.episodes || item.numeroCapitulo;
      const languages =  obtenerNombre(item.lenguajes) || item.lenguaje;
      const status = item.status || moredata?.status;
      return {
        ...item,
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
  function obtenerNombre(array) {
    if (!array) return null;
    for (let i = 0; i < array.length; i++) {
      if (array[i].nombre) {
        return array[i].nombre;
      }
    }
    return null;
  }