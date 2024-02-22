let sprite;
let characters = [];
let clickCount = 0;
let baseSpeed = 1; // Initial speed of characters
let speedIncrease = 0.05; // Amount to increase speed by when one character is clicked
let spawnInterval = 1000; // Interval for spawning new characters (in milliseconds)
let lastSpawnTime = 0; // Time of the last character spawn
let startTime; // Variable to store the start time of the sketch
let runningTime = 30000; // Time to run the sketch (in milliseconds)

function preload() {
  let animations = {
    
    walkRight: { row: 1, frames: 4 },
    walkUp: { row: 0, frames: 4 },
    walkDown: { row: 2, frames: 4 },
    dead: {row: 4, frame:1}
  };

  characters.push(new Bug(200, 200, 80, 80, 'assets/blueBug.png', animations));
}

function setup() {
  createCanvas(400, 400);
  startTime = millis();
}

function draw() {
  background(120);
  let timeRemaining = Math.max(0, Math.ceil((runningTime - (millis() - startTime)) / 1000));

  // Display the time remaining
  fill(255);
  textSize(20);
  text("Time remaining: " + timeRemaining + " seconds", 10, 30);

  // Check if less than 30 seconds have passed
  if (millis() - startTime < runningTime) {
    if (millis() - lastSpawnTime > spawnInterval) {
      spawnCharacter();
      lastSpawnTime = millis();
    }

    characters.forEach((character) => {
      character.move();
    });

    fill(255);
    textSize(20);
    text("Bugs squished: " + clickCount, 10, 60); 
  } else {
    characters.forEach(character => {
      character.sprite.visible = false; // Make all characters invisible
    });
    
    fill(255);
    textSize(40);
    textAlign(CENTER, CENTER);
    text("Game Over", width / 2, height / 2);
    noLoop(); // Stop the draw loop
    console.log("Sketch stopped after 30 seconds.");
  }
}

function spawnCharacter() {
  let x = random(width); 
  let y = random(height); 
  let animations = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 1, frames: 4 },
    walkUp: { row: 0, frames: 4 },
    walkDown: { row: 2, frames: 4 },
    dead: {row: 4, frame: 1}
  };
  let character = new Bug(x, y, 80, 80, 'assets/blueBug.png', animations);
  characters.push(character);
}

class Bug {
  constructor(x, y, width, height, spriteSheet, animations) {
    this.sprite = new Sprite(x, y, width, height);
    this.sprite.spriteSheet = spriteSheet;
    this.sprite.collider = 'none';
    this.sprite.anis.frameDelay = 8;
    this.sprite.addAnis(animations);
    this.sprite.changeAni('walkRight'); // Start with walkRight animation
    this.vx = random(-baseSpeed, baseSpeed); // Random horizontal velocity
    this.vy = random(-baseSpeed, baseSpeed); // Random vertical velocity
  }

  move() {
    // Update character position
    this.sprite.x += this.vx;
    this.sprite.y += this.vy;

    // Reverse direction if character reaches canvas boundaries
    if (this.sprite.x + this.sprite.width / 2 > width || this.sprite.x - this.sprite.width / 2 < 0) {
      this.vx *= -1;
      Bug.walkLeft;
    }
    if (this.sprite.y + this.sprite.height / 2 > height || this.sprite.y - this.sprite.height / 2 < 0) {
      this.vy *= -1;
      Bug.walkDown;
    }

  }

  handleClick(x, y) {
    if (dist(x, y, this.sprite.x, this.sprite.y) < this.sprite.width / 2) {
      // If clicked within the character's bounding box
      Bug.dead
      this.sprite.visible = false; // Make the character invisible
      clickCount++; // Increment the click count
    }

    characters.forEach((character) => {
      if (character !== this) {
        // Increase the velocity of other characters
        character.vx *= (1+ speedIncrease);
        character.vy *= ( 1+ speedIncrease);
      }
    });
  }

  dead() {
    this.sprite.vel.x = 0;
    this.sprite.vel.y = 0;
    this.sprite.changeAni('dead');
  }
  
  
  walkRight() {
    this.sprite.changeAni('walkRight');
      this.sprite.vel.x = 1;
      this.sprite.scale.x = 1;
      this.sprite.vel.y = 0;
  }
  
   walkLeft() {
    this.sprite.changeAni('walkRight');
      this.sprite.vel.x = -1;
      this.sprite.scale.x = -1;
      this.sprite.vel.y = 0;
  }
  
   walkUp() {
    this.sprite.changeAni('walkUp');
    this.sprite.vel.y = -1;
    this.sprite.vel.x = 0;
  }
  
   walkDown() {
    this.sprite.changeAni('walkDown');
    this.sprite.vel.y = 1;
    this.sprite.vel.x = 0;
  }
}

function mouseClicked() {
  characters.forEach((character) => {
    character.handleClick(mouseX, mouseY);
  });
}
