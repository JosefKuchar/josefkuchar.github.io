var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var board = Array();
var TILES = 120;
var currentColor = 0;
var ant = {
    x: 50,
    y: 25,
    dir: 0
};

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.fillStyle = '#111111';
context.fillRect(0, 0, canvas.width, canvas.height);

var size = canvas.width / TILES;

for (var y = 0; y < Math.ceil(canvas.height / size); y++) {
    board[y] = Array(); 
    for (var x = 0; x < TILES; x++) {
        board[y][x] = false;
    }
}

function drawBoard() {
    for (var x = 0; x < board[0].length; x++) {
        for (var y = 0; y < board.length; y++) {
            if (board[y][x]) {
                context.fillStyle = 'hsl(' + 360 * Math.random() + ',30%,20%)';
                context.fillRect(x * size, y * size, size, size);
            }
        }
    }
}

function resize() {
    size = window.innerWidth / TILES;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = '#111111';
    context.fillRect(0, 0, canvas.width, canvas.height);
    var height = Math.ceil(canvas.height / size);
    if (height > board.length) {
        while (height != board.length) {
            var arr = Array();
            for (var i = 0; i < TILES; i++) {
                arr.push(false);
            }
            board.push(arr);
        }
    } else if (height < board.length) {
        while (height != board.length) {
            board.pop();
        }

        if (ant.y >= board.length) {
            ant.y = 0;
        }
    }
    drawBoard();
}

function move(e) {
    var x = Math.floor(e.clientX / size);
    var y = Math.floor(e.clientY / size);
    board[y][x] = true;
    context.fillStyle = 'hsl(' + 360 * Math.random() + ',30%,20%)';
    context.fillRect(x * size, y * size, size, size);
}

function update() {
    if (board[ant.y][ant.x]) {
        ant.dir += 3;
    } else {
        ant.dir += 1;
    }

    board[ant.y][ant.x] = !board[ant.y][ant.x];
    ant.dir %= 4;

    if (board[ant.y][ant.x]) {
        context.fillStyle = 'hsl(' + currentColor + ',30%,20%)';
        currentColor += 0.5;
        currentColor %= 360
    }
    else
        context.fillStyle = '#111111';

    context.fillRect(ant.x * size, ant.y * size, size, size);

    switch (ant.dir) {
        case 0:
            ant.y--;
            break;
        case 1:
            ant.x++;
            break;
        case 2:
            ant.y++;
            break;
        case 3:
            ant.x--;
            break;
    }

    if (ant.x >= board[0].length) {
        ant.x = 0;
    } else if (ant.x < 0) {
        ant.x = board[0].length - 1;
    }

    if (ant.y >= board.length) {
        ant.y = 0;
    } else if (ant.y < 0) {
        ant.y = board.length - 1;
    }
}

function loop() {
    for (var i = 0; i < 10; i++)
        update();
    window.requestAnimationFrame(loop);
}

window.addEventListener('resize', resize);
window.addEventListener('mousemove', move);
drawBoard();
loop();