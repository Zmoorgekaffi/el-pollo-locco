class Character extends MoveableObject {
    x = 100;
    y = 80;
    width = 120;
    height = 200;
    speed = 4;
    throwTimer = true;
    isOtherDirection = false;

    audio = {
        run_sound: new Audio('audio/character/run/character_run_cut.mp3'),
        jump_sound: new Audio('audio/character/jump/667296_5086589-lq.mp3'),
        hurt_sound: new Audio('audio/character/damage/hurt.mp3')
    };

    idle_animation = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    
    run_animation = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    jump_animation = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    dead_animation = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    hurt_animation = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    collisionBox = {
        right: 30,
        left: 20,
        top: 80,
        bottom: 0
    };

    hitbox = {
        right: 38,
        left: 19,
        top: 80,
        bottom: 0
    };

    /**
     * this constructor loads the first img of the character,
     * pushes all the character audio ito game.js sounds array,
     * loads all img path for animations into object cache,
     * reduces the volume of the jump sound,
     * calls the function update aka. animate,
     * and applies gravity
     * 
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.pushAudioArrayToSoundsArray(this.audio);
        this.loadIamgesToCache(this.idle_animation);
        this.loadIamgesToCache(this.run_animation);
        this.loadIamgesToCache(this.jump_animation);
        this.loadIamgesToCache(this.dead_animation);
        this.loadIamgesToCache(this.hurt_animation);
        this.audio['jump_sound'].volume -= 0.3;
        this.animate();
        this.applyGravity();
    }

    /**
     * this function checks if character has collected bottles,
     * sets a timer for the last throw,
     * subtracts 1 collected bottle,
     * creates a new throwableobject wich will be thrown immediatly,
     * updates the salsabar
     * 
     */
    throw() {
        if (this.world.collected_bottles > 0) {
            this.setThrowtimer();
            this.world.collected_bottles--;
            let bottle = new ThrowableObject(this.x, this.y, this.world);
            this.world.throwableBottles.push(bottle);
            this.world.salsabar.setPercentage(this.world.salsabar.percentage -= 20)
        }
    }

    /**
     * this function sets the throwtimer after 1 sec to true,
     * if throwtimer is false the throwableobject isnt able to throw itsself
     * 
     */
    setThrowtimer() {
        this.throwTimer = false;
        setTimeout(() => {
            this.throwTimer = true;
        }, 1000);
    }

    /**
     *this function handles the update of charcters specific animations and movements if specific conditions are met,
     *  it also sets the worlds camera_x wich is the opposite of the characters x + 100 <-- this is the space
     *  between the left side of canvas and the character,
     * and pushs the intervalls into World intervall array wich is used to stop the game.
     * 
     */
    animate() {
        let intervall = setInterval(() => {

            if (this.world.keyboard.KEY_D && this.isOnGround() && !this.isDead() || this.world.keyboard.KEY_A && this.isOnGround() && !this.isDead()) { // run animation
                this.playAnimation(this.run_animation);
                this.audio['run_sound'].play();
            } else {
                this.audio['run_sound'].pause();
                if (!this.isDead()) {
                    this.playAnimation(this.idle_animation); //idle Animation
                }
            }

            if (this.isDead()) { //dead animation
                this.playAnimationWithEnd(this.dead_animation);

            } else if (this.wasDamaged()) { //hurt animation
                this.playHurtSound();
                this.playAnimation(this.hurt_animation);

            } else if (this.isAboveGround()) { //jump animation
                this.playAnimation(this.jump_animation);
            }
        }, 1000 / 11);

        let intervall2 = setInterval(() => {

            if (this.world.keyboard.KEY_D == true && this.x < this.world.level.levelEnd && !this.isDead()) { //move Right
                this.moveRight();
            }

            if (this.world.keyboard.KEY_A == true && this.x > this.world.level.levelStart && !this.isDead()) { // move Left
                this.isOtherDirection = true
                this.moveLeft();
            }

            if (this.world.keyboard.KEY_SPACE == true && this.isOnGround() && !this.isDead()) { // jump
                this.audio['jump_sound'].play();
                this.jump();
            }

            if (this.world.keyboard.KEY_DOT == true && this.throwTimer && !this.isDead()) { // jump
                this.throw();
            }

            this.world.camera_x = (-this.x) + 100;

        }, 1000 / 60);
        intervallIds.push(intervall, intervall2);
    }
}