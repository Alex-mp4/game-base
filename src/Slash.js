import Projectile from "./Projectile"

export default class Slash extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.width = 4
        this.height = 0
        this.x = x
        this.y = y
        this.angle = angle

        this.speed = 150
        this.damage = 20

        this.upgradeAmount = 0
        this.timer = 0
        this.interval = Infinity

        this.disTimer = 0
        this.disInterval = 400

        this.color = 'white'
        this.type = 'slash'
    }

    update(deltaTime) {
        const velocity = {
            x: this.speed * Math.cos(this.angle),
            y: this.speed * Math.sin(this.angle),
        }

        this.x += velocity.x * (deltaTime / 1000)
        this.y += velocity.y * (deltaTime / 1000)

        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }

        if (this.height > 80) {
            this.markedForDeletion = true
        }

        if (this.disTimer > this.disInterval) {
            this.markedForDeletion = true
            this.disTimer = 0
        }
        else {
            this.disTimer += deltaTime / 10
            this.height = this.disTimer
        }
    }
}
