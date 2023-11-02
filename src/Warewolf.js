import Enemy from './Enemy.js'
import WarewolfSprite from '../src/assets/css/sprites/Sprite-WEREWOLF.webp'

export default class Warewolf extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 36
        this.height = 36
        this.x = x
        this.y = y
        this.speed = 2.5
        this.lives = Math.floor(Math.random() * 90) + 60
        this.color = 'brown'
        this.type = 'warewolf'

        const sprite = new Image()
        sprite.src = WarewolfSprite
        this.sprite = sprite

        this.frameX = 0
        this.frameY = 1
        this.maxFrame = 8
        this.fps = 20
        this.timer = 0
        this.interval = 1000 / this.fps
    }

    update(player) {
        const dx = player.x - this.x // calculate the x distance to the player
        const dy = player.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        this.x += speedX // move the enemy towards the player on the x axis
        this.y += speedY // move the enemy towards the player on the y axis

        if (speedX < 0) {
            this.flip = false
        } else if (speedX > 0) {
            this.flip = true
        }
    }

    draw(context) {
        if (this.flip) {
            context.save()
            context.scale(-1, 1)
        }

        context.drawImage(
            this.sprite,
            this.frameX * this.width,
            this.frameY * this.height - 36,
            this.width,
            this.height,
            this.flip ? this.x * -1 - this.width : this.x,
            this.y,
            this.width,
            this.height
        )

        context.restore()
    }
}