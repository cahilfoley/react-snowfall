import Snowfall from 'react-snowfall'
import GithubLink from './components/GithubLink/GithubLink'
import Settings from './components/Settings'
import { useSettingsStore } from './settings'
import logo from './logo.png'
import './App.css'

const githubURL = process.env.REACT_APP_GITHUB_URL as string
const packageName = process.env.REACT_APP_PACKAGE_NAME as string

const snowflake = document.createElement('img')
snowflake.src = logo

const images = [snowflake]

const App = () => {
  const { color, snowflakeCount, radius, speed, wind, useImages } = useSettingsStore()

  return (
    <div className="app">
      <Snowfall
        color={color}
        snowflakeCount={snowflakeCount}
        radius={radius}
        speed={speed}
        wind={wind}
        images={useImages ? images : undefined}
      />
      <a className="title" href={githubURL} style={{ color }}>
        <img src={logo} alt="Snowflake Logo" />
        <h1>{packageName}</h1>
      </a>
      <Settings />
      <GithubLink url={githubURL} />
    </div>
  )
}

export default App
