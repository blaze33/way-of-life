'use strict'

import Engine from './engine'
import {acorn} from './patterns'
import Renderer from './renderer'
import MouseEventHandler from './events'

const canvasSelector = '#universe'
const fpsNodeSelector = '#fps-info'
const playButtonSelector = '#ctrl-play-pause'
const hideButtonSelector = '#ctrl-hide-show'

const desiredFPS = 30
const pixelsPerCell = 5
const strokeStyle = 'rgba(255,118,5,0.5)'
const fillStyle = 'rgba(222,122,39,0.5)'

window.onload = () => {
  const canvas = document.querySelector(canvasSelector)

  const width = ~~(canvas.clientWidth / pixelsPerCell)
  const height = ~~(canvas.clientHeight / pixelsPerCell)
  const engine = new Engine(width, height)

  const renderer = new Renderer(canvas, engine, {
    desiredFPS,
    pixelsPerCell,
    fpsNode: document.querySelector(fpsNodeSelector),
    strokeStyle,
    fillStyle
  })

  // starting position at the center, hence divide by 2
  acorn(engine, ~~(height / 2), ~~(width / 2))
  acorn(engine, 0, 0)

  // mouse events
  const playPauseToggle = (event) => {
    renderer.togglePlay()
    event.target.textContent = event.target.textContent === 'Pause' ? 'Play' : 'Pause'
  }
  const hideContentToggle = (event) => {
    var content = document.querySelector('.text-content')
    content.classList.toggle('hidden')
    event.target.textContent = event.target.textContent === 'Hide text' ? 'Show text' : 'Hide text'
  }
  const events = new MouseEventHandler(canvas, engine, renderer)
  events.addEvents([
    {
      selector: playButtonSelector,
      eventType: 'click',
      callback: playPauseToggle
    },
    {
      selector: hideButtonSelector,
      eventType: 'click',
      callback: hideContentToggle
    }
  ])

  // start
  renderer.start()
}
