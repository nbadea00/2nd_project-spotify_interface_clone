import { Artisti} from './moduli/moduls.js';

const url = 412;

const ajaxCall = fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${url}`).then((response) => response.json()).then((data) => data);

async function artista (){
    let rispAjax = await ajaxCall;

    let artista = new Artisti(rispAjax);

    artista.compilPage();

    console.log(artista);
}

window.onload = artista();