import { useState, useEffect } from "react";
import {
  AnalyticalTable,
  Input,
  Button,
  Dialog,
  BusyIndicator,
  Text
} from "@ui5/webcomponents-react";
import { UserService, User, CreateUserRequest } from "../../services/api/user.service";
import AddUser from "../popups/AddUser";

export default function Usuarios() {
  const [filtro, setFiltro] = useState("");
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dialogAgregarOpen, setDialogAgregarOpen] = useState(false);

  const [usuarioEditando, setUsuarioEditando] = useState<User | null>(null);
  const [dialogEditarOpen, setDialogEditarOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const usersData = await UserService.getAllUsers();
      setData(usersData);
      setError(null);
    } catch (err) {
      setError("Error al cargar los usuarios");
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAgregar = () => {
    setDialogAgregarOpen(true);
  };

  const handleUserAdded = async (newUser: CreateUserRequest) => {
    try {
      await UserService.createUser(newUser);
      await fetchUsers();
      setDialogAgregarOpen(false);
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Error al agregar usuario");
      throw err;
    }
  };

  const handleEditar = (usuario: User) => {
    setUsuarioEditando({ ...usuario });
    setDialogEditarOpen(true);
  };

  const guardarEdicion = () => {
    console.log("Guardar edición:", usuarioEditando);
    setDialogEditarOpen(false);
  };

  const eliminarUsuario = () => {
    console.log("Eliminar usuario:", usuarioEditando);
    setDialogEditarOpen(false);
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
      {/* Filtro y botón agregar */}
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

      {/* Tabla */}
      <AnalyticalTable
        columns={columns}
        data={dataFiltrada}
        visibleRows={14}
        sortable={true}
        scaleWidthMode="Smart"
        noDataText="No hay datos disponibles"
        style={{
          width: "100%",
          backgroundColor: "white",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          borderRadius: "8px"
        }}
      />

      {/* AddUser Modal */}
      <AddUser
        isOpen={dialogAgregarOpen}
        onClose={() => setDialogAgregarOpen(false)}
        onAdd={handleUserAdded}
      />

      {/* Modal Editar */}
      {dialogEditarOpen && usuarioEditando && (
        <Dialog
          open={dialogEditarOpen}
          headerText={`Editar usuario ${usuarioEditando.NOMBRE}`}
          footer={
            <>
              <Button onClick={() => setDialogEditarOpen(false)}>Cancelar</Button>
              <Button onClick={eliminarUsuario} design="Negative">Eliminar</Button>
              <Button onClick={guardarEdicion} design="Emphasized">Guardar</Button>
            </>
          }
        >
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Input
              placeholder="Nombre"
              value={usuarioEditando.NOMBRE}
              onInput={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  NOMBRE: ((e.target as unknown) as HTMLInputElement).value
                })
              }
            />
            <Input
              placeholder="Correo"
              value={usuarioEditando.EMAIL}
              onInput={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  EMAIL: ((e.target as unknown) as HTMLInputElement).value
                })
              }
            />
            <Input
              placeholder="Rol"
              value={usuarioEditando.ROL}
              onInput={(e) =>
                setUsuarioEditando({
                  ...usuarioEditando,
                  ROL: ((e.target as unknown) as HTMLInputElement).value
                })
              }
            />
          </div>
        </Dialog>
      )}
    </div>
  );
}
