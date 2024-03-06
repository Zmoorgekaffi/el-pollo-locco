class Coin extends ColectableObject {
    width = 100;
    height = 100;

    sound_coin = new Audio('audio/misc/coin.mp3');

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

    /**
     * this constructor loads the first img of the coin,
     * pushes the audio into game.js sounds array,
     * loads the animation into objects cache,
     * calls the update function aka. animate,
     * sets the x-axis starting point,
     * sets the y-axis starting point 
     * 
     * @param {number} x starting point of x-axis 
     * @param {number} y starting point of y-axis
     */
    constructor(x,y) {
        super().loadImage(this.coin_animation[0]);
        sounds.push(this.sound_coin);
        this.loadIamgesToCache(this.coin_animation);
        this.animate(this.coin_animation);
        this.x = x;
        this.y = y;
    }
}