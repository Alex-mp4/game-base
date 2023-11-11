import Projectile from "./Projectile"

export default class Cart extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.width = 20
        this.height = 20
        this.x = x
        this.y = y
        this.angle = angle

        this.speed = 250
        this.damage = 1

        this.upgradeAmount = 0
        this.timer = 0
        this.interval = Infinity

        this.disTimer = 0
        this.disInterval = 10000

        this.color = 'brown'
        this.type = 'cart'
    }

    update(deltaTime) {
        const velocity = {
            x: this.speed * Math.cos(this.angle),
            y: this.speed * Math.sin(this.angle),
        }

        if (this.x < 15) {
            this.speed *= -1
            velocity.x *= -1
        }
        if (this.x > (this.game.width - 15)) {
            this.speed *= -1
            velocity.x *= -1
        }

        if (this.y < 15) {
            this.speed *= -1
            velocity.y *= -1
        }
        if (this.y > (this.game.height - 15)) {
            this.speed *= -1
            velocity.y *= -1
        }

        this.x += velocity.x * (deltaTime / 1000)
        this.y += velocity.y * (deltaTime / 1000)


        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }
        if (this.x < -200) {
            this.markedForDeletion = true
        }
        if (this.y > this.game.height) {
            this.markedForDeletion = true
        }
        if (this.y < -200) {
            this.markedForDeletion = true
        }

        if (this.disTimer > this.disInterval) {
            this.markedForDeletion = true
            this.disTimer = 0
        }
        else {
            this.disTimer += deltaTime
        }
    }
}
