import { useState } from "react";
import {
  AnalyticalTable,
  Input,
  Button,
  BusyIndicator,
  Text
} from "@ui5/webcomponents-react";
import { User, CreateUserRequest, UpdateUserRequest } from "../../services/api/user.service";
import AddUser from "../popups/users/AddUser";
import EditDeleteUser from "../popups/users/EditDeleteUser";

interface UsersTableProps {
  data: User[];
  loading: boolean;
  error: string | null;
  onAdd: (newUser: CreateUserRequest) => Promise<void>;
  onSave: (userId: number, updateData: UpdateUserRequest) => Promise<void>;
  onDelete: (userId: number) => Promise<void>;
}

export default function UsersTable({ data, loading, error, onAdd, onSave, onDelete }: UsersTableProps) {
  const [filtro, setFiltro] = useState("");
  const [dialogAgregarOpen, setDialogAgregarOpen] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null);
  const [dialogEditarOpen, setDialogEditarOpen] = useState(false);

  const handleAgregar = () => {
    setDialogAgregarOpen(true);
  };

  const handleUserAdded = async (newUser: CreateUserRequest) => {
    try {
      await onAdd(newUser);
      setDialogAgregarOpen(false);
    } catch (err) {
      console.error("Error adding user:", err);
      throw err;
    }
  };

  const handleEditar = (usuario: User) => {
    setUsuarioEditando(usuario);
    setDialogEditarOpen(true);
  };

  const handleUserSaved = async (userId: number, updateData: UpdateUserRequest) => {
    try {
      await onSave(userId, updateData);
      setDialogEditarOpen(false);
    } catch (err) {
      console.error("Error saving user:", err);
      throw err;
    }
  };

  const handleUserDeleted = async (userId: number) => {
    try {
      await onDelete(userId);
      setDialogEditarOpen(false);
      setUsuarioEditando(null);
    } catch (err) {
      console.error("Error deleting user:", err);
      throw err;
    }
  };

  const columns = [
    { Header: "Nombre usuario", accessor: "NOMBRE" },
    { Header: "Correo", accessor: "EMAIL" },
    { Header: "Rol", accessor: "ROL" },
    {
      Header: "Fecha Creación",
      accessor: "FECHA_CREACION",
      Cell: ({ value }: { value: string }) => {
        if (!value) return "";
        const dotIndex = value.indexOf('.');
        return dotIndex !== -1 ? value.substring(0, dotIndex) : value;
      }
    },
    {
      Header: "Acciones",
      accessor: "actions",
      Cell: ({ row }: { row: { original: User } }) => (
        <Button onClick={() => handleEditar(row.original)}>Editar</Button>
      )
    }
  ];

  const dataFiltrada = data.filter((item) =>
    item.NOMBRE.toLowerCase().includes(filtro.trim().toLowerCase())
  );

  if (loading) {
    return <BusyIndicator active={loading} size="L" style={{ margin: "10rem auto", display: "block" }} />;
  }

  if (error) {
    return <Text style={{ color: "red" }}>{error}</Text>;
  }

  return (
    <div style={{ width: "100%" }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "1rem",
        gap: "1rem"
      }}>
        <Input
          placeholder="Escribe nombre"
          value={filtro}
          onInput={(e) => setFiltro(((e.target as unknown) as HTMLInputElement).value)}
          style={{ width: "250px" }}
        />
        <Button onClick={handleAgregar}>Agregar usuario</Button>
      </div>

      <AnalyticalTable
        columns={columns}
        data={dataFiltrada}
        visibleRows={10}
        sortable={true}
        scaleWidthMode="Smart"
        noDataText="No hay datos disponibles"
        style={{
          width: "100%",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}
      />

      <AddUser
        isOpen={dialogAgregarOpen}
        onClose={() => setDialogAgregarOpen(false)}
        onAdd={handleUserAdded}
      />

      {dialogEditarOpen && usuarioEditando && (
        <EditDeleteUser
          isOpen={dialogEditarOpen}
          onClose={() => { setDialogEditarOpen(false); setUsuarioEditando(null); }}
          user={usuarioEditando}
          onSave={handleUserSaved}
          onDelete={handleUserDeleted}
        />
      )}
    </div>
  );
}
