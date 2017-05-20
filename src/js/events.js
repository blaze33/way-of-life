'use strict'

import {erase, cross} from './patterns'

class MouseEventHandler {
  constructor (canvas, engine, renderer) {
    this.canvas = canvas
    this.engine = engine
    this.renderer = renderer
    this.mouseDown = false
    this.listeners = []

    this.addEvents([
      {eventType: 'mousedown', callback: this.mouseIsDown.bind(this)},
      {eventType: 'mouseup', callback: this.mouseIsUp.bind(this)},
      {eventType: 'mousemove', callback: this.addCells.bind(this)},
      {eventType: 'touchmove',
        callback: (event) => {
          for (let i = 0; i < event.touches.length; i++) {
            this.addCells(event.touches[i], true)
          }
        }}
    ])
  }

  addEvents (events = []) {
    events.forEach((event) => {
      this.listeners.push(event)
      let target = document
      if (event.selector) {
        target = document.querySelector(event.selector)
      }
      console.log(target, event)
      target.addEventListener(event.eventType, event.callback)
    })
  }

  addCells (event, touch = false) {
    const rect = this.canvas.getBoundingClientRect()
    const mousePos = {
      x: (event.clientX - rect.left) / (rect.right - rect.left) * this.canvas.clientWidth,
      y: (event.clientY - rect.top) / (rect.bottom - rect.top) * this.canvas.clientHeight
    }
    const pos = {
      i: ~~(mousePos.y / this.renderer.pixelsPerCell),
      j: ~~(mousePos.x / this.renderer.pixelsPerCell)
    }
    if (this.mouseDown || touch) {
      if (event.ctrlKey) {
        erase(this.engine, pos.i, pos.j)
      } else {
        cross(this.engine, pos.i, pos.j)
      }
    }
  }

  mouseIsDown (event) {
    if (event.button === 0) {
      this.mouseDown = true
      this.addCells(event)
    }
  }

  mouseIsUp (event) {
    this.mouseDown = false
  }
}

export {MouseEventHandler as default}
