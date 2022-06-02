class Player {
    constructor() {
        this.currentHealth = 100
        this.maxHealth = 300
        this.currentAP = 200
        this.maxAP = 200
        this.attack = 100
        this.defense = 50
        this.magic = 10
    }

    dealDamage(enemy) {
        let num1 = Math.floor(Math.random() * 50); 
        let num2 = Math.floor(Math.random() * 50);
        
        let damage = this.attack + num1 - num2 - enemy.defense 
        if (damage < 1) damage = 1
        if (enemy.currentHealth - damage < 0) damage = enemy.currentHealth
        
        console.log(`Player deals ${damage} damage to enemy!`)

        let sound = document.getElementById("physical-critical-hit")
        sound.play()
        return damage
    }

    
    heal() {
        //develop ability messages
        const cost = 30
        if (this.currentAP < cost) {
            return [this,"Not enough AP!"]
        }

        this.currentAP -= cost
        let num1 = Math.floor(Math.random() * 30); 
        let num2 = Math.floor(Math.random() * 10);

        let healAmount = this.magic + num1 - num2
        this.currentHealth += healAmount
        if (this.currentHealth > this.maxHealth) {
            this.currentHealth = this.maxHealth
        }

        return [this,`Player recovered ${healAmount} health!` ]
    }
    


}


module.exports = Player;