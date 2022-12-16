let playButton = document.querySelector('#play');
let repeatButton = document.querySelector('#repeat');
let randomButton = document.querySelectorAll('.bi-shuffle');
let mutedButton = document.querySelector('#muted');
let audio = document.querySelector('audio');
let volumBar = document.querySelector('#volum-bar');
let musicBar = document.querySelector('#music-bar');

/*window.addEventListener('resize',function(e) {
    console.log(this.innerWidth);
    if (this.innerWidth >= 1200){
        document.querySelector('#play').classList.remove('bi-play-fill');
        document.querySelector('#play').classList.add('bi-play-circle-fill');
    }else{
        document.querySelector('#play').classList.add('bi-play-fill');
        document.querySelector('#play').classList.remove('bi-play-circle-fill');
    }
})*/

randomButton.forEach((e) =>{//attiva la funzione per armonizzare le canzoni
    e.addEventListener('click', function () {
        if (this.style.color !== "rgb(30, 215, 96)") {
            this.style.color = "rgb(30, 215, 96)";
        } else {
            this.style.color = "white";
        }
    })
})

playButton.addEventListener('click', function () {//cambia forma del pulsante play
    if (playButton.classList[1].search('bi-pause-fill') != -1) {
        audio.pause();
        playButton.classList.remove('bi-pause-fill');
        playButton.classList.add('bi-play-fill');
    } else {
        audio.play();
        playButton.classList.add('bi-pause-fill');
        playButton.classList.remove('bi-play-fill');
    }
})

repeatButton.addEventListener('click', function () {//attiva la funzione per ripetere la stessa canzone

    if (randomButton[0].style.color === 'rgb(30, 215, 96)') {//disattiva random
        randomButton.style.color = "white";
    }

    if (!audio.loop) {
        audio.loop = true;
        this.style.color = 'rgb(30, 215, 96)';
    } else {
        audio.loop = false;
        this.style.color = 'white';
    }
});

mutedButton.addEventListener('click', function () {//muta l'audio

    if (!audio.muted) {
        audio.muted = true;
        this.classList.add('bi-volume-mute');
        this.classList.remove('bi-volume-up');
    } else {
        audio.muted = false;
        this.classList.remove('bi-volume-mute');
        this.classList.add('bi-volume-up');
    }
});

volumBar.addEventListener('click', function () {//gestire la barra del volume
    let x0 = this.getBoundingClientRect();//posizione x dell'origine della barra
    let mauseX = event.clientX;//posizione x del mouse al click
    let perCent = (mauseX - x0.x) / x0.width;//stima percentuale di volume
    
    volumBar.querySelectorAll('line')[1].setAttribute('x2', perCent*100);
    audio.volume = perCent;
})

musicBar.addEventListener('click', function () {
    let x0 = this.getBoundingClientRect();
    let mauseX = event.clientX;
    let perCent = (mauseX - x0.x) / x0.width;

    console.log(perCent);
    
    musicBar.querySelectorAll('line')[1].setAttribute('x2', perCent*500);
    audio.currentTime = perCent*30;
})

let cont = 0;

function playerBar() {//funzione per animare la barra della musica
    let lineaPlay = document.querySelector('#linea-play');
    let line;

    cont += 10;

    timer(audio.currentTime);

    line = (audio.currentTime / 29 * 471) + 10;
    lineaPlay.setAttribute('x2', line)
}

function timer(time) {//funzione che crea l'orologio
    let timI = document.querySelector('#time-inizio');
    let temp = 0;

    temp = parseInt(time / 60) + ":" + parseInt((time % 60) / 10) + parseInt((time % 60) - parseInt((time % 60) / 10) * 10);

    timI.textContent = temp;
}

setInterval(playerBar, 0.1);