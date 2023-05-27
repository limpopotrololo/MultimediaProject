let img1 = document.getElementById("img1")
let img2 = document.getElementById("img2")
let img3 = document.getElementById("img3")
let img4 = document.getElementById("img4")
let img5 = document.getElementById("img5")
const playBtn = document.getElementById("play-btn")
const nextBtn = document.getElementById("next-btn")
const prevBtn = document.getElementById("prev-btn")
const audio = document.getElementById("audio")
const progress = document.getElementById("progress")
const progressBar = document.getElementById("progress-bar")
const player = document.getElementById('player')
const samples = ["3fret", "5fret", "8fret", "10fret", "12fret"]
var audioCtx;
var analyser;
var source;
var dataArray
var bufferLength;

function createAudioContext() {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioCtx.createAnalyser();
    source = audioCtx.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    analyser.fftSize = 2048;
    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
}

function userInteraction() {
    if (!audioCtx) {
        createAudioContext();
        visualize();
    }
}

const shadowMultiplier = 3;
img1.addEventListener('click', function () {
    if (img1.src.indexOf("3fret.png") !== -1) {
        repair()
        img1.src = "images/am3.jpg"
        Pause();
        end();
        progress.style.width = 0;
        loadSong(null)

    } else {
        progress.style.width = 0;
        repair()
        img1.src = "images/3fret.png"
        songIndex = 0
        loadSong(samples[0])
        audio.currentTime = 0
        console.log(samples[0])
        start()
    }
    userInteraction()
})

img2.addEventListener('click', function () {
    if (img2.src.indexOf("5fret.png") !== -1) {
        repair()
        img2.src = "images/am5.jpg";
        Pause();
        end();
        progress.style.width = 0;
        loadSong(null)
    } else {
        progress.style.width = 0;
        repair()
        img2.src = "images/5fret.png"
        songIndex = 1
        loadSong(samples[1])
        audio.currentTime = 0
        start()
    }
    userInteraction()
})

img3.addEventListener('click', function () {
    if (img3.src.indexOf("8fret.png") !== -1) {
        repair()
        img3.src = "images/am8.jpg"
        Pause();
        end();
        progress.style.width = 0;
        loadSong(null)
    } else {
        progress.style.width = 0;
        repair()
        img3.src = "images/8fret.png"
        loadSong(samples[2])
        start()
    }
    userInteraction()
})

img4.addEventListener('click', function () {
    if (img4.src.indexOf("10fret.png") !== -1) {
        repair()
        img4.src = "images/am10.jpg"
        Pause();
        end();
        progress.style.width = 0;
        loadSong(null)
    } else {
        progress.style.width = 0;
        repair()
        img4.src = "images/10fret.png"
        loadSong(samples[3])
        start()
    }
    userInteraction()
})

img5.addEventListener('click', function () {
    if (img5.src.indexOf("12fret.png") !== -1) {
        repair()
        img5.src = "images/am12.jpg"
        Pause();
        end();
        progress.style.width = 0;
        loadSong(null)
    } else {
        progress.style.width = 0;
        repair()
        img5.src = "images/12fret.png"
        loadSong(samples[4])
        start()
    }

    userInteraction()
})

function repair() {
    img1.src = "images/am3.jpg"
    img2.src = "images/am5.jpg"
    img3.src = "images/am8.jpg"
    img4.src = "images/am10.jpg"
    img5.src = "images/am12.jpg"
}


function loadSong(song) {
    if (song) {
        audio.src = `music/${song}.mp3`;
    } else {
        audio.src = "";
    }
}

function Pause() {
    player.classList.add('play')
    player.classList.remove('pause')
    audio.pause()
}

function Play() {
    console.log(audio.src);
    player.classList.add('pause');
    player.classList.remove('play');
    audio.play();
}

function start() {
    const status = player.classList.contains('play')
    console.log(status)
    if (status) {
        Play();
        playBtn.style.backgroundImage = "url('images/pause.png')";
    } else {
        Pause();
        playBtn.style.backgroundImage = "url('images/play.png')";
    }

}

playBtn.addEventListener('click', function () {

    start();


})

function end() {
    player.classList.remove('pause')
    player.classList.add('play')
    playBtn.style.backgroundImage = "url('images/play.png')";
}

audio.addEventListener('ended', function () {
    end();
});
nextBtn.addEventListener('click', function () {
    progress.style.width = 0;
    songIndex = (songIndex + 1) % samples.length;
    repair();
    updateImage()
    loadSong(samples[songIndex]);
    start();
});

audio.addEventListener('ended', function () {
    progress.style.width = "0";
    songIndex = (songIndex + 1) % samples.length;
    repair();
    updateImage()
    loadSong(samples[songIndex]);
    start();
});
prevBtn.addEventListener('click', function () {
    progress.style.width = 0;
    songIndex = (songIndex - 1 + samples.length) % samples.length;
    repair();
    updateImage();
    loadSong(samples[songIndex]);
    start();
});
audio.addEventListener('timeupdate', updateProgressBar);

function updateProgressBar() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.style.width = `${progressPercent}%`;

}

progressBar.addEventListener('click', function (event) {
    const progressContainerWidth = progressBar.offsetWidth;
    const clickX = event.offsetX;
    const progressPercent = (clickX / progressContainerWidth) * 100;
    audio.currentTime = (progressPercent / 100) * audio.duration;
});

function updateImage() {
    switch (songIndex) {
        case 0:
            img1.src = "images/3fret.png";
            break;
        case 1:
            img2.src = "images/5fret.png";
            break;
        case 2:
            img3.src = "images/8fret.png";
            break;
        case 3:
            img4.src = "images/10fret.png";
            break;
        case 4:
            img5.src = "images/12fret.png";
            break;
        default:
            break;
    }
}


function visualize() {
    requestAnimationFrame(visualize);
    analyser.getByteFrequencyData(dataArray);

    let isMusicPlaying = audio.paused === false;
    let shadowSize = isMusicPlaying ? calculateShadowSize(dataArray) : 20;
    const shadowColor = "#FB8B24";
    const offsetY = 2.5;
    if (shadowSize < 20) {
        shadowSize = 20;
    }
    player.style.boxShadow = `0 ${offsetY}px ${shadowSize}px 0 ${shadowColor}`;
}

function calculateShadowSize(dataArray) {
    const average = calculateAverage(dataArray);
    return average * shadowMultiplier;
}

function calculateAverage(dataArray) {
    let sum = 0;
    for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i];
    }
    return sum / bufferLength;
}

visualize();
