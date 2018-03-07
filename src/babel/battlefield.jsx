import React from 'react'

import { Header } from './header.jsx'
import { Cell } from './cell.jsx'
import { GameDisplay, action } from './game/game-actions.js'

class BattleField extends React.Component {
  constructor (props) {
    super(props)

    this.init = this.init.bind(this)
    this.set = this.set.bind(this)

    this.state = {
      gridAttr: GameDisplay.gridAttr,
    }

    action.setSet(this.set)
  }

  set (d) {
    console.log('set', d)
    this.setState(d)
  }

  init () {
    let y = 0, ry = [], x
    while (y < 100) {
      x = 0
      let rx = []
      while (x < 100) {
        let v = 'p' + x + ',' + y
        let t = 't-' + GameDisplay.gridAttr[0][y][x][0]
        let c = GameDisplay.gridAttr[0][y][x][1]
        let s = {}
        let title = GameDisplay.gridAttr[0][y][x][2]
        let y1, x1, y2, x2
        if (title) {
          y1 = title[0]
          x1 = title[1]
          y2 = title[2]
          x2 = title[3]
        }
        if (c) {
          t += '-' + c.short
        }
        else {
          if (t === 't-2') {
            s = {
              backgroundColor: '#' + '666'
            }
          }
        }
        if (title){
          rx.push(<Cell 
            action={action}
            key={v} id={v} type={t} style={s} title={y1 + ',' + x1 + ',' + y2 + ',' + x2}/>)
        }
        else {
          rx.push(<Cell 
            action={action}
            key={v} id={v} type={t} style={s}/>)
        }
        x++
      }
      ry.push(rx)
      y++
    }

    return ry // ????
  }

  componentWillMount () {
    this.setState({grid: this.init()})
    document.addEventListener('keydown', action.key)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', action.key)
  }      

  render () {
    return (
      <div className='container'>
        <Header />
        <div className='battle-field'>{this.state.grid}</div>
      </div>
    )
  }
}

export { BattleField }

