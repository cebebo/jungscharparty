let canvas;
let world;
let keyboard = new Keyboard();
// let character = new Character();
// let ctx;

let AUDIO_ME_ALEX = new Audio('audio/me-alex.mp3');
let AUDIO_ME_CHRIS = new Audio('audio/me-chris.mp3');
let AUDIO_ME_KIM = new Audio('audio/me-kim.mp3');
let AUDIO_ME_LUKA = new Audio('audio/me-luka.mp3');
let AUDIO_ME_PADDY = new Audio('audio/me-paddy.mp3');
let AUDIO_ME_SASCHA = new Audio('audio/me-sascha.mp3');

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

function addCharacter(kid) {
    world.addCharacter(kid);
    switch (kid) {
        case 'alex':
            AUDIO_ME_ALEX.play();
            break;
        case 'chris':
            AUDIO_ME_CHRIS.play(); 
            break;
        case 'kim':
            AUDIO_ME_KIM.play(); 
            break;
        case 'luka':
            AUDIO_ME_LUKA.play(); 
            break;
        case 'paddy':
            AUDIO_ME_PADDY.play(); 
            break;
        case 'sascha':
            AUDIO_ME_SASCHA.play(); 
            break;  
    }
}


function setWorldStart() {
    this.fullscreen();
    world.setWorld();
    document.getElementById('charBox').style.display = 'none';
}


window.addEventListener("keydown", (button) => {
    if (button.keyCode === 38) { keyboard.UP = true; }
    if (button.keyCode === 40) { keyboard.DOWN = true; }
    if (button.keyCode === 37) { keyboard.WAY2 = true; }
    if (button.keyCode === 39) { keyboard.WAY1 = true; }
    if (button.keyCode === 32) { keyboard.SPACE = true; }
    if (button.keyCode === 13) { keyboard.ENTER = true; }    

    if (button.keyCode === 87) { keyboard.CAM_UP = true; }
    if (button.keyCode === 83) { keyboard.CAM_DOWN = true; }
    if (button.keyCode === 65) { keyboard.CAM_LEFT = true; }
    if (button.keyCode === 68) { keyboard.CAM_RIGHT = true; }
    if (button.keyCode === 81) { keyboard.QUITCAM = true; }
});

window.addEventListener("keyup", (button) => {
    if (button.keyCode === 38) { keyboard.UP = false; }
    if (button.keyCode === 40) { keyboard.DOWN = false; }
    if (button.keyCode === 37) { keyboard.WAY2 = false; }
    if (button.keyCode === 39) { keyboard.WAY1 = false; }
    if (button.keyCode === 32) { keyboard.SPACE = false; }
    if (button.keyCode === 13) { keyboard.ENTER = false; }

    if (button.keyCode === 87) { keyboard.CAM_UP = false; }
    if (button.keyCode === 83) { keyboard.CAM_DOWN = false; } 
    if (button.keyCode === 65) { keyboard.CAM_LEFT = false; }
    if (button.keyCode === 68) { keyboard.CAM_RIGHT = false; }
    if (button.keyCode === 81) { keyboard.QUITCAM = false; }
});

function fullscreen() {
    let fullscreen = document.getElementById('canvas');
    enterFullscreen(fullscreen);
}

/**
 * Makes the request for fullscreen mode.
 * 
 * @param {variable} element - Variable of the object, that is requested for fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {  // iOS Safari
        element.webkitRequestFullscreen();
    }
}

/**
 * Leaves the fullscreen mode.
 * 
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

// function startGame() {
//     // prepareLevel();
//     world = new World(canvas, keyboard);
// }