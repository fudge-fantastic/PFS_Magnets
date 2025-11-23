# PixelForge Studio Admin Console - Complete Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Environment Configuration](#environment-configuration)
5. [Data Models & Types](#data-models--types)
6. [API Integration](#api-integration)
7. [Services Layer](#services-layer)
8. [Authentication & Authorization](#authentication--authorization)
9. [Routes & Pages](#routes--pages)
10. [Components Architecture](#components-architecture)
11. [Custom Hooks](#custom-hooks)
12. [State Management](#state-management)
13. [Form Validation](#form-validation)
14. [UI/UX Patterns](#uiux-patterns)
15. [Key Features](#key-features)

---

## Project Overview

**PixelForge Studio Admin Console** is a full-featured React Router v7 application serving as an administrative dashboard for managing products, categories, users, and customer inquiries.

### Key Characteristics
- **Framework**: React Router v7 with Server-Side Rendering (SSR)
- **UI Library**: React 19
- **Styling**: TailwindCSS with Radix UI components
- **Backend Integration**: RESTful API (FastAPI/Express)
- **Authentication**: JWT-based token authentication
- **Type Safety**: Full TypeScript coverage

---

## Technology Stack

### Frontend Dependencies
```json
{
  "react": "^19.1.0",
  "react-router": "^7.7.1",
  "@react-router/node": "^7.7.1",
  "@react-router/serve": "^7.7.1",
  "axios": "^1.11.0",
  "react-hook-form": "^7.62.0",
  "zod": "^4.1.5",
  "@hookform/resolvers": "^5.2.1",
  "next-themes": "^0.4.6",
  "sonner": "^2.0.7",
  "lucide-react": "^0.542.0"
}
```

### UI Components (Radix UI)
```json
{
  "@radix-ui/react-dialog": "^1.1.15",
  "@radix-ui/react-dropdown-menu": "^2.1.16",
  "@radix-ui/react-select": "^2.2.6",
  "@radix-ui/react-alert-dialog": "^1.1.15",
  "@radix-ui/react-tooltip": "^1.2.8",
  "@radix-ui/react-tabs": "^1.1.13",
  "@radix-ui/react-switch": "^1.2.6",
  "@radix-ui/react-checkbox": "^1.3.3"
}
```

### Utility Libraries
- **class-variance-authority**: CSS class variants
- **clsx**: Conditional classNames
- **tailwind-merge**: Merge Tailwind classes
- **date-fns**: Date formatting
- **jwt-decode**: JWT token decoding
- **recharts**: Data visualization

---

## Project Structure

```
pfs_console/
├── app/
│   ├── components/
│   │   ├── ui/              # Radix-based UI primitives
│   │   ├── layout/          # Layout components (Sidebar, Header, AdminLayout)
│   │   ├── forms/           # Form components and dialogs
│   │   ├── data-display/    # Tables, cards, data visualization
│   │   └── advanced/        # CommandPalette, NotificationCenter
│   ├── contexts/            # React Context providers
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions and configs
│   ├── routes/              # File-based routing (React Router v7)
│   ├── services/            # API service layer
│   ├── types/               # TypeScript type definitions
│   ├── routes.ts            # Route configuration
│   ├── root.tsx             # Root component with providers
│   └── app.css              # Global styles
├── public/                  # Static assets
├── .env                     # Environment variables
├── package.json
├── tailwind.config.ts
└── react-router.config.ts
```

---

## Environment Configuration

### Environment Variables
```bash
# .env
VITE_API_BASE_URL=http://localhost:8000
VITE_APP_NAME=PixelForge Studio Admin
```

### Build Scripts
```json
{
  "dev": "react-router dev",
  "build": "react-router build",
  "start": "react-router-serve ./build/server/index.js",
  "typecheck": "react-router typegen && tsc"
}
```

---

## Data Models & Types

### User Types
```typescript
// app/types/user.ts
export interface User {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
  created_at?: string;
  updated_at?: string;
}

export interface UsersResponse {
  success: boolean;
  data: User[];
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}

export interface UserFilters {
  skip?: number;
  limit?: number;
  role?: string;
}
```

### Authentication Types
```typescript
// app/types/auth.ts
export interface AuthUser {
  id: number;
  email: string;
  role: 'USER' | 'ADMIN';
  created_at?: string;
  updated_at?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
    user: AuthUser;
  };
  message?: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  data: {
    access_token: string;
    token_type: string;
    user: AuthUser;
  };
  message?: string;
}
```

### Product Types
```typescript
// app/types/product.ts
export interface Product {
  id: string;
  title: string;
  description?: string;
  short_description?: string;
  price: number;
  category_id: string;
  category_name: string;
  rating?: number;
  images?: string[];
  is_locked?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductRequest {
  title: string;
  description?: string;
  short_description?: string;
  price: number;
  category_id: string;
  rating?: number;
  images?: File[];
}

export interface UpdateProductRequest extends Partial<CreateProductRequest> {
  id: string;
}

export interface ProductsResponse {
  success: boolean;
  data: Product[];
  total?: number;
  page?: number;
  limit?: number;
  message?: string;
}

export interface ProductFilters {
  category?: string;
  skip?: number;
  limit?: number;
  unlocked_only?: boolean;
}
```

### Category Types
```typescript
// app/types/category.ts
export interface Category {
  id: string;
  name: string;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

export interface CreateCategoryRequest {
  name: string;
  description?: string;
}

export interface UpdateCategoryRequest extends Partial<CreateCategoryRequest> {
  id: string;
  is_active?: boolean;
}

export interface CategoriesResponse {
  success: boolean;
  data: Category[];
  total: number;
  message: string;
}

export interface CategoryFilters {
  skip?: number;
  limit?: number;
  active_only?: boolean;
}

export interface DeleteCategoryResponse {
  success: boolean;
  data: {
    id: string;
    deleted: boolean;
  };
  message: string;
}
```

### Inquiry Types
```typescript
// app/types/inquiry.ts
export interface ContactInquiry {
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
  subscribe_newsletter?: boolean;
}

export interface InquiryResponse {
  success: boolean;
  message: string;
  data: {
    reference_id: string;
    submitted_at: string;
    status: string;
  };
}

export interface EmailTestResponse {
  success: boolean;
  message: string;
  data: {
    test_completed: boolean;
    timestamp: string;
  };
}
```

### API Response Types
```typescript
// app/types/api.ts
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface ApiError {
  success: false;
  message: string;
  details?: any;
}

export interface PaginationParams {
  skip?: number;
  limit?: number;
}

export interface SystemHealth {
  status: string;
  database?: string;
  upload_service?: string;
}

export interface WelcomeMessage {
  message: string;
  version: string;
  status: string;
  docs: string;
  redoc: string;
}
```

---

## API Integration

### API Configuration
```typescript
// app/lib/api.ts
import axios from 'axios';
import { API_BASE_URL } from './constants';

// Create axios instance
export const apiClient = axios.create({
  baseURL: API_BASE_URL, // http://localhost:8000
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add JWT token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

### API Endpoints
```typescript
// app/lib/constants.ts
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  TOKEN: '/auth/token',

  // Users
  USERS_ME: '/users/me',
  USERS_LIST: '/users/',
  USERS_BY_ID: (id: number) => `/users/${id}`,

  // Products
  PRODUCTS_LIST: '/products/',
  PRODUCTS_UNLOCKED: '/products/unlocked',
  PRODUCTS_BY_CATEGORY: '/products/category',
  PRODUCTS_BY_ID: (id: string) => `/products/${id}`,
  PRODUCTS_LOCK: (id: string) => `/products/${id}/lock`,
  PRODUCTS_UNLOCK: (id: string) => `/products/${id}/unlock`,
  PRODUCTS_CATEGORIES: '/categories/',

  // Inquiry System
  INQUIRY_CONTACT: '/inquiry/contact',
  INQUIRY_TEST: '/inquiry/contact/test',

  // System
  WELCOME: '/',
  HEALTH: '/health',
} as const;
```

---

## Services Layer

### Authentication Service
```typescript
// app/services/auth.service.ts
import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';
import type { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, AuthUser } from '../types/auth';

export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.LOGIN,
      credentials
    );
    return response.data;
  },

  // Register user
  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>(
      API_ENDPOINTS.REGISTER,
      userData
    );
    return response.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await apiClient.get<{ success: boolean; data: AuthUser }>(
      API_ENDPOINTS.USERS_ME
    );
    return response.data.data;
  },

  // Logout (client-side only)
  logout: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
};
```

### Product Service
```typescript
// app/services/product.service.ts
import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';
import type { Product, ProductsResponse, CreateProductRequest, UpdateProductRequest, ProductFilters } from '../types/product';

export const productService = {
  // Get all products
  getProducts: async (filters: ProductFilters = {}): Promise<ProductsResponse> => {
    const params = new URLSearchParams();

    if (filters.skip !== undefined) params.append('skip', filters.skip.toString());
    if (filters.limit !== undefined) params.append('limit', filters.limit.toString());
    if (filters.category) params.append('category', filters.category);
    if (filters.unlocked_only) params.append('unlocked_only', 'true');

    const response = await apiClient.get<ProductsResponse>(
      `${API_ENDPOINTS.PRODUCTS_LIST}?${params.toString()}`
    );
    return response.data;
  },

  // Get product by ID
  getProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.get<{ success: boolean; data: Product }>(
      API_ENDPOINTS.PRODUCTS_BY_ID(id)
    );
    return response.data.data;
  },

  // Create product (multipart/form-data)
  createProduct: async (productData: CreateProductRequest): Promise<Product> => {
    const formData = new FormData();

    formData.append('title', productData.title);
    formData.append('price', productData.price.toString());
    formData.append('category_id', productData.category_id.toString());

    if (productData.description) formData.append('description', productData.description);
    if (productData.short_description) formData.append('short_description', productData.short_description);
    if (productData.rating !== undefined) formData.append('rating', productData.rating.toString());

    if (productData.images && productData.images.length > 0) {
      productData.images.forEach((image) => formData.append('images', image));
    }

    const response = await apiClient.post<{ success: boolean; data: Product }>(
      API_ENDPOINTS.PRODUCTS_LIST,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data;
  },

  // Update product
  updateProduct: async (productData: UpdateProductRequest): Promise<Product> => {
    const { id, ...updateData } = productData;
    const formData = new FormData();

    if (updateData.title) formData.append('title', updateData.title);
    if (updateData.price !== undefined) formData.append('price', updateData.price.toString());
    if (updateData.category_id) formData.append('category_id', updateData.category_id.toString());
    if (updateData.description) formData.append('description', updateData.description);
    if (updateData.short_description) formData.append('short_description', updateData.short_description);
    if (updateData.rating !== undefined) formData.append('rating', updateData.rating.toString());

    if (updateData.images && updateData.images.length > 0) {
      updateData.images.forEach((image) => formData.append('images', image));
    }

    const response = await apiClient.put<{ success: boolean; data: Product }>(
      API_ENDPOINTS.PRODUCTS_BY_ID(id),
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return response.data.data;
  },

  // Lock/Unlock product
  lockProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.patch<{ success: boolean; data: Product }>(
      API_ENDPOINTS.PRODUCTS_LOCK(id)
    );
    return response.data.data;
  },

  unlockProduct: async (id: string): Promise<Product> => {
    const response = await apiClient.patch<{ success: boolean; data: Product }>(
      API_ENDPOINTS.PRODUCTS_UNLOCK(id)
    );
    return response.data.data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    await apiClient.delete(API_ENDPOINTS.PRODUCTS_BY_ID(id));
  },
};
```

### Category Service
```typescript
// app/services/category.service.ts
import { apiClient } from '../lib/api';
import type { Category, CategoriesResponse, CreateCategoryRequest, UpdateCategoryRequest, CategoryFilters, DeleteCategoryResponse } from '../types/category';

const CATEGORY_ENDPOINTS = {
  LIST: '/categories/',
  ACTIVE: '/categories/active',
  BY_ID: (id: string) => `/categories/${id}`,
} as const;

export const categoryService = {
  // Get all categories
  getCategories: async (filters: CategoryFilters = {}): Promise<CategoriesResponse> => {
    const params = new URLSearchParams();
    if (filters.skip !== undefined) params.append('skip', filters.skip.toString());
    if (filters.limit !== undefined) params.append('limit', filters.limit.toString());
    if (filters.active_only) params.append('active_only', 'true');

    const response = await apiClient.get<CategoriesResponse>(
      `${CATEGORY_ENDPOINTS.LIST}?${params.toString()}`
    );
    return response.data;
  },

  // Get category by ID
  getCategory: async (id: string): Promise<Category> => {
    const response = await apiClient.get<{ success: boolean; data: Category }>(
      CATEGORY_ENDPOINTS.BY_ID(id)
    );
    return response.data.data;
  },

  // Create category
  createCategory: async (categoryData: CreateCategoryRequest): Promise<Category> => {
    const response = await apiClient.post<{ success: boolean; data: Category }>(
      CATEGORY_ENDPOINTS.LIST,
      categoryData
    );
    return response.data.data;
  },

  // Update category
  updateCategory: async (categoryData: UpdateCategoryRequest): Promise<Category> => {
    const { id, ...updateData } = categoryData;
    const response = await apiClient.put<{ success: boolean; data: Category }>(
      CATEGORY_ENDPOINTS.BY_ID(id),
      updateData
    );
    return response.data.data;
  },

  // Delete category (soft delete by default)
  deleteCategory: async (id: string, hardDelete: boolean = false): Promise<DeleteCategoryResponse> => {
    const params = new URLSearchParams();
    if (hardDelete) params.append('hard_delete', 'true');

    const response = await apiClient.delete<DeleteCategoryResponse>(
      `${CATEGORY_ENDPOINTS.BY_ID(id)}?${params.toString()}`
    );
    return response.data;
  },
};
```

### User Service
```typescript
// app/services/user.service.ts
import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';
import type { User, UsersResponse, UserFilters } from '../types/user';

export const userService = {
  // Get all users (admin only)
  getUsers: async (filters: UserFilters = {}): Promise<UsersResponse> => {
    const params = new URLSearchParams();
    if (filters.skip !== undefined) params.append('skip', filters.skip.toString());
    if (filters.limit !== undefined) params.append('limit', filters.limit.toString());
    if (filters.role) params.append('role', filters.role);

    const response = await apiClient.get<UsersResponse>(
      `${API_ENDPOINTS.USERS_LIST}?${params.toString()}`
    );
    return response.data;
  },

  // Get user by ID (admin only)
  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; data: User }>(
      API_ENDPOINTS.USERS_BY_ID(id)
    );
    return response.data.data;
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<{ success: boolean; data: User }>(
      API_ENDPOINTS.USERS_ME
    );
    return response.data.data;
  },
};
```

### Inquiry Service
```typescript
// app/services/inquiry.service.ts
import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';
import type { ContactInquiry, InquiryResponse, EmailTestResponse } from '../types/inquiry';

export const inquiryService = {
  // Submit customer inquiry
  submitInquiry: async (inquiryData: ContactInquiry): Promise<InquiryResponse> => {
    const response = await apiClient.post<InquiryResponse>(
      API_ENDPOINTS.INQUIRY_CONTACT,
      inquiryData
    );
    return response.data;
  },

  // Test email service
  testEmailService: async (): Promise<EmailTestResponse> => {
    const response = await apiClient.get<EmailTestResponse>(
      API_ENDPOINTS.INQUIRY_TEST
    );
    return response.data;
  },
};
```

### System Service
```typescript
// app/services/system.service.ts
import { apiClient } from '../lib/api';
import { API_ENDPOINTS } from '../lib/constants';
import type { SystemHealth, WelcomeMessage } from '../types/api';

export const systemService = {
  // Get welcome message
  getWelcomeMessage: async (): Promise<WelcomeMessage> => {
    const response = await apiClient.get<WelcomeMessage>(API_ENDPOINTS.WELCOME);
    return response.data;
  },

  // Get system health status
  getHealthStatus: async (): Promise<SystemHealth> => {
    const response = await apiClient.get<SystemHealth>(API_ENDPOINTS.HEALTH);
    return response.data;
  },
};
```

---

## Authentication & Authorization

### Token Management
```typescript
// app/lib/auth.ts
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  email: string;
  role?: string;
  exp: number;
  iat: number;
}

// Token storage utilities
export const tokenStorage = {
  get: (): string | null => localStorage.getItem('auth_token'),
  set: (token: string): void => localStorage.setItem('auth_token', token),
  remove: (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  },
  isValid: (token: string): boolean => {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch {
      return false;
    }
  },
  decode: (token: string): DecodedToken | null => {
    try {
      return jwtDecode<DecodedToken>(token);
    } catch {
      return null;
    }
  },
};

// User storage utilities
export const userStorage = {
  get: (): AuthUser | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },
  set: (user: AuthUser): void => {
    localStorage.setItem('user', JSON.stringify(user));
  },
  remove: (): void => {
    localStorage.removeItem('user');
  },
};

// Authentication helpers
export const isAuthenticated = (): boolean => {
  const token = tokenStorage.get();
  return token ? tokenStorage.isValid(token) : false;
};

export const isAdmin = (): boolean => {
  const user = userStorage.get();
  return user?.role === 'ADMIN';
};
```

### Auth Context Provider
```typescript
// app/hooks/useAuth.tsx
import React, { useState, useEffect, createContext, useContext } from 'react';
import type { AuthUser } from '../types/auth';
import { isAuthenticated, tokenStorage, userStorage } from '../lib/auth';
import { authService } from '../services/auth.service';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        const storedUser = userStorage.get();
        if (storedUser) {
          setUser(storedUser);
        } else {
          try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
            userStorage.set(userData);
          } catch {
            tokenStorage.remove();
            setUser(null);
          }
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      const { access_token, user: userData } = response.data;

      tokenStorage.set(access_token);
      userStorage.set(userData);
      setUser(userData);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    tokenStorage.remove();
    setUser(null);
  };

  const refreshUser = async (): Promise<void> => {
    if (!isAuthenticated()) return;
    try {
      const userData = await authService.getCurrentUser();
      setUser(userData);
      userStorage.set(userData);
    } catch {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
};
```

---

## Routes & Pages

### Route Configuration
```typescript
// app/routes.ts
import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("login", "routes/login.tsx"),
  route("dashboard", "routes/dashboard.tsx"),
  route("users", "routes/users/index.tsx"),
  route("users/:userId", "routes/users/$userId.tsx"),
  route("products", "routes/products/index.tsx"),
  route("products/create", "routes/products/create.tsx"),
  route("products/:productId", "routes/products/$productId.tsx"),
  route("products/:productId/edit", "routes/products/$productId.edit.tsx"),
  route("categories", "routes/categories/index.tsx"),
  route("categories/create", "routes/categories/create.tsx"),
  route("categories/:categoryId", "routes/categories/$categoryId.tsx"),
  route("categories/:categoryId/edit", "routes/categories/$categoryId.edit.tsx"),
  route("inquiries", "routes/inquiries.tsx"),
  route("system", "routes/system/index.tsx"),
  route("system/health", "routes/system/health.tsx"),
] satisfies RouteConfig;
```

### Page Structure Example
```typescript
// app/routes/products/index.tsx
import React, { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { ProductsTable } from '../../components/data-display/ProductsTable';
import { CreateProductDialog } from '../../components/forms/CreateProductDialog';
import { productService } from '../../services/product.service';

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'locked'>('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const fetchedCategories = await productService.getCategories();
    setCategories(fetchedCategories);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <Button onClick={() => setShowCreateDialog(true)}>
            Add Product
          </Button>
        </div>

        {/* Products Table */}
        <ProductsTable
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          statusFilter={statusFilter}
          categories={categories}
          onSearchChange={setSearchTerm}
          onCategoryChange={setCategoryFilter}
          onStatusChange={setStatusFilter}
        />

        {/* Create Dialog */}
        <CreateProductDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
          onProductCreated={handleCreateProduct}
        />
      </div>
    </AdminLayout>
  );
}
```

---

## Components Architecture

### Layout Components

#### AdminLayout
```typescript
// app/components/layout/AdminLayout.tsx
- Full-page layout with sidebar and header
- Responsive navigation
- Authentication guard
- Breadcrumb navigation
```

#### Sidebar
```typescript
// app/components/layout/Sidebar.tsx
- Navigation menu with icons
- Active route highlighting
- Collapsible on mobile
- Theme toggle integration
```

#### Header
```typescript
// app/components/layout/Header.tsx
- User profile dropdown
- Notification center
- Command palette trigger
- Logout functionality
```

### UI Components (Radix-based)

All UI components follow the shadcn/ui pattern:
- `Button` - Various variants (default, destructive, outline, ghost)
- `Input` - Text input with label integration
- `Select` - Dropdown select component
- `Dialog` - Modal dialogs
- `Alert Dialog` - Confirmation dialogs
- `Dropdown Menu` - Context menus
- `Tabs` - Tabbed interfaces
- `Table` - Data tables
- `Card` - Content containers
- `Badge` - Status badges
- `Switch` - Toggle switches
- `Checkbox` - Checkboxes
- `Tooltip` - Tooltips
- `Skeleton` - Loading skeletons

### Form Components

#### Create Product Dialog
```typescript
// app/components/forms/CreateProductDialog.tsx
- React Hook Form integration
- Zod validation
- File upload handling
- Category selection
- Price validation (max ₹100,000)
```

#### Edit Product Dialog
```typescript
// app/components/forms/EditProductDialog.tsx
- Pre-populated form data
- Partial updates
- Image preview and upload
```

### Data Display Components

#### ProductsTable
```typescript
// app/components/data-display/ProductsTable.tsx
- Integrated search and filters
- Pagination
- Lock/unlock actions
- Edit/delete actions
- Category badges
- Price formatting (₹INR)
```

#### CategoriesTable
```typescript
// app/components/data-display/CategoriesTable.tsx
- Active/inactive filtering
- Edit/delete actions
- Soft delete support
```

#### UsersTable
```typescript
// app/components/data-display/UsersTable.tsx
- Role-based display
- User details modal
- Admin/User badges
```

---

## Custom Hooks

### useProducts
```typescript
// app/hooks/useProducts.ts
interface UseProductsOptions {
  searchTerm?: string;
  categoryFilter?: string;
  statusFilter?: 'all' | 'active' | 'locked';
}

interface UseProductsResult {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
  refetch: () => void;
  goToPage: (page: number) => void;
}

export const useProducts = (options: UseProductsOptions): UseProductsResult => {
  // Fetches products with filters
  // Handles pagination
  // Client-side search filtering
  // Returns products, loading state, error, and pagination controls
};
```

### useCategories
```typescript
// app/hooks/useCategories.ts
interface UseCategoriesOptions {
  searchTerm?: string;
  statusFilter?: 'all' | 'active' | 'inactive';
  refreshTrigger?: number;
}

interface UseCategoriesResult {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  total: number;
  currentPage: number;
  totalPages: number;
  refetch: () => void;
  goToPage: (page: number) => void;
}

export const useCategories = (options: UseCategoriesOptions): UseCategoriesResult => {
  // Similar pattern to useProducts
};
```

### useAuth (Context Hook)
```typescript
// app/hooks/useAuth.tsx
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export const useAuth = (): AuthContextType => {
  // Provides authentication state and methods
};
```

---

## State Management

### Context Providers

#### NotificationProvider
```typescript
// app/contexts/NotificationContext.tsx
export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'system';

interface NotificationContextType {
  // Toast notifications
  success: (message: string, options?: Partial<NotificationOptions>) => void;
  error: (message: string, options?: Partial<NotificationOptions>) => void;
  warning: (message: string, options?: Partial<NotificationOptions>) => void;
  info: (message: string, options?: Partial<NotificationOptions>) => void;

  // System notifications (persistent)
  systemNotifications: SystemNotification[];
  addSystemNotification: (notification: NotificationOptions) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
  unreadCount: number;
}

// Usage:
const { success, error } = useNotifications();
success('Product created successfully');
error('Failed to delete product');
```

#### ThemeProvider
```typescript
// app/components/theme-provider.tsx
- Dark/light mode support
- System theme detection
- Persistent theme storage
- Uses next-themes
```

### Root Provider Setup
```typescript
// app/root.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <NotificationProvider>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
```

---

## Form Validation

### Zod Schemas

#### Product Schema
```typescript
import { z } from 'zod';

const productSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  short_description: z.string().max(500).optional(),
  price: z.number()
    .min(0, 'Price must be positive')
    .max(100000, 'Price must be less than ₹100,000'),
  category_id: z.string().min(1, 'Category is required'),
  rating: z.number().min(0).max(5).optional(),
  images: z.array(z.instanceof(File)).optional(),
});
```

#### Category Schema
```typescript
const categorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
});
```

#### Login Schema
```typescript
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});
```

### React Hook Form Integration
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm<CreateProductRequest>({
  resolver: zodResolver(productSchema),
  defaultValues: {
    title: '',
    price: 0,
    category_id: '',
  },
});

const onSubmit = async (data: CreateProductRequest) => {
  try {
    await productService.createProduct(data);
    toast.success('Product created successfully');
  } catch (error) {
    toast.error('Failed to create product');
  }
};
```

