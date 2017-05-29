'use strict'

import Engine from './engine'
import {acorn} from './patterns'
import Renderer from './renderer'
import MouseEventHandler from './events'
import queryString from 'query-string'

const defaultOptions = {
  canvasSelector: '#universe',
  fpsNodeSelector: '#fps-info',
  playButtonSelector: '#ctrl-play-pause',
  hideButtonSelector: '#ctrl-hide-show',
  desiredFPS: 30,
  pixelsPerCell: 5,
  strokeStyle: 'rgba(255,118,5,0.5)',
  fillStyle: 'rgba(222,122,39,0.5)'
}
const urlOptions = queryString.parse(window.location.search)
const options = Object.assign(defaultOptions, urlOptions)
options.desiredFPS = parseInt(options.desiredFPS, 10)
options.pixelsperCell = parseInt(options.pixelsperCell, 10)

const gameOfLife = () => {
  const canvas = document.querySelector(options.canvasSelector)

  const width = ~~(canvas.clientWidth / options.pixelsPerCell)
  const height = ~~(canvas.clientHeight / options.pixelsPerCell)
  const engine = new Engine(width, height)

  const renderer = new Renderer(canvas, engine, {
    desiredFPS: options.desiredFPS,
    pixelsPerCell: options.pixelsPerCell,
    fpsNode: document.querySelector(options.fpsNodeSelector),
    strokeStyle: options.strokeStyle,
    fillStyle: options.fillStyle
  })

  // starting position at the center, hence divide by 2
  acorn(engine, ~~(height / 2), ~~(width / 2))
  acorn(engine, 0, 0)

  // mouse events
  const playPauseToggle = event => {
    renderer.togglePlay()
    event.target.textContent = event.target.textContent === 'Pause' ? 'Play' : 'Pause'
  }
  const hideContentToggle = event => {
    var content = document.querySelector('.text-content')
    content.classList.toggle('hidden')
    event.target.textContent = event.target.textContent === 'Hide text' ? 'Show text' : 'Hide text'
  }
  const events = new MouseEventHandler(canvas, engine, renderer)
  events.addEvents([
    {
      selector: options.playButtonSelector,
      eventType: 'click',
      callback: playPauseToggle
    },
    {
      selector: options.hideButtonSelector,
      eventType: 'click',
      callback: hideContentToggle
    }
  ])

  // start
  renderer.start()
}

window.onload = gameOfLife
