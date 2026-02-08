class Character extends MoveObjects {
    x;
    y;
    width;
    height;
    img;
    speed;
    player;
    points;
    orden;
    team;
    

    IMG_WALK_EAST = [];
    IMG_WALK_NORTH = [];
    IMG_WALK_NORTH_EAST = [];
    IMG_WALK_NORTH_WEST = [];
    IMG_WALK_SOUTH = [];
    IMG_WALK_SOUTH_EAST = [];
    IMG_WALK_SOUTH_WEST = [];
    IMG_WALK_WEST = [];
    IMG_IDLE = [];
    IMG_JUMP = [];
  
    

    constructor() {
        super();
        // this.animate();
    }


    setWorld(world) {
        this.world = world;
        this.animate();
    }


    animate() {
        setInterval(() => {
            this.reactionsCharacter();
        }, 100);
    }

    MoveRight() {
        this.moveRight();

    }


    MoveLeft() {
        this.moveLeft();

    }


    MoveUp() {
        this.moveUp();
    }


    MoveDown() {
        this.moveDown();
    }


    reactionsCharacter() {

        if (this.player === this.world.activePlayer) {

            if (this.world.keyboard.UP && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMG_WALK_NORTH);
            }

            else if (this.world.keyboard.DOWN && !this.world.keyboard.LEFT && !this.world.keyboard.RIGHT) {
                this.playAnimation(this.IMG_WALK_SOUTH);
            }

            else if (this.world.keyboard.RIGHT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
                this.playAnimation(this.IMG_WALK_EAST);
            }

            else if (this.world.keyboard.LEFT && !this.world.keyboard.UP && !this.world.keyboard.DOWN) {
                this.playAnimation(this.IMG_WALK_WEST);
            }

            else if (this.world.keyboard.LEFT && this.world.keyboard.UP) {
                this.playAnimation(this.IMG_WALK_NORTH_WEST);
            }

            else if (this.world.keyboard.LEFT && this.world.keyboard.DOWN) {
                this.playAnimation(this.IMG_WALK_SOUTH_WEST);
            }

            else if (this.world.keyboard.RIGHT && this.world.keyboard.UP) {
                this.playAnimation(this.IMG_WALK_NORTH_EAST);
            }

            else if (this.world.keyboard.RIGHT && this.world.keyboard.DOWN) {
                this.playAnimation(this.IMG_WALK_SOUTH_EAST);
            }

            else {
                this.playAnimation(this.IMG_IDLE);
            }

        }

        

        else {
            this.playAnimation(this.IMG_IDLE);
        }


    }

}