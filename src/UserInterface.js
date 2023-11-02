export default class UserInterface {
  constructor(game) {
    this.game = game
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'
  }

  draw(context) {
    context.save()
    context.fillStyle = this.color
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.shadowColor = 'black'

    context.textAlign = 'left'
    context.font = `${this.fontSize}px ${this.fontFamily}`
    context.fillText(`Lives: ${this.game.player.lives}`, 20, 30)
    context.fillText(`Time: ${(this.game.gameTime * 0.001).toFixed(1)}`, 20, 60)

    if (this.game.gameOver) {
      context.textAlign = 'center'
      context.font = `50px ${this.fontFamily}`
      context.fillText(
        'Game over',
        this.game.width / 2,
        this.game.height / 2 - 20
      )
    }

    // debug
    if (this.game.debug) {
      context.font = `15px Arial`
      context.textAlign = 'right'
      context.fillText(`x: ${this.game.player.x}`, this.game.width - 20, 25)
      context.fillText(`y: ${this.game.player.y}`, this.game.width - 20, 50)
      context.fillText(
        `mouseX: ${this.game.input.mouseX}`,
        this.game.width - 20,
        75
      )
      context.fillText(
        `mouseY: ${this.game.input.mouseY}`,
        this.game.width - 20,
        100
      )
      context.fillText(
        `maxSpeed: ${this.game.player.maxSpeed}`,
        this.game.width - 20,
        125
      )
      context.fillText(`keys: ${this.game.keys}`, this.game.width - 20, 150)
    }

    if (this.game.pause) {
      context.fillText(`Pistol: ${this.game.shoot.upgradeAmount}`, 20, 140)
      context.fillText(`Sword: ${this.game.slash.upgradeAmount}`, 20, 170)
      context.fillText(`Bounce: ${this.game.bounce.upgradeAmount}`, 20, 200)
      context.fillText(`Turret: ${this.game.plus.upgradeAmount}`, 20, 230)
      context.fillText(`Bomb: ${this.game.radius.upgradeAmount}`, 20, 260)
      context.fillText(`Rain: ${this.game.rain.upgradeAmount}`, 20, 290)
      context.fillText(`Boomerang: ${this.game.boomerang.upgradeAmount}`, 20, 320)
    }

    if (this.game.choices) {
      let weapon1Text
      let weapon2Text
      let weapon3Text
      let upgrade1Text
      let upgrade2Text
      let upgrade3Text

      if (this.game.choiceW1 === 0) {
        weapon1Text = "Pistol"
      }
      if (this.game.choiceW1 === 1) {
        weapon1Text = "Sword"
      }
      if (this.game.choiceW1 === 2) {
        weapon1Text = "Bomb"
      }
      if (this.game.choiceW1 === 3) {
        weapon1Text = "Boomerang"
      }
      if (this.game.choiceW1 === 4) {
        weapon1Text = "Bouncer"
      }
      if (this.game.choiceW1 === 5) {
        weapon1Text = "Turret"
      }
      if (this.game.choiceW1 === 6) {
        weapon1Text = "Rain"
      }

      if (this.game.choiceW2 === 0) {
        weapon2Text = "Pistol"
      }
      if (this.game.choiceW2 === 1) {
        weapon2Text = "Sword"
      }
      if (this.game.choiceW2 === 2) {
        weapon2Text = "Bomb"
      }
      if (this.game.choiceW2 === 3) {
        weapon2Text = "Boomerang"
      }
      if (this.game.choiceW2 === 4) {
        weapon2Text = "Bouncer"
      }
      if (this.game.choiceW2 === 5) {
        weapon2Text = "Turret"
      }
      if (this.game.choiceW2 === 6) {
        weapon2Text = "Rain"
      }

      if (this.game.choiceW3 === 0) {
        weapon3Text = "Pistol"
      }
      if (this.game.choiceW3 === 1) {
        weapon3Text = "Sword"
      }
      if (this.game.choiceW3 === 2) {
        weapon3Text = "Bomb"
      }
      if (this.game.choiceW3 === 3) {
        weapon3Text = "Boomerang"
      }
      if (this.game.choiceW3 === 4) {
        weapon3Text = "Bouncer"
      }
      if (this.game.choiceW3 === 5) {
        weapon3Text = "Turret"
      }
      if (this.game.choiceW3 === 6) {
        weapon3Text = "Rain"
      }

      if (this.game.choiceU1 === 0) {
        upgrade1Text = "Attack speed"
      }
      if (this.game.choiceU1 === 1) {
        upgrade1Text = "Damage"
      }

      if (this.game.choiceU2 === 0) {
        upgrade2Text = "Attack speed"
      }
      if (this.game.choiceU2 === 1) {
        upgrade2Text = "Damage"
      }

      if (this.game.choiceU3 === 0) {
        upgrade3Text = "Attack speed"
      }
      if (this.game.choiceU3 === 1) {
        upgrade3Text = "Damage"
      }

      setTimeout(() => {
        context.fillText(`3...`, 500, 200)
      }, 0)
      setTimeout(() => {
        context.fillText(`2...`, 540, 200)
      }, 1000)
      setTimeout(() => {
        context.fillText(`1...`, 580, 200)
      }, 2000)

      context.fillText(`Press 1: ${weapon1Text}, +${upgrade1Text}`, 500, 300)
      context.fillText(`Press 2: ${weapon2Text}, +${upgrade2Text}`, 500, 400)
      context.fillText(`Press 3: ${weapon3Text}, +${upgrade3Text}`, 500, 500)
    }

    context.restore()
  }
}
