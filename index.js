const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let speed = 8;

function drawGame() {
    clearScreen();
    console.log('Draw game');
    setTimeout(drawGame, 1000 / speed)
}

function clearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

drawGame()