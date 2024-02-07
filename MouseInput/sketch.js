let x;
let y;
let selectedColor;
let squares;
let dragging = false;
const size = 10;



function setup() {
  createCanvas(400, 400);

  selectedColor = color('white');
  x = width/2;
  y = height/2;

  squares = [
    new colorSelect(1,1,color('red')),
    new colorSelect(1,20,color('orange')),
    new colorSelect(1,40,color('yellow')),
    new colorSelect(1,60,color('#00FF00')),
    new colorSelect(1,80,color('#00FFFF')),
    new colorSelect(1,100,color('blue')),
    new colorSelect(1,120,color('#FF00FF')),
    new colorSelect(1,140,color('brown')),
    new colorSelect(1,160,color('white')),
    new colorSelect(1,180,color('black'))];
}


function draw() {


  for(let i=0;i < squares.length;i++) {
    squares[i].draw();
  }

  if (dragging) {
    fill(selectedColor);
  }
}
class colorSelect {
  constructor(x,y, fill) {
    this.x = x;
    this.y = y;
    this.fill = fill;
   }
  
    draw() {
      fill(this.fill);
      noStroke();
      square(this.x,this.y,20);
    }

    contains(x,y) {
      let insideX = x >= this.x && x <= this.x+size;
      let insideY = y >= this.y && y <= this.y+size;
      return insideX && insideY;
    }
  }


  
function mousePressed(){
    console.log("mouseX: " + mouseX);
    console.log("x: " + x);
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].contains(mouseX, mouseY)) {
        selectedColor = squares[i].fill;
        return; 
      }
    }
    dragging = true; 
      console.log("dragging");
    }

function mouseReleased(){
    dragging = false;
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
