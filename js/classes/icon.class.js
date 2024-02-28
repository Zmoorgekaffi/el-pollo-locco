class Icon extends DrawableObject {

    constructor(path, x, y, width, height) {
        super().loadImage(path, x, y, width, height);
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}