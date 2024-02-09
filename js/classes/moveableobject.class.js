class MoveableObject {
    x;
    y;
    img;
    speedY = 0;
    accleration = 1;
    currentImage = 0;

    imgCache = {};

    constructor() {

    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }

        }, 1000 / 60);
    }

    isAboveGround() {
        return this.y <= 230;
    }

    isOnGround() {
        return this.y == 233;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadIamgesToCache(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    playAnimation(array) {
        this.loadIamgesToCache(array);
        let i = this.currentImage % array.length;
        this.img = this.imgCache[array[i]];
        this.currentImage++;
    }

    moveRight() {
        this.isOtherDirection = false;
        this.x += this.speed;
    }

    moveLeft() {
        setInterval(() => {
            if (this.x > 0) {
                this.x -= this.speed;
            }
        }, 1000 / 60);
    }

    jump() {
        if (this.isOnGround()) {
            this.speedY = 20;
        }
    }
}