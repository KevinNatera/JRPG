class Enemy {
    constructor() {
        this.currentHealth = 230
        this.maxHealth = 230
        this.attack = 80
        this.defense = 25
        this.magic = 999
        this.speed = 50
    }

    dealDamage(player) {
        let damage = this.attack - player.defense 
        if (damage < 1) damage = 1
        if (player.currentHealth - damage < 0) damage = player.currentHealth
        
        console.log(`Enemy deals ${damage} damage to player!`)
        return damage
    }
}


module.exports = Enemy;