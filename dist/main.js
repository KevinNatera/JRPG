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

eval("class Enemy {\n    constructor() {\n        this.currentHealth = 9\n        this.maxHealth = 9999\n        this.currentAP = 100\n        this.maxAP = 100\n        this.attack = 80\n        this.defense = 25\n        this.magic = 100\n        this.player = 0\n    }\n\n    // dealDamage(player) {\n\n    //     let damage = this.attack - player.defense \n    //     if (damage < 1) damage = 1\n    //     if (player.currentHealth - damage < 0) damage = player.currentHealth\n        \n    //     console.log(`Enemy deals ${damage} damage to player!`)\n    //     return damage\n    // }\n\n    dealDamage(player) {\n        this.player = player\n        let num = Math.floor(Math.random() * 100);\n        console.log(`Random enemy number: ${num}`)\n        if (num < 50 ) {\n            return this.attackOne.bind(this)();\n        } else {\n            return this.attackTwo.bind(this)(); //<-- remove parentheses for funny msg\n        }\n\n    }\n    \n\n    attackOne() {\n        let num1 = Math.floor(Math.random() * 50);\n        let num2 = Math.floor(Math.random() * 50);\n\n        let damage = this.attack + num1 - num2 - this.player.defense \n        if (damage < 1) damage = 1\n        if (this.player.currentHealth - damage < 0) damage = this.player.currentHealth\n        \n        console.log(`Enemy deals ${damage} damage to player!`)\n        let sound = document.getElementById(\"magic-attack\")\n        sound.play()\n        return [damage,this.player,this]\n    }\n\n    attackTwo() {\n        const cost = 50\n        if (this.currentAP < cost) {\n            return this.attackOne.bind(this)(); \n        }\n        this.currentAP -= cost\n        let num1 = Math.floor(Math.random() * 50);\n        let num2 = Math.floor(Math.random() * 50);\n\n        let damage = this.magic + num1 - num2 - this.player.magic\n        if (damage < 1) damage = 1\n        if (this.player.currentHealth - damage < 0) damage = this.player.currentHealth\n        console.log(`Enemy deals ${damage} damage to player!`)\n        let sound = document.getElementById(\"magic-critical-hit\")\n        sound.play()\n        return [damage,this.player,this]\n    }\n}\n\n\nmodule.exports = Enemy;\n\n//# sourceURL=webpack://untitled_jrpg/./src/enemy.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const PlayerClass = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst EnemyClass = __webpack_require__(/*! ./enemy.js */ \"./src/enemy.js\");\n\n\n\nclass Game {\n\n    constructor() {\n        this.backgroundCanvas = document.getElementById(\"battle-scene\");\n        this.backgroundCTX = this.backgroundCanvas.getContext(\"2d\");\n\n        this.playerCanvas = document.getElementById(\"player-canvas\");\n        this.enemyCanvas = document.getElementById(\"enemy-canvas\");\n        this.menuCanvas = document.getElementById(\"menu-canvas\");\n\n        this.playerCTX = this.playerCanvas.getContext(\"2d\");\n        this.enemyCTX = this.enemyCanvas.getContext(\"2d\");\n        this.menuCTX = this.menuCanvas.getContext(\"2d\");\n\n        this.player = new PlayerClass()\n        this.enemy = new EnemyClass()\n\n        this.playerHealthBar = document.getElementById(\"player-health-bar\")\n        this.playerAPBar = document.getElementById(\"player-AP-bar\")\n        this.enemyHealthBar = document.getElementById(\"enemy-health-bar\")\n        this.enemyAPBar = document.getElementById(\"enemy-AP-bar\")\n\n        this.messageDiv = document.getElementById(\"message-div\");\n        this.infoDiv = document.getElementById(\"info-div\");\n\n        this.executeCommandListener = this.executeCommand.bind(this)\n        this.displayMenuInfoListener = this.displayMenuInfo.bind(this)\n\n        this.warriorSpritesheet = new Image()\n        this.warriorSpritesheet.src = \"../assets/spritesheets/warrior_spritesheet.png\"\n        // this.playerAttackAnimationId;\n        // this.animationFrameCount = 0\n        // this.currentFrame = 1    \n    }\n\n//-------------------BACKGROUND---------------------------------\n    styleBackground(backgroundImage) {\n        this.backgroundCTX.drawImage(backgroundImage,0,0,800,600)\n    }\n\n//-------------------MESSAGE---------------------------------\n    styleMessageDiv() {\n       this.messageDiv.style.position = \"absolute\";\n       this.messageDiv.style.top = \"50px\";\n       this.messageDiv.style.left= \"110px\";\n       this.messageDiv.innerHTML = \"Battle Start!\"\n    }\n\n    message(text) {\n        //current char limit is 29\n        this.messageDiv.innerHTML = text\n    }\n\n    reportDamage(damageDealer, damage, target) {\n        this.messageDiv.innerHTML = damageDealer + ` deals ${damage} to ` + target + \"!\"\n    }\n\n    reportDefeated(defeatedTarget) {\n        this.messageDiv.innerHTML = defeatedTarget + \" has been defeated!\"\n    }\n\n//-------------------INFO--------------------------------------\n    styleInfoDiv() {\n        this.infoDiv.style.position = \"absolute\";\n        this.infoDiv.style.top = \"100px\";\n        this.infoDiv.style.left= \"110px\";\n        this.infoDiv.style.display = \"none\";\n    }\n\n    repositionInfoDiv(x, y) {\n        this.infoDiv.style.display = \"table-cell\";\n        this.infoDiv.style.left = `${x + 5}px`;\n        this.infoDiv.style.top = `${y - 135}px`;\n    }\n\n    fillInfo(text) {\n        this.infoDiv.innerHTML = text\n    }\n\n    hideInfoDiv() {\n        this.infoDiv.style.display = \"none\";\n    }\n\n//-------------------PLAYER---------------------------------\n    stylePlayerCanvas(playerSpritesheet) {\n        this.playerCanvas.style.position = \"absolute\";\n        this.playerCanvas.style.top = \"10px\";\n        this.playerCanvas.style.left = \"10px\";\n        this.playerCanvas.addEventListener(\"mousemove\", this.displayPlayerInfo.bind(this))\n        this.playerCanvas.addEventListener(\"mouseout\", this.hideInfoDiv.bind(this))\n        this.playerCTX.drawImage(playerSpritesheet , 14 , 713, 43, 55, 200, 250, 43 * 2, 55 * 2) \n        this.updatePlayerBars();\n    }\n\n    updatePlayerBars() {\n        this.playerHealthBar.style.position = \"absolute\"\n        this.playerHealthBar.style.top = \"200px\";\n        this.playerHealthBar.style.left = \"180px\";\n        this.playerHealthBar.value = this.player.currentHealth\n        this.playerHealthBar.max = this.player.maxHealth\n        this.playerAPBar.style.position = \"absolute\"\n        this.playerAPBar.style.top = \"220px\";\n        this.playerAPBar.style.left = \"180px\";\n        this.playerAPBar.value = this.player.currentAP\n        this.playerAPBar.max = this.player.maxAP\n    }\n\n   \n    displayPlayerInfo(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n        \n        if (this.isPointInsideRect(cursorX, cursorY, 180, 238, 200 , 200)) { \n            this.repositionInfoDiv(cursorX, cursorY)\n            this.fillInfo(`\n                Health: ${this.player.currentHealth} / ${this.player.maxHealth}\n                <br>\n                AP: ${this.player.currentAP} / ${this.player.maxAP}\n                <br>\n                Attack: ${this.player.attack}\n                <br>\n                Defense: ${this.player.defense}\n                <br>\n                Magic: ${this.player.magic}   \n                `)      \n        } else {\n            this.hideInfoDiv();\n        }\n   }\n\n   \n    \n        //TODO----------------------------------------------------------------------------------------------------------------------------\n    // playerAttackAnimation() {\n    //         //impass reached, must refactor code into classes\n           \n    //     this.currentFrame++;\n    \n    //     console.log(this.currentFrame)\n    //         if (this.currentFrame < 100) {\n    //             this.playerAttackAnimationId = requestAnimationFrame(this.playerAttackAnimation.bind(this))\n    //         }\n    \n    //         this.currentFrame = 1\n    \n    //         let i = this.animationFrameCount\n          \n    //         const frameArr = [\n    //             [1,11,200,250],\n    //             [2,11,220,250]\n    //             // [3,11,240,250]\n    //         ]\n    //         // 408 limit, currently at 273\n            \n    //             if (i < frameArr.length) {\n    //                 () => { drawPlayerFrame( frameArr[i][0], frameArr[i][1], frameArr[i][2], frameArr[i][3]) }\n    //             //    drawPlayerFrame( frameArr[i][0], frameArr[i][1], frameArr[i][2], frameArr[i][3])\n    //                this.animationFrameCount++;\n    //             } else {\n    //                 this.cancelAnimation(this.playerAttackAnimationId).bind(this)\n    //             }\n    //         this.playerAttackAnimationId = requestAnimationFrame(this.playerAttackAnimation.bind(this))\n    //     }\n    \n    drawPlayerFrame(x, y, canvasX, canvasY) {\n        this.playerCTX.clearRect(0,0,this.playerCanvas.width,this.playerCanvas.width)\n    \n        const scale = 2\n        const width = 55\n        const height = 55\n        const scaledWidth = scale * width\n        const scaledHeight = scale * height\n        const spritesheetX = 10 + (x * 64)\n        const spritesheetY = 9 + (y * 64)\n\n        this.playerCTX.drawImage(this.warriorSpritesheet , spritesheetX , spritesheetY, width, height, canvasX, canvasY, scaledWidth, scaledHeight)\n    }\n\n\n\n//-------------------ENEMY--------------------------------------\n    styleEnemyCanvas(enemySpritesheet) {\n        this.enemyCanvas.style.position = \"absolute\";\n        this.enemyCanvas.style.top = \"10px\";\n        this.enemyCanvas.style.left = \"410px\";\n        this.enemyCanvas.addEventListener(\"mousemove\", this.displayEnemyInfo.bind(this)) \n        this.enemyCanvas.addEventListener(\"mouseout\", this.hideInfoDiv.bind(this))\n        this.enemyCTX.drawImage(enemySpritesheet , 9 , 10, 25, 31, 200, 265, 25 * 3, 31 * 3) \n        this.updateEnemyBars();\n    }\n\n    updateEnemyBars() {\n        this.enemyHealthBar.style.position = \"absolute\"\n        this.enemyHealthBar.style.top = \"210px\";\n        this.enemyHealthBar.style.left = \"570px\";\n        this.enemyHealthBar.value = this.enemy.currentHealth\n        this.enemyHealthBar.max = this.enemy.maxHealth\n        this.enemyAPBar.style.position = \"absolute\"\n        this.enemyAPBar.style.top = \"230px\";\n        this.enemyAPBar.style.left = \"570px\";\n        this.enemyAPBar.value = this.enemy.currentAP\n        this.enemyAPBar.max = this.enemy.maxAP\n    }\n\n    displayEnemyInfo(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n\n        if (this.isPointInsideRect(cursorX, cursorY, 571, 248, 175 , 200)) { \n            this.repositionInfoDiv(cursorX, cursorY)\n            this.fillInfo(`\n                Health: ${this.enemy.currentHealth} / ${this.enemy.maxHealth}\n                <br>\n                AP: ${this.enemy.currentAP} / ${this.enemy.maxAP}\n                <br>\n                Attack: ${this.enemy.attack}\n                <br>\n                Defense: ${this.enemy.defense}\n                <br>\n                Magic:  ${this.enemy.magic}\n                `)\n        } else {\n            this.hideInfoDiv()\n        }\n    }\n\n//-------------------MENU--------------------------------------\n    styleDefaultMenu(basicIconSpritesheet) {\n        this.menuCanvas.style.position = \"absolute\";\n        this.menuCanvas.style.top = \"450px\";\n        this.menuCanvas.style.left= \"110px\";\n        this.menuCTX.fillStyle = \"blue\"\n        this.menuCTX.fillRect(0, 0,this.menuCanvas.width, this.menuCanvas.height )\n        this.menuCanvas.addEventListener(\"mousemove\", this.displayMenuInfoListener)\n        this.menuCanvas.addEventListener(\"mouseout\", this.hideInfoDiv.bind(this))\n        this.menuCanvas.addEventListener(\"click\", this.executeCommandListener)\n\n        let buttonSize = 514\n        let offset = 519\n\n        this.menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonSize, buttonSize, 25, 25, 100, 100) //attack button\n        this.menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonSize, buttonSize, 175, 25, 100, 100) //skill button\n        this.menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonSize, buttonSize, 325, 25, 100, 100) //items button\n        this.menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonSize, buttonSize, 475, 25, 100, 100) //defend button\n    }\n\n    styleAbilityMenu() {\n        this.menuCanvas.removeEventListener(\"click\", this.executeCommandListener)\n        this.menuCanvas.removeEventListener(\"click\", this.displayMenuInfo)\n\n    }\n\n   \n\n    displayMenuInfo(event) {\n        const cursorX = event.clientX\n         const cursorY = event.clientY\n         const buttonSize = 100\n         const buttonY = 478\n\n\n        if (this.isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack\n            \n             this.repositionInfoDiv(cursorX, cursorY)\n             this.fillInfo(`Deal ~${this.player.attack - this.enemy.defense} damage <br> to the enemy.`)\n\n\n        } else if (this.isPointInsideRect(cursorX,cursorY,287, buttonY, buttonSize,buttonSize)) { //skills\n            \n            this.repositionInfoDiv(cursorX, cursorY)\n            this.fillInfo(\"Use special abilities. <br> (If you HAD any!) <br> These typically cost Ability Points. (AP)\")\n\n        } else if (this.isPointInsideRect(cursorX,cursorY, 437, buttonY, buttonSize,buttonSize)) { //items\n    \n            this.repositionInfoDiv(cursorX, cursorY)\n            this.fillInfo(\"Use items to aid you <br> in battle. <br> (If you HAD any!)\")\n            \n        } else if (this.isPointInsideRect(cursorX,cursorY, 587, buttonY, buttonSize,buttonSize)) { //defend\n            \n            this.repositionInfoDiv(cursorX, cursorY)\n            this.fillInfo(\"Boost your defense <br> by 50% for one turn.\")\n\n        } else {\n            this.hideInfoDiv();\n        }\n        \n    }\n\n\n    executeCommand(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n        const buttonSize = 100\n        const buttonY = 480\n        \n        \n        if (this.isPointInsideRect(cursorX, cursorY, 137, buttonY, buttonSize,buttonSize)) { //attack\n            //Player Attack\n            this.menuCanvas.removeEventListener(\"click\",this.executeCommandListener )\n            \n            let playerDamage = this.player.dealDamage(this.enemy);\n            this.enemy.currentHealth -= playerDamage\n            this.reportDamage(\"Player\", playerDamage, \"Enemy\")\n            this.updatePlayerBars();\n            this.updateEnemyBars();\n\n            console.log(`Enemy hp: ${this.enemy.currentHealth}`)\n\n            //--------Enemy is defeated\n            if (this.enemy.currentHealth <= 0) {\n                let sound = document.getElementById(\"victory\")\n                setTimeout( function() { this.reportDefeated(\"Enemy\") }.bind(this) , 1000)\n                setTimeout( () => { sound.play() } , 500)\n            } else {\n            //------Enemy Attack--------------------------\n                setTimeout(this.enemyTurn.bind(this),1000)\n            }\n            \n        } else if (this.isPointInsideRect(cursorX,cursorY, 287, buttonY, buttonSize,buttonSize)) { //skills\n        \n            // this.playerAttackAnimationId = requestAnimationFrame(this.playerAttackAnimation.bind(this)); \n\n            console.log(\"ABILITIES\")\n                    \n        } else if (this.isPointInsideRect(cursorX,cursorY, 437, buttonY, buttonSize,buttonSize)) { //items\n           \n            // cancelAnimation(this.playerAttackAnimationId)\n            console.log(\"ITEMS\")\n        \n        } else if (this.isPointInsideRect(cursorX,cursorY, 587, buttonY, buttonSize,buttonSize)) { //defend\n            \n            this.menuCanvas.removeEventListener(\"click\", this.executeCommandListener)\n            this.player.defense = this.player.defense * 1.50\n            this.player.magic = this.player.magic * 1.50\n            this.message(\"Defense boosted for one turn!\");\n            let sound = document.getElementById(\"defense\")\n            sound.play()\n            setTimeout(this.enemyTurn.bind(this,\"playerDefends\"), 1000)\n        \n        } else {\n            //invalid click sound\n        }\n   \n    }\n\n//-------------------HELPER FUNCTIONS---------------------------------\n    isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){\n        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&\n            (rectY <= pointY) && (rectY + rectHeight >= pointY);\n    }\n\n    cancelAnimation(animationId) {\n        cancelAnimationFrame(animationId)\n    }\n\n    enemyTurn(modifier) {\n    \n        let enemyAttackResult = this.enemy.dealDamage(this.player);\n        let enemyDamage = enemyAttackResult[0]\n        this.player = enemyAttackResult[1]\n        this.enemy = enemyAttackResult[2]\n\n        this.player.currentHealth -= enemyDamage\n        this.reportDamage(\"Enemy\", enemyDamage, \"Player\")\n        this.updatePlayerBars();\n        this.updateEnemyBars();\n        console.log(`Player hp: ${this.player.currentHealth}`)\n\n        if (modifier === \"playerDefends\") {\n            this.player.defense = this.player.defense / 1.50\n            this.player.magic = this.player.magic / 1.50\n        }\n                        \n            //------Player is defeated\n        if (this.player.currentHealth <= 0) {\n            let sound = document.getElementById(\"game-over\")\n            // sound.play()\n            setTimeout( function() { this.reportDefeated(\"Player\") }.bind(this) , 1000)\n            setTimeout( () => { sound.play() } , 500)\n        } else {\n            setTimeout( function() { this.menuCanvas.addEventListener(\"click\", this.executeCommandListener) }.bind(this),1000)\n        }\n \n    }\n    \n}\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://untitled_jrpg/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const GameClass = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst PlayerClass = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\nconst EnemyClass = __webpack_require__(/*! ./enemy.js */ \"./src/enemy.js\");\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    const g = new GameClass()\n    window.g = g\n\n    //eventually refactor these\n    const backgroundImage = new Image()\n    backgroundImage.src = \"../assets/general_assets/background.png\"\n    backgroundImage.onload = function() {\n        g.styleBackground(backgroundImage)\n    }\n\n     const warriorSpritesheet = new Image()\n        warriorSpritesheet.src = \"../assets/spritesheets/warrior_spritesheet.png\"\n        warriorSpritesheet.onload = function() {\n            g.stylePlayerCanvas(warriorSpritesheet);\n    }\n\n    const enemyMageSprite = new Image()\n        enemyMageSprite.src = \"../assets/spritesheets/mage_spritesheet.png\"\n        enemyMageSprite.onload = function() {\n            g.styleEnemyCanvas(enemyMageSprite);\n    }   \n\n    const basicIconSpritesheet = new Image()\n        basicIconSpritesheet.src = \"../assets/spritesheets/basic_icon_spritesheet.png\"\n        basicIconSpritesheet.onload = function() {\n            g.styleDefaultMenu(basicIconSpritesheet);\n            g.styleMessageDiv();\n            g.styleInfoDiv();\n            g.basicIconSpritesheet = basicIconSpritesheet\n        }\n    \n});\n\n\n\n\n\n\n\n\n\n// game.js:178 Uncaught TypeError: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The provided value is not of type '(CSSImageValue or HTMLCanvasElement or HTMLImageElement or HTMLVideoElement or ImageBitmap or OffscreenCanvas or SVGImageElement or VideoFrame)'.\n//     at Game.drawPlayerFrame (game.js:178:24)\n//     at Game.playerAttackAnimation (game.js:159:25)\n\n//# sourceURL=webpack://untitled_jrpg/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

eval("class Player {\n    constructor() {\n        this.currentHealth = 1\n        this.maxHealth = 300\n        this.currentAP = 50\n        this.maxAP = 100\n        this.attack = 100\n        this.defense = 50\n        this.magic = 10\n    }\n\n    dealDamage(enemy) {\n        let num1 = Math.floor(Math.random() * 50); \n        let num2 = Math.floor(Math.random() * 50);\n        \n        let damage = this.attack + num1 - num2 - enemy.defense \n        if (damage < 1) damage = 1\n        if (enemy.currentHealth - damage < 0) damage = enemy.currentHealth\n        \n        console.log(`Player deals ${damage} damage to enemy!`)\n\n        let sound = document.getElementById(\"physical-critical-hit\")\n        sound.play()\n        return damage\n    }\n\n    \n\n    \n\n\n}\n\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://untitled_jrpg/./src/player.js?");

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