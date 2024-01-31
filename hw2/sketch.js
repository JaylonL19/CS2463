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
  fill('red');
  arc(350, 350, 180, 380, 0, PI + QUARTER_PI, CHORD);
 describe('A white ellipse with a black outline missing a section from the top-right.');
}
