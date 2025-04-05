// url to fetch ${baseApi}/catalogos/buscar
// request payload 
const payloadExample = {"nombreCatalogo":"blue","tiposCatalogo":"[]","estadosCatalogo":"[]","categoriasCatalogo":"[]"}
// tiposCatalogo estadosCatalogo and categoriasCatalogo is  array of nunmber [1,2,3]
// auth token
const token = localStorage.getItem('token') || "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3NDI3ODI2ODUsImV4cCI6MTc0MzY0NjY4NSwiZGF0YSI6eyJpZFVzdWFyaW8iOjYwOCwiYXBvZG9Vc3VhcmlvIjoibWVtZWxzZXIiLCJjb3JyZW9Vc3VhcmlvIjoibmdsbWVyY2VyQGdtYWlsLmNvbSIsInJvbFVzdWFyaW8iOjEsIm5zZndVc3VhcmlvIjp0cnVlLCJmZWNoYUNyZWFjaW9uIjoiMjAyNS0wMy0yMSAyMjozNjoxMiIsImFwaWNvZGUiOm51bGwsImZlY2hhTmFjaW1pZW50byI6bnVsbCwibm9tYnJlcyI6bnVsbCwiYXBlbGxpZG9zIjpudWxsLCJzdGF0ZSI6bnVsbCwiY291bnRyeSI6MCwicGhvbmUiOm51bGwsInByZVJlZ2lzdHJhZG8iOjEsImNyZWFkb3JDb250ZW5pZG8iOjAsImFudGljaXBhZG8iOjAsImZvdG9QZXJmaWxVc3VhcmlvIjpudWxsLCJwbGFuIjp7ImlkUGxhbiI6NCwibm9tYnJlUGxhbiI6IktvaW5pY2x1YiIsInByZWNpb0NlbnRhdm9zIjo0NTAsIm1lc2VzIjoxLCJ0aXBvIjoyfSwiaWRVbHRpbWFUcmFuc2FjY2lvbiI6MTMxLCJmZWNoYVVsdGltYVRyYW5zYWNjaW9uIjpudWxsLCJub21icmVSb2wiOiJVc3VhcmlvIn19.-KdalgQRHQBwKNc8jI0cQoCAsR-pSuCEGlIvnTxJ5XQ";
const userInfo = JSON.parse(localStorage.getItem('user')) || {};
// post function fetch
const baseApi = "https://api.koinima.com";
const searchfetchpost = async (url, payload) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    return response.json();
}
// {"nombreCatalogo":"blue","tiposCatalogo":"[]","estadosCatalogo":"[]","categoriasCatalogo":"[]"}
// {"nombreCatalogo":"blue","tiposCatalogo":[],"estadosCatalogo":[],"categoriasCatalogo":[]}

