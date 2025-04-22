import { useState } from 'react'
import '../App.css'
import logo from '../assets/logo-ferreteria.png'

function CompradorView() {
  const [vista, setVista] = useState('inventario')

  return (
    <div className="page-container">
      <header className="topbar">
        <div className="left-section">
          <img src={logo} alt="Logo" className="topbar-logo" />
          <span className="topbar-title">Comprador</span>
        </div>
        <div className="right-section">
          <button className="topbar-button" onClick={() => setVista('inventario')}>Inventario</button>
          <button className="topbar-button" onClick={() => setVista('ai')}>AI Assistance</button>
          <button className="topbar-button" onClick={() => setVista('pedidos')}>Pedidos</button>
          <button className="topbar-button">
            Adolfo G. <span className="user-icon">👤</span>
          </button>
        </div>
      </header>

      <main className="main-content">
        {vista === 'inventario' && (
          <>
            <div className="filtros">
              <div className="filtro-nombre">
                <label htmlFor="filtro-nombre">Filtrar por nombre</label>
                <input type="text" id="filtro-nombre" placeholder="Escribe nombre" className="input" />
              </div>
              <div className="botones-filtros">
                <button className="boton-filtro">Categoría ▼</button>
              </div>
            </div>

            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>Nombre del producto</th>
                  <th>Categoría</th>
                  <th>Cantidad de producto</th>
                  <th>Número de serie</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>Martillo</td><td>Herramienta manual</td><td>25</td><td>001</td></tr>
                <tr><td>Clavos</td><td>Materiales de sujeción</td><td>100</td><td>002</td></tr>
                <tr><td>Llave inglesa</td><td>Herramienta manual</td><td>20</td><td>003</td></tr>
                <tr><td>Destornillador</td><td>Herramienta manual</td><td>32</td><td>004</td></tr>
                <tr><td>Sierra manual</td><td>Herramienta manual</td><td>40</td><td>005</td></tr>
                <tr><td>Taladro electrico</td><td>Herramientas eléctricas</td><td>15</td><td>006</td></tr>
                <tr><td>Cinta metrica</td><td>Medición e iluminación</td><td>200</td><td>007</td></tr>
                <tr><td>Tenazas</td><td>Herramienta manual</td><td>20</td><td>008</td></tr>
                <tr><td>Linterna</td><td>Medición e iluminación</td><td>5</td><td>009</td></tr>
              </tbody>
            </table>
          </>
        )}

        {vista === 'ai' && (
          <table className="tabla-productos">
            <thead>
              <tr>
                <th>Nombre del producto</th>
                <th>Proveedor</th>
                <th>Cantidad de producto</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Martillo</td><td>Herramientas el sur</td><td>25</td><td><button className="decline">Decline</button> <button className="confirm">Confirm</button></td></tr>
              <tr><td>Clavos</td><td>Trupper</td><td>100</td><td><button className="decline">Decline</button> <button className="confirm">Confirm</button></td></tr>
              <tr><td>Llave inglesa</td><td>Comex</td><td>20</td><td><button className="decline">Decline</button> <button className="confirm">Confirm</button></td></tr>
              <tr><td>Destornillador</td><td>Comex</td><td>32</td><td><button className="decline">Decline</button> <button className="confirm">Confirm</button></td></tr>
            </tbody>
          </table>
        )}

        {vista === 'pedidos' && (
          <>
            <div className="filtros">
              <div className="filtro-nombre">
                <label htmlFor="filtro-pedidos">Filtrar por nombre</label>
                <input type="text" id="filtro-pedidos" placeholder="Escribe nombre" className="input" />
              </div>
            </div>
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>Número de pedido</th>
                  <th>Proveedor</th>
                  <th>Nombre producto</th>
                  <th>Estatus pedido</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Trupper</td><td>Martillo</td><td><select><option>En curso</option></select></td></tr>
                <tr><td>2</td><td>Trupper</td><td>Clavos</td><td><select><option>En curso</option></select></td></tr>
                <tr><td>3</td><td>Trupper</td><td>Llave inglesa</td><td><select><option>En curso</option></select></td></tr>
                <tr><td>14</td><td>Trupper</td><td>Tenazas</td><td><select><option>Pendiente pago</option></select></td></tr>
              </tbody>
            </table>
          </>
        )}
      </main>
    </div>
  )
}

export default CompradorView
