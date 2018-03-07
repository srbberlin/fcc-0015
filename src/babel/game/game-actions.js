import { NewGame } from './game-structure.js'

var GameDisplay = {
  gridAttr: NewGame.field
}

class Action {
  constructor() {
    this.click = this.click.bind(this)
    this.enter = this.enter.bind(this)
    this.out = this.out.bind(this)
    this.key = this.key.bind(this)
    this.move = this.move.bind(this)
    this.setSet = this.setSet.bind(this)
    this.set
  }

  click (e) {
    this.move(0,0,0,0)
    console.log('click', e.target.id)
  }

  enter (e) {
    console.log('enter', e.target.id)
  }

  out (e) {
    console.log('out', e.target.id)
  }

  key (e) {
    const k = e.key
    console.log('key', e)
  }
  
  move (a, b, c, d) {

    console.log('move', a,b,c,d)
    this.set({})
  }

  setSet (s) {
    this.set = s
  }
}

let action = new Action()

export { GameDisplay, action }
