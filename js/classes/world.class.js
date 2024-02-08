class World {
    canvas;
    ctx;
    keyboard;
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
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];

    constructor(canvas, keyboard) {
        this.giveCanvasWidthAndHeight(canvas);
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
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