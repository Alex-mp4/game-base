import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Drop from './Drop.js'
import Shoot from './Shoot.js'
import Slash from './Slash.js'
export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1
    this.debug = false
    this.gameTime = 0

    this.damageTimer = 0
    this.damageInterval = 400

    this.enemies = []
    this.enemyTimer = 0
    this.enemyInterval = 2000

    this.projectiles = []

    this.gunTimer = 0
    this.gunInterval = 1000

    this.slashTimer = 0
    this.slashInterval = 2500

    this.player = new Player(this)
  }

  update(deltaTime) {
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }

    let x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
    let y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge

    if (this.enemyTimer > this.enemyInterval) {
      if (x === 0) {
        y = Math.random() * this.height // if on left edge, randomize y position
      } else if (x === this.width) {
        y = Math.random() * this.height // if on right edge, randomize y position
      } else if (y === 0) {
        x = Math.random() * this.width // if on top edge, randomize x position
      } else {
        x = Math.random() * this.width // if on bottom edge, randomize x position
      }
      this.enemies.push(new Pumpkin(this, x, y))
      this.enemyTimer = 0
    } else {
      this.enemyTimer += deltaTime
    }
    this.player.update(deltaTime)

    this.enemies.forEach((enemy) => {
      enemy.update(this.player)
      if (this.checkCollision(this.player, enemy)) {
        if (enemy.type === 'enemy') {
          if (this.damageTimer > this.damageInterval) {
            this.player.lives--
            this.damageTimer = 0
          }
          else {
            this.damageTimer += deltaTime
          }
        }
        if (enemy.type === 'drop') {
          this.gunInterval -= 10
          enemy.markedForDeletion = true
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.type === 'drop') {
            console.log("Drop hit")
          }
          else {
            if (enemy.lives < 1) {
              if (Math.random() < 0.2) {
                this.enemies.push(new Drop(this, enemy.x, enemy.y))
              }
              enemy.markedForDeletion = true
            } else {
              enemy.lives -= projectile.damage
            }
            if (projectile.type === 'slash') {
              console.log('Slash hit')
            }
            else {
              projectile.markedForDeletion = true
            }
          }
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)

    if (this.gunTimer > this.gunInterval) {
      this.player.shoot(this.input.mouseX, this.input.mouseY)
      this.gunTimer = 0
    }
    else {
      this.gunTimer += deltaTime
    }

    if (this.slashTimer > this.slashInterval) {
      this.player.slash(this.input.mouseX, this.input.mouseY)
      this.slashTimer = 0
    }
    else {
      this.slashTimer += deltaTime
    }
  }

  draw(context) {
    this.ui.draw(context)
    this.player.draw(context)
    this.enemies.forEach((enemy) => {
      enemy.draw(context)
    })
  }

  checkCollision(object1, object2) {
    return (
      object1.x < object2.x + object2.width &&
      object1.x + object1.width > object2.x &&
      object1.y < object2.y + object2.height &&
      object1.height + object1.y > object2.y
    )
  }
}
