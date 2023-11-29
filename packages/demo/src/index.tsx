import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

const root = createRoot(document.getElementById('root') as HTMLDivElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>,
)

serviceWorkerRegistration.register({
  onUpdate(registration) {
    registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
  },
})
