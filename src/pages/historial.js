import {historialfetchget} from '../fetch/fetch.js';
import {parseAnimeItems} from '../utils/utils.js';
const historial = document.querySelector('#Historial_grid');
async function updateElement(data) {
        const dataParsed = parseAnimeItems(data.data);
        console.log("dataParsed",dataParsed);
        historial.animes = dataParsed;
}
async function updateHistorial() {
    const historialData = await historialfetchget();
    if (historialData && historialData.data){
        updateElement(historialData);
    }
}
export {updateHistorial};