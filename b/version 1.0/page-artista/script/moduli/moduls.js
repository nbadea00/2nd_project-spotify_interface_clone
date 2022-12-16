export class Artisti {
    constructor(artista) {
        this.id = artista.id;
        this.name = artista.name;
        this.picture = [artista.picture, artista.picture_small, artista.picture_medium, artista.picture_big, artista.picture_xl];
        this.fan = artista.nb_fan;
        this.tracklist = artista.tracklist;
        this.type = artista.type;
    }

    compilPage() {
        this.compilCover(this);

        this.compilBrani(this);

        this.compilTrack(this).then((r) => {
            for ( let i of r){
                i.insetSong(r.indexOf(i));
            }
        });
    }

    compilBrani(art){
        let cont = document.querySelector('.track-likes-svg img');
        cont.src = art.picture[1];
    }

    compilCover(art) {
        let bg = document.querySelector('.background');
        let name = document.querySelector('#artist-name');
        let nbFan = document.querySelector('#fan');

        name.textContent = art.name;
        nbFan.textContent = art.fan + ' ascoltatori mensili';
        bg.style.backgroundImage = 'url(' + art.picture[4];
    }

    async compilTrack(art) {
        let songList = [];

        return fetch(art.tracklist).then((response) => response.json()).then((date) => {
            for (let i of date.data) {
                let a = new Songs(i);
                songList.push(a);

            }
        }).then(() => songList)

    }
}

export class Songs {
    constructor(song) {
        this.id = song.id;
        this.title = song.title;
        this.duration = song.duration;
        this.preview = song.preview;
        this.artist = song.artist;
        this.cover = song.album.cover;
    }

    insetSong(n){
        let contSong = document.querySelector('#container-song-track');
        let div = document.createElement('div');

        div.classList.add('row', 'align-items-center');

        let time = parseInt(this.duration/60) + ":" + parseInt((this.duration%60)/10) + parseInt((this.duration%60) - parseInt((this.duration%60)/10)*10);

        div.innerHTML = `<div class="col-6">
        <p class="track-name"><span class="track-number">${n+1}</span><img class="track-img" src="${this.cover}"
          alt="">${this.title}</p>
        </div>
        <div class="col-4">
          <p class="track-views">${this.id}</p>
        </div>
        <div class="col-1 ">
          <p class="track-duration">${time}</p>
        </div>`;

        this.conectToPlayer(div, this)

        contSong.append(div);
    }

    conectToPlayer(cont, song){
        cont.addEventListener('click', function(){
            let ply = document.querySelector('audio');
            let playButton = document.querySelector('#play');
            let timeF = document.querySelector('#time-fine');

            timeF.textContent = parseInt(song.duration/60) + ":" + parseInt((song.duration%60)/10) + parseInt((song.duration%60) - parseInt((song.duration%60)/10)*10);

            playButton.style.color = 'red';
            ply.src = song.preview;
            ply.play();
        });
    }
}