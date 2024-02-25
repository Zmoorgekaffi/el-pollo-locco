class CollecableBottle extends ColectableObject {
    width = 60;
    height = 60;

    sound_bottle = new Audio('audio/misc/bottle.mp3');

    bottle_animation = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    ];

    collisionBox = {
        right: 17,  
        left: 25,
        top: 8,
        bottom: 5
    };

    hitbox = {
        right: 25,  
        left: 25,
        top: 25,
        bottom: 25
    };

    constructor(x, y) {
        super().loadImage(this.bottle_animation[0]);
        this.loadIamgesToCache(this.bottle_animation);
        this.x = x;
        this.y = y;
        this.animate(this.bottle_animation);
    }
}