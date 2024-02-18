class ThrowableObject extends MoveableObject {
    
    speedY = 10;
    speed = 10;
    width = 60;
    height = 50;
    img = new Image();

    collisionBox = {
        right: 20,
        left: 20,
        top: 5,
        bottom: 5
    };

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
    
    
    constructor(world) {
        super();
        this.world = world;
        this.x = this.world.character.x;
        this.y = this.world.character.y;
        this.loadImage(this.rotation_animation[0]);
        this.applyGravity();
    }
    
}