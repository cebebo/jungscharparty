class Dice extends MoveObjects {

    IMG_DICE = [
        'img/dice/1.png',
        'img/dice/2.png',
        'img/dice/3.png',
        'img/dice/4.png',
        'img/dice/5.png',
        'img/dice/6.png',
        'img/dice/7.png',
        'img/dice/8.png',
        'img/dice/9.png',
        'img/dice/10.png',
        'img/dice/0.png'
    ];
    img;
    height = 80;
    width = 80;
    x = 930;
    y = 20;

    constructor() {
        super();
        this.loadImages(this.IMG_DICE);               // 🔥 DAS fehlte
        this.img = this.imageCache[this.IMG_DICE[10]]; // Startbild
    }

    setValue(value) {
        const path = this.IMG_DICE[value - 1];
        this.img = this.imageCache[path];
    }

}