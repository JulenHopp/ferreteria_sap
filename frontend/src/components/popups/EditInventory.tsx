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
import { InventoryItem } from "../../services/api/inventory.service";

interface EditInventoryProps {
  isOpen: boolean;
  onClose: () => void;
  data: InventoryItem[];
  onSave: (updatedItem: InventoryItem) => void;
}

export default function EditInventory({ isOpen, onClose, data, onSave }: EditInventoryProps) {
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const handleItemSelect = (e: any) => {
    const selectedId = e.detail.item.dataset.id;
    const item = data.find((item) => item.ID === parseInt(selectedId));
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
      style={{ width: "30%" }} 
    >
      <Form style={{ padding: "0.5rem" }}>
        <FormItem>
          <Label>Producto</Label>
          <ComboBox
            placeholder="Buscar artículo"
            onChange={handleItemSelect}
          >
            {data.map((item) => (
              <ComboBoxItem key={item.ID} text={item.NOMBRE} data-id={item.ID} />
            ))}
          </ComboBox>
        </FormItem>

        <FormItem>
          <Label>Nombre</Label>
          <Input
            value={selectedItem?.NOMBRE || ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, NOMBRE: (e.target as unknown as HTMLInputElement).value } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Label>Categoría</Label>
          <Input
            value={selectedItem?.CATEGORIA || ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, CATEGORIA: (e.target as unknown as HTMLInputElement).value } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Label>Cantidad</Label>
          <Input
            type="Number"
            value={selectedItem ? String(selectedItem.CANTIDAD) : ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, CANTIDAD: parseInt((e.target as unknown as HTMLInputElement).value) || 0 } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Label>Descripción</Label>
          <Input
            value={selectedItem?.DESCRIPCION || ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, DESCRIPCION: (e.target as unknown as HTMLInputElement).value } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Label>Ubicación</Label>
          <Input
            value={selectedItem?.UBICACION || ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, UBICACION: (e.target as unknown as HTMLInputElement).value } : null
              )
            }
          />
        </FormItem>

        <FormItem>
          <Label>Precio Unitario</Label>
          <Input
            type="Number"
            value={selectedItem?.PRECIO_UNITARIO || ""}
            onInput={(e) =>
              setSelectedItem((prev) =>
                prev ? { ...prev, PRECIO_UNITARIO: (e.target as unknown as HTMLInputElement).value } : null
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
