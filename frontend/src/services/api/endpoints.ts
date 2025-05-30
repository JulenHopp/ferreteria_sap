export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
  },
  
  // Inventory endpoints
  inventory: {
    all_inventory: '/inventario/with-details'
  }
} as const;