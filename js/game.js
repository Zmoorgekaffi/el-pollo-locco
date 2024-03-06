let canvas;
let world;
let keyboard;
let intervallIds = [];
let music = new Audio('audio/backgorund-music/2687_5150-lq.mp3');
let soundMute = false;
sounds = [
    music,
];

/**
 * this function will play the games music
 * 
 */
function playMusic() {
    music.play();
}

/**
 * this function will be play the music of the game,
 * sets the volume to 0.9,
 * connects the variable canvas with the canvas html element,
 * creates a keyboard object under the name of variable keyboard,
 * calls the function initLevel() <-- wich is generating the level,
 * creates a World object and connects it with the variable world,
 * calls the function switchToGameDisplay()
 * 
 */
function init() {
    playMusic();
    music.volume -= 0.9;
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
    initLevel();
    world = new World(canvas, keyboard);
    switchToGameDisplay();
}

/**
 * this function is used to get the canvas into fullscreen mode
 * 
 */
function getFullscreen() {
    document.getElementById('canvasframe').requestFullscreen();
    document.getElementById('fullscreen-btn').removeEventListener('click', getFullscreen);
    document.getElementById('fullscreen-btn').addEventListener('click', exitFullscreen);
}

/**
 * this function is used to get the canvas off the fullscreen mode
 * 
 */
function exitFullscreen() {
    document.exitFullscreen();
    document.getElementById('fullscreen-btn').removeEventListener('click', exitFullscreen);
    document.getElementById('fullscreen-btn').addEventListener('click', getFullscreen);
}

/**
 * this function is used to display none the start screen and the info/smartphone-mode buttons
 * 
 */
function switchToGameDisplay() {
    document.getElementById('start-screen').style = 'display: none;';
    document.querySelector('.prestart-btns-frame').classList.add('d-none');
}

/**
 * this function toggles the display of informations
 * 
 */
function toggleInfo() {
    document.getElementById('info-container').classList.toggle('d-none');
    document.getElementById('info-btn').classList.toggle('white-border');
}

/**
 * this funktion toggle the display of mobile button
 * 
 */
function toggleMobileControls() {
    document.getElementById('mobile-controls').classList.toggle('d-none');
    document.getElementById('mobile-control-btn').classList.toggle('white-border');
}

/**
 * this eventlistener will be check if the game music is ended if this is met the music will be replayed
 * 
 */
music.addEventListener('ended', () => {
    music.play();
});

/**
 * this function is used to mute or unmute the sounds in the sounds array.
 * 
 */
function toggleMuteSound() {
    if (soundMute == false) {
        sounds.forEach(sound => { sound.muted = true });
        soundMute = true;
        document.getElementById('mute-btn').style = "background-image: url('img/1_editables/volume-xmark-solid.svg')";
    } else {
        sounds.forEach(sound => { sound.muted = false });
        soundMute = false;
        document.getElementById('mute-btn').style = "background-image: url('img/1_editables/volume-high-solid.svg')";
    }
}

/**
 * this function restarts the game through a reload
 * 
 */
function restartGame() {
    location.reload();
}
