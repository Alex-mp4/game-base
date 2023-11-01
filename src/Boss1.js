import Enemy from './Enemy.js'

export default class Boss1 extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 160
        this.height = 160
        this.x = x
        this.y = y
        this.speed = 8
        this.lives = 500
        this.color = 'red'
        this.type = 'boss1'

        this.goTimer = 0
        this.goInterval = 300
    }

    update(player, deltaTime) {
        const dx = player.x - this.x // calculate the x distance to the player
        const dy = player.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        if (this.goTimer > this.goInterval) {
            this.x += speedX * 4
            this.y += speedY * 4
            this.goTimer = 0
            console.log("Go")
        }
        else {
            this.goTimer += deltaTime
            this.x -= speedX / 4 // move the enemy towards the player on the x axis
            this.y -= speedY / 4 // move the enemy towards the player on the y axis
            console.log("Wait")
        }
    }
}
