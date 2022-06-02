class Player {
    constructor() {
        this.currentHealth = 300
        this.maxHealth = 300
        this.currentAP = 100
        this.maxAP = 100
        this.attack = 100
        this.defense = 50
        this.magic = 30
    }

    dealDamage(enemy) {
        let num1 = Math.floor(Math.random() * 50); 
        let num2 = Math.floor(Math.random() * 50);
        
        let damage = this.attack + num1 - num2 - enemy.defense 
        if (damage < 1) damage = 1
        if (enemy.currentHealth - damage < 0) damage = enemy.currentHealth
        
        console.log(`Player deals ${damage} damage to enemy!`)

        this.playSound("physical-critical-hit",0.5)
        return damage
    }

    
    heal() {
        //develop ability messages
        const cost = 30
        if (this.currentAP < cost) {
            this.playSound("cancel",0.8)
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
        this.playSound("heal")
        return [this,`Player recovered ${healAmount} health!` ]
    }
    

    playSound(soundName, volume = 1.0) {
        let sound = document.getElementById(soundName)
        sound.volume = volume
        sound.play()
    }


}


module.exports = Player;