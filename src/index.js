const GameClass = require("./game.js");
const PlayerClass = require("./player.js");

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("battle-scene");
    
    // cavas.style.background = "url('../assets/icons/gold')"

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "blue";
    ctx.fillRect(0,0,canvas.width,canvas.height)
    
    const game = new GameClass();
    
    // new GameView(game,ctx).start();

});