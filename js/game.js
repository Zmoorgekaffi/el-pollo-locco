let canvas;
let world;
let keyboard;
let intervallIds = [];
let music = new Audio('audio/backgorund-music/2687_5150-lq.mp3');

function playMusic() {
    music.play();
}

function init() {
    playMusic();
    music.volume -= 0.9;
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    initLevel();
    world = new World(canvas, keyboard);
    switchToGameDisplay();
}

function getFullscreen() {
    document.getElementById('canvasframe').requestFullscreen();
    document.getElementById('fullscreen-btn').removeEventListener('click', getFullscreen);
    document.getElementById('fullscreen-btn').addEventListener('click', exitFullscreen);
}

function exitFullscreen() {
    document.exitFullscreen();
    document.getElementById('fullscreen-btn').removeEventListener('click', exitFullscreen);
    document.getElementById('fullscreen-btn').addEventListener('click', getFullscreen);
}

function switchToGameDisplay() {
    document.getElementById('start-screen').style = 'display: none;';
    document.querySelector('.prestart-btns-frame').classList.add('d-none');
}

function toggleInfo() {
    document.getElementById('info-container').classList.toggle('d-none');
    document.getElementById('info-btn').classList.toggle('white-border');
}

function toggleMobileControls() {
    document.getElementById('mobile-controls').classList.toggle('d-none');
    document.getElementById('mobile-control-btn').classList.toggle('white-border');
}

music.addEventListener('ended', () => {
    music.play();
});

