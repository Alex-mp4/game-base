import InputHandler from './InputHandler.js'
import Player from './Player.js'
import UserInterface from './UserInterface.js'
import Pumpkin from './Pumpkin.js'
import Vampire from './Vampire.js'
import Warewolf from './Warewolf.js'
import Zombie from './Zombie.js'
import Gremlin from './Gremlin.js'
import Boss1 from './Boss1.js'
import Drop from './Drop.js'
import Projectile from './Projectile.js'
import Shoot from './Shoot.js'
import Slash from './Slash.js'
import Radius from './Radius.js'
import Boomerang from './Boomerang.js'
import Bounce from './Bounce.js'
import Plus from './Plus.js'
import Rain from './Rain.js'
import Homing from './Homing.js'
import Background from './Background.js'

export default class Game {
  constructor(width, height, canvasPosition) {
    this.width = width
    this.height = height
    this.canvasPosition = canvasPosition
    this.background = new Background(this)
    this.input = new InputHandler(this)
    this.ui = new UserInterface(this)
    this.keys = []
    this.gameOver = false
    this.gravity = 1

    this.debug = false
    this.pause = false
    this.start = false

    this.gameTime = 0
    this.timeout
    this.pity = 0
    this.dropChance

    this.choices = false
    this.choice
    this.choiceW1
    this.choiceW2
    this.choiceW3
    this.choiceU1
    this.choiceU2
    this.choiceU3

    this.damageTimer = 0
    this.damageInterval = 400

    this.enemies = []
    this.pumpkinTimer = 0
    this.pumpkinInterval
    this.vampireTimer = 0
    this.vampireInterval
    this.warewolfTimer = 0
    this.warewolfInterval
    this.zombieTimer = 0
    this.zombieInterval
    this.gremlinTimer = 0
    this.gremlinInterval
    this.boss1Timer = 0
    this.boss1Interval = 1000

    this.projectiles = []

    this.player = new Player(this)
    this.projectile = new Projectile(this)
    this.shoot = new Shoot(this)
    this.slash = new Slash(this)
    this.radius = new Radius(this)
    this.boomerang = new Boomerang(this)
    this.bounce = new Bounce(this)
    this.plus = new Plus(this)
    this.rain = new Rain(this)
    this.homing = new Homing(this)
  }

