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

eval("const GameClass = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst PlayerClass = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    const backgroundCanvas = document.getElementById(\"battle-scene\");\n    const backGroundCTX = backgroundCanvas.getContext(\"2d\");\n    \n    const menuCanvas = document.getElementById(\"menu-canvas\");\n    const menuCTX = menuCanvas.getContext(\"2d\");\n    \n    menuCanvas.style.position = \"absolute\";\n    menuCanvas.style.top = \"450px\";\n    menuCanvas.style.left= \"110px\";\n\n    menuCTX.fillStyle = \"blue\"\n    menuCTX.fillRect(0,0,menuCanvas.width, menuCanvas.height )\n\n    const basicIconSpritesheet = new Image()\n    basicIconSpritesheet.src = \"../assets/spritesheets/basic_icon_spritesheet.png\"\n    basicIconSpritesheet.onload = function() {\n        drawButtons();\n    }\n\n    function drawButtons() {\n        let buttonSize = 514\n        let offset = 519\n\n        menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonSize, buttonSize, 25, 25, 100, 100) //attack button\n        menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonSize, buttonSize, 175, 25, 100, 100) //skill button\n        menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonSize, buttonSize, 325, 25, 100, 100) //items button\n        menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonSize, buttonSize, 475, 25, 100, 100) //defend button\n    }\n\n   \n    menuCanvas.addEventListener(\"mousemove\", displayInfo) \n    menuCanvas.addEventListener(\"mouseout\", hideInfo)\n\n    function displayInfo(event) {\n        const cursorX = event.clientX\n        const cursorY = event.clientY\n        const buttonSize = 100\n        const buttonY = 480\n\n\n        if (isPointInsideRect(cursorX,cursorY, 80, buttonY, buttonSize,buttonSize)) { //attack\n            console.log(\"ATTACK\")\n        } else if (isPointInsideRect(cursorX,cursorY, 230, buttonY, buttonSize,buttonSize)) { //skills\n            console.log(\"ABILITIES\")\n        } else if (isPointInsideRect(cursorX,cursorY, 380, buttonY, buttonSize,buttonSize)) { //items\n            console.log(\"ITEMS\")\n        } else if (isPointInsideRect(cursorX,cursorY, 530, buttonY, buttonSize,buttonSize)) { //defend\n            console.log(\"DEFEND\")\n        } else {\n\n        }\n\n        // console.log(\"x\")\n        // console.log(cursorX)\n        // console.log(\"y\")\n        // console.log(cursorY)\n       \n    }\n\n    function hideInfo(event) {\n\n    }\n\n    \n\n    function isPointInsideRect(pointX,pointY,rectX,rectY,rectWidth,rectHeight){\n        return  (rectX <= pointX) && (rectX + rectWidth >= pointX) &&\n                (rectY <= pointY) && (rectY + rectHeight >= pointY);\n    }\n});\n\n\n\n//# sourceURL=webpack://untitled_jrpg/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

eval("class Player {\n    constructor() {\n\n    }\n}\n\n\nmodule.exports = Player;\n\n//# sourceURL=webpack://untitled_jrpg/./src/player.js?");

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