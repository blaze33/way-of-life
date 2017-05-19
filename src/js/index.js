'use strict'

import Engine from './engine'
import {acorn, cross, erase} from './patterns'

const canvas = document.getElementById('universe')
const context = canvas.getContext('2d')
canvas.width = canvas.clientWidth
canvas.height = canvas.clientHeight

const pixelsPerCell = 5
const width = ~~(canvas.clientWidth / pixelsPerCell)
const height = ~~(canvas.clientHeight / pixelsPerCell)

const engine = new Engine(width, height)

// starting position at the center, hence divide by 2
acorn(engine, ~~(height / 2), ~~(width / 2))

var mouseDown = false
function mouseIsDown (event) {
  if (event.button === 0) {
    mouseDown = true
    addCells(event)
  }
}
function mouseIsUp (event) {
  mouseDown = false
}
document.body.onmousedown = mouseIsDown
document.body.onmouseup = mouseIsUp
function addCells (event, touch = false) {
  const rect = canvas.getBoundingClientRect()
  const mousePos = {
    x: (event.clientX - rect.left) / (rect.right - rect.left) * canvas.clientWidth,
    y: (event.clientY - rect.top) / (rect.bottom - rect.top) * canvas.clientHeight
  }
  const pos = {
    i: ~~(mousePos.y / pixelsPerCell),
    j: ~~(mousePos.x / pixelsPerCell)
  }
  if (mouseDown || touch) {
    if (event.ctrlKey) {
      erase(engine, pos.i, pos.j)
    } else {
      cross(engine, pos.i, pos.j)
    }
  }
}

document.addEventListener('mousemove', addCells)
document.addEventListener('touchmove', function (event) {
  for (let i = 0; i < event.touches.length; i++) {
    addCells(event.touches[i], true)
  }
})

const info = document.getElementById('info')
var fpsTime = 0
var cellTime = 0
var fps = 0
var desiredFPS = 30
var frameNumber = 0
var play = true
function draw (timeStamp) {
  window.requestAnimationFrame(draw)

  context.clearRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = 'rgba(255,118,5,0.5)'
  context.fillStyle = 'rgba(222,122,39,0.5)'
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (engine.cell(i, j)) {
        context.strokeRect(pixelsPerCell * j, pixelsPerCell * i, pixelsPerCell, pixelsPerCell)
        context.fillRect(pixelsPerCell * j, pixelsPerCell * i, pixelsPerCell, pixelsPerCell)
      }
    }
  }

  const cellElapsed = timeStamp - cellTime
  if (cellElapsed > 1000 / desiredFPS && play) {
    engine.computeNextState()

    frameNumber += 1
    cellTime = timeStamp - (cellElapsed % (1000 / desiredFPS))
  }

  // Update FPS display every half second
  const fpsElapsed = timeStamp - fpsTime
  if (fpsElapsed > 500) {
    fps = 1000 / fpsElapsed * frameNumber
    fpsNode.nodeValue = `${fps.toFixed(2)} FPS`
    fpsTime = timeStamp
    frameNumber = 0
  }
};

const fpsNode = document.createTextNode('')
info.appendChild(fpsNode)
engine.computeNextState()
window.requestAnimationFrame(draw)

document.getElementById('ctrl-play-pause')
  .addEventListener('click', function (event) {
    play = !play
    engine.next.set(engine.current)

    event.preventDefault()
    event.target.textContent = event.target.textContent === 'Pause' ? 'Play' : 'Pause'
  })
document.getElementById('ctrl-hide-show')
  .addEventListener('click', function (event) {
    var content = document.querySelector('.text-content')
    content.classList.toggle('hidden')

    event.preventDefault()
    event.target.textContent = event.target.textContent === 'Hide text' ? 'Show text' : 'Hide text'
  })
