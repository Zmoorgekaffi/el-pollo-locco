class Lifebar extends Statusbar {
    x = 25;
    y = -5;

    IMAGES = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png',
    ];

    /**
     * this constructor loads all imgs to objects cache to b e able to update the lifebar,
     * sets the bar percentage to 100.
     * 
     */
    constructor() {
        super();
        this.loadIamgesToCache(this.IMAGES);
        this.setPercentage(100);
    }
}