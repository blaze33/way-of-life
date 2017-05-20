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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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
    this._current = new Uint8Array(buffer);
    var nextBuffer = new ArrayBuffer(width * height);
    this._next = new Uint8Array(nextBuffer);
  }

  _createClass(Engine, [{
    key: "index",
    value: function index(i, j) {
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
      return i * this.width + j;
    }
  }, {
    key: "cell",
    value: function cell(i, j) {
      return this._current[this.index(i, j)];
    }
  }, {
    key: "next",
    value: function next(i, j) {
      return this._next[this.index(i, j)];
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
            this._next[i * this.width + j] = 0;
          } else if (neighbors === 3) {
            this._next[i * this.width + j] = 1;
          } else {
            this._next[i * this.width + j] = this._current[i * this.width + j];
          }
        }
      }
      this._current.set(this._next);
    }
  }, {
    key: "set",
    value: function set(i, j) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      this._current[this.index(i, j)] = value;
    }
  }, {
    key: "setNext",
    value: function setNext(i, j) {
      var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

      this._next[this.index(i, j)] = value;
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
  engine.set(i - 1, j);
  engine.set(i, j + 2);
  engine.set(i + 1, j - 1);
  engine.set(i + 1, j);
  engine.set(i + 1, j + 3);
  engine.set(i + 1, j + 4);
  engine.set(i + 1, j + 5);
}

function cross(engine, i, j) {
  engine.set(i - 1, j);
  engine.set(i, j - 1);
  engine.set(i, j);
  engine.set(i, j + 1);
  engine.set(i + 1, j);
}

function erase(engine, i, j) {
  engine.set(i - 1, j - 1, 0);
  engine.set(i - 1, j, 0);
  engine.set(i - 1, j + 1, 0);
  engine.set(i, j - 1, 0);
  engine.set(i, j, 0);
  engine.set(i, j + 1, 0);
  engine.set(i + 1, j - 1, 0);
  engine.set(i + 1, j, 0);
  engine.set(i + 1, j + 1, 0);
}

exports.acorn = acorn;
exports.cross = cross;
exports.erase = erase;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {
  function Renderer(canvas, engine) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Renderer);

    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.engine = engine;

    // options
    this.pixelsPerCell = options.pixelsPerCell || 5;
    this.desiredFPS = options.desiredFPS || 30;
    this.fpsNode = options.fpsNode || false;

    // renderer variables
    this.play = false;
    this.fpsTime = 0;
    this.engineTime = 0;
    this.fps = 0;
    this.frameNumber = 0;

    // setup canvas with correct size
    this.canvas.width = this.engine.width * this.pixelsPerCell;
    this.canvas.height = this.engine.height * this.pixelsPerCell;
  }

  _createClass(Renderer, [{
    key: 'togglePlay',
    value: function togglePlay() {
      this.play = !this.play;
    }
  }, {
    key: 'draw',
    value: function draw(timeStamp) {
      window.requestAnimationFrame(this.draw.bind(this));

      // display engine state on each frame
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.strokeStyle = 'rgba(255,118,5,0.5)';
      this.context.fillStyle = 'rgba(222,122,39,0.5)';
      for (var i = 0; i < this.engine.height; i++) {
        for (var j = 0; j < this.engine.width; j++) {
          if (this.engine.cell(i, j)) {
            this.context.strokeRect(this.pixelsPerCell * j, this.pixelsPerCell * i, this.pixelsPerCell, this.pixelsPerCell);
            this.context.fillRect(this.pixelsPerCell * j, this.pixelsPerCell * i, this.pixelsPerCell, this.pixelsPerCell);
          }
        }
      }

      // compute engine next step with appropriate frequency
      var engineElapsed = timeStamp - this.engineTime;
      if (engineElapsed > 1000 / this.desiredFPS && this.play) {
        this.engine.computeNextState();
        this.frameNumber += 1;
        this.engineTime = timeStamp - engineElapsed % (1000 / this.desiredFPS);
      }

      // Update FPS display every half second
      if (this.fpsNode) {
        var fpsElapsed = timeStamp - this.fpsTime;
        if (fpsElapsed > 500) {
          this.fps = 1000 / fpsElapsed * this.frameNumber;
          this.fpsNode.textContent = this.fps.toFixed(2) + ' FPS';
          this.fpsTime = timeStamp;
          this.frameNumber = 0;
        }
      }
    }
  }, {
    key: 'start',
    value: function start() {
      this.engine.computeNextState();
      this.play = true;
      window.requestAnimationFrame(this.draw.bind(this));
    }
  }]);

  return Renderer;
}();

exports.default = Renderer;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _engine = __webpack_require__(0);

var _engine2 = _interopRequireDefault(_engine);

var _patterns = __webpack_require__(1);

var _renderer = __webpack_require__(2);

var _renderer2 = _interopRequireDefault(_renderer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.getElementById('universe');

var pixelsPerCell = 5;
var width = ~~(canvas.clientWidth / pixelsPerCell);
var height = ~~(canvas.clientHeight / pixelsPerCell);
var engine = new _engine2.default(width, height);

var renderer = new _renderer2.default(canvas, engine, {
  desiredFPS: 30,
  pixelsPerCell: pixelsPerCell,
  fpsNode: document.getElementById('fps-info')
});

// starting position at the center, hence divide by 2
(0, _patterns.acorn)(engine, ~~(height / 2), ~~(width / 2));
(0, _patterns.acorn)(engine, 0, 0);

// mouse events
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

// control buttons events
document.getElementById('ctrl-play-pause').addEventListener('click', function (event) {
  renderer.togglePlay();

  event.preventDefault();
  event.target.textContent = event.target.textContent === 'Pause' ? 'Play' : 'Pause';
});
document.getElementById('ctrl-hide-show').addEventListener('click', function (event) {
  var content = document.querySelector('.text-content');
  content.classList.toggle('hidden');

  event.preventDefault();
  event.target.textContent = event.target.textContent === 'Hide text' ? 'Show text' : 'Hide text';
});

// start
renderer.start();

/***/ })
/******/ ]);