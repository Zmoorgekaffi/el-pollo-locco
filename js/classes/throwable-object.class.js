class ThrowableObject extends MoveableObject {

    speedY = 0;
    speed = 10;
    width = 60;
    height = 50;
    accleration = 0.3
    img = new Image();
    Saved_X_coordinates;

    collisionBox = {
        right: 20,
        left: 20,
        top: 5,
        bottom: 5
    };

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


    constructor(x, y) {
        super();
        this.x = x + 30;
        this.y = y + 260;
        this.loadImage(this.rotation_animation[0]);
        this.loadIamgesToCache(this.rotation_animation);
        this.loadIamgesToCache(this.splash_animation);
        this.animate();
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

    throw() {
        if (this.world.collected_bottles.length > 0) {
            this.Saved_X_coordinates = this.x;
            this.speedY = 9;
            this.applyGravity();
            setInterval(() => {
                if (this.x < this.Saved_X_coordinates + 325) {
                    this.x += this.speed;
                } else {
                    setTimeout(() => {
                        this.x = undefined;
                    }, 500);
                }
            }, 1000 / 30);
            this.world.collected_bottles.splice(0, 1);
            this.world.salsabar.setPercentage(this.world.salsabar.percentage -= 20)
        }
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
}