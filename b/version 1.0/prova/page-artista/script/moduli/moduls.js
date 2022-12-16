let songList = [];//contiene la lista di canzoni
let randArray = [];
export class Artisti {
    constructor(artista) {
        this.id = artista.id;
        this.name = artista.name;
        this.picture = [artista.picture, artista.picture_small, artista.picture_medium, artista.picture_big, artista.picture_xl];
        this.fan = artista.nb_fan;
        this.tracklist = artista.tracklist;
        this.type = artista.type;
    }

    compilPage() {//funzione che genera la pagina
        this.compilCover(this);

        this.compilBrani(this);

        this.compilTrack(this.tracklist).then((r) => {
            for (let i of r.songs) {
                new Songs(i).insetSong(r, r.songs.indexOf(i))
            }
            songList = r;
            Songs.playList(songList);
            r.moreSongs(this, r.next);

        });
    }

    compilBrani(art) {
        let cont = document.querySelector('.track-likes-svg img');
        let name = document.querySelector('.track-artist');
        name.textContent += art.name;
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

    async compilTrack(url) {

        return fetch(url).then((response) => {
            if (!response.ok) {
                throw response.status;
            }
            return response.json()
        }).then((date) => {
            let a = new ListSongs(date);
            return a;
        }).catch((error) => console.log(error));

    }
}

export class ListSongs {
    constructor(song) {
        this.songs = song.data;
        this.next = song.next;//url per altre 5 canzoni
    }

    moreSongs(obj, url) {
        let pulsMore = document.querySelector('#more-songs');
        pulsMore.addEventListener('click', function () {
            obj.compilTrack(url);
        })
    }
}

export class Songs {
    constructor(song) {
        this.id = song.id;
        this.title = song.title;
        this.duration = song.duration;
        this.preview = song.preview;
        this.artist = song.artist;
        this.album = song.album;
    }

    insetSong(obj, n) {//crea il diva per la canzone
        let contSong = document.querySelector('#container-song-track');

        let div = document.createElement('div');

        div.classList.add('row', 'align-items-center', 'justify-content-between');

        let time = parseInt(this.duration / 60) + ":" + parseInt((this.duration % 60) / 10) + parseInt((this.duration % 60) - parseInt((this.duration % 60) / 10) * 10);

        div.innerHTML = `
        <div class="col-12 container">
            <div class="row align-items-center justify-content-between">
                <div class="col-4 col-xl-2 d-flex gap-2 align-items-center">
                    <span class="track-number">
                        ${n + 1}
                    </span>
                    <img class="track-img" src="${this.album.cover}" alt="">
                </div>
                <div class="col-8 row">
                    <p class="track-name col-12 col-xl-7">${this.title}</p>
                    <p class="track-views col-12 col-xl-5">${this.id}</p>
                </div>
                <div class="col-1 d-none d-xl-inline">
                    <p class="track-duration ">${time}</p>
                </div>
            </div>
        </div>`;

        this.conectToPlayer(div, this, obj)

        contSong.append(div);
    }

    skipNext(list) {
        let pulsNext = document.querySelector('.bi-skip-end-fill');
        pulsNext.addEventListener('click', function () {
            let ply = document.querySelector('audio');
            let n = 0;


            for (let i of list.songs) {
                if (i.preview === ply.src) {

                    if (list.songs.indexOf(i) + 1 >= list.songs.length) {
                        n = list.songs[0];
                    } else {
                        n = list.songs[list.songs.indexOf(i) + 1];
                    }

                    break;
                }
            }
            new Songs(n).playSong();
        })

    }

    static playList(list) {
        let playPuls = document.querySelectorAll('.triangolo');

        playPuls.forEach(function (e) {
            e.addEventListener('click', function () {

                new Songs(list.songs[0]).playSong();
            }
            )
        })
    }

    static timeSkip() {

        let randomButton = document.querySelectorAll('.random');
        let repeatButton = document.querySelector('#repeat');
        let list = songList;
        let n = 0;

        if (audio.currentTime >= 29.9 && repeatButton.style.color !== 'rgb(30, 215, 96)') {
            if (randomButton[0].style.color === "rgb(30, 215, 96)" || randomButton[1].style.color === "rgb(30, 215, 96)") {

                let random = Math.floor(Math.random() * list.songs.length);

                if (randArray.find(element => element == random) === -1 || randArray.find(element => element == random) === undefined) {
                    n = list.songs[random];
                    randArray.push(random);

                    if (randArray.length >= list.songs.length) {
                        randArray = [];
                    }
                    new Songs(n).playSong();
                }

            } else {
                let ply = document.querySelector('audio');

                for (let i of list.songs) {
                    if (i.preview === ply.src) {

                        if (list.songs.indexOf(i) + 1 >= list.songs.length) {
                            n = list.songs[0];
                        } else {
                            n = list.songs[list.songs.indexOf(i) + 1];
                        }

                        break;
                    }
                }
                new Songs(n).playSong();
            }
        }
    }


    skipPrevious(list) {
        let pulsPrevious = document.querySelector('.bi-skip-start-fill');
        pulsPrevious.addEventListener('click', function () {
            let ply = document.querySelector('audio');
            let n = 0;

            for (let i of list.songs) {
                if (i.preview === ply.src) {

                    if (list.songs.indexOf(i) - 1 < 0) {
                        n = list.songs[list.songs.length - 1];
                    } else {
                        n = list.songs[list.songs.indexOf(i) - 1];
                    }

                    break;
                }
            }
            new Songs(n).playSong();
        })
    }

    playSong() {
        let ply = document.querySelector('audio');
        this.complitePlayer();
        ply.src = this.preview;
        ply.play();
    }

    complitePlayer() {
        let timeF = document.querySelector('#time-fine');
        let img = document.querySelector('#cover-play-song');
        let title = document.querySelector('#title-play-song');
        let artist = document.querySelector('#artist-play-song');

        let playButton = document.querySelector('#play');

        playButton.classList.add('bi-pause-fill');
        playButton.classList.remove('bi-play-fill');


        timeF.textContent = parseInt(this.duration / 60) + ":" + parseInt((this.duration % 60) / 10) + parseInt((this.duration % 60) - parseInt((this.duration % 60) / 10) * 10);

        img.src = this.album.cover;
        title.textContent = this.title;
        artist.textContent = this.artist.name;
    }

    conectToPlayer(cont, song, obj) {
        cont.addEventListener('click', function () {

            Songs.timeSkip(obj);
            song.skipNext(obj);
            song.skipPrevious(obj);
            song.playSong();
        });
    }
}