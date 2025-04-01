// src/App.jsx

import './App.css'
import logo from './assets/logo-ferreteria.png' // Asegúrate de que la imagen esté en esa ruta

function App() {
  return (
    <div className="login-container">
      <img src={logo} alt="Logo Ferretería Julen" className="logo-image" />

      <div className="formulario">
        <input type="email" placeholder="Correo Electrónico" className="input" />
        <input type="password" placeholder="Contraseña" className="input" />
        <button className="boton">Inicia sesión</button>
        <a href="#" className="olvido">¿Olvidó su contraseña?</a>
      </div>
    </div>
  )
}

export default App
