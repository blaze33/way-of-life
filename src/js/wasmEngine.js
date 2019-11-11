'use strict'
import Module from './wasm/engine.js'

class WasmEngine {
  constructor (width, height) {
    this.wasm = true
    this.width = width
    this.height = height
    this.module = Module({ wasmBinaryFile: 'wasm/engine.wasm' }).then(
      Module => { Module.calledRun = true }
    )
    window.module = this.module
  }

  init () {
    // _init returns a pointer to the array of the current game state
    // we'll save it to have a fast access to the state in cellSafe
    this.currentAdress = this.module._init(this.width, this.height)
  }

  cellSafe (i, j) {
    // cellSafe should only be called when we know i and j are within
    // the bounds of the game state array.
    return this.module.HEAP8[this.currentAdress + (i + 1) * (this.width + 2) + j + 1]
    // return this.module.getValue(this.currentAdress + i * this.width + j, 'i8')
  }

  computeNextState () {
    this.module._computeNextState()
  }

  set (i, j, value = 1) {
    this.module._set(i, j, value)
  }
}

export { WasmEngine as default }
