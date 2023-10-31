import Projectile from "./Projectile"

export default class Plus extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.width = 10
        this.height = 4
        this.x = x
        this.y = y
        this.angle = angle

        this.speed = 450
        this.damage = 4

        this.upgradeAmount = 0
        this.timer = 0
        this.interval = Infinity

        this.color = 'yellow'
        this.type = 'plus'
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
    }
}