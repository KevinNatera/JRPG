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

eval("const GameClass = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\nconst PlayerClass = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n\n    const backgroundCanvas = document.getElementById(\"battle-scene\");\n    const backGroundCTX = backgroundCanvas.getContext(\"2d\");\n    \n    const menuCanvas = document.getElementById(\"menu-canvas\");\n    const menuCTX = menuCanvas.getContext(\"2d\");\n    \n    menuCanvas.style.position = \"absolute\";\n    menuCanvas.style.top = \"450px\";\n    menuCanvas.style.left= \"110px\";\n\n    // menuCTX.fillStyle = \"blue\"\n    // menuCTX.fillRect(0,0,menuCanvas.width, menuCanvas.height )\n\n    const basicIconSpritesheet = new Image()\n    basicIconSpritesheet.src = \"../assets/spritesheets/basic_icon_spritesheet.png\"\n    basicIconSpritesheet.onload = function() {\n        drawButtons();\n    }\n\n    function drawButtons() {\n        let buttonWidth = 514\n        let buttonHeight = 514\n        let offset = 519\n\n        menuCTX.drawImage(basicIconSpritesheet, offset, 0, buttonWidth, buttonHeight, 25, 25, 100, 100) //attack button\n        menuCTX.drawImage(basicIconSpritesheet, 0, 0, buttonWidth, buttonHeight, 175, 25, 100, 100) //ability button\n        menuCTX.drawImage(basicIconSpritesheet, offset, offset, buttonWidth, buttonHeight, 325, 25, 100, 100) //items button\n        menuCTX.drawImage(basicIconSpritesheet, 0, offset, buttonWidth, buttonHeight, 475, 25, 100, 100) //defend button\n    }\n});\n\n\n\n//# sourceURL=webpack://untitled_jrpg/./src/index.js?");

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