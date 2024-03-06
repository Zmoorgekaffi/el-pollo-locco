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

    /**
     * this constructor pushes the audio files into game.js sounds array
     * connects the world variable with the Wolrd obejct,
     * sets the isOtheDirection variable to true or false depending in wich direction the character was looking,
     * loads the first img of the roation animation,
     * loads the animations imgs to obejct cache,
     * sets the x and y axis starting points,
     * calls the update function aka. animate,
     * calls the prepareToThrow function
     * 
     * @param {number} x starting point x-axis
     * @param {number} y starting point y-axis
     * @param {object} world World obejct
     */
    constructor(x, y, world) {
        super();
        sounds.push(this.throw_sound);
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

    /**
     * saves the x coordinates when throwableobject is created,
     *  wich is used in the if condition to detecd if bottles x moved 325 away from its starting point,
     * sets the speedY to get a "throw in the air" effekt,
     * plays the throw sound,
     * apllies gravity,
     * sets an intervall to update the x-axis,
     * if the bottle landed on the ground it will (playAnimationWithEnd() -> wich will sets the itsTimeToClear variable to true),
     * if itsTimeToClear is true the bottle will be spliced out of throwableobjects array and clear the intervall within the function. 
     * 
     */
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

    /**
     * this function update the animation of the throwableObject
     * 
     */
    animate() {
        setInterval(() => {
            if (this.isAboveGround() && !this.isOnGround()) {
                this.playAnimation(this.rotation_animation);
            } else if (this.isOnGround()) {
                this.playAnimationWithEnd(this.splash_animation);
            }
        }, 1000 / 10);
    }

    /**
     * sets the y point of the ground,
     * this is used to check if the object is above the ground
     * 
     * @returns boolian
     */
    isAboveGround() {
        return this.y <= 360;
    }

    /**
     * sets the y point of the ground,
     * this is used that the object can't fall through the map and to check if its on ground
     * 
     * @returns boolian
     */
    isOnGround() {
        if (Math.abs(this.y - (361)) < 10) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * checks if an object collides with an object
     * 
     * @param {object} obj a moveableObject
     * @returns boolian
     */
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