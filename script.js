function playSong(){
    play.querySelector('.bi').classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong(){
    play.querySelector('.bi').classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider(){
    isPlaying ? pauseSong() : playSong();
}

function initializeSong(){
    cover.src = `img/${sortedPlaylist[index].file}.png`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerHTML = sortedPlaylist[index].songName;
    bandName.innerHTML = sortedPlaylist[index].artist;
}

function previousSong(){
    index = index === 0 ? sortedPlaylist.length - 1 : index -= 1;
    initializeSong();
    playSong();
}

function nextSong(){
    index = index === sortedPlaylist.length -1 ? index = 0 : index += 1;
    initializeSong();
    playSong();
}

function updateProgressBar(){
    const barwidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barwidth}%`);
}

function jumpTo(event){
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition/width)*song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray){
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while(currentIndex > 0){
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] =  preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] =  aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked(){
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const spirit = {songName: 'S.P.I.R.I.T.', artist: 'Bring Me The Horizon',file: 's.p.i.r.i.t'}
const crawling = {songName: 'Crawling',artist: 'Linkin Park',file: 'crawling'}
const enchanted = {songName: 'Enchanted',artist: 'Taylor Swift',file: 'enchanted'}
const originalPlaylist = [spirit, crawling, enchanted];
const shuffleButton = document.getElementById('shuffle');

let isPlaying = false;
let isShuffled = false;
let sortedPlaylist = [...originalPlaylist];
let index = 0;

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);