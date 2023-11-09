import pistolurl from '../src/assets/audio/pistol.wav'
import slashurl from '../src/assets/audio/slash.wav'
import boomerangurl from '../src/assets/audio/boomerang.wav'
import bomburl from '../src/assets/audio/bomb.mp3'
import bouncerurl from '../src/assets/audio/bouncer.wav'
import turreturl from '../src/assets/audio/turret.wav'
import rainurl from '../src/assets/audio/rain.wav'


export default class Sound {
    constructor(game) {
        this.game = game

        const pistol = new Audio()
        pistol.src = pistolurl
        this.pistolSound = pistol

        const slash = new Audio()
        slash.src = slashurl
        this.slashSound = slash
        slash.volume = 0.2

        const boomerang = new Audio()
        boomerang.src = boomerangurl
        this.boomerangSound = boomerang

        const bomb = new Audio()
        bomb.src = bomburl
        this.bombSound = bomb
        bomb.volume = 0.2

        const bouncer = new Audio()
        bouncer.src = bouncerurl
        this.bouncerSound = bouncer
        bouncer.volume = 0.5

        const turret = new Audio()
        turret.src = turreturl
        this.turretSound = turret

        const rain = new Audio()
        rain.src = rainurl
        this.rainSound = rain
    }

    playPistolSound() {
        this.pistolSound.currentTime = 0
        this.pistolSound.play()
    }

    playSlashSound() {
        this.slashSound.currentTime = 0
        this.slashSound.play()
    }

    playBoomerangSound() {
        this.boomerangSound.currentTime = 0
        this.boomerangSound.play()
    }

    playBombSound() {
        this.bombSound.currentTime = 0
        this.bombSound.play()
    }

    playBouncerSound() {
        this.bouncerSound.currentTime = 0
        this.bouncerSound.play()
    }

    playTurretSound() {
        this.turretSound.currentTime = 0
        this.turretSound.play()
    }

    playRainSound() {
        this.rainSound.currentTime = 0
        this.rainSound.play()
    }
}