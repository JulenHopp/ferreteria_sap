import {
  Button,
  Form,
  FormItem,
  Label,
  Input,
  BusyIndicator,
  ComboBox,
  ComboBoxItem,
  Text
} from '@ui5/webcomponents-react';
import { useState, useEffect } from 'react';
import { UserService, User, UpdateUserRequest, Role } from '../../../services/api/user.service';
import TemplatePopup from '../TemplatePopup';

interface EditDeleteUserProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (userId: number, updateData: UpdateUserRequest) => Promise<void>;
  onDelete: (userId: number) => Promise<void>;
}

export default function EditDeleteUser({ isOpen, onClose, user, onSave, onDelete }: EditDeleteUserProps) {
  const [editedUser, setEditedUser] = useState<User | null>(user);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [rolesLoading, setRolesLoading] = useState(true);
  const [rolesError, setRolesError] = useState<string | null>(null);

  useEffect(() => {
    setEditedUser(user);
    setError(null);
  }, [user]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setRolesLoading(true);
        const fetchedRoles = await UserService.getRoles();
        setRoles(fetchedRoles);
        setRolesError(null);
      } catch (err) {
        setRolesError('Error al cargar los roles.');
        console.error('Error fetching roles:', err);
      } finally {
        setRolesLoading(false);
      }
    };

    if (isOpen) {
      fetchRoles();
    } else {
      setRoles([]);
      setRolesError(null);
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof User, value: string) => {
    setEditedUser(prev => prev ? { ...prev, [field]: value } : null);
  };

  const handleRoleChange = (e: any) => {
    const selectedItem = e.detail.item; 
    if(selectedItem && editedUser) {
      const selectedRoleId = parseInt(selectedItem.getAttribute('data-id'), 10); 
      setEditedUser(prev => prev ? { ...prev, ROL_ID: selectedRoleId } : null);
    } else if (editedUser) {
      setEditedUser(prev => prev ? { ...prev, ROL_ID: undefined } as any : null);
    }
  };

  const handleSaveChanges = async () => {
    if (!editedUser || editedUser.USUARIO_ID === undefined) return;

    const updateData: UpdateUserRequest = {
      nombre: editedUser.NOMBRE,
      correo: editedUser.EMAIL,
      rol_id: editedUser.ROL_ID
    };

    if (!updateData.nombre || !updateData.correo || updateData.rol_id === undefined) {
      setError('Por favor, complete todos los campos obligatorios.');
      return;
    }
    
    try {
      setIsSaving(true);
      setError(null);
      await onSave(editedUser.USUARIO_ID, updateData);
    } catch (err) {
      setError('Error al guardar los cambios.');
      console.error('Error saving user:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!user || user.USUARIO_ID === undefined) return;
    
    try {
      setIsDeleting(true);
      setError(null);
      await onDelete(user.USUARIO_ID);
    } catch (err) {
      setError('Error al eliminar usuario.');
      console.error('Error deleting user:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const isSaveButtonDisabled = !editedUser || isSaving || isDeleting || rolesLoading || !editedUser.NOMBRE || !editedUser.EMAIL || editedUser.ROL_ID === undefined;
  const isDeleteButtonDisabled = !user || isSaving || isDeleting || rolesLoading;
  const selectedRoleName = roles.find(role => role.ID === editedUser?.ROL_ID)?.NOMBRE || '';

  const footer = (
    <>
      <Button onClick={onClose}>Cancelar</Button>
      <Button onClick={handleDeleteUser} design="Negative" disabled={isDeleteButtonDisabled}>
        {isDeleting ? <BusyIndicator size="S" /> : "Eliminar"}
      </Button>
      <Button onClick={handleSaveChanges} design="Emphasized" disabled={isSaveButtonDisabled}>
        {isSaving ? <BusyIndicator size="S" /> : "Guardar Cambios"}
      </Button>
    </>
  );

  return (
    <TemplatePopup
      isOpen={isOpen}
      onClose={onClose}
      title={user ? `Editar Usuario: ${user.NOMBRE}` : "Editar Usuario"}
      error={error || rolesError}
      onErrorClose={() => { setError(null); setRolesError(null); }}
      isLoading={rolesLoading}
      footer={footer}
    >
      {!editedUser ? (
        <Text>Seleccione un usuario para editar.</Text>
      ) : (
        <Form layout="ColumnLayout">
          <FormItem>
            <Label>Nombre</Label>
            <Input
              placeholder="Nombre completo"
              value={editedUser.NOMBRE}
              onInput={(e) => handleInputChange('NOMBRE', (e.target as unknown as HTMLInputElement).value)}
              disabled={isSaving || isDeleting}
            />
          </FormItem>
          <FormItem>
            <Label>Correo</Label>
            <Input
              type="Email"
              placeholder="Correo electrónico"
              value={editedUser.EMAIL}
              onInput={(e) => handleInputChange('EMAIL', (e.target as unknown as HTMLInputElement).value)}
              disabled={isSaving || isDeleting}
            />
          </FormItem>
          <FormItem>
            <Label>Rol</Label>
            <ComboBox
              placeholder="Seleccionar rol"
              value={selectedRoleName}
              onSelectionChange={handleRoleChange}
              disabled={isSaving || isDeleting || rolesLoading}
            >
              {roles.map(role => (
                <ComboBoxItem key={role.ID} text={role.NOMBRE} data-id={role.ID} /> 
              ))}
            </ComboBox>
          </FormItem>
        </Form>
      )}
    </TemplatePopup>
  );
} 