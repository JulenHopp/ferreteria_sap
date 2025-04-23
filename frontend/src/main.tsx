import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@ui5/webcomponents-react';
import './index.css'
import App from './App.tsx'
import Login from './pages/login.tsx' // ✅ Importa Login
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} /> {/* ✅ Nueva ruta */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
