import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const WORDS = ["hello", "adieu", "apple", "point", "share"]

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App words={WORDS}/>
  </StrictMode>,
)
