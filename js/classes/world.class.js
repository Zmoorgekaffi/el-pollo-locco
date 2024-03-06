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

    /**
     * this constructor calls the setCanvas() function to set canvas height and width,
     * connects the keyboard variable with the keyboard object,
     * connects the "world" variable of diffrent objects with the object World,
     * calls the function draw,
     * calls the function run
     * 
     * @param {canvas} canvas 
     * @param {object} keyboard the keyboard object
     */
    constructor(canvas, keyboard) {
        this.setCanvas(canvas);
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();
        this.run();
    }

    /**
     * this function connects the canvas variable with the canvas object,
     * sets the with and height of the canvas,
     * generates a contect wich is saved in the variable ctx
     * 
     * @param {object} canvas 
     */
    setCanvas(canvas) {
        this.canvas = canvas;
        canvas.width = 720
        canvas.height = 480;
        this.ctx = canvas.getContext('2d');
    }

    /**
     * this function updates the events in the world like:
     * is a enemy colliding into the character?,
     * jumped a character an enemy to death?,
     * is a bottle colliding with an enemy?,
     * is an character colliding with a coin?,
     * is a character colliding with a bottle?,
     * is a character near the boss?,
     * is the game over?
     * 
     */
    run() {
        let intervall = setInterval(() => {
            this.enemies.forEach(enemy => {
                this.runCollidingEnemyIntoCharacter(enemy);
            });
            this.enemies.forEach(enemy => {
                this.runCollidingEnemysToDeath(enemy);
            });
            this.throwableBottles.forEach(bottle => {
                this.runThrowableBottles(bottle);
            });
            this.coins.forEach(coin => {
                this.runCollectingCoins(coin);
            });
            this.collectableBottles.forEach(bottle => {
                this.runCollectingBottles(bottle);
            });
            this.checkIfBossisStartMoving();
            this.checkIfGameIsOver();
        }, 1000 / 60);
        intervallIds.push(intervall);
    }

    /**
     * this function is used to check if a character collides with an enemy and refreshes the percentage of the lifebar
     * 
     * @param {object} enemy 
     */
    runCollidingEnemyIntoCharacter(enemy) {
        if (this.character.isColliding(enemy) && !enemy.isDead()) {
            this.character.wasHurtBy(enemy);
            this.lifebar.setPercentage(this.character.life);
        };
    }

    /**
     * this function is used to check if a character bottom collides with an enemy top and if this is true the enemy life is set to 0,
     * a deathsound of the enemy will play and after 0.5 seconds the enemy will be spliced out of enemies array
     * 
     * @param {object} enemy 
     */
    runCollidingEnemysToDeath(enemy) {
        if (this.character.collidingTop(enemy) && this.character.speedY == -17) {
            enemy.life = 0;
            enemy.audio['dead_sound'].play();
            setTimeout(() => {
                this.enemies.splice(this.enemies.indexOf(enemy), 1);
            }, 500);
        };
    }
    
    /**
     * this function checks if a throwAbleObject "bottle" is colliding with the endboss,
     * if this is true the endboss will be hurt and gets damage
     * @param {object} bottle throwableObject
     */
    runThrowableBottles(bottle) {
        if (bottle.isColliding(this.enemies[(this.enemies.length - 1)])) {
            this.enemies[(this.enemies.length - 1)].wasHurtBy(bottle);
            this.enemies[(this.enemies.length - 1)].life -= 0.65;
        };
    }

    /**
     * this function checks if a character collides with a coin,
     * if this is true the x coordinates of the coin is set to undefined,
     * the coin sound will be played,
     * the persentage of the coinbar will be increase by 20,
     * the variable collected_coins will be increased by 1
     * 
     * @param {object} coin 
     */
    runCollectingCoins(coin) {
        if (this.character.isColliding(coin)) {
            coin.x = undefined;
            coin.sound_coin.play();
            this.coinbar.setPercentage(this.coinbar.percentage += 20);
            this.collected_coins++;
        };
    }

    /**
     * if this is true the x coordinates of the bottle is set to undefined,
     * the "collect bottle" sound will be played,
     * the persentage of the salsabar will be increase by 20,
     * the variable collected_bottle will be increased by 1
     * 
     * @param {object} bottle collectableBottle
     */
    runCollectingBottles(bottle) {
        if (this.character.isColliding(bottle)) {
            bottle.x = undefined;
            bottle.sound_bottle.play();
            this.salsabar.setPercentage(this.salsabar.percentage += 20);
            this.collected_bottles++;
        };
    }

    /**
     * checks if the game is over.
     * the game is over if the player or the endboss has <= 0 life,
     * if one of this will happen a diffrent variable will be true and after 1 second the function stopGame() will be called
     * 
     */
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

    /**
     * this function checks if the characters x is > 2100,
     * if this is true the endboss will start moving
     * 
     */
    checkIfBossisStartMoving() {
        if (this.character.x > 2100) {
            this.enemies[(this.enemies.length - 1)].isMoving = true;
        }
    }

    /**
     * this function connects the world variable of diffrent objects with this (World)
     * 
     */
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

    /**
     * this function in the first step clears the whole canvas ctx,
     * after clear it will be:
     * translate the ctx x-axis around the camera_x <-- wich is set in the characters class,
     * draws all objects into the canvas,
     * translates the ctx back,
     * draws all fixed elements,
     * and calls the function reDraw()
     * 
     */
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

    /**
     * this function will add a fixed endscreen if a condition is met
     * 
     */
    addOverlayScreenToMap() {
        if (this.end_screen_boolian_loose) {
            this.addToMap(this.end_screen_loose);
            document.getElementById('restart-btn_frame').classList.remove('d-none');
        } else if (this.end_screen_boolian_win) {
            this.addToMap(this.end_screen_win);
            document.getElementById('restart-btn_frame').classList.remove('d-none');
        }
    }

    /**
     * this function draws objects into the canvas ctx,
     * if the obj variable isOtherDirection = true the mirrorCtx function will be called,
     * then the image of the obj will be drawn,
     *  if the obj variable isOtherDirection = true the restoreMirroredCtx function will be called
     * 
     * @param {object} obj 
     */
    addToMap(obj) {
        if (obj.isOtherDirection) {
            this.mirrorCtx(obj);
        }

        obj.draw(this.ctx);

        if (obj.isOtherDirection) {
            this.restoreMirroredCtx(obj);
        }
    }

    /**
     * this function will be add an object array to the canvas ctx
     * 
     * @param {array} array array with objects like enemies array or clouds
     */
    addArrayToMap(array) {
        array.forEach(item => {
            this.addToMap(item);
        });
    }

    /**
     * this function clears the canvas ctx
     * 
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * this function requests an anmition frame wich will smoothly call the draw function over and over
     * 
     */
    reDraw() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * this function will save the ctx,
     * after it will translate the ctx by the width of the object,
     * and then it will mirror the ctx,
     * also mirrors the x coordinates of the object because the x-axis fot he canvas is mirrored
     * 
     * @param {object} object 
     */
    mirrorCtx(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    }

    /**
     * this function mirrors the objects x again,
     * and restores the ctx
     * 
     * @param {object} object 
     */
    restoreMirroredCtx(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    }

    /**
     * this function irritated through the IntervallIds and clears them,
     * so the game will be stopped
     * 
     */
    stopGame() {
        intervallIds.forEach(ID => {
            clearInterval(ID);
        });
    }
}