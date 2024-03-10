class Chicken extends MoveableObject {
    y = 355;
    width = 60;
    height = 70;
    speed = 0.5 + Math.random() * 0.5;
    small = false;

    collisionBox = {
        right: 5,
        left: 5,
        top: 10,
        bottom: 0
    };

    hitbox = {
        right: 5,
        left: 5,
        top: 10,
        bottom: 0
    };

    audio = {
        dead_sound: new Audio('audio/chicken/dead-sound/dead sound_1.mp3')
    };

    run_animation = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    run_animation_small = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    dead_animation = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    dead_animation_small = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * this function loads the first img of the chicken,
     * pushes all audiofiles from object into game.js sounds array,
     * add a random number to the x-axis,
     * loads all animations into object cache,
     * calls the update function aka. animate
     * 
     * @param {number} x sets the starting x-axis
     */
    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.chickenIsNormalOrSmall();
        this.pushAudioArrayToSoundsArray(this.audio);
        this.x = x + Math.random() * 400;
            this.loadIamgesToCache(this.run_animation);
            this.loadIamgesToCache(this.dead_animation);
            this.loadIamgesToCache(this.run_animation_small);
            this.loadIamgesToCache(this.dead_animation_small);  
        this.animate();
    }

    /**
     * this function sets the size of the Chicken. 
     * If the number is smaller than 0.5 the Chickens animation will be loaded as the small version.
     * 
     */
    chickenIsNormalOrSmall() {
        let number = Math.random();
        if (number < 0.5) {
            this.small = true;
        } else {
            this.small = false;
        }
    }

    /**
     * this function updates the chickens animations and movements if conditions are met
     * 
     */
    animate() {
        let intervall = setInterval(() => {
            this.animations();
        }, 1000 / 11);

        let intervall2 = setInterval(() => {
            if (this.x > level_1.levelStart && !this.isDead()) {
                this.moveLeft();
            }
        }, 1000 / 60);
        intervallIds.push(intervall, intervall2);
    }

    /**
     * this function adds the animations
     * 
     */
    animations() {
        if (!this.isDead() && this.small) {
            this.playAnimation(this.run_animation_small); //walk small
        } else if (this.isDead() && this.small) { //dead animation small
            this.playAnimationWithEnd(this.dead_animation_small);
        } 
        
        if (!this.isDead() && !this.small) {
            this.playAnimation(this.run_animation); //walk normal
        }  else if (this.isDead() && !this.small) { //dead animation normal
            this.playAnimationWithEnd(this.dead_animation);
        }
    }
}