class ColectableObject extends MoveableObject{
    coinCounter = 1;
    width = 100;
    height = 100;

    coin_animation = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    collisionBox = {
        right: 25,  
        left: 25,
        top: 25,
        bottom: 25
    };

    hitbox = {
        right: 25,  
        left: 25,
        top: 25,
        bottom: 25
    };

    constructor(x, y) {
        super().loadImage(this.coin_animation[0]);
        this.loadIamgesToCache(this.coin_animation);
        this.x = x;
        this.y = y;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.coin_animation);
            if(this.coinCounter == 1) {
                this.y += 5;
                this.coinCounter++;
            }else {
                this.y -= 5;
                this.coinCounter--;
            }
        }, 1000 / 3);
    }
}