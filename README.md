# The Way of Life

Conway's game of life implementation in javascript using a canvas element for rendering.

[Demo](https://blaze33.github.io/game-of-life/)

[![Build Status](https://travis-ci.org/blaze33/way-of-life.svg?branch=master)](https://travis-ci.org/blaze33/way-of-life)

## Installation

The npm package only links to the ES6 code so it's only usable as a dependency for now.
```bash
npm install --save-dev way-of-life
```

## Usage

```javascript
import {Engine, acorn} from 'way-of-life'

// initialize the game with an empty 40x40 matrix
const engine = new Engine(40, 40)

// initialize some living cells around the center of the matrix
acorn(engine, 20, 20)

// compute the next state of game
engine.computeNextState()
```

See the [demo code](https://github.com/blaze33/way-of-life/blob/master/src/js/demo.js) for a more advanced usage.
