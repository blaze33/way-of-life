'use strict'

const canvas = document.getElementById('worldmap')
const context = canvas.getContext('2d')
const width = canvas.width / 2
const height = canvas.height / 2

var buffer = new ArrayBuffer(width * height)
var current = new Uint8Array(buffer)
var nextBuffer = new ArrayBuffer(width * height)
var next = new Uint8Array(nextBuffer)

current[149 * width + 210] = 1
current[150 * width + 212] = 1
current[151 * width + 209] = 1
current[151 * width + 210] = 1
current[151 * width + 213] = 1
current[151 * width + 214] = 1
current[151 * width + 215] = 1

const info = document.getElementById('info')
var time = 0
var fps = 0
var frameNumber = 0

function cell (i, j) {
  if (i === -1) {
    i = height - 1
  } else if (i === height) {
    i = 0
  }
  if (j === -1) {
    j = width - 1
  } else if (j === width) {
    j = 0
  }
  return current[i * width + j]
}

function computeNextStep () {
  var neighbors

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      neighbors = cell(i - 1, j - 1) + cell(i - 1, j) + cell(i - 1, j + 1)
      neighbors += cell(i, j - 1) + cell(i, j + 1)
      neighbors += cell(i + 1, j - 1) + cell(i + 1, j) + cell(i + 1, j + 1)
      if (current[i * width + j] === 0 && neighbors === 3) {
        next[i * width + j] = 1
      } else if (current[i * width + j] === 1 && (neighbors === 2 || neighbors === 3)) {
        next[i * width + j] = 1
      } else {
        next[i * width + j] = 0
      }
    }
  }
};

function draw (timeStamp) {
  window.requestAnimationFrame(draw)

  context.fillStyle = 'rgb(240,240,240)'
  context.fillRect(0, 0, 2 * width, 2 * height)

  context.fillStyle = 'rgb(40,40,40)'
  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      if (current[i * width + j] === 1) {
        context.fillRect(2 * j, 2 * i, 2, 2)
      }
    }
  }
  computeNextStep()
  current.set(next)

  // Update FPS display every half second
  const elapsed = timeStamp - time
  frameNumber += 1
  if (elapsed > 500) {
    fps = 1000 / elapsed * frameNumber
    fpsNode.nodeValue = `${fps.toFixed(2)} FPS`
    time = timeStamp
    frameNumber = 0
  }
};

const fpsNode = document.createTextNode('')
info.appendChild(fpsNode)
window.requestAnimationFrame(draw)
