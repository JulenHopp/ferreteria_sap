import { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Select,
  Option,
  Button,
  Dialog,
  Title,
  ComboBox,
  ComboBoxItem
} from "@ui5/webcomponents-react";

export default function Inventario() {
  const [filtro, setFiltro] = useState("");
  const [categoria, setCategoria] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ nombre: string; categoria: string; cantidad: number; serie: string } | null>(null);
  const [data, setData] = useState([
    { nombre: "Martillo", categoria: "Herramienta manual", cantidad: 25, serie: "001" },
    { nombre: "Clavos", categoria: "Materiales de sujeción", cantidad: 100, serie: "002" },
    { nombre: "Llave inglesa", categoria: "Herramienta manual", cantidad: 20, serie: "003" },
    { nombre: "Destornillador", categoria: "Herramienta manual", cantidad: 32, serie: "004" },
    { nombre: "Sierra manual", categoria: "Herramienta manual", cantidad: 40, serie: "005" },
    { nombre: "Taladro electrico", categoria: "Herramientas eléctricas", cantidad: 15, serie: "006" },
    { nombre: "Cinta metrica", categoria: "Medición e iluminación", cantidad: 200, serie: "007" },
    { nombre: "Tenazas", categoria: "Herramienta manual", cantidad: 20, serie: "008" },
    { nombre: "Linterna", categoria: "Medición e iluminación", cantidad: 5, serie: "009" }
  ]);

  const columns = [
    {
      Header: "Nombre del producto",
      accessor: "nombre"
    },
    {
      Header: "Categoría",
      accessor: "categoria"
    },
    {
      Header: "Cantidad de producto",
      accessor: "cantidad"
    },
    {
      Header: "Número de serie",
      accessor: "serie"
    }
  ];

  const dataFiltrada = data.filter(
    (item) =>
      item.nombre.toLowerCase().includes(filtro.trim().toLowerCase()) &&
      (categoria ? item.categoria === categoria : true)
  );

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  interface InventoryItem {
    nombre: string;
    categoria: string;
    cantidad: number;
    serie: string;
  }

  const handleItemSelect = (nombre: string): void => {
    const item: InventoryItem | undefined = data.find((item) => item.nombre === nombre);
    setSelectedItem(item || null);
  };

  const handleSaveChanges = () => {
    if (selectedItem) {
      setData((prevData) =>
        prevData.map((item) =>
          item.nombre === selectedItem.nombre ? selectedItem : item
        )
      );
      closeDialog();
    }
  };

  return (
    <div style={{ width: "100%" }}>
      {/* Filtros */}
      <div style={{
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        marginBottom: "1.5rem"
      }}>
        <Input
          placeholder="Escribe nombre"
          value={filtro}
          onInput={(e) => setFiltro((e.target as unknown as HTMLInputElement).value)}
          style={{ width: "250px" }}
        />
        <Select
          onChange={(e) => setCategoria(e.detail.selectedOption.value || "")}
          style={{ width: "200px" }}
        >
          <Option value="">Seleccionar Categoría</Option>
          <Option value="Herramienta manual">Herramienta manual</Option>
          <Option value="Materiales de sujeción">Materiales de sujeción</Option>
          <Option value="Herramientas eléctricas">Herramientas eléctricas</Option>
          <Option value="Medición e iluminación">Medición e iluminación</Option>
        </Select>
        <Button onClick={openDialog}>Editar Inventario</Button>
      </div>

      {/* Tabla */}
      <AnalyticalTable
        columns={columns}
        data={dataFiltrada.length > 0 ? dataFiltrada : data} // Asegura que siempre haya datos para mostrar
        visibleRows={12}
        scaleWidthMode="Smart"
        noDataText="No hay datos disponibles"
        style={{
          width: "100%",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}
      />

      {/* Dialogo */}
      <Dialog
        open={isDialogOpen}
        header={
          <div style={{ display: "flex", alignItems: "center", padding: "0 1rem", position: "relative", height: "3rem" }}>
            <Title style={{ flex: 1, textAlign: "center", margin: "0" }}>Editar Inventario</Title>
            <Button
              icon="decline"
              design="Transparent"
              onClick={closeDialog}
              style={{
                position: "absolute",
                top: "50%",
                left: "12rem",
                transform: "translateY(-50%)",
                cursor: "pointer",
                outline: "none" // Elimina el marco azul al abrir
              }}
              tabIndex={-1} // Evita que el botón sea seleccionado automáticamente
            />
          </div>
        }
        onClose={closeDialog}
        style={{
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)"
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog(); // Cierra el pop-up solo si se hace clic fuera de él
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()} // Evita que el clic dentro del contenido cierre el pop-up
          style={{
            padding: "1rem",
            textAlign: "center",
            backgroundColor: "white", // Asegura que el contenido del pop-up no sea transparente
            borderRadius: "8px"
          }}
        >
          {/* ComboBox con búsqueda integrada */}
          <ComboBox
            placeholder="Buscar artículo"
            onChange={(e: CustomEvent<{ selectedItem: Element | null }>) => {
              const selectedName = e.detail.selectedItem?.getAttribute("text") || "";
              if (selectedName) {
                handleItemSelect(selectedName); // Actualiza el estado con el artículo seleccionado
              }
            }}
            style={{ width: "100%", marginBottom: "0.5rem" }}
          >
            {data.map((item, index) => (
              <ComboBoxItem key={index} text={item.nombre} />
            ))}
          </ComboBox>

          {/* Text boxes */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <Input
              placeholder="Nombre"
              value={selectedItem?.nombre || ""}
              onInput={(e) =>
                setSelectedItem((prev) =>
                  prev ? { ...prev, nombre: e.target.value } : null
                )
              }
              style={{ width: "100%", fontSize: "0.8rem" }}
            />
            <Input
              placeholder="Categoría"
              value={selectedItem?.categoria || ""}
              onInput={(e) =>
                setSelectedItem((prev) =>
                  prev ? { ...prev, categoria: (e.target as unknown as HTMLInputElement).value } : null
                )
              }
              style={{ width: "100%", fontSize: "0.8rem" }}
            />
            <Input
              placeholder="Cantidad"
              value={selectedItem ? String(selectedItem.cantidad) : ""}
              onInput={(e) =>
                setSelectedItem((prev) =>
                  prev ? { ...prev, cantidad: parseInt((e.target as unknown as HTMLInputElement).value) || 0 } : null
                )
              }
              style={{ width: "100%", fontSize: "0.8rem" }}
            />
          </div>

          {/* Botón Ajustar Cambios */}
          <Button
            onClick={() => {
              if (selectedItem) {
                setData((prevData) =>
                  prevData.map((item) =>
                    item.nombre === selectedItem.nombre ? selectedItem : item
                  )
                );
              }
            }}
            design="Emphasized"
            style={{
              marginTop: "1rem",
              width: "100%",
              fontSize: "0.9rem",
              padding: "0.5rem"
            }}
          >
            Ajustar Cambios
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
