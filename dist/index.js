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

/***/ "./pixi/pixi.js":
/*!**********************!*\
  !*** ./pixi/pixi.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {


/***/ }),

/***/ "./src/javascript/game.js":
/*!********************************!*\
  !*** ./src/javascript/game.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Game\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pixi/pixi.js */ \"./pixi/pixi.js\");\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _sprite_objects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sprite_objects.js */ \"./src/javascript/sprite_objects.js\");\n/* harmony import */ var _scene_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./scene.js */ \"./src/javascript/scene.js\");\n/* harmony import */ var _health_point_bar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./health_point_bar.js */ \"./src/javascript/health_point_bar.js\");\n/* harmony import */ var _keyboard_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./keyboard.js */ \"./src/javascript/keyboard.js\");\n/* harmony import */ var _logics_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./logics.js */ \"./src/javascript/logics.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nconst TextureCache = _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.utils.TextureCache;\r\n\r\nlet state;\r\n\r\nclass Game extends _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.Application {\r\n    constructor() {\r\n        super({\r\n            width: 512,\r\n            height: 512,\r\n        });\r\n        this.renderer.view.style.position = \"absolute\";\r\n        this.renderer.view.style.top = \"50%\";\r\n        this.renderer.view.style.left = \"50%\";\r\n        this.renderer.view.style.transform = \"translate(-50%,-50%)\";\r\n        document.body.appendChild(this.view);\r\n    }\r\n\r\n    load() {\r\n        this.loader.add(\"./images/treasureHunter.json\");\r\n        this.loader.load(this.setup.bind(this));\r\n    }\r\n\r\n\r\n    setup() {\r\n        //add Game Scene\r\n        this.gameScene = new _scene_js__WEBPACK_IMPORTED_MODULE_2__.default();\r\n        this.stage.addChild(this.gameScene);\r\n\r\n        //add Game Over Scene\r\n        this.gameOverScene = new _scene_js__WEBPACK_IMPORTED_MODULE_2__.default();\r\n        this.gameOverScene.setVisible(false);\r\n        this.stage.addChild(this.gameOverScene);\r\n\r\n        //load texture and add Dungeon on Game Scene\r\n        this.dungeon = new _sprite_objects_js__WEBPACK_IMPORTED_MODULE_1__.default(\r\n            TextureCache[\"dungeon.png\"]\r\n        );\r\n        this.gameScene.addChild(this.dungeon);\r\n\r\n        //load texture and add Player on Game Scene\r\n        this.explorer = new Explorer(\r\n            TextureCache[\"explorer.png\"]\r\n        );\r\n        this.explorer.setPosition(\r\n            68,\r\n            this.stage.height / 2 - this.explorer.height / 2\r\n        );\r\n        this.gameScene.addChild(this.explorer);\r\n\r\n        //load texture and add Chest(treasure) on Game Scene\r\n        this.treasure = new _sprite_objects_js__WEBPACK_IMPORTED_MODULE_1__.default(\r\n            TextureCache[\"treasure.png\"]\r\n        );\r\n        this.treasure.setPosition(\r\n            this.stage.width - this.treasure.width - 48,\r\n            this.stage.height / 2 - this.treasure.height / 2\r\n        );\r\n        this.gameScene.addChild(this.treasure);\r\n\r\n        //load texture and add Door on Game Scene\r\n        this.door = new _sprite_objects_js__WEBPACK_IMPORTED_MODULE_1__.default(TextureCache[\"door.png\"]);\r\n        this.door.setPosition(this.door.width, 0);\r\n        this.gameScene.addChild(this.door);\r\n\r\n        this.setupBlobs();\r\n\r\n        //load texture and add HealthBar on Game Scene\r\n        this.HealthPointBar = new _health_point_bar_js__WEBPACK_IMPORTED_MODULE_3__.default(this.stage.width - 170, 4);\r\n        this.gameScene.addChild(this.HealthPointBar);\r\n\r\n\r\n        //add game over message on Game Over scene\r\n        let style = new _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.TextStyle({\r\n            fontFamily: \"Helvetica\",\r\n            fontSize: 64,\r\n            fill: \"white\",\r\n        });\r\n        this.message = new _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.Text(\"The End!\", style);\r\n        this.message.x = 120;\r\n        this.message.y = this.stage.height / 2 - 32;\r\n        this.gameOverScene.addChild(this.message);\r\n\r\n\r\n        this.setupController();\r\n        state = play;\r\n        this.ticker.add(delta => this.gameLoop(delta));\r\n    }\r\n\r\n    //load texture and add Enemy(Blobs) on Game Scene\r\n    setupBlobs(numberOfBlobs = 7) {\r\n        this.blobs = [];\r\n        let spacing = 48,\r\n            xOffset = 100,\r\n            speed = 2,\r\n            direction = 1;\r\n\r\n        for (let i = 0; i < numberOfBlobs; i++) {\r\n            let blob = new _sprite_objects_js__WEBPACK_IMPORTED_MODULE_1__.default(\r\n                TextureCache[\"blob.png\"]\r\n            );\r\n            let x = spacing * i + xOffset;\r\n            let y = (0,_logics_js__WEBPACK_IMPORTED_MODULE_5__.randomInt)(\r\n                this.door.height,\r\n                this.stage.height - this.door.height - blob.height\r\n            );\r\n            this.gameScene.addChild(blob);\r\n\r\n            blob.setPosition(x, y);\r\n            blob.setVelocity(0, speed * direction);\r\n            direction *= -1;\r\n            this.blobs.push(blob);\r\n        }\r\n\r\n    }\r\n\r\n    gameLoop(delta) {\r\n        state(delta);\r\n    }\r\n\r\n    play(delta) {\r\n\r\n\r\n        //Contain the explorer inside the area of the dungeon\r\n        (0,_logics_js__WEBPACK_IMPORTED_MODULE_5__.contain)(explorer, {\r\n            x: 28,\r\n            y: 10,\r\n            width: 488,\r\n            height: 480\r\n        });\r\n\r\n        //Set `explorerHit` to `false` before checking for a collision\r\n        let explorerHit = false;\r\n\r\n        //Loop through all the sprites in the `enemies` array\r\n        this.blobs.forEach((blob) => {\r\n\r\n            //Move the blob\r\n            blob.y += blob.vy;\r\n\r\n            //Check the blob's screen boundaries\r\n            let blobHitsWall = (0,_logics_js__WEBPACK_IMPORTED_MODULE_5__.contain)(blob, {\r\n                x: 28,\r\n                y: 10,\r\n                width: 488,\r\n                height: 480\r\n            });\r\n\r\n            //If the blob hits the top or bottom of the stage, reverse\r\n            //its direction\r\n            if (blobHitsWall === \"top\" || blobHitsWall === \"bottom\") {\r\n                blob.vy *= -1;\r\n            }\r\n\r\n            //Test for a collision. If any of the enemies are touching\r\n            //the explorer, set `explorerHit` to `true`\r\n            if ((0,_logics_js__WEBPACK_IMPORTED_MODULE_5__.hitTestRectangle)(explorer, blob)) {\r\n                explorerHit = true;\r\n            }\r\n        });\r\n\r\n        //If the explorer is hit...\r\n        if (explorerHit) {\r\n\r\n            //Make the explorer semi-transparent\r\n            explorer.alpha = 0.5;\r\n\r\n            //Reduce the width of the health bar's inner rectangle by 1 pixel\r\n            this.HealthPointBar(-30);\r\n\r\n        } else {\r\n\r\n            //Make the explorer fully opaque (non-transparent) if it hasn't been hit\r\n            explorer.alpha = 1;\r\n        }\r\n\r\n        //Check for a collision between the explorer and the treasure\r\n        if ((0,_logics_js__WEBPACK_IMPORTED_MODULE_5__.hitTestRectangle)(this.explorer, this, treasure)) {\r\n\r\n            //If the treasure is touching the explorer, center it over the explorer\r\n            this.treasure.setPosition(this.explorer.x + 8, this.explorer.y + 8);\r\n        }\r\n\r\n        //Does the explorer have enough health? If the width of the `innerBar`\r\n        //is less than zero, end the game and display \"You lost!\"\r\n        if (this.HealthPointBar.outer.width < 0) {\r\n            this.end();\r\n            this.message.text = \"You lost!\";\r\n            this.ticker.stop();\r\n        }\r\n\r\n        //If the explorer has brought the treasure to the exit,\r\n        //end the game and display \"You won!\"\r\n        if ((0,_logics_js__WEBPACK_IMPORTED_MODULE_5__.hitTestRectangle)(treasure, door)) {\r\n            this.end();\r\n            message.text = \"You won!\";\r\n            this.ticker.stop();\r\n        }\r\n        this.explorer.update(delta);\r\n    }\r\n\r\n    end() {\r\n        this.gameScene.setVisible(false);\r\n        this.gameOverScene.setVisible(true);\r\n    }\r\n\r\n    setupController() {\r\n        let left = (0,_keyboard_js__WEBPACK_IMPORTED_MODULE_4__.default)(37),\r\n            up = (0,_keyboard_js__WEBPACK_IMPORTED_MODULE_4__.default)(38),\r\n            right = (0,_keyboard_js__WEBPACK_IMPORTED_MODULE_4__.default)(39),\r\n            down = (0,_keyboard_js__WEBPACK_IMPORTED_MODULE_4__.default)(40);\r\n\r\n        //Left arrow key `press` method\r\n        left.press = function() {\r\n\r\n            //Change the explorer's velocity when the key is pressed\r\n            this.explorer.vx = -2;\r\n\r\n        };\r\n\r\n        //Left arrow key `release` method\r\n        left.release = function() {\r\n\r\n\r\n            if (right.isDown) {\r\n                this.explorer.vx = +2;\r\n            } else {\r\n                this.explorer.vx = 0;\r\n            }\r\n        };\r\n\r\n        //Up\r\n        up.press = function() {\r\n            this.explorer.vy = -2;\r\n\r\n        };\r\n        up.release = function() {\r\n            if (down.isDown) {\r\n                this.explorer.vy = +2;\r\n            } else {\r\n                this.explorer.vy = 0;\r\n            }\r\n\r\n        };\r\n\r\n        //Right\r\n        right.press = function() {\r\n            this.explorer.vx = 2;\r\n        };\r\n        right.release = function() {\r\n            if (left.isDown) {\r\n                this.explorer.vx = -2;\r\n            } else {\r\n                this.explorer.vx = 0;\r\n            }\r\n        };\r\n\r\n        //Down\r\n        down.press = function() {\r\n            this.explorer.vy = 2;\r\n        };\r\n        down.release = function() {\r\n            if (up.isDown) {\r\n                this.explorer.vy = -2;\r\n            } else {\r\n                this.explorer.vy = 0;\r\n            }\r\n        };\r\n    }\r\n\r\n\r\n\r\n\r\n\r\n}\n\n//# sourceURL=webpack://treasures-hunter/./src/javascript/game.js?");

