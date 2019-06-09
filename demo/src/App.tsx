import React, { useContext } from 'react'
import Snowfall from '@cahil/snowfall'
import GithubLink from './components/GithubLink/GithubLink'
import Settings from './components/Settings'
import { SettingsContext, StateProvider } from './context/settings'
import './App.css'

const githubURL = process.env.REACT_APP_GITHUB_URL as string
const packageName = process.env.REACT_APP_PACKAGE_NAME as string

const Demo = () => {
  const settings = useContext(SettingsContext)

  return <Snowfall color={settings.color} snowflakeCount={settings.snowflakeCount} />
}

const Title = () => {
  const settings = useContext(SettingsContext)

  return (
    <a href={githubURL} style={{ color: settings.color }}>
      <h1>{packageName}</h1>
    </a>
  )
}

const App = () => (
  <StateProvider>
    <div className="app">
      <GithubLink url={githubURL} />
      <Title />
      <Demo />
      <Settings />
    </div>
  </StateProvider>
)

export default App
