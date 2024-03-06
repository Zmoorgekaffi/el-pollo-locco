class ColectableObject extends MoveableObject{
    hoverCounter = 1; // controls the y coordinate to get an hover effekt
    
    constructor() {
        super();
    }

    /**
     * this function updates the animation of an colectable-object,
     * it updates also the y-axis to generate a hove effect,
     * pushes the intervall into Wolrd intervall array to be able to stop the game
     * 
     * @param {array} array the array with to animated imgs 
     */
    animate(array) {
        let intervall = setInterval(() => {
            this.playAnimation(array);
            if(this.hoverCounter == 1) {
                this.y += 5;
                this.hoverCounter++;
            }else {
                this.y -= 5;
                this.hoverCounter--;
            }
        }, 1000 / 3);
        intervallIds.push(intervall);
    }
}