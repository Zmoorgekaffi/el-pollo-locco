let level_1;

/**
 * this function will generate the level,
 * and displays the mute and fullscreen button
 * 
 */
function initLevel() {
    level_1 = new Level([
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719*2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),

        new BackgroundObject('img/5_background/layers/air.png', 719*3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),

        new Cloud(80),
        new Cloud(80 + 720),
        new Cloud(80 + (720 * 2)),
        new Cloud(80 + (720 * 3)),
        new Cloud(80 + (720 * 4)),
], [ // enemies
    new Chicken(450),
    new Chicken(450),
    new Chicken(450),
    new Chicken(450*2),
    new Chicken(450*2),
    new Chicken(450*2),
    new Chicken(450*3),
    new Chicken(450*3),
    new Chicken(450*3),
    new Chicken(450*4),
    new Chicken(450*4),
    new Chicken(450*4),
    new Chicken(450*5),
    new Chicken(450*5),
    new Chicken(450*5),
    new Chicken(450*6),
    new Chicken(450*6),
    new Chicken(450*6),
    new Endboss(2176 + 300)
], [ 
    new Coin(450, 330),
    new Coin(450230),
    new Coin(450*3, 230),
    new Coin(450*4, 280),
    new Coin(450*4 - 150, 320)
], [ 
    new CollecableBottle(300, 370),
    new CollecableBottle(300*2, 370),
    new CollecableBottle(300*3 -150, 230),
    new CollecableBottle(300*4 -150, 280),
    new CollecableBottle(2200, 300),

], 0, 
 719*4 - 700); 
    document.getElementById('fullscreen-btn').classList.remove('d-none');
    document.getElementById('mute-btn').classList.remove('d-none');
}
