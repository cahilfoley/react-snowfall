import React, { Component } from 'react'
import Snowfall from '@cahil/snowfall'
import GithubLink from './GithubLink'
import './App.css'

const githubURL = process.env.REACT_APP_GITHUB_URL as string
const packageName = process.env.REACT_APP_PACKAGE_NAME as string

class App extends Component {
  render() {
    return (
      <div className="app">
        <GithubLink url={githubURL} />
        <Snowfall snowflakeCount={200} />
        <h1>snowfall</h1>
        <a href={githubURL}>{packageName}</a>
      </div>
    )
  }
}

export default App
