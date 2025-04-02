// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import AdminView from './views/AdminView.jsx'
import AlmacenadorView from './views/AlmacenadorView.jsx'
import CompradorView from './views/CompradorView.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminView />} />
        <Route path="/almacenador" element={<AlmacenadorView />} />
        <Route path="/comprador" element={<CompradorView />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
