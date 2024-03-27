let x;
let y;
let selectedColor;
let squares;
let dragging = false;
const size = 10;
let player = new Tone.Player("assets/track1.mp3").toDestination();
player.loop = true;
let player2 = new Tone.Player("assets/sweep.mp3").toDestination();
let osc = new Tone.Synth(100, 'sine').toDestination();
let lfo = new Tone.LFO(400, 10, 400).connect(osc.frequency).start();
let startTime = 0;
let reverseTime = 10; 

function setup() {
  createCanvas(400, 400);

  selectedColor = color('white');
  x = width / 2;
  y = height / 2;

  squares = [
    new colorSelect(1, 1, color('red')),
    new colorSelect(1, 20, color('orange')),
    new colorSelect(1, 40, color('yellow')),
    new colorSelect(1, 60, color('#00FF00')),
    new colorSelect(1, 80, color('#00FFFF')),
    new colorSelect(1, 100, color('blue')),
    new colorSelect(1, 120, color('#FF00FF')),
    new colorSelect(1, 140, color('brown')),
    new colorSelect(1, 160, color('white')),
    new colorSelect(1, 180, color('black')),
    ];

    clearBtn = new clearButton(1, 200);
}

function draw() {
  
  for (let i = 0; i < squares.length; i++) {
    squares[i].draw();
  }

  clearBtn.draw();
  checkReverse();

  if (dragging) {
    fill(selectedColor);
  }
  }

class colorSelect {
  constructor(x, y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
  }

  draw() {
    fill(this.fill);
    noStroke();
    square(this.x, this.y, 20);
  }

  contains(x, y) {
    let insideX = x >= this.x && x <= this.x + size;
    let insideY = y >= this.y && y <= this.y + size;
    return insideX && insideY;
  }
}

class clearButton {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 30;
    this.height = 30;
  }

  draw() {
    fill(200); 
    rect(this.x, this.y, this.width, this.height);
    fill('red'); 
    textSize(12);
    textAlign(CENTER, CENTER);
    text("Clear", this.x + this.width / 2, this.y + this.height / 2);
  }

  contains(mx, my) {
    return mx >= this.x && mx <= this.x + this.width &&
           my >= this.y && my <= this.y + this.height;
  }

  onClick() {
    clearCanvas();
    player2.start();
  }
}

function clearCanvas() {
  background(255); 
}

function mousePressed(){
    
    console.log("mouseX: " + mouseX);
    console.log("x: " + x);
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].contains(mouseX, mouseY)) {
      selectedColor = squares[i].fill;
      osc.triggerAttack();
      return;
    }
  }
if (clearBtn.contains(mouseX, mouseY)) {
    clearBtn.onClick();
  } else {
    dragging = true;
      player.start();
      osc.triggerRelease();
      startTime = millis() / 1000;    
    }
}

function mouseReleased() {
  dragging = false;
  player.stop();
}

function mouseDragged(){
  console.log(dragging);
  if(dragging){
    fill(selectedColor);
    noStroke();
    ellipse(mouseX, mouseY, size, size);
console.log(x);
  }
}

function checkReverse() {
  let currentTime = millis() / 1000; 
  let elapsedTime = currentTime - startTime;
  if (elapsedTime >= reverseTime && player.playbackRate !== -1) {
      player.reverse = true;
  }
}