---

## UI/UX Patterns

### Design System
- **Color Palette**: CSS variables for theming
- **Typography**: Inter font family
- **Spacing**: Tailwind spacing scale
- **Animations**: tailwindcss-animate
- **Icons**: lucide-react

### Common Patterns

#### Loading States
```typescript
{isLoading ? (
  <Skeleton className="h-8 w-full" />
) : (
  <ProductsTable data={products} />
)}
```

#### Error Handling
```typescript
try {
  await productService.deleteProduct(id);
  toast.success('Product deleted');
  refetch();
} catch (error) {
  toast.error(error instanceof Error ? error.message : 'Failed to delete');
}
```

#### Confirmation Dialogs
```typescript
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive">Delete</Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

#### Data Refresh Pattern
```typescript
const [tableKey, setTableKey] = useState(0);

const handleCreate = () => {
  setTableKey(prev => prev + 1); // Force re-render
};

<ProductsTable key={tableKey} />
```

---

## Key Features

### 1. Product Management
- Create, read, update, delete products
- Multi-image upload support
- Category assignment
- Lock/unlock products
- Price management (₹INR)
- Rating system (0-5 stars)
- Search and filter by category/status
- Pagination

### 2. Category Management
- Create, read, update, delete categories
- Active/inactive status
- Soft delete support
- Hard delete option
- Category-based product filtering

### 3. User Management
- List all users (admin only)
- View user details
- Filter by role (ADMIN/USER)
- User profile display

### 4. Authentication
- JWT-based authentication
- Login/logout
- Token refresh
- Protected routes
- Role-based access control

### 5. Inquiry System
- Contact form submission
- Email service integration
- Reference ID generation
- Test email functionality

### 6. System Monitoring
- Health check endpoint
- System status display
- Database connectivity check
- Welcome message endpoint

### 7. Advanced Features
- Command Palette (Ctrl+K)
- Notification Center
- Dark/Light theme toggle
- Responsive design
- Loading skeletons
- Toast notifications
- Breadcrumb navigation
- Search functionality

---

## Development Workflow

### Running the Application
```bash
# Development
npm run dev              # Start dev server at http://localhost:5173

