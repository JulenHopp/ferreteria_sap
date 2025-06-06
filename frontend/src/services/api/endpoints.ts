export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/api/auth/login',
  },
  
  // Inventory endpoints
  inventory: {
    all_inventory: '/api/inventario/with-details',
    update: '/api/inventario/update-inventario-producto'
  },

  // User endpoints
  user: {
    all_users: '/api/usuarios', // GET
    create: '/api/usuarios', // POST
    roles: '/api/usuarios/roles', // GET
    update: (userId: number) => `/api/usuarios/${userId}`, // PUT
    delete: (userId: number) => `/api/usuarios/${userId}` // DELETE - Dynamic endpoint for delete
  }
} as const;