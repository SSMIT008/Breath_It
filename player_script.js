document.addEventListener("DOMContentLoaded", function () {
    let currentAudio = null; // keep track of currently playing

    document.querySelectorAll(".player").forEach(player => {
        const audio = player.querySelector(".audio");
        const playBtn = player.querySelector(".play-btn");
        const seek = player.querySelector(".seek");
        const current = player.querySelector(".current");
        const duration = player.querySelector(".duration");
        const volume = player.querySelector(".volume");
        const repeat = player.querySelector(".repeat-btn");

        if (!audio || !playBtn || !seek || !current || !duration || !volume || !repeat) {
            console.warn("Missing element inside .player block:", player);
            return; // skip this player instead of crashing
        }

        let isRepeat = false;

        // Play/Pause toggle
        playBtn.addEventListener("click", () => {
            if (audio.paused) {
                if (currentAudio && currentAudio !== audio) {
                    currentAudio.pause();
                    const prevPlayBtn = currentAudio.closest(".player").querySelector(".play-btn");
                    prevPlayBtn.innerHTML = '<img src="./icons/play_button4.png" alt="Play" class="icon">';
                }

                audio.play();
                currentAudio = audio;
                playBtn.innerHTML = '<img src="./icons/pause_button4.png" alt="Pause" class="icon">';
            } else {
                audio.pause();
                playBtn.innerHTML = '<img src="./icons/play_button4.png" alt="Play" class="icon">';
            }
        });

        // Update seek bar
        audio.addEventListener("timeupdate", () => {
            seek.value = audio.currentTime;
            current.textContent = formatTime(audio.currentTime);
        });

        // Load metadata
        audio.addEventListener("loadedmetadata", () => {
            seek.max = audio.duration;
            duration.textContent = formatTime(audio.duration);
        });

        // Seek
        seek.addEventListener("input", () => {
            audio.currentTime = seek.value;
        });

        // Volume
        volume.addEventListener("input", () => {
            audio.volume = volume.value;
        });

        // Repeat toggle
        repeat.addEventListener("click", () => {
            isRepeat = !isRepeat;
            repeat.classList.toggle("active", isRepeat);
        });

        // On track end
        audio.addEventListener("ended", () => {
            if (isRepeat) {
                audio.currentTime = 0;
                audio.play();
                playBtn.innerHTML = '<img src="./icons/pause_button4.png" alt="Pause" class="icon">';
            } else {
                playBtn.innerHTML = '<img src="./icons/play_button4.png" alt="Play" class="icon">';
            }
        });

        // Format time
        function formatTime(sec) {
            let minutes = Math.floor(sec / 60);
            let seconds = Math.floor(sec % 60).toString().padStart(2, "0");
            return `${minutes}:${seconds}`;
        }
    });
});