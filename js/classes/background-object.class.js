class BackgroundObject extends MoveableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;
    }
}