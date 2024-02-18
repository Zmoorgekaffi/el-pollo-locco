class World {
    canvas;
    ctx;
    keyboard;
    camera_x;
    character = new Character();
    lifebar = new Lifebar();
    coinbar = new Coinbar();
    salsabar = new Salsabar();
    bottle = new ThrowableObject(this);

    level = level_1;
    backgroundObjects = this.level.backgroundObjects;
    enemies = this.level.enemies;

    constructor(canvas, keyboard) {
        this.setCanvas(canvas);
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.checkCollisions();
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        canvas.width = 720
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
    }

    checkCollisions() {
        setInterval(() => {
            this.level.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy)) {
                    this.character.wasHurtBy(enemy);
                    this.lifebar.setPercentage(this.character.life);
                }
                
            });
        }, 1000/10);
    }

    setWorld() {
        this.character.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
    }

    draw() {
        this.clearCanvas();

        //camera
        this.ctx.translate(this.camera_x, 0);

        //add objects to map
        this.addArrayToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addArrayToMap(this.enemies);

        //camera
        this.ctx.translate(-this.camera_x, 0);

        //add fixed objects to map
        this.addToMap(this.lifebar);
        this.addToMap(this.coinbar);
        this.addToMap(this.salsabar);
        this.addToMap(this.bottle);

        this.reDraw();
    }

    addToMap(obj) {
        if (obj.isOtherDirection) {
            this.mirrorCtx(obj);
        }

        obj.draw(this.ctx);

        //draw collsionboxes
        obj.drawCollisionBoxes(this.ctx);

        if (obj.isOtherDirection) {
            this.restoreMirroredCtx(obj);
        }
    }

    addArrayToMap(array) {
        array.forEach(item => {
            this.addToMap(item);
        });
    }

    clearCanvas() {
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