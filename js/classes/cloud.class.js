class Cloud extends MoveableObject {
    x;
    y = 50;
    width = 600;
    height = 200;
    speed = 0.2;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    moveLeft() {
        if(Math.abs(this.x - (-720)) < 1) {
            this.x = 720 * 4;
        }
        this.x -= this.speed;
    }
}