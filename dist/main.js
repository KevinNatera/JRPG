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

eval("const GameClass = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst PlayerClass = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    const backgroundCanvas = document.getElementById(\"battle-scene\");\n    const backGroundCTX = backgroundCanvas.getContext(\"2d\");\n    \n    function isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){\n        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&\n                (rectY <= pointY) && (rectY + rectHeight >= pointY);\n    }\n\n\n    //--------MESSAGE-------------\n\n    const messageCanvas = document.getElementById(\"message-canvas\");\n    const messageCTX = messageCanvas.getContext(\"2d\");\n\n\n\n    messageCanvas.style.position = \"absolute\";\n    messageCanvas.style.top = \"50px\";\n    messageCanvas.style.left= \"110px\";\n\n  //------^---MESSAGE-------^---\n\n\n\n    //--------PLAYER -------------\n    const playerCanvas = document.getElementById(\"player-canvas\");\n    const playerCTX = playerCanvas.getContext(\"2d\");\n    const playerHealthBar = document.getElementById(\"player-health-bar\")\n    const player = new PlayerClass();\n\n    playerCanvas.style.position = \"absolute\";\n    playerCanvas.style.top = \"10px\";\n    playerCanvas.style.left= \"10px\";\n\n    const warriorSpritesheet = new Image()\n    warriorSpritesheet.src = \"../assets/spritesheets/warrior_spritesheet.png\"\n    warriorSpritesheet.onload = function() {\n        drawPlayer();\n    }\n\n    function drawPlayer() {\n        playerCTX.drawImage(warriorSpritesheet , 14 , 713, 43, 55, 200, 250, 43 * 2, 55 * 2) \n        \n        playerHealthBar.style.position = \"absolute\"\n        playerHealthBar.style.top = \"220px\";\n        playerHealthBar.style.left = \"180px\";\n       \n        playerHealthBar.value = player.currentHealth\n        playerHealthBar.max = player.maxHealth\n       \n       \n    }\n    \n\n    //----^---PLAYER ------^------\n\n\n\n\n    //----------ENEMY-------------\n    const enemyCanvas = document.getElementById(\"enemy-canvas\");\n    const enemyCTX = enemyCanvas.getContext(\"2d\");\n    const enemyHealthBar = document.getElementById(\"enemy-health-bar\")\n\n\n\n    enemyCanvas.style.position = \"absolute\";\n    enemyCanvas.style.top = \"10px\";\n    enemyCanvas.style.left= \"410px\";\n    \n    //FIND ENEMY SPRITE AND GET MESSAGE BOX UP\n    const enemyMageSprite = new Image()\n    enemyMageSprite.src = \"../assets/spritesheets/mage_spritesheet.png\"\n    enemyMageSprite.onload = function() {\n        drawEnemy();\n    }   \n\n  \n\n\n    function drawEnemy() {\n        enemyCTX.drawImage(enemyMageSprite , 9 , 10, 25, 31, 200, 265, 25 * 3, 31 * 3)\n\n        enemyHealthBar.style.position = \"absolute\"\n        enemyHealthBar.style.top = \"230px\";\n        enemyHealthBar.style.left = \"570px\";\n       \n        enemyHealthBar.value -= 10\n    }\n\n    //-----^--ENEMY---------^---\n\n\n\n\n\n    //------MENU-----------\n    const menuCanvas = document.getElementById(\"menu-canvas\");\n    const menuCTX = menuCanvas.getContext(\"2d\");\n    \n    menuCanvas.style.position = \"absolute\";\n    menuCanvas.style.top = \"450px\";\n    menuCanvas.style.left= \"110px\";\n\n    menuCTX.fillStyle = \"blue\"\n    menuCTX.fillRect(0,0,menuCanvas.width, menuCanvas.height )\n\n    const basicIconSpritesheet = new Image()\n    basicIconSpritesheet.src = \"../assets/spritesheets/basic_icon_spritesheet.png\"\n    basicIconSpritesheet.onload = function() {\n        drawButtons();\n    }\n\n    function drawButtons() {\n        let buttonSize = 514\n        let offset = 519\n\n        menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonSize, buttonSize, 25, 25, 100, 100) //attack button\n        menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonSize, buttonSize, 175, 25, 100, 100) //skill button\n        menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonSize, buttonSize, 325, 25, 100, 100) //items button\n        menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonSize, buttonSize, 475, 25, 100, 100) //defend button\n    }\n\n   \n    menuCanvas.addEventListener(\"mousemove\", displayInfo) \n    menuCanvas.addEventListener(\"mouseout\", hideInfo)\n    menuCanvas.addEventListener(\"click\", executeCommand)\n\n\n    function displayInfo(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n        const buttonSize = 100\n        const buttonY = 480\n\n\n        if (isPointInsideRect(cursorX, cursorY, 145, buttonY, buttonSize,buttonSize)) { //attack\n            console.log(\"ATTACK\")\n        } else if (isPointInsideRect(cursorX,cursorY,290, buttonY, buttonSize,buttonSize)) { //skills\n            console.log(\"ABILITIES\")\n        } else if (isPointInsideRect(cursorX,cursorY, 435, buttonY, buttonSize,buttonSize)) { //items\n            console.log(\"ITEMS\")\n        } else if (isPointInsideRect(cursorX,cursorY, 580, buttonY, buttonSize,buttonSize)) { //defend\n            console.log(\"DEFEND\")\n        } else {\n\n        }\n\n        // console.log(\"x\")\n        // console.log(cursorX)\n        // console.log(\"y\")\n        // console.log(cursorY)\n       \n    }\n\n    function hideInfo(event) {\n\n    }\n\n    \n   \n    \n\n    function executeCommand(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n        const buttonSize = 100\n        const buttonY = 480\n\n\n        if (isPointInsideRect(cursorX, cursorY, 145, buttonY, buttonSize,buttonSize)) { //attack\n            player.dealDamage();\n        } else if (isPointInsideRect(cursorX,cursorY,290, buttonY, buttonSize,buttonSize)) { //skills\n            console.log(\"ABILITIES\")\n        } else if (isPointInsideRect(cursorX,cursorY, 435, buttonY, buttonSize,buttonSize)) { //items\n            console.log(\"ITEMS\")\n        } else if (isPointInsideRect(cursorX,cursorY, 580, buttonY, buttonSize,buttonSize)) { //defend\n            console.log(\"DEFEND\")\n        } else {\n\n        }\n    }\n\n    //--^---MENU ----^--\n\n\n});\n\n\n\n//# sourceURL=webpack://untitled_jrpg/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

eval("class Player {\n    constructor() {\n        this.currentHealth = 50\n        this.maxHealth = 100\n        this.attack = 50\n        this.defense = 50\n        this.magic = 10\n        this.speed = 50\n    }\n\n    dealDamage() {\n        console.log(this.attack)\n    }\n}\n\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://untitled_jrpg/./src/player.js?");

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