class OverlayScreen extends DrawableObject {
    
    /**
     * this function adds a fixed screen object
     * 
     * @param {string} path 
     * @param {number} x 
     * @param {number} y 
     */

    constructor(path, x, y) {
        super().loadImage(path, x, y);
        this.x = x;
        this.y = y;
        this.width = 720;
        this.height = 480;
    }
}