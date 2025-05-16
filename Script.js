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
var cover = document.getElementById("Cover");
const maxAtSong = 2;
let atSong = 1;
let isPlaying = false;

audio.ontimeupdate = function(){
    const percent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = percent + "%";
};

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

nextSong.onclick = function(){
    atSong++;
    audio.pause();
    audio.currentTime = 0;
    playButton.textContent = "▶";

    if(atSong == 2){
        audio.src = "Audio/h4rtbrkr - i hate you.mp3"
        cover.src = "Covers/I Hate You.jpeg";
        songText.textContent = "I Hate You";
        artistText.textContent = "h4rtbrkr"
        coverHref.href = "https://open.spotify.com/intl-de/track/4Iwq23SVTkRJbWUdBXfUv9";
    }
    if(atSong > maxAtSong){
        atSong = maxAtSong;
    }    
}

backSong.onclick = function(){
    atSong--;
    audio.pause();
    audio.currentTime = 0;
    playButton.textContent = "▶";
    if(atSong == 1){
        audio.src = "Audio/Hoe Cakes.mp3";
        cover.src = "Covers/Hoe Cakes.jpg";
        songText.textContent = "Hoe Cakes";
        artistText.textContent = "MF DOOM"
        coverHref.href = "https://open.spotify.com/intl-de/track/4b82tXj35SycILuILcgBQ6";
    }
    if(atSong < 1){
        atSong = 1;
    }
}