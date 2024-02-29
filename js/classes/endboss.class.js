class Endboss extends MoveableObject {
    y = 152;
    width = 200;
    height = 300;
    speed = 1.5;
    damage = 100;
    isMoving = false;

    collisionBox = {
        right: 20,
        left: 20,
        top: 40,
        bottom: 0
    };

    hitbox = {
        right: 20,
        left: 20,
        top: 40,
        bottom: 0
    };

    idle_animation = [
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

    run_animation = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    hurt_animation = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    constructor(x) {
        super().loadImage(this.idle_animation[0]);
        this.x = x;
        this.loadIamgesToCache(this.idle_animation);
        this.loadIamgesToCache(this.dead_animation);
        this.loadIamgesToCache(this.run_animation);
        this.loadIamgesToCache(this.hurt_animation);
        this.animate();
    }

    animate() {
        let intervall = setInterval(() => {
            if (!this.isDead() && this.wasDamaged()) { //dead animation
                this.playAnimation(this.hurt_animation);
            } else
            if (!this.isDead() && !this.isMoving) { //dile animation
                this.playAnimation(this.idle_animation);
            } else if(this.x > level_1.levelStart && !this.isDead()) { //run animation
                this.playAnimation(this.run_animation);
            } else if (this.isDead()) { //dead animation
                this.playAnimationWithEnd(this.dead_animation);
            }
        }, 1000 / 5);

        let intervall2 = setInterval(() => {
            if (this.x > level_1.levelStart && !this.isDead() && this.isMoving ) {
                this.moveLeft();
            }
            
            if (this.x <= 2100) {
                this.speed += 0.015;
            }
        }, 1000 / 60);
        intervallIds.push(intervall, intervall2);
    }

    wasHurtBy() {
        if (this.life <= 0) {
            this.life = 0;
            this.isDead();
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}