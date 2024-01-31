function setup() {
  createCanvas(600, 600);
  colorMode(HSB,360,100,100);
  angleMode(DEGREES);
}

function draw() {
  background('blue');

  stroke('white');
  strokeWeight(5);
  fill('green');
  circle(300,300,250);

  stroke('white');
  strokeWeight(5);
  fill('red');
  drawStar(300, 300, 120, 45, 5);
}

function drawStar(x, y, radius1, radius2, npoints) {
  let angle = 360 / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = -90; a < 270; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);

}