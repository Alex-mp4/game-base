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
More enemies (yup)
Enemy timer is a exponential function that increases and then begins to increase, simultaneously a new one begins (yup)
Pause game (yup)
When drop get popup and pick between three choices (pause here) (yup)
Fix bounce from enemy (yup)
Pity system for drops (make odds increase with deltaTime) (yup)

Graphics
Improve weapon greatly at certain levels
Countdown on pickup
Confirmation on choice
If I can avoid all of the ifs then do so (have projectile have all of the statistics (this.interval, for example) and give them names to take data from)
Better UI
Enemies die when below 0 (not after being shot at below 0)
Balancing (weapon damage on first pickup)
Boss with unique patterns (for example, shows it going back and then it boosts forward or having a distinct path/covering part of the screen)
When enough time has passed (after gremlin something) go hogwild with spawn rate


S-tier Rain
A-tier Slash
B-tier Bomba, Bounce
C-tier Shoot, Plus
D-tier
E-tier Boomerang
F-tier Homing