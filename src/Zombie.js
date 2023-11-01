import Enemy from './Enemy.js'

export default class Zombie extends Enemy {
    constructor(game, x, y) {
        super(game)
        this.width = 32
        this.height = 32
        this.x = x
        this.y = y
        this.speed = 1.5
        this.lives = Math.floor(Math.random() * 200) + 100
        this.color = 'green'
        this.type = 'zombie'
    }

    update(player) {
        const dx = player.x - this.x // calculate the x distance to the player
        const dy = player.y - this.y // calculate the y distance to the player
        const distance = Math.sqrt(dx * dx + dy * dy) // calculate the total distance to the player
        const speedX = (dx / distance) * this.speed // calculate the x speed towards the player
        const speedY = (dy / distance) * this.speed // calculate the y speed towards the player
        let direction = Math.floor(Math.random() * 4)
        if (direction === 1) {
            this.x -= (speedX + Math.floor(Math.random() * 4) - 2)
            this.y -= (speedY + Math.floor(Math.random() * 4) - 2)
        }
        else {
            this.x += (speedX + Math.floor(Math.random() * 4) - 2) // move the enemy towards the player on the x axis
            this.y += (speedY + Math.floor(Math.random() * 4) - 2) // move the enemy towards the player on the y axis
        }
    }
}
