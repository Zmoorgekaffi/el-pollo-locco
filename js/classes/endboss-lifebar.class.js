class EndbossLifebar extends Statusbar {
    x = 400;
    y = 15;

    IMAGES = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
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
