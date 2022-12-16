let n = 0;
let bloccoBrano = document.querySelector('.brani');
let bloccoIntro = document.querySelector('.intro');
let bloccoAlbum = document.querySelector('.albumHome');

let url = sessionStorage.getItem('id');

fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${url}`)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        console.log(result.tracks.data)
           bloccoAlbum.innerHTML = `<img src="${result.cover_big}" alt="" class="col-3">


           <div class="col-9 d-flex flex-column align-self-end intro"><p id="desk-header-album">ALBUM</p>
           <h1 id="desk-header-h1" class="pb-3 m-0">${result.title}</h1>
           <h6 id="desk-header-artist" class="d-flex align-items-center p-0 m-0"><img
                   src="${result.cover_medium}" class="me-1 rounded-circle" alt="gruppo avatar">${result.artist.name} <span>· ${result.release_date} · ${result.nb_tracks} brani</span>,&nbsp;<span> ${result.duration}.</span></h6></div>`


        result.tracks.data.forEach (el => {
            let provaTempo = parseInt(el.duration/60)+":"+(el.duration%60);
            n+=1;
            bloccoBrano.innerHTML += `<div class="container row pb-2">
            <div class="col-7 d-flex align-items-center">
                <p class="pe-3 fw-bold">${n}</p>
                <div>
                    <h6 class="m-0">${el.title}</h6>
                    <p>${el.artist.name}</p>
                </div>
            </div>
            <p class="col-3 text-end p-0 ">${el.id}</p>
            <p class="col-2 text-end p-0 ">${provaTempo}</p>
        </div>`
            ;
        });
    })

    
    



