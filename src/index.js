const GameClass = require("./game.js");
const PlayerClass = require("./player.js");






document.addEventListener("DOMContentLoaded", () => {

    const backgroundCanvas = document.getElementById("battle-scene");
    const backGroundCTX = backgroundCanvas.getContext("2d");
    
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


        if (isPointInsideRect(cursorX,cursorY, 80, buttonY, buttonSize,buttonSize)) { //attack
            console.log("ATTACK")
        } else if (isPointInsideRect(cursorX,cursorY, 230, buttonY, buttonSize,buttonSize)) { //skills
            console.log("ABILITIES")
        } else if (isPointInsideRect(cursorX,cursorY, 380, buttonY, buttonSize,buttonSize)) { //items
            console.log("ITEMS")
        } else if (isPointInsideRect(cursorX,cursorY, 530, buttonY, buttonSize,buttonSize)) { //defend
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
});

