class Scoreboard extends MoveObjects{

x;
y;
width = 180;
height = 60;
img;
no;

    constructor(x, y, img, no) {
        super();
        this.x = x;
        this.y = y;
        this.no = no;

        this.loadImage(img);
    }

}