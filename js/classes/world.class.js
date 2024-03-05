class World {
    canvas;
    ctx;
    keyboard;
    camera_x;
    end_screen_loose = new OverlayScreen('img/9_intro_outro_screens/game_over/oh no you lost!.png', 0, 0);
    end_screen_boolian_loose = false;
    end_screen_win = new OverlayScreen('img/9_intro_outro_screens/game_over/game over.png', 0, 0);
    end_screen_boolian_win = false;

    character = new Character();
    collected_coins = 0;
    collected_bottles = 0;
    throwableBottles = [];

    lifebar = new Lifebar();
    coinbar = new Coinbar();
    salsabar = new Salsabar();

    level = level_1;
    backgroundObjects = this.level.backgroundObjects;
    enemies = this.level.enemies;
    collectableBottles = this.level.bottles;
    coins = this.level.coins;

    constructor(canvas, keyboard) {
        this.setCanvas(canvas);
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    setCanvas(canvas) {
        this.canvas = canvas;
        canvas.width = 720
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
    }

    run() {
        let intervall = setInterval(() => {
            this.enemies.forEach(enemy => {
                if (this.character.isColliding(enemy) && !enemy.isDead()) {
                    this.character.wasHurtBy(enemy);
                    this.lifebar.setPercentage(this.character.life);
                };
            });
            this.enemies.forEach(enemy => {
                if (this.character.collidingTop(enemy) && this.character.speedY == -17) {
                    enemy.life = 0;
                    enemy.sound_dead.play();
                    setTimeout(() => {
                        this.enemies.splice(this.enemies.indexOf(enemy), 1);
                    }, 500);
                };
            });
            this.throwableBottles.forEach(bottle => {
                if (bottle.isColliding(this.enemies[(this.enemies.length - 1)])) {
                    this.enemies[(this.enemies.length - 1)].wasHurtBy(bottle);
                    this.enemies[(this.enemies.length - 1)].life -= 0.65;
                };
            });
            this.coins.forEach(coin => {
                if (this.character.isColliding(coin)) {
                    coin.x = undefined;
                    coin.sound_coin.play();
                    this.coinbar.setPercentage(this.coinbar.percentage += 20);
                    this.collected_coins++;
                };
            });
            this.collectableBottles.forEach(bottle => {
                if (this.character.isColliding(bottle)) {
                    bottle.x = undefined;
                    bottle.sound_bottle.play();
                    this.salsabar.setPercentage(this.salsabar.percentage += 20);
                    this.collected_bottles++;
                };
            });
            this.checkIfBossisStartMoving();
            this.checkIfGameIsOver();
        }, 1000 / 60);
        intervallIds.push(intervall);
    }

    checkIfGameIsOver() {
        if (this.enemies[(this.enemies.length - 1)].life <= 0) {
            this.end_screen_boolian_win = true;
            setTimeout(() => {
                this.stopGame();
            }, 1000);
        } else if (this.character.life <= 0) {
            this.end_screen_boolian_loose = true;
            setTimeout(() => {
                this.stopGame();
            }, 1000);
        }
    }

    checkIfBossisStartMoving() {
        if (this.character.x > 2100) {
            this.enemies[(this.enemies.length - 1)].isMoving = true;
        }
    }

    setWorld() {
        this.character.world = this;
        this.enemies.forEach(enemy => {
            enemy.world = this;
        });
        this.throwableBottles.forEach(bottle => {
            bottle.world = this;
        });
        this.keyboard.world = this;
    }

    draw() {
        this.clearCanvas();

        //camera
        this.ctx.translate(this.camera_x, 0);

        //add objects to map
        this.addArrayToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addArrayToMap(this.enemies);
        this.addArrayToMap(this.coins);
        this.addArrayToMap(this.collectableBottles);
        this.addArrayToMap(this.throwableBottles);

        //camera
        this.ctx.translate(-this.camera_x, 0);

        //add fixed objects to map
        this.addToMap(this.lifebar);
        this.addToMap(this.coinbar);
        this.addToMap(this.salsabar);
        this.addOverlayScreenToMap();


        this.reDraw();
    }

    addOverlayScreenToMap() {
        if (this.end_screen_boolian_loose) {
            this.addToMap(this.end_screen_loose);
        } else if (this.end_screen_boolian_win) {
            this.addToMap(this.end_screen_win)
        }
    }

    addToMap(obj) {
        if (obj.isOtherDirection) {
            this.mirrorCtx(obj);
        }

        obj.draw(this.ctx);

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

    stopGame() {
        intervallIds.forEach(ID => {
            clearInterval(ID);
        });
    }
}