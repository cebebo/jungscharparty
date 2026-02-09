class PopUp extends MoveObjects {

    x;
    y;
    height;
    width;
    title;
    text;
    titleX;
    titleY;
    textX;
    textY;

    img;
    type;
    IMG_wegweiser = 'img/popup/wegweiser.png';
    IMG_orden = 'img/popup/orden.png';
    IMG_spiel = [
        'img/popup/schild_spiel-bgr.png',
        'img/popup/schild-jgj2.png',
        'img/popup/schild-jgj3.png',
        'img/popup/schild-jgj4.png',
        'img/popup/schild-jgj5.png',
        'img/popup/schild-jgj6.png'
    ];
    IMG_winner = [
        'img/characters/alex/winner.png',
        'img/characters/chris/winner.png',
        'img/characters/kim/winner.png',
        'img/characters/luka/winner.png',
        'img/characters/paddy/winner.png',
        'img/characters/sascha/winner.png'
    ];
    IMG_faces = [
        'img/characters/alex/face.png',
        'img/characters/chris/face.png',
        'img/characters/kim/face.png',
        'img/characters/luka/face.png',
        'img/characters/paddy/face.png',
        'img/characters/sascha/face.png'
    ];
    IMG_points = [
        'img/popup/plus3.png',
        'img/popup/minus3.png'
    ]

    constructor(world, x, y, width, height, type, title, titleX, titleY, text, textX, textY) {
        super();
        this.world = world;
        this.loadImage(this.IMG_wegweiser);
        this.loadImage(this.IMG_orden);
        this.loadImages(this.IMG_spiel);
        this.loadImages(this.IMG_winner);
        this.loadImages(this.IMG_faces);
        this.loadImages(this.IMG_points);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.title = title;
        this.text = text;
        this.type = type;
        this.titleX = titleX;
        this.titleY = titleY;
        this.textX = textX;
        this.textY = textY;
        this.loadPopup();
    }


    loadPopup() {
        let teams = this.world.player;
        this.img = new Image();
        switch (this.type) {
            case 'orden':
                this.img.src = this.IMG_orden;
                break;
            case 'wegweiser':
                this.img.src = this.IMG_wegweiser;
                break;
            case 'spiel-JGJ':
                this.img.src = this.IMG_spiel[teams - 1];
                break;
            case 'spiel-BGR':
                this.img.src = this.IMG_spiel[0];
                break;
            case 'p3':
                this.img.src = this.IMG_points[0];
                break;
            case 'm3':
                this.img.src = this.IMG_points[1];
                break;
            // case 'winner':
            //     this.img.src = this.IMG_winner[0];
            //     break;
            // case 'face':
            //     this.img.src = this.IMG_faces[0];
            //     break;
        }
    }


    wrapText(ctx, text, x, y, maxWidth, lineHeight) {
        const words = text.split(' ');
        let line = '';
        let currentY = y;

        for (let i = 0; i < words.length; i++) {
            const testLine = line + words[i] + ' ';
            const metrics = ctx.measureText(testLine);
            const testWidth = metrics.width;

            if (testWidth > maxWidth && i > 0) {
                ctx.fillText(line, x, currentY);
                line = words[i] + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        }

        ctx.fillText(line, x, currentY);
    }



    draw(ctx) {
        ctx.save();

        ctx.textAlign = 'center';

        // Titel
        ctx.font = '22px Arial';
        ctx.fillStyle = 'green';
        ctx.fillText(this.title, this.titleX, this.titleY);

        // Text mit Umbruch
        ctx.font = '18px Arial';
        ctx.fillStyle = 'black';

        const maxTextWidth = 600;   // 👈 maximale Textbreite
        const lineHeight = 20;      // 👈 Zeilenabstand

        this.wrapText(
            ctx,
            this.text,
            this.textX,
            this.textY,
            maxTextWidth,
            lineHeight
        );

        ctx.restore();
    }

}