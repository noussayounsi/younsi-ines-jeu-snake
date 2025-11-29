const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [
  { x: 200, y: 200 }
];

let food = {
  x: Math.floor(Math.random() * 20) * box,
  y: Math.floor(Math.random() * 20) * box
};

let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", event => {
  if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function draw() {
  ctx.clearRect(0, 0, 400, 400);

  snake.forEach(segment => {
    ctx.fillStyle = "rgb(255, 0, 149)";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x, food.y, box, box);

  let head = { ...snake[0] };

  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;

  snake.unshift(head);
  snake.pop();
}

setInterval(draw, 150);
// mange nourriture
if (head.x === food.x && head.y === food.y) {
  score++;
  food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
  };
} else {
  snake.pop();
}

// Score
ctx.fillStyle = "#0f0";
ctx.font = "20px Arial";
ctx.fillText("Score : " + score, 10, 20);

