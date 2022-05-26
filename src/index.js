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

    // menuCTX.fillStyle = "blue"
    // menuCTX.fillRect(0,0,menuCanvas.width, menuCanvas.height )

    const basicIconSpritesheet = new Image()
    basicIconSpritesheet.src = "../assets/spritesheets/basic_icon_spritesheet.png"
    basicIconSpritesheet.onload = function() {
        drawButtons();
    }

    function drawButtons() {
        let buttonWidth = 514
        let buttonHeight = 514
        let offset = 519

        menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonWidth, buttonHeight, 25, 25, 100, 100) //attack button
        menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonWidth, buttonHeight, 175, 25, 100, 100) //ability button
        menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonWidth, buttonHeight, 325, 25, 100, 100) //items button
        menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonWidth, buttonHeight, 475, 25, 100, 100) //defend button
    }
});

