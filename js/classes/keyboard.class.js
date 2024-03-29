class Keyboard {
    KEY_W = false;
    KEY_A = false;
    KEY_S = false;
    KEY_D = false;
    KEY_SPACE = false;
    KEY_DOT = false;

    constructor() {
        document.addEventListener('keydown', (e) => {
            if(e.key == 'w') {
                this.KEY_W = true;
            }

            if(e.key == 'a') {
                this.KEY_A = true;

                this.KEY_D = false;
            }

            if(e.key == 's') {
                this.KEY_S = true;
            }

            if(e.key == 'd') {
                this.KEY_D = true;

                this.KEY_A = false;
            }

            if(e.key == ' ') {
                this.KEY_SPACE = true;
            }

            if(e.key == '.') {
                this.KEY_DOT = true;
            }
        });

        document.addEventListener('keyup', (e) => {
            if(e.key == 'w') {
                this.KEY_W = false;
            }

            if(e.key == 'a') {
                this.KEY_A = false;
            }

            if(e.key == 's') {
                this.KEY_S = false;
            }

            if(e.key == 'd') {
                this.KEY_D = false;
            }

            if(e.key == ' ') {
                this.KEY_SPACE = false;
            }
            
            if(e.key == '.') {
                this.KEY_DOT = false;
            }
        })
    }
}