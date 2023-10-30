export default class Projectile {
  constructor(game, angle, color) {
    this.game = game
    this.x = 0
    this.y = 0
    this.angle = angle
    this.color = color
    this.markedForDeletion = false
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

  draw(context) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.angle)
    context.fillStyle = this.color
    context.fillRect(0, 0, this.width, this.height)
    context.restore()
  }
}