/***/ }),

/***/ "./src/javascript/health_point_bar.js":
/*!********************************************!*\
  !*** ./src/javascript/health_point_bar.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HealthPointBar)\n/* harmony export */ });\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pixi/pixi.js */ \"./pixi/pixi.js\");\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass HealthPointBar extends _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {\r\n    constructor(x, y) {\r\n        super();\r\n        this.position.set(x, y);\r\n        this.width = 128;\r\n        this.height = 8;\r\n        this.point = 100;\r\n\r\n        //Create the black background rectangle\r\n        let innerBar = new _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\r\n        innerBar.beginFill(0x000000);\r\n        innerBar.drawRect(0, 0, this.width, this.height);\r\n        innerBar.endFill();\r\n        this.addChild(innerBar);\r\n\r\n        //Create the front red rectangle\r\n        let outerBar = new _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.Graphics();\r\n        outerBar.beginFill(0xFF3300);\r\n        outerBar.drawRect(0, 0, this.width, this.height);\r\n        outerBar.endFill();\r\n        this.addChild(outerBar);\r\n\r\n        this.outer = outerBar;\r\n    }\r\n\r\n    updateHealthPoint(pointLoss) {\r\n        this.point += pointLoss;\r\n        this.outer.width = Math.floor(this.point / 100 * this.width);\r\n    }\r\n}\n\n//# sourceURL=webpack://treasures-hunter/./src/javascript/health_point_bar.js?");

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game.js */ \"./src/javascript/game.js\");\n\r\n\r\nwindow.onload = () => {\r\n    let game = new _game_js__WEBPACK_IMPORTED_MODULE_0__.Game();\r\n    game.load();\r\n}\n\n//# sourceURL=webpack://treasures-hunter/./src/javascript/index.js?");

