class ColectableObject extends MoveableObject{
    hoverCounter = 1; // controls the y coordinate to get an hover effekt
    

    constructor() {
        super();
    }

    animate(array) {
        setInterval(() => {
            this.playAnimation(array);
            if(this.hoverCounter == 1) {
                this.y += 5;
                this.hoverCounter++;
            }else {
                this.y -= 5;
                this.hoverCounter--;
            }
        }, 1000 / 3);
    }
}