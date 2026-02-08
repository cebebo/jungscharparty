class Plate {

    img;
    act;
    width = 50;
    height = 30;
    x;
    y;
    no;

    constructor(act, x, y, no) {
        this.img = new Image();
        this.x = x;
        this.y = y;
        this.no = no;

        this.setAct(act);   // 👈 WICHTIG
    }

    setAct(act) {
        this.act = act;

        switch (act) {
            case 'b':
                this.img.src = 'img/plate_blue.png';
                break;
            case 'y':
                this.img.src = 'img/plate_yellow.png';
                break;
            case 'r':
                this.img.src = 'img/plate_red.png';
                break;
        }
    }
}
