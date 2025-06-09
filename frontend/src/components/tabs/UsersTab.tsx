import { useState, useEffect } from "react";
import { UserService, User, CreateUserRequest, UpdateUserRequest } from "../../services/api/user.service";
import UsersTable from "../tables/UsersTable";
import UsersAnalytics from "../analytics/UsersAnalytics";

export default function UsersTab() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const handleUserAdded = async (newUser: CreateUserRequest) => {
    try {
      await UserService.createUser(newUser);
      await fetchUsers();
    } catch (err) {
      console.error("Error adding user:", err);
      setError("Error al agregar usuario");
      throw err;
    }
  };

  const handleUserSaved = async (userId: number, updateData: UpdateUserRequest) => {
    try {
      await UserService.updateUser(userId, updateData);
      await fetchUsers();
    } catch (err) {
      console.error("Error saving user:", err);
      setError("Error al guardar usuario");
      throw err;
    }
  };

  const handleUserDeleted = async (userId: number) => {
    try {
      await UserService.deleteUser(userId);
      await fetchUsers();
    } catch (err) {
      console.error("Error deleting user:", err);
      setError("Error al eliminar usuario");
      throw err;
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem', 
      height: '100%',
      width: '100%'
    }}>
      <div style={{ flex: '1 1 70%'}}>
        <UsersTable 
          data={data}
          loading={loading}
          error={error}
          onAdd={handleUserAdded}
          onSave={handleUserSaved}
          onDelete={handleUserDeleted}
        />
      </div>
      <div style={{ flex: '1 1 30%'}}>
        <UsersAnalytics data={data} />
      </div>
    </div>
  );
}
