import './App.css'
import { useNavigate, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Inventario from './pages/inventario';
import Pedidos from './pages/Pedidos';
import Usuarios from './pages/usuarios';


import { Button } from '@ui5/webcomponents-react';

function App() {
  const navigate = useNavigate();
  return (
    <>
    <Button onClick={() => navigate('/inventario')}>Inventario</Button>
    <Button onClick={() => navigate('/login')}>Login</Button>
    <Button onClick={() => navigate('/pedidos')}>Pedidos</Button>
    <Button onClick={() => navigate('/usuarios')}>Usuarios</Button>

    
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/inventario"
          element={ <Inventario /> }
        />
        <Route
          path="/pedidos"
          element={ <Pedidos/>}
        />
      </Routes>
    </>
  )
}

export default App
