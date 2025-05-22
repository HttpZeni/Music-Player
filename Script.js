window.addEventListener("DOMContentLoaded", () => {
    // === Element-Referenzen ===
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
    const box = document.querySelector('.box1');
    const progressContainer = document.getElementById("progressContainer");
    const theme = document.getElementById("theme");
    const dynamicBtn = document.getElementById("dynamic");
    const onlyVocalBtn = document.getElementById("onlyVocal");
    const onlyInstruBtn = document.getElementById("onlyInstru");
    let currentPlayTime = document.getElementById("currentTime");
    let maxTime = document.getElementById("maxTime");
    var cover = document.getElementById("Cover");

    // === Variablen ===
    const maxAtSong = 7;
    let atSong = 1;
    let isDark = true;
    let isPlaying = false;
    let dynamic = false;
    let onlyVocal = false;
    let onlyInstru = false;

    // === Tilt Einstellungen (Optional für fancy Effekte) ===
    const tiltSettings = {
        glare: false,
        reverse: false,
        max: 0,
        speed: 0,
        scale: 1,
    };

    // === Dynamischer Button für Tilt Effekt ===
    dynamicBtn.onclick = function() {
        dynamic = !dynamic;

        const elements = document.querySelectorAll(".container");

        elements.forEach(el => {
            if (el.vanillaTilt) {
                el.vanillaTilt.destroy();  // Alte Instanz zerstören
            }
        });

        VanillaTilt.init(elements, tiltSettings);


        if (dynamic) {
            tiltSettings.glare = false;
            tiltSettings.reverse = true;
            tiltSettings.max = 10;
            tiltSettings.speed = 500;
            tiltSettings.scale = 1.05;
        } 
        else if (!dynamic){
            tiltSettings.glare = false;
            tiltSettings.reverse = false;
            tiltSettings.max = 0;
            tiltSettings.speed = 0;
            tiltSettings.scale = 1;
        }

        VanillaTilt.init(document.querySelectorAll(".container"), tiltSettings);
    };

    // === Only Vocal Button Logik ===
    onlyVocalBtn.onclick = function() {
        onlyVocal = !onlyVocal;
        if (onlyVocal) {
            onlyInstru = false; // Gegenspieler ausknipsen
            onlyInstruBtn.classList.remove("active"); // Visuelles Feedback, falls du CSS hast
        }
        onlyVocalBtn.classList.toggle("active", onlyVocal); // Toggle active Klasse
        loadSongs(atSong);
    };

    // === Only Instrumental Button Logik ===
    onlyInstruBtn.onclick = function() {
        onlyInstru = !onlyInstru;
        if (onlyInstru) {
            onlyVocal = false; // Gegenspieler ausknipsen
            onlyVocalBtn.classList.remove("active");
        }
        onlyInstruBtn.classList.toggle("active", onlyInstru);
        loadSongs(atSong);
    };

    // === Audio Metadaten laden (Länge & Fortschritt anzeigen) ===
    audio.onloadedmetadata = function() {
        maxTime.textContent = formatTime(audio.duration);
        currentPlayTime.textContent = formatTime(audio.currentTime);
        progressBar.style.width = "0%"; 
    };

    // === Lautstärke Slider ===
    volumeSlider.oninput = function () {
        audio.volume = this.value;
    };

    // === Fortschritt der Musik während des Spielens ===
    audio.ontimeupdate = function(){
        if (!audio.duration) return; // Schutz vor Fehlern, falls kein Audio geladen
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = percent + "%";
        currentPlayTime.textContent = formatTime(audio.currentTime);
    };

    // === Dark/Light Theme Toggle ===
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
    };

    // === Play/Pause Button ===
    playButton.onclick = function(){
        if(!isPlaying){
            audio.play();
            playButton.textContent = "❚❚"; // Pause Symbol
            isPlaying = true;
        }
        else {
            audio.pause();
            playButton.textContent = "▶"; // Play Symbol
            isPlaying = false;
        }
    };

    // === 10 Sekunden zurück ===
    backward.onclick = function(){
        audio.currentTime = Math.max(0, audio.currentTime - 10);
    };

    // === 10 Sekunden vor ===
    forward.onclick = function(){
        audio.currentTime = Math.min(audio.duration, audio.currentTime + 10);
    };

    // === Song vorwärts und rückwärts ===
    nextSong.onclick = songNext;
    backSong.onclick = songBack;

    // === Tastatursteuerung (Pfeiltasten) ===
    document.addEventListener("keydown", function(event) {
        if (event.key === "ArrowRight") {
            songNext();
        }
        else if (event.key === "ArrowLeft"){
            songBack();
        }
    });

    // === Song auf Anfang zurücksetzen ===
    reset.onclick = function(){
        audio.currentTime = 0;
    };

    // === Hilfsfunktion: Zeit formatieren (Sekunden zu mm:ss) ===
    function formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec < 10 ? '0' : ''}${sec}`;
    }

    function loadSongs(atSong){
        if(atSong == 1){
            box.style.backgroundColor = "#123b28";
            cover.style.border = "5px solid #003d29";
            progressContainer.style.border = "5px solid #003d29";
            cover.src = "Covers/Hoe Cakes.jpg";
            songText.textContent = "Hoe Cakes";
            artistText.textContent = "MF DOOM";
            coverHref.href = "https://open.spotify.com/intl-de/track/4b82tXj35SycILuILcgBQ6";

            if(!onlyInstru && !onlyVocal){
                audio.src = "Audio/Hoe Cakes.mp3";
            } else if(onlyInstru){
                audio.src = "OnlyInstru/Hoe Cakes-other-C major-99bpm-451hz.mp3";
            } else if(onlyVocal){
                audio.src = "OnlyVocals/Hoe Cakes-vocals-C major-99bpm-451hz.mp3";
            }
        }
        else if(atSong == 2){
            box.style.backgroundColor = "#330419";
            cover.style.border = "5px solid #87053f";
            progressContainer.style.border = "5px solid #87053f";
            cover.src = "Covers/I Hate You.jpeg";
            songText.textContent = "I Hate You";
            artistText.textContent = "h4rtbrkr";
            coverHref.href = "https://open.spotify.com/intl-de/track/4Iwq23SVTkRJbWUdBXfUv9";

            if(!onlyInstru && !onlyVocal){
                audio.src = "Audio/h4rtbrkr - i hate you.mp3";
            } else if(onlyInstru){
                audio.src = "OnlyInstru/h4rtbrkr - i hate you [music].mp3";
            } else if(onlyVocal){
                audio.src = "OnlyVocals/h4rtbrkr - i hate you [vocals].mp3";
            }
        }
        else if(atSong == 3){
            box.style.backgroundColor = "#00052b";
            cover.style.border = "5px solid #2c3685";
            progressContainer.style.border = "5px solid #2c3685";
            cover.src = "Covers/alexgoffline.jpeg";
            songText.textContent = "Not Anywhere";
            artistText.textContent = "Alex G";
            coverHref.href = "https://open.spotify.com/intl-de/track/7Kxir3VuFzvFDDsrUXuISf?si=0c262145240643ba";

            if(!onlyInstru && !onlyVocal){
                audio.src = "Audio/Alex G - Not Anywhere.mp3";
            } else if(onlyInstru){
                audio.src = "OnlyInstru/Alex G - Not Anywhere [music].mp3";
            } else if(onlyVocal){
                audio.src = "OnlyVocals/Alex G - Not Anywhere [vocals].mp3";
            }
        }
        else if(atSong == 4){
            box.style.backgroundColor = "#611033";
            cover.style.border = "5px solid #bf0a5e";
            progressContainer.style.border = "5px solid #bf0a5e";
            cover.src = "Covers/i met sarah in the bathroom.jpg";
            songText.textContent = "i met sarah in the bathroom";
            artistText.textContent = "awfultune";
            coverHref.href = "https://open.spotify.com/track/3yXoqAiLWYQi5oNJN2MA4l";

            if(!onlyInstru && !onlyVocal){
                audio.src = "Audio/awfultune - i met sarah in the bathroom (prod. kazuyo).mp3";
            } else if(onlyInstru){
                audio.src = "OnlyInstru/awfultune - i met sarah in the bathroom-other.mp3";
            } else if(onlyVocal){
                audio.src = "OnlyVocals/awfultune - i met sarah in the bathroom-vocals.mp3";
            }
        }
        else if(atSong == 5){
            box.style.backgroundColor = "#3b3b3b";
            cover.style.border = "5px solid #6e6e6e";
            progressContainer.style.border = "5px solid #6e6e6e";
            cover.src = "Covers/antarctica.jpeg";
            songText.textContent = "ANTARCTICA";
            artistText.textContent = "$UICIDEBOY$";
            coverHref.href = "https://open.spotify.com/intl-de/track/5UGAXwbA17bUC0K9uquGY2?si=e1a4fdfed60e42a0";

            if(!onlyInstru && !onlyVocal){
                audio.src = "Audio/$UICIDEBOY$ - ANTARCTICA (Lyric Video).mp3";
            } else if(onlyInstru){
                audio.src = "OnlyInstru/$UICIDEBOY$ - ANTARCTICA-other.mp3";
            } else if(onlyVocal){
                audio.src = "OnlyVocals/$UICIDEBOY$ - ANTARCTICA-vocals.mp3";
            }
        }
        else if(atSong == 6){
            box.style.backgroundColor = "#592816";
            cover.style.border = "5px solid #9e4f33";
            progressContainer.style.border = "5px solid #9e4f33";
            cover.src = "Covers/nuts.jpg";
            songText.textContent = "Nuts";
            artistText.textContent = "Lil Peep";
            coverHref.href = "https://open.spotify.com/intl-de/track/6uV5kOSxHLLGkqk6vOGHzs";

            if(!onlyInstru && !onlyVocal){
                audio.src = "Audio/Lil Peep - Nuts.mp3";
            } else if(onlyInstru){
                audio.src = "OnlyInstru/Lil Peep - Nuts-other.mp3";
            } else if(onlyVocal){
                audio.src = "OnlyVocals/Lil Peep - Nuts-vocals.mp3";
            }
        }
        else if(atSong == 7){
            box.style.backgroundColor = "#181818";
            cover.style.border = "5px solid #606060";
            progressContainer.style.border = "5px solid #606060";
            cover.src = "Covers/widows peak.jpeg";
            songText.textContent = "Widows Peak";
            artistText.textContent = "C418";
            coverHref.href = "https://open.spotify.com/intl-de/track/3zRfLbh1EWfvvMBTNJ6aWu";

            if(!onlyInstru && !onlyVocal){
                audio.src = "Audio/C418 - Widows Peak.mp3";
            } else if(onlyInstru){
                audio.src = "OnlyInstru/C418 - Widows Peak-other.mp3";
            } else if(onlyVocal){
                audio.src = "OnlyVocals/C418 - Widows Peak-vocals.mp3";
            }
        }
        else{
            console.error("Song index out of range!");
        }

        audio.play();
        isPlaying = true;
        playButton.textContent = "❚❚";

        // Reset Progressbar
        progressBar.style.width = "0%";
        currentPlayTime.textContent = "0:00";
        maxTime.textContent = formatTime(audio.duration || 0);
    }

    // === Song Nächster ===
    function songNext() {
        atSong++;
        if (atSong > maxAtSong) atSong = 1;
        loadSongs(atSong);
    }

    // === Song Vorheriger ===
    function songBack() {
        atSong--;
        if (atSong < 1) atSong = maxAtSong;
        loadSongs(atSong);
    }

    // === Song beim Start laden ===
    loadSongs(atSong);
});
