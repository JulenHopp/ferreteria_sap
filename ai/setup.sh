#!/bin/bash

echo "🚀 Iniciando configuración del entorno AI para Ferretería SAP..."

# Verifica que Python esté instalado
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 no está instalado. Por favor instálalo antes de continuar."
    exit 1
fi

# Crea entorno virtual si no existe
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual..."
    python3 -m venv venv
else
    echo "✅ Entorno virtual ya existe."
fi

# Activar entorno virtual
source venv/bin/activate

# Actualizar pip
echo "⬆️  Actualizando pip..."
pip install --upgrade pip

# Instalar dependencias
if [ -f "requirements.txt" ]; then
    echo "📚 Instalando dependencias desde requirements.txt..."
    pip install -r requirements.txt
else
    echo "❌ No se encontró requirements.txt"
    exit 1
fi

echo "✅ Entorno configurado correctamente. Usa 'source venv/bin/activate' para activarlo."
