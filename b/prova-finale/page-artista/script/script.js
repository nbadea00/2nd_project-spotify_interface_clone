import { Artisti }  from './moduli/moduls.js';
import { Songs }  from './moduli/moduls.js';

const url = sessionStorage.getItem('id');;

const ajaxCall = fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${url}`).then((response) => response.json()).then((data) => data);

async function artista (){
    let rispAjax = await ajaxCall;

    let artista = new Artisti(rispAjax);

    artista.compilPage();

    setInterval(function(){//timer per passare alla prossima canzone
        Songs.timeSkip();
    }, 1000);
}

window.onload = artista();