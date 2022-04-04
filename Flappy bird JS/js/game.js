var cvs = document.getElementById("canvas");
var ctx = cvs.getContext('2d');

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUP = new Image();
var pipeBottom = new Image();

bird.src = "img/flappy_bird_bird.png";
bg.src = "img/flappy_bird_bg.png";
fg.src = "img/flappy_bird_fg.png";
pipeUP.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

// Volume files
var fly = new Audio();
var audio_score = new Audio();

fly.src = "audio/fly.mp3";
audio_score.src = "audio/score.mp3";

var gap = 90;

// При нажатии на какую-либо кнопку
document.addEventListener("keydown", moveUp);

function moveUp() {
    yPos -= 40;
    fly.play();
}

// Создание блоков
var pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0

}

// Позиция птички
var xPos = 10;
var yPos = 150;
var grah = 1.5;
var score = 0;

function draw() {
    ctx.drawImage(bg, 0, 0);

    for (var i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUP, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUP.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUP.height) -
                    pipeUP.height
            });
        }

        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUP.width &&
            (yPos <= pipe[i].y + pipeUP.height ||
                yPos + bird.height >= pipe[i].y + pipeUP.height +
                gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload(); // Перезапуск игры
        }

        if (pipe[i].x == 5) {
            score++;
            audio_score.play();
        }

    }


    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grah;

    ctx.fillStyle = "#C70505";
    ctx.font = "24px Game Over";
    ctx.fillText("Счёт: " + score, 10, cvs.height - 20);

    requestAnimationFrame(draw);
}

pipeBottom.onload = draw;