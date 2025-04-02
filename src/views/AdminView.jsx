import { useState } from 'react';
import '../App.css';
import logo from '../assets/logo-ferreteria.png';

function AdminView() {
  const [seccion, setSeccion] = useState('inventario');

  return (
    <div className="page-container">
      <header className="topbar">
        <div className="left-section">
          <img src={logo} alt="Logo" className="topbar-logo" />
          <span className="topbar-title">Admin</span>
        </div>
        <div className="right-section">
          <button className="topbar-button" onClick={() => setSeccion('inventario')}>Inventario</button>
          <button className="topbar-button" onClick={() => setSeccion('pedidos')}>Pedidos</button>
          <button className="topbar-button" onClick={() => setSeccion('usuarios')}>Usuarios</button>
          <button className="topbar-button">Ricardo Chapa <span className="user-icon">👤</span></button>
        </div>
      </header>

      <main className="main-content">
        {seccion === 'inventario' && (
          <div>
            <h3 className="titulo-seccion">Inventario</h3>
            <div className="tablas-admin">
              <table className="tabla-productos">
                <thead>
                  <tr>
                    <th>Cantidad de producto</th>
                    <th>Numero de serie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>25</td><td>001</td></tr>
                  <tr><td>100</td><td>002</td></tr>
                  <tr><td>20</td><td>003</td></tr>
                  <tr><td>32</td><td>004</td></tr>
                  <tr><td>40</td><td>005</td></tr>
                  <tr><td>15</td><td>006</td></tr>
                  <tr><td>200</td><td>007</td></tr>
                  <tr><td>20</td><td>008</td></tr>
                  <tr><td>5</td><td>009</td></tr>
                </tbody>
              </table>
              <img src="/grafica.png" alt="Gráfica" className="grafica-admin" />
            </div>
          </div>
        )}

        {seccion === 'pedidos' && (
          <div>
            <h3 className="titulo-seccion">Pedidos</h3>
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>Numero de pedido</th>
                  <th>Proveedor</th>
                  <th>Nombre producto</th>
                  <th>Estatus pedido</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Trupper</td><td>Martillo</td><td>Stock</td></tr>
                <tr><td>2</td><td>Trupper</td><td>Clavos</td><td>Stock</td></tr>
                <tr><td>4</td><td>Trupper</td><td>Destornillador</td><td>Stock</td></tr>
                <tr><td>5</td><td>Trupper</td><td>Sierra manual</td><td>Stock</td></tr>
                <tr><td>7</td><td>Trupper</td><td>Cinta métrica</td><td>Stock</td></tr>
                <tr><td>8</td><td>Trupper</td><td>Tenazas</td><td>Stock</td></tr>
                <tr><td>9</td><td>Trupper</td><td>Linterna</td><td>Stock</td></tr>
              </tbody>
            </table>
          </div>
        )}

        {seccion === 'usuarios' && (
          <div>
            <h3 className="titulo-seccion">Usuarios</h3>
            <table className="tabla-productos">
              <thead>
                <tr>
                  <th>Numero de pedido</th>
                  <th>Nombre usuario</th>
                  <th>Correo</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>001</td><td>Rodrigo Kalionchiz</td><td>rodrigok@fjulen.com.mx</td><td>Dueño</td></tr>
                <tr><td>002</td><td>Eugenio Garza</td><td>eugeniog@fjulen.com.mx</td><td>Almacenador</td></tr>
                <tr><td>003</td><td>Julen Hernandez</td><td>julenh@fjulen.com.mx</td><td>Almacenador</td></tr>
                <tr><td>004</td><td>Adolfo Gonzalez</td><td>adolfo@fjulen.com.mx</td><td>Almacenador</td></tr>
                <tr><td>005</td><td>Marcelo Cardenas</td><td>marceloc@fjulen.com.mx</td><td>Comprador</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default AdminView;
