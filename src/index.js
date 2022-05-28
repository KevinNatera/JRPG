const GameClass = require("./game.js");
const PlayerClass = require("./player.js");






document.addEventListener("DOMContentLoaded", () => {

    const backgroundCanvas = document.getElementById("battle-scene");
    const backGroundCTX = backgroundCanvas.getContext("2d");
    

    //------MENU-----------
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

    
    function isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){
        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&
                (rectY <= pointY) && (rectY + rectHeight >= pointY);
    }

    //--^---MENU ----^--





    //--------MESSAGE-------------




    //------^---MESSAGE-------^---






    //--------PLAYER -------------
    const playerCanvas = document.getElementById("player-canvas");
    const playerCTX = playerCanvas.getContext("2d");

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
        
    }
    

    //----^---PLAYER ------^------




    //----------ENEMY-------------




    //-----^--ENEMY---------^---


});

