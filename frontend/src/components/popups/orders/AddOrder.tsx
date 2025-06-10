import {
  Button,
  Input,
  ComboBox,
  ComboBoxItem,
  Form,
  FormItem,
  Label,
  BusyIndicator,
  Text
} from "@ui5/webcomponents-react";
import { useState, useEffect } from "react";
import { CreateOrderRequest } from "../../../services/api/order.service";
import { Supplier, SupplierService } from "../../../services/api/supplier.service";
import { Product, ProductService } from "../../../services/api/product.service";
import TemplatePopup from "../TemplatePopup";

interface AddOrderProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (orderData: CreateOrderRequest) => Promise<void>;
}

interface NameToIdMap {
  [key: string]: number;
}

interface ProductInfo {
  id: number;
  price: string;
}

export default function AddOrder({ isOpen, onClose, onSave }: AddOrderProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [supplierNames, setSupplierNames] = useState<string[]>([]);
  const [productNames, setProductNames] = useState<string[]>([]);
  const [supplierIdMap, setSupplierIdMap] = useState<NameToIdMap>({});
  const [productInfoMap, setProductInfoMap] = useState<{ [key: string]: ProductInfo }>({});
  const [orderData, setOrderData] = useState<CreateOrderRequest>({
    usuario_id: 1,
    estado_id: 1,
    proveedor_id: 1,
    producto_id: 1,
    cantidad: 1,
    precio_unitario: "0",
    costo_total: "0",
    sugerida_por_ia: false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [suppliersData, productsData] = await Promise.all([
          SupplierService.getAllSuppliers(),
          ProductService.getAllProducts()
        ]);

        // Create supplier name-to-id mapping
        const supplierMap: NameToIdMap = {};
        const supplierNamesList: string[] = [];
        suppliersData.forEach(supplier => {
          supplierMap[supplier.NOMBRE] = supplier.ID;
          supplierNamesList.push(supplier.NOMBRE);
        });
        setSupplierIdMap(supplierMap);
        setSupplierNames(supplierNamesList);

        // Create product name-to-info mapping
        const productMap: { [key: string]: ProductInfo } = {};
        const productNamesList: string[] = [];
        productsData.forEach(product => {
          productMap[product.NOMBRE] = {
            id: product.ID,
            price: product.PRECIO_UNITARIO
          };
          productNamesList.push(product.NOMBRE);
        });
        setProductInfoMap(productMap);
        setProductNames(productNamesList);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error al cargar los datos');
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen]);

  const updateOrderData = (updates: Partial<CreateOrderRequest>) => {
    setOrderData(prev => ({ ...prev, ...updates }));
  };

  const handleSupplierChange = (e: any) => {
    const selectedName = e.target.value;
    const supplierId = supplierIdMap[selectedName];
    if (supplierId) {
      updateOrderData({ proveedor_id: supplierId });
    }
  };

  const handleProductChange = (e: any) => {
    const selectedName = e.target.value;
    const productInfo = productInfoMap[selectedName];
    
    if (productInfo) {
      const cantidad = orderData.cantidad;
      const precio = Number(productInfo.price);
      const total = (cantidad * precio).toFixed(2);
      
      updateOrderData({
        producto_id: productInfo.id,
        precio_unitario: productInfo.price,
        costo_total: total
      });
    }
  };

  const handleQuantityChange = (e: any) => {
    const cantidad = Number((e.target as unknown as HTMLInputElement).value) || 0;
    const selectedProduct = productInfoMap[Object.keys(productInfoMap).find(name => 
      productInfoMap[name].id === orderData.producto_id
    ) || ''];
    
    if (selectedProduct) {
      const precio = Number(selectedProduct.price);
      const total = (cantidad * precio).toFixed(2);
      updateOrderData({
        cantidad,
        costo_total: total
      });
    } else {
      updateOrderData({ cantidad });
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);
      await onSave(orderData);
      onClose();
    } catch (err) {
      setError('Error al crear la orden');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <TemplatePopup
      isOpen={isOpen}
      onClose={onClose}
      title="Crear Nueva Orden"
      error={error}
      onErrorClose={() => setError(null)}
      footer={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button
            onClick={handleSave}
            design="Emphasized"
            disabled={isSaving}
          >
            {isSaving ? <BusyIndicator size="S" /> : "Crear Orden"}
          </Button>
        </>
      }
    >
      <Form>
        <FormItem>
          <Label>Proveedor</Label>
          <ComboBox
            onChange={handleSupplierChange}
            style={{ width: "100%" }}
          >
            {supplierNames.map((name) => (
              <ComboBoxItem 
                key={name} 
                text={name}
              />
            ))}
          </ComboBox>
        </FormItem>

        <FormItem>
          <Label>Producto</Label>
          <ComboBox
            onChange={handleProductChange}
            style={{ width: "100%" }}
          >
            {productNames.map((name) => (
              <ComboBoxItem 
                key={name} 
                text={name}
              />
            ))}
          </ComboBox>
        </FormItem>

        <FormItem>
          <Label>Cantidad</Label>
          <Input
            type="Number"
            value={String(orderData.cantidad)}
            onInput={handleQuantityChange}
          />
        </FormItem>

        <FormItem>
          <Label>Precio Unitario</Label>
          <Text>${orderData.precio_unitario}</Text>
        </FormItem>

        <FormItem>
          <Label>Costo Total</Label>
          <Text>${orderData.costo_total}</Text>
        </FormItem>
      </Form>
    </TemplatePopup>
  );
} 