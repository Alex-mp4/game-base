import SkullSprite from '../src/assets/sprites/Sprite-SKULLINO.webp'
import VampireSprite from '../src/assets/sprites/Sprite-XLMAGIO.webp'
import WarewolfSprite from '../src/assets/sprites/Sprite-WEREWOLF.webp'
import ZombieSprite from '../src/assets/sprites/Sprite-MUDMAN1.webp'
import GremlinSprite from '../src/assets/sprites/Sprite-FS_GOBLIN.png'
import DropSprite from '../src/assets/sprites/Icon-Candybox.webp'

export default class Preload {
    constructor(game) {
        this.game = game

        const skullSprite = new Image()
        skullSprite.src = SkullSprite
        this.skullSprite = skullSprite

        const vampireSprite = new Image()
        vampireSprite.src = VampireSprite
        this.vampireSprite = vampireSprite

        const warewolfSprite = new Image()
        warewolfSprite.src = WarewolfSprite
        this.warewolfSprite = warewolfSprite

        const zombieSprite = new Image()
        zombieSprite.src = ZombieSprite
        this.zombieSprite = zombieSprite

        const gremlinSprite = new Image()
        gremlinSprite.src = GremlinSprite
        this.gremlinSprite = gremlinSprite

        const dropSprite = new Image()
        dropSprite.src = DropSprite
        this.dropSprite = dropSprite
    }
}
