const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const startContainer = document.getElementById('start-container');
const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const gameOverText = document.getElementById('gameOverText');

// Oyun Değişkenleri
let score = 0;
let isPlaying = false;
let animationFrameId;

// Top Ayarları
let ballRadius = 10;
let bx, by, bdx, bdy;

// Çubuk (Raket) Ayarları - İsteğiniz üzerine UZATILDI
const paddleHeight = 15;
const paddleWidth = 180; // Çubuk boyutu uzatıldı (Orijinali 100 civarıydı)
let paddleX;

// Kontroller
let moveRight = false;
let moveLeft = false;

// Klavye Dinleyicisi
document.addEventListener("keydown", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") moveRight = true;
    if (e.key === "Left" || e.key === "ArrowLeft") moveLeft = true;
    
    // Boşluk Tuşu Kontrolü: Oyunu başlatır veya yeniden başlatır
    if (e.code === "Space" && !isPlaying) {
        initGame();
    }
});

document.addEventListener("keyup", (e) => {
    if (e.key === "Right" || e.key === "ArrowRight") moveRight = false;
    if (e.key === "Left" || e.key === "ArrowLeft") moveLeft = false;
});

function initGame() {
    // Önceki döngüyü temizle
    cancelAnimationFrame(animationFrameId);
    
    // Değerleri Sıfırla
    isPlaying = true;
    score = 0;
    scoreDisplay.innerText = score;
    bx = canvas.width / 2;
    by = canvas.height - 30;
    bdx = 4;
    bdy = -4;
    paddleX = (canvas.width - paddleWidth) / 2;

    // Ekranı Güncelle
    startContainer.style.display = "none";
    gameOverText.style.display = "none";
    gameArea.style.display = "block";

    gameLoop();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(bx, by, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#ff4b2b";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#00d2ff";
    ctx.fill();
    ctx.closePath();
}

function gameLoop() {
    if (!isPlaying) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();

    // Duvar Çarpışmaları
    if (bx + bdx > canvas.width - ballRadius || bx + bdx < ballRadius) bdx = -bdx;
    if (by + bdy < ballRadius) bdy = -bdy;
    else if (by + bdy > canvas.height - ballRadius) {
        // Çubuk Çarpışması
        if (bx > paddleX && bx < paddleX + paddleWidth) {
            bdy = -bdy;
            score++;
            scoreDisplay.innerText = score;
            // Hafif hızlandırma
            bdx *= 1.01;
            bdy *= 1.01;
        } else {
            // Oyun Bitti
            isPlaying = false;
            startContainer.style.display = "block";
            gameOverText.style.display = "block";
            return;
        }
    }

    // Çubuk Hareketi
    if (moveRight && paddleX < canvas.width - paddleWidth) paddleX += 8;
    else if (moveLeft && paddleX > 0) paddleX -= 8;

    bx += bdx;
    by += bdy;
    animationFrameId = requestAnimationFrame(gameLoop);
}

// Fare ile de başlatabilmek için
startBtn.addEventListener("click", initGame);