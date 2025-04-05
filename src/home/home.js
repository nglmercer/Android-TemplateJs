import {aleatoriofetchget} from '/src/fetch/fetch.js';
import {getCategories, getTempsandEpisodes} from '/src/utils/utils.js';
const poster_card = document.querySelector('poster-card');

function changePoster_card(data) {
    if (poster_card && data) {
        /*response aleatoriofetchget 
Object { idCatalogo: 4964, nombreCatalogo: "Record of Lodoss War", tipoCatalogo: 1, estadoCatalogo: 2, imagenPortadaCatalogo: "https://i.ibb.co/xmm4n4c/29750162-1640721402649715-663773857303136620-o.jpg", imagenFondoCatalogo: "https://i.ibb.co/G0yMgr0/recordoflodoss-1000x600.jpg", descripcionCatalogo: "En la mística isla de Lodoss, una tierra devastada por guerras y conflictos, un grupo de héroes se alza para protegerla de una amenaza que podría destruirla por completo. Guiados por el joven guerrero Parn, el grupo incluye al astuto ladrón Woodchuck, la poderosa hechicera Slayn, la valiente elfa Deedlit, y otros aliados, cada uno con habilidades únicas y motivos personales. Juntos, deberán enfrentarse a oscuros señores, demonios y los secretos de Lodoss misma, en una lucha que decidirá el destino de su mundo.\r\n\r\nQué puedes esperar:\r\n\r\nUna Aventura Épica: Batallas colosales, alianzas inesperadas y una lucha constante entre el bien y el mal.\r\nPersonajes Memorables: Desde el valiente Parn hasta la encantadora Deedlit, cada personaje aporta profundidad y carisma.\r\nUna Historia Clásica: Inspirada en campañas de rol, este anime es un hito del género de fantasía.\r\nArte y Música Icónicos: Escenarios bellamente detallados y una banda sonora épica que complementa la narrativa.", nsfwCatalogo: 0, recomendacionCatalogo: 0, trailerCatalogo: "https://drive.google.com/file/d/1fxT33nOERG_vPSi_IbqW0lf8dGtaRzce/preview", … }
​
cantidadCapitulos: 40
​
capituloUno: 63614
​
categorias: Array [ {…} ]
​
descripcionCatalogo: "En la mística isla de Lodoss, una tierra devastada por guerras y conflictos, un grupo de héroes se alza para protegerla de una amenaza que podría destruirla por completo. Guiados por el joven guerrero Parn, el grupo incluye al astuto ladrón Woodchuck, la poderosa hechicera Slayn, la valiente elfa Deedlit, y otros aliados, cada uno con habilidades únicas y motivos personales. Juntos, deberán enfrentarse a oscuros señores, demonios y los secretos de Lodoss misma, en una lucha que decidirá el destino de su mundo.\r\n\r\nQué puedes esperar:\r\n\r\nUna Aventura Épica: Batallas colosales, alianzas inesperadas y una lucha constante entre el bien y el mal.\r\nPersonajes Memorables: Desde el valiente Parn hasta la encantadora Deedlit, cada personaje aporta profundidad y carisma.\r\nUna Historia Clásica: Inspirada en campañas de rol, este anime es un hito del género de fantasía.\r\nArte y Música Icónicos: Escenarios bellamente detallados y una banda sonora épica que complementa la narrativa."
​
estadoCatalogo: 2
​
idCatalogo: 4964
​
imagenFondoCatalogo: "https://i.ibb.co/G0yMgr0/recordoflodoss-1000x600.jpg"
​
imagenPortadaCatalogo: "https://i.ibb.co/xmm4n4c/29750162-1640721402649715-663773857303136620-o.jpg"
​
nombreCatalogo: "Record of Lodoss War"
​
nsfwCatalogo: 0
​
recomendacionCatalogo: 0
​
temporadas: Array [ {…}, {…} ]
​
tipoCatalogo: 1
​
trailerCatalogo: "https://drive.google.com/file/d/1fxT33nOERG_vPSi_IbqW0lf8dGtaRzce/preview"*/
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
  };*/
  poster_card.title = data.nombreCatalogo;
  poster_card.synopsis = data.descripcionCatalogo;
  //    season: { type: Number },    episodes: { type: Number },
  poster_card.season = getTempsandEpisodes(data.temporadas).season;
  poster_card.episodes = getTempsandEpisodes(data.temporadas).episodes || data.cantidadCapitulos;
  poster_card.posterUrl = data.imagenPortadaCatalogo;//imagenFondoCatalogo
  poster_card.ID = data.idCatalogo;
  poster_card.addEventListener('poster-clicked', (e) => {
    const data = e.detail;
    const linkToRedirect = data.ID ? `/index2.html?ver=${data.ID}` : '/index2.html';
    console.log("linkToRedirect", linkToRedirect);
    window.location.href = linkToRedirect;
  });
    }
}
aleatoriofetchget().then(response => {
    if (response){
        console.log("response aleatoriofetchget",response);
        changePoster_card(response);
    }
});