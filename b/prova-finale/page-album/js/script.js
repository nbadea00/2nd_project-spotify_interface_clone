import { Songs, ListSongs} from './moduli/moduls.js'

//Desktop variables
let n = 0;
let bloccoBrano = document.querySelector('.brani');
let bloccoIntro = document.querySelector('.intro');
let bloccoAlbum = document.querySelector('.albumHome');
//Mobile variables
let albumCover = document.querySelector('#album-cover');
let albumTitle = document.querySelector('#album-title');
let albumArtist = document.querySelector('#album-artist')
let albumYear = document.querySelector("#album-year");
let albumTracks = document.querySelector('#album-tracks');
let querry = sessionStorage.getItem('id');


fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${querry}`)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        console.log(result.tracks.data)



        // Fetch Desktop



        bloccoAlbum.innerHTML = `<img src="${result.cover_big}" alt="" class="col-3">


           <div class="col-9 d-flex flex-column align-self-end intro"><p id="desk-header-album">ALBUM</p>
           <h1 id="desk-header-h1" class="pb-3 m-0">${result.title}</h1>
           <h6 id="desk-header-artist" class="d-flex align-items-center p-0 m-0"><img
                   src="${result.cover_medium}" class="me-1 rounded-circle" alt="gruppo avatar">${result.artist.name} <span>· ${result.release_date} · ${result.nb_tracks} brani</span>,&nbsp;<span> ${result.duration}.</span></h6></div>`



        //Fetch Mobile

        albumCover.innerHTML = `                    <div class="col-2"><i class="bi bi-arrow-left ps-1"></i></div>
            <img class="col-8 " src="${result.cover_big}" alt="copertina album">`
        albumTitle.innerHTML = `<h3>${result.title}</h3>`
        albumArtist.innerHTML = `<img src="${result.cover_small}" alt="#" class="rounded-circle" style="width:20px; height:20px;">
            <p class="d-flex" id="artist-name">${result.artist.name}</p>`
        albumYear.innerHTML = `<p>Album · ${result.release_date}</p>`


        setInterval(function () {//timer per passare alla prossima canzone
            Songs.timeSkip();
        }, 1000);

        // forEach 

        result.tracks.data.forEach(el => {
            let provaTempo = parseInt(el.duration / 60) + ":" + parseInt((el.duration % 60) / 10) + parseInt((el.duration % 60) - parseInt((el.duration % 60) / 10) * 10);
            n += 1;
            //Desktop
            let div = document.createElement('div');
            div.innerHTML = `
            <div class="col-7 d-flex align-items-center">
                <p class="pe-3 fw-bold">${n}</p>
                <div>
                    <h6 class="m-0">${el.title}</h6>
                    <p>${el.artist.name}</p>
                </div>
            </div>
            <p class="col-3 text-end p-0 ">${el.id}</p>
            <p class="col-2 text-end p-0 ">${provaTempo}</p>
            `;

            div.classList.add("container", "row" ,"pb-2");
            
            new Songs(el).conectToPlayer(div,new Songs(el), new ListSongs(result.tracks));

            bloccoBrano.append(div);
        
            //Mobile

            let divMobile = document.createElement('div');
            divMobile.innerHTML = `
            <div>
                <h6 class="m-0 mb-1 ">${el.title}</h6>
                <p>${result.artist.name}</p>
            </div>
            <p><i class="playbar-icons bi bi-three-dots-vertical opacity-50"></i></p>
            `;

            divMobile.classList.add('d-flex' ,'justify-content-between', 'mt-0' ,'mb-4');
            
            new Songs(el).conectToPlayer(divMobile,new Songs(el), new ListSongs(result.tracks));

            albumTracks.append(divMobile);

        });
    })






