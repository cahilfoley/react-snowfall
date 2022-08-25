import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { StateProvider } from './context/settings'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = createRoot(document.getElementById('root') as HTMLDivElement)
root.render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>
)

serviceWorkerRegistration.register()
