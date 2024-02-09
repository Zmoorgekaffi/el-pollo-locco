class Level {
    backgroundObjects;
    enemies;
    levelStart;
    levelEnd;

    constructor(backgroundObjects, enemies, levelStart, levelEnd) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.levelStart = levelStart;
        this.levelEnd = levelEnd;
    }
}