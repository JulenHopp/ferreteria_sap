export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
  },
  
  // Inventory endpoints
  inventory: {
    all_inventory: '/inventario/with-details',
    update: '/inventario/update-inventario-producto'
  },

  // User endpoints
  user: {
    all_users: '/usuarios', // GET
    create: '/usuarios', // POST
    roles: '/usuarios/roles', // GET
    update: (userId: number) => `/usuarios/${userId}`, // PUT
    delete: (userId: number) => `/usuarios/${userId}` // DELETE - Dynamic endpoint for delete
  }
} as const;