# Production
npm run build            # Build for production
npm run start            # Run production build

# Type Checking
npm run typecheck        # Run TypeScript type checking
```

### API Integration Checklist
1. Define TypeScript types in `app/types/`
2. Create service methods in `app/services/`
3. Add API endpoints to `app/lib/constants.ts`
4. Create custom hooks for data fetching (optional)
5. Implement UI components
6. Add form validation with Zod
7. Handle loading/error states
8. Add toast notifications

### Adding a New Feature
1. Define data model (types)
2. Create service layer
3. Create custom hook (if needed)
4. Build UI components
5. Create route/page
6. Add to navigation/sidebar
7. Test CRUD operations
8. Handle edge cases and errors

---

## Migration to Supabase

### Considerations for Supabase Integration

When integrating this application with Supabase:

1. **Replace REST API calls** with Supabase client queries
2. **Replace JWT auth** with Supabase Auth
3. **Replace file uploads** with Supabase Storage
4. **Update data models** to match Supabase table schemas
5. **Replace service layer** with Supabase queries

### Example Service Migration

#### Before (REST API)
```typescript
const products = await productService.getProducts({ limit: 10 });
```

#### After (Supabase)
```typescript
const { data: products } = await supabase
  .from('products')
  .select('*')
  .limit(10);
```

### Authentication Migration

#### Before (JWT)
```typescript
const response = await authService.login({ email, password });
tokenStorage.set(response.data.access_token);
```

#### After (Supabase Auth)
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email,
  password,
});
```

---

## Conclusion

This documentation provides a complete reference for understanding and recreating the PixelForge Studio Admin Console. The application follows modern React patterns with:

- **Type-safe** development with TypeScript
- **Component-driven** architecture with Radix UI
- **Service layer** abstraction for API calls
- **Custom hooks** for data fetching and state management
- **Form validation** with React Hook Form and Zod
- **Responsive** and accessible UI
- **Dark mode** support
- **JWT authentication** with role-based access

The codebase is structured to be easily maintainable, testable, and scalable for future enhancements.
