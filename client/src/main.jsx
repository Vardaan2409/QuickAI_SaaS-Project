import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './i18n'
import { BrowserRouter } from "react-router-dom"
import { ClerkProvider } from '@clerk/clerk-react'
import { enUS, esES, hiIN } from '@clerk/localizations'
import { useTranslation } from 'react-i18next'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const ClerkWithLocalization = ({ children }) => {
  const { i18n } = useTranslation();
  
  const getLocalization = () => {
    switch(i18n.language) {
      case 'es': return esES;
      case 'hi': return hiIN;
      default: return enUS;
    }
  }

  return (
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl='/'
      localization={getLocalization()}
    >
      {children}
    </ClerkProvider>
  )
}

createRoot(document.getElementById('root')).render(
  <ClerkWithLocalization>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ClerkWithLocalization>
)
