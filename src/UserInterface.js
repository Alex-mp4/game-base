import Button from "./Button"

export default class UserInterface {
  constructor(game) {
    this.game = game
    this.button
    this.fontSize = 25
    this.fontFamily = 'Arial'
    this.color = 'white'

    this.startButton
    this.tutorial
    this.choiceButton1
    this.choiceButton2
    this.choiceButton3

    window.addEventListener('mousedown', (event => {
      if (this.game.start === false) {
        if (this.onButtonCheck(this.startButton.x, this.startButton.y, this.startButton.width, this.startButton.height)) {
          this.game.start = true
        }
      }
    }))
    window.addEventListener('mousedown', (event => {
      if (this.onButtonCheck(this.choiceButton1.x, this.choiceButton1.y, this.choiceButton1.width, this.choiceButton1.height)) {
        let rollAffectedWeapon = this.game.choiceW1
        let rollStatUpgrade = this.game.choiceU1
        this.upgrade(rollAffectedWeapon, rollStatUpgrade)
        this.game.choices = false
        this.game.pause = false
      }
    }))
    window.addEventListener('mousedown', (event => {
      if (this.onButtonCheck(this.choiceButton2.x, this.choiceButton2.y, this.choiceButton2.width, this.choiceButton2.height)) {
        let rollAffectedWeapon = this.game.choiceW2
        let rollStatUpgrade = this.game.choiceU2
        this.upgrade(rollAffectedWeapon, rollStatUpgrade)
        this.game.choices = false
        this.game.pause = false
      }
    }))
    window.addEventListener('mousedown', (event => {
      if (this.onButtonCheck(this.choiceButton3.x, this.choiceButton3.y, this.choiceButton3.width, this.choiceButton3.height)) {
        let rollAffectedWeapon = this.game.choiceW3
        let rollStatUpgrade = this.game.choiceU3
        this.upgrade(rollAffectedWeapon, rollStatUpgrade)
        this.game.choices = false
        this.game.pause = false
      }
    }))
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

    if (this.game.pause) {
      context.fillText(`Pistol: ${this.game.shoot.upgradeAmount}`, 20, 140)
      context.fillText(`Weapon Damage: ${this.game.shootDamage}`, 200, 140)
      context.fillText(`Sword: ${this.game.slash.upgradeAmount}`, 20, 170)
      context.fillText(`Weapon Damage: ${this.game.slashDamage}`, 200, 170)
      context.fillText(`Bouncer: ${this.game.bounce.upgradeAmount}`, 20, 200)
      context.fillText(`Weapon Damage: ${this.game.bounceDamage}`, 200, 200)
      context.fillText(`Turret: ${this.game.plus.upgradeAmount}`, 20, 230)
      context.fillText(`Weapon Damage: ${this.game.plusDamage}`, 200, 230)
      context.fillText(`Bomb: ${this.game.radius.upgradeAmount}`, 20, 260)
      context.fillText(`Weapon Damage: ${this.game.radiusDamage}`, 200, 260)
      context.fillText(`Rain: ${this.game.rain.upgradeAmount}`, 20, 290)
      context.fillText(`Weapon Damage: ${this.game.boomerangDamage}`, 200, 290)
      context.fillText(`Boomerang: ${this.game.boomerang.upgradeAmount}`, 20, 320)
      context.fillText(`Weapon Damage: ${this.game.boomerangDamage}`, 200, 320)
    }

    if (this.game.start === false) {
      this.tutorial = new Button(
        this.game,
        context,
        this.game.width / 2 - 350,
        this.game.height / 2 - 150,
        700,
        50,
        'WASD or arrow-keys for movement. Aim and then shoot automatically.',
        "black",
        "white",
        0,
        30
      )
      this.startButton = new Button(
        this.game,
        context,
        this.game.width / 2 - 100,
        this.game.height / 2 + 30,
        200,
        50,
        'Start Game',
        "black",
        "red",
        35,
        30
      )
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

      this.choiceButton1 = new Button(
        this.game,
        context,
        this.game.width / 2 - 550,
        this.game.height / 2,
        300,
        50,
        `${weapon1Text}, +${upgrade1Text}`,
        "black",
        "red",
        0,
        30
      )
      this.choiceButton2 = new Button(
        this.game,
        context,
        this.game.width / 2 - 150,
        this.game.height / 2,
        300,
        50,
        `${weapon2Text}, +${upgrade2Text}`,
        "black",
        "red",
        0,
        30
      )
      this.choiceButton3 = new Button(
        this.game,
        context,
        this.game.width / 2 + 250,
        this.game.height / 2,
        300,
        50,
        `${weapon3Text}, +${upgrade3Text}`,
        "black",
        "red",
        0,
        30
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

    context.restore()
  }

  onButtonCheck(x, y, width, height) {
    if (this.game.input.mouseX > x && this.game.input.mouseX < x + width && this.game.input.mouseY > y && this.game.input.mouseY < y + height) {
      return (true)
    }
  }

  upgrade(rollAffectedWeapon, rollStatUpgrade) {
    if (rollAffectedWeapon == 0) {
      if (rollStatUpgrade == 0) { this.game.shoot.interval -= 50 }
      else if (rollStatUpgrade == 1) { this.game.shoot.damage += 5 }
      this.game.shoot.upgradeAmount++
    }
    else if (rollAffectedWeapon == 1) {
      if (this.game.slash.upgradeAmount == 0) { this.game.slash.interval = 3500 }
      else {
        if (rollStatUpgrade == 0) { this.game.slash.interval -= 125 }
        else if (rollStatUpgrade == 1) { this.game.slash.damage += 10 }
      }
      this.game.slash.upgradeAmount++
    }
    else if (rollAffectedWeapon == 2) {
      if (this.game.radius.upgradeAmount == 0) { this.game.radius.interval = 2500 }
      else {
        if (rollStatUpgrade == 0) { this.game.radius.interval -= 100 }
        else if (rollStatUpgrade == 1) { this.game.radius.damage += 2 }
      }
      this.game.radius.upgradeAmount++
      if (this.game.radius.upgradeAmount === 10) {
        this.game.radius.disInterval += 50
      }
    }
    else if (rollAffectedWeapon == 3) {
      if (this.game.boomerang.upgradeAmount == 0) { this.game.boomerang.interval = 2000 }
      else {
        if (rollStatUpgrade == 0) { this.game.boomerang.interval -= 80 }
        else if (rollStatUpgrade == 1) { this.game.boomerang.damage += 8 }
      }
      this.game.boomerang.upgradeAmount++
    }
    else if (rollAffectedWeapon == 4) {
      if (this.game.bounce.upgradeAmount == 0) { this.game.bounce.interval = 2250 }
      else {
        if (rollStatUpgrade == 0) { this.game.bounce.interval -= 65 }
        else if (rollStatUpgrade == 1) { this.game.bounce.damage += 6 }
      }
      this.game.bounce.upgradeAmount++
    }
    else if (rollAffectedWeapon == 5) {
      if (this.game.plus.upgradeAmount == 0) { this.game.plus.interval = 2500 }
      else {
        if (rollStatUpgrade == 0) { this.game.plus.interval -= 100 }
        else if (rollStatUpgrade == 1) { this.game.plus.damage += 8 }
      }
      this.game.plus.upgradeAmount++
    }
    else if (rollAffectedWeapon == 6) {
      if (this.game.rain.upgradeAmount == 0) { this.game.rain.interval = 70 }
      else {
        if (rollStatUpgrade == 0) { this.game.rain.interval -= 3 }
        else if (rollStatUpgrade == 1) { this.game.rain.damage += 1 }
      }
      this.game.rain.upgradeAmount++
    }
  }
}
