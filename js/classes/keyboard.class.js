class Keyboard {
    KEY_W = false;
    KEY_A = false;
    KEY_S = false;
    KEY_D = false;
    KEY_SPACE = false;
    KEY_DOT = false;

    world;

    constructor() {
        document.addEventListener('keydown', (e) => {
            if (e.key == 'w') {
                this.KEY_W = true;
            }

            if (e.key == 'a') {
                this.KEY_A = true;

                this.KEY_D = false;
            }

            if (e.key == 's') {
                this.KEY_S = true;
            }

            if (e.key == 'd') {
                this.KEY_D = true;

                this.KEY_A = false;
            }

            if (e.key == ' ') {
                this.KEY_SPACE = true;
            }

            if (e.key == '.') {
                this.KEY_DOT = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.key == 'w') {
                this.KEY_W = false;
            }

            if (e.key == 'a') {
                this.KEY_A = false;
            }

            if (e.key == 's') {
                this.KEY_S = false;
            }

            if (e.key == 'd') {
                this.KEY_D = false;
            }

            if (e.key == ' ') {
                this.KEY_SPACE = false;
            }

            if (e.key == '.') {
                this.KEY_DOT = false;
            }
        })

        document.getElementById('left').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_A = true;
            this.KEY_D = false;
        });

        document.getElementById('left').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_A = false;
        })

        document.getElementById('right').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_D = true;
            this.KEY_A = false;
        });

        document.getElementById('right').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_D = false;
        })

        document.getElementById('jump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_SPACE = true;
        });

        document.getElementById('jump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_SPACE = false;
        })

        document.getElementById('throw').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.KEY_DOT = true;
        });

        document.getElementById('throw').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.KEY_DOT = false;
        })
    }
}