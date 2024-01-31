function setup() {
  createCanvas(600, 400);
  colorMode(HSB,360,100,100);
  angleMode(DEGREES);
}

function draw() {
  background('black');

  stroke(0);
  strokeWeight(2);
  fill('yellow');
  arc(150,150, 200, 200, -130, 140)

  stroke(0);
  strokeWeight(2);
  fill('crimson');
  arc(450, 200, 210, 300, -205, 25, PI);
  
  noStroke();
  fill('white');
  circle(400,150,50);

  noStroke();
  fill('mediumblue');
  circle(400,150,20);

  noStroke();
  fill('white');
  circle(500,150,50);

  noStroke();
  fill('mediumblue');
  circle(500,150,20);
}
