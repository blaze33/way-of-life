const width = 400
const height = 300

var current = Array(height).fill(0).map(x => Array(width).fill(0))
var next = Array(height).fill(0).map(x => Array(width).fill(0))

current[149][210] = 1
current[150][212] = 1
current[151][209] = 1
current[151][210] = 1
current[151][213] = 1
current[151][214] = 1
current[151][215] = 1

const canvas = document.getElementById('worldmap')
const context = canvas.getContext('2d')

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
  return current[i][j]
}

function computeNextStep () {
  var neighbors

  for (var i = 0; i < height; i++) {
    for (var j = 0; j < width; j++) {
      neighbors = cell(i - 1, j - 1) + cell(i - 1, j) + cell(i - 1, j + 1)
      neighbors += cell(i, j - 1) + cell(i, j + 1)
      neighbors += cell(i + 1, j - 1) + cell(i + 1, j) + cell(i + 1, j + 1)
      if (current[i][j] === 0 && neighbors === 3) {
        next[i][j] = 1
      } else if (current[i][j] === 1 && (neighbors === 2 || neighbors === 3)) {
        next[i][j] = 1
      } else {
        next[i][j] = 0
      }
    }
  }
};

function draw (timeStamp) {
  context.fillStyle = 'rgb(240,240,240)'
  context.fillRect(0, 0, 2 * width, 2 * height)
  context.fillStyle = 'rgb(40,40,40)'
  current.forEach(function (row, i) {
    row.forEach(function (value, j) {
      if (value === 1) {
        context.fillRect(2 * j, 2 * i, 2, 2)
      }
    })
  })
  computeNextStep()
  for (var i = 0; i < height; i++) {
    current[i] = next[i].slice(0)
  }

  // Update FPS display every half second
  const elapsed = timeStamp - time
  frameNumber += 1
  if (elapsed > 500) {
    fps = 1000 / elapsed * frameNumber
    fpsNode.nodeValue = `${fps.toFixed(2)} FPS`
    time = timeStamp
    frameNumber = 0
  }

  window.requestAnimationFrame(draw)
};

const fpsNode = document.createTextNode('')
info.appendChild(fpsNode)
window.requestAnimationFrame(draw)
