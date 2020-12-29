const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//geme vars and consts
let frames = 0;
const degree = Math.PI/180;

//image
const birdImage = new Image();
const topPipeImage = new Image();
const bottomPipeImage = new Image();
const backgroundImage = new Image();
const backgroundImage2 = new Image();
const backgroundImage3 = new Image();
const middlegroundImage = new Image();
const foregroundImage = new Image();
const startgroundImage = new Image();
const gameovergroundImage = new Image();
birdImage.src = "img/bluebird.png";
topPipeImage.src = "img/toppipe.png";
bottomPipeImage.src ="img/downpipe.png";
backgroundImage.src = "img/layer_1.png";
backgroundImage2.src = "img/starrynight.jpg";
backgroundImage3.src = "img/starrynight2.jpg";
middlegroundImage.src = "img/layer_2.png";
foregroundImage.src = "img/layer_3.png";
startgroundImage.src = "img/gamestart.png";
gameovergroundImage.src = "img/sprite.png";

//change the stage
const state = {
  current: 0,
  gamestart:0,
  game:1,
  gameover:2
}

//sound
const scoreSound = new Audio();
scoreSound.src = "audio/point.wav";

const flapSound = new Audio();
flapSound.src = "audio/flap.wav";

const hitSound = new Audio();
hitSound.src = "audio/hit.wav";

const swooshingSound = new Audio();
swooshingSound.src = "audio/swooshing.wav";

const dieSound = new Audio();
dieSound.src = "audio/die.wav";

//start btn
const startBtn = {
  x:120,
  y:263,
  w:83,
  h:29
}

canvas.addEventListener('click', function(evt) {
  switch(state.current) {
    case state.gamestart:
      state.current = state.game;
      swooshingSound.play();
      break;
    case state.game:
      drawBirdImage.flap();
      flapSound.play();
      break;
    case state.gameover:
      let rect = canvas.getBoundingClientRect();
      let clickX = evt.clientX - rect.left;
      let clickY = evt.clientY - rect.top;

      if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h) {
        pipes.reset();
        drawBirdImage.speedReset();
        score.reset();
        state.current = state.gamestart;
      }
      break;
  }
});

//image bird
const drawBirdImage = {
  animation : [
    {sX: 0, sY:0},
    {sX: 0, sY:71},
    {sX: 0, sY:71*2},
    {sX: 0, sY:71},
  ],
  x:50,
  y:200,
  w:103,
  h:71,
  radius:25,
  frame:0,
  gravity:0.25,
  jump:4.6,
  speed:0,
  rotation:0,

  draw: function () {
    let bird = this.animation[this.frame];

    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    ctx.drawImage(birdImage, bird.sX, bird.sY, this.w, this.h, -this.w/2, -this.h/2, this.w, this.h);

    ctx.restore();
  },

  flap: function() {
    this.speed = -this.jump;
  },

  update: function () {
    // bird fllaping speed
    this.period = state.current == state.gamestart ? 10 : 5;
    //make bird frame 
    this.frame += frames%this.period == 0 ? 1: 0;
    this.frame = this.frame%this.animation.length;

    if(state.current == state.gamestart) {
      this.y = 150;
      this.rotation = 0 * degree;
    } else {
      this.speed += this.gravity;
      this.y += this.speed;

      if(this.y+this.h/2 >= canvas.height- (drawForeGroundImage.h-160)) {
        this.y = canvas.height- (drawForeGroundImage.h-160)-this.h/2;
        if(state.current == state.game) {
          state.current = state.gameover;
          dieSound.play();
        }
      }
      if(this.speed >= this.jump) {
        this.rotation = 90 * degree; 
      } else {
        this.rotation = -25 * degree; 
      }
    }
  },
  speedReset:function() {
    this.speed = 0;
  }
}

//image gamestart

