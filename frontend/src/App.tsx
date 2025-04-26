import './App.css'
import { Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Inventario from './components/tables/InventoryTable';
import Pedidos from './components/tables/OrdersTable';
import Usuarios from './pages/usuarios';

import TemporalNav from './__TemporalNav';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TemporalNav />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/inventario"
          element={ <Inventario /> }
        />
        <Route
          path="/pedidos"
          element={ <Pedidos/>}
        />
        <Route
          path="/usuarios"
          element={ <Usuarios/>}
        />
      </Routes>
    </>
  )
}

export default App
