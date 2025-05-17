const audio = document.getElementById("audio");
const progressBar = document.getElementById("progressBar");
const playButton = document.getElementById("playButton");
const backward = document.getElementById("backward");
const forward = document.getElementById("forward");
const backSong = document.getElementById("backSong");
const nextSong = document.getElementById("nextSong");
const songText = document.getElementById("songText");
const artistText = document.getElementById("artistText");
const coverHref = document.getElementById("coverHref");
const reset = document.getElementById("reset");
const volumeSlider = document.getElementById("volumeSlider");
const box = document.getElementById("box1");
const progressContainer = document.getElementById("progressContainer");
const theme = document.getElementById("theme");
let currentPlayTime = document.getElementById("currentTime");
let maxTime = document.getElementById("maxTime");
var cover = document.getElementById("Cover");
const maxAtSong = 7;
let atSong = 1;
let isDark = true;
let isPlaying = false;

function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}
  
audio.onloadedmetadata = function() {
    maxTime.textContent = formatTime(audio.duration);
    currentPlayTime.textContent = formatTime(audio.currentTime);
    progressBar.style.width = "0%"; 
};

volumeSlider.oninput = function () {
    audio.volume = this.value;
};

audio.ontimeupdate = function(){
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
    currentPlayTime.textContent = formatTime(audio.currentTime);
};

theme.onclick = function(){
    if(isDark){
        document.body.style.backgroundColor = "#9ea6e8";
        theme.style.color = "black";
        isDark = false;
    }
    else {
        document.body.style.backgroundColor = "#04000a";
        theme.style.color = "white";
        isDark = true;
    }
}

playButton.onclick = function(){
    if(!isPlaying){
        audio.play();
        playButton.textContent = "❚❚";
        isPlaying = true;
    }
    else if(isPlaying){
        audio.pause();
        playButton.textContent = "▶";
        isPlaying = false;
    }
}

backward.onclick = function(){
    audio.currentTime -= 10;
}

forward.onclick = function(){
    audio.currentTime += 10;
}

nextSong.onclick = songNext;

backSong.onclick = songBack;

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") {
        songNext();
    }
    else if (event.key === "ArrowLeft"){
        songBack();
    }
});

reset.onclick = function(){
    audio.currentTime = 0;
}

function loadSongs(atSong){

    if(atSong == 1){
        box.style.backgroundColor = "#123b28";
        cover.style.border = "5px solid #003d29";
        progressContainer.style.border = "5px solid #003d29";
        audio.src = "Audio/Hoe Cakes.mp3";
        cover.src = "Covers/Hoe Cakes.jpg";
        songText.textContent = "Hoe Cakes";
        artistText.textContent = "MF DOOM"
        coverHref.href = "https://open.spotify.com/intl-de/track/4b82tXj35SycILuILcgBQ6";
    }
        if(atSong == 2){
        box.style.backgroundColor = "#330419";
        cover.style.border = "5px solid #87053f";
        progressContainer.style.border = "5px solid #87053f";
        audio.src = "Audio/h4rtbrkr - i hate you.mp3"
        cover.src = "Covers/I Hate You.jpeg";
        songText.textContent = "I Hate You";
        artistText.textContent = "h4rtbrkr"
        coverHref.href = "https://open.spotify.com/intl-de/track/4Iwq23SVTkRJbWUdBXfUv9";
    }
    else if (atSong == 3){
        box.style.backgroundColor = "#00052b";
        cover.style.border = "5px solid #2c3685";
        progressContainer.style.border = "5px solid #2c3685";
        audio.src = "Audio/Alex G - Not Anywhere.mp3"
        cover.src = "Covers/alexgoffline.jpeg";
        songText.textContent = "Not Anywhere";
        artistText.textContent = "Alex G"
        coverHref.href = "https://open.spotify.com/intl-de/track/7Kxir3VuFzvFDDsrUXuISf?si=0c262145240643ba";
    }
    else if (atSong == 4){
        box.style.backgroundColor = "#611033";
        cover.style.border = "5px solid #bf0a5e";
        progressContainer.style.border = "5px solid #bf0a5e";
        audio.src = "Audio/awfultune - i met sarah in the bathroom (prod. kazuyo).mp3"
        cover.src = "Covers/i met sarah in the bathroom.jpg";
        songText.textContent = "i met sarah in the bathroom";
        artistText.textContent = "​awfultune"
        coverHref.href = "https://open.spotify.com/track/3yXoqAiLWYQi5oNJN2MA4l";
    }
    else if(atSong == 5){
        box.style.backgroundColor = "#3b3b3b";
        cover.style.border = "5px solid #6e6e6e";
        progressContainer.style.border = "5px solid #6e6e6e";
        audio.src = "Audio/$UICIDEBOY$ - ANTARCTICA (Lyric Video).mp3"
        cover.src = "Covers/antarctica.jpeg";
        songText.textContent = "ANTARCTICA";
        artistText.textContent = "$UICIDEBOY$"
        coverHref.href = "https://open.spotify.com/intl-de/track/5UGAXwbA17bUC0K9uquGY2?si=e1a4fdfed60e42a0";
    }
        else if(atSong == 6){
        box.style.backgroundColor = "#592816";
        cover.style.border = "5px solid #9e4f33";
        progressContainer.style.border = "5px solid #9e4f33";
        audio.src = "Audio/Lil Peep - nuts (feat. rainy bear) (Official Audio).mp3"
        cover.src = "Covers/nuts.jpg";
        songText.textContent = "Nuts";
        artistText.textContent = "Lil Peep"
        coverHref.href = "https://open.spotify.com/intl-de/track/4k3xDpAdBuM17mNNHhOZkK?si=03a67f14232d46b7";
    }
        else if(atSong == 7){
        box.style.backgroundColor = "#0b2642";
        cover.style.border = "5px solid #487796";
        progressContainer.style.border = "5px solid #487796";
        audio.src = "Audio/Jace June - Come Home (Official Lyric Video).mp3"
        cover.src = "Covers/come home.jpeg";
        songText.textContent = "Come Home";
        artistText.textContent = "Jace June"
        coverHref.href = "https://open.spotify.com/intl-de/track/7aTPGByz1LCEObBAxt3UAh?si=831ccd3abbc54998";
    }
}

function songNext(){
    if(atSong >= maxAtSong){
        atSong = 1;
    }  
    else{
        atSong++;
    }
    audio.pause();
    isPlaying = false;
    audio.currentTime = 0;
    playButton.textContent = "▶";

    loadSongs(atSong);
}

function songBack(){
    atSong--;
    if(atSong < 1){
        atSong = maxAtSong;
    }
    audio.pause();
    isPlaying = false;
    audio.currentTime = 0;
    playButton.textContent = "▶";

    loadSongs(atSong);
}