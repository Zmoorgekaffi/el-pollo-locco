class ThrowableObject extends MoveableObject {

    world;
    speedY = 0;
    speed = 10;
    width = 60;
    height = 50;
    accleration = 0.3
    img = new Image();
    Saved_X_coordinates;
    itsTimeToClear = false;
    wasOtherDirection = false;

    collisionBox = {
        right: 20,
        left: 20,
        top: 5,
        bottom: 5
    };

    hitbox = {
        right: 20,
        left: 20,
        top: 5,
        bottom: 5
    };

    throw_sound = new Audio('audio/misc/throw sound.mp3');
    rotation_animation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    splash_animation = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    constructor(x, y, world) {
        super();
        this.world = world;
        this.wasOtherDirection = this.world.character.isOtherDirection;
        this.loadImage(this.rotation_animation[0]);
        this.loadIamgesToCache(this.rotation_animation);
        this.loadIamgesToCache(this.splash_animation);
        this.x = x;
        this.y = y;
        this.animate();
        this.prepareTothrow();
    }

    prepareTothrow() {
        this.Saved_X_coordinates = this.x;
        this.speedY = 8;
        this.throw_sound.play();
        this.applyGravity();
        let intervall = setInterval(() => {
            if (!this.wasOtherDirection && this.x < this.Saved_X_coordinates + 325) {
                this.x += this.speed;
            } else if(this.wasOtherDirection && this.x > this.Saved_X_coordinates - 325) {
                this.x -= this.speed;
            } else if (this.isOnGround() && this.itsTimeToClear == true) {
                this.world.throwableBottles.splice(0, 1);
                clearInterval(intervall);
            }
        }, 1000 / 30);
    }

    animate() {
        setInterval(() => {
            if (this.isAboveGround() && !this.isOnGround()) {
                this.playAnimation(this.rotation_animation);
            } else if (this.isOnGround()) {
                this.playAnimationWithEnd(this.splash_animation);
            }
        }, 1000 / 10);
    }

    isAboveGround() {
        return this.y <= 360;
    }

    isOnGround() {
        if (Math.abs(this.y - (361)) < 10) {
            return true;
        } else {
            return false;
        }
    }

    isColliding(obj) {
        if (this.wasOtherDirection == false) {
            return ((this.x + this.width) - this.hitbox.right) >= (obj.x + obj.hitbox.left) && // this.right greater than obj.left
                (this.x + this.hitbox.left) <= ((obj.x + obj.width) - obj.hitbox.right) && // this.left smaller than obj.right
                this.y + this.height >= (obj.y + obj.hitbox.top) && // this.bottom greater than obj.top
                (this.y + this.hitbox.top) <= obj.y + obj.height; // this.top smaller than obj.bottom
        } else {
            if (this.wasOtherDirection) {
                return ((this.x + this.width) - this.hitbox.left) >= obj.x && // this.right greater than obj.left
                    (this.x + this.hitbox.right) <= obj.x + obj.width && // this.left smaller than obj.right
                    this.y + this.height >= (obj.y + obj.hitbox.top) && // this.bottom greater than obj.top
                    (this.y + this.hitbox.top) <= obj.y + obj.height; // this.top smaller than obj.bottom
            }
        }
    }

}