import React, { useState } from "react";
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
  CheckBox
} from '@ui5/webcomponents-react';

export default function Login() {
  return (
    <FlexBox
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        margin: '0',
        padding: '0',
        boxSizing: 'border-box'
      }}
    >
      {/* Panel izquierdo negro */}
      <FlexBox
        style={{
          backgroundColor: 'black',
          width: '35%',
          height: '100vh',
          padding: '2rem',
          boxSizing: 'border-box',
          color: 'white'
        }}
        direction={FlexBoxDirection.Column}
        alignItems={FlexBoxAlignItems.Start}
        justifyContent={FlexBoxJustifyContent.Center}
      >
        <FlexBox
          alignItems={FlexBoxAlignItems.Center}
          style={{ marginBottom: '1.5rem' }}
        >
          <div
            style={{
              backgroundColor: 'white',
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              marginRight: '10px'
            }}
          />
          <Title level="H5" style={{ color: 'white' }}>
            Ferretería de Jülen
          </Title>
        </FlexBox>

        <p style={{ fontSize: '14px', maxWidth: '90%', lineHeight: '1.5' }}>
          Descubre nuestra plataforma de gestión de ferretería moderna. Agiliza tu inventario, pedidos y procesos de compra con una experiencia intuitiva y eficiente.
        </p>
      </FlexBox>

      {/* Panel derecho estilo login limpio */}
      <FlexBox
        style={{
          width: '65%',
          height: '100vh',
          backgroundColor: '#f3f4f6'
        }}
        justifyContent={FlexBoxJustifyContent.Center}
        alignItems={FlexBoxAlignItems.Center}
      >
        <FlexBox
          direction={FlexBoxDirection.Column}
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '2.5rem 2.5rem',
            width: '360px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
            gap: '1.2rem',
            boxSizing: 'border-box'
          }}
          alignItems={FlexBoxAlignItems.Stretch}
        >
          <div style={{ textAlign: 'center' }}>
            <Title level="H1" style={{ marginBottom: '0.4rem', fontSize: '2rem' }}>
              Log in
            </Title>
            <p style={{ fontSize: '14px', color: '#666' }}>
              Welcome user, please log in to continue
            </p>
          </div>

          <div>
            <Label style={{ marginBottom: '0.3rem', display: 'block' }}>
              Username *
            </Label>
            <Input placeholder="Enter your username" type="Text" />
          </div>

          <div>
            <Label style={{ marginBottom: '0.3rem', display: 'block' }}>
              Password *
            </Label>
            <Input type="Password" />
          </div>

          <CheckBox text="Remember Me" style={{ fontSize: '14px', marginTop: '0.2rem' }} />

          <Button
            design="Emphasized"
            style={{
              height: '44px',
              fontWeight: 'bold',
              fontSize: '15px',
              borderRadius: '8px',
              marginTop: '1rem'
            }}
          >
            Continuar
          </Button>

          <Link style={{ fontSize: '13px', marginTop: '0.5rem', textAlign: 'center' }}>
            ¿Olvidaste tu contraseña?
          </Link>
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
}