/***/ }),

/***/ "./src/javascript/keyboard.js":
/*!************************************!*\
  !*** ./src/javascript/keyboard.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Keyboard)\n/* harmony export */ });\nclass Keyboard {\r\n\r\n    constructor(key) {\r\n        this.code = keyCode;\r\n        this.isDown = false;\r\n        this.isUp = true;\r\n        this.press = undefined;\r\n        this.release = undefined;\r\n        this.handle();\r\n    }\r\n\r\n    //The `downHandler`\r\n    downHandler(event) {\r\n        if (event.keyCode === key.code) {\r\n            if (key.isUp && key.press) key.press();\r\n            key.isDown = true;\r\n            key.isUp = false;\r\n        }\r\n        event.preventDefault();\r\n    };\r\n\r\n    //The `upHandler`\r\n    upHandler = function(event) {\r\n        if (event.keyCode === key.code) {\r\n            if (key.isDown && key.release) key.release();\r\n            key.isDown = false;\r\n            key.isUp = true;\r\n        }\r\n        event.preventDefault();\r\n    };\r\n\r\n    //Attach event listeners\r\n    handle() {\r\n        window.addEventListener(\r\n            \"keydown\", key.downHandler.bind(key), false\r\n        );\r\n        window.addEventListener(\r\n            \"keyup\", key.upHandler.bind(key), false\r\n        );\r\n        return key;\r\n    }\r\n\r\n}\n\n//# sourceURL=webpack://treasures-hunter/./src/javascript/keyboard.js?");

/***/ }),

