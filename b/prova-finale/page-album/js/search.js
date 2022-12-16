import { Artisti, ListSongs, Songs } from './moduli/moduls.js';
let cerca = document.querySelector('#cerca');


cerca.addEventListener('click', function () {
  let main = document.querySelector('main');

  main.innerHTML = '';

  main.style.backgroundColor = 'black';

  main.classList.add('container-fluid');

  main.innerHTML = `<div class="row justify-content-between pt-2 pb-3">

    <!--Frecce per moversi nella paggina-->
    <div id="frecce" class="col-7 d-flex align-items-center gap-3">
      <i class="bi bi-chevron-left ms-2 desk-arrow"></i>
      <i class="bi bi-chevron-right ms-2 desk-arrow d-none d-xl-inline"></i>
      <div class="px-3 py-2 bg-white rounded-pill text-dark">
      <i class="bi bi-search"></i>
      <input type="text" class="querry border-0" placeholder='Cosa vuoi ascoltare?'/>
      <i class="bi bi-x-lg del"></i>
      </div>
    </div>

    <!--Elemento utente-->
    <div id="user-cont" class="col-5 d-flex align-items-center text-end d-none ps-4 d-xl-block">
      <button id="user" class=" m-0 p-0">
        <img src="../assets/img/SVG_Circle.svg.png" class="pe-1 img-fluid" alt=""> Lidia Nautilus ... <i
          class="bi bi-caret-down-fill px-2"></i></button>
    </div>

  </div>
  
  <section id='container-song-track' class="search-result container">
  <div class='row'>
  </div>
  </section>

  <section id='categorie'>
  <div class='row'>
  </div>
  </section>

  `;

  l();
  let input = document.querySelector('.querry');
  let cont = document.querySelector('.search-result .row');
  let delPuls = document.querySelector('.del');

  delPuls.addEventListener('click', function () {
    input.value = '';
    cont.innerHTML = '';
  })

  input.addEventListener('keyup', function () {
    let query = input.value;
    let url = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
    fetch(url).then(result => {
      if (!result.ok) {
        throw result.status;
      }
      return result.json()
    }).then(data => {

      let artista = new ListSongs(data);

      cont.innerHTML = '';

      for(let i of artista.songs){
        let div = document.createElement("div");

        let song = new Songs(i);

        div.classList.add('col-3', 'p-3');

        div.innerHTML = 
        `<div row>
            <img class="img-fluid" src="${song.album.cover}">
            <p class='album-fetch'>${song.album.title}</p>
            <p>${song.title}</p>
            <p class='artista-fetch'>${song.artist.name}</p>
          </div>`;

        cont.append(div);

        let artist = div.querySelector('.artista-fetch');
        let album = div.querySelector('.album-fetch');
        let img = div.querySelector('img');

        img.addEventListener('click', function() {
          song.playSong();
        })

        artist.addEventListener('click', function(){
          sessionStorage.setItem('id', song.artist.id);
          window.location.href = '../page-artista/index-artista.html';
        })

        album.addEventListener('click', function(){
          sessionStorage.setItem('id', song.album.id);
          window.location.href = '../page-album/index-album.html';
        })

      }

    }).catch(err => console.log(err));
  })

})


function l(){
  fetch('../assets/json/categorie.json').then(response => response.json()).then(data => {

    for(let i = 0; i < 4; i++){
      let v = document.querySelector('#categorie .row');
      
      console.log(v);
      
      let div = document.createElement("div");
      
      div.classList.add('col-3', 'p-3');
      div.style.backgroundColor = data[i].color
      
      div.innerHTML = 
      `<div row>
      <img class="img-fluid" src="${data[i].img}">
      <p>${data[i].name}</p>
      </div>`;
      
        v.append(div);
      }
    });
};

document.querySelector('.bi-chevron-right').addEventListener('click', function() {
  console.log('cioa');
  window.history.forward();
});

document.querySelector('.bi-chevron-left').addEventListener('click', function() {
  console.log('cioa');
  window.history.back();
});