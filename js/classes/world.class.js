class World {
    canvas;
    ctx;
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud(),
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png'),
    ];

    constructor(canvas) {
        this.giveCanvasWidthAndHeight(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.draw();
    }


    draw() {
        this.resetCanvas();

        this.addArrayToMap(this.backgroundObjects);

        this.addToMap(this.character);

        this.addArrayToMap(this.enemies);

        this.addArrayToMap(this.clouds);

        this.reDraw();
    }

    
    giveCanvasWidthAndHeight(canvas) {
        canvas.width = 720
        canvas.height = 480;
    }

    addToMap(obj) {
        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
    }

    addArrayToMap(array) {
        array.forEach(item => {
            this.addToMap(item);
        });
    }

    resetCanvas() {
        this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);
    }

    reDraw() {
        let self = this;
        requestAnimationFrame(function() {
            self.draw();
        });
    }
}