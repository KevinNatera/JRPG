/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/enemy.js":
/*!**********************!*\
  !*** ./src/enemy.js ***!
  \**********************/
/***/ ((module) => {

eval("class Enemy {\n    constructor() {\n        this.currentHealth = 230\n        this.maxHealth = 230\n        this.attack = 80\n        this.defense = 25\n        this.magic = 999\n        this.speed = 50\n    }\n\n    dealDamage(player) {\n        let damage = this.attack - player.defense \n        if (damage < 1) damage = 1\n        if (player.currentHealth - damage < 0) damage = player.currentHealth\n        \n        console.log(`Enemy deals ${damage} damage to player!`)\n        return damage\n    }\n}\n\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack://untitled_jrpg/./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module) => {

eval("class Game {\n    constructor() {\n\n    }\n}\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://untitled_jrpg/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameClass = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst PlayerClass = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst EnemyClass = __webpack_require__(/*! ./enemy.js */ \"./src/enemy.js\");\n\n//a ridiculous amount of refactoring needs to be done after MVP...\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n  \n\n    const backgroundCanvas = document.getElementById(\"battle-scene\");\n    const backgroundCTX = backgroundCanvas.getContext(\"2d\");\n\n\n    const backgroundImage = new Image()\n    backgroundImage.src = \"../assets/general_assets/background.png\"\n    backgroundImage.onload = function() {\n        backgroundCTX.drawImage(backgroundImage,0,0,800,600)\n    }\n\n\n    \n   \n\n\n    //--------MESSAGE-----------------------------------------------------------------------------------\n    //TODO: add message log of all messages printed \n    //TODO: convert this into a div\n\n    const messageDiv = document.getElementById(\"message-div\");\n    \n    messageDiv.style.position = \"absolute\";\n    messageDiv.style.top = \"50px\";\n    messageDiv.style.left= \"110px\";\n    messageDiv.innerHTML = \"Battle Start!\"\n\n\n\n    function message(text) {\n        messageDiv.innerHTML = text\n    }\n\n \n\n    function reportDamage(damageDealer, damage, target) {\n        messageDiv.innerHTML = damageDealer + ` deals ${damage} to ` + target + \"!\"\n    }\n\n    function reportDefeated(defeatedTarget) {\n        messageDiv.innerHTML = defeatedTarget + \" has been defeated!\"\n    }\n\n\n\n\n  //------^---MESSAGE-------^--------------------------------------------------------------------------------\n\n\n\n   //----------INFO-----------------------------------------------------------------------------------------\n    const infoDiv = document.getElementById(\"info-div\");\n    \n\n\n    infoDiv.style.position = \"absolute\";\n    infoDiv.style.top = \"100px\";\n    infoDiv.style.left= \"110px\";\n    infoDiv.style.display = \"none\";\n\n\n    function repositionInfoDiv(x, y) {\n        infoDiv.style.display = \"table-cell\";\n        infoDiv.style.left = `${x + 10}px`;\n        infoDiv.style.top = `${y - 120}px`;\n    }\n\n    function fillInfo(text) {\n        infoDiv.innerHTML = text\n    }\n\n    function hideInfoDiv(event) {\n        infoDiv.style.display = \"none\";\n    }\n\n    //------^---INFO-------^--------------------------------------------------------------------------------\n\n\n    //--------PLAYER --------------------------------------------------------------------------------------\n    const playerCanvas = document.getElementById(\"player-canvas\");\n    const playerCTX = playerCanvas.getContext(\"2d\");\n    const playerHealthBar = document.getElementById(\"player-health-bar\")\n    const player = new PlayerClass();\n\n    playerCanvas.style.position = \"absolute\";\n    playerCanvas.style.top = \"10px\";\n    playerCanvas.style.left= \"10px\";\n    playerCanvas.addEventListener(\"mousemove\", displayPlayerInfo) \n    playerCanvas.addEventListener(\"mouseout\", hideInfoDiv)\n\n    const warriorSpritesheet = new Image()\n    warriorSpritesheet.src = \"../assets/spritesheets/warrior_spritesheet.png\"\n    warriorSpritesheet.onload = function() {\n        drawPlayer();\n    }\n\n    function drawPlayer() {      \n        playerCTX.drawImage(warriorSpritesheet , 14 , 713, 43, 55, 200, 250, 43 * 2, 55 * 2) \n        \n        playerHealthBar.style.position = \"absolute\"\n        playerHealthBar.style.top = \"220px\";\n        playerHealthBar.style.left = \"180px\";\n       \n        updatePlayerHealthBar()\n    }\n\n    function updatePlayerHealthBar() {\n        playerHealthBar.value = player.currentHealth\n        playerHealthBar.max = player.maxHealth\n    }\n\n    function displayPlayerInfo(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n\n\n        if (isPointInsideRect(cursorX, cursorY, 180, 238, 200 , 200)) { \n            repositionInfoDiv(cursorX, cursorY)\n            fillInfo(`\n            Health: ${player.currentHealth} / ${player.maxHealth}\n            <br>\n            Attack: ${player.attack}\n            <br>\n            Defense: ${player.defense}\n            <br>\n            Magic: ${player.magic}\n            <br>\n            Speed: ${player.speed}\n            \n            `)\n            \n        } else {\n            hideInfoDiv();\n        }\n\n    }\n    \n\n    //----^---PLAYER ------^----------------------------------------------------------------------------\n\n\n\n\n    //----------ENEMY-----------------------------------------------------------------------------------\n    const enemyCanvas = document.getElementById(\"enemy-canvas\");\n    const enemyCTX = enemyCanvas.getContext(\"2d\");\n    const enemyHealthBar = document.getElementById(\"enemy-health-bar\")\n    const enemy =  new EnemyClass();\n\n\n    enemyCanvas.style.position = \"absolute\";\n    enemyCanvas.style.top = \"10px\";\n    enemyCanvas.style.left= \"410px\";\n    enemyCanvas.addEventListener(\"mousemove\", displayEnemyInfo) \n    enemyCanvas.addEventListener(\"mouseout\", hideInfoDiv)\n    \n    const enemyMageSprite = new Image()\n    enemyMageSprite.src = \"../assets/spritesheets/mage_spritesheet.png\"\n    enemyMageSprite.onload = function() {\n        drawEnemy();\n    }   \n\n  \n\n\n    function drawEnemy() {\n        enemyCTX.drawImage(enemyMageSprite , 9 , 10, 25, 31, 200, 265, 25 * 3, 31 * 3)\n\n        enemyHealthBar.style.position = \"absolute\"\n        enemyHealthBar.style.top = \"230px\";\n        enemyHealthBar.style.left = \"570px\";\n       \n        updateEnemyHealthBar();\n    }\n\n    function updateEnemyHealthBar() {\n        enemyHealthBar.value = enemy.currentHealth\n        enemyHealthBar.max = enemy.maxHealth\n    }\n\n\n\n    function displayEnemyInfo(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n\n       \n\n\n        if (isPointInsideRect(cursorX, cursorY, 571, 248, 175 , 200)) { \n            repositionInfoDiv(cursorX, cursorY)\n            fillInfo(`\n\n               Health: ${enemy.currentHealth} / ${enemy.maxHealth}\n                <br>\n                Attack: ${enemy.attack}\n                <br>\n                Defense: ${enemy.defense}\n                <br>\n                Magic:  ${enemy.magic}\n                <br> \n                Speed: ${enemy.speed}\n\n            `)\n            infoDiv\n\n        } else {\n            hideInfoDiv()\n        }\n    }\n\n    //-----^--ENEMY---------^-------------------------------------------------------------------------\n\n\n\n\n\n    //------MENU---------------------------------------------------------------------------------\n    const menuCanvas = document.getElementById(\"menu-canvas\");\n    const menuCTX = menuCanvas.getContext(\"2d\");\n    \n    menuCanvas.style.position = \"absolute\";\n    menuCanvas.style.top = \"450px\";\n    menuCanvas.style.left= \"110px\";\n    menuCanvas.addEventListener(\"mousemove\", displayMenuInfo) \n    menuCanvas.addEventListener(\"mouseout\", hideInfoDiv)\n    menuCanvas.addEventListener(\"click\", executeCommand)\n\n    menuCTX.fillStyle = \"blue\"\n    menuCTX.fillRect(0,0,menuCanvas.width, menuCanvas.height )\n\n    const basicIconSpritesheet = new Image()\n    basicIconSpritesheet.src = \"../assets/spritesheets/basic_icon_spritesheet.png\"\n    basicIconSpritesheet.onload = function() {\n        drawButtons();\n    }\n\n    function drawButtons() {\n        let buttonSize = 514\n        let offset = 519\n\n        menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonSize, buttonSize, 25, 25, 100, 100) //attack button\n        menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonSize, buttonSize, 175, 25, 100, 100) //skill button\n        menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonSize, buttonSize, 325, 25, 100, 100) //items button\n        menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonSize, buttonSize, 475, 25, 100, 100) //defend button\n    }\n\n    //When you hover over a button ---------------------------------------\n\n    function displayMenuInfo(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n        const buttonSize = 100\n        const buttonY = 478\n\n\n        if (isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack\n            \n            repositionInfoDiv(cursorX, cursorY)\n            fillInfo(`Deal ${player.attack - enemy.defense} damage <br> to the enemy.`)\n\n\n        } else if (isPointInsideRect(cursorX,cursorY,282, buttonY, buttonSize,buttonSize)) { //skills\n            \n            repositionInfoDiv(cursorX, cursorY)\n            fillInfo(\"Use special abilities. <br>  (If you HAD any!)\")\n\n        } else if (isPointInsideRect(cursorX,cursorY, 427, buttonY, buttonSize,buttonSize)) { //items\n    \n            repositionInfoDiv(cursorX, cursorY)\n            fillInfo(\"Use items to aid you <br> in battle. (If you HAD any!)\")\n            \n        } else if (isPointInsideRect(cursorX,cursorY, 572, buttonY, buttonSize,buttonSize)) { //defend\n            \n            repositionInfoDiv(cursorX, cursorY)\n            fillInfo(\"Boost your defense <br> by 50% for one turn.\")\n\n        } else {\n            infoDiv.style.display = \"none\";\n        }\n\n\n    }\n\n    \n    //When you press a button-----------------------------------------\n\n    function executeCommand(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n        const buttonSize = 100\n        const buttonY = 480\n\n\n        if (isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack\n            //Player Attack\n            menuCanvas.removeEventListener(\"click\", executeCommand)\n\n            let playerDamage = player.dealDamage(enemy);\n\n            enemy.currentHealth -= playerDamage\n            reportDamage(\"Player\",playerDamage, \"Enemy\")\n\n            updateEnemyHealthBar();\n            console.log(enemy.currentHealth)\n\n            //--------Enemy is defeated\n            if (enemy.currentHealth === 0) {\n                setTimeout(function() {\n                    reportDefeated(\"Enemy\") \n            }, 1000)\n\n               \n            } else {\n                //------Enemy Attack--------------------------\n                enemyTurn();\n            }\n\n\n           \n\n        } else if (isPointInsideRect(cursorX,cursorY, 282, buttonY, buttonSize,buttonSize)) { //skills\n\n            console.log(\"ABILITIES\")\n            \n        } else if (isPointInsideRect(cursorX,cursorY, 427, buttonY, buttonSize,buttonSize)) { //items\n            \n            console.log(\"ITEMS\")\n\n        } else if (isPointInsideRect(cursorX,cursorY, 572, buttonY, buttonSize,buttonSize)) { //defend\n           \n           player.defense = player.defense * 1.50\n           message(\"Defense boosted for one turn!\")\n           enemyTurn();\n           player.defense = player.defense / 1.50\n\n        } else {\n            //invalid click sound\n        }\n\n        //Command Helper Functions\n\n\n        function enemyTurn() {\n            //done before setTimeout to account for stat changes\n            let enemyDamage = enemy.dealDamage(player);\n            \n                setTimeout(function() {\n                    player.currentHealth -= enemyDamage\n                    reportDamage(\"Enemy\", enemyDamage, \"Player\")\n                    updatePlayerHealthBar();\n                    console.log(player.currentHealth)\n                \n                //------Player is defeated\n                     if (player.currentHealth === 0) {\n                         setTimeout(function() {\n                             reportDefeated(\"Player\")\n                        }, 1000)\n               } else {\n                 //add setTimeout to prevent attack spam\n                 menuCanvas.addEventListener(\"click\", executeCommand)\n              }\n\n            }, 1000)\n        }\n\n\n    }\n\n    //--^---MENU ----^------------------------------------------------------------------------\n\n\n});\n\n\n\n//Helper functions\n\nfunction isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){\n    return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&\n            (rectY <= pointY) && (rectY + rectHeight >= pointY);\n}\n\n//# sourceURL=webpack://untitled_jrpg/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

eval("class Player {\n    constructor() {\n        this.currentHealth = 200\n        this.maxHealth = 300\n        this.attack = 100\n        this.defense = 50\n        this.magic = 10\n        this.speed = 50\n    }\n\n    dealDamage(enemy) {\n        let damage = this.attack - enemy.defense \n        if (damage < 1) damage = 1\n        if (enemy.currentHealth - damage < 0) damage = enemy.currentHealth\n        \n        console.log(`Player deals ${damage} damage to enemy!`)\n        return damage\n    }\n\n    \n\n\n}\n\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://untitled_jrpg/./src/player.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;