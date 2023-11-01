import Projectile from "./Projectile"

export default class Rain extends Projectile {
    constructor(game, x) {
        super(game)
        this.width = 3
        this.height = 3
        this.upgradeAmount = 0
        this.interval = Infinity
        if (this.upgradeAmount >= 10) {
            this.x = x - Math.floor(Math.random() * this.game.width) + this.game.width / 2
            this.interval = 1
        }
        else {
            this.x = x - Math.floor(Math.random() * 250) + 125
        }
        this.y = 0

        this.speed = 400
        this.damage = 1

        this.timer = 0

        this.color = 'blue'
        this.type = 'rain'
    }

    update(deltaTime) {
        this.y += this.speed * (deltaTime / 1000)

        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }
    }
}
