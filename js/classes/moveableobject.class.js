class MoveableObject extends DrawableObject {
    speedY = 0;
    accleration = 1;
    world;
    life = 100;
    damage = 0.5;
    lastHit = 0;
    animationCounter = 0;
    wasAboveTimer = 0;
    wasUnder = true;

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
        super();
    }

    playAnimation(array) {
        let i = this.currentImage % array.length;
        this.img = this.imgCache[array[i]];
        this.currentImage++;
    }

    playAnimationWithEnd(array) {
        if (this.animationCounter < array.length) {
            let i = this.animationCounter % array.length;
            this.img = this.imgCache[array[i]];
            this.animationCounter++;
        } else if (this instanceof ThrowableObject) {
            this.itsTimeToClear = true;
        }
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

    collidingTop(obj) {
        const tolerance = 6;
        
        if (this.isOtherDirection) { 
            return ((this.x + this.width) - this.hitbox.left) >= obj.x && // this.right greater than obj.left
                (this.x + this.hitbox.right) <= obj.x + obj.width && // this.left smaller than obj.right
                (this.y + this.height) >= (obj.y + obj.hitbox.top - tolerance) && // this.bottom greater than or equal to obj.top - tolerance
                (this.y + this.height) <= (obj.y + obj.hitbox.top + tolerance); // this.bottom less than or equal to obj.top + tolerance
        } else if (!this.isOtherDirection) { 
            return ((this.x + this.width) - this.hitbox.right) >= (obj.x + obj.hitbox.left) && // this.right greater than obj.left
                (this.x + this.hitbox.left) <= ((obj.x + obj.width) - obj.hitbox.right) && // this.left smaller than obj.right
                (this.y + this.height) >= (obj.y + obj.hitbox.top - tolerance) && // this.bottom greater than or equal to obj.top - tolerance
                (this.y + this.height) <= (obj.y + obj.hitbox.top + tolerance); // this.bottom less than or equal to obj.top + tolerance
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