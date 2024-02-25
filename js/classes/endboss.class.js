class Endboss extends MoveableObject {
    x = 720;
    y = 230;
    width = 150;
    height = 200;
    speed = 5;

    collisionBox = {
        right: 20,
        left: 20,
        top: 40,
        bottom: 0
    };

    run_animation = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    dead_animation = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'

    ];

    constructor() {
        super().loadImage(this.run_animation[0]);
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
        }, 1000 / 5);
    }
}