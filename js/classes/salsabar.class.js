class Salsabar extends Statusbar {
    x = 25;
    y = 70;

    IMAGES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];

    
    constructor() {
        super();
        this.loadIamgesToCache(this.IMAGES);
        this.setPercentage(0);
    }


    /**
     * this function returns the number of a to loaded img to represent how much bottles the player has collected,
     * based on a percentage wich will increases by 20 if the player has collect a bottle
     * 
     * @returns the number of the to loaded img for the salsbar to represent the amount of collected bottle
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