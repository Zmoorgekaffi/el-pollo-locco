class MoveableObject {
    x;
    y;
    img;
    speedY = 0;
    accleration = 1;
    currentImage = 0;
    world;
    life = 100;
    damage = 0.5;

    lastHit = 0;

    imgCache = {};

    collisionBox = {
        right: 0,
        left: 0,
        top: 0,
        bottom: 0
    };

    hitbox = {
        right: 20,
        left: 20,
        top: 40,
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
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {

            //frameborder
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            //collisionbox
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.rect(this.x + this.collisionBox.left, this.y + this.collisionBox.top, this.width - this.collisionBox.right * 2, this.height - this.collisionBox.top);
            ctx.stroke();
        }
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    isColliding(obj) {
        if (this.isOtherDirection == false) {
            return ((this.x + this.width) - this.hitbox.right) >= (obj.x + obj.hitbox.left) && // this.right greater than obj.left
                (this.x + this.hitbox.left) <= ((obj.x + obj.width) - obj.hitbox.right) && // this.left smaller than obj.right
                this.y + this.height >= (obj.y + obj.hitbox.top) && // this.bottom greater than obj.top
                (this.y + this.hitbox.top) <= obj.y + obj.height; // this.top smaller than obj.bottom
        } else {
            if (this.isOtherDirection) {
                return ((this.x + this.width) - this.hitbox.left) >= obj.x && // this.right greater than obj.left
                    (this.x + this.hitbox.right) <= obj.x + obj.width && // this.left smaller than obj.right
                    this.y + this.height >= (obj.y + obj.hitbox.top) && // this.bottom greater than obj.top
                    (this.y + this.hitbox.top) <= obj.y + obj.height; // this.top smaller than obj.bottom
            }
        }
    }

    wasHurtBy(obj) {
        if (this.life <= 0) {
            this.life = 0;
            this.isDead();
        } else {
            this.life -= obj.damage;
            this.lastHit = new Date().getTime();
        }
    }

    wasDamaged() {
        let timepassed = new Date().getTime() - this.lastHit;
        
        timepassed = timepassed / 1000; //converted to seconds
        return timepassed < 1;
    }

    isDead() {
        return this.life == 0;
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