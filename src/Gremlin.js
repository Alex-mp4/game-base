import Enemy from './Enemy.js'

export default class Zombie extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 12
        this.height = 12
        this.x = x
        this.y = y
        this.speed = 8
        this.lives = Math.floor(Math.random() * 50) + 80
        this.color = 'green'
        this.type = 'gremlin'
    }

    update(player) {
        const dx = player.x - this.x // calculate the x distance to the player
        const dy = player.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        let direction = Math.floor(Math.random() * 4)
        if (direction === 1) {
            this.x -= speedX
            this.y -= speedY
        }
        else {
            this.x += speedX // move the enemy towards the player on the x axis
            this.y += speedY // move the enemy towards the player on the y axis
        }
    }
}
