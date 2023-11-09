import Shoot from './Shoot.js'
import Slash from './Slash.js'
import Radius from './Radius.js'
import Boomerang from './Boomerang.js'
import Bounce from './Bounce.js'
import Plus from './Plus.js'
import Rain from './Rain.js'
import Homing from './Homing.js'
import Cart from './Cart.js'
import PlayerSprite from '../src/assets/sprites/Sprite-Arca.webp'
import PlayerWalkSprite from '../src/assets/sprites/spritesheet.png'
import Sound from './Sound.js'

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
    this.maxSpeed = 3

    this.lives = 20

    const sprite = new Image()
    sprite.src = PlayerSprite
    this.sprite = sprite

    const spriteWalk = new Image()
    spriteWalk.src = PlayerWalkSprite
    this.spriteWalk = spriteWalk

    // sprite animation
    this.frameX = 0
    this.maxFrame = 0
    this.animationFps = 7
    this.animationTimer = 0
    this.animationInterval = 1000 / this.animationFps
    this.run = {
      image: spriteWalk,
      frames: 4
    }
    this.idle = {
      image: spriteWalk,
      frames: 1
    }

    this.image = this.idle.image

    this.sound = new Sound(this.game)
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

    if (this.speedX !== 0 || this.speedY !== 0) {
      this.maxFrame = this.run.frames
      this.image = this.run.image
    }
    else {
      this.maxFrame = this.idle.frames
      this.image = this.idle.image
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

    if (this.speedX > 0) {
      this.flip = false
    } else if (this.speedX < 0) {
      this.flip = true
    }

    // sprite animation update
    if (this.animationTimer > this.animationInterval) {
      this.frameX++
      this.animationTimer = 0
    } else {
      this.animationTimer += deltaTime
    }

    // reset frameX when it reaches maxFrame
    if (this.frameX >= this.maxFrame) {
      this.frameX = 0
    }
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

    this.projectiles.forEach((projectile) => {
      projectile.draw(context)
    })

    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.image,
      this.frameX * this.width,
      0,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )


    context.restore()
  }

  shoot(mouseX, mouseY) {
    this.sound.playPistolSound()

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
    this.sound.playSlashSound()

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
    this.sound.playSlashSound()

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
    this.sound.playBombSound()

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
    this.sound.playBoomerangSound()

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
    this.sound.playBouncerSound()

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
    this.sound.playTurretSound()

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
    //this.sound.playRainSound()

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

  cart() {
    this.sound.playCartSound()

    let angle

    if (this.speedX > 0) {
      angle = 0
    }
    else {
      angle = 3.15
    }

    this.projectiles.push(
      new Cart(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      ))

  }

  cart2() {
    let angle

    if (this.speedY > 0) {
      angle = 1.575
    }
    else {
      angle = -1.575
    }

    this.projectiles.push(
      new Cart(
        this.game,
        this.x + this.width / 2,
        this.y + this.height / 2,
        angle
      ))

  }
}

