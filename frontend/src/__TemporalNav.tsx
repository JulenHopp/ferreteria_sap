import { Button } from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';

function TemporalNav() {
    const navigate = useNavigate();
    
    return (
    <>
        <Button onClick={() => navigate('/inventario')}>Inventario</Button>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/pedidos')}>Pedidos</Button>
        <Button onClick={() => navigate('/usuarios')}>Usuarios</Button>
    </>
  );
}

export default TemporalNav;