/***/ "./src/javascript/logics.js":
/*!**********************************!*\
  !*** ./src/javascript/logics.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"hitTestRectangle\": () => (/* binding */ hitTestRectangle),\n/* harmony export */   \"contain\": () => (/* binding */ contain),\n/* harmony export */   \"randomInt\": () => (/* binding */ randomInt)\n/* harmony export */ });\nfunction hitTestRectangle(r1, r2) {\r\n\r\n    //Define the variables we'll need to calculate\r\n    let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;\r\n\r\n    //hit will determine whether there's a collision\r\n    hit = false;\r\n\r\n    //Find the center points of each sprite\r\n    r1.centerX = r1.x + r1.width / 2;\r\n    r1.centerY = r1.y + r1.height / 2;\r\n    r2.centerX = r2.x + r2.width / 2;\r\n    r2.centerY = r2.y + r2.height / 2;\r\n\r\n    //Find the half-widths and half-heights of each sprite\r\n    r1.halfWidth = r1.width / 2;\r\n    r1.halfHeight = r1.height / 2;\r\n    r2.halfWidth = r2.width / 2;\r\n    r2.halfHeight = r2.height / 2;\r\n\r\n    //Calculate the distance vector between the sprites\r\n    vx = r1.centerX - r2.centerX;\r\n    vy = r1.centerY - r2.centerY;\r\n\r\n    //Figure out the combined half-widths and half-heights\r\n    combinedHalfWidths = r1.halfWidth + r2.halfWidth;\r\n    combinedHalfHeights = r1.halfHeight + r2.halfHeight;\r\n\r\n    //Check for a collision on the x axis\r\n    if (Math.abs(vx) < combinedHalfWidths) {\r\n\r\n        //A collision might be occurring. Check for a collision on the y axis\r\n        if (Math.abs(vy) < combinedHalfHeights) {\r\n\r\n            //There's definitely a collision happening\r\n            hit = true;\r\n        } else {\r\n\r\n            //There's no collision on the y axis\r\n            hit = false;\r\n        }\r\n    } else {\r\n\r\n        //There's no collision on the x axis\r\n        hit = false;\r\n    }\r\n\r\n    //`hit` will be either `true` or `false`\r\n    return hit;\r\n}\r\nfunction contain(sprite, container = { x: 28, y: 10, width: 488, height: 480 }) {\r\n\r\n    let collision = undefined;\r\n\r\n    //Left\r\n    if (sprite.x < container.x) {\r\n        sprite.x = container.x;\r\n        collision = \"left\";\r\n    }\r\n\r\n    //Top\r\n    if (sprite.y < container.y) {\r\n        sprite.y = container.y;\r\n        collision = \"top\";\r\n    }\r\n\r\n    //Right\r\n    if (sprite.x + sprite.width > container.width) {\r\n        sprite.x = container.width - sprite.width;\r\n        collision = \"right\";\r\n    }\r\n\r\n    //Bottom\r\n    if (sprite.y + sprite.height > container.height) {\r\n        sprite.y = container.height - sprite.height;\r\n        collision = \"bottom\";\r\n    }\r\n\r\n    //Return the `collision` value\r\n    return collision;\r\n}\r\nfunction randomInt(min, max) {\r\n    return Math.floor(Math.random() * (max - min + 1)) + min;\r\n}\n\n//# sourceURL=webpack://treasures-hunter/./src/javascript/logics.js?");

