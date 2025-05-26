import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    token: string | null;
    rol_id: number | null;
    login: (token: string, rol_id: number) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [token, setToken] = useState<string | null>(null);
    const [rol_id, setRolId] = useState<number | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for existing token on mount
        const storedToken = localStorage.getItem('token');
        const storedRolId = localStorage.getItem('rol_id');
        
        if (storedToken && storedRolId) {
            setToken(storedToken);
            setRolId(parseInt(storedRolId));
            setIsAuthenticated(true);
        }
    }, []);

    const login = (newToken: string, newRolId: number) => {
        localStorage.setItem('token', newToken);
        localStorage.setItem('rol_id', newRolId.toString());
        setToken(newToken);
        setRolId(newRolId);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('rol_id');
        setToken(null);
        setRolId(null);
        setIsAuthenticated(false);
        navigate('/ferreteria_sap/login');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, token, rol_id, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
} 