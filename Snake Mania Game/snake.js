let snakeVelocity = {x: 0, y: 0};
const eatFoodSound = new Audio('Audio/eatFoodSound.mp3');
const keyMoveSound = new Audio('Audio/keyMoveSound.mp3');
const gameOverSound = new Audio('Audio/gameOverSound.mp3');
let speed = 7;
let lastPaintTime = 0;
let snakeArr = [
    {x: 12, y: 6},
    ];  
let food = {x: 3, y: 4};
let score = 0;


function speedChange() {
    speed = prompt("Enter the speed 1 - 20", "7");
    if(speed===null || speed > 20) {
        speed = 7;
    }
    speedBox.innerHTML = "Speed: " + speed;
}

function resetScore() {
    localStorage.clear("highScore");
    location.reload();
}

function main(currentTime) {
    window.requestAnimationFrame(main);
    if((currentTime - lastPaintTime)/1000 < 1/speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}

function isCollide(snake) {
    // if snake collides in itself
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if snake collides into the wall

    if(snake[0].x > 24 || snake[0].x < 0 || snake[0].y > 24 || snake[0].y < 0) {
        return true;
    }
}

function gameEngine() {

    // update snake and food

    if(isCollide(snakeArr)) {
        gameOverSound.play();
        snakeVelocity = {x: 0, y: 0};
        alert("Game Over. Press any key to play again");
        snakeArr = [{x: 12, y: 6}];
        score = 0;
    }


    // if snake ate the food, then increment the score and regenerate the food

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        eatFoodSound.play();
        score += 1;
        if(score > highScoreValue) {
            highScoreValue = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreValue));
            highScoreBox.innerHTML = "High Score: " + highScoreValue;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + snakeVelocity.x, y: snakeArr[0].y + snakeVelocity.y});
        let a = 1;
        let b = 24;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }



    // Move the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += snakeVelocity.x;
    snakeArr[0].y += snakeVelocity.y;



    // display snake and food


    // display snake, speed and score

    board.innerHTML = "";
    speedBox.innerHTML = "Speed: " + speed;
    scoreBox.innerHTML = "Score: " + score;
    snakeArr.forEach((element, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = element.y;
        snakeElement.style.gridColumnStart = element.x;
        if(index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('body');
        }
        board.appendChild(snakeElement);
    });

    // display food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

let highScore = localStorage.getItem("highScore");
if(highScore === null) {
    highScoreValue = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreValue));
}
else {
    highScoreValue = JSON.parse(highScore);
    highScoreBox.innerHTML = "High Score: " + highScore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', event => {
    if(event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        snakeVelocity = {x: 0, y: 1}; // start the game
        keyMoveSound.play();
        switch (event.key) {
            case "ArrowUp":
                snakeVelocity.x = 0;
                snakeVelocity.y = -1;
                break;
        
            case "ArrowDown":
                snakeVelocity.x = 0;
                snakeVelocity.y = 1;
                break;
            
            case "ArrowLeft":
                snakeVelocity.x = -1;
                snakeVelocity.y = 0;
                break;

            case "ArrowRight":
                snakeVelocity.x = 1;
                snakeVelocity.y = 0;
                break;
            default:
                break;
        }
    }
});