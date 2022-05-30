class Player {
    constructor() {
        this.currentHealth = 50
        this.maxHealth = 100
        this.attack = 100
        this.defense = 50
        this.magic = 10
        this.speed = 50
    }

    dealDamage(enemy) {
        let damage = this.attack - enemy.defense 
        if (damage < 1) damage = 1
        if (enemy.currentHealth - damage < 0) damage = enemy.currentHealth
        
        console.log(`Player deals ${damage} damage to enemy!`)
        return damage
    }
}


module.exports = Player;