class CameraView extends MoveObjects {

x;
y;
width = 1024;
height = 480;

constructor(x, y) {
    super().loadImage('img/cameraview.png');
    this.x = x;
    this.y = y;
}

}