import React from 'react'
import PropTypes from 'prop-types'

class Cell extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    if (this.props.flag !== undefined)
      console.log('Cell render:', this.props.id)
    return (
      <div
        id={this.props.id}
        className={'cell ' + this.props.type}
        title={this.props.title}
        onMouseEnter={this.props.action.enter}
        onClick={this.props.action.click}
        onMouseOut={this.props.action.out}
      >
      </div>
    )
  }
}

Cell.propTypes = {
  flag: PropTypes.number,
  type: PropTypes.string,
  title: PropTypes.string,
  id: PropTypes.string,
  action: PropTypes.object,
}

export { Cell }
