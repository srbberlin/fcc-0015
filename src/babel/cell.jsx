import React from 'react'

class Cell extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      type: this.props.type,
      style: this.props.style,
      title: this.props.title
    }
  }

  render () {
    return (
      <div
        id={this.props.id}
        className={'cell ' + this.state.type}
        style={this.state.style}
        title={this.state.title}
      >
      </div>
    )
  }
}

export { Cell }
