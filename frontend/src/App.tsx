import './App.css'
import { useNavigate, Routes, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import Inventario from './pages/Inventario';

import { Button } from '@ui5/webcomponents-react';

function App() {
  const navigate = useNavigate();
  return (
    <>
    <Button onClick={() => navigate('/inventario')}>Inventario</Button>
    <Button onClick={() => navigate('/login')}>Login</Button>
    
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/inventario"
          element={ <Inventario /> }
        />
      </Routes>
    </>
  )
}

export default App
