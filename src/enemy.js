class Enemy {
    constructor() {
        this.currentHealth = 9
        this.maxHealth = 9999
        this.currentAP = 100
        this.maxAP = 100
        this.attack = 80
        this.defense = 25
        this.magic = 100
        this.player = 0
    }

    // dealDamage(player) {

    //     let damage = this.attack - player.defense 
    //     if (damage < 1) damage = 1
    //     if (player.currentHealth - damage < 0) damage = player.currentHealth
        
    //     console.log(`Enemy deals ${damage} damage to player!`)
    //     return damage
    // }

    dealDamage(player) {
        this.player = player
        let num = Math.floor(Math.random() * 100);
        console.log(`Random enemy number: ${num}`)
        if (num < 50 ) {
            return this.attackOne.bind(this)();
        } else {
            return this.attackTwo.bind(this)(); //<-- remove parentheses for funny msg
        }

    }
    

    attackOne() {
        let num1 = Math.floor(Math.random() * 50);
        let num2 = Math.floor(Math.random() * 50);

        let damage = this.attack + num1 - num2 - this.player.defense 
        if (damage < 1) damage = 1
        if (this.player.currentHealth - damage < 0) damage = this.player.currentHealth
        
        console.log(`Enemy deals ${damage} damage to player!`)
        
        this.playSound("magic-attack")
        return [damage,this.player,this]
    }

    attackTwo() {
        const cost = 50
        if (this.currentAP < cost) {
            return this.attackOne.bind(this)(); 
        }
        this.currentAP -= cost
        let num1 = Math.floor(Math.random() * 50);
        let num2 = Math.floor(Math.random() * 50);

        let damage = this.magic + num1 - num2 - this.player.magic
        if (damage < 1) damage = 1
        if (this.player.currentHealth - damage < 0) damage = this.player.currentHealth
        console.log(`Enemy deals ${damage} damage to player!`)
        
        this.playSound("magic-critical-hit")
        return [damage,this.player,this]
    }


    playSound(soundName,volume = 1) {
        let sound = document.getElementById(soundName)
        sound.volume = volume
        sound.play()
    }
}


module.exports = Enemy;