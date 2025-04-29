import {
    FlexBox,
    Input,
    Button,
    Title,
    Link,
    Label,
    CheckBox,
    Text
} from "@ui5/webcomponents-react";

export default function LoginForm() {
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
            <Text >
                Bienvenido a la plataforma de gestión de inventario
            </Text>
        </div>

        <div>
            <Label style={{ marginBottom: "0.2rem", display: "block" }}>Usuario *</Label>
            <Input type="Text" style={{width: "70%"}}/>
        </div>

        <div>
            <Label style={{ marginBottom: "0.2rem", display: "block" }}>Contraseña *</Label>
            <Input  type="Password" style={{width: "70%"}}/>
        </div>

        <CheckBox text="Recuérdame" style={{ fontSize: "13px", marginTop: "0.3rem" }} />

        <Button
        design="Emphasized"
        style={{
            height: "40px",
            fontWeight: "bold",
            fontSize: "14px",
            borderRadius: "8px",
            marginTop: "0.8rem",
        }}
        >
        Continuar
        </Button>

        <Link style={{ fontSize: "12px", textAlign: "center", marginTop: "0.3rem" }}>
        ¿Olvidaste tu contraseña?
        </Link>
    </FlexBox>
  );
}
