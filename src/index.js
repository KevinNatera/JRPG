const GameClass = require("./game.js");
const PlayerClass = require("./player.js");
const EnemyClass = require("./enemy.js");


document.addEventListener("DOMContentLoaded", () => {

    const g = new GameClass()
    window.g = g

    //eventually refactor these
    const backgroundImage = new Image()
    backgroundImage.src = "assets/general_assets/background.png"
    backgroundImage.onload = function() {
        g.styleBackground(backgroundImage)
    }

     const warriorSpritesheet = new Image()
        warriorSpritesheet.src = "assets/spritesheets/warrior_spritesheet.png"
        warriorSpritesheet.onload = function() {
            g.stylePlayerCanvas(warriorSpritesheet);
    }

    const enemyMageSprite = new Image()
        enemyMageSprite.src = "assets/spritesheets/mage_spritesheet.png"
        enemyMageSprite.onload = function() {
            g.styleEnemyCanvas(enemyMageSprite);
    }   

    const basicIconSpritesheet = new Image()
        basicIconSpritesheet.src = "assets/spritesheets/basic_icon_spritesheet.png"
        basicIconSpritesheet.onload = function() {
            g.styleDefaultMenu(basicIconSpritesheet);
            g.styleMessageDiv();
            g.styleInfoDiv();
            g.basicIconSpritesheet = basicIconSpritesheet
            
            let healImage = new Image() 
            healImage.src = "assets/ability_icons/heal.png"
            g.healImage = healImage
        }
    
        let battleTheme = document.getElementById("battle-theme")
        battleTheme.volume = 0.5
});









// game.js:178 Uncaught TypeError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(CSSImageValue or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or OffscreenCanvas or SVGImageElement or VideoFrame)'.
//     at Game.drawPlayerFrame (game.js:178:24)
//     at Game.playerAttackAnimation (game.js:159:25)