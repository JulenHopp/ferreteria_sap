import './index.css'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { ThemeProvider } from '@ui5/webcomponents-react';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter basement="/ferreteria_sap">
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
