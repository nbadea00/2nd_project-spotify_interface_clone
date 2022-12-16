//  fetch 
import { Songs, Artisti, ListSongs } from './moduli/moduls.js';
fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=queen')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        setInterval(function () {//timer per passare alla prossima canzone
            Songs.timeSkip();
        }, 1000);

        let n = Math.floor(Math.random() * data.data.length);

        document.querySelector(".banner").innerHTML = ` <div class="row g-2">
  <div class="col-md-4">
      <img src="${data.data[n].album.cover_medium}" class="img-fluid rounded" alt="...">
  </div>
  <div class="col-md-8">
      <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
              <p class="m-0">Album</p>
              <button>NASCONDI ANNUNCI</button>
          </div>
          <h5 class="card-title">${data.data[n].album.title}</h5>
          <p class="card-text"><span>${data.data[n].artist.name}</span></p>
          <p class="card-text"> Ascolta il nuovo singolo dei ${data.data[n].artist.name}</span></p>
          <div class="card-text d-flex align-items-center gap-3">
              <button class='play-banner'>Play</button>
              <button>Salva</button>
              <i class="bi bi-three-dots"></i>
          </div>
      </div>
  </div>
</div>`;

        let playBanner = document.querySelector('.play-banner');

        new Songs(data.data[n]).conectToPlayer(playBanner, new Songs(data.data[n]), new ListSongs(data));

        for (let i = 6; i <= 10; i++) {
            let disco = data.data[i].album.title;

            let picture = data.data[i].album.cover_medium;
            let container2 = document.querySelector('#extended-playlist .row')
            let div = document.createElement("div")
            div.classList.add("col-12", "col-xl-2", "p-2");


            // 1
            div.innerHTML = `<div class="container rounded-3 mb-3 extended-playlist-cont">
<div class="row">
    <div class="col-6 col-xl-12 cont-img">
        <img class="img-fluid extended-playlist-cont-img" src="${picture}" alt="">
    </div>
    <div class="col-6 col-xl-12 extended-playlist-cont-txt">
        <p class="m-0 d-xl-none"> ${disco}</p>
        <p class="m-0 extended-playlist-cont-title">${data.data[i].artist.name}</p>
        <p class="m-0 extended-playlist-cont-desc d-none d-xl-block">${disco}</p>
    </div>
</div>

<div class="row d-xl-none extended-playlist-cont-icon">
    <div class="col-6 d-flex align-items-center">
        <i class="bi bi-heart col-3"></i>
        <i class="bi bi-three-dots-vertical col-3"></i>
    </div>
    <div class="col-6 d-flex justify-content-end align-items-center">
        <p class="col-6 m-0">10 brani</p>
        </p>
        <button type="button" class="bottone"><i class="bi bi-play-fill"></i></button>
    </div>
</div>
</div>`
            new Songs(data.data[i]).conectToPlayer(div, new Songs(data.data[i]), new ListSongs(data));
            container2.append(div);
        }




        for (var j = 0; j < 6; j++) {


            let disco2 = data.data[j].album.title;
            let picture2 = data.data[j].album.cover_xl;


            let buonasera = document.querySelector('#ultimiascolti1')
            let div2 = document.createElement('div')
            div2.classList.add("col-6", "col-xl-4", "cont-playlist")

            div2.innerHTML = `
        <div class="d-flex playlist align-items-center">
            <img src="${picture2}" class="img-fluid rounded-start playlist-img" alt="">
            <div class=" d-flex align-items-center">
                <h5 class="overflow-hidden playlist-title fs-6">
                    ${disco2}
                </h5>
            </div>
            <i class="bi bi-three-dots info"></i> 
        </div>`

        new Songs(data.data[j]).conectToPlayer(div2, new Songs(data.data[j]), new ListSongs(data));

            buonasera.append(div2)
        }

    }
    )









