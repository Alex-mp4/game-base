import Enemy from './Enemy'
import BoxSprite from '../src/assets/sprites/Icon-Candybox.webp'

export default class Drop extends Enemy {
  constructor(game, x, y) {
    super(game)
    this.width = 24
    this.height = 24
    this.x = x
    this.y = y
    this.speed = 0
    this.lives = 1
    this.color = '#0f0'
    this.type = 'drop'

    const sprite = new Image()
    sprite.src = BoxSprite
    this.sprite = sprite

    this.frameX = 0
    this.frameY = 1
    this.maxFrame = 6
    this.fps = 20
    this.timer = 0
    this.interval = 1000 / this.fps
  }

  draw(context) {
    if (this.flip) {
      context.save()
      context.scale(-1, 1)
    }

    context.drawImage(
      this.sprite,
      this.frameX * this.width,
      this.frameY * this.height - 24,
      this.width,
      this.height,
      this.flip ? this.x * -1 - this.width : this.x,
      this.y,
      this.width,
      this.height
    )

    context.restore()
  }
}