/***/ }),

/***/ "./src/javascript/scene.js":
/*!*********************************!*\
  !*** ./src/javascript/scene.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Scene)\n/* harmony export */ });\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pixi/pixi.js */ \"./pixi/pixi.js\");\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass Scene extends _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.Container {\r\n    constructor() {\r\n        super();\r\n    }\r\n\r\n    setVisible(visible) {\r\n        this.visible = visible;\r\n    }\r\n\r\n    addChild(child) {\r\n        super.addChild(child);\r\n    }\r\n}\n\n//# sourceURL=webpack://treasures-hunter/./src/javascript/scene.js?");

/***/ }),

/***/ "./src/javascript/sprite_objects.js":
/*!******************************************!*\
  !*** ./src/javascript/sprite_objects.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ SpriteObject)\n/* harmony export */ });\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../pixi/pixi.js */ \"./pixi/pixi.js\");\n/* harmony import */ var _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nclass SpriteObject extends _pixi_pixi_js__WEBPACK_IMPORTED_MODULE_0__.Sprite {\r\n\r\n    constructor(textureCache) {\r\n        super(textureCache);\r\n    }\r\n\r\n    setPosition(x, y) {\r\n        this.x = x;\r\n        this.y = y;\r\n    }\r\n\r\n    setVelocity(vx, vy) {\r\n        this.vx = vx;\r\n        this.vy = vy;\r\n    }\r\n\r\n    update(delta) {\r\n        this.x += this.vx * delta;\r\n        this.y += this.vy * delta;\r\n    }\r\n}\n\n//# sourceURL=webpack://treasures-hunter/./src/javascript/sprite_objects.js?");

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/javascript/index.js");
/******/ 	
/******/ })()
;