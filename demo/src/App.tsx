import React, { useContext } from "react";
import Snowfall from "react-snowfall";
import GithubLink from "./components/GithubLink/GithubLink";
import Settings from "./components/Settings";
import { SettingsContext, StateProvider } from "./context/settings";
import "./App.css";

const githubURL = process.env.REACT_APP_GITHUB_URL as string;
const packageName = process.env.REACT_APP_PACKAGE_NAME as string;

const App = () => {
  const settings = useContext(SettingsContext);

  return (
    <StateProvider>
      <div className="app">
        <Snowfall
          color={settings.color}
          snowflakeCount={settings.snowflakeCount}
        />
        <a href={githubURL} style={{ color: settings.color }}>
          <h1>{packageName}</h1>
        </a>
        <Settings />
      </div>
      <GithubLink url={githubURL} />
    </StateProvider>
  );
};

export default App;
