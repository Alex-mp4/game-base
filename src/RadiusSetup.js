import Projectile from "./Projectile"

export default class RadiusSetup extends Projectile {
    constructor(game, x, y) {
        super(game)
        this.width = 10
        this.height = 10
        this.x = x
        this.y = y

        this.damage = 0

        this.upgradeAmount = 0
        this.timer = 0
        this.interval = Infinity

        this.color = 'red'
        this.type = 'radiusSetup'
    }

    update(deltaTime) {

    }
}
