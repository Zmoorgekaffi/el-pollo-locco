class BackgroundObject extends MoveableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    /**
     * This constructor sets the path of the loaded img
     * and sets the number of the starting point x-axis
     * 
     * @param {string} imgPath path of the img
     * @param {number} x number of the starting x-axis
     */
    constructor(imgPath, x) {
        super().loadImage(imgPath);
        this.x = x;
    }
}