  update(deltaTime) {
    //console.log("Shoot: " + this.shoot.upgradeAmount, this.shoot.interval, this.shoot.damage, this.shoot.speed + " Slash: " + this.slash.upgradeAmount, this.slash.interval, this.slash.damage, this.slash.speed)
    if (!this.gameOver) {
      this.gameTime += deltaTime
    }
    if (this.gameOver) { return }
    if (this.pause) {
      this.gameTime -= deltaTime
      return
    }

    if (this.start === true) {
      // let boss1x = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      // let boss1y = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge

      // if (this.boss1Timer > this.boss1Interval) {
      //   if (boss1x === 0) {
      //     boss1y = Math.random() * this.height // if on left edge, randomize y position
      //   } else if (boss1x === this.width) {
      //     boss1y = Math.random() * this.height // if on right edge, randomize y position
      //   } else if (boss1y === 0) {
      //     boss1x = Math.random() * this.width // if on top edge, randomize x position
      //   } else {
      //     boss1x = Math.random() * this.width // if on bottom edge, randomize x position
      //   }
      //   this.enemies.push(new Boss1(this, boss1x, boss1y))
      //   this.boss1Interval = Infinity
      // }
      // else {
      //   this.boss1Timer += deltaTime
      // }

      this.dropChance = (Math.pow(0.0000016 * this.gameTime, 2) * -1 + 0.3)

      this.pumpkinInterval = (Math.pow((0.00003 * this.gameTime) - 2, 2) + 12) * 180
      this.vampireInterval = (Math.pow((0.00004 * this.gameTime) - 8, 2) + 30) * 80
      this.warewolfInterval = (Math.pow((0.00005 * this.gameTime) - 12, 2) + 25) * 80
      this.zombieInterval = (Math.pow((0.00006 * this.gameTime) - 14, 2) + 25) * 40
      this.gremlinInterval = (Math.pow((0.00007 * this.gameTime) - 16, 2) + 8) * 60

      if (this.gameTime > 350000) {
        this.pumpkinInterval = 200 / (0.0000006 * this.gameTime)
        this.vampireInterval = 300 / (0.0000006 * this.gameTime)
        this.warewolfInterval = 400 / (0.0000006 * this.gameTime)
        this.zombieInterval = 500 / (0.0000006 * this.gameTime)
        this.gremlinInterval = 600 / (0.0000006 * this.gameTime)
      }

      let pumpkinx = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let pumpkiny = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge

      if (this.pumpkinTimer > this.pumpkinInterval) {
        if (pumpkinx === 0) {
          pumpkiny = Math.random() * this.height // if on left edge, randomize y position
        } else if (pumpkinx === this.width) {
          pumpkiny = Math.random() * this.height // if on right edge, randomize y position
        } else if (pumpkiny === 0) {
          pumpkinx = Math.random() * this.width // if on top edge, randomize x position
        } else {
          pumpkinx = Math.random() * this.width // if on bottom edge, randomize x position
        }
        this.enemies.push(new Pumpkin(this, pumpkinx, pumpkiny))
        this.pumpkinTimer = 0
      } else {
        this.pumpkinTimer += deltaTime
      }

      let vampirex = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let vampirey = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge

      if (this.vampireTimer > this.vampireInterval) {
        if (vampirex === 0) {
          vampirey = Math.random() * this.height // if on left edge, randomize y position
        } else if (vampirex === this.width) {
          vampirey = Math.random() * this.height // if on right edge, randomize y position
        } else if (vampirey === 0) {
          vampirex = Math.random() * this.width // if on top edge, randomize x position
        } else {
          vampirex = Math.random() * this.width // if on bottom edge, randomize x position
        }
        this.enemies.push(new Vampire(this, vampirex, vampirey))
        this.vampireTimer = 0
      } else {
        this.vampireTimer += deltaTime
      }

      let warewolfx = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let warewolfy = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge

      if (this.warewolfTimer > this.warewolfInterval) {
        if (warewolfx === 0) {
          warewolfy = Math.random() * this.height // if on left edge, randomize y position
        } else if (warewolfx === this.width) {
          warewolfy = Math.random() * this.height // if on right edge, randomize y position
        } else if (warewolfy === 0) {
          warewolfx = Math.random() * this.width // if on top edge, randomize x position
        } else {
          warewolfx = Math.random() * this.width // if on bottom edge, randomize x position
        }
        this.enemies.push(new Warewolf(this, warewolfx, warewolfy))
        this.warewolfTimer = 0
      } else {
        this.warewolfTimer += deltaTime
      }

      let zombiex = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let zombiey = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge

      if (this.zombieTimer > this.zombieInterval) {
        if (zombiex === 0) {
          zombiey = Math.random() * this.height // if on left edge, randomize y position
        } else if (zombiex === this.width) {
          zombiey = Math.random() * this.height // if on right edge, randomize y position
        } else if (zombiey === 0) {
          zombiex = Math.random() * this.width // if on top edge, randomize x position
        } else {
          zombiex = Math.random() * this.width // if on bottom edge, randomize x position
        }
        this.enemies.push(new Zombie(this, zombiex, zombiey))
        this.zombieTimer = 0
      } else {
        this.zombieTimer += deltaTime
      }

      let gremlinx = Math.random() < 0.5 ? 0 : this.width // spawn on left or right edge
      let gremliny = Math.random() < 0.5 ? 0 : this.height // spawn on top or bottom edge

      if (this.gremlinTimer > this.gremlinInterval) {
        if (gremlinx === 0) {
          gremliny = Math.random() * this.height // if on left edge, randomize y position
        } else if (gremlinx === this.width) {
          gremliny = Math.random() * this.height // if on right edge, randomize y position
        } else if (gremliny === 0) {
          gremlinx = Math.random() * this.width // if on top edge, randomize x position
        } else {
          gremlinx = Math.random() * this.width // if on bottom edge, randomize x position
        }
        this.enemies.push(new Gremlin(this, gremlinx, gremliny))
        this.gremlinTimer = 0
      } else {
        this.gremlinTimer += deltaTime
      }

      this.player.update(deltaTime)

      this.enemies.forEach((enemy) => {
        enemy.update(this.player)
        if (this.checkCollision(this.player, enemy)) {
          if (enemy.type !== 'drop') {
            if (this.damageTimer > this.damageInterval) {
              this.player.lives--
              this.damageTimer = 0
            }
            else {
              this.damageTimer += deltaTime
            }
          }
          if (enemy.type === 'drop') {
            enemy.markedForDeletion = true
            this.pause = true
            this.choices = true
            let rollAffectedWeapon
            this.choiceW1 = Math.floor(Math.random() * 7)
            this.choiceW2 = Math.floor(Math.random() * 7)
            this.choiceW3 = Math.floor(Math.random() * 7)
            let rollStatUpgrade
            this.choiceU1 = Math.floor(Math.random() * 2)
            this.choiceU2 = Math.floor(Math.random() * 2)
            this.choiceU3 = Math.floor(Math.random() * 2)

            this.timeout = setTimeout(tooSlow, 2999)
            function tooSlow() {
              return Math.floor(Math.random() * 3)
            }
            this.choice = tooSlow()

            setTimeout(() => {
              if (this.choice === 0) {
                rollAffectedWeapon = this.choiceW1
                rollStatUpgrade = this.choiceU1
              }
              if (this.choice === 1) {
                rollAffectedWeapon = this.choiceW2
                rollStatUpgrade = this.choiceU2
              }
              if (this.choice === 2) {
                rollAffectedWeapon = this.choiceW3
                rollStatUpgrade = this.choiceU3
              }

              //console.log("Affect weapon: " + rollAffectedWeapon)
              //console.log("Affect upgrade: " + rollStatUpgrade)
              if (rollAffectedWeapon == 0) {
                if (rollStatUpgrade == 0) { this.shoot.interval -= 50 }
                else if (rollStatUpgrade == 1) { this.shoot.damage += 5 }
                this.shoot.upgradeAmount++
              }
              else if (rollAffectedWeapon == 1) {
                if (this.slash.upgradeAmount == 0) { this.slash.interval = 3500 }
                else {
                  if (rollStatUpgrade == 0) { this.slash.interval -= 125 }
                  else if (rollStatUpgrade == 1) { this.slash.damage += 10 }
                }
                this.slash.upgradeAmount++
              }
              else if (rollAffectedWeapon == 2) {
                if (this.radius.upgradeAmount == 0) { this.radius.interval = 2500 }
                else {
                  if (rollStatUpgrade == 0) { this.radius.interval -= 100 }
                  else if (rollStatUpgrade == 1) { this.radius.damage += 2 }
                }
                this.radius.upgradeAmount++
                if (this.radius.upgradeAmount === 10) {
                  this.radius.disInterval += 50
                }
              }
              else if (rollAffectedWeapon == 3) {
                if (this.boomerang.upgradeAmount == 0) { this.boomerang.interval = 2000 }
                else {
                  if (rollStatUpgrade == 0) { this.boomerang.interval -= 80 }
                  else if (rollStatUpgrade == 1) { this.boomerang.damage += 8 }
                }
                this.boomerang.upgradeAmount++
              }
              else if (rollAffectedWeapon == 4) {
                if (this.bounce.upgradeAmount == 0) { this.bounce.interval = 2250 }
                else {
                  if (rollStatUpgrade == 0) { this.bounce.interval -= 65 }
                  else if (rollStatUpgrade == 1) { this.bounce.damage += 6 }
                }
                this.bounce.upgradeAmount++
              }
              else if (rollAffectedWeapon == 5) {
                if (this.plus.upgradeAmount == 0) { this.plus.interval = 2500 }
                else {
                  if (rollStatUpgrade == 0) { this.plus.interval -= 100 }
                  else if (rollStatUpgrade == 1) { this.plus.damage += 8 }
                }
                this.plus.upgradeAmount++
              }
              else if (rollAffectedWeapon == 6) {
                if (this.rain.upgradeAmount == 0) { this.rain.interval = 70 }
                else {
                  if (rollStatUpgrade == 0) { this.rain.interval -= 3 }
                  else if (rollStatUpgrade == 1) { this.rain.damage += 1 }
                }
                this.rain.upgradeAmount++
              }
              // else if (rollAffectedWeapon == 7) {
              //   if (this.homing.upgradeAmount == 0) { this.homing.interval = 2000 }
              //   else {
              //     if (rollStatUpgrade == 0) { this.homing.interval -= 1 }
              //     else if (rollStatUpgrade == 1) { this.homing.damage += 1 }
              //   }
              //   this.homing.upgradeAmount++
              // }
              this.pause = false
              this.choices = false
            }, 3000)
          }
        }
        this.player.projectiles.forEach((projectile) => {
          if (this.checkCollision(projectile, enemy)) {
            if (enemy.type === 'drop') { }
            else {
              if (enemy.lives < 1) {
                if (enemy.type === 'boss1' || enemy.type === 'boss2' || enemy.type === 'boss3') {
                  this.enemies.push(new Drop(this, enemy.x, enemy.y))
                }
                else if (Math.random() < this.dropChance || this.pity < 2) {
                  this.enemies.push(new Drop(this, enemy.x, enemy.y))
                }
                enemy.markedForDeletion = true
                this.pity++
              } else {
                if (projectile.type === 'shoot') {
                  enemy.lives -= this.shoot.damage
                  projectile.markedForDeletion = true
                }
                else if (projectile.type === 'slash') { enemy.lives -= this.slash.damage }
                else if (projectile.type === 'radius') { enemy.lives -= this.radius.damage }
                else if (projectile.type === 'boomerang') {
                  enemy.lives -= this.boomerang.damage
                  if (this.boomerang.upgradeAmount >= 10) { }
                  else {
                    projectile.markedForDeletion = true
                  }
                }
                else if (projectile.type === 'bounce') {
                  this.player.bounce(this.input.mouseX, this.input.mouseY, enemy.x, enemy.y)
                  enemy.lives -= this.bounce.damage
                  projectile.markedForDeletion = true
                  if (this.bounce.upgradeAmount >= 10) {
                    this.player.bounce(this.input.mouseX, this.input.mouseY, enemy.x, enemy.y)
                  }
                }
                else if (projectile.type === 'plus') {
                  enemy.lives -= this.plus.damage
                  projectile.markedForDeletion = true
                }
                else if (projectile.type === 'rain') {
                  enemy.lives -= this.rain.damage
                  projectile.markedForDeletion = true
                }
                // else if (projectile.type === 'homing') {
                //   enemy.lives -= this.homing.damage
                //   projectile.markedForDeletion = true
                // }
              }
            }
          }
        })
      })
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion)

      if (this.shoot.upgradeAmount >= 10) {
        if (this.shoot.timer + 10 > this.shoot.interval) {
          this.player.shoot(this.input.mouseX, this.input.mouseY)
        }
      }
      if (this.shoot.timer > this.shoot.interval) {
        this.player.shoot(this.input.mouseX, this.input.mouseY)
        this.shoot.timer = 0
      }
      else {
        this.shoot.timer += deltaTime
      }

      if (this.slash.timer > this.slash.interval) {
        if (this.slash.upgradeAmount >= 10) {
          this.player.slash2(this.input.mouseX, this.input.mouseY)
        }
        else {
          this.player.slash(this.input.mouseX, this.input.mouseY)
        }
        this.slash.timer = 0
      }
      else {
        this.slash.timer += deltaTime
      }

      if (this.radius.timer > this.radius.interval) {
        if (this.radius.upgradeAmount >= 10) {
          this.player.radius2(this.input.mouseX, this.input.mouseY)
        }
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

      if (this.bounce.timer > this.bounce.interval) {
        this.player.bounce(this.input.mouseX, this.input.mouseY)
        this.bounce.timer = 0
      }
      else {
        this.bounce.timer += deltaTime
      }

      if (this.plus.timer > this.plus.interval) {
        this.player.plus(this.input.mouseX, this.input.mouseY)
        if (this.plus.upgradeAmount >= 10) {
          this.player.plus2(this.input.mouseX, this.input.mouseY)
        }
        this.plus.timer = 0
      }
      else {
        this.plus.timer += deltaTime
      }

      if (this.rain.timer > this.rain.interval) {
        this.player.rain()
        this.rain.timer = 0
        if (this.rain.upgradeAmount >= 10) {
          this.player.rain2()
        }
      }
      else {
        this.rain.timer += deltaTime
      }

      // if (this.homing.timer > this.homing.interval) {
      //   this.player.homing()
      //   this.homing.timer = 0
      // }
      // else {
      //   this.homing.timer += deltaTime
      // }
    }
    else {
      this.gameTime -= deltaTime
    }
  }

  draw(context) {
    this.background.draw(context)
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
