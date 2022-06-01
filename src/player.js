class Player {
    constructor() {
        this.currentHealth = 275
        this.maxHealth = 300
        this.currentAP = 50
        this.maxAP = 100
        this.attack = 100
        this.defense = 50
        this.magic = 10
    }

    dealDamage(enemy) {
        let num1 = Math.floor(Math.random() * 50) 
        let num2 = Math.floor(Math.random() * 50);
        console.log(`Random + player number: ${num1}`)
        console.log(`Random - player number: ${num2}`)
        let damage = this.attack + num1 - num2 - enemy.defense 
        if (damage < 1) damage = 1
        if (enemy.currentHealth - damage < 0) damage = enemy.currentHealth
        
        console.log(`Player deals ${damage} damage to enemy!`)
        return damage
    }

    

    


}


module.exports = Player;