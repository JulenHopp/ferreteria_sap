import pandas as pd
from pathlib import Path

# Ruta a la carpeta data
data_path = Path("ai/data")

# Lista de los archivos que quieres concatenar
csv_files = [
    data_path / "data1.csv",
    data_path / "data2.csv",
    data_path / "data3.csv",
    data_path / "data4.csv",
    data_path / "data5.csv",
    data_path / "data6.csv",
    data_path / "data7.csv",
    data_path / "data8.csv",
    data_path / "data9.csv",
    data_path / "data10.csv"
]

# Leer y concatenar todos
dfs = [pd.read_csv(f) for f in csv_files]
df_concat = pd.concat(dfs, ignore_index=True)

# Opcional: quitar duplicados si por accidente hay productos repetidos
# df_concat = df_concat.drop_duplicates()

# Guardar dataset final
df_concat.to_csv(data_path / "dataset_final.csv", index=False)

print(f"✅ Dataset final guardado con {len(df_concat)} filas.")
