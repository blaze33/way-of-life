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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const canvas = document.getElementById('worldmap');
const context = canvas.getContext('2d');
const width = canvas.width / 2;
const height = canvas.height / 2;

var buffer = new ArrayBuffer(width * height);
var current = new Uint8Array(buffer);
var nextBuffer = new ArrayBuffer(width * height);
var next = new Uint8Array(nextBuffer);

current[149 * width + 210] = 1;
current[150 * width + 212] = 1;
current[151 * width + 209] = 1;
current[151 * width + 210] = 1;
current[151 * width + 213] = 1;
current[151 * width + 214] = 1;
current[151 * width + 215] = 1;

const info = document.getElementById('info');
var time = 0;
var fps = 0;
var frameNumber = 0;

function cell(i, j) {
  if (i === -1) {
    i = height - 1;
  } else if (i === height) {
    i = 0;
  }
  if (j === -1) {
    j = width - 1;
  } else if (j === width) {
    j = 0;
  }
  return current[i * width + j];
}

function computeNextStep() {
  var neighbors;

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      neighbors = cell(i - 1, j - 1) + cell(i - 1, j) + cell(i - 1, j + 1);
      neighbors += cell(i, j - 1) + cell(i, j + 1);
      neighbors += cell(i + 1, j - 1) + cell(i + 1, j) + cell(i + 1, j + 1);
      if (current[i * width + j] === 0 && neighbors === 3) {
        next[i * width + j] = 1;
      } else if (current[i * width + j] === 1 && (neighbors === 2 || neighbors === 3)) {
        next[i * width + j] = 1;
      } else {
        next[i * width + j] = 0;
      }
    }
  }
};

function draw(timeStamp) {
  window.requestAnimationFrame(draw);

  context.fillStyle = 'rgb(240,240,240)';
  context.fillRect(0, 0, 2 * width, 2 * height);

  context.fillStyle = 'rgb(40,40,40)';
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (current[i * width + j] === 1) {
        context.fillRect(2 * j, 2 * i, 2, 2);
      }
    }
  }
  computeNextStep();
  current.set(next);

  // Update FPS display every half second
  const elapsed = timeStamp - time;
  frameNumber += 1;
  if (elapsed > 500) {
    fps = 1000 / elapsed * frameNumber;
    fpsNode.nodeValue = `${fps.toFixed(2)} FPS`;
    time = timeStamp;
    frameNumber = 0;
  }
};

const fpsNode = document.createTextNode('');
info.appendChild(fpsNode);
window.requestAnimationFrame(draw);

/***/ })
/******/ ]);