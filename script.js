function playSong(){
    song.play();
}

const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');

play.addEventListener('click', playSong)