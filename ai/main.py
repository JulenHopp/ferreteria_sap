import os
import sys
from pathlib import Path

# Add the project root to the Python path
project_root = Path(__file__).parent.parent
sys.path.append(str(project_root))

from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import joblib
import pandas as pd
import numpy as np

# Inicializar FastAPI app
app = FastAPI()

# Cargar el modelo entrenado
modelo_path = Path(__file__).parent / "models" / "modelo_pedidos_xgboost.pkl"
modelo = joblib.load(modelo_path)

# Esquema del producto que recibimos
class ProductoInput(BaseModel):
    stock_actual: int
    ventas_mensuales: int
    veces_ordenado: int
    promedio_ordenado: float
    cantidad_sugerida: int
    precio_unitario: float
    proveedor_id: int
    producto_id: int
    nombre_producto: str
    nombre_proveedor: str
    categoria: str
    ubicacion: str
    descripcion: str

@app.post("/predict")
def predict_batch(productos: List[ProductoInput]):
    # Convertimos a DataFrame
    df = pd.DataFrame([p.dict() for p in productos])
    print("Paso aqui")

    # Renombrar columnas a mayúsculas
    df.columns = [col.upper() for col in df.columns]

    # DEBUG: Imprimir columnas que espera el modelo
    columnas_modelo = modelo.get_booster().feature_names
    print("=== Columnas que espera el modelo ===")
    print(columnas_modelo)

    # DEBUG: Imprimir columnas que estamos mandando
    print("=== Columnas recibidas en el DataFrame ===")
    print(df.columns.tolist())

    # Filas para el modelo
    try:
        df_model = df[columnas_modelo]
    except KeyError as e:
        print("ERROR: Las columnas no coinciden:", e)
        return {
            "error": "Las columnas del input no coinciden con las que espera el modelo.",
            "detalle": str(e)
        }

    # Predicción
    pred = modelo.predict(df_model)
    pred = np.atleast_1d(pred)

    # Construir respuesta
    predicciones = []
    for i, row in df.iterrows():
        cantidad_sugerida = int(np.ceil(row["PROMEDIO_ORDENADO"]))
        costo_total = cantidad_sugerida * row["PRECIO_UNITARIO"]

        predicciones.append({
            "producto_id": row["PRODUCTO_ID"],
            "nombre_producto": row["NOMBRE_PRODUCTO"],
            "prediction": int(pred[i]),
            "cantidad_sugerida": cantidad_sugerida,
            "costo_total": costo_total,
            "proveedor_id": row["PROVEEDOR_ID"],
            "nombre_proveedor": row["NOMBRE_PROVEEDOR"],
            "categoria": row["CATEGORIA"],
            "ubicacion": row["UBICACION"],
            "descripcion": row["DESCRIPCION"]
        })

    # En vez de {"predicciones": predicciones}, regresamos directamente el array
    return predicciones

# Main de arranque opcional (para debug manual)
# No se ejecuta cuando usas Uvicorn
def main():
    print("AI Application Started")

if __name__ == "__main__":
    main()
