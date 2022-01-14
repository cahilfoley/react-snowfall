import ReactDOM from 'react-dom'
import App from './App'
import { StateProvider } from './context/settings'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <StateProvider>
    <App />
  </StateProvider>,
  document.getElementById('root')
)

serviceWorkerRegistration.register()
