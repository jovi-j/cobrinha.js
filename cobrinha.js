let canvas = document.getElementById("cobrinha");
let context = canvas.getContext("2d");

let box = 32;
let snake = [];
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15  + 1) * box,
    y: Math.floor(Math.random() * 15  + 1) * box
}

snake[0] = {
    x: 8 * box,
    y: 8 * box,
}

function criarBG(){
    context.fillStyle = "lightgreen";
    context.fillRect(0,0, 16 * box, 16 * box);
}

function criarCobrinha(){
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function update(event) {
    var key = event.keyCode || event.which;
    var keychar = String.fromCharCode(key);
    if (keychar == "W" && direction != "down") direction = "up";
    if (keychar == "S" && direction != "up") direction = "down";
    if (keychar == "A" && direction != "right") direction = "left";
    if (keychar == "D" && direction != "left") direction = "right";
}

document.addEventListener('keydown', update);

function iniciarJogo(){
    snake[0].x = snake[0].x > 16 * box && direction == "right" ? 0 : snake[0].x;
    snake[0].x = snake[0].x < 0 && direction == "left" ? 16 * box : snake[0].x;
    snake[0].y = snake[0].y > 16 * box && direction == "down" ? 0 : snake[0].y;
    snake[0].y = snake[0].y < 0 && direction == "up" ? 16 * box : snake[0].y;

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo);
            alert("Game Over!");
        }
    }
    criarBG();
    criarCobrinha();
    drawFood();
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;
    if(direction == "left") snakeX -= box;
    if(direction == "right") snakeX += box;


    if(snake[0].x != food.x || snake[0].y != food.y){
        snake.pop();
    } else{
        food.x = Math.floor(Math.random() * 15  + 1) * box;
        food.y = Math.floor(Math.random() * 15  + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    snake.unshift(newHead);
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

let jogo = setInterval(iniciarJogo, 100);
