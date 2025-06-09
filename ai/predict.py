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
                           Debe contener las mismas columnas usadas en entrenamiento, 
                           excepto 'hacer_pedido', 'producto', 'producto_id', 'proveedor_sugerido'.

    Returns:
        dict: Diccionario con la predicción y datos adicionales
    """

    # Convertir a DataFrame
    df_input = pd.DataFrame([nueva_fila])

    # Validar que estén todas las columnas necesarias
    columnas_modelo = modelo.get_booster().feature_names
    if sorted(df_input.columns.tolist()) != sorted(columnas_modelo):
        raise ValueError(f"Columnas esperadas: {columnas_modelo}\nColumnas recibidas: {df_input.columns.tolist()}")

    # Predecir
    pred = modelo.predict(df_input)
    pred = np.atleast_1d(pred)  # Corregir el error 'int' object is not subscriptable
    
    # Calcular cantidad sugerida basada en el promedio ordenado
    cantidad_sugerida = int(np.ceil(nueva_fila['PROMEDIO_ORDENADO']))
    
    # Obtener proveedor_id (usar el actual si es válido, sino usar el más frecuente)
    proveedor_id = nueva_fila.get('PROVEEDOR_ID', 1)  # Por ahora usamos 1 como default
    
    return {
        "prediction": int(pred[0]),
        "cantidad_sugerida": cantidad_sugerida,
        "proveedor_id": proveedor_id
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
        
        # Realizar predicción con datos en mayúsculas
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
