let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    initLevel();
    world = new World(canvas, keyboard);
    document.getElementById('start-screen').style = 'display: none;'
}

function getFullscreen() {
    canvas.requestFullscreen();
}