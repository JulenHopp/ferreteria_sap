import React from "react";
import {
  FlexBox,
  FlexBoxAlignItems,
  FlexBoxDirection,
  FlexBoxJustifyContent,
  Input,
  Button,
  Title,
  Link,
  Label,
  CheckBox,
} from "@ui5/webcomponents-react";

export default function Login() {
  return (
    <FlexBox
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
        transform: "scale(1.08) translateX(-3%)",
      }}
    >
      {/* Panel izquierdo negro */}
      <FlexBox
        style={{
          backgroundColor: "black",
          width: "35%",
          height: "100vh",
          padding: "1.5rem",
          boxSizing: "border-box",
          color: "white",
        }}
        direction={FlexBoxDirection.Column}
        alignItems={FlexBoxAlignItems.Start}
        justifyContent={FlexBoxJustifyContent.Center}
      >
        <FlexBox alignItems={FlexBoxAlignItems.Center} style={{ marginBottom: "1rem" }}>
          <div
            style={{
              backgroundColor: "white",
              width: "32px",
              height: "32px",
              borderRadius: "8px",
              marginRight: "10px",
            }}
          />
          <Title level="H5" style={{ color: "white" }}>
            Ferretería de Jülen
          </Title>
        </FlexBox>

        <p style={{ fontSize: "13px", maxWidth: "90%", lineHeight: "1.4" }}>
          Descubre nuestra plataforma de gestión de ferretería moderna. Agiliza tu inventario,
          pedidos y procesos de compra con una experiencia intuitiva y eficiente.
        </p>
      </FlexBox>

      {/* Panel derecho centrado */}
      <FlexBox
        style={{
          width: "65%",
          height: "100vh",
          backgroundColor: "#f3f4f6",
        }}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
      >
        {/* Contenedor cuadrado de login */}
        <FlexBox
          direction={FlexBoxDirection.Column}
          style={{
            backgroundColor: "white",
            borderRadius: "12px",
            padding: "2rem",
            width: "500px",
            height: "500px",
            boxShadow: "0 8px 20px rgba(0, 56, 186, 0.1)",
            boxSizing: "border-box",
            justifyContent: "center",
            gap: "1rem",
          }}
          alignItems={FlexBoxAlignItems.Stretch}
        >
          <div style={{ textAlign: "center" }}>
            <Title level="H2" style={{ marginBottom: "0.2rem", fontSize: "1.8rem" }}>
              Log in
            </Title>
            <p style={{ fontSize: "13px", color: "#666" }}>
              Welcome user, please log in to continue
            </p>
          </div>

          <div>
            <Label style={{ marginBottom: "0.2rem", display: "block" }}>Username *</Label>
            <Input placeholder="Enter your username" type="Text" />
          </div>

          <div>
            <Label style={{ marginBottom: "0.2rem", display: "block" }}>Password *</Label>
            <Input type="Password" />
          </div>

          <CheckBox text="Remember Me" style={{ fontSize: "13px", marginTop: "0.3rem" }} />

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
      </FlexBox>
    </FlexBox>
  );
}
