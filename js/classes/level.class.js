class Level {
    backgroundObjects;
    enemies;
    coins;
    levelStart;
    levelEnd;

    constructor(backgroundObjects, enemies, coins, levelStart, levelEnd) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.levelStart = levelStart;
        this.levelEnd = levelEnd;
        this.coins = coins;
    }
}