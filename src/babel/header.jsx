import React from 'react'
import PropTypes from 'prop-types'

class Header extends React.Component {
  constructor (props) {
    super (props)
    this.state = { v: '!!!' }
  }
  render () {
    return (
      <h1>
        The Dungeon Crawler Game { this.state.v }
      </h1>
    )
  }
}

Header.propTypes = {
  v: PropTypes.string,
}

export { Header }

