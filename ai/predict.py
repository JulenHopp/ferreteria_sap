import pandas as pd
from joblib import load
import numpy as np
import sys
import json
from pathlib import Path

# Obtener el path absoluto al modelo
current_dir = Path(__file__).parent
modelo_path = current_dir / "models" / "modelo_pedidos_xgboost.pkl"

# Cargar modelo entrenado
modelo = load(modelo_path)

def predecir_pedido(nueva_fila: dict):
    """
    Realiza la predicción de si se debe hacer un pedido para un producto.

    Args:
        nueva_fila (dict): Diccionario con los datos del producto a evaluar.

    Returns:
        dict: Diccionario con la predicción y datos adicionales
    """

    # Obtener columnas del modelo
    columnas_modelo = modelo.get_booster().feature_names

    # Filtrar nueva_fila para incluir solo las columnas esperadas por el modelo
    # Esto evita errores si el backend envía columnas adicionales (como PRECIO_UNITARIO, PROVEEDOR_ID)
    model_input_features = {col: nueva_fila[col] for col in columnas_modelo if col in nueva_fila}

    # Validar que todas las columnas *requeridas* por el modelo estén presentes
    # Aunque ya filtramos, esto captura si el backend NO envía una feature esencial
    if len(model_input_features) != len(columnas_modelo):
        missing_cols = [col for col in columnas_modelo if col not in model_input_features]
        raise ValueError(f"Faltan columnas requeridas para la predicción del modelo: {missing_cols}")

    df_input = pd.DataFrame([model_input_features])

    # Predecir
    pred = modelo.predict(df_input)
    pred = np.atleast_1d(pred)

    # Calcular cantidad sugerida (usando PROMEDIO_ORDENADO que debe venir en nueva_fila)
    # Se añade un default de 0 si PROMEDIO_ORDENADO no existe, para evitar KeyErrors
    promedio_ordenado_val = nueva_fila.get('PROMEDIO_ORDENADO', 0)
    cantidad_sugerida = int(np.ceil(promedio_ordenado_val))

    # Obtener proveedor_id (usar el actual si es válido, sino usar el más frecuente)
    proveedor_id = nueva_fila.get('PROVEEDOR_ID', 1) # Usamos 1 como default si no viene

    # Obtener precio_unitario (forzar a float y manejar errores, default 0.0)
    try:
        precio_unitario = float(nueva_fila.get('PRECIO_UNITARIO', 0))
    except (ValueError, TypeError):
        precio_unitario = 0.0

    # Calcular costo_total
    costo_total = precio_unitario * cantidad_sugerida

    # Devolver resultado completo
    return {
        "prediction": int(pred[0]),
        "cantidad_sugerida": cantidad_sugerida,
        "proveedor_id": proveedor_id,
        "precio_unitario": precio_unitario,
        "costo_total": costo_total,
        "message": "Se recomienda hacer pedido" if int(pred[0]) == 1 else "No se recomienda hacer pedido"
    }


# Ejecutar desde línea de comandos
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Error: Se requiere un argumento JSON")
        sys.exit(1)
    
    try:
        # Obtener JSON de los argumentos
        input_json = sys.argv[1]
        data = json.loads(input_json)
        
        # Convertir keys a mayúsculas
        data_upper = {k.upper(): v for k, v in data.items()}
        
        # Realizar predicción
        resultado = predecir_pedido(data_upper)
        
        # Imprimir resultado como JSON
        print(json.dumps(resultado))
        
    except json.JSONDecodeError:
        print("Error: El argumento no es un JSON válido")
        sys.exit(1)
    except Exception as e:
        # MUY importante: print normal sin prefijo, para que predict.js lo capture bien
        print(f"Error: {str(e)}")
        sys.exit(1)
