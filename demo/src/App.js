import React, { Component } from 'react'
import Snowfall from '@cahil/snowfall'
import './App.css'

class App extends Component {
  render() {
    return (
      <div className="app">
        <Snowfall snowflakeCount={250} />
        <h1>snowfall</h1>
        <a href="https://github.com/cahilfoley/snowfall">@cahil/snowfall</a>
      </div>
    )
  }
}

export default App
