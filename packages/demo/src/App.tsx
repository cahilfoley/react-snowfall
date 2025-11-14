import Snowfall from 'react-snowfall/src'
import GithubLink from './components/GithubLink/GithubLink'
import Settings from './components/Settings'
import { useSettingsStore } from './settings'
import logo from './logo.png'
import './App.css'

const githubURL = import.meta.env.VITE_GITHUB_URL
const packageName = import.meta.env.VITE_PACKAGE_NAME

const snowflake = document.createElement('img')
snowflake.src = logo

const images = [snowflake]

const App = () => {
  const { color, snowflakeCount, radius, speed, wind, useImages, opacity, enable3DRotation } = useSettingsStore()

  return (
    <div className="app">
      <Snowfall
        color={color}
        snowflakeCount={snowflakeCount}
        radius={radius}
        speed={speed}
        wind={wind}
        images={useImages ? images : undefined}
        opacity={opacity}
        enable3DRotation={enable3DRotation}
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
