const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 8;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10; //position of snake's head
let headY = 10;
const snakeParts = [];
let tailLength = 3;

let appleX = 5;
let appleY = 5;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

document.body.addEventListener('keydown', keyDown);

function drawGame() {
    log('Refreshing...');

    changeSnakePosition();

    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();

    checkAppleCollision();

    drawApple();
    drawSnake();
    drawScore();

    setTimeout(drawGame, 1000 / speed)
}

function isGameOver() {
    let gameOver = false;

    log("yVel: " + yVelocity)
    log("xVel: " + xVelocity)

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    //walls:
    if (headX < 0) {
        gameOver = true;
    }
    else if (headX === tileCount) {
        gameOver = true;
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY === tileCount) {
        gameOver = true;
    }

    //touch tail
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';
        ctx.fillText('Game Over!', canvas.width / 6.5, canvas.height / 2);
    }
    return gameOver;
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawScore() {
    ctx.fillStyle = 'white';
    ctx.font = "12px Verdana";
    ctx.fillText("Score " + score, canvas.width - 65, 20);
}

function drawSnake() {
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize)

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }
    snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
    if (snakeParts.length > tailLength) {
        snakeParts.shift(); //remove the furthest item from the snake parts if we have more than our tail size
    }
    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize)
}

function checkAppleCollision() {
    if (appleX == headX && appleY == headY) {
        log('Apple eaten');
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}


function keyDown(event) {

    //'left' arrow:
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    //'up' arrow:
    if (event.keyCode == 38) {
        if (yVelocity == 1)
            return;
        yVelocity = -1;
        xVelocity = 0;
    }
    //'right' arrow:
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
    //'down' arrow:
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
}

function log(message) {
    console.log(message)
}

drawGame()