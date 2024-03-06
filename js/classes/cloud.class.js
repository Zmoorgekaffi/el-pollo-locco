class Cloud extends MoveableObject {
    x;
    y = 50;
    width = 600;
    height = 200;
    speed = 0.2;

    /**
     * this constructor loads the img of the cloud,
     * sets the number of the starting point x-axis,
     * calls the function update aka. animate
     * 
     * @param {number} x starting point of x-axis 
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x;
        this.animate();
    }

    /**
     * this function updates the animations and movements of the cloud if conditions are met
     * 
     */
    animate() {
        let intervall = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        intervallIds.push(intervall);
    }

    moveLeft() {
        if(Math.abs(this.x - (-720)) < 1) {
            this.x = 720 * 4;
        }
        this.x -= this.speed;
    }
}