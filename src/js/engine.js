class Engine {
  constructor (width, height) {
    this.width = width
    this.height = height

    const buffer = new ArrayBuffer(width * height)
    this._current = new Uint8Array(buffer)
    const nextBuffer = new ArrayBuffer(width * height)
    this._next = new Uint8Array(nextBuffer)
  }

  index (i, j) {
    if (i === -1) {
      i = this.height - 1
    } else if (i === this.height) {
      i = 0
    }
    if (j === -1) {
      j = this.width - 1
    } else if (j === this.width) {
      j = 0
    }
    return i * this.width + j
  }

  cell (i, j) {
    return this._current[this.index(i, j)]
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
