import Projectile from "./Projectile"

export default class Boomerang extends Projectile {
    constructor(game, x, y, angle) {
        super(game)
        this.width = 4
        this.height = 40
        this.x = x
        this.y = y
        this.angle = angle

        this.speed = 250
        this.damage = 12

        this.upgradeAmount = 0
        this.timer = 0
        this.interval = Infinity

        this.turnTimer = 0
        this.turnInterval = 300
        this.disTimer = 0
        this.disInterval = 1000

        this.color = '#0f0'
        this.type = 'boomerang'
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

        if (this.turnTimer > this.turnInterval) {
            console.log("Turn")
            this.speed *= (-1)
            velocity.x *= (-1)
            velocity.y *= (-1)
            // if (this.upgradeAmount >= 1) {
            //     this.turnTimer = 0
            // }
            // else {
            this.turnTimer = -Infinity
            //}
        }
        else {
            this.turnTimer += deltaTime
        }

        // if (this.upgradeAmount >= 1) {
        //     if (this.disTimer > this.disInterval) {
        //         console.log("Deleted")
        //         this.markedForDeletion = true
        //         this.disTimer = 0
        //     }
        //     else {
        //         this.disTimer += deltaTime
        //     }
        // }
    }
}
