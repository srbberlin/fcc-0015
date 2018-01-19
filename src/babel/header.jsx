import React from 'react'

class Header extends React.Component {
  constructor (props) {
    super (props)
    this.state = { v: '!!!' }
  }
  render () {
    return (
      <h1>
        Hello World { this.state.v }
      </h1>
    )
  }
}

export { Header }

