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

let offset = {
    offset1: 0,
    offset2: 0,
    offset3: 0,
    offset4: 0
};

let mouseDown = false

Array.prototype.forEach.call(document.getElementsByClassName('slider-container'), value => {
    value.addEventListener('mousedown', event => onMouseDown(event))
    value.addEventListener('touchstart', event => onMouseDown(event))
    value.addEventListener('mouseup', event => onMouseUp(event))
    value.addEventListener('touchend', event => onMouseUp(event))
    value.addEventListener('mouseout', event => onMouseOut(event))
    value.addEventListener('mousemove', event => onMouseMove(event))
    value.addEventListener('touchmove', event => onMouseMove(event))
})


function onMouseDown(event) {
    let domRect = event.target.getBoundingClientRect()
    let clientX = event.type === 'touchstart' ? event.touches[0].clientX : event.clientX
    mouseDown = clientX - (domRect.left + event.target.clientLeft)
}

function onMouseOut(event) {
    event.target.children[0].style.left = offset[event.target.children[0].id] + 'px'
    mouseDown = false
}

function onMouseMove(event) {
    let id = event.target.children[0].id
    if (mouseDown) {
        let domRect = event.target.getBoundingClientRect()
        let clientX = event.type === 'touchmove' ? event.touches[0].clientX : event.clientX
        let leftSide = clientX - (domRect.left + event.target.clientLeft)
        event.target.children[0].style.left = offset[id] + leftSide - mouseDown + 'px'
    }
}

function onMouseUp(event) {
    let domRect = event.target.getBoundingClientRect()
    let id = event.target.children[0].id
    let clientX = event.type === 'touchend' ? event.changedTouches[0].clientX : event.clientX
    if (mouseDown > clientX - (domRect.left + event.target.clientLeft)) {
        if ((Math.abs(parseInt(offset[id])) + 600) / 600 === event.target.children[0].children.length) {
            event.target.children[0].style.left = 0 + 'px'
            offset[id] = 0
        } else {
            event.target.children[0].style.left = offset[id] - 600 + 'px'
            offset[id] -= 600
        }
    } else if (mouseDown < clientX - (domRect.left + event.target.clientLeft)){
        if (parseInt(offset[id]) === 0) {
            event.target.children[0].style.left = -Math.abs(event.target.children[0].children.length * 600) + 600 + 'px'
            offset[id] = -Math.abs(event.target.children[0].children.length * 600) + 600
        } else {
            event.target.children[0].style.left = offset[id] + 600 + 'px'
            offset[id] += 600
        }
    }
    mouseDown = false
}


/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);