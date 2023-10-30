import Projectile from "./Projectile"

export default class Homing extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.width = 20
        this.height = 4
        this.x = x
        this.y = y
        this.angle = angle

        this.speed = 600
        this.damage = 5

        this.upgradeAmount = 0
        this.timer = 0
        this.interval = 500

        this.color = 'red'
        this.type = 'homing'
    }

    update(Pumpkin) {
        if (this.x > this.game.width) {
            this.markedForDeletion = true
        }

        const dx = Pumpkin.x - this.x // calculate the x distance to the player
        const dy = Pumpkin.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        this.x += speedX // move the enemy towards the player on the x axis
        this.y += speedY // move the enemy towards the player on the y axis
    }
}
