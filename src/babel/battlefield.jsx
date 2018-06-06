import React from 'react'

import { Header } from './header.jsx'
import { GridContainer } from './gridcontainer.jsx'
import { Cell } from './cell.jsx'
import { GameStructure, action } from './game/game-actions.js'

class BattleField extends React.Component {
  constructor (props) {
    super(props)
    this.init = this.init.bind(this)
    this.cell = this.cell.bind(this)
  }

  cell(f, y, x) {
    let v = 'p' + y + ',' + x
    let t = 't-' + f[0][y][x][0]

    return <Cell key={v} id={v} type={t} action={action}/>
  }

  init (f) {
    let y = 0, ry = [], x
    while (y < 100) {
      x = 0
      let rx = []
      while (x < 100) {
        rx.push(this.cell(f, y, x))
        x++
      }
      ry.push(rx)
      y++
    }

    return ry
  }

  componentWillMount () {
    this.setState({grid: this.init(GameStructure.gridAttr)})
    document.addEventListener('keydown', action.key)
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', action.key)
  }      

  render () {
    console.log('BattleField: render')
    return (
      <div className='battle-field'>
        <Header />
        <GridContainer f={GameStructure.gridAttr}>{this.state.grid}</GridContainer>
      </div>
    )
  }
}

export { BattleField }
