function acorn (engine, i, j, next = false) {
  const setMethod = next ? engine.setNext.bind(engine) : engine.setCurrent.bind(engine)
  setMethod(i - 1, j)
  setMethod(i, j + 2)
  setMethod(i + 1, j - 1)
  setMethod(i + 1, j)
  setMethod(i + 1, j + 3)
  setMethod(i + 1, j + 4)
  setMethod(i + 1, j + 5)
}

function cross (engine, i, j, next = false) {
  const setMethod = next ? engine.setNext.bind(engine) : engine.setCurrent.bind(engine)
  setMethod(i - 1, j)
  setMethod(i, j - 1)
  setMethod(i, j)
  setMethod(i, j + 1)
  setMethod(i + 1, j)
}

function erase (engine, i, j, next = false) {
  const setMethod = next ? engine.setNext.bind(engine) : engine.setCurrent.bind(engine)
  setMethod(i - 1, j - 1, 0)
  setMethod(i - 1, j, 0)
  setMethod(i - 1, j + 1, 0)
  setMethod(i, j - 1, 0)
  setMethod(i, j, 0)
  setMethod(i, j + 1, 0)
  setMethod(i + 1, j - 1, 0)
  setMethod(i + 1, j, 0)
  setMethod(i + 1, j + 1, 0)
}

export {
  acorn, cross, erase
}
