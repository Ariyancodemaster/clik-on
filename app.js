const player = document.getElementById("player");
const gameArea = document.getElementById("gameArea");
const scoreDisplay = document.getElementById("score");

let playerPos = 180;
let blocks = [];
let gameInterval, blockInterval, scoreInterval;
let timeSurvived = 0;

function startGame() {
  playerPos = 180;
  player.style.left = `${playerPos}px`;
  timeSurvived = 0;
  scoreDisplay.textContent = "0";
  blocks.forEach(b => b.remove());
  blocks = [];

  document.addEventListener("keydown", movePlayer);
  gameInterval = setInterval(dropBlocks, 20);
  blockInterval = setInterval(createBlock, 1000);
  scoreInterval = setInterval(() => {
    timeSurvived++;
    scoreDisplay.textContent = timeSurvived;
  }, 1000);
}

function movePlayer(e) {
  if (e.key === "ArrowLeft" && playerPos > 0) {
    playerPos -= 20;
  } else if (e.key === "ArrowRight" && playerPos < 360) {
    playerPos += 20;
  }
  player.style.left = `${playerPos}px`;
}

function createBlock() {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.left = `${Math.floor(Math.random() * 10) * 40}px`;
  block.style.top = "0px";
  gameArea.appendChild(block);
  blocks.push(block);
}

function dropBlocks() {
  blocks.forEach((block, index) => {
    let top = parseInt(block.style.top);
    if (top >= 460 && parseInt(block.style.left) === playerPos) {
      endGame();
    }
    if (top >= 500) {
      block.remove();
      blocks.splice(index, 1);
    } else {
      block.style.top = `${top + 4}px`;
    }
  });
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(blockInterval);
  clearInterval(scoreInterval);
  document.removeEventListener("keydown", movePlayer);
  alert(`Game Over! You survived ${timeSurvived} seconds.`);
}
