class ColectableObject extends MoveableObject{

    width = 50;
    height = 50;

    coin_animation = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super().loadImage(this.coin_animation[0]);
        this.x = x;
        this.y = y;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.coin_animation);
        }, 1000 / 10);
    }
}