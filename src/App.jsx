// src/App.jsx

import './App.css'
import logo from './assets/logo-ferreteria.png'
import { useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <img src={logo} alt="Logo Ferretería Julen" className="logo-image" />

      <div className="formulario">
        <input
          type="email"
          placeholder="Correo Electrónico"
          className="input"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input"
        />

        <button className="boton" onClick={() => navigate('/admin')}>
          Vista Admin
        </button>
        <button className="boton" onClick={() => navigate('/almacenador')}>
          Vista Almacenador
        </button>
        <button className="boton" onClick={() => navigate('/comprador')}>
          Vista Comprador
        </button>

        <a href="#" className="olvido">¿Olvidó su contraseña?</a>
      </div>
    </div>
  )
}

export default App
