const PlayerClass = require("./player.js");
const EnemyClass = require("./enemy.js");



class Game {

    constructor() {
        this.backgroundCanvas = document.getElementById("battle-scene");
        this.backgroundCTX = this.backgroundCanvas.getContext("2d");

        this.playerCanvas = document.getElementById("player-canvas");
        this.enemyCanvas = document.getElementById("enemy-canvas");
        this.menuCanvas = document.getElementById("menu-canvas");

        this.playerCTX = this.playerCanvas.getContext("2d");
        this.enemyCTX = this.enemyCanvas.getContext("2d");
        this.menuCTX = this.menuCanvas.getContext("2d");

        this.player = new PlayerClass()
        this.enemy = new EnemyClass()

        this.playerHealthBar = document.getElementById("player-health-bar")
        this.playerAPBar = document.getElementById("player-AP-bar")
        this.enemyHealthBar = document.getElementById("enemy-health-bar")
        this.enemyAPBar = document.getElementById("enemy-AP-bar")

        this.messageDiv = document.getElementById("message-div");
        this.infoDiv = document.getElementById("info-div");

        this.executeCommandListener = this.executeCommand.bind(this)
        this.displayMenuInfoListener = this.displayMenuInfo.bind(this)

        this.executeAbilityListener = this.executeAbility.bind(this)
        this.displayAbilityInfoListener = this.displayAbilityInfo.bind(this)

        this.warriorSpritesheet = new Image()
        this.warriorSpritesheet.src = "../assets/spritesheets/warrior_spritesheet.png"
        // this.playerAttackAnimationId;
        // this.animationFrameCount = 0
        // this.currentFrame = 1    
    }

//-------------------BACKGROUND---------------------------------
    styleBackground(backgroundImage) {
        this.backgroundCTX.drawImage(backgroundImage,0,0,800,600)
    }

//-------------------MESSAGE---------------------------------
    styleMessageDiv() {
       this.messageDiv.style.position = "absolute";
       this.messageDiv.style.top = "50px";
       this.messageDiv.style.left= "110px";
       this.messageDiv.innerHTML = "Battle Start!"
    }

    message(text) {
        //current char limit is 29
        this.messageDiv.innerHTML = text
    }

    reportDamage(damageDealer, damage, target) {
        this.messageDiv.innerHTML = damageDealer + ` deals ${damage} to ` + target + "!"
    }

    reportDefeated(defeatedTarget) {
        this.messageDiv.innerHTML = defeatedTarget + " has been defeated!"
    }

//-------------------INFO--------------------------------------
    styleInfoDiv() {
        this.infoDiv.style.position = "absolute";
        this.infoDiv.style.top = "100px";
        this.infoDiv.style.left= "110px";
        this.infoDiv.style.display = "none";
    }

    repositionInfoDiv(x, y) {
        this.infoDiv.style.display = "table-cell";
        this.infoDiv.style.left = `${x + 5}px`;
        this.infoDiv.style.top = `${y - 135}px`;
    }

    fillInfo(text) {
        this.infoDiv.innerHTML = text
    }

    hideInfoDiv() {
        this.infoDiv.style.display = "none";
    }

//-------------------PLAYER---------------------------------
    stylePlayerCanvas(playerSpritesheet) {
        this.playerCanvas.style.position = "absolute";
        this.playerCanvas.style.top = "10px";
        this.playerCanvas.style.left = "10px";
        this.playerCanvas.addEventListener("mousemove", this.displayPlayerInfo.bind(this))
        this.playerCanvas.addEventListener("mouseout", this.hideInfoDiv.bind(this))
        this.playerCTX.drawImage(playerSpritesheet , 14 , 713, 43, 55, 200, 250, 43 * 2, 55 * 2) 
        this.updatePlayerBars();
    }

    updatePlayerBars() {
        this.playerHealthBar.style.position = "absolute"
        this.playerHealthBar.style.top = "200px";
        this.playerHealthBar.style.left = "180px";
        this.playerHealthBar.value = this.player.currentHealth
        this.playerHealthBar.max = this.player.maxHealth
        this.playerAPBar.style.position = "absolute"
        this.playerAPBar.style.top = "220px";
        this.playerAPBar.style.left = "180px";
        this.playerAPBar.value = this.player.currentAP
        this.playerAPBar.max = this.player.maxAP
    }

   
    displayPlayerInfo(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY
        
        if (this.isPointInsideRect(cursorX, cursorY, 180, 238, 200 , 200)) { 
            this.repositionInfoDiv(cursorX, cursorY)
            this.fillInfo(`
                Health: ${this.player.currentHealth} / ${this.player.maxHealth}
                <br>
                AP: ${this.player.currentAP} / ${this.player.maxAP}
                <br>
                Attack: ${this.player.attack}
                <br>
                Defense: ${this.player.defense}
                <br>
                Magic: ${this.player.magic}   
                `)      
        } else {
            this.hideInfoDiv();
        }
   }

   
    
        //TODO----------------------------------------------------------------------------------------------------------------------------
    // playerAttackAnimation() {
    //         //impass reached, must refactor code into classes
           
    //     this.currentFrame++;
    
    //     console.log(this.currentFrame)
    //         if (this.currentFrame < 100) {
    //             this.playerAttackAnimationId = requestAnimationFrame(this.playerAttackAnimation.bind(this))
    //         }
    
    //         this.currentFrame = 1
    
    //         let i = this.animationFrameCount
          
    //         const frameArr = [
    //             [1,11,200,250],
    //             [2,11,220,250]
    //             // [3,11,240,250]
    //         ]
    //         // 408 limit, currently at 273
            
    //             if (i < frameArr.length) {
    //                 () => { drawPlayerFrame( frameArr[i][0], frameArr[i][1], frameArr[i][2], frameArr[i][3]) }
    //             //    drawPlayerFrame( frameArr[i][0], frameArr[i][1], frameArr[i][2], frameArr[i][3])
    //                this.animationFrameCount++;
    //             } else {
    //                 this.cancelAnimation(this.playerAttackAnimationId).bind(this)
    //             }
    //         this.playerAttackAnimationId = requestAnimationFrame(this.playerAttackAnimation.bind(this))
    //     }
    
    drawPlayerFrame(x, y, canvasX, canvasY) {
        this.playerCTX.clearRect(0,0,this.playerCanvas.width,this.playerCanvas.width)
    
        const scale = 2
        const width = 55
        const height = 55
        const scaledWidth = scale * width
        const scaledHeight = scale * height
        const spritesheetX = 10 + (x * 64)
        const spritesheetY = 9 + (y * 64)

        this.playerCTX.drawImage(this.warriorSpritesheet , spritesheetX , spritesheetY, width, height, canvasX, canvasY, scaledWidth, scaledHeight)
    }



//-------------------ENEMY--------------------------------------
    styleEnemyCanvas(enemySpritesheet) {
        this.enemyCanvas.style.position = "absolute";
        this.enemyCanvas.style.top = "10px";
        this.enemyCanvas.style.left = "410px";
        this.enemyCanvas.addEventListener("mousemove", this.displayEnemyInfo.bind(this)) 
        this.enemyCanvas.addEventListener("mouseout", this.hideInfoDiv.bind(this))
        this.enemyCTX.drawImage(enemySpritesheet , 9 , 10, 25, 31, 200, 265, 25 * 3, 31 * 3) 
        this.updateEnemyBars();
    }

    updateEnemyBars() {
        this.enemyHealthBar.style.position = "absolute"
        this.enemyHealthBar.style.top = "210px";
        this.enemyHealthBar.style.left = "570px";
        this.enemyHealthBar.value = this.enemy.currentHealth
        this.enemyHealthBar.max = this.enemy.maxHealth
        this.enemyAPBar.style.position = "absolute"
        this.enemyAPBar.style.top = "230px";
        this.enemyAPBar.style.left = "570px";
        this.enemyAPBar.value = this.enemy.currentAP
        this.enemyAPBar.max = this.enemy.maxAP
    }

    displayEnemyInfo(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY

        if (this.isPointInsideRect(cursorX, cursorY, 571, 248, 175 , 200)) { 
            this.repositionInfoDiv(cursorX, cursorY)
            this.fillInfo(`
                Health: ${this.enemy.currentHealth} / ${this.enemy.maxHealth}
                <br>
                AP: ${this.enemy.currentAP} / ${this.enemy.maxAP}
                <br>
                Attack: ${this.enemy.attack}
                <br>
                Defense: ${this.enemy.defense}
                <br>
                Magic:  ${this.enemy.magic}
                `)
        } else {
            this.hideInfoDiv()
        }
    }

//-------------------MENU--------------------------------------
    styleDefaultMenu(basicIconSpritesheet) {
        this.menuCanvas.style.position = "absolute";
        this.menuCanvas.style.top = "450px";
        this.menuCanvas.style.left= "110px";
        this.menuCTX.fillStyle = "blue"
        this.menuCTX.fillRect(0, 0,this.menuCanvas.width, this.menuCanvas.height)
        this.menuCanvas.removeEventListener("mousemove",this.displayAbilityInfoListener)
        this.menuCanvas.removeEventListener("click",this.executeAbilityListener)
        this.menuCanvas.addEventListener("mousemove", this.displayMenuInfoListener)
        this.menuCanvas.addEventListener("mouseout", this.hideInfoDiv.bind(this))
        this.menuCanvas.addEventListener("click", this.executeCommandListener)
        

        let buttonSize = 514
        let offset = 519

        this.menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonSize, buttonSize, 25, 25, 100, 100) //attack button
        this.menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonSize, buttonSize, 175, 25, 100, 100) //skill button
        this.menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonSize, buttonSize, 325, 25, 100, 100) //items button
        this.menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonSize, buttonSize, 475, 25, 100, 100) //defend button
    }

    styleAbilityMenu() {
        this.hideInfoDiv();
        this.menuCTX.clearRect(0,0,this.menuCanvas.width, this.menuCanvas.height)
        this.menuCTX.fillRect(0,0,this.menuCanvas.width, this.menuCanvas.height)
        this.removeMenuListeners();
        this.menuCanvas.addEventListener("click",this.executeAbilityListener)
        this.menuCanvas.addEventListener("mousemove",this.displayAbilityInfoListener)

        this.menuCTX.drawImage(this.basicIconSpritesheet, 1039, 0, 514, 514, 475, 25, 100, 100)  //back to main menu
        this.menuCTX.drawImage(this.healImage, 0, 0, 512, 509, 175, 25, 100, 100) //heal Icon
    }

    addMenuListeners() {
        this.menuCanvas.addEventListener("click", this.executeCommandListener)
        this.menuCanvas.addEventListener("mousemove", this.displayMenuInfoListener)
    }

    removeMenuListeners() {
        this.menuCanvas.removeEventListener("click", this.executeCommandListener)
        this.menuCanvas.removeEventListener("mousemove", this.displayMenuInfoListener)
    }

   

    displayMenuInfo(event) {
        const cursorX = event.clientX
         const cursorY = event.clientY
         const buttonSize = 100
         const buttonY = 478


        if (this.isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack
            
             this.repositionInfoDiv(cursorX, cursorY)
             this.fillInfo(`Deal ~${this.player.attack - this.enemy.defense} damage <br> to the enemy.`)


        } else if (this.isPointInsideRect(cursorX,cursorY,287, buttonY, buttonSize,buttonSize)) { //skills
            
            this.repositionInfoDiv(cursorX, cursorY)
            this.fillInfo("Use special abilities <br> These typically cost Ability Points. (AP)")

        } else if (this.isPointInsideRect(cursorX,cursorY, 437, buttonY, buttonSize,buttonSize)) { //items
    
            this.repositionInfoDiv(cursorX, cursorY)
            this.fillInfo("Use items to aid you <br> in battle. <br> (If you HAD any!)")
            
        } else if (this.isPointInsideRect(cursorX,cursorY, 587, buttonY, buttonSize,buttonSize)) { //defend
            
            this.repositionInfoDiv(cursorX, cursorY)
            this.fillInfo("Boost your defense <br> by 50% for one turn.")

        } else {
            this.hideInfoDiv();
        }
        
    }


    executeCommand(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY
        const buttonSize = 100
        const buttonY = 480
        
        
        if (this.isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack
            //Player Attack
            this.menuCanvas.removeEventListener("click",this.executeCommandListener )
            
            let playerDamage = this.player.dealDamage(this.enemy);
            this.enemy.currentHealth -= playerDamage
            this.reportDamage("Player", playerDamage, "Enemy")
            this.updatePlayerBars();
            this.updateEnemyBars();

            console.log(`Enemy hp: ${this.enemy.currentHealth}`)

            //--------Enemy is defeated
            if (this.enemy.currentHealth <= 0) {
                let sound = document.getElementById("victory")
                setTimeout( function() { this.reportDefeated("Enemy") }.bind(this) , 1000)
                setTimeout( () => { sound.play() } , 500)
            } else {
            //------Enemy Attack--------------------------
                setTimeout(this.enemyTurn.bind(this),1000)
            }
            
        } else if (this.isPointInsideRect(cursorX,cursorY, 287, buttonY, buttonSize,buttonSize)) { //skills
            
            this.styleAbilityMenu()

                    
        } else if (this.isPointInsideRect(cursorX,cursorY, 437, buttonY, buttonSize,buttonSize)) { //items
           
   
            console.log("ITEMS")
        
        } else if (this.isPointInsideRect(cursorX,cursorY, 587, buttonY, buttonSize,buttonSize)) { //defend
            
            this.menuCanvas.removeEventListener("click", this.executeCommandListener)
            this.player.defense = this.player.defense * 1.50
            this.player.magic = this.player.magic * 1.50
            this.message("Defense boosted for one turn!");
            let sound = document.getElementById("defense")
            sound.play()
            setTimeout(this.enemyTurn.bind(this,"playerDefends"), 1000)
        
        } else {
            //invalid click sound
        }
   
    }
//-----------------------ABILITY MENU----------------------------
    displayAbilityInfo(event) {
        const cursorX = event.clientX
         const cursorY = event.clientY
         const buttonSize = 100
         const buttonY = 478


        if (this.isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //skill 1
            
            // this.repositionInfoDiv(cursorX, cursorY)
            // this.fillInfo("skill1")

        } else if (this.isPointInsideRect(cursorX,cursorY,287, buttonY, buttonSize,buttonSize)) { //heal
            
            this.repositionInfoDiv(cursorX, cursorY)
            this.fillInfo(`Recover ~${this.player.magic + 15} health <br> Costs 30 AP.`)

        } else if (this.isPointInsideRect(cursorX,cursorY, 437, buttonY, buttonSize,buttonSize)) { //skill 3
    
            // this.repositionInfoDiv(cursorX, cursorY)
            // this.fillInfo("skill3")
            
        } else if (this.isPointInsideRect(cursorX,cursorY, 587, buttonY, buttonSize,buttonSize)) { //return to main command menu
            
            this.repositionInfoDiv(cursorX, cursorY)
            this.fillInfo("Go back <br> to the main command menu.")

        } else {
            this.hideInfoDiv();
        }
        
    }

    executeAbility(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY
        const buttonSize = 100
        const buttonY = 480
        
        
        if (this.isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //skill 1
            
           
            
        } else if (this.isPointInsideRect(cursorX,cursorY, 287, buttonY, buttonSize,buttonSize)) { //heal
                
            this.styleDefaultMenu(this.basicIconSpritesheet)
            this.menuCanvas.removeEventListener("click", this.executeCommandListener)
            let result = this.player.heal()
            console.log(result) 
            this.player = result[0]
           if (result[1] === "Not enough AP!") {
               this.message(result[1])
               this.updatePlayerBars();
               this.menuCanvas.addEventListener("click", this.executeCommandListener)
           } else {
               this.message(result[1])
               this.updatePlayerBars();
            setTimeout(this.enemyTurn.bind(this),1000)
           }
                
        } else if (this.isPointInsideRect(cursorX,cursorY, 437, buttonY, buttonSize,buttonSize)) { //skill 2
           
        
        } else if (this.isPointInsideRect(cursorX,cursorY, 587, buttonY, buttonSize,buttonSize)) { //return to main command menu
            
            this.styleDefaultMenu(this.basicIconSpritesheet)
        
        } else {
            //invalid click sound
        }
   
    }

//-------------------HELPER FUNCTIONS---------------------------------
    isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){
        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&
            (rectY <= pointY) && (rectY + rectHeight >= pointY);
    }

    cancelAnimation(animationId) {
        cancelAnimationFrame(animationId)
    }

    enemyTurn(modifier) {
    
        let enemyAttackResult = this.enemy.dealDamage(this.player);
        let enemyDamage = enemyAttackResult[0]
        this.player = enemyAttackResult[1]
        this.enemy = enemyAttackResult[2]

        this.player.currentHealth -= enemyDamage
        this.reportDamage("Enemy", enemyDamage, "Player")
        this.updatePlayerBars();
        this.updateEnemyBars();
        console.log(`Player hp: ${this.player.currentHealth}`)

        if (modifier === "playerDefends") {
            this.player.defense = this.player.defense / 1.50
            this.player.magic = this.player.magic / 1.50
        }
                        
            //------Player is defeated
        if (this.player.currentHealth <= 0) {
            let sound = document.getElementById("game-over")
            // sound.play()
            setTimeout( function() { this.reportDefeated("Player") }.bind(this) , 1000)
            setTimeout( () => { sound.play() } , 500)
        } else {
            setTimeout( function() { this.menuCanvas.addEventListener("click", this.executeCommandListener) }.bind(this),1000)
        }
 
    }
    
}


module.exports = Game;