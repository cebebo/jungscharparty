class World {

    character = [];
    player = 0;
    map = new Map('img/map.png');
    mapOverlay = new MapOverlay('img/map-overlay.png');
    dice = new Dice();
    scoreboard = [];
    scoreboardY = 45;    
    plates = [
        new Plate('b', 400, 270, 1),
        new Plate('b', 480, 310, 2),
        new Plate('b', 535, 370, 3),
        new Plate('b', 495, 440, 4),
        new Plate('b', 485, 515, 5),
        new Plate('b', 590, 537, 6),
        new Plate('r', 694, 538, 7),
        new Plate('b', 790, 497, 8), // yellow plate
        new Plate('b', 875, 440, 9),
        new Plate('b', 960, 420, 10),
        new Plate('b', 1110, 405, 11),
        new Plate('r', 1190, 320, 12),
        new Plate('b', 1270, 255, 13),
        new Plate('b', 1320, 200, 14),
        new Plate('b', 1330, 125, 15),
        new Plate('b', 1270, 70, 16), // yellow plate
        new Plate('b', 1195, 10, 17),
        new Plate('b', 1205, -85, 18),
        new Plate('r', 1150, -173, 19),
        new Plate('b', 1055, -205, 20),
        new Plate('b', 960, -225, 21), // yellow plate
        new Plate('b', 845, -228, 22),
        new Plate('r', 760, -188, 23),
        new Plate('b', 625, -140, 24),
        new Plate('b', 510, -115, 25), // yellow plate
        new Plate('r', 400, -75, 26),
        new Plate('b', 300, -70, 27),
        new Plate('b', 200, -60, 28),
        new Plate('b', 95, -57, 29),
        new Plate('r', -15, -40, 30),
        new Plate('b', -90, 10, 31),
        new Plate('b', -100, 100, 32),
        new Plate('b', -70, 200, 33), // yellow plate
        new Plate('b', -50, 300, 34),
        new Plate('b', 50, 303, 35),
        new Plate('b', 140, 272, 36), // yellow plate
        new Plate('r', 230, 272, 37),
        new Plate('b', 320, 287, 38),
        new Plate('r', -95, 365, 39),
        new Plate('r', -85, 420, 40),
        new Plate('b', -25, 463, 41),
        new Plate('b', 80, 460, 42),
        new Plate('b', 200, 470, 43),
        new Plate('b', 295, 515, 44), // yellow plate
        new Plate('b', 400, 540, 45)
    ];
    yellowPlateIndices = [8, 16, 21, 25, 33, 36, 44];
    startFields = [[335, 195], [388, 130], [475, 105], [580, 110], [680, 215], [500, 220]];
    camView = new CameraView(0, 0);
    keyboard;
    ctx;
    games = [];
    canvasHere;
    
    camera_x = 0;
    camera_y = 0;
    cameraSmooth = 0.05;
    
    activePlayer = 1;
    
    spaceLock = false;
    enterLock = false;
    diceValue = 0;
    diceCount = 0;

    lastValue;

    startPlate;
    endPlate = false

    activeYellowPlates = [];
    countYellow = 0;
    yellow1;
    yellow2;

    camlock = true;

AUDIO_DICEROLL = new Audio('audio/diceroll.wav');
AUDIO_DICESTOP = new Audio('audio/dicestop.wav');
AUDIO_HITFIELD = new Audio('audio/hitfield.mp3');


constructor(canvas, keyboard) {
    this.keyboard = keyboard;
    this.ctx = canvas.getContext('2d');
    this.canvasHere = canvas;
    this.draw();
    this.setWorld();
    this.runLoops()
}

draw() {
    this.updateCamera();

    this.ctx.clearRect(0, 0, this.canvasHere.width, this.canvasHere.height);   // Bildschirm wird geleert

    this.ctx.translate(this.camera_x, this.camera_y);   // Kamera folgt der Spielfigur

    this.drawImage(this.map);   // Hintergrund wird gezeichnet
    this.plates.forEach(plate => { this.drawImage(plate); });   // Felder werden gezeichnet
    this.character.forEach(char => { this.drawImage(char); });   // Spielfiguren werden gezeichnet
    this.drawImage(this.mapOverlay);  // Vordergrund wird gezeichnet
    this.ctx.translate(-this.camera_x, -this.camera_y);   // Kamera zurücksetzen   
    this.drawImage(this.dice);   // Würfel wird gezeichnet
    this.scoreboard.forEach(board => { this.drawImage(board); });   // Scoreboards werden gezeichnet
    if (!this.camlock) {this.drawImage(this.camView);}
    let self = this;
    requestAnimationFrame(() => {
        self.draw();
    });
}


updateCamera() {
    const activeChar = this.character.find(
        char => char.player === this.activePlayer
    );

    if (!activeChar || !this.camlock) return;

    // Zielposition
    let targetX = -activeChar.x + 500;
    let targetY = -activeChar.y + 240;

    // 🎥 SMOOTH FOLLOW (LERP)
    this.camera_x += (targetX - this.camera_x) * this.cameraSmooth;
    this.camera_y += (targetY - this.camera_y) * this.cameraSmooth;

      // 🧲 DEAD ZONE (Extra-Feature)
    const deadZoneX = 50;
    const deadZoneY = 30;

    const camCenterX = -this.camera_x + 500;
    const camCenterY = -this.camera_y + 240;

    if (Math.abs(activeChar.x - camCenterX) > deadZoneX) {
        this.camera_x += (targetX - this.camera_x) * this.cameraSmooth;
    }

    if (Math.abs(activeChar.y - camCenterY) > deadZoneY) {
        this.camera_y += (targetY - this.camera_y) * this.cameraSmooth;
    }

    // 🧘 BONUS: Mini-Zitter-Fix
    if (Math.abs(targetX - this.camera_x) < 0.5) {
        this.camera_x = targetX;
    }
    if (Math.abs(targetY - this.camera_y) < 0.5) {
        this.camera_y = targetY;
    }

    this.clampCamera();
}


handleManualCamera() {
    if (this.keyboard.CAM_UP)    { this.camera_y += 10; this.camlock = false; }
    if (this.keyboard.CAM_DOWN)  { this.camera_y -= 10; this.camlock = false; }
    if (this.keyboard.CAM_LEFT)  { this.camera_x += 10; this.camlock = false; }
    if (this.keyboard.CAM_RIGHT) { this.camera_x -= 10; this.camlock = false; }
    this.clampCamera();
    if (this.keyboard.QUITCAM) {
        this.camlock = true;
    }
}


clampCamera() {
    const minX = -550;
    const maxX = 300;
    const minY = -250;
    const maxY = 530;

    this.camera_x = Math.min(maxX, Math.max(minX, this.camera_x));
    this.camera_y = Math.min(maxY, Math.max(minY, this.camera_y));
}


runLoops() {
    setInterval(() => {
        this.nextPlayer();
        this.startDice();
        this.handleManualCamera();
    }, 50);
}


// Der nächste Spieler wird aktiviert
nextPlayer() {
    if (this.keyboard.SPACE) {
        if (!this.spaceLock) {
            this.spaceLock = true;
            this.activePlayer++;
            if (this.activePlayer > this.character.length) {
                this.activePlayer = 1;
            }
            console.log('Active Player: ' + this.activePlayer + ": " + this.character[this.activePlayer - 1].name);
            this.character[this.activePlayer - 1].AUDIO_TURN.play();
        }
    } else { this.spaceLock = false; }
}

// Der Würfel wird geworfen
startDice() {
    if (this.keyboard.ENTER) {
        if (!this.enterLock) {
            this.camlock = true;
            this.enterLock = true;
            this.diceCount = 0;
            this.AUDIO_DICEROLL.play();
            // Würfelwurf starten

            this.DiceTimeout(30);
        }
    } else { this.enterLock = false; }
}

DiceTimeout(time) {
    setTimeout(() => {
        this.diceValue = Math.floor(Math.random() * 10) + 1;
        if (this.diceValue === this.lastValue) {
            if (this.diceValue < 10) {
                this.diceValue++;
            }
            else { this.diceValue--; }
        }
        this.lastValue = this.diceValue;
        this.dice.setValue(this.diceValue);
        console.log('Dice Value: ' + this.diceValue);
        this.diceCount++;
        time *= 1.2;

        if (this.diceCount < 15) {
            this.DiceTimeout(time);
        } else {
            this.AUDIO_DICESTOP.play();
            setTimeout(() => {
                this.movePlayer();
            }, 1000);
        }
    }, time);
}


    async movePlayer() {
    const char = this.character[this.activePlayer - 1];
    this.endPlate = false;
    // Startposition vom Character
    this.startPlate = char.pos;

    for (let i = 0; i < this.diceValue; i++) {
        // Sicherheitscheck

        if (this.startPlate === 37) {
            this.startPlate = -1;
            char.pos = this.startPlate;
        }

        if (this.startPlate === 33) {
            this.startPlate = await this.chooseDirection();
            char.pos = this.startPlate;
        } else {
            this.startPlate++;
        }

        if (this.startPlate >= this.plates.length) {
            this.startPlate = 4;
            char.pos = 4;
        }

        if (i === this.diceValue - 1) {
            this.endPlate = true;
        }
        const plate = this.plates[this.startPlate];
        await this.moveCharToPlateAsync(plate.x, plate.y, char);

        char.pos = this.startPlate;

    }
}

chooseDirection() {
    return new Promise(resolve => {

        const onKeyDown = (e) => {
            if (e.code === 'ArrowLeft') {
                window.removeEventListener('keydown', onKeyDown);
                resolve(38); // linke Route
            }

            if (e.code === 'ArrowRight') {
                window.removeEventListener('keydown', onKeyDown);
                resolve(34); // rechte Route
            }
        };

        window.addEventListener('keydown', onKeyDown);
    });
}


moveCharToPlateAsync(px, py, char) {
    return new Promise(resolve => {
        const speed = char.speed;

        const moveActive = setInterval(() => {

            let reachX = true;
            let reachY = true;

            if (char.x + 15 < px - speed) {
                this.autoMoveRight(char);
                reachX = false;
                this.keyboard.RIGHT = true;
            }
            else if (char.x + 15 > px + speed) {
                this.autoMoveLeft(char);
                reachX = false;
                this.keyboard.LEFT = true;
            }
            else {
                char.x = px - 15;
            }

            if (char.y + 50 < py - speed) {
                this.autoMoveDown(char);
                reachY = false;
                this.keyboard.DOWN = true;
            }
            else if (char.y + 50 > py + speed) {
                this.autoMoveUp(char);
                this.keyboard.UP = true;
                reachY = false;
            }
            else {
                char.y = py - 50;
            }
            if (reachX) {
                this.keyboard.RIGHT = false;
                this.keyboard.LEFT = false;
            }
            if (reachY) {
                this.keyboard.UP = false;
                this.keyboard.DOWN = false;
            }
            if (reachX && reachY) {
                clearInterval(moveActive);
                this.AUDIO_HITFIELD.play();
                resolve();
                if (this.endPlate) {
                    this.checkPlateForOtherPlayers(char);
                    this.checkPlateColor(char);
                }
            }
            

        }, 1000 / 60); // 60 FPS
    });
}


checkPlateForOtherPlayers(char) {
    this.character.forEach(otherChar => {
        if (otherChar.name !== char.name && otherChar.pos - 1 === char.pos) {
            char.x += 8;
            otherChar.x -= 8;
        }
    }
    )
}


checkPlateColor(char) {
    this.plates.forEach(plate => {
        if (plate.no === char.pos + 2) {
            switch (plate.act) {
                case 'b': char.AUDIO_JUHU.play(); char.team = 'blue'; break;
                case 'r': char.AUDIO_NO.play(); char.team = 'red'; break;
                case 'y': char.AUDIO_JUHU.play(); char.team = 'blue'; this.replaceYellowPlate(plate.no); break;
            }
        }
    })
}


replaceYellowPlate(oldPlateNo) {
    // altes Feld zurück auf blau
    this.plates[oldPlateNo - 1].setAct('b');
    this.activeYellowPlates =
        this.activeYellowPlates.filter(no => no !== oldPlateNo);

    // neues Feld (ohne Startschutz)
    const newPlate = this.getRandomYellow(0);
    if (newPlate !== null) {
        this.activeYellowPlates.push(newPlate);
        this.plates[newPlate - 1].setAct('y');
    }
}



autoMoveRight(char) {
    char.MoveRight();
}

autoMoveLeft(char) {
    char.MoveLeft();
}

autoMoveUp(char) {
    char.MoveUp();
}

autoMoveDown(char) {
    char.MoveDown();
}


drawImage(obj) {
    if (!obj.img) return;
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
}


setWorld() {
    this.initYellowPlates();
    // this.setYellowPlates('start');
    this.character.forEach(char => {
        char.setWorld(this);
    });
}


initYellowPlates() {
    this.activeYellowPlates = [];

    this.plates.forEach(plate => {
        if (plate.act === 'y') {
            plate.setAct('b');
        }
    });
    // 🔹 genau 2 neue gelbe Felder setzen
    while (this.activeYellowPlates.length < 2) {
        const plateNo = this.getRandomYellow(22); // Startschutz (ab Feld 22)
        if (plateNo !== null) {
            this.activeYellowPlates.push(plateNo);
            this.plates[plateNo - 1].setAct('y');
        }
    }
}


getRandomYellow(minIndex = 0) {
    const candidates = this.getFreeYellowCandidates(minIndex);
    if (candidates.length === 0) return null;

    return candidates[Math.floor(Math.random() * candidates.length)];
}


getFreeYellowCandidates(minPlateNo = 0) {
    return this.yellowPlateIndices.filter(no => {

        if (no < minPlateNo) return false;

        // kein Character drauf
        if (this.character.some(char => char.pos + 1 === no)) return false;

        // nicht bereits gelb
        if (this.activeYellowPlates.includes(no)) return false;

        return true;
    });
}


addCharacter(kid) {
    document.getElementById(kid).style.display = 'none';
    let place = ((this.player + 1) * 60) + this.scoreboardY;
    switch (kid) {
        case 'alex':
            this.character.push(new Alex(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
            this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/alex.png', this.player + 1));
            break;
        case 'chris':
            this.character.push(new Chris(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
            this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/chris.png', this.player + 1));
            break;
        case 'kim':
            this.character.push(new Kim(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
            this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/kim.png', this.player + 1));
            break;
        case 'luka':
            this.character.push(new Luka(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
            this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/luka.png', this.player + 1));
            break;
        case 'paddy':
            this.character.push(new Paddy(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
            this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/paddy.png', this.player + 1));
            break;
        case 'sascha':
            this.character.push(new Sascha(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
            this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/sascha.png', this.player + 1));
            break;
    }
    this.character[this.player].player = this.player + 1;
    this.player++;
}


}