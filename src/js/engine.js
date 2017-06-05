'use strict'

class Engine {
  constructor (width, height) {
    this.wasm = false
    this.width = width
    this.height = height
    this.module = {calledRun: true}
  }

  init () {
    const buffer = new ArrayBuffer(this.width * this.height)
    this._current = new Uint8Array(buffer)
    const nextBuffer = new ArrayBuffer(this.width * this.height)
    this._next = new Uint8Array(nextBuffer)
    this.module = {calledRun: true}
  }

  index (i, j) {
    i = i === -1 ? this.height - 1 : i === this.height ? 0 : i
    j = j === -1 ? this.width - 1 : j === this.width ? 0 : j
    return i * this.width + j
  }

  cell (i, j) {
    return this._current[this.index(i, j)]
  }

  cellSafe (i, j) {
    return this._current[i * this.width + j]
  }

  next (i, j) {
    return this._next[this.index(i, j)]
  }

  computeNextState () {
    let neighbors
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        neighbors = this.cell(i - 1, j - 1) + this.cell(i - 1, j) + this.cell(i - 1, j + 1)
        neighbors += this.cell(i, j - 1) /* this.cell(i, j) */ + this.cell(i, j + 1)
        neighbors += this.cell(i + 1, j - 1) + this.cell(i + 1, j) + this.cell(i + 1, j + 1)
        if (neighbors < 2 || neighbors > 3) {
          this._next[i * this.width + j] = 0
        } else if (neighbors === 3) {
          this._next[i * this.width + j] = 1
        } else {
          this._next[i * this.width + j] = this._current[i * this.width + j]
        }
      }
    }
    this._current.set(this._next)
  }

  set (i, j, value = 1) {
    this._current[this.index(i, j)] = value
  }

  setNext (i, j, value = 1) {
    this._next[this.index(i, j)] = value
  }
}

export {Engine as default}
