class ThrowableObject extends MoveableObject {
    
    speedY = 10;
    speed = 10;

    rotation_animation = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    splash_animation = [
        'img/1_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/2_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/3_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/4_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/5_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
    ];
    
    
    constructor() {
        this.x = this.world.character.x;
        this.applyGravity();
    }
    
    
}