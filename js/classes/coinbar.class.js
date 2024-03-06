class Coinbar extends Statusbar {
    x = 25;
    y = 30;

    IMAGES = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * this constructor loads all imgs to objects cache,
     * sets the percentage of the coinbar to 0
     * 
     */
    constructor() {
        super();
        this.loadIamgesToCache(this.IMAGES);
        this.setPercentage(0);
    }

    /**
     * this function returns the number of a to loaded img to represent how much coins the player has collected,
     * based on a percentage wich will increases by 20 if the player has collect a coin
     * 
     * @returns the number of the to loaded img for the coinbar to represent the amount of collected coins
     */
    getImagesIndex() {
        if(this.percentage == 100) {
            return 5;
        } else if(this.percentage == 80) {
            return 4;
        } else if(this.percentage == 60) {
            return 3;
        } else if(this.percentage == 40) {
            return 2;
        } else if(this.percentage == 20) {
            return 1;
        } else {
            return 0;
        }
    }
}