const drawStartgroundImage = {
  sX:0,
  sY:0,
  w:320,
  h:180/2,
  x:0,
  y:canvas.height/2,

  draw: function () {
    if(state.current === state.gamestart) {
      
      ctx.drawImage(startgroundImage, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }
}

//image gameover
const drawGameovergroundImage = {
  sX:173,
  sY:228,
  w:270,
  h:226,
  x:50,
  y:canvas.height/5.5,

  draw: function () {
    if(state.current === state.gameover) {

      ctx.drawImage(gameovergroundImage, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
  }
}


//background
const drawBackgroundImage = {
  sX:0,
  sY:0,
  w:320,
  h:160,
  x:0,
  y:canvas.height-280,

  draw: function () {
    ctx.drawImage(backgroundImage, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}

const drawBackgroundImage2 = {
  sX:0,
  sY:0,
  w:320,
  h:160,
  x:0,
  y:canvas.height - 300,

  draw: function () {
    ctx.drawImage(backgroundImage2, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}

const drawBackgroundImage3 = {
  sX:0,
  sY:0,
  w:320,
  h:160,
  x:0,
  y:canvas.height-410,

  draw: function () {
    ctx.drawImage(backgroundImage3, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}
const drawBackgroundImage4 = {
  sX:0,
  sY:0,
  w:320,
  h:140,
  x:0,
  y:canvas.height-480,

  draw: function () {
    ctx.drawImage(backgroundImage2, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}

const drawMiddleBackgroundImage = {
  sX:0,
  sY:0,
  w:320,
  h:160,
  x:0,
  y:canvas.height/2,

  draw: function () {
    ctx.drawImage(middlegroundImage, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
  }
}


const drawForeGroundImage = {
  sX:0,
  sY:0,
  w:320,
  h:160,
  x:0,
  y:canvas.height- 160,
  dx:2,

  draw: function () {
    ctx.drawImage(foregroundImage, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    ctx.drawImage(foregroundImage, this.sX, this.sY, this.w, this.h, this.x+this.w, this.y, this.w, this.h);
  },

  update: function () {
    if(state.current == state.game) {
      this.x = (this.x - this.dx)%(this.w/2);
    }
  }
}

//create pipes
const pipes = {
  position: [],

  top: {
    sX:0,
    sY:0,
  },
  bottom: {
    sX:0,
    sY:0,
  },
  w:121,
  h:319,
  maxYPos:-120,
  gap:160,
  dx:2,

  draw:function() {
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];
      
      let topYPos =  p.y;
      let bottomYPos = p.y + this.h+this.gap;

      ctx.drawImage(topPipeImage, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

      ctx.drawImage(bottomPipeImage, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
    }
  },
  update: function() {
    if(state.current !== state.game) return;
    if(frames%100 == 0) {
      this.position.push({
        x:canvas.width,
        y:this.maxYPos * (Math.random() + 1)
      });
    }
    for (let i = 0; i < this.position.length; i++) {
      let p = this.position[i];

      let bottomPipeYPos = p.y + this.h + this.gap;

      //top pipe
      if(drawBirdImage.x + drawBirdImage.radius > p.x && drawBirdImage.x - drawBirdImage.radius < p.x + this.w && drawBirdImage.y + drawBirdImage.radius > p.y && drawBirdImage.y - drawBirdImage.radius < p.y + this.h) {
        state.current = state.gameover;
        hitSound.play();
      }
      if(drawBirdImage.x + drawBirdImage.radius > p.x && drawBirdImage.x - drawBirdImage.radius < p.x + this.w && drawBirdImage.y + drawBirdImage.radius > bottomPipeYPos && drawBirdImage.y - drawBirdImage.radius < bottomPipeYPos + this.h){
        state.current = state.gameover;
        hitSound.play();
      }

      //move the pipes to the left
      p.x -= this.dx;

      //pipes delete
      if(p.x + this.w <= 0) {
        this.position.shift();
        score.value += 1;
        scoreSound.play();
        score.best = Math.max(score.value, score.best);
        localStorage.setItem("best", score.best);
      }
    }
  },
  reset:function () {
    this.position =   [];
  }
}

//score
const score = {
  best: parseInt(localStorage.getItem("best")) || 0,
  value:0,
  
  draw: function () {
    ctx.fillStyle = "#FFF";
    ctx.strokeStyle = "#000";

    if(state.current == state.game){
      ctx.lineWidth = 2;
      ctx.font = "35px Arial";
      ctx.fillText(this.value, canvas.width/2, 50);
      ctx.strokeText(this.value, canvas.width/2, 50);
    } else if(state.current == state.gameover){
      //score
      ctx.font = "25px Arial";
      ctx.fillText(this.value, 225, 186);
      ctx.strokeText(this.value, 225, 186);
      //best score
      ctx.fillText(this.best, 225, 228);
      ctx.strokeText(this.best, 225, 228);
    }
  },
  reset: function () {
    this.value = 0;
  }
}

//draw
function draw() {
  ctx.fillStyle = "#52DDF3";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  drawBackgroundImage.draw();
  drawBackgroundImage2.draw();
  drawBackgroundImage3.draw();
  drawBackgroundImage4.draw();
  drawMiddleBackgroundImage.draw();
  drawForeGroundImage.draw();
  drawBirdImage.draw();
  pipes.draw();
  drawStartgroundImage.draw();
  drawGameovergroundImage.draw();
  score.draw();
}

//update
function update() {
  drawBirdImage.update();
  drawForeGroundImage.update();
  pipes.update();
}

//loop
function loop() {
  update();
  draw();
  frames++;

  requestAnimationFrame(loop);
}
loop();