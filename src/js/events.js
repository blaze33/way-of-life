'use strict'

import {erase, cross} from './patterns'

class MouseEventHandler {
  constructor (canvas, engine, renderer, events={}) {
    this.canvas = canvas
    this.engine = engine
    this.renderer = renderer
    this.mouseDown = false

    document.body.onmousedown = this.mouseIsDown.bind(this)
    document.body.onmouseup = this.mouseIsUp.bind(this)

    document.addEventListener('mousemove', this.addCells.bind(this))
    document.addEventListener('touchmove', function (event) {
      for (let i = 0; i < event.touches.length; i++) {
        this.addCells(event.touches[i], true)
      }
    })

    for (let selector in events) {
      document.querySelector(selector).addEventListener(
        events[selector].eventType,
        events[selector].callback
      )
    }
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