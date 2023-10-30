import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Drop from './Drop.js'
import Projectile from './Projectile.js'
import Shoot from './Shoot.js'
import Slash from './Slash.js'
import Radius from './Radius.js'
import Boomerang from './Boomerang.js'

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

    this.player = new Player(this)
    this.projectile = new Projectile(this)
    this.shoot = new Shoot(this)
    this.slash = new Slash(this)
    this.radius = new Radius(this)
    this.boomerang = new Boomerang(this)
  }

  update(deltaTime) {
    //console.log("Shoot: " + this.shoot.upgradeAmount, this.shoot.interval, this.shoot.damage, this.shoot.speed + " Slash: " + this.slash.upgradeAmount, this.slash.interval, this.slash.damage, this.slash.speed)
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
          let rollAffectedWeapon = Math.floor(Math.random() * 4)
          let rollStatUpgrade = Math.floor(Math.random() * 2)
          console.log("Affect weapon: " + rollAffectedWeapon)
          console.log("Affect upgrade: " + rollStatUpgrade)
          if (rollAffectedWeapon == 0) {
            if (rollStatUpgrade == 0) { this.shoot.interval -= 25 }
            else if (rollStatUpgrade == 1) { this.shoot.damage += 5 }
            this.shoot.upgradeAmount++
          }
          else if (rollAffectedWeapon == 1) {
            if (this.slash.upgradeAmount == 0) { this.slash.interval = 2500 }
            else {
              if (rollStatUpgrade == 0) { this.slash.interval -= 75 }
              else if (rollStatUpgrade == 1) { this.slash.damage += 10 }
            }
            this.slash.upgradeAmount++
          }
          else if (rollAffectedWeapon == 2) {
            if (this.radius.upgradeAmount == 0) { this.radius.interval = 2000 }
            else {
              if (rollStatUpgrade == 0) { this.radius.interval -= 50 }
              else if (rollStatUpgrade == 1) { this.radius.damage += 1 }
            }
            this.radius.upgradeAmount++
          }
          else if (rollAffectedWeapon == 3) {
            if (this.boomerang.upgradeAmount == 0) { this.boomerang.interval = 1500 }
            else {
              if (rollStatUpgrade == 0) { this.boomerang.interval -= 40 }
              else if (rollStatUpgrade == 1) { this.boomerang.damage += 8 }
            }
            this.boomerang.upgradeAmount++
          }
          enemy.markedForDeletion = true
        }
      }
      this.player.projectiles.forEach((projectile) => {
        if (this.checkCollision(projectile, enemy)) {
          if (enemy.type === 'drop') { }
          else {
            if (enemy.lives < 1) {
              if (Math.random() < 1) {
                this.enemies.push(new Drop(this, enemy.x, enemy.y))
              }
              enemy.markedForDeletion = true
            } else {
              if (projectile.type === 'shoot') {
                enemy.lives -= this.shoot.damage
                projectile.markedForDeletion = true
              }
              else if (projectile.type === 'slash') { enemy.lives -= this.slash.damage }
              else if (projectile.type === 'radius') { enemy.lives -= this.radius.damage }
              else if (projectile.type === 'boomerang') {
                enemy.lives -= this.boomerang.damage
                projectile.markedForDeletion = true
              }
            }
          }
        }
      })
    })
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)

    if (this.shoot.timer > this.shoot.interval) {
      this.player.shoot(this.input.mouseX, this.input.mouseY)
      this.shoot.timer = 0
    }
    else {
      this.shoot.timer += deltaTime
    }

    if (this.slash.timer > this.slash.interval) {
      this.player.slash(this.input.mouseX, this.input.mouseY)
      this.slash.timer = 0
    }
    else {
      this.slash.timer += deltaTime
    }

    if (this.radius.timer > this.radius.interval) {
      this.player.radius(this.input.mouseX, this.input.mouseY)
      this.radius.timer = 0
    }
    else {
      this.radius.timer += deltaTime
    }

    if (this.boomerang.timer > this.boomerang.interval) {
      this.player.boomerang(this.input.mouseX, this.input.mouseY)
      this.boomerang.timer = 0
    }
    else {
      this.boomerang.timer += deltaTime
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
