/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_index_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_index_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_scss__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__css_style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__css_style_scss__);



/***/ }),
/* 1 */
/***/ (function(module, exports) {

let offset = {}
let mouseDown = false
Array.prototype.forEach.call(document.getElementsByClassName('slider-container'), value => {
    //parse all of the sliders and use they id's as a key of a 'offset' object and a value as a actual offset from left side
    offset[value.children[0].id] = 0
    value.addEventListener('mousedown', event => onMouseDown(event))
    value.addEventListener('touchstart', event => onMouseDown(event))
    value.addEventListener('mouseup', event => onMouseUp(event))
    value.addEventListener('touchend', event => onMouseUp(event))
    value.addEventListener('mouseout', event => onMouseUp(event))
    value.addEventListener('mousemove', event => onMouseMove(event))
    value.addEventListener('touchmove', event => onMouseMove(event))
})
//triggering on mousedown event
function onMouseDown(event) {
    //getting coordinates
    let domRect = event.target.getBoundingClientRect()
    let clientX
    if (event.type === 'touchstart') {
        clientX = event.touches[0].clientX
    } else {
        clientX = event.clientX
    }
    mouseDown = clientX - (domRect.left + event.target.clientLeft)
}
//triggering on mousemove/touchmove events
function onMouseMove(event) {
    let id = event.target.children[0].id
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let clientX
        if (event.type === 'touchmove') {
            clientX = event.touches[0].clientX
        } else {
            clientX = event.clientX
        }
        let leftSide = clientX - (domRect.left + event.target.clientLeft)
        //remove last slide and prepend it in the beginning
        if (mouseDown < clientX - (domRect.left + event.target.clientLeft) && parseInt(event.target.children[0].style.left) >= 0) {
            let elem = event.target.children[0].children[event.target.children[0].children.length - 1].cloneNode()
            event.target.children[0].prepend(elem)
            event.target.children[0].removeChild(event.target.children[0].children[event.target.children[0].children.length - 1])
            offset[id] += -600
        }
        event.target.children[0].style.left = offset[id] + leftSide - mouseDown + 'px'
    }
}

//triggering on mouseup/touchend/mouseout events
function onMouseUp(event) {
    //do stuff in case mouseDown is not equals to false
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let id = event.target.children[0].id
        let clientX
        if (event.type === 'touchend') {
            clientX = event.changedTouches[0].clientX
        } else {
            clientX = event.clientX
        }
        //remove first slide and append it in the end of a img-childrens
        if (mouseDown > clientX - (domRect.left + event.target.clientLeft)) {
            if ((Math.abs(parseInt(offset[id])) + 600) / 600 === event.target.children[0].children.length - 1) {
                let elem = event.target.children[0].children[0].cloneNode()
                event.target.children[0].appendChild(elem)
                event.target.children[0].removeChild(event.target.children[0].children[0])
                animateSlider(event.target.children[0], offset[id], true, parseInt(event.target.children[0].style.left) - offset[id])
            } else {
                animateSlider(event.target.children[0], offset[id] - 600, true)
                offset[id] -= 600
            }

        } else if (mouseDown < clientX - (domRect.left + event.target.clientLeft)) {
            animateSlider(event.target.children[0], offset[id] + 600)
            offset[id] += 600
        }
    }
    mouseDown = false
}

// animation
function animateSlider(elem, destPos, left = false, currentPos) {
    if (!currentPos) {
        currentPos = parseInt(elem.style.left)
    }
    let id = setInterval(() => {
        if (currentPos === destPos) {
            clearInterval(id)
        } else {
            if (Math.abs(currentPos) >= 550 || Math.abs(currentPos) <= 50) {
                if (left) {
                    currentPos--
                } else {
                    currentPos++
                }
            } else {
                if (left) {
                    currentPos -= 10
                } else {
                    currentPos += 10
                }
            }
            elem.style.left = currentPos + 'px'
        }
    }, 1)
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);