import { Pitch, Entities } from './game-structure.js'

var GameStructure = {
  gridAttr: Pitch.field
}

class Action {
  constructor() {
    this.f = Pitch.field

    this.click = this.click.bind(this)
    this.enter = this.enter.bind(this)
    this.out = this.out.bind(this)
    this.key = this.key.bind(this)
    this.move = this.move.bind(this)
    this.setSet = this.setSet.bind(this)
    this.set
  }

  getOccupant(e) {
    let [y,x] = e.target.id.slice(1).split(',')
    return this.f[0][y][x][1]
  }

  click (e) {
    let o = this.getOccupant(e)
    if (o) console.log('click', e.target.id, o)
  }

  enter (e) {
    let o = this.getOccupant(e)
    if (o) console.log('enter', e.target.id, o)
  }

  out (e) {
    let o = this.getOccupant(e)
    if (o) console.log('out', e.target.id, o)
  }

  key (e) {
    const k = e.keyCode
    if (k >= 37 && k <= 40) {
      const p = Entities.players[0]
      let [ y, x ] = p.pos
      if (
        k === 38 && y > 0 ||
        k === 40 && y < 99 ||
        k === 37 && x > 0 ||
        k === 39 && x < 99
      ) {
        let xo = x
        let yo = y
        switch (k) {
        case 38: y--// up
          break
        case 40: y++// down
          break
        case 37: x--// left
          break
        case 39: x++// reigth
        }
        console.log('key', e.key)
        if (this.move(yo, xo, y, x)) {
          p.pos[0] = y
          p.pos[1] = x
        }
      }
    }
  }
  
  move (y1, x1, y2, x2) {
    if (this.f[0][y2][x2][0] > 1 && !this.f[0][y2][x2][1]) {
      let o = this.f[0][y1][x1][1]
      let t = this.f[0][y1][x1][2]
      this.f[0][y1][x1][1] = null
      this.f[0][y1][x1][2] = null
      this.f[0][y2][x2][1] = o
      this.f[0][y2][x2][2] = t

      this.set(this.f)
      return true
    }
    return false
  }

  setSet (s) {
    this.set = s
  }
}

let action = new Action()

export { GameStructure, action }
