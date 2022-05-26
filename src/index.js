const GameClass = require("./game.js");
const PlayerClass = require("./player.js");






document.addEventListener("DOMContentLoaded", () => {

    const backgroundCanvas = document.getElementById("battle-scene");
    const backGroundCTX = backgroundCanvas.getContext("2d");
    
    const menuCanvas = document.getElementById("menu-canvas");
    const menuCTX = menuCanvas.getContext("2d");
    
    menuCanvas.style.position = "absolute";
    menuCanvas.style.top = "400px";
    menuCanvas.style.left= "100px";

    menuCTX.fillStyle = "blue"
    menuCTX.fillRect(0,0,menuCanvas.width, menuCanvas.height )

    const playerSpriteSheet = new Image()
    playerSpriteSheet.src = "../assets/spritesheets/warrior_spritesheet.png"
    playerSpriteSheet.onload - function() {
        animate();
    }

});

function animate() {
    
}