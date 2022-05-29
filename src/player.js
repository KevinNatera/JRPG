class Player {
    constructor() {
        this.currentHealth = 50
        this.maxHealth = 100
        this.attack = 50
        this.defense = 50
        this.magic = 10
        this.speed = 50
    }

    dealDamage() {
        console.log(this.attack)
    }
}


module.exports = Player;