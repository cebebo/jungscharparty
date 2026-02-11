class Teamscore {

    x;
    y;
    player;
    score = 0;
    orden = 0;

    constructor(x, y, player, startScore) {
        this.x = x + 90;
        this.y = y + 29;
        this.player = player;
        this.score = startScore;
    }

    addPoints(value) {
        this.score += value;
        if (this.score < 0) {
            this.score = 0;
        }
    }

    addOrden(value) {
        this.orden++;
    }

    draw(ctx) {
        ctx.font = '20px Arial';        
        ctx.textAlign = 'center';
        ctx.fillStyle = 'black';
        ctx.fillText(
            `${this.orden}`,
            this.x,
            this.y
        );
        ctx.fillStyle = 'white';
        ctx.fillText(
            `${this.score}`,
            this.x + 40,
            this.y
        );
    }
}

