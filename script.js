const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// Song titles
const songs = ["A Bonyolult Világ", "Baby You're a Rich Man", "777", "If it Wasn't for the Nights",
             "Random Everyone", "Take it or Leave it", "Telepathy"];

// Keep track of song
let songIndex = 1;

function changeBackground(index){
    const body = document.querySelector('body');
    switch (index){
        case 0:
            body.setAttribute("style","background-image: linear-gradient(0deg,rgb(240, 128, 108) 23.8%, rgb(125, 202, 247) 92%")
            break;
        case 1: 
            body.setAttribute("style","background-image: linear-gradient(0deg, rgb(240, 209, 108) 23.8%, rgb(247, 245, 125) 92% )")
            break;
        case 2:
            body.setAttribute("style","background-image: linear-gradient(0deg, rgb(187, 187, 187) 23.8%, rgb(247, 125, 125) 92%)")
            break;
        case 3:
            body.setAttribute("style","background-image: linear-gradient(0deg, rgb(179, 239, 247) 23.8%, rgb(54, 153, 184) 92%")
            break;
         case 4: 
            body.setAttribute("style","background-image: linear-gradient(0deg, rgb(197, 240, 180) 23.8%, rgb(86, 165, 189) 92% )")
            break;
        case 5:
            body.setAttribute("style","background-image: linear-gradient(0deg, rgb(117, 119, 119) 23.8%, rgb(255, 255, 255) 92%)")
            break;
        case 6:
            body.setAttribute("style","background-image: linear-gradient(0deg,rgba(247, 247, 247, 1) 23.8%, rgba(252, 221, 221, 1) 92%)")
            break;
    }
}

//initial background
changeBackground(1)

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `cover/${song}.jpg`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();

  changeBackground(songIndex)
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();

  changeBackground(songIndex)
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', nextSong);