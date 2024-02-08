class Character extends MoveableObject {
    x = 100;
    y = 230;
    width = 120;
    height = 200;
    world;
    speed = 2.5;
    isOtherDirection = false;

    run_animation = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.animate();
    }

    animate() {

        setInterval(() => {

            if (this.world.keyboard.KEY_D || this.world.keyboard.KEY_A) {
                this.playAnimation(this.run_animation);
            }

        }, 1000 / 11);

        setInterval(() => {

            if(this.world.keyboard.KEY_D == true) {
                this.isOtherDirection = false;
                this.x += this.speed;
            }

            if(this.world.keyboard.KEY_A == true) {
                this.isOtherDirection = true
                this.x -= this.speed;
            }

            this.world.camera_x = (-this.x) + 100;

        }, 1000 / 60);
    }

    jump() {

    }
}