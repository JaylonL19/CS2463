function setup() {
  createCanvas(600, 600);
 
  angleMode(DEGREES);
}

function draw() {
  background('white');
  noStroke();

  fill(255, 0, 0, 100); 
  ellipse(200, 150, 100, 100);

  fill(0, 255, 0, 100); 
  ellipse(235, 195, 100, 100);

  fill(0, 0, 255, 100); 
  ellipse(165, 195, 100, 100);
}
