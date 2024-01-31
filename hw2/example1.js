function setup() {
    createCanvas(400, 400);
    colorMode(HSB,360,100,100);
    angleMode(DEGREES);
  }
  
  function draw() {
    background('greenyellow');
  
    stroke(0);
    strokeWeight(2);
    ellipse(80, 150, 100, 100);

    stroke(0);
    strokeWeight(2);
    square(200,100,100);
  }