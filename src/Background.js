import backgroundImage from '../src/assets/css/sprites/background.jpg'
import Layer from './Layer'

export default class Background {
    constructor(game) {
        this.game = game
        const background = new Image()
        background.src = backgroundImage
        this.backgroundLayer = new Layer(this.game, background, 1480, 760, 0.1)
        this.layers = [
            this.backgroundLayer
        ]
    }

    update() {
        this.layers.forEach((layer) => layer.update())
    }

    draw(context) {
        this.layers.forEach((layer) => layer.draw(context))
    }
}