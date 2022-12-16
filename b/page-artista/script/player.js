let playButton = document.querySelector('#play');
let repeatButton = document.querySelector('#repeat');
let audio = document.querySelector('audio');

playButton.addEventListener('click', function(){


    
    if ( this.style.color !== 'blue'){
        audio.pause();
        this.style.color = 'blue';
    }else{
        audio.play();
        this.style.color = 'red';
    }
})

repeatButton.addEventListener('click', function(){

    console.log(audio.loop);
    if(!audio.loop){
        audio.loop = true;
        this.style.color = '#26fd5cce';
    }else{
        audio.loop = false;
        this.style.color = 'white';
    }
});

let cont = 0;

function playerBar(){
    let lineaPlay = document.querySelector('#linea-play');
    let line;

    cont += 10;

    timer(audio.currentTime);

    line = (audio.currentTime/30 * 471) + 10;
    lineaPlay.setAttribute('x2',line)
}

function timer (time){
    let timI = document.querySelector('#time-inizio');
    let temp = 0;

    temp = parseInt(time/60) + ":" + parseInt((time%60)/10) + parseInt((time%60) - parseInt((time%60)/10)*10);

    timI.textContent = temp;
}

setInterval(playerBar, 10);