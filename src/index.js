const GameClass = require("./game.js");
const PlayerClass = require("./player.js");
const EnemyClass = require("./enemy.js");

//a ridiculous amount of refactoring needs to be done after MVP...



document.addEventListener("DOMContentLoaded", () => {

    const backgroundCanvas = document.getElementById("battle-scene");
    const backGroundCTX = backgroundCanvas.getContext("2d");
    
    function isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){
        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&
                (rectY <= pointY) && (rectY + rectHeight >= pointY);
    }


    //--------MESSAGE-----------------------------------------------------------------------------------
    //TODO: add message log of all messages printed 
    //TODO: convert this into a div

    const messageCanvas = document.getElementById("message-canvas");
    const messageCTX = messageCanvas.getContext("2d");

    messageCanvas.style.position = "absolute";
    messageCanvas.style.top = "50px";
    messageCanvas.style.left= "110px";

    messageCTX.font = "35px Verdana";
    messageCTX.textAlign = "center"; 
    messageCTX.fillText("Battle Start!", messageCanvas.width / 2, 60)



    function message(text) {
        messageCTX.clearRect(0,0, messageCanvas.width, messageCanvas.height)
        messageCTX.fillText(text, messageCanvas.width / 2, 60)
    }

    function reportDamage(damageDealer, damage, target) {
        messageCTX.clearRect(0,0, messageCanvas.width, messageCanvas.height)
        messageCTX.fillText(damageDealer + ` deals ${damage} to ` + target + "!", messageCanvas.width / 2, 60)
    }

    function reportDefeated(defeatedTarget) {
        messageCTX.clearRect(0,0, messageCanvas.width, messageCanvas.height)
        messageCTX.fillText(defeatedTarget + " has been defeated!", messageCanvas.width / 2, 60)
    }




  //------^---MESSAGE-------^--------------------------------------------------------------------------------



   //----------INFO-----------------------------------------------------------------------------------------
    const infoDiv = document.getElementById("info-div");
    


    infoDiv.style.position = "absolute";
    infoDiv.style.top = "100px";
    infoDiv.style.left= "110px";
    infoDiv.style.display = "none";


    function repositionInfoDiv(x, y) {
        infoDiv.style.display = "table-cell";
        infoDiv.style.left = `${x + 10}px`;
        infoDiv.style.top = `${y - 120}px`;
    }

    function fillInfo(text) {
        infoDiv.innerHTML = text
    }

    function hideInfoDiv(event) {
        infoDiv.style.display = "none";
    }

    //------^---INFO-------^--------------------------------------------------------------------------------


    //--------PLAYER --------------------------------------------------------------------------------------
    const playerCanvas = document.getElementById("player-canvas");
    const playerCTX = playerCanvas.getContext("2d");
    const playerHealthBar = document.getElementById("player-health-bar")
    const player = new PlayerClass();

    playerCanvas.style.position = "absolute";
    playerCanvas.style.top = "10px";
    playerCanvas.style.left= "10px";
    playerCanvas.addEventListener("mousemove", displayPlayerInfo) 
    playerCanvas.addEventListener("mouseout", hideInfoDiv)

    const warriorSpritesheet = new Image()
    warriorSpritesheet.src = "../assets/spritesheets/warrior_spritesheet.png"
    warriorSpritesheet.onload = function() {
        drawPlayer();
    }

    function drawPlayer() {      
        playerCTX.drawImage(warriorSpritesheet , 14 , 713, 43, 55, 200, 250, 43 * 2, 55 * 2) 
        
        playerHealthBar.style.position = "absolute"
        playerHealthBar.style.top = "220px";
        playerHealthBar.style.left = "180px";
       
        updatePlayerHealthBar()
    }

    function updatePlayerHealthBar() {
        playerHealthBar.value = player.currentHealth
        playerHealthBar.max = player.maxHealth
    }

    function displayPlayerInfo(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY


        if (isPointInsideRect(cursorX, cursorY, 180, 238, 200 , 200)) { 
            repositionInfoDiv(cursorX, cursorY)
            fillInfo(`
            Health: ${player.currentHealth} / ${player.maxHealth}
            <br>
            Attack: ${player.attack}
            <br>
            Defense: ${player.defense}
            <br>
            Magic: ${player.magic}
            <br>
            Speed: ${player.speed}
            
            `)
            
        } else {
            hideInfoDiv();
        }

    }
    

    //----^---PLAYER ------^----------------------------------------------------------------------------




    //----------ENEMY-----------------------------------------------------------------------------------
    const enemyCanvas = document.getElementById("enemy-canvas");
    const enemyCTX = enemyCanvas.getContext("2d");
    const enemyHealthBar = document.getElementById("enemy-health-bar")
    const enemy =  new EnemyClass();


    enemyCanvas.style.position = "absolute";
    enemyCanvas.style.top = "10px";
    enemyCanvas.style.left= "410px";
    enemyCanvas.addEventListener("mousemove", displayEnemyInfo) 
    enemyCanvas.addEventListener("mouseout", hideInfoDiv)
    
    const enemyMageSprite = new Image()
    enemyMageSprite.src = "../assets/spritesheets/mage_spritesheet.png"
    enemyMageSprite.onload = function() {
        drawEnemy();
    }   

  


    function drawEnemy() {
        enemyCTX.drawImage(enemyMageSprite , 9 , 10, 25, 31, 200, 265, 25 * 3, 31 * 3)

        enemyHealthBar.style.position = "absolute"
        enemyHealthBar.style.top = "230px";
        enemyHealthBar.style.left = "570px";
       
        updateEnemyHealthBar();
    }

    function updateEnemyHealthBar() {
        enemyHealthBar.value = enemy.currentHealth
        enemyHealthBar.max = enemy.maxHealth
    }



    function displayEnemyInfo(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY

       


        if (isPointInsideRect(cursorX, cursorY, 571, 248, 175 , 200)) { 
            repositionInfoDiv(cursorX, cursorY)
            fillInfo(`

               Health: ${enemy.currentHealth} / ${enemy.maxHealth}
                <br>
                Attack: ${enemy.attack}
                <br>
                Defense: ${enemy.defense}
                <br>
                Magic:  ${enemy.magic}
                <br> 
                Speed: ${enemy.speed}

            `)
            infoDiv

        } else {
            hideInfoDiv()
        }
    }

    //-----^--ENEMY---------^-------------------------------------------------------------------------





    //------MENU---------------------------------------------------------------------------------
    const menuCanvas = document.getElementById("menu-canvas");
    const menuCTX = menuCanvas.getContext("2d");
    
    menuCanvas.style.position = "absolute";
    menuCanvas.style.top = "450px";
    menuCanvas.style.left= "110px";
    menuCanvas.addEventListener("mousemove", displayMenuInfo) 
    menuCanvas.addEventListener("mouseout", hideInfoDiv)
    menuCanvas.addEventListener("click", executeCommand)

    menuCTX.fillStyle = "blue"
    menuCTX.fillRect(0,0,menuCanvas.width, menuCanvas.height )

    const basicIconSpritesheet = new Image()
    basicIconSpritesheet.src = "../assets/spritesheets/basic_icon_spritesheet.png"
    basicIconSpritesheet.onload = function() {
        drawButtons();
    }

    function drawButtons() {
        let buttonSize = 514
        let offset = 519

        menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonSize, buttonSize, 25, 25, 100, 100) //attack button
        menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonSize, buttonSize, 175, 25, 100, 100) //skill button
        menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonSize, buttonSize, 325, 25, 100, 100) //items button
        menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonSize, buttonSize, 475, 25, 100, 100) //defend button
    }

    //When you hover over a button ---------------------------------------

    function displayMenuInfo(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY
        const buttonSize = 100
        const buttonY = 478


        if (isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack
            
            repositionInfoDiv(cursorX, cursorY)
            fillInfo(`Deal ${player.attack - enemy.defense} damage <br> to the enemy.`)


        } else if (isPointInsideRect(cursorX,cursorY,282, buttonY, buttonSize,buttonSize)) { //skills
            
            repositionInfoDiv(cursorX, cursorY)
            fillInfo("Use special abilities. <br>  (If you HAD any!)")

        } else if (isPointInsideRect(cursorX,cursorY, 427, buttonY, buttonSize,buttonSize)) { //items
    
            repositionInfoDiv(cursorX, cursorY)
            fillInfo("Use items to aid you <br> in battle. (If you HAD any!)")
            
        } else if (isPointInsideRect(cursorX,cursorY, 572, buttonY, buttonSize,buttonSize)) { //defend
            
            repositionInfoDiv(cursorX, cursorY)
            fillInfo("Boost your defense <br> by 50% for one turn.")

        } else {
            infoDiv.style.display = "none";
        }

        // console.log("x")
        // console.log(cursorX)
        // console.log("y")
        // console.log(cursorY)
       
    }

    
    //When you press a button-----------------------------------------

    function executeCommand(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY
        const buttonSize = 100
        const buttonY = 480


        if (isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack
            //Player Attack
            menuCanvas.removeEventListener("click", executeCommand)

            let playerDamage = player.dealDamage(enemy);

            enemy.currentHealth -= playerDamage
            reportDamage("Player",playerDamage, "Enemy")

            updateEnemyHealthBar();
            console.log(enemy.currentHealth)

            //--------Enemy is defeated
            if (enemy.currentHealth === 0) {
                setTimeout(function() {
                    reportDefeated("Enemy") 
            }, 1000)

               
            } else {
                //------Enemy Attack--------------------------
                enemyTurn();
            }


           

        } else if (isPointInsideRect(cursorX,cursorY, 282, buttonY, buttonSize,buttonSize)) { //skills

            console.log("ABILITIES")
            
        } else if (isPointInsideRect(cursorX,cursorY, 427, buttonY, buttonSize,buttonSize)) { //items
            
            console.log("ITEMS")

        } else if (isPointInsideRect(cursorX,cursorY, 572, buttonY, buttonSize,buttonSize)) { //defend
           
           player.defense = player.defense * 1.50
           message("Defense boosted for one turn!")
           enemyTurn();
           player.defense = player.defense / 1.50

        } else {
            //invalid click sound
        }

        //Command Helper Functions


        function enemyTurn() {
            //done before setTimeout to account for stat changes
            let enemyDamage = enemy.dealDamage(player);
            
                setTimeout(function() {
                    player.currentHealth -= enemyDamage
                    reportDamage("Enemy", enemyDamage, "Player")
                    updatePlayerHealthBar();
                    console.log(player.currentHealth)
                
                //------Player is defeated
                     if (player.currentHealth === 0) {
                         setTimeout(function() {
                             reportDefeated("Player")
                        }, 1000)
               } else {
                 //add setTimeout to prevent attack spam
                 menuCanvas.addEventListener("click", executeCommand)
              }

            }, 1000)
        }


    }

    //--^---MENU ----^------------------------------------------------------------------------


});

