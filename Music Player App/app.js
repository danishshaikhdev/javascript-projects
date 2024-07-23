




const play = document.getElementById('play');
const pause = document.getElementById('pause');
const music = document.querySelector('audio');
const image = document.querySelector('img');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

const title = document.querySelector('h2');
const artist = document.querySelector('h3');


const songs = [
    {
        name: "music-1",
        title: "Lotus lane",
        artist: "loyalist"
    },
    {
        name: "music-2",
        title: "Sappheiros",
        artist: "Aurora"
    },
    {
        name: "music-3",
        title: "Liberation",
        artist: "Sound Remedy"
    }
];

let currSongIndex = 0;
let isPlaying = false;

const playMusic = () => {
    music.play();
    isPlaying = true;
    play.classList.replace('fa-play', 'fa-pause');
    image.classList.add('anime');
};

const pauseMusic = () => {
    music.pause();
    isPlaying = false;
    play.classList.replace('fa-pause', 'fa-play');
    image.classList.remove('anime');
};

const toggleMusic = () => isPlaying ? pauseMusic() : playMusic();


const loadSongs = (songs) => {
    title.textContent = songs.title;
    artist.textContent = songs.artist;
    image.src = `Images/${songs.name}.jpg`;
    music.src = `Musics/${songs.name}.mp3`;
};

const playNextSong = () => {
    currSongIndex = (currSongIndex + 1) % songs.length;
    loadSongs(songs[currSongIndex]);
    playMusic();
};

const playPrevSong = () => {
    currSongIndex = (currSongIndex - 1 + songs.length) % songs.length;
    loadSongs(songs[currSongIndex]);
    playMusic();
};

const changeSong = (direction) => {
    currSongIndex = ((currSongIndex + direction + songs.length) % songs.length);
    console.log(currSongIndex);
    loadSongs(songs[currSongIndex]);
    playMusic();
}


window.addEventListener('load', () => {
    loadSongs(songs[currSongIndex]);
});

window.addEventListener('keydown', (e) => {
    switch(e.code) {
        case 'Space':
            toggleMusic();
            break;
        case 'KeyN':
            changeSong(1);
            break;
        case 'KeyP':
            changeSong(-1);
            break;
    }
});

play.addEventListener('click', toggleMusic)
next.addEventListener('click', () => {
    changeSong(1);
});
prev.addEventListener('click', () => {
    changeSong(-1);
});