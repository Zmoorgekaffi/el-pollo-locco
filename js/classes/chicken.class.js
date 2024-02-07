class Chicken extends MoveableObject {
    x = 450 + Math.random() * 200;
    y = 330;
    width = 60;
    height = 70;

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    }
}