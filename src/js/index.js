'use strict'

import Engine from './engine'
import {acorn, cross, erase} from './patterns'
import Renderer from './renderer'

const canvas = document.getElementById('universe')

const pixelsPerCell = 5
const width = ~~(canvas.clientWidth / pixelsPerCell)
const height = ~~(canvas.clientHeight / pixelsPerCell)
const engine = new Engine(width, height)

const renderer = new Renderer(canvas, engine, {
  desiredFPS: 30,
  pixelsPerCell,
  fpsNode: document.getElementById('fps-info')
})

// starting position at the center, hence divide by 2
acorn(engine, ~~(height / 2), ~~(width / 2))
acorn(engine, 0, 0)

// mouse events
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

// control buttons eavents
document.getElementById('ctrl-play-pause')
  .addEventListener('click', function (event) {
    renderer.togglePlay()

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

// start
renderer.start()
