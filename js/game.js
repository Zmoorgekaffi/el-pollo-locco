let canvas;
let world;
let keyboard;
let intervallIds = [];

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    initLevel();
    world = new World(canvas, keyboard);
    switchToGameDisplay();
}

function getFullscreen() {
    canvas.requestFullscreen();
}

function switchToGameDisplay() {
    document.getElementById('start-screen').style = 'display: none;';
    document.getElementById('info-btn').style = 'display: none;';
}

function toggleInfo() {
    document.getElementById('info-container').classList.toggle('d-none');
    document.getElementById('info-btn').classList.toggle('white-border');
}