class MoveObjects {

    speed;
    img;
    imageCache = {};
    x;
    y;
    width;
    height;
    direction;
    currentImage = 0;
    

    constructor() {


    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    loadImages(array) {
        array.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        if (keyboard.DOWN || keyboard.UP) { this.x += this.speed / 1.5; }
        else { this.x += this.speed; }
        this.direction = 'r';
    }


    moveLeft() {
        if (keyboard.DOWN || keyboard.UP) { this.x -= this.speed / 1.5; }
        else { this.x -= this.speed; }
        this.direction = 'l';
    }


    moveUp() {
        if (keyboard.LEFT || keyboard.RIGHT) { this.y -= this.speed / 1.5; }
        else { this.y -= this.speed; }
        this.direction = 'u';
    }


    moveDown() {
        if (keyboard.LEFT || keyboard.RIGHT) { this.y += this.speed / 1.5; }
        else { this.y += this.speed; }
        this.direction = 'd';
    }


    camUp() {
        if (keyboard.CAM_UP) { 
            if (this.world.camera_y < 600) { this.world.camera_y += 20; }
        }
    }


    camDown() {
        if (keyboard.CAM_DOWN) { 
            if (this.world.camera_y > -230) { this.world.camera_y -= 20; }
        }   
    }


    camLeft() {
        if (keyboard.CAM_LEFT) { 
            if (this.world.camera_x < 375) { this.world.camera_x += 20; }
        }
    }


    camRight() {
        if (keyboard.CAM_RIGHT) { 
            if (this.world.camera_x > -500) { this.world.camera_x -= 20; }  
        }
    }

}