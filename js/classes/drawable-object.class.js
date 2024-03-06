class DrawableObject {
    x;
    y;
    width;
    height;
    img;
    imgCache = {};
    currentImage = 0;

    /**
     * this function is mainly be used to have a first loaded img for animated objects.
     * 
     * @param {string} path path of the to loaded img 
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * this function will create new img objects with the given sources throug the array given as argument,
     * the imgs will be push into a JSON array namend imgCache,
     * the name of the img object into this JSON array is the source of the img itself
     * 
     * @param {array} array array of to loaded imgs wich are used to animate the specific object
     */
    loadIamgesToCache(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    /**
     * this function will draw the object into canvas.ctx
     * 
     * @param {ctx} ctx the context of the canvas 
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
    }

    /**
     * this function will draw a border arround objects wich include classes of:
     * charachter, chicken, endboss, throwableObject, collectableObject
     * 
     * @param {ctx} ctx the context of the canvas 
     */
    drawCollisionBoxes(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof ColectableObject) {

            //frameborder
            ctx.strokeStyle = "rgba(0,0,0,0.2)";
            ctx.beginPath();
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            //collisionbox
            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.rect(this.x + this.collisionBox.left, this.y + this.collisionBox.top, this.width - this.collisionBox.right * 2, (this.height - this.collisionBox.bottom) - this.collisionBox.top);
            ctx.stroke();
        }
    }
}