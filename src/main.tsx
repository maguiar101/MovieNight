// React imports
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Styles and main app component
import './index.css'
import App from './App.tsx'

/**
 * Application Entry Point
 * 
 * This is the main entry point for the Movie Night React application.
 * It renders the App component into the DOM root element.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