// url to fetch ${baseApi}/catalogo/5018/info GET
const infofetchget = async (url, payload) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });
    return response.json();
}
const urltemplateInfo = (id) => {
    return `${baseApi}/catalogo/${id}/info`;
}
// ${baseApi}/capitulo/63500
const episodeInfofetchget = async (url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
const urlepisodetemplate = (id) => {
    return `${baseApi}/capitulo/${id}`;
}
const fetchSubJson = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const text = await response.json();
    console.log("text",text);
    return text;
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    return null;
  }
}
const urlsubtittleTemplate = (id) => {
    //${baseApi}/res/subtitulos/
    return `${baseApi}/res/subtitulos/${id}/v1?Authorization=${token}`;
}
const fetchsubtitles = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const text = await response.text();
    console.log("text",text);
    return text;
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    return null;
  }
}
async function test(){
    console.log("fetch");
/*     const subtitles = await fetchSubJson(urlsubtittleTemplate(64470));
    console.log("subtitles",subtitles); */
    const testurl = "https://f005.backblazeb2.com/file/KoinimaCDN/5003/104/64470/subs/esLA.ass?Authorization=3_20250327052015_c1c1413e79ad50d5858d3695_4c312d7fc4fb2d67190e5c4d6890304c0e476544_005_20250327082015_0014_dnld"
    const subtitles = await fetchsubtitles(testurl);
    console.log("subtitles",subtitles)
    //this is array [0].ruta is https://f005.backblazeb2.com/file/KoinimaCDN/5003/104/64470/subs/esLA.ass?Authorization=3_20250327052015_c1c1413e79ad50d5858d3695_4c312d7fc4fb2d67190e5c4d6890304c0e476544_005_20250327082015_0014_dnld
}
//{"status":200,"data":{"idCapitulo":63500,"numeroCapitulo":1,"imagenCapitulo":"","catalogoCapitulo":4944,"meGustasCapitulo":2,"noMeGustasCapitulo":0,"reproduccionesCapitulo":49,"descripcionCapitulo":null,"tituloCapitulo":null,"pathCapitulo":null,"tiempoCapitulo":18,"temporadaCapitulo":18,"idTemporada":18,"numeroTemporada":1,"nombreTemporada":" Solo Leveling Season 1","descripcionTemporada":"el cazador m\u00e1s d\u00e9bil en un mundo donde las personas luchan contra monstruos que emergen de portales dimensionales. Tras una misi\u00f3n fallida en una mazmorra, Jinwoo despierta con una habilidad \u00fanica: puede \"subir de nivel\" como en un videojuego, haci\u00e9ndose m\u00e1s fuerte con cada misi\u00f3n que completa. A lo largo de la temporada, Jinwoo pasa de ser despreciado y subestimado a convertirse en uno de los cazadores m\u00e1s poderosos, enfrent\u00e1ndose a enemigos formidables y descubriendo secretos ocultos sobre los portales y su propio destino.\r\n\r\n\r\n\r\n\r\n\r\n\r\n","portadaTemporada":"https:\/\/i.ibb.co\/CBhKKX0\/filters-quality-95-format-webp-1.jpg","catalogoTemporada":4944,"nsfw":0,"idCatalogo":4944,"nombreCatalogo":"solo leveling","tipoCatalogo":1,"estadoCatalogo":2,"imagenPortadaCatalogo":"https:\/\/i.ibb.co\/1Lq0Cvs\/5955834.jpg","imagenFondoCatalogo":"https:\/\/i.ibb.co\/RB6LD03\/solo-leveling-arise-jinwoo.webp","descripcionCatalogo":"Solo Leveling es un anime basado en la popular novela web y manhwa del mismo nombre. La historia sigue a Jinwoo Sung, un cazador d\u00e9bil en un mundo donde portales a dimensiones llenas de monstruos aparecen regularmente. Despu\u00e9s de un incidente que casi lo mata, Jinwoo obtiene la habilidad de \"subir de nivel\" como en un videojuego, permiti\u00e9ndole volverse cada vez m\u00e1s fuerte de manera infinita. A medida que crece en poder, descubre oscuros secretos sobre los portales, el mundo y su propio destino. El anime destaca por sus intensas batallas, desarrollo de personajes y una narrativa llena de acci\u00f3n y misterio.","nsfwCatalogo":0,"recomendacionCatalogo":0,"trailerCatalogo":"https:\/\/www.youtube.com\/embed\/8VJR7fTv30k?si=963vdBAyQ0kjEAv3","servidores":[]},"message":"La informacion del catalogo es"}
// ${baseApi}/catalogo/aleatorio Aleatorio
const aleatoriofetchget = async (url) => {
    if (!url) url = aleatorioTemplate();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
const  aleatorioTemplate = () => {
    return `${baseApi}/catalogo/aleatorio`;
}
//${baseApi}/catalogo/recomendado
const recomendadoTemplate = () => {
    return `${baseApi}/catalogo/recomendado`;
}
const recomendadofetchget = async (url=recomendadoTemplate()) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
const updatetokenPUT = async (url=updatetokenTEMPLATE(), payload={}) => {
    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify(payload)
    });
    return response.json();
}
const updatetokenTEMPLATE = () => {
    return `${baseApi}/token/actualizar`;
}//PUT https://api.koinima.com/token/actualizar
//GET https://api.koinima.com/capitulos/por/estados
const estadosTemplate = () => {
    return `${baseApi}/capitulos/por/estados`;
}
const estadosfetchget = async (url=estadosTemplate()) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
async function verifyToken() {
    const response = await updatetokenPUT();
    console.log("response",response);
    if (response && response.data) {
      if (!response.token) {
        window.location.href = "/login.html";
        console.error("No se encontró token en la respuesta de updatetokenPUT", response);
        return;
      }
        setToken(response.data.token);
        console.log("localStorage.getItem('token')",localStorage.getItem('token'));
    }
    
    const token = localStorage.getItem('token');
    if (token) {
        console.log("token",token); 
    } else {
      window.location.href = "/login.html";
        console.log("token no encontrado");
    }
}
function setToken(string) {
    if (typeof string !== 'string') return;
    localStorage.setItem('token', string);
}
verifyToken();
// https://api.koinima.com/catalogos/pagina/1
const paginaTemplate = (pageNumber) => {
    return `${baseApi}/catalogos/pagina/${pageNumber}`;
}
const paginafetchPOST = async (url=paginaTemplate(1)) => {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        },
        body: JSON.stringify({"tiposCatalogo":"[]","estadosCatalogo":"[]","categoriasCatalogo":"[]"})
    });
    return response.json();
}
//GET https://api.koinima.com/usuario/5/favoritos
//{"status":200,"data":[],"message":"Se han listado tus favoritos"}
const favoritosTemplate = (id) => {
    return `${baseApi}/usuario/${id}/favoritos`;
}
const favoritosfetchget = async (url=favoritosTemplate(userInfo.id)) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}
//GET https://api.koinima.com/usuario/5/historial
//{"status":200,"data":[],"message":"Se han listado tu historial"}
const historialTemplate = (id) => {
    return `${baseApi}/usuario/${id}/historial`;
}
const historialfetchget = async (url=historialTemplate(userInfo.idUsuario)) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`
        }
    });
    return response.json();
}
export {
    historialfetchget,
    infofetchget,
    urltemplateInfo,
    urlepisodetemplate,
    episodeInfofetchget,
    token,
    aleatoriofetchget,
    searchfetchpost,
    recomendadoTemplate,
    recomendadofetchget,
    updatetokenPUT,
    estadosfetchget,
    verifyToken,
    paginafetchPOST,
    favoritosfetchget
};