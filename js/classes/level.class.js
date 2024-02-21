class Level {
    backgroundObjects;
    enemies;
    coins;
    bottles;
    levelStart;
    levelEnd;

    constructor(backgroundObjects, enemies, coins, bottles, levelStart, levelEnd) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.levelStart = levelStart;
        this.levelEnd = levelEnd;
        this.coins = coins;
        this.bottles = bottles;
    }
}