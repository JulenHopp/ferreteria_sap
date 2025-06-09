import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from joblib import dump
import os
from pathlib import Path

from models.model import build_model

# Obtener el directorio actual del script
current_dir = Path(__file__).parent

# Cargar datos
df = pd.read_csv(current_dir / "data" / "data.csv")

# Eliminar columnas que no aportan al modelo
df = df.drop(columns=["PRODUCTO", "PRODUCTO_ID", "PROVEEDOR_SUGERIDO"])

# Definir variables predictoras (X) y objetivo (y)
X = df.drop(columns=["HACER_PEDIDO"])
y = df["HACER_PEDIDO"]

# Dividir en conjunto de entrenamiento y prueba
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Construir modelo
model = build_model()

# Entrenar
model.fit(X_train, y_train)

# Evaluar
y_pred = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Guardar modelo entrenado
dump(model, current_dir / "models" / "modelo_pedidos_xgboost.pkl")
