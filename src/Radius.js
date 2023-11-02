import Projectile from "./Projectile"

export default class Radius extends Projectile {
    constructor(game, x, y) {
        super(game)
        this.width = 0
        this.height = 0
        this.x = x - 5
        this.y = y - 5

        this.damage = 3

        this.upgradeAmount = 10
        this.timer = 0
        this.interval = 1000

        this.disTimer = 0
        this.disInterval = 50

        this.color = 'red'
        this.type = 'radius'
    }

    update(deltaTime) {
        if (this.disTimer > this.disInterval) {
            this.markedForDeletion = true
            this.disTimer = 0
        }
        else {
            this.disTimer += deltaTime / 10
            this.width = this.disTimer
            this.height = this.disTimer
            this.x -= this.width / 26 - 1 * this.disTimer / 130
            this.y -= this.height / 26 - 1 * this.disTimer / 130
        }
    }
}
