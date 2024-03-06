class Level {
    backgroundObjects;
    enemies;
    coins;
    bottles;
    levelStart;
    levelEnd;

    /**
     * this constructor is used to generate a level wich other classes can use the data to work with them
     * 
     * @param {array} backgroundObjects an array wich includes the objects to add in the world
     * @param {array} enemies an array wich includes the objects to add in the world
     * @param {array} coins an array wich includes the objects to add in the world
     * @param {array} bottles an array wich includes the objects to add in the world
     * @param {number} levelStart defines the starting x-axis point of the level
     * @param {number} levelEnd defines the ending x-axis point of the level
     */
    constructor(backgroundObjects, enemies, coins, bottles, levelStart, levelEnd) {
        this.backgroundObjects = backgroundObjects;
        this.enemies = enemies;
        this.levelStart = levelStart;
        this.levelEnd = levelEnd;
        this.coins = coins;
        this.bottles = bottles;
    }
}