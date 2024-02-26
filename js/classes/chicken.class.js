class Chicken extends MoveableObject {
    y = 355;
    width = 60;
    height = 70;
    speed = 0.5 + Math.random() * 0.5;

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

    run_animation = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    dead_animation = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];


    constructor(x) {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = x + Math.random() * 200;
        this.loadIamgesToCache(this.run_animation);
        this.loadIamgesToCache(this.dead_animation);
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!this.isDead()) {
                this.playAnimation(this.run_animation);
            } else if (this.isDead()) { //dead animation
                this.playAnimationWithEnd(this.dead_animation);
            }
        }, 1000 / 11);

        setInterval(() => {
            if (this.x > level_1.levelStart && !this.isDead()) {
                this.moveLeft();
            }

        }, 1000 / 60);
    }


}