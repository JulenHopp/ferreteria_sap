import { Button } from '@ui5/webcomponents-react';
import { useNavigate } from 'react-router-dom';

function TemporalNav() {
    const navigate = useNavigate();
    
    return (
    <>
        <Button onClick={() => navigate('/login')}>Login</Button>
        <Button onClick={() => navigate('/dashboard')}>Nav</Button>
    </>
  );
}

export default TemporalNav;
