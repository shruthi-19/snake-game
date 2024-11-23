const board=document.getElementById('game-board');
const instructionText=document.getElementById('instruction-text');
const logo=document.getElementById('logo');
const score=document.getElementById('score');
const highScoreText=document.getElementById('highscore');
const snakeeat=document.getElementById('foodeat');

const gridSize=20;
let snake=[{x:10,y:10}];
let food=generateFood();
let bonus=generateFood();
let direction='left';
let gameInterval;
let gameSpeedDelay=200;
let gameStarted=false;
let highScore=0;
let p=1;

function draw(){
    board.innerHTML='';
    drawSnake();
    drawFood();
    p+=1;
    updateScore();
}

function drawSnake(){
    snake.forEach((segment)=>{
        const snakeElement = createGameElement('div','snake');
    setPosition(snakeElement,segment);
    board.appendChild(snakeElement);
    });
}

function createGameElement(tag,className){
    const element = document.createElement(tag);
    element.className=className;
    return element;
}

function setPosition(element,position){
    element.style.gridColumn=position.x;
    element.style.gridRow=position.y;
}

function drawFood(){
    const foodElement=createGameElement('div','food');
    setPosition(foodElement,food);
    board.appendChild(foodElement);
}

function generateFood(){
    const x=Math.floor(Math.random()*gridSize)+1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x,y};
    
}

function move(){
    const head={...snake[0]};
    switch (direction){
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    snake.unshift(head);
    //snake.pop();
    if(head.x===food.x && head.y===food.y){
        food=generateFood();
        increseSpeed();
        clearInterval(gameInterval);
        gameInterval=setInterval(()=>{
            move();
            checkCollision();
            for(let i=0;i<1;i++){
            foodeat.play();}
            draw();
        },gameSpeedDelay);
    }
    else {
       // console.log('f');
        snake.pop();
        foodeat.pause();
    }
}

//setInterval(()=>{
//    move();
//    draw();
//},200);
function  startGame(){
    gameStarted=true;
    instructionText.style.display='none';
    logo.style.display='none';
    gameInterval=setInterval(()=> {
        move();
        checkCollision();
        draw();
    },gameSpeedDelay);
     
}

function handleKeyPress(event){
    if((!gameStarted && event.code ==='Space') ||
    (!gameStarted && event.code ===' ')){
        startGame();
    }
    else{
        switch(event.key){
            case 'ArrowUp':
                direction='up';
                break;
            case 'ArrowDown':
                direction='down';
                break;
            case 'ArrowLeft':
                direction='left';
                break;
            case 'ArrowRight':
                direction='right';
                break;
        }
    }
}

function increseSpeed() {
  //  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 2;
  } else if (gameSpeedDelay > 25) {
    gameSpeedDelay -= 1;
  }
}

function checkCollision(){
    const head=snake[0];

    if(head.x<1 || head.x>gridSize || head.y<1 || head.y>gridSize){
        reSetGame();
    }
    for(let i=1;i<snake.length;i++){
        if(head.x===snake[i].x && head.y===snake[i].y){
            reSetGame();
        }
    }
}

function reSetGame(){
    updateHighScore();
    stopGame();
    snake=[{x:10,y:10}];
    food=generateFood();
    direction='left';
    gameSpeedDelay=200;
    p=1;
    updateScore();

}

function updateScore(){
    const currentScore=snake.length-1;
    score.textContent=currentScore.toString().padStart(3,'0');
}

document.addEventListener('keydown',handleKeyPress);

function updateHighScore(){
    const currentScore=snake.length-1;
    if(currentScore>highScore){
        highScore=currentScore;
        highScoreText.textContent=highScore.toString().padStart(3,'0');
    }
   // highScoreText1.style.display='block';
    highScoreText.style.display='block';

}

function stopGame(){
    clearInterval(gameInterval);
    gameStarted=false;
    instructionText.style.display='block';
    logo.style.display='block';
}








