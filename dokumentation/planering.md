Weapon.js {
    this.dagger = true
    this.gun = false
    etc, etc

    maybe an array of booleans
}

Projectile.js {
    dagger.projectile - special code
    etc, etc
}

Enemy.js {
    math.random drop a math.random weapon, use candy code
    maybe alert on pick-up, 1: weapon 1, 2: weapon 2, 3: weapon 3
}

Player.js(weapon[0,1, etc])

Drop rates for weapons/upgrades (yup)
Activate them over time (yup)
Create more weapons (yup)
Border on game (yup)
Graphics
More enemies
Enemy timer is a exponential function that increases and then begins to increase, simultaneously a new one begins
Pause game (yup)
When drop get popup and pick between three choices (pause here) (yup)
Fix bounce from enemy (yup)
Countdown on pickup
Confirmation on choice
If I can avoid all of the ifs then do so (have projectile have all of the statistics (this.interval, for example) and give them names to take data from)
Better UI
Enemies die when below 0 (not after being shot at below 0)
Pity system for drops (make odds increase with deltaTime)


S-tier Rain
A-tier Slash
B-tier Bomba, Bounce
C-tier Shoot, Plus
D-tier
E-tier Boomerang
F-tier Homing