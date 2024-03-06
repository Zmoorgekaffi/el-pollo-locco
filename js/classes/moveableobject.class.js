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
    hurt_sound_isPlaying = false;

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

    /**
     * this function will take the paths of the given array as argument, to load the specific imgs from objects cache array.
     * 
     * @param {array} array the array with the sources of to animated imgs of an object,
     * we used them also in the function loadImgsToCache()
     */
    playAnimation(array) {
        let i = this.currentImage % array.length;
        this.img = this.imgCache[array[i]];
        this.currentImage++;
    }

    /**
     * this function will take the paths of the given array as argument, to load the specific imgs from objects cache array,
     * this function has other than playAnimation(), a counter wich will increases and if it hits the number of the array.length
     * it will be stop the animation.
     * if the object is an instance of a throwable object the variable itsTimeToClear will be set to true if this variable is set to true the
     * obejct will be spliced out from thorwableObject array wich is in World
     * 
     * @param {array} array the array with the sources of to animated imgs of an object,
     * we used them also in the function loadImgsToCache()
     */
    playAnimationWithEnd(array) {
        if (this.animationCounter < array.length) {
            let i = this.animationCounter % array.length;
            this.img = this.imgCache[array[i]];
            this.animationCounter++;
        } else if (this instanceof ThrowableObject) {
            this.itsTimeToClear = true;
        }
    }

    /**
     * this function simulate a gravity if object is above ground,
     * acceleration is the number of gravity wich is decreaseing the speedY constantly if object is above ground,
     * speedY stands for the "energy" in wich a character is jumping or a object is throwing
     * 
     */
    applyGravity() {
        let intervall = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accleration;
            }

        }, 1000 / 60);
        intervallIds.push(intervall);
    }

     /**
     * sets the y point of the ground,
     * this is used to check if the object is above the ground
     * 
     * @returns boolian
     */
    isAboveGround() {
        return this.y <= 230;
    }

    /**
     * this is used to check if a moveableobject is actually on ground.
     * 
     * @returns boolian
     */
    isOnGround() {
        return this.y == 233;
    }

    /**
     * checks if an object collides with an object
     * 
     * @param {object} obj a moveableObject 
     * @returns boolian
     */
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

    /**
     * checks if the bottom of an object collides with the top of an object (obj),
     * with a tolerance of 6
     * 
     * @param {object} obj a moveableObject 
     * @returns boolian
     */
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

     /**
     * this function sets the life to 0 if the objects life is dropped bellow 0 and calls the function isDead if life is <= 0,
     * otherwise it will be subtract the (obj) damage from objects life,
     * also creates a timestamp to check at wich time the object was last hitted
     * 
     * @param {object} obj a moveableObject
     */
    wasHurtBy(obj) {
        if (this.life <= 0) {
            this.life = 0;
            this.isDead();
        } else {
            this.life -= obj.damage;
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * This function compares the time with the last time the object was hit
     * and returns false if the last hit was more the 1 second ago.
     * 
     * @returns boolian
     */
    wasDamaged() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; //converted to seconds
        return timepassed < 1;
    }

    /**
     * this function finds out whether an object has less or equal life than 0
     * 
     * @returns boolian
     */
    isDead() {
        return this.life <= 0;
    }

    /**
     * this function moves the object x-axis to the right
     * 
     */
    moveRight() {
        this.isOtherDirection = false;
        this.x += this.speed;
    }

    /**
     * this function moves the object x-axis to the left
     * 
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * sets the objects speedY to 20;
     * 
     */
    jump() {
        if (this.isOnGround()) {
            this.speedY = 20;
        }
    }

    /**
     * this function checks if the damage sound is playing,
     * if it is playing it will not be played again until the sound is finnished with playing
     * 
     */
    playHurtSound() {
        if (!this.hurt_sound_isPlaying) {
            this.audio['hurt_sound'].play();
            this.hurt_sound_isPlaying = true;
        } else {
            this.hurt_sound_isPlaying = false;
        }
    }

    /**
     * this function pushes the audiofiles of an object into game.js sounds array
     * 
     * @param {array} audioArray array with the objects audio files
     */
    pushAudioArrayToSoundsArray(audioArray) {
        Object.values(audioArray).forEach(sound => {
            sounds.push(sound);
        });
    }
}