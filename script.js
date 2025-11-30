const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const startScreen = document.getElementById('start-screen');
const startBtn = document.getElementById('startBtn');
const inGameMenu = document.getElementById('in-game-menu');
const menuBtn = document.getElementById('btn-menu');
const continueBtn = document.getElementById('continue-btn');
const replayBtn = document.getElementById('replay-btn');
const gameOverEl = document.getElementById('game-over');
const finalScoreEl = document.getElementById('final-score');
const retryBtn = document.getElementById('retry-btn');
const musicToggle = document.getElementById('music-toggle');
const skinButtons = document.querySelectorAll('.skin-btn');

let boxSize = 20;
let cols = Math.floor(canvas.width / boxSize);
let rows = Math.floor(canvas.height / boxSize);

let snake = [];
let food = null;
let direction = 'RIGHT';
let score = 0;
let gameLoop = null;
let skin = 'neon';
let rainbowColors = ['#ff3d9a','#ffd24d','#6ee6a1','#6ea8ff','#b09cff'];
let musicOn = true;

const AudioCtx = window.AudioContext || window.webkitAudioContext;
const audioCtx = AudioCtx ? new AudioCtx() : null;

function retroBeep(freq, duration=0.08, type='square'){
  if(!audioCtx || !musicOn) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.value = 0.08;
  o.connect(g); g.connect(audioCtx.destination);
  o.start();
  o.stop(audioCtx.currentTime + duration);
}
function retroExplosion(){
  if(!audioCtx || !musicOn) return;
  const o = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  const now = audioCtx.currentTime;
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(200, now);
  o.frequency.exponentialRampToValueAtTime(20, now + 0.25);
  g.gain.setValueAtTime(0.12, now);
  g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
  o.connect(g); g.connect(audioCtx.destination);
  o.start(); o.stop(now + 0.35);
}

document.addEventListener('keydown', e=>{
  const k = e.key.toLowerCase();
  if((k === 'arrowup' || k === 'w') && direction !== 'DOWN') direction = 'UP';
  if((k === 'arrowdown' || k === 's') && direction !== 'UP') direction = 'DOWN';
  if((k === 'arrowleft' || k === 'a') && direction !== 'RIGHT') direction = 'LEFT';
  if((k === 'arrowright' || k === 'd') && direction !== 'LEFT') direction = 'RIGHT';
  if(k === 'p') togglePause();
});

function randomFood(){
  return {x: Math.floor(Math.random() * cols) * boxSize, y: Math.floor(Math.random() * rows) * boxSize};
}

function drawGrid(){
  ctx.fillStyle = '#000';
  ctx.fillRect(0,0,canvas.width,canvas.height);
}

function draw(){
  drawGrid();

  for(let i=0;i<snake.length;i++){
    const s = snake[i];
    if(skin === 'neon'){
      ctx.fillStyle = i===0 ? '#fff6f9' : 'rgb(255, 0, 149)';
    } else if(skin === 'normal'){
      ctx.fillStyle = i===0 ? '#dfffe8' : '#2ecc71';
    } else {
      ctx.fillStyle = rainbowColors[i % rainbowColors.length];
    }
    ctx.fillRect(s.x, s.y, boxSize, boxSize);
    if(skin === 'neon'){
      ctx.strokeStyle = 'rgba(255,0,149,0.14)';
      ctx.strokeRect(s.x+1, s.y+1, boxSize-2, boxSize-2);
    }
  }

  ctx.fillStyle = '#ffd24d';
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  let head = {x: snake[0].x, y: snake[0].y};
  if(direction === 'UP') head.y -= boxSize;
  if(direction === 'DOWN') head.y += boxSize;
  if(direction === 'LEFT') head.x -= boxSize;
  if(direction === 'RIGHT') head.x += boxSize;

  if(head.x === food.x && head.y === food.y){
    score += 10;
    retroBeep(880,0.06,'square');
    food = randomFood();
  } else {
    snake.pop();
  }

  snake.unshift(head);

  ctx.fillStyle = skin === 'normal' ? '#2ecc71' : 'rgb(255,0,149)';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 12, 24);

  if(head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || collision(head)){
    clearInterval(gameLoop);
    retroExplosion();
    gameOverEl.classList.remove('hidden');
    finalScoreEl.textContent = 'Score : ' + score;
  }
}

function collision(head){
  return snake.some((seg, idx) => idx !== 0 && seg.x === head.x && seg.y === head.y);
}

function startGame(){
  if(gameLoop) clearInterval(gameLoop);
  snake = [{x: Math.floor(cols/2)*boxSize, y: Math.floor(rows/2)*boxSize}];
  snake.push({x: snake[0].x - boxSize, y: snake[0].y});
  snake.push({x: snake[0].x - boxSize*2, y: snake[0].y});
  food = randomFood();
  direction = 'RIGHT';
  score = 0;
  gameOverEl.classList.add('hidden');
  inGameMenu.classList.add('hidden');
  startScreen.classList.add('hidden');
  gameLoop = setInterval(draw, 120);
}

function togglePause(){
  if(!gameLoop){ gameLoop = setInterval(draw, 120); return; }
  clearInterval(gameLoop);
  gameLoop = null;
}

startBtn.addEventListener('click', ()=>{
  skinButtons.forEach(b => b.classList.remove('active'));
  document.querySelector(`.skin-btn[data-skin="${skin}"]`)?.classList.add('active');
  startScreen.classList.add('hidden');

  startGame();
});


skinButtons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    skinButtons.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    skin = btn.dataset.skin;
  });
});

menuBtn.addEventListener('click', ()=>{
  if(gameOverEl.classList.contains('hidden')) inGameMenu.classList.remove('hidden');
});

continueBtn.addEventListener('click', ()=> inGameMenu.classList.add('hidden'));
replayBtn.addEventListener('click', ()=> startGame());
retryBtn.addEventListener('click', ()=> startGame());

musicToggle.addEventListener('change', ()=>{
  musicOn = musicToggle.checked;
  if(musicOn && audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
});
