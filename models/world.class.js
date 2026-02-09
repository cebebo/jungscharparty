class World {

    character = [];
    player = 0;
    map = new Map('img/map.png');
    mapOverlay = new MapOverlay('img/map-overlay.png');
    dice = new Dice();
    scoreboard = [];
    teamScore = [];
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
    startScore = 20;
    popup;

    games_jgj = [];
    games_2vs2 = [];
    games_unfair = [];

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
        this.teamScore.forEach(team => { team.draw(this.ctx); });   // Team Scores werden gezeichnet
        if (!this.camlock) { this.drawImage(this.camView); }
        if (this.popup) { 
            this.drawImage(this.popup); 
            if (this.popup.text && this.popup.title) { this.popup.draw(this.ctx); }
        }  // PopUp mit Schildinfos wird gezeichnet

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
        if (this.keyboard.CAM_UP) { this.camera_y += 10; this.camlock = false; }
        if (this.keyboard.CAM_DOWN) { this.camera_y -= 10; this.camlock = false; }
        if (this.keyboard.CAM_LEFT) { this.camera_x += 10; this.camlock = false; }
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
    async nextPlayer() {
        if (this.keyboard.SPACE) {
            if (!this.spaceLock) {
                this.spaceLock = true;
                this.activePlayer++;
                if (this.activePlayer > this.character.length) {
                    await this.gamesPopup();
                    this.activePlayer = 1;
                }
                console.log('Active Player: ' + this.activePlayer + ": " + this.character[this.activePlayer - 1].name);
                this.character[this.activePlayer - 1].AUDIO_TURN.play();
            }
        } else { this.spaceLock = false; }
        this.keyboard.SPACE = false; // Verhindert, dass die Leertaste in der nächsten Runde noch aktiv ist
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


    gamesPopup() {
        const type = this.checkGamesType();
        let gameType;
        switch (type) {
            case 'jgj': gameType = this.games_jgj; break;
            case '2vs2': gameType = this.games_2vs2; break;
            case 'unfair': gameType = this.games_unfair; break;
        }
        let amount = gameType.length;
        const randomIndex = Math.floor(Math.random() * amount);
        if (type == 'jgj') {
            this.popup = new PopUp(this, 30, -70, 800, 550, 'spiel-JGJ', gameType[randomIndex].title, 430, 150, gameType[randomIndex].rules, 430, 180);
        } else {
            this.popup = new PopUp(this, 30, -70, 800, 550, 'spiel-BGR', gameType[randomIndex].title, 430, 150, gameType[randomIndex].rules, 430, 180);
        }
        return new Promise(resolve => {

            if (type == '2vs2' || type == 'unfair') {
                const onKeyDown = (e) => {
                    if (e.code === 'ArrowLeft') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve('blue'); // Blaues Team
                    }

                    if (e.code === 'ArrowRight') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve('red'); // Rotes Team
                    }
                };

                window.addEventListener('keydown', onKeyDown);
            } else {
                const onKeyDown = (e) => {
                    if (e.code === 'Digit1') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve(this.character[0].name); // Spieler 1
                    }

                    if (e.code === 'Digit2') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve(this.character[1].name); // Spieler 2
                    }

                    if (e.code === 'Digit3') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve(this.character[2].name); // Spieler 3
                    }

                    if (e.code === 'Digit4') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve(this.character[3].name); // Spieler 4
                    }

                    if (e.code === 'Digit5') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve(this.character[4].name); // Spieler 5
                    }

                    if (e.code === 'Digit6') {
                        window.removeEventListener('keydown', onKeyDown);
                        resolve(this.character[5].name); // Spieler 6
                    }
                };
            }
        });
    }


    checkGamesType() {
        let blue = 0;
        let red = 0;
        this.character.forEach(char => {
            if (char.team === 'blue') { blue++; }
            if (char.team === 'red') { red++; }
        });
        if (red === 0) { return 'jgj'; }
        else if (red === blue) { return '2vs2'; }
        else { return 'unfair'; }
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
                this.popup = new PopUp(this, 250, 25, 400, 450, 'wegweiser', '', '', '', '', '', '');
                this.startPlate = await this.chooseDirection();
                this.popup = null;
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

            // 🟡 SOFORT prüfen
            const plateObj = this.plates[this.startPlate];
            if (plateObj.act === 'y') {
                await this.handleYellowPlate(char, plateObj);
            }

        }
        setTimeout(() => {
            this.keyboard.SPACE = true;
            this.nextPlayer();
        }, 1000);   
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
                const board = this.teamScore[char.player - 1];
                switch (plate.act) {
                    case 'b': char.AUDIO_JUHU.play(); char.team = 'blue'; board.addPoints(3); this.showPointsPopup('p'); break;
                    case 'r': char.AUDIO_NO.play(); char.team = 'red'; board.addPoints(-3); this.showPointsPopup('m'); break;
                    case 'y': this.handleYellowPlate(char, plate); char.team = 'blue'; break;
                }
            }
        })
    }


    showPointsPopup(val) {
        if (val == 'p') { this.popup = new PopUp(this, 460, 50, 100, 73, 'p3', '', '', '', '', '', ''); }
        if (val == 'm') { this.popup = new PopUp(this, 460, 50, 100, 73, 'm3', '', '', '', '', '', ''); }
        setTimeout(() => {
            this.popup = null;
        }, 2000);
    }


    async handleYellowPlate(char, plate) {
        const board = this.teamScore[char.player - 1];

        // 🔒 Kein Geld → kein Orden
        if (board.score < 20) {
            console.log('Nicht genug Punkte für einen Orden');
            return;
        }

        // ❓ Spieler fragen
        this.popup = new PopUp(this, 250, 25, 600, 450, 'orden', '', '', '', '', '', '');

        const wantsToBuy = await this.askYesNo();

        if (wantsToBuy) {
            board.addPoints(-20);
            board.addOrden(1);
            char.AUDIO_ORDEN.play();
            await char.playJumpAnimationOnce();
            this.replaceYellowPlate(plate.no);
            this.popup = null;
            console.log('Orden gekauft');
        } else {
            console.log('Orden abgelehnt');
        }
    }


    askYesNo() {
        return new Promise(resolve => {

            console.log('Orden kaufen? ← = Nein | → = Ja');

            const handler = (e) => {
                if (e.code === 'ArrowLeft') {
                    window.removeEventListener('keydown', handler);
                    resolve(false);
                }

                if (e.code === 'ArrowRight') {
                    window.removeEventListener('keydown', handler);
                    resolve(true);
                }
            };

            window.addEventListener('keydown', handler);
        });
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
        this.initGames();
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


    initGames() {
        const allGames = new Games();
        const collection = allGames.collection;
        collection.forEach(game => {
            if (game.mode_All) {
                this.games_jgj.push({
                    title: game.name,
                    rules: game.rules_All
                });
            }
            if (game.mode_2vs2) {
                this.games_2vs2.push({
                    title: game.name,
                    rules: game.rules_2vs2
                });
            }
            if (game.mode_unfair) {
                this.games_unfair.push({
                    title: game.name,
                    rules: game.rules_unfair
                });
            }
        });
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
                this.teamScore.push(new Teamscore(870, place + 20, this.player + 1, this.startScore));
                break;
            case 'chris':
                this.character.push(new Chris(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
                this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/chris.png', this.player + 1));
                this.teamScore.push(new Teamscore(870, place + 20, this.player + 1, this.startScore));
                break;
            case 'kim':
                this.character.push(new Kim(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
                this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/kim.png', this.player + 1));
                this.teamScore.push(new Teamscore(870, place + 20, this.player + 1, this.startScore));
                break;
            case 'luka':
                this.character.push(new Luka(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
                this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/luka.png', this.player + 1));
                this.teamScore.push(new Teamscore(870, place + 20, this.player + 1, this.startScore));
                break;
            case 'paddy':
                this.character.push(new Paddy(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
                this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/paddy.png', this.player + 1));
                this.teamScore.push(new Teamscore(870, place + 20, this.player + 1, this.startScore));
                break;
            case 'sascha':
                this.character.push(new Sascha(this.startFields[this.character.length][0], this.startFields[this.character.length][1]));
                this.scoreboard.push(new Scoreboard(870, place, 'img/scoreboard/sascha.png', this.player + 1));
                this.teamScore.push(new Teamscore(870, place + 20, this.player + 1, this.startScore));
                break;
        }
        this.character[this.player].player = this.player + 1;
        this.player++;
    }


}