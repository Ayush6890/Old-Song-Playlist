const audio = document.getElementById("audio");

const playBtn = document.getElementById("playBtn");
const previousBtn = document.getElementById("previousBtn");
const nextBtn = document.getElementById("nextBtn");

const seekbar = document.getElementById("seekbar");
const volume = document.getElementById("volume");

const muteBtn = document.getElementById("muteBtn");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const currentSongName =
    document.getElementById("currentSongName");

const currentArtist =
    document.getElementById("currentArtist");

const songList =
    document.getElementById("songList");

const search =
    document.getElementById("search");


/*
    Put your own legally obtained MP3 files
    inside the songs folder.
*/

const songs = [

    {
        name: "Aaye ho meri zindgi mein",
        artist: "Udit Narayan/ Alka Yagnik",
        file: "songs/song1.mp3"
    },

    {
        name: "Bahut Jatate ho chah humse",
        artist: "Mohammed Aziz",
        file: "songs/song2.mp3"
    },

    {
        name: "Ek Dilruba hai",
        artist: "Udit Narayan",
        file: "songs/song3.mp3"
    },

    {
        name: "Hum Yaar Hai Tumhare",
        artist: "Udit Narayan/ Alka Yagnik",
        file: "songs/song4.mp3"
    },

    {
        name: "Itna Main Chaahon ",
        artist: "Udit Narayan/ Alka Yagnik",
        file: "songs/song5.mp3"
    },

    {
        name: "Jo bhi kasmein",
        artist: "Udit Narayan/ Alka Yagnik",
        file: "songs/song6.mp3"
    },

    {
        name: "Mubarak Ho Tumko ",
        artist: "Udit Narayan/ Alka Yagnik",
        file: "songs/song7.mp3"
    },

    {
        name: "Mujhse Mohabbat ka Izhaar karta",
        artist: "Kumar Sanu/ Alka Yagnik",
        file: "songs/song8.mp3"
    },

    {
        name: "Pehli Pehli Baar Mohabbat",
        artist: "Kumar Sanu/ Alka Yagnik",
        file: "songs/song9.mp3"
    },

    {
        name: "Tumse Milna",
        artist: "Udit Narayan/ Alka Yagnik",
        file: "songs/song10.mp3"
    }

];


let currentIndex = 0;
let isPlaying = false;


/* FORMAT TIME */

function formatTime(time) {

    if (isNaN(time)) {
        return "00:00";
    }

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    seconds = String(seconds).padStart(2, "0");

    return `${minutes}:${seconds}`;
}


/* CREATE PLAYLIST */

function displaySongs(list = songs) {

    songList.innerHTML = "";

    list.forEach((song, index) => {

        const songElement =
            document.createElement("div");

        songElement.classList.add("song");

        if (index === currentIndex) {
            songElement.classList.add("active");
        }

        songElement.innerHTML = `

            <span class="song-number">
                ${index + 1}.
            </span>

            <div class="song-icon">
                <i class="fa-solid fa-music"></i>
            </div>

            <div class="song-details">

                <h3>${song.name}</h3>

                <p>${song.artist}</p>

            </div>

            <span class="song-duration">
                <i class="fa-solid fa-headphones"></i>
            </span>
        `;

        songElement.addEventListener(
            "click",
            () => {

                currentIndex =
                    songs.indexOf(song);

                loadSong(currentIndex);

                playSong();
            }
        );

        songList.appendChild(songElement);

    });
}


/* LOAD SONG */

function loadSong(index) {

    const song = songs[index];

    audio.src = song.file;

    currentSongName.textContent =
        song.name;

    currentArtist.textContent =
        song.artist;

    displaySongs();

}


/* PLAY */

function playSong() {

    audio.play()
        .then(() => {

            isPlaying = true;

            playBtn.innerHTML =
                `<i class="fa-solid fa-pause"></i>`;

        })
        .catch(error => {

            console.log(
                "Audio play error:",
                error
            );

            alert(
                "Song file nahi mila. Check karein ki songs folder me MP3 file hai."
            );

        });

}


/* PAUSE */

function pauseSong() {

    audio.pause();

    isPlaying = false;

    playBtn.innerHTML =
        `<i class="fa-solid fa-play"></i>`;
}


/* PLAY / PAUSE */

playBtn.addEventListener(
    "click",
    () => {

        if (isPlaying) {
            pauseSong();
        } else {
            playSong();
        }

    }
);


/* NEXT */

nextBtn.addEventListener(
    "click",
    () => {

        currentIndex++;

        if (currentIndex >= songs.length) {
            currentIndex = 0;
        }

        loadSong(currentIndex);

        playSong();

    }
);


/* PREVIOUS */

previousBtn.addEventListener(
    "click",
    () => {

        currentIndex--;

        if (currentIndex < 0) {
            currentIndex = songs.length - 1;
        }

        loadSong(currentIndex);

        playSong();

    }
);


/* SONG ENDS */

audio.addEventListener(
    "ended",
    () => {

        currentIndex++;

        if (currentIndex >= songs.length) {
            currentIndex = 0;
        }

        loadSong(currentIndex);

        playSong();

    }
);


/* DURATION */

audio.addEventListener(
    "loadedmetadata",
    () => {

        duration.textContent =
            formatTime(audio.duration);

    }
);


/* UPDATE SEEKBAR */

audio.addEventListener(
    "timeupdate",
    () => {

        currentTime.textContent =
            formatTime(audio.currentTime);

        if (audio.duration) {

            seekbar.value =
                (audio.currentTime /
                audio.duration) * 100;

        }

    }
);


/* SEEK */

seekbar.addEventListener(
    "input",
    () => {

        if (audio.duration) {

            audio.currentTime =
                (seekbar.value / 100) *
                audio.duration;

        }

    }
);


/* VOLUME */

audio.volume = 0.8;

volume.addEventListener(
    "input",
    () => {

        audio.volume =
            volume.value;

        updateVolumeIcon();

    }
);


/* MUTE */

muteBtn.addEventListener(
    "click",
    () => {

        audio.muted =
            !audio.muted;

        updateVolumeIcon();

    }
);


function updateVolumeIcon() {

    if (
        audio.muted ||
        audio.volume === 0
    ) {

        muteBtn.innerHTML =
            `<i class="fa-solid fa-volume-xmark"></i>`;

    } else if (audio.volume < 0.5) {

        muteBtn.innerHTML =
            `<i class="fa-solid fa-volume-low"></i>`;

    } else {

        muteBtn.innerHTML =
            `<i class="fa-solid fa-volume-high"></i>`;

    }

}


/* SEARCH */

search.addEventListener(
    "input",
    () => {

        const query =
            search.value.toLowerCase();

        const filteredSongs =
            songs.filter(song =>

                song.name
                    .toLowerCase()
                    .includes(query)

                ||

                song.artist
                    .toLowerCase()
                    .includes(query)

            );

        displaySongs(filteredSongs);

    }
);


/* INITIAL */

loadSong(currentIndex);

volume.value = audio.volume;