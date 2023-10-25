import Projectile from "./Projectile"

export default class Slash extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.width = 4
        this.height = 80
        this.x = x
        this.y = y
        this.angle = angle

        this.speed = 300
        this.damage = 20

        this.timer = 0
        this.interval = 400

        this.color = 'yellow'
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

        if (this.timer > this.interval) {
            this.markedForDeletion = true
            this.timer = 0
        }
        else {
            this.timer += deltaTime
        }
    }
}
