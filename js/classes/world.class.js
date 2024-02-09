class World {
    canvas;
    ctx;
    keyboard;
    camera_x;
    character = new Character();
    level = level_1;
    backgroundObjects = this.level.backgroundObjects;
    enemies = this.level.enemies;

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
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    draw() {
        this.resetCanvas();

        //camera
        this.ctx.translate(this.camera_x, 0);

        this.addArrayToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addArrayToMap(this.enemies);

        //camera
        this.ctx.translate(-this.camera_x, 0);

        this.reDraw();
    }


    giveCanvasWidthAndHeight(canvas) {
        canvas.width = 720
        canvas.height = 480;
    }

    addToMap(obj) {
        if (obj.isOtherDirection) {
            this.mirrorCtx(obj);
        }

        this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);

        if (obj.isOtherDirection) {
            this.restoreMirroredCtx(obj);
        }
    }

    addArrayToMap(array) {
        array.forEach(item => {
            this.addToMap(item);
        });
    }

    resetCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    reDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    mirrorCtx(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }


    restoreMirroredCtx(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

}