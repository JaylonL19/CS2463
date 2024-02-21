let sprite;
let characters = [];
let clickCount = 0;
let baseSpeed = 1; // Initial speed of characters
let speedIncrease = 0.05; // Amount to increase speed by when one character is clicked
let spawnInterval = 1000; // Interval for spawning new characters (in milliseconds)
let lastSpawnTime = 0; // Time of the last character spawn

function preload() {
  let animations = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 3 },
    walkUp: { row: 0, frames: 4 },
    walkDown: { row: 0, col: 1, frames: 3 }
  };

  characters.push(new Character(200, 200, 80, 80, 'assets/greenBug.png', animations));
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(120);

  if (millis() - lastSpawnTime > spawnInterval) {
    spawnCharacter();
    lastSpawnTime = millis();
  }

  characters.forEach((character) => {
    character.move();
  });

  fill(255);
  textSize(20);
  text("Bugs squished: " + clickCount, 10, 30);

}

function spawnCharacter() {
  let x = random(width); 
  let y = random(height); 
  let animations = {
    stand: { row: 0, frames: 1 },
    walkRight: { row: 0, col: 1, frames: 3 },
    walkUp: { row: 0, frames: 4 },
    walkDown: { row: 0, col: 1, frames: 3 }
  };
  let character = new Character(x, y, 80, 80, 'assets/greenBug.png', animations);
  characters.push(character);
}

class Character {
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
    }
    if (this.sprite.y + this.sprite.height / 2 > height || this.sprite.y - this.sprite.height / 2 < 0) {
      this.vy *= -1;
    }
  }

  handleClick(x, y) {
    if (dist(x, y, this.sprite.x, this.sprite.y) < this.sprite.width / 2) {
      // If clicked within the character's bounding box
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
}

function mouseClicked() {
  characters.forEach((character) => {
    character.handleClick(mouseX, mouseY);
  });
}
