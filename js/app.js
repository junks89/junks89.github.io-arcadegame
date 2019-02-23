class Enemy {
    constructor(speed, x, y) {
        this.sprite = 'images/enemy-bug.png';
        this.speed = speed;
        this.x = x;
        this.y = y;
    };
    /* update: updates the position of the enemy depending on their speed and position */
    update(dt) {
        this.x = this.speed * dt + this.x;
        this.checkCollision();
        if (this.x > 505) {
            this.x = -100;
        }
    };
    /* checkCollision: checks if the enemy is in reach of the player */
    checkCollision() {
        if (this.x <= player.x + 50 && this.x >= player.x - 50
            && this.y <= player.y + 50 && this.y >= player.y - 25) {
            player.reset(false);
        }
    }
    /* render: Draw the enemy on the screen, required method for game */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
};

class Player {
    constructor(speed, x, y) {
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.playerStyleI = 0;
        this.playerStyles = [
            'images/char-cat-girl.png',
            'images/char-horn-girl.png',
            'images/char-pink-girl.png',
            'images/char-princess-girl.png',
            'images/char-boy.png'
        ];
        this.sprite = this.playerStyles[this.playerStyleI];
    };
    /* update: updates the position of the player depending on their speed and position */
    update(dt) {
        if (this.y <= -5) {
            this.x = 200;
            this.y = 400;
            level++;
            updateLevel();
            allEnemies = [];
            if (level <= 10) {
                for (let i = 1; i <= level; i++) {
                    let enemy = new Enemy(50 + (i * 20), Math.random() * 150 * (-Math.random()), Math.random() * 240);
                    allEnemies.push(enemy);
                }
            }
            else {
                this.reset(true);
            }
        }
    };
    /* reset: resets the game if the player won or was caught by an enemy */
    reset(gameWon) {
        if (gameWon) {
            let modalText = document.getElementById('modalText');
            modalText.innerText = `Congratulations you finished all 10 levels and won the game!`;
            modal.style.display = "block";
            allEnemies = [];
            level = 1;
            updateLevel();
            this.x = 200;
            this.y = 400;
            let enemy = new Enemy(50, 0, 200);
            allEnemies.push(enemy);
        }
        else {
            allEnemies = [];
            level = 1;
            updateLevel();
            this.x = 200;
            this.y = 400;
            let enemy = new Enemy(50, 0, 200);
            allEnemies.push(enemy);
        }
    };
    /* changePlayerStyle: by hitting "1" the style of the player character changes */
    changePlayerStyle() {
        this.playerStyleI++;

        if (this.playerStyleI === this.playerStyles.length) {
            this.playerStyleI = 0;
        }

        this.sprite = this.playerStyles[this.playerStyleI];
    };
    /* render: Draw the player on the screen, required method for game*/
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };
    /* handleInput: handles the action depending on the key pressed */
    handleInput(keypress) {
        if (keypress == 'left') {

            if ((this.x - this.speed) >= -15) {
                this.x = this.x - this.speed;
            }
            else {
                this.x = -15
            }
        }
        if (keypress == 'right') {
            if ((this.x + this.speed) <= 420) {
                this.x = this.x + this.speed;
            }
            else {
                this.x = 420;
            }
        }
        if (keypress == 'down') {
            if ((this.y + this.speed) <= 435) {
                this.y = this.y + this.speed;
            }
            else {
                this.y = 435;
            }
        }
        if (keypress == 'up') {
            if ((this.y - this.speed) >= -10) {
                this.y = this.y - this.speed;
            }
            else {
                this.y = -10;
            }
        }
        if (keypress == '1') {
            this.changePlayerStyle();
        }
    };

};
/* updateLevel: updates the current level information on the screen */
function updateLevel(levelElement) {
    if (!levelElement) {
        levelElement = document.getElementsByTagName('div')[2];
    }
    levelElement.innerHTML = `Level: ${level}`;
    let canvas = document.getElementsByTagName('canvas')[0];
    document.body.insertBefore(levelElement, canvas);
};

let levelElement = document.createElement('div');
let allEnemies = [];
let level = 1;
updateLevel(levelElement);
let player = new Player(20, 200, 400);
let enemy = new Enemy(50, 0, 200);
allEnemies.push(enemy);

/*source https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal*/
let modal = document.getElementById('myModal');
let span = document.getElementsByClassName("close")[0];
span.onclick = function () {
    modal.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        49: '1'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
