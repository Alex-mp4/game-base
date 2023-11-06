export default class Button {
    constructor(game, context, x, y, width, height, text, fillColor, textColor, textXFix, textYFix) {
        this.game = game
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        context.fillStyle = fillColor
        context.fillRect(x, y, width, height)
        context.fillStyle = textColor
        context.textAlign = 'middle'
        context.fillText(text, x + textXFix, y + textYFix, width)
    }
}