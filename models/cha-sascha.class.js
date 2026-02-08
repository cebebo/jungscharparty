class Sascha extends Character {

    IMG_WALK_EAST = [
        'img/characters/sascha/running-4-frames/east/frame_000.png',
        'img/characters/sascha/running-4-frames/east/frame_001.png',
        'img/characters/sascha/running-4-frames/east/frame_002.png',
        'img/characters/sascha/running-4-frames/east/frame_003.png'
    ];

    IMG_WALK_NORTH = [
        'img/characters/sascha/running-4-frames/north/frame_000.png',
        'img/characters/sascha/running-4-frames/north/frame_001.png',
        'img/characters/sascha/running-4-frames/north/frame_002.png',
        'img/characters/sascha/running-4-frames/north/frame_003.png'
    ];

    IMG_WALK_NORTH_EAST = [
        'img/characters/sascha/running-4-frames/north-east/frame_000.png',
        'img/characters/sascha/running-4-frames/north-east/frame_001.png',
        'img/characters/sascha/running-4-frames/north-east/frame_002.png',
        'img/characters/sascha/running-4-frames/north-east/frame_003.png'
    ];

    IMG_WALK_NORTH_WEST = [
        'img/characters/sascha/running-4-frames/north-west/frame_000.png',
        'img/characters/sascha/running-4-frames/north-west/frame_001.png',
        'img/characters/sascha/running-4-frames/north-west/frame_002.png',
        'img/characters/sascha/running-4-frames/north-west/frame_003.png'
    ];

    IMG_WALK_SOUTH = [
        'img/characters/sascha/running-4-frames/south/frame_000.png',
        'img/characters/sascha/running-4-frames/south/frame_001.png',
        'img/characters/sascha/running-4-frames/south/frame_002.png',
        'img/characters/sascha/running-4-frames/south/frame_003.png'
    ];

    IMG_WALK_SOUTH_EAST = [
        'img/characters/sascha/running-4-frames/south-east/frame_000.png',
        'img/characters/sascha/running-4-frames/south-east/frame_001.png',
        'img/characters/sascha/running-4-frames/south-east/frame_002.png',
        'img/characters/sascha/running-4-frames/south-east/frame_003.png'
    ];

    IMG_WALK_SOUTH_WEST = [
        'img/characters/sascha/running-4-frames/south-west/frame_000.png',
        'img/characters/sascha/running-4-frames/south-west/frame_001.png',
        'img/characters/sascha/running-4-frames/south-west/frame_002.png',
        'img/characters/sascha/running-4-frames/south-west/frame_003.png'
    ];

    IMG_WALK_WEST = [
        'img/characters/sascha/running-4-frames/west/frame_000.png',
        'img/characters/sascha/running-4-frames/west/frame_001.png',
        'img/characters/sascha/running-4-frames/west/frame_002.png',
        'img/characters/sascha/running-4-frames/west/frame_003.png'
    ];

    IMG_IDLE = [
        'img/characters/sascha/breathing-idle/south/frame_000.png',
        'img/characters/sascha/breathing-idle/south/frame_000.png',
        'img/characters/sascha/breathing-idle/south/frame_000.png',
        'img/characters/sascha/breathing-idle/south/frame_001.png',
        'img/characters/sascha/breathing-idle/south/frame_001.png',
        'img/characters/sascha/breathing-idle/south/frame_001.png',
        'img/characters/sascha/breathing-idle/south/frame_002.png',
        'img/characters/sascha/breathing-idle/south/frame_002.png',
        'img/characters/sascha/breathing-idle/south/frame_002.png',
        'img/characters/sascha/breathing-idle/south/frame_003.png',
        'img/characters/sascha/breathing-idle/south/frame_003.png',
        'img/characters/sascha/breathing-idle/south/frame_003.png'
    ];

    IMG_JUMP = [
        'img/characters/sascha/two-footed-jump/south/frame_000.png',
        'img/characters/sascha/two-footed-jump/south/frame_001.png',
        'img/characters/sascha/two-footed-jump/south/frame_002.png',
        'img/characters/sascha/two-footed-jump/south/frame_003.png',
        'img/characters/sascha/two-footed-jump/south/frame_004.png',
        'img/characters/sascha/two-footed-jump/south/frame_005.png',
        'img/characters/sascha/two-footed-jump/south/frame_006.png'
    ];


    x;
    y;
    width = 80;
    height = 80;
    speed = 2; 
    player = 6;
    pos = -1;
    name = 'sascha';

    AUDIO_JUHU = new Audio('audio/juhu-sascha.mp3');
    AUDIO_NO = new Audio('audio/no-sascha.mp3');
    AUDIO_ORDEN = new Audio('audio/orden-sascha.mp3');
    AUDIO_POINTS = new Audio('audio/points-sascha.mp3');
    AUDIO_TURN = new Audio('audio/turn-sascha.mp3');
    AUDIO_WIN = new Audio('audio/win-sascha.mp3');

    constructor(startX, startY) {
        super();
        this.x = startX;
        this.y = startY;
        this.loadImage(this.IMG_IDLE[0]);
        this.loadImages(this.IMG_WALK_EAST);
        this.loadImages(this.IMG_WALK_NORTH);
        this.loadImages(this.IMG_WALK_NORTH_EAST);
        this.loadImages(this.IMG_WALK_NORTH_WEST);
        this.loadImages(this.IMG_WALK_SOUTH);
        this.loadImages(this.IMG_WALK_SOUTH_EAST);
        this.loadImages(this.IMG_WALK_SOUTH_WEST);
        this.loadImages(this.IMG_WALK_WEST);
        this.loadImages(this.IMG_IDLE);
        this.loadImages(this.IMG_JUMP); 
    }

}
