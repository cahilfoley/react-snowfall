import React, { useContext } from 'react'
import Snowfall from 'react-snowfall'
import GithubLink from './components/GithubLink/GithubLink'
import Settings from './components/Settings'
import { SettingsContext } from './context/settings'
import './App.css'

const githubURL = process.env.REACT_APP_GITHUB_URL as string
const packageName = process.env.REACT_APP_PACKAGE_NAME as string

const App = () => {
  const settings = useContext(SettingsContext)

  return (
    <div className="app">
      <Snowfall color={settings.color} snowflakeCount={settings.snowflakeCount} />
      <a className="title" href={githubURL} style={{ color: settings.color }}>
        <img src="./android-chrome-512x512.png" alt="Snowflake Logo" />
        <h1>{packageName}</h1>
      </a>
      <Settings />
      <GithubLink url={githubURL} />
    </div>
  )
}

export default App
