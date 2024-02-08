class MoveableObject {
    x;
    y;
    img;
    currentImage = 0;

    imgCache = {};

    constructor() {

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
        console.log('move right');
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}