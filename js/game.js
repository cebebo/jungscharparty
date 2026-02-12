let canvas;
let world;
let keyboard = new Keyboard();
// let character = new Character();
// let ctx;

let AUDIO_MUSIC = new Audio('audio/music.mp3');

let AUDIO_ME_ALEX = new Audio('audio/me-alex.mp3');
let AUDIO_ME_CHRIS = new Audio('audio/me-chris.mp3');
let AUDIO_ME_KIM = new Audio('audio/me-kim.mp3');
let AUDIO_ME_LUKA = new Audio('audio/me-luka.mp3');
let AUDIO_ME_PADDY = new Audio('audio/me-paddy.mp3');
let AUDIO_ME_SASCHA = new Audio('audio/me-sascha.mp3');
let playerCount = 0;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    AUDIO_MUSIC.loop = true;
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
    document.getElementById('canvas').classList.remove('d-none');
    this.fullscreen();
    world.setWorld();
    document.getElementById('charBox').style.display = 'none';
    document.getElementById('menu').style.display = 'none';
    document.getElementById('start-btn').style.display = 'none';
    document.getElementById('infoBox').innerHTML = `<b onclick="fullscreen()">Zurück zum Fullscreen</b>`;
}


function music() {
    AUDIO_MUSIC.volume = 0.2;
    if (AUDIO_MUSIC.paused) {
        AUDIO_MUSIC.play();
        document.getElementById('music').innerHTML = '&#128264;';
    } else {
        AUDIO_MUSIC.pause();
        document.getElementById('music').innerHTML = '&#128263;';
    }
}

function countPlayer() {
    playerCount++;
    if (playerCount >= 2) {
        document.getElementById('start-btn').classList.remove('d-none');
    }
}


function loadInfoBox(info) {
    let infoBox = document.getElementById('infoBox');
    infoBox.innerHTML = '';
    switch (info) {
        case 1:
            infoBox.innerHTML = `
                <h3>Spielerklärung</h3><br>
                <p>Jungscharparty ist ein Gruppenspiel für Kindergruppen im Alter von 7-14 Jahren. Insgesamt können 2-6 Teams,
                bestehend aus mindestens 2 Spielern pro Team, an diesem Spiel teilnehmen. Zu Beginn darf sich jedes Team einen 
                Charakter aussuchen. Die Reihenfolge, in der die Spielfiguren geklickt werden, bestimmt die Würfelreihenfolge. 
                Nacheinander würfelt jedes Team und zieht die gewürfelte Zahl auf dem Spielfeld nach vorne. Landet der Spieler 
                auf einem blauen Feld gibt es 3 Punkte aufs Konto. Bei einem roten Feld werden 3 Punkte vom Konto abgezogen. 
                Hat man ausreichend Punkte gesammelt (20 Punkte), können diese auf einem gelden Orden-Feld, auf dem man dann automatisch 
                stehen bleibt, gegen einen Orden getauscht werden. Nach jeder Würfelrunde treten die Teams in einem Mini-Spiel,
                das vor Ort im Gruppenraum gespielt wird, gegeneinander an. Der Gewinner erhält 10 Punkte. Der Verlierer geht 
                leer aus. Gespielt wird jeder gegen jeden, es sei denn die Spieler stehen sowohl auf blauen, als auch auf roten 
                Feldern. Wer am Ende die meisten Orden besitzt, gewinnt das Spiel. Bei Unentschieden entscheiden die verbleibenden Punkte.</p>
            `;
            break;
        case 2:
            infoBox.innerHTML = `
                <h3>Steuerung</h3><br>
                <p>Das Spiel wird komplett mit der Tastatur gesteuert. Dabei gilt folgende Tastenbelegung:<br><br>
                <table><tr>
                <td><b>Enter-Taste:</b></td><td>Würfelvorgang wird gestartet</td></tr><tr>
                <td><b>W-A-S-D:</b></td><td>Kamera frei in alle Richtungen bewegen</td></tr><tr>
                <td><b>Q:</b></td><td>Freie Kamerabewegung verlassen</td></tr><tr>
                <td><b>1-6:</b></td><td>Siegerteam bei Mini-Spielen auswählen</td></tr><tr>
                <td><b>Pfeil Links:</b></td><td>Links abbiegen / Siegerteam Blau auswählen</td></tr><tr>
                <td><b>Pfeil Rechts:</b></td><td>Rechts abbiegen / Siegerteam Rot auswählen</td></tr><tr>
                <td><b>Pfeil Hoch:</b></td><td>Die letzten drei Runden starten</td></tr><tr>
                <td><b>Pfeil Runter:</b></td><td>Die letzte Runde starten</td></tr>
                </table>
                </p>
            `;
            break;
        case 3:
            infoBox.innerHTML = `
                <h3>Bevor es los geht</h3><br>
                <p>Bevor das Spiel gestartet wird, muss der Gruppenraum/Saal/Halle entsprechend vorbereitet werden. 
                Sorge dafür, dass ausreichend Platz für Sport und Bewegung vorhanden ist, ohne dass die Sitzplätze der 
                Spieler behindert werden oder die Technik, die dieses Spiel hier anzeigt, beeinträchtigt wird. 
                Stelle für die Minispiele folgende Materialien bereit:<br><br>
                Stoppuhr, leere Stühle, Luftballons, mehrere Bierdeckel, große Flasche, kleine und große Bälle, 
                Skat-Karten (o.ä.), Augenbinde, mehrere Tücher (Lappen/Geschirrtücher).</p>
            `;
            break;
        case 4:
            infoBox.innerHTML = `
                <h3>Impressum</h3><br>
                <p>Jungscharparty ist ein Spiel von Christian Becker, das allen begeisterten Kinder- und Jugendgruppen 
                zur Nutzung bereit gestellt ist.<br><br>
                Christian Becker<br>Odinstraße 7<br>56348 Bornich<br>mail(at)becker-christian.de<br><br>
                Sämtliche Charactere, das Spielbrett und die Sounds wurden mit Hilfe einer KI erstellt.</p>
            `;
            break;
    }
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