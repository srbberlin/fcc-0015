import React from 'react'
import { action } from './game/game-actions.js'
import PropTypes from 'prop-types'

class GridContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.clone = this.clone.bind(this)
    this.set = this.set.bind(this)
    this.doRender = this.doRender.bind(this)

    action.setSet(this.set)
  }

  clone(f, y, x) {
    let v = 'p' + y + ',' + x
    let t = 't-' + f[0][y][x][0]
    let c = f[0][y][x][1]
    let title = f[0][y][x][2]

    if (c) {
      t += '-' + c.short
    }

    return { key: v, type: t, title: title, flag: 1}
  }

  set (f, [y1, x1, y2, x2]) {
    console.log('set', y1, x1, y2, x2)

    this.setState({
      'gridAttr': f,
      '1': this.clone(f, y1, x1),
      '2': this.clone(f, y2, x2)
    })
  }

  doRender (child) {

    if (this.state['1']) {
      if (this.state['1'].key === child.key) {
        return React.cloneElement(child, this.state['1'])
      }
      if (this.state['2'].key === child.key) {
        return React.cloneElement(child, this.state['2'])
      }
    }
    return child
  }

  render () {
    //React.Children.forEach(this.props.children, child => this.doRender(child))
    return (
      <div className='grid-container'>
        { React.Children.map(this.props.children, child => this.doRender(child)) }
      </div>
    )
  }
}

GridContainer.propTypes = {
  children: PropTypes.array,
}

export { GridContainer }