import React from 'react'
import PropTypes from 'prop-types'

class Cell extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      type: this.props.type,
      style: this.props.style,
      title: this.props.title,
      action: this.props.action,
      //click: this.props.action.click,
      //eoutnter: this.props.action.out,
    }
  }

  render () {
    return (
      <div
        id={this.props.id}
        className={'cell ' + this.state.type}
        style={this.state.style}
        title={this.state.title}
        onMouseEnter={this.state.action.enter}
        onClick={this.state.action.click}
        onMouseOut={this.state.action.out}
      >
      </div>
    )
  }
}

Cell.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  title: PropTypes.string,
  id: PropTypes.string,
  action: PropTypes.object,
  //click: PropTypes.func,
  //out: PropTypes.func,
}

export { Cell }
