const GameClass = require("./game.js");
const PlayerClass = require("./player.js");
const EnemyClass = require("./enemy.js");





document.addEventListener("DOMContentLoaded", () => {

    const backgroundCanvas = document.getElementById("battle-scene");
    const backGroundCTX = backgroundCanvas.getContext("2d");
    
    function isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){
        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&
                (rectY <= pointY) && (rectY + rectHeight >= pointY);
    }


    //--------MESSAGE-----------------------------------------------------------------------------------

    const messageCanvas = document.getElementById("message-canvas");
    const messageCTX = messageCanvas.getContext("2d");

    messageCanvas.style.position = "absolute";
    messageCanvas.style.top = "50px";
    messageCanvas.style.left= "110px";

    messageCTX.font = "40px Arial";
    messageCTX.textAlign = "center";
    messageCTX.fillText("Battle Start!", messageCanvas.width / 2, messageCanvas.height / 2)



    function message(text) {
        messageCTX.clearRect(0,0, messageCanvas.width, messageCanvas.height)
        messageCTX.fillText(text, messageCanvas.width / 2, messageCanvas.height / 2)
    }

    function reportDamage(damageDealer, damage, target) {
        messageCTX.clearRect(0,0, messageCanvas.width, messageCanvas.height)
        messageCTX.fillText(damageDealer + ` deals ${damage} to ` + target + "!", messageCanvas.width / 2, messageCanvas.height / 2)
    }

    function reportDefeated(defeatedTarget) {
        messageCTX.clearRect(0,0, messageCanvas.width, messageCanvas.height)
        messageCTX.fillText(defeatedTarget + " has been defeated!", messageCanvas.width / 2, messageCanvas.height / 2)
    }




  //------^---MESSAGE-------^--------------------------------------------------------------------------------



    //--------PLAYER --------------------------------------------------------------------------------------
    const playerCanvas = document.getElementById("player-canvas");
    const playerCTX = playerCanvas.getContext("2d");
    const playerHealthBar = document.getElementById("player-health-bar")
    const player = new PlayerClass();

    playerCanvas.style.position = "absolute";
    playerCanvas.style.top = "10px";
    playerCanvas.style.left= "10px";

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
    

    //----^---PLAYER ------^----------------------------------------------------------------------------




    //----------ENEMY-----------------------------------------------------------------------------------
    const enemyCanvas = document.getElementById("enemy-canvas");
    const enemyCTX = enemyCanvas.getContext("2d");
    const enemyHealthBar = document.getElementById("enemy-health-bar")
    const enemy =  new EnemyClass();


    enemyCanvas.style.position = "absolute";
    enemyCanvas.style.top = "10px";
    enemyCanvas.style.left= "410px";
    
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

    //-----^--ENEMY---------^-------------------------------------------------------------------------





    //------MENU---------------------------------------------------------------------------------
    const menuCanvas = document.getElementById("menu-canvas");
    const menuCTX = menuCanvas.getContext("2d");
    
    menuCanvas.style.position = "absolute";
    menuCanvas.style.top = "450px";
    menuCanvas.style.left= "110px";

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

   
    menuCanvas.addEventListener("mousemove", displayInfo) 
    menuCanvas.addEventListener("mouseout", hideInfo)
    menuCanvas.addEventListener("click", executeCommand)


    function displayInfo(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY
        const buttonSize = 100
        const buttonY = 480


        if (isPointInsideRect(cursorX, cursorY, 145, buttonY, buttonSize,buttonSize)) { //attack

            console.log("ATTACK")

        } else if (isPointInsideRect(cursorX,cursorY,290, buttonY, buttonSize,buttonSize)) { //skills

            console.log("ABILITIES")

        } else if (isPointInsideRect(cursorX,cursorY, 435, buttonY, buttonSize,buttonSize)) { //items

            console.log("ITEMS")

        } else if (isPointInsideRect(cursorX,cursorY, 580, buttonY, buttonSize,buttonSize)) { //defend

            console.log("DEFEND")

        } else {

        }

        // console.log("x")
        // console.log(cursorX)
        // console.log("y")
        // console.log(cursorY)
       
    }

    function hideInfo(event) {

    }

    
   
    

    function executeCommand(event) {
        const cursorX = event.clientX
        const cursorY = event.clientY
        const buttonSize = 100
        const buttonY = 480


        if (isPointInsideRect(cursorX, cursorY, 145, buttonY, buttonSize,buttonSize)) { //attack
            //Player Attack
            menuCanvas.removeEventListener("click", executeCommand)

            let playerDamage = player.dealDamage(enemy);

            enemy.currentHealth -= playerDamage
            reportDamage("Player",playerDamage, "Enemy")

            updateEnemyHealthBar();
            console.log(enemy.currentHealth)

            if (enemy.currentHealth === 0) {
                setTimeout(function() {
                    reportDefeated("Enemy") 
            }, 1000)

               
            } else {
                //------Enemy Attack--------------------------
                const enemyTurn = setTimeout(function() {

                    let enemyDamage = enemy.dealDamage(player);
                    player.currentHealth -= enemyDamage
        
                    reportDamage("Enemy", enemyDamage, "Player")
                    updatePlayerHealthBar();
                    console.log(player.currentHealth)
    
                    if (player.currentHealth === 0) {
                        setTimeout(function() {
                            reportDefeated("Player")
                        }, 1000)
                    } else {
                        menuCanvas.addEventListener("click", executeCommand)
                    }
                    
                }, 1000)

            }

         


           
            
          
            
       


           

        } else if (isPointInsideRect(cursorX,cursorY, 290, buttonY, buttonSize,buttonSize)) { //skills

            console.log("ABILITIES")
            
        } else if (isPointInsideRect(cursorX,cursorY, 435, buttonY, buttonSize,buttonSize)) { //items
            
            console.log("ITEMS")

        } else if (isPointInsideRect(cursorX,cursorY, 580, buttonY, buttonSize,buttonSize)) { //defend

            console.log("DEFEND")

        } else {

        }
    }

    //--^---MENU ----^------------------------------------------------------------------------


});

