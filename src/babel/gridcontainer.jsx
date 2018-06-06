import React from 'react'
import { action } from './game/game-actions.js'
import PropTypes from 'prop-types'

class GridContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = {}

    this.clone = this.cloneProps.bind(this)
    this.set = this.set.bind(this)
    this.doRender = this.doRender.bind(this)

    action.setSet(this.set)
  }

  cloneProps(o, e) {
    let r = { type: `t-2-${o.short}`, title: e[2], flag: 1}
    return r
  }

  set (f) {
    this.setState({
      'f': f,
    })
  }

  doRender (child) {

    if (this.state['f']) {
      let [y,x] = child.props.id.substring(1).split(',')
      let e = this.state.f[0][Number.parseInt(y)][Number.parseInt(x)]
      let o = e[1]
      if (o) {
        return React.cloneElement(child, this.cloneProps(o, e))
      }
    }
    return child
  }

  componentWillMount () {
    this.set(this.props.f)
  }

  render () {
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