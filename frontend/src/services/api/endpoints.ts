export const API_ENDPOINTS = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    // register: '/auth/register',
    // logout: '/auth/logout',
    // refreshToken: '/auth/refresh-token',
  },
  
  // User endpoints
  users: {
    base: '/users',
    profile: '/users/profile',
    updateProfile: '/users/profile/update',
  },

  // Product endpoints
  products: {
    base: '/products',
    categories: '/products/categories',
    search: '/products/search',
  },

  // Order endpoints
  orders: {
    base: '/orders',
    status: '/orders/status',
    history: '/orders/history',
  },

  // Inventory endpoints
  inventory: {
    base: '/inventory',
    stock: '/inventory/stock',
    movements: '/inventory/movements',
  },

  // Supplier endpoints
  suppliers: {
    base: '/suppliers',
    contacts: '/suppliers/contacts',
  },

  // Customer endpoints
  customers: {
    base: '/customers',
    search: '/customers/search',
  },
} as const; 