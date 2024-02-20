class Endboss extends MoveableObject{
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
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    constructor() {
        super().loadImage(this.run_animation[0]);
        this.loadIamgesToCache(this.run_animation);
        this.animate();  
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.run_animation);
        }, 1000/5);
    }
}