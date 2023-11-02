import Shoot from './Shoot.js'
import Slash from './Slash.js'
import Radius from './Radius.js'
import Boomerang from './Boomerang.js'
import Bounce from './Bounce.js'
import Plus from './Plus.js'
import Rain from './Rain.js'
import Homing from './Homing.js'
import PlayerSprite from '../src/assets/css/sprites/Sprite-Arca.webp'
import movePlayerSprite from '../src/assets/css/sprites/Animated-Arca.webp'

export default class Player {
  constructor(game) {
    this.game = game
    this.width = 48
    this.height = 48
    this.x = this.game.width / 2 - this.width / 2
    this.y = this.game.height / 2 - this.height / 2

    this.projectiles = []

    this.speedX = 0
    this.speedY = 0
    this.maxSpeed = 5

    this.lives = 10

    const sprite = new Image()
    sprite.src = PlayerSprite
    this.sprite = sprite

    const sprite2 = new Image()
    sprite2.src = movePlayerSprite
    this.sprite2 = sprite2

    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 8
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  update(deltaTime) {
    if (this.lives <= 0) {
      this.game.gameOver = true
    }

    // if (this.x > (this.game.width - this.width) || this.x < 0 || this.y > (this.game.height - this.height) || this.y < 0) {
    //   this.speedX = 0
    // }


    if (this.game.keys.includes('ArrowLeft') || this.game.keys.includes('a')) {
      this.speedX = -this.maxSpeed
      if (this.x < 0) {
        this.speedX += this.maxSpeed
      }
    } else if (
      this.game.keys.includes('ArrowRight') ||
      this.game.keys.includes('d')
    ) {
      this.speedX = this.maxSpeed
      if (this.x > (this.game.width - this.width)) {
        this.speedX -= this.maxSpeed
      }
    } else {
      this.speedX = 0
    }

    if (this.game.keys.includes('ArrowUp') || this.game.keys.includes('w')) {
      this.speedY = -this.maxSpeed
      if (this.y < 0) {
        this.speedY += this.maxSpeed
      }
    } else if (
      this.game.keys.includes('ArrowDown') ||
      this.game.keys.includes('s')
    ) {
      this.speedY = this.maxSpeed
      if (this.y > (this.game.height - this.height)) {
        this.speedY -= this.maxSpeed
      }
    } else {
      this.speedY = 0
    }

    this.y += this.speedY
    this.x += this.speedX

    // projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update(deltaTime)
    })
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion
    )
  }

  draw(context) {
    if (this.game.debug) {
      context.strokeStyle = '#000'
      context.strokeRect(this.x, this.y, this.width, this.height)
      context.lineWidth = 1
      context.beginPath()
      const dx = this.game.input.mouseX - (this.x + this.width / 2)
      const dy = this.game.input.mouseY - (this.y + this.height / 2)
      const maxLength = 60
      const angle = Math.atan2(dy, dx)
      const x = this.x + this.width / 2 + maxLength * Math.cos(angle)
      const y = this.y + this.height / 2 + maxLength * Math.sin(angle)
      context.moveTo(this.x + this.width / 2, this.y + this.height / 2)
      context.lineTo(x, y)
      context.stroke()
    }

    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.sprite,
      this.frameX * this.width,
      this.frameY * this.height - 48,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })

    context.restore()
  }

  shoot(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    this.projectiles.push(
      new Shoot(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      ))

  }

  slash(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    this.projectiles.push(
      new Slash(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle,
        600
      ))

  }

  slash2(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    this.projectiles.push(
      new Slash(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle,
        1600
      ))

  }

  radius() {
    this.projectiles.push(
      new Radius(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2
      ))
  }

  radius2() {
    this.projectiles.push(
      new Radius(
        this.game,
        this.x + this.width / 2 - (this.speedX * 20),
        this.y + this.height / 2 - (this.speedY * 20)
      ))
  }

  boomerang(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    this.projectiles.push(
      new Boomerang(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      ))

  }

  bounce(mouseX, mouseY, x, y) {
    // get angle between player and mouse
    let angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    if (x === undefined || y === undefined) {
      this.projectiles.push(
        new Bounce(
          this.game,
          this.x + this.width / 2,
          this.y + this.height / 2,
          angle
        ))
    }
    else {
      angle = Math.atan2(
        Math.floor(Math.random() * 1000) - (this.y + this.height / 2),
        Math.floor(Math.random() * 1000) - (this.x + this.width / 2)
      )
      this.projectiles.push(
        new Bounce(
          this.game,
          x + 50,
          y + 50,
          angle
        ))
    }
  }

  plus() {
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        0
      ))
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        1.575
      ))
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        3.15
      ))
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        -1.575
      ))
  }

  plus2() {
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        0.7875
      ))
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        2.3625
      ))
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        -0.7875
      ))
    this.projectiles.push(
      new Plus(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        -2.3625
      ))
  }

  rain() {
    this.projectiles.push(
      new Rain(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
      ))

  }

  rain2() {
    this.projectiles.push(
      new Rain(
        this.game,
        Math.floor(Math.random() * this.game.width),
        this.y + this.height / 2,
      ))

  }

  homing(mouseX, mouseY) {
    // get angle between player and mouse
    const angle = Math.atan2(
      mouseY - (this.y + this.height / 2),
      mouseX - (this.x + this.width / 2)
    )

    this.projectiles.push(
      new Homing(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      ))

  }
}
