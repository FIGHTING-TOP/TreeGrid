var hearts = {};
var heartIndex = 0;
var headerHeight = 60;

function Scene(){
  this.canvas = document.createElement("canvas");
  this.context = this.canvas.getContext("2d");
}

Scene.prototype.init = function(){
  var wrapper = document.getElementsByClassName('canvasWrapper')[0];
  var style = this.canvas.style;
  style.left = 0;
  style.top = 0;
  style.width = wrapper.getClientRects()[0].width;
  this.canvas.width = style.width;
  this.canvas.height = wrapper.getClientRects()[0].height;
  style.background = 'transparent';
  style.height = headerHeight;
  style.position = 'absolute';
  wrapper.appendChild(this.canvas);
};

function Heart(canvas){
  this.scene = canvas;
  this.x = 280;
  this.y = headerHeight/2 + 25;
  this.age = 0;
  this.currentScale = 0.1;
  this.maxScale = ~~(Math.random()*1) + 1;
  this.death = ~~(Math.random() * 50) + 100;
  this.speed = 0.8;
  this.angle = (Math.random() + 0.2) * Math.PI;
  heartIndex++;
  this.id = heartIndex;
  hearts[heartIndex] = this;
}

Heart.prototype.draw = function(){
  this.currentScale= this.currentScale > this.maxScale? this.maxScale : this.currentScale + 0.001;

  // Less derpy way to do it, science bitches !
  this.x += Math.sin(this.angle) * this.speed;
  this.y += Math.cos(this.angle) * this.speed;
  this.age++;
  //Farewell my friend.
  if (this.age > this.death)
  {
      delete hearts[this.id];
  }

  var ctx = this.scene.context;
  var x = this.x,
      y = this.y;
  ctx.save(); // We're doing translate/scale, saving context state before
  ctx.translate(x/2, y/2);

  ctx.scale(this.currentScale,this.currentScale);
  ctx.beginPath();
  ctx.bezierCurveTo(75,37,70,25,50,25);
  ctx.bezierCurveTo(20,25,20,62.5,20,62.5);
  ctx.bezierCurveTo(20,80,40,102,75,120);
  ctx.bezierCurveTo(110,102,130,80,130,62.5);
  ctx.bezierCurveTo(130,62.5,130,25,100,25);
  ctx.bezierCurveTo(85,25,75,37,75,40);

 ctx.fillStyle = 'rgba(255,0,0,' + (1 - this.age/this.death) * 2 + ')';
  ctx.fill();
  ctx.restore();
  //console.log(this.id,' drawing. :)',this.x,this.y,this.currentScale,this.maxScale);
};

function run() {
  var h = scene.canvas.height;
  var w = scene.canvas.width;
  var ctx = scene.context;

  ctx.moveTo(0,0);
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, w, h);

  // let's create some particles if needed
  var numHearts = Object.keys(hearts).length;
  if (numHearts < 10)
  {
    if (heartIndex === 0 || numHearts === 0)
    {
      new Heart(scene);
    }
    else if (numHearts > 0 && hearts[Object.keys(hearts).pop()].age > ~~(Math.random() * 20) + 40)
    {
      new Heart(scene);
    }

  }


  // and draw each one seperately
  //scene.context.clearRect(0,0,1280,150);
  for (var j in hearts) {
    hearts[j].draw();
  }
  // and run it over and over again
  requestAnimationFrame(run);
}


// init
var scene = new Scene();
scene.init();


Scene.prototype.scale = function() {
  this.canvas.width = window.innerWidth;
};


function scaleCanvas() {
  scene.scale();
};
scaleCanvas();
run();

window.addEventListener('resize', scaleCanvas);

