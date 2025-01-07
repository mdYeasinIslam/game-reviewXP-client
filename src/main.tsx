import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthContext from './Context/AuthContext.tsx'
import ThemeContext from './Context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeContext>
      <AuthContext>
          <App />
    </AuthContext>
    </ThemeContext>
  </StrictMode>,
)
