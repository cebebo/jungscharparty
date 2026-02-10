class FaceIcon {
    loaded = false;
    x;
    y;
    size = 90;
    img;
    playerIndex;

    constructor(char, x, y, playerIndex, size) {
        this.x = x;
        this.y = y;
        this.playerIndex = playerIndex;
        this.size = size || this.size;

        this.img = new Image();
        this.img.onload = () => this.loaded = true;
        this.img.src = `img/characters/${char.name}/face.png`;
    }

    draw(ctx) {
        if (!this.loaded) return;

        ctx.save();                // ✅ RESET
        ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
        ctx.restore();
    }
}
