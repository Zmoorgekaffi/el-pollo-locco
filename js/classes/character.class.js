class Character extends MoveableObject {
    x = 100;
    y = 80; //230
    width = 120;
    height = 200;
    world;
    speed = 4;
    isOtherDirection = false;

    run_sound = new Audio('audio/character/run/character_run_cut.mp3');
    run_animation = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
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
        'img/2_character_pepe/3_jump/J-39.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.animate();
        this.applyGravity();
    }

    animate() {
        setInterval(() => {
            if (this.isAboveGround()) { //jump animation
                this.playAnimation(this.jump_animation);
            }

            if (this.world.keyboard.KEY_D && this.isOnGround() || this.world.keyboard.KEY_A && this.isOnGround()) { // run animation
                this.playAnimation(this.run_animation);
                this.run_sound.play();
            } else {
                this.run_sound.pause();
            }

        }, 1000 / 11);

        setInterval(() => {

            if (this.world.keyboard.KEY_D == true && this.x < this.world.level.levelEnd) { //move Right
                this.moveRight();
            }

            if (this.world.keyboard.KEY_A == true && this.x > this.world.level.levelStart) { // move Left
                this.isOtherDirection = true
                this.x -= this.speed;
            }

            if (this.world.keyboard.KEY_SPACE == true) {
                this.jump();
            }

            this.world.camera_x = (-this.x) + 100;

        }, 1000 / 60);
    }
}