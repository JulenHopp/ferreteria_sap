import {
  Dialog,
  Title,
  Button,
  Form,
  FormItem,
  Label,
  Input,
  Bar,
  BusyIndicator,
  MessageBox,
  ComboBox,
  ComboBoxItem
} from '@ui5/webcomponents-react';
import { useState, useEffect } from 'react';
import { UserService, CreateUserRequest, Role } from '../../services/api/user.service';

interface AddUserProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (newUser: CreateUserRequest) => Promise<void>;
}

const STYLES = {
  dialog: {
    width: '45%'
  },
  form: {
    padding: '0.5rem'
  }
} as const;

export default function AddUser({ isOpen, onClose, onAdd }: AddUserProps) {
  const [newUser, setNewUser] = useState<CreateUserRequest>({
    nombre: '',
    correo: '',
    contrasena: '',
    rol_id: undefined
  });
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setRolesLoading(true);
        const fetchedRoles = await UserService.getRoles();
        setRoles(fetchedRoles);
        setRolesError(null);
        if (fetchedRoles.length > 0 && newUser.rol_id === undefined) {
             setNewUser(prev => ({ ...prev, rol_id: fetchedRoles[0].ID }));
        }
      } catch (err) {
        setRolesError('Error al cargar los roles.');
        console.error('Error fetching roles:', err);
      } finally {
        setRolesLoading(false);
      }
    };

    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof CreateUserRequest, value: string | number) => {
    setNewUser(prev => ({ ...prev, [field]: value }));
  };

  const handleRoleChange = (e: any) => {
      const selectedItem = e.detail.item;
      if(selectedItem) {
        const selectedRoleId = parseInt(selectedItem.getAttribute('data-id'), 10); 
        setNewUser(prev => ({ ...prev, rol_id: selectedRoleId }));
      } else {
          setNewUser(prev => ({ ...prev, rol_id: undefined }));
      }
  };

  const handleAddUser = async () => {
    if (!newUser.nombre || !newUser.correo || !newUser.contrasena || newUser.rol_id === undefined) {
      setError('Por favor, complete todos los campos y seleccione un rol.');
      return;
    }
    
    try {
      setIsAdding(true);
      setError(null);
      await onAdd(newUser);
      setNewUser({
        nombre: '',
        correo: '',
        contrasena: '',
        rol_id: roles.length > 0 ? roles[0].ID : undefined
      });
    } catch (err) {
      setError('Error al agregar usuario.');
      console.error('Error adding user:', err);
    } finally {
      setIsAdding(false);
    }
  };

  const isAddButtonDisabled = !newUser.nombre || !newUser.correo || !newUser.contrasena || newUser.rol_id === undefined || isAdding;

  const selectedRoleName = roles.find(role => role.ID === newUser.rol_id)?.NOMBRE || '';

  return (
    <Dialog
      open={isOpen}
      header={
        <Bar>
          <Title>Agregar Nuevo Usuario</Title>
          <Button icon="decline" design="Transparent" onClick={onClose}/>
        </Bar>
      }
      onClose={onClose}
      style={STYLES.dialog}
      footer={
        <>
          <Button onClick={onClose}>Cancelar</Button>
          <Button onClick={handleAddUser} design="Emphasized" disabled={isAddButtonDisabled}>
            {isAdding ? <BusyIndicator size="S" /> : "Agregar"}
          </Button>
        </>
      }
    >
      <div style={STYLES.form}>
        {(error || rolesError) && (
          <MessageBox
            type="Error"
            actions={["OK"]}
            onClose={() => { setError(null); setRolesError(null); }}
            style={{ marginBottom: '1rem' }}
          >
            {error || rolesError}
          </MessageBox>
        )}
        {rolesLoading ? (
            <BusyIndicator active={rolesLoading} size="M" style={{ margin: "2rem auto", display: "block" }} />
        ) : (
            <Form layout="ColumnLayout">
              <FormItem >
                <Label>Nombre</Label>
                <Input
                  placeholder="Nombre completo"
                  value={newUser.nombre}
                  onInput={(e) => handleInputChange('nombre', (e.target as unknown as HTMLInputElement).value)}
                />
              </FormItem>
              <FormItem >
                 <Label>Correo</Label>
                <Input
                  type="Email"
                  placeholder="Correo electrónico"
                  value={newUser.correo}
                  onInput={(e) => handleInputChange('correo', (e.target as unknown as HTMLInputElement).value)}
                />
              </FormItem>
               <FormItem >
                 <Label>Contraseña</Label>
                <Input
                  type="Password"
                  placeholder="Contraseña"
                  value={newUser.contrasena}
                  onInput={(e) => handleInputChange('contrasena', (e.target as unknown as HTMLInputElement).value)}
                />
              </FormItem>
              <FormItem >
                 <Label>Rol</Label>
                 <ComboBox
                    placeholder="Seleccionar rol"
                    value={selectedRoleName}
                    onSelectionChange={handleRoleChange}
                 >
                    {roles.map(role => (
                        <ComboBoxItem key={role.ID} text={role.NOMBRE} data-id={role.ID} /> 
                    ))}
                 </ComboBox>
              </FormItem>
            </Form>
        )}
      </div>
    </Dialog>
  );
}
