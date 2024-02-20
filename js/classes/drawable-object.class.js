class DrawableObject {
    x;
    y;
    width;
    height;
    img;
    imgCache = {};
    currentImage = 0;
    isVisible = true;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadIamgesToCache(array) {
        array.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imgCache[path] = img;
        });
    }

    draw(ctx) {
        if (this.isVisible) {
           ctx.drawImage(this.img, this.x, this.y, this.width, this.height); 
        }
    }

    drawCollisionBoxes(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject) {

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