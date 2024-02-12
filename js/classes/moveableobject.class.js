class MoveableObject {
    x;
    y;
    img;
    speedY = 0;
    accleration = 1;
    currentImage = 0;
    world;

    imgCache = {};

    hitbox = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    };

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

    drawCollisionBoxes(ctx) {
        if(this instanceof Character || this instanceof Chicken || this instanceof Endboss) {

            //frameborder
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            //collisionbox
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.rect(this.x + this.hitbox.left, this.y + this.hitbox.top, this.width - this.hitbox.right * 2, this.height - this.hitbox.top);
            ctx.stroke();
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    moveRight() {
        this.isOtherDirection = false;
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        if (this.isOnGround()) {
            this.speedY = 20;
        }
    }
}