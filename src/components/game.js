/* eslint-disable no-undef */
import React from "react";
import PropTypes from "prop-types";
import player from '../assets/player.png';
import layer1 from '../assets/layer-1.png';
import layer2 from '../assets/layer-2.png';
import layer3 from '../assets/layer-3.png';
import layer4 from '../assets/layer-4.png';
import layer5 from '../assets/layer-5.png';
import enemy_fly from '../assets/enemy_fly.png';
import enemy_plant from '../assets/enemy_plant.png';
import enemy_spider from '../assets/enemy_spider.png';
import enemy_spider_big from '../assets/enemy_spider_big.png';
import fire from '../assets/fire.png';
import boom from '../assets/boom.png';
import lives from '../assets/lives.png';

function Game() {
    const canvas = React.useRef();
    const windowWidth = React.useRef(window.innerWidth);
    const windowHeight = React.useRef(window.innerHeight);
    React.useEffect(() => {
   const ctx = canvas.current.getContext("2d");
   console.log(canvas)
    canvas.width = 800;
    canvas.height = 800;
        class Game {
            constructor(width, height) {
              this.width = width;
              this.height = height;
            }
            start() {
              this.background = new Background(this);
              this.groundMargin = 80 * this.background.scaleFactor;
              this.player = new Player(this);
              this.input = new InputHandler(this);
              this.speed = 0;
              this.maxSpeed = 6;
              this.enemies = [];
              this.particles = [];
              this.maxParticles = 50;
              this.collisions = [];
              this.floatingMessages = [];
              this.enemyTimer = 0;
              this.enemyInterval = 1000;
              this.debug = false;
              this.score = 0;
              this.fontColor = "black";
              this.ui = new UI(this);
              this.time = 0;
              this.maxTime = 100000000;
              this.lives = 5;
              this.gameOver = false;
              this.player.currentState = this.player.states[0];
              this.player.currentState.enter();
            }
            draw(context) {
              this.background.draw(context);
              this.player.draw(context);
              this.enemies.forEach((e) => {
                e.draw(context);
              });
              // handle particles
              this.particles.forEach((p) => {
                p.draw(context);
              });
              // handle collisions
              this.collisions.forEach((c) => {
                c.draw(context);
              });
              // handle floating messages
              this.floatingMessages.forEach((m, index) => {
                m.draw(context);
              });
              this.ui.draw(context);
            }
            update(delta) {
              this.time += delta;
              if (this.time > this.maxTime) {
                this.gameOver = true;
              }
              this.background.update();
              this.player.update(this.input.keys, delta);
              // handle enemies
              if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy();
                this.enemyTimer = 0;
              } else {
                this.enemyTimer += delta;
              }
              this.enemies.forEach((e) => {
                e.update(delta);
              });
              this.enemies = this.enemies.filter((e) => !e.markForDeletion);
              // handle particles
              this.particles.forEach((p) => {
                p.update();
              });
              if (this.particles.length > this.maxParticles) {
                this.particles = this.particles.slice(0, this.maxParticles);
              }
              this.particles = this.particles.filter((p) => !p.markForDeletion);
              // handle collisions
              this.collisions.forEach((c) => {
                c.update(delta);
              });
              this.collisions = this.collisions.filter((c) => !c.markForDeletion);
              // handle floating messages
              this.floatingMessages.forEach((m) => {
                m.update();
              });
              this.floatingMessages = this.floatingMessages.filter((m) => !m.markForDeletion);
            }
            addEnemy() {
              if (this.speed > 0 && Math.random() < 0.5) this.enemies.push(new GroundEnemy(this));
              else if (this.speed > 0) this.enemies.push(new ClimbingEnemy(this));
              this.enemies.push(new FlyingEnemy(this));
            }
          }
          const game = new Game(canvas.width, canvas.height);
  game.start();

  function restartGame() {
    game.start();
    animate(0);
  }

  let lastTime = 0;
  function animate(timestamp) {
    const delta = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    game.update(delta);
    game.draw(ctx);
    if (!game.gameOver) {
      requestAnimationFrame(animate);
    }
  }
  animate(0);

  window.addEventListener("keydown", (e) => {
    if (e.key === "r" && game.gameOver) {
      restartGame();
    }
  });
      });
    class Layer {
        constructor(game, width, height, speedModifier, image) {
          this.game = game;
          this.width = width;
          this.height = height;
          this.speedModifier = speedModifier;
          this.image = image;
          this.x = 0;
          this.y = 0;
        }
        update() {
          if (this.x < -this.width) this.x = 0;
          else this.x -= this.game.speed * this.speedModifier;
        }
        draw(context) {
          context.drawImage(this.image, this.x, this.y, this.width, this.height);
          context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
      }
      
      class Background {
        constructor(game) {
          this.game = game;
          this.imageWidth = 1667;
          this.imageHeight = 500;
          this.scaleFactor = this.game.height / this.imageHeight;
          this.width = this.imageWidth * this.scaleFactor;
          this.height = this.imageHeight * this.scaleFactor;
          this.layer5Image = layer5Image;
          this.layer4Image = layer4Image;
          this.layer3Image = layer3Image;
          this.layer2Image = layer2Image;
          this.layer1Image = layer1Image;
          this.layer1 = new Layer(this.game, this.width, this.height, 0, this.layer1Image);
          this.layer2 = new Layer(this.game, this.width, this.height, 0.2, this.layer2Image);
          this.layer3 = new Layer(this.game, this.width, this.height, 0.4, this.layer3Image);
          this.layer4 = new Layer(this.game, this.width, this.height, 0.8, this.layer4Image);
          this.layer5 = new Layer(this.game, this.width, this.height, 1, this.layer5Image);
          this.backgroundLayers = [this.layer1, this.layer2, this.layer3, this.layer4, this.layer5];
        }
        update() {
          this.backgroundLayers.forEach((b) => {
            b.update();
          });
        }
        draw(context) {
          this.backgroundLayers.forEach((b) => {
            b.draw(context);
          });
        }
      }

      class Enemy {
        constructor() {
          this.frameX = 0;
          this.frameY = 0;
          this.fps = 20;
          this.frameInterval = 1000 / this.fps;
          this.frameTimer = 0;
          this.markForDeletion = false;
        }
        update(deltaTime) {
          // movement
          this.x -= this.speedX + this.game.speed;
          this.y += this.speedY;
          if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
          } else this.frameTimer += deltaTime;
          // check off screen
          if (this.x + this.width < 0) this.markForDeletion = true;
        }
        draw(context) {
          if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
          }
          context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
      }
      
      class FlyingEnemy extends Enemy {
        constructor(game) {
          super();
          this.game = game;
          this.width = 60;
          this.height = 44;
          this.x = this.game.width + Math.random() * this.game.width * 0.5;
          this.y = Math.random() * this.game.height * 0.5;
          this.speedX = Math.random() + 1;
          this.speedY = 0;
          this.maxFrame = 5;
          this.image = flyImage;
          this.angle = 0;
          this.va = Math.random() * 0.1 + 0.1; // velocity angle
        }
        update(deltaTime) {
          super.update(deltaTime);
          this.angle += this.va;
          this.y += Math.sin(this.angle);
        }
      }

      class GroundEnemy extends Enemy {
        constructor(game) {
          super();
          this.game = game;
          this.width = 60;
          this.height = 87;
          this.x = this.game.width;
          this.y = this.game.height - this.height - this.game.groundMargin;
          this.speedX = 0;
          this.speedY = 0;
          this.maxFrame = 1;
          this.image = plantImage;
        }
      }
      class ClimbingEnemy extends Enemy {
        constructor(game) {
          super();
          this.game = game;
          this.width = 120;
          this.height = 144;
          this.x = this.game.width;
          this.y = Math.random() * this.game.height * 0.5;
          this.image = spiderBigImage;
          this.speedX = 0;
          this.speedY = Math.random() > 0.5 ? 1 : -1;
          this.maxFrame = 5;
        }
        update(deltaTime) {
          super.update(deltaTime);
          if (this.y > this.game.height - this.height - this.game.groundMargin) this.speedY *= -1;
          if (this.y < -this.height) this.markForDeletion = true;
        }
        draw(context) {
          super.draw(context);
          context.beginPath();
          context.moveTo(this.x + this.width / 2, 0);
          context.lineTo(this.x + this.width / 2, this.y + 50);
          context.stroke();
        }
      }

      class InputHandler {
        constructor(game) {
          this.keys = [];
          window.addEventListener("keydown", (e) => {
            if (this.keys.indexOf(e.key) === -1 && ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Enter", "Space", "r", "R"].includes(e.key)) {
              this.keys.push(e.key);
            } else if (e.key === "d") {
              game.debug = !game.debug;
            }
          });
          window.addEventListener("keyup", (e) => {
            if (this.keys.indexOf(e.key) !== -1) {
              this.keys.splice(this.keys.indexOf(e.key), 1);
            }
          });
        }
      }

      class Player {
        constructor(game) {
          this.game = game;
          this.width = 100;
          this.height = 91.3;
          this.x = 0;
          this.y = this.game.height - this.height - this.game.groundMargin;
          this.vy = 0;
          this.image = playerImage;
          this.frameX = 0;
          this.frameY = 0;
          this.maxFrame = 5;
          this.fps = 20;
          this.frameInterval = 1000 / this.fps;
          this.frameTimer = 0;
          this.speed = 0;
          this.maxSpeed = 10;
          this.weight = 1;
          this.states = [new Sitting(game), new Running(game), new Jumping(game), new Falling(game), new Rolling(game), new Diving(game), new Hit(game)];
          this.currentState = null;
        }
        update(inputKeys, delta) {
          this.checkCollisions();
          this.currentState.handleInput(inputKeys);
          // horizontal movement
          this.x += this.speed;
          if (inputKeys.includes("ArrowRight") && this.currentState !== this.states[6]) {
            this.speed = this.maxSpeed;
          } else if (inputKeys.includes("ArrowLeft") && this.currentState !== this.states[6]) {
            this.speed = -this.maxSpeed;
          } else this.speed = 0;
          // horizontal boundaries
          if (this.x < 0) this.x = 0;
          if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
          // vertical movement
          this.y += this.vy;
          if (!this.onGround()) this.vy += this.weight;
          else this.vy = 0;
          // vertical boundaries
          if (this.y > this.game.height - this.height - this.game.groundMargin) {
            this.y = this.game.height - this.height - this.game.groundMargin;
          }
          // sprite animation
          if (this.frameTimer > this.frameInterval) {
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
          } else {
            this.frameTimer += delta;
          }
        }
        draw(context) {
          if (this.game.debug) {
            context.strokeRect(this.x, this.y, this.width, this.height);
          }
          context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
        }
        onGround() {
          return this.y >= this.game.height - this.height - this.game.groundMargin;
        }
        setState(stateIndex, speed) {
          this.currentState = this.states[stateIndex];
          this.game.speed = this.game.maxSpeed * speed;
          this.currentState.enter();
        }
        checkCollisions() {
          this.game.enemies.forEach((enemy) => {
            if (enemy.x < this.x + this.width && enemy.x + enemy.width > this.x && enemy.y < this.y + this.height && enemy.y + enemy.height > this.y) {
              enemy.markForDeletion = true;
              this.game.collisions.push(new CollisionAnimation(this.game, enemy.x + enemy.width * 0.5, enemy.y + enemy.height * 0.5));
              if (this.currentState === this.states[4] || this.currentState === this.states[5]) {
                this.game.score++;
                this.game.floatingMessages.push(new FloatingMessage("+1", enemy.x, enemy.y, 150, 50));
              } else {
                this.game.lives--;
                if (this.game.lives === 0) {
                  this.game.gameOver = true;
                }
                this.setState(6, 0);
              }
            }
          });
        }
      }

      const states = {
        SITTING: 0,
        RUNNING: 1,
        JUMPING: 2,
        FALLING: 3,
        ROLLING: 4,
        DIVING: 5,
        HIT: 6,
      };
      
      class State {
        constructor(state, game) {
          this.state = state;
          this.game = game;
        }
      }
      
      class Sitting extends State {
        constructor(game) {
          super("SITTING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 5;
          this.game.player.maxFrame = 4;
        }
        handleInput(inputKeys) {
          if (inputKeys.includes("ArrowLeft") || inputKeys.includes("ArrowRight")) this.game.player.setState(states.RUNNING, 1);
          else if (inputKeys.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
          }
        }
      }
      
      class Running extends State {
        constructor(game) {
          super("RUNNING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.maxFrame = 8;
          this.game.player.frameY = 3;
        }
        handleInput(inputKeys) {
          this.game.particles.unshift(new Dust(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height));
          if (inputKeys.includes("ArrowDown")) this.game.player.setState(states.SITTING, 0);
          else if (inputKeys.includes("ArrowUp")) this.game.player.setState(states.JUMPING, 1);
          else if (inputKeys.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
          }
        }
      }
      
      class Jumping extends State {
        constructor(game) {
          super("JUMPING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 1;
          this.game.player.maxFrame = 6;
          if (this.game.player.onGround()) this.game.player.vy = -27;
        }
        handleInput(inputKeys) {
          if (this.game.player.vy > this.game.player.weight) this.game.player.setState(states.FALLING, 1);
          else if (inputKeys.includes("Enter")) {
            this.game.player.setState(states.ROLLING, 2);
          } else if (inputKeys.includes("ArrowDown") && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0);
          }
        }
      }
      
      class Falling extends State {
        constructor(game) {
          super("FALLING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 2;
          this.game.player.maxFrame = 6;
        }
        handleInput(inputKeys) {
          if (this.game.player.onGround()) this.game.player.setState(states.RUNNING, 1);
          else if (inputKeys.includes("ArrowDown") && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0);
          }
        }
      }
      
      class Rolling extends State {
        constructor(game) {
          super("ROLLING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 6;
          this.game.player.maxFrame = 6;
        }
        handleInput(inputKeys) {
          this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
          if (!inputKeys.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (!inputKeys.includes("Enter") && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
          } else if (inputKeys.includes("Enter") && inputKeys.includes("ArrowUp") && this.game.player.onGround()) {
            this.game.player.vy -= 27;
          } else if (inputKeys.includes("ArrowDown") && !this.game.player.onGround()) {
            this.game.player.setState(states.DIVING, 0);
          }
        }
      }
      
      class Diving extends State {
        constructor(game) {
          super("DIVING", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 6;
          this.game.player.maxFrame = 6;
          this.game.player.vy = 15;
        }
        handleInput(inputKeys) {
          this.game.particles.unshift(new Fire(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
          if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
            for (let i = 0; i < 30; i++) {
              this.game.particles.unshift(new Splash(this.game, this.game.player.x + this.game.player.width * 0.5, this.game.player.y + this.game.player.height * 0.5));
            }
          } else if (inputKeys.includes("Enter") && this.game.player.onGround()) {
            this.game.player.setState(states.ROLLING, 2);
          }
        }
      }
      
      class Hit extends State {
        constructor(game) {
          super("HIT", game);
        }
        enter() {
          this.game.player.frameX = 0;
          this.game.player.frameY = 4;
          this.game.player.maxFrame = 10;
        }
        handleInput(inputKeys) {
          if (this.game.player.frameX >= 10 && this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, 1);
          } else if (this.game.player.frameX >= 10 && !this.game.player.onGround()) {
            this.game.player.setState(states.FALLING, 1);
          }
        }
      }

      class Particle {
        constructor(game) {
          this.game = game;
          this.markForDeletion = false;
        }
        update() {
          this.x -= this.speedX + this.game.speed;
          this.y -= this.speedY;
          this.size *= 0.95;
          if (this.size < 0.5) this.markForDeletion = true;
        }
      }
      
      class Dust extends Particle {
        constructor(game, x, y) {
          super(game);
          this.size = Math.random() * 10 + 10;
          this.x = x;
          this.y = y;
          this.speedX = Math.random();
          this.speedY = Math.random();
          this.color = "rgba(0,0,0,0.3)";
        }
        draw(context) {
          context.beginPath();
          context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          context.fillStyle = this.color;
          context.fill();
        }
      }
      
      class Splash extends Particle {
        constructor(game, x, y) {
          super(game);
          this.size = Math.random() * 100 + 100;
          this.x = x - this.size * 0.4;
          this.y = y - this.size * 0.5;
          this.speedX = Math.random() * 6 - 4;
          this.speedY = Math.random() * 4 + 1;
          this.gravity = 0;
          this.image = fireTexture;
        }
        draw(context) {
          context.drawImage(this.image, this.x, this.y, this.size, this.size);
        }
        update() {
          super.update();
          this.gravity += 0.1;
          this.y += this.gravity;
        }
      }
      
      class Fire extends Particle {
        constructor(game, x, y) {
          super(game);
          this.image = fireTexture;
          this.size = Math.random() * 50 + 50;
          this.x = x;
          this.y = y;
          this.speedX = 1;
          this.speedY = 1;
          this.angle = 0;
          this.va = Math.random() * 0.2 - 0.1;
        }
        draw(context) {
          context.save();
          context.translate(this.x, this.y);
          context.rotate(this.angle * 5);
          context.drawImage(this.image, -this.size * 0.5, -this.size * 0.5, this.size, this.size);
          context.restore();
        }
        update() {
          super.update();
          this.angle += this.va;
          this.x += Math.sin(this.angle);
        }
      }

      class FloatingMessage {
        constructor(value, x, y, targetX, targetY) {
          this.value = value;
          this.x = x;
          this.y = y;
          this.targetX = targetX;
          this.targetY = targetY;
          this.timer = 0;
          this.markForDeletion = false;
        }
        update() {
          this.x += (this.targetX - this.x) * 0.03;
          this.y += (this.targetY - this.y) * 0.03;
          this.timer++;
          if (this.timer > 100) {
            this.markForDeletion = true;
          }
        }
        draw(context) {
          context.font = "20px " + this.fontFamily;
          context.fillStyle = "white";
          context.fillText(this.value, this.x, this.y);
          context.fillStyle = "black";
          context.fillText(this.value, this.x - 2, this.y - 2);
        }
      }

      class CollisionAnimation {
        constructor(game, x, y) {
          this.game = game;
          this.image = boomImage;
          this.x = x;
          this.y = y;
          this.spriteWidth = 100;
          this.spriteHeight = 90;
          this.sizeModifier = Math.random() + 0.5;
          this.width = this.spriteWidth * this.sizeModifier;
          this.height = this.spriteHeight * this.sizeModifier;
          this.x = x - this.width * 0.5;
          this.y = y - this.height * 0.5;
          this.frameX = 0;
          this.maxFrame = 4;
          this.markForDeletion = false;
          this.fps = Math.random() * 10 + 5;
          this.frameInterval = 1000 / this.fps;
          this.frameTimer = 0;
        }
        draw(context) {
          context.drawImage(this.image, this.frameX * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
        }
        update(delta) {
          this.x -= this.game.speed;
          if (this.frameTimer > this.frameInterval) {
            this.frameX++;
            if (this.frameX > this.maxFrame) this.markForDeletion = true;
            this.frameTimer = 0;
          } else this.frameTimer += delta;
        }
      }

      class UI {
        constructor(game) {
          this.game = game;
          this.fontSize = 30;
          this.fontFamily = "Helvetica";
          this.livesImage = liveImage;
        }
        draw(context) {
          context.font = this.fontSize + "px " + this.fontFamily;
          context.textAlign = "left";
          context.fillStyle = this.game.fontColor;
          // score
          context.fillText("Score: " + this.game.score, 20, 50);
          // timer
          context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
          context.fillText("Time: " + Math.floor(this.game.time * 0.001) + "s", 20, 80);
          // lives
          for (let i = 0; i < this.game.lives; i++) {
            context.drawImage(this.livesImage, 20 + 25 * i, 95, 25, 25);
          }
          // game over
          if (this.game.gameOver) {
            context.textAlign = "center";
            context.font = this.fontSize * 2 + "px " + this.fontFamily;
            if (this.game.score > 5) {
              context.fillText("Boo-yeah", this.game.width * 0.5, this.game.height * 0.5 - 20);
              context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
              context.fillText("What are the creatures of the night afraid of? YOU!!!", this.game.width * 0.5, this.game.height * 0.5 + 20);
            } else {
              context.fillText("Game over", this.game.width * 0.5, this.game.height * 0.5 - 20);
              context.font = this.fontSize * 0.7 + "px " + this.fontFamily;
              context.fillText("Better luck next time, press R to restart the game!", this.game.width * 0.5, this.game.height * 0.5 + 20);
            }
          }
        }
      }
      
      

    return (
      <div className="game">
          <canvas id="canvas1" ref={canvas} />
          <img id="playerImage" src={player} alt="" />
    <img id="layer1Image" src={layer1} alt="" />
    <img id="layer2Image" src={layer2} alt="" />
    <img id="layer3Image" src={layer3} alt="" />
    <img id="layer4Image" src={layer4} alt="" />
    <img id="layer5Image" src={layer5} alt="" />
    <img id="flyImage" src={enemy_fly} alt=""/>
    <img id="plantImage" src={enemy_plant} alt=""/>
    <img id="spiderImage" src={enemy_spider} alt=""/>
    <img id="spiderBigImage" src={enemy_spider_big} alt=""/>
    <img id="fireTexture" src={fire} alt=""/>
    <img id="boomImage" src={boom} alt=""/>
    <img id="liveImage" src={lives} alt=""/>
      </div>
    );
  }

  Game.propTypes = {
    draw: PropTypes.func.isRequired,
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired
  };  
  
  export default Game;