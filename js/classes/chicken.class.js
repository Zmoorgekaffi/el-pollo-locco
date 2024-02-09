class Chicken extends MoveableObject {
    x = 450 + Math.random() * 200;
    y = 355;
    width = 60;
    height = 70;
    speed = 0.5 + Math.random() * 0.5;

    run_animation = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.animate();
        this.moveLeft()
    }

    animate() {
        this.loadIamgesToCache(this.run_animation);
        setInterval(() => {
            this.playAnimation(this.run_animation);
        }, 1000 / 11);

        setInterval(() => {
            if (this.x > level_1.levelStart) {
                this.moveLeft();
            }

        }, 1000 / 60);
    }


}