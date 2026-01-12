import { environment } from '../../../environments/environment';

export const API_CONFIG = {
  baseUrl: environment.apiUrl,
  
  auth: {
    login: '/auth/login',
    logout: '/auth/logout',
    refresh: '/auth/refresh',
    register: '/auth/register',
    me: '/auth/me'
  },
  
  procurement: {
    suppliers: '/api/suppliers',
    supplierById: (id: number) => `/api/suppliers/${id}`,
    materials: '/api/raw-materials',
    materialById: (id: number) => `/api/raw-materials/${id}`,
    supplyOrders: '/api/supply-orders',
    supplyOrderById: (id: number) => `/api/supply-orders/${id}`,
    supplyOrderValidate: (id: number) => `/api/supply-orders/${id}/validate`,
    supplyOrderCancel: (id: number) => `/api/supply-orders/${id}/cancel`,
    supplyOrderReceive: (id: number) => `/api/supply-orders/${id}/receive`
  },
  
  production: {
    products: '/api/products',
    productById: (id: number) => `/api/products/${id}`,
    productionOrders: '/api/production-orders',
    productionOrderById: (id: number) => `/api/production-orders/${id}`,
    productionOrderStart: (id: number) => `/api/production-orders/${id}/start`,
    productionOrderComplete: (id: number) => `/api/production-orders/${id}/complete`,
    productionOrderCancel: (id: number) => `/api/production-orders/${id}/cancel`,
    bom: '/api/bom',
    bomById: (id: number) => `/api/bom/${id}`
  },
  
  delivery: {
    customers: '/api/customers',
    customerById: (id: number) => `/api/customers/${id}`,
    salesOrders: '/api/sales-orders',
    salesOrderById: (id: number) => `/api/sales-orders/${id}`,
    salesOrderValidate: (id: number) => `/api/sales-orders/${id}/validate`,
    salesOrderCancel: (id: number) => `/api/sales-orders/${id}/cancel`,
    deliveries: '/api/deliveries',
    deliveryById: (id: number) => `/api/deliveries/${id}`,
    deliveryDispatch: (id: number) => `/api/deliveries/${id}/dispatch`,
    deliveryDeliver: (id: number) => `/api/deliveries/${id}/deliver`
  },
  
  admin: {
    users: '/api/users',
    userById: (id: number) => `/api/users/${id}`,
    userRoles: (id: number) => `/api/users/${id}/roles`,
    roles: '/api/roles'
  },
  
  dashboard: {
    procurement: '/api/dashboard/procurement',
    production: '/api/dashboard/production',
    delivery: '/api/dashboard/delivery',
    admin: '/api/dashboard/admin'
  }
} as const;

export const PAGINATION_CONFIG = {
  defaultPage: 0,
  defaultSize: 10,
  pageSizeOptions: [5, 10, 20, 50, 100]
} as const;


export const HTTP_CONFIG = {
  timeout: 30000,
  maxRetries: 3,
  retryDelay: 1000
} as const;
