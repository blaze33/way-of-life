'use strict'

import Engine from './engine'
// import WasmEngine from './wasmEngine'
import {acorn} from './patterns'
import Renderer from './renderer'
import MouseEventHandler from './events'
import queryString from 'query-string'

const defaultOptions = {
  canvasSelector: '#universe',
  fpsNodeSelector: '#fps-info',
  playButtonSelector: '#ctrl-play-pause',
  hideButtonSelector: '#ctrl-hide-show',
  switchEngineSelector: '#ctrl-engine',
  desiredFPS: 30,
  pixelsPerCell: 5,
  strokeStyle: 'rgba(255,118,5,0.5)',
  fillStyle: 'rgba(222,122,39,0.5)',
  showText: true,
  useWasm: false
}
const urlOptions = queryString.parse(window.location.search)
if (urlOptions.desiredFPS || urlOptions.pixelsperCell) {
  defaultOptions.showText = false
}
const options = Object.assign(defaultOptions, urlOptions)
options.desiredFPS = parseInt(options.desiredFPS, 10)
options.pixelsperCell = parseInt(options.pixelsperCell, 10)

const gameOfLife = () => {
  const canvas = document.querySelector(options.canvasSelector)

  const width = ~~(canvas.clientWidth / options.pixelsPerCell)
  const height = ~~(canvas.clientHeight / options.pixelsPerCell)
  const wasmEngine = new Engine(width, height)
  const jsEngine = new Engine(width, height)
  var engine
  if (options.useWasm === true) {
    engine = wasmEngine
  } else {
    engine = jsEngine
  }
  window.engine = engine

  const renderer = new Renderer(canvas, engine, {
    desiredFPS: options.desiredFPS,
    pixelsPerCell: options.pixelsPerCell,
    fpsNode: document.querySelector(options.fpsNodeSelector),
    strokeStyle: options.strokeStyle,
    fillStyle: options.fillStyle
  })

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
  const hideText = () => {
    var content = document.querySelector('.text-content')
    content.classList.add('hidden')
    const hideButton = document.querySelector(options.hideButtonSelector)
    hideButton.textContent = 'Show text'
  }
  if (options.showText === false) {
    hideText()
  }
  const switchEngine = event => {
    if (engine instanceof Engine) {
      engine = jsEngine
    } else {
      engine = wasmEngine
    }
    renderer.engine = engine
    events.engine = engine
    event.target.textContent = event.target.textContent === 'Use js engine' ? 'Use wasm engine' : 'Use js engine'
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
    },
    {
      selector: options.switchEngineSelector,
      eventType: 'click',
      callback: switchEngine
    }
  ])
  const checkFlag = () => {
    if (engine.module.calledRun !== true) {
      window.setTimeout(checkFlag.bind(this), 100)
    } else {
        // allocate the engines state memory
      wasmEngine.init()
      jsEngine.init()
        // initialize some cells at the center
      acorn(wasmEngine, ~~(height / 2), ~~(width / 2))
      acorn(wasmEngine, 0, 0)
      acorn(jsEngine, ~~(height / 2), ~~(width / 2))
      acorn(jsEngine, 0, 0)
        // start
      renderer.start()
    }
  }
  checkFlag()
}

window.onload = gameOfLife
