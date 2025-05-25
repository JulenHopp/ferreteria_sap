import {
  Dialog,
  Title,
  Button,
  Input,
  ComboBox,
  ComboBoxItem,
  Form,
  FormItem,
  Label,
  Bar,
  MessageBox
} from "@ui5/webcomponents-react";
import { useState } from "react";

interface InventoryItem {
  nombre: string;
  categoria: string;
  cantidad: number;
  serie: string;
}

interface EditInventoryProps {
  isOpen: boolean;
  onClose: () => void;
  data: InventoryItem[];
  onSave: (updatedItem: InventoryItem) => void;
}

export default function EditInventory({ isOpen, onClose, data, onSave }: EditInventoryProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleItemSelect = (nombre: string): void => {
    const item: InventoryItem | undefined = data.find((item) => item.nombre === nombre);
    setSelectedItem(item || null);
  };

  const handleSaveChanges = () => {
    if (selectedItem) {
      onSave(selectedItem);
      onClose();
    }
  };

  return (
    <Dialog
      open={isOpen}
      header={
        <Bar>
          <Title>Editar Inventario</Title>
          <Button icon="decline" design="Transparent" onClick={onClose} />
        </Bar>
      }
      onClose={onClose}
    >
      <Form style={{ padding: "1rem" }}>
        <FormItem>
          <Label>Producto</Label>
          <ComboBox
            placeholder="Buscar artículo"
            onChange={(e) => {
              const selectedItem = e.target as HTMLElement;
              const selectedName = selectedItem.textContent || "";
              if (selectedName) {
                handleItemSelect(selectedName);
              }
            }}
          >
            {data.map((item, index) => (
              <ComboBoxItem key={index} text={item.nombre} />
            ))}
          </ComboBox>
        </FormItem>

        <FormItem>
          <Label>Nombre</Label>
          <Input
            value={selectedItem?.nombre || ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, nombre: (e.target as unknown as HTMLInputElement).value } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Label>Categoría</Label>
          <Input
            value={selectedItem?.categoria || ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, categoria: (e.target as unknown as HTMLInputElement).value } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Label>Cantidad</Label>
          <Input
            type="Number"
            value={selectedItem ? String(selectedItem.cantidad) : ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, cantidad: parseInt((e.target as unknown as HTMLInputElement).value) || 0 } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Button
            onClick={handleSaveChanges}
            design="Emphasized"
            disabled={!selectedItem}
          >
            Guardar Cambios
          </Button>
        </FormItem>
      </Form>
    </Dialog>
  );
}
