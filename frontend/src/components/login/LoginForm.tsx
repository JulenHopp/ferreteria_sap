import {
    FlexBox,
    Input,
    Button,
    Title,
    Link,
    Label,
    CheckBox,
    Text,
    MessageBox
} from "@ui5/webcomponents-react";
import { useState } from "react";
import { AuthService } from "../../services/api/auth.service";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function LoginForm() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            console.log('Starting login process...');
            setLoading(true);
            setError(null);
            
            console.log('Sending login request with:', { correo, contrasena });
            const response = await AuthService.login({ correo, contrasena });
            console.log('Login response:', response);
            
            // Check if response has the expected structure
            if (!response || !response.token || !response.rol_id) {
                console.error('Invalid response structure:', response);
                throw new Error('Respuesta del servidor inválida');
            }
            
            // Use the login function from AuthContext
            login(response.token, response.rol_id);
            console.log('Auth context updated with token and rol_id');
            
            // If remember me is checked, store the email
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', correo);
            } else {
                localStorage.removeItem('rememberedEmail');
            }

            console.log('Redirecting to dashboard...');
            // Redirect to dashboard with correct basename
            navigate('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Error al iniciar sesión. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <FlexBox
            direction={"Column"}
            style={{
                backgroundColor: "white",
                borderRadius: "12px",
                padding: "3.5rem",
                minWidth: "475px",
                height: "525px",
                boxShadow: "0 8px 20px rgba(0, 56, 186, 0.1)",
                boxSizing: "border-box",
                justifyContent: "center",
                gap: "1rem",
            }}
            alignItems={"Stretch"}
        >
            <div style={{ marginBottom: "1.5rem", textAlign: "center" }}>
                <Title level="H2" style={{ marginBottom: "0.5rem", fontSize: "1.8rem" }}>
                    Iniciar Sesión
                </Title>
                <Text>
                    Bienvenido a la plataforma de gestión de inventario
                </Text>
            </div>

            {error && (
                <MessageBox
                    type="Error"
                    style={{ marginBottom: "1rem" }}
                >
                    {error}
                </MessageBox>
            )}

            <div>
                <Label style={{ marginBottom: "0.2rem", display: "block" }}>Usuario *</Label>
                <Input 
                    type="Text" 
                    style={{width: "80%"}}
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                />
            </div>

            <div>
                <Label style={{ marginBottom: "0.2rem", display: "block" }}>Contraseña *</Label>
                <Input  
                    type="Password" 
                    style={{width: "80%"}}
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                />
            </div>

            <CheckBox 
                text="Recuérdame" 
                style={{ fontSize: "13px", marginTop: "0.3rem" }}
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
            />

            <Button
                design="Emphasized"
                style={{
                    height: "40px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    borderRadius: "8px",
                    marginTop: "0.8rem",
                }}
                onClick={handleLogin}
                disabled={loading || !correo || !contrasena}
            >
                {loading ? "Cargando..." : "Continuar"}
            </Button>

            <Link style={{ fontSize: "12px", textAlign: "center", marginTop: "0.3rem" }}>
                ¿Olvidaste tu contraseña?
            </Link>
        </FlexBox>
    );
}
