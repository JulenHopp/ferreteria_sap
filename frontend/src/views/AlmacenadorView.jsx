import { useState } from 'react'
import '../App.css'
import logo from '../assets/logo-ferreteria.png'

function AlmacenadorView() {
  const [mostrarModal, setMostrarModal] = useState(false)
  const [mostrarNuevoModal, setMostrarNuevoModal] = useState(false)
  const [productos, setProductos] = useState([
    { nombre: 'Martillo', categoria: 'Herramienta manual', cantidad: 25, serie: '001' },
    { nombre: 'Clavos', categoria: 'Materiales de sujeción', cantidad: 100, serie: '002' },
    { nombre: 'Llave inglesa', categoria: 'Herramienta manual', cantidad: 20, serie: '003' },
    { nombre: 'Destornillador', categoria: 'Herramienta manual', cantidad: 32, serie: '004' },
    { nombre: 'Sierra manual', categoria: 'Herramienta manual', cantidad: 40, serie: '005' },
    { nombre: 'Taladro eléctrico', categoria: 'Herramientas eléctricas', cantidad: 15, serie: '006' },
    { nombre: 'Cinta métrica', categoria: 'Medición e iluminación', cantidad: 200, serie: '007' },
    { nombre: 'Tenazas', categoria: 'Herramienta manual', cantidad: 20, serie: '008' },
    { nombre: 'Linterna', categoria: 'Medición e iluminación', cantidad: 5, serie: '009' },
  ])

  const eliminarProducto = (indice) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este producto?")
    if (confirmacion) {
      const copia = [...productos]
      copia.splice(indice, 1)
      setProductos(copia)
    }
  }

  return (
    <div className="page-container">
      <header className="topbar">
        <div className="left-section">
          <img src={logo} alt="Logo" className="topbar-logo" />
          <span className="topbar-title">Almacenador</span>
        </div>
        <div className="right-section">
          <button className="topbar-button">Inventario</button>
          <button className="topbar-button">
            Rodrigo K. <span className="user-icon">👤</span>
          </button>
        </div>
      </header>

      <main className="main-content">
        {/* Filtros */}
        <div className="filtros">
          <div className="filtro-nombre">
            <label htmlFor="filtro-nombre">Filtrar por nombre</label>
            <input
              type="text"
              id="filtro-nombre"
              placeholder="Escribe nombre"
              className="input input-filtro"
            />
          </div>

          <div className="botones-filtros">
            <button className="boton-filtro">Seleccionar Categoría ▼</button>
            <button className="boton-filtro" onClick={() => setMostrarModal(true)}>
              Ajustar inventario
            </button>
            <button className="boton-filtro" onClick={() => setMostrarNuevoModal(true)}>
              Agregar nuevo inventario
            </button>
          </div>
        </div>

        {/* Tabla */}
        <table className="tabla-productos">
          <thead>
            <tr>
              <th>Nombre del producto</th>
              <th>Categoría</th>
              <th>Cantidad de producto</th>
              <th>Número de serie</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto, index) => (
              <tr key={index}>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>{producto.cantidad}</td>
                <td>{producto.serie}</td>
                <td>
                  <button className="boton-eliminar" onClick={() => eliminarProducto(index)}>❌</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal Ajustar Inventario */}
        {mostrarModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Ajustar inventario</h2>
              <select className="input modal-input">
                <option>Seleccionar producto</option>
              </select>
              <input
                type="number"
                placeholder="Cantidad"
                className="input modal-input"
                min="0"
              />
              <select className="input modal-input">
                <option>Seleccionar categoría</option>
              </select>
              <button className="boton confirm" onClick={() => setMostrarModal(false)}>
                Confirm
              </button>
            </div>
          </div>
        )}

        {/* Modal Nuevo Inventario */}
        {mostrarNuevoModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Nuevo inventario</h2>
              <input
                type="text"
                placeholder="Nombre del producto"
                className="input modal-input"
              />
              <select className="input modal-input">
                <option>Seleccionar categoría</option>
              </select>
              <input
                type="number"
                placeholder="Cantidad de producto"
                className="input modal-input"
                min="0"
              />
              <button className="boton confirm" onClick={() => setMostrarNuevoModal(false)}>
                Confirmar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AlmacenadorView
