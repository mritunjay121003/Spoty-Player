console.log("Welcome to Spotify");
//initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));



let songs = [
    { songName: "Naamumkin - Maalik", filePath: "songs/1.mp3", coverPath: "covers/1image.jpg" },
    { songName: "Jaddu - Oaff", filePath: "songs/2.mp3", coverPath: "covers/2image.png" },
    { songName: "Shopping List - Honey Singh", filePath: "songs/3.mp3", coverPath: "covers/3image.png" },
    { songName: "Let Me Down Slowly - Alec Benjamin", filePath: "songs/Let Me Down Slowly.mp3", coverPath: "covers/4image.jpg" },
    { songName: "Paro - Nej", filePath: "songs/Paro.mp3", coverPath: "covers/5image.jpg" },
    { songName: "Play Date - Lilly Brooks", filePath: "songs/Play Date.mp3", coverPath: "covers/6image.jpg" },
    { songName: "Safari - Serena", filePath: "songs/Safari.mp3", coverPath: "covers/7image.jpg" },
    { songName: "Closer - The Chainsmokers", filePath: "songs/4.mp3", coverPath: "covers/8image.jpg" },

]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

});

// AudioElement.play();

//Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', () => {

    // update seekbar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        const clicked = e.target;
        const isPlaying = clicked.classList.contains('fa-pause-circle');
        if (isPlaying) {
            // Pause if already playing
            audioElement.pause();
            clicked.classList.remove('fa-pause-circle');
            clicked.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        } else {
            makeAllPlays();
            songIndex = parseInt(clicked.id);
            clicked.classList.remove('fa-play-circle');
            clicked.classList.add('fa-pause-circle');
            audioElement.src = `songs/${songIndex + 1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.currentTime = 0;
            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
        }
    });
});


document.getElementById('next').addEventListener('click', () => {
    if (songIndex >= 8) {
        songIndex = 0;
    }
    else {
        songIndex +=1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', () => {
    if (songIndex <= 0) {
        songIndex = 0;
    }
    else {
        songIndex -=1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
})