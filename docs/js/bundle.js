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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine = function () {
  function Engine(width, height) {
    _classCallCheck(this, Engine);

    this.width = width;
    this.height = height;

    var buffer = new ArrayBuffer(width * height);
    this.current = new Uint8Array(buffer);
    var nextBuffer = new ArrayBuffer(width * height);
    this.next = new Uint8Array(nextBuffer);
  }

  _createClass(Engine, [{
    key: "cell",
    value: function cell(i, j) {
      if (i === -1) {
        i = this.height - 1;
      } else if (i === this.height) {
        i = 0;
      }
      if (j === -1) {
        j = this.width - 1;
      } else if (j === this.width) {
        j = 0;
      }
      return this.current[i * this.width + j];
    }
  }, {
    key: "computeNextState",
    value: function computeNextState() {
      var neighbors = void 0;
      for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++) {
          neighbors = this.cell(i - 1, j - 1) + this.cell(i - 1, j) + this.cell(i - 1, j + 1);
          neighbors += this.cell(i, j - 1) /* this.cell(i, j) */ + this.cell(i, j + 1);
          neighbors += this.cell(i + 1, j - 1) + this.cell(i + 1, j) + this.cell(i + 1, j + 1);
          if (neighbors < 2 || neighbors > 3) {
            this.next[i * this.width + j] = 0;
          } else if (neighbors === 3) {
            this.next[i * this.width + j] = 1;
          } else {
            this.next[i * this.width + j] = this.current[i * this.width + j];
          }
        }
      }
      this.current.set(this.next);
    }
  }, {
    key: "setCurrent",
    value: function setCurrent(i, j) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      this.current[i * this.width + j] = value;
    }
  }, {
    key: "setNext",
    value: function setNext(i, j) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      this.next[i * this.width + j] = value;
    }
  }]);

  return Engine;
}();

exports.default = Engine;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function acorn(engine, i, j) {
  var next = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var setMethod = next ? engine.setNext.bind(engine) : engine.setCurrent.bind(engine);
  setMethod(i - 1, j);
  setMethod(i, j + 2);
  setMethod(i + 1, j - 1);
  setMethod(i + 1, j);
  setMethod(i + 1, j + 3);
  setMethod(i + 1, j + 4);
  setMethod(i + 1, j + 5);
}

function cross(engine, i, j) {
  var next = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var setMethod = next ? engine.setNext.bind(engine) : engine.setCurrent.bind(engine);
  setMethod(i - 1, j);
  setMethod(i, j - 1);
  setMethod(i, j);
  setMethod(i, j + 1);
  setMethod(i + 1, j);
}

function erase(engine, i, j) {
  var next = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  var setMethod = next ? engine.setNext.bind(engine) : engine.setCurrent.bind(engine);
  setMethod(i - 1, j - 1, 0);
  setMethod(i - 1, j, 0);
  setMethod(i - 1, j + 1, 0);
  setMethod(i, j - 1, 0);
  setMethod(i, j, 0);
  setMethod(i, j + 1, 0);
  setMethod(i + 1, j - 1, 0);
  setMethod(i + 1, j, 0);
  setMethod(i + 1, j + 1, 0);
}

exports.acorn = acorn;
exports.cross = cross;
exports.erase = erase;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _engine = __webpack_require__(0);

var _engine2 = _interopRequireDefault(_engine);

var _patterns = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('universe');
var context = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

var pixelsPerCell = 5;
var width = ~~(canvas.clientWidth / pixelsPerCell);
var height = ~~(canvas.clientHeight / pixelsPerCell);

var engine = new _engine2.default(width, height);

// starting position at the center, hence divide by 2
(0, _patterns.acorn)(engine, ~~(height / 2), ~~(width / 2));

var mouseDown = false;
function mouseIsDown(event) {
  if (event.button === 0) {
    mouseDown = true;
    addCells(event);
  }
}
function mouseIsUp(event) {
  mouseDown = false;
}
document.body.onmousedown = mouseIsDown;
document.body.onmouseup = mouseIsUp;
function addCells(event) {
  var touch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  var rect = canvas.getBoundingClientRect();
  var mousePos = {
    x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth,
    y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight
  };
  var pos = {
    i: ~~(mousePos.y / pixelsPerCell),
    j: ~~(mousePos.x / pixelsPerCell)
  };
  if (mouseDown || touch) {
    if (event.ctrlKey) {
      (0, _patterns.erase)(engine, pos.i, pos.j);
    } else {
      (0, _patterns.cross)(engine, pos.i, pos.j);
    }
  }
}

document.addEventListener('mousemove', addCells);
document.addEventListener('touchmove', function (event) {
  for (var i = 0; i < event.touches.length; i++) {
    addCells(event.touches[i], true);
  }
});

var info = document.getElementById('info');
var fpsTime = 0;
var cellTime = 0;
var fps = 0;
var desiredFPS = 30;
var frameNumber = 0;
var play = true;
function draw(timeStamp) {
  window.requestAnimationFrame(draw);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = 'rgba(255,118,5,0.5)';
  context.fillStyle = 'rgba(222,122,39,0.5)';
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (engine.cell(i, j)) {
        context.strokeRect(pixelsPerCell * j, pixelsPerCell * i, pixelsPerCell, pixelsPerCell);
        context.fillRect(pixelsPerCell * j, pixelsPerCell * i, pixelsPerCell, pixelsPerCell);
      }
    }
  }

  var cellElapsed = timeStamp - cellTime;
  if (cellElapsed > 1000 / desiredFPS && play) {
    engine.computeNextState();

    frameNumber += 1;
    cellTime = timeStamp - cellElapsed % (1000 / desiredFPS);
  }

  // Update FPS display every half second
  var fpsElapsed = timeStamp - fpsTime;
  if (fpsElapsed > 500) {
    fps = 1000 / fpsElapsed * frameNumber;
    fpsNode.nodeValue = fps.toFixed(2) + ' FPS';
    fpsTime = timeStamp;
    frameNumber = 0;
  }
};

var fpsNode = document.createTextNode('');
info.appendChild(fpsNode);
engine.computeNextState();
window.requestAnimationFrame(draw);

document.getElementById('ctrl-play-pause').addEventListener('click', function (event) {
  play = !play;
  engine.next.set(engine.current);

  event.preventDefault();
  event.target.textContent = event.target.textContent === 'Pause' ? 'Play' : 'Pause';
});
document.getElementById('ctrl-hide-show').addEventListener('click', function (event) {
  var content = document.querySelector('.text-content');
  content.classList.toggle('hidden');

  event.preventDefault();
  event.target.textContent = event.target.textContent === 'Hide text' ? 'Show text' : 'Hide text';
});

/***/ })
/******/ ]);