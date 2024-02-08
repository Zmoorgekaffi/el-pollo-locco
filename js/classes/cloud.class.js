class Cloud extends MoveableObject {
    x = 80;
    y = 50;
    width = 600;
    height = 200;
    speed = 0.1;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.animate();
    }

    animate() {
        this.moveLeft();
    }
}