# PixelForge Studio - Admin Dashboard Implementation Plan

## Overview

This document outlines the implementation plan for creating an admin-only console/dashboard for CRUD operations on the PixelForge Studio database tables. The architecture is adapted from the existing CONSOLE project but integrated with Supabase instead of a REST API backend.

---

## Technology Stack

### Core Framework
- **React Router v7** - File-based routing with SSR
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool

### Backend & Database
- **Supabase** - PostgreSQL with Row Level Security (RLS)
- **Supabase Auth** - Authentication (replaces JWT)
- **Supabase Storage** - File storage (if needed)

### UI & Styling
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Headless UI primitives
  - `@radix-ui/react-dialog`
  - `@radix-ui/react-dropdown-menu`
  - `@radix-ui/react-select`
  - `@radix-ui/react-alert-dialog`
  - `@radix-ui/react-tooltip`
  - `@radix-ui/react-tabs`
  - `@radix-ui/react-switch`
  - `@radix-ui/react-checkbox`

### Form Management & Validation
- **React Hook Form** - Form state management
- **Zod** - Schema validation
- **@hookform/resolvers** - Zod integration

### Utilities
- **Sonner** - Toast notifications
- **date-fns** - Date formatting
- **lucide-react** - Icons
- **class-variance-authority** - CSS variants
- **clsx** + **tailwind-merge** - Class utilities

---

## Project Structure

```
app/
├── components/
│   ├── ui/                    # Radix-based UI primitives
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── dialog.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── table.tsx
│   │   ├── card.tsx
│   │   ├── badge.tsx
│   │   ├── switch.tsx
│   │   ├── checkbox.tsx
│   │   ├── tooltip.tsx
│   │   ├── tabs.tsx
│   │   └── skeleton.tsx
│   ├── layout/                # Layout components
│   │   ├── AdminLayout.tsx    # Main admin wrapper with sidebar
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   └── Header.tsx         # Top header with user menu
│   ├── forms/                 # Form components
│   │   ├── CreateProductDialog.tsx
│   │   ├── EditProductDialog.tsx
│   │   ├── CreateCategoryDialog.tsx
│   │   ├── EditCategoryDialog.tsx
│   │   ├── UpdateInquiryStatusDialog.tsx
│   │   └── UpdateUserRoleDialog.tsx
│   └── data-display/          # Data display components
│       ├── ProductsTable.tsx
│       ├── CategoriesTable.tsx
│       ├── InquiriesTable.tsx
│       └── UsersTable.tsx
├── contexts/                  # React Context providers
│   └── NotificationContext.tsx
├── hooks/                     # Custom React hooks
│   ├── useAuth.tsx            # Authentication hook
│   ├── useProducts.ts         # Products data hook
│   ├── useCategories.ts       # Categories data hook
│   ├── useInquiries.ts        # Inquiries data hook
│   └── useUsers.ts            # Users data hook
├── lib/                       # Utilities and configs
│   ├── auth.ts                # Supabase auth utilities
│   ├── constants.ts           # App constants
│   ├── utils.ts               # Helper functions
│   └── cn.ts                  # Class name utilities
├── services/                  # Service layer (Supabase abstraction)
│   ├── admin.service.ts       # Admin-specific operations
│   ├── product.service.ts     # Product CRUD
│   ├── category.service.ts    # Category CRUD
│   ├── inquiry.service.ts     # Inquiry management
│   └── user.service.ts        # User management
├── types/                     # TypeScript type definitions
│   ├── admin.ts               # Admin types
│   ├── auth.ts                # Auth types
│   ├── product.ts             # Product types
│   ├── category.ts            # Category types
│   ├── inquiry.ts             # Inquiry types
│   └── user.ts                # User types
├── routes/
│   └── admin/                 # Admin routes
│       ├── login.tsx          # Login page
│       ├── dashboard.tsx      # Dashboard overview
│       ├── products/
│       │   ├── index.tsx      # Products list
│       │   ├── create.tsx     # Create product
│       │   ├── $productId.tsx # View product
│       │   └── $productId.edit.tsx # Edit product
│       ├── categories/
│       │   ├── index.tsx      # Categories list
│       │   ├── create.tsx     # Create category
│       │   └── $categoryId.edit.tsx # Edit category
│       ├── inquiries/
│       │   └── index.tsx      # Inquiries list
│       └── users/
│           └── index.tsx      # Users list
├── routes.ts                  # Route configuration
└── root.tsx                   # Root with providers
```

---

## Database Schema

### Tables (Already Created)

#### 1. **users**
```sql
- id: UUID (Primary Key)
- email: TEXT (Unique, NOT NULL)
- role: TEXT ('USER' | 'ADMIN')
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 2. **categories**
```sql
- id: UUID (Primary Key)
- name: TEXT (Unique, NOT NULL)
- description: TEXT
- is_active: BOOLEAN (Default: TRUE)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 3. **products**
```sql
- id: UUID (Primary Key)
- title: TEXT (NOT NULL)
- description: TEXT
- short_description: TEXT
- price: NUMERIC(10, 2)
- category_id: UUID (Foreign Key -> categories)
- rating: NUMERIC(2, 1)
- images: TEXT[] (Max 5 images)
- is_locked: BOOLEAN (Default: FALSE)
- created_at: TIMESTAMPTZ
- updated_at: TIMESTAMPTZ
```

#### 4. **inquiries**
```sql
- id: UUID (Primary Key)
- first_name: TEXT (NOT NULL)
- last_name: TEXT (NOT NULL)
- email: TEXT (NOT NULL)
- phone_number: TEXT
- subject: TEXT (NOT NULL)
- message: TEXT (Min 10 chars)
- subscribe_newsletter: BOOLEAN
- reference_id: TEXT (Unique, auto-generated)
- status: TEXT ('received' | 'in_progress' | 'resolved')
- submitted_at: TIMESTAMPTZ
- created_at: TIMESTAMPTZ
```

### Row Level Security (RLS) Policies

Already configured:
- **Users**: Admins can view all, users can view their own
- **Categories**: Anyone can view active, admins can manage all
- **Products**: Anyone can view, admins can manage
- **Inquiries**: Anyone can submit, admins can view/update

---

## Authentication Architecture

### Supabase Auth Integration

**Key Changes from CONSOLE (JWT → Supabase Auth):**

#### Authentication Utilities (`app/lib/auth.ts`)
```typescript
import { supabase } from './supabase';
import type { User } from '@supabase/supabase-js';
import type { AuthUser } from '../types/auth';

// Check if user is authenticated
export const isAuthenticated = async (): Promise<boolean> => {
  const { data: { session } } = await supabase.auth.getSession();
  return !!session;
};

// Check if user is admin
export const isAdmin = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single();

  return data?.role === 'ADMIN';
};

// Get current user with role
export const getCurrentUser = async (): Promise<AuthUser | null> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  return data;
};
```

#### Auth Context (`app/hooks/useAuth.tsx`)
```typescript
interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

// Provides authentication state throughout the app
export const AuthProvider = ({ children }) => {
  // Listens to Supabase auth state changes
  // Fetches user role from database
  // Provides login/logout methods
};
```

---

## Service Layer Architecture

### Pattern: Supabase Abstraction

Each service wraps Supabase queries with error handling and type safety.

#### Example: Product Service (`app/services/product.service.ts`)
```typescript
import { supabase } from '../lib/supabase';
import type { Product, CreateProductRequest, UpdateProductRequest } from '../types/product';

export const productService = {
  // Get all products with filters
  getProducts: async (filters?: {
    category_id?: string;
    is_locked?: boolean;
    skip?: number;
    limit?: number;
  }): Promise<{ data: Product[]; total: number }> => {
    let query = supabase
      .from('products')
      .select('*, categories(name)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (filters?.category_id) {
      query = query.eq('category_id', filters.category_id);
    }

    if (filters?.is_locked !== undefined) {
      query = query.eq('is_locked', filters.is_locked);
    }

    if (filters?.skip) {
      query = query.range(filters.skip, filters.skip + (filters.limit || 10) - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: data || [], total: count || 0 };
  },

  // Create product
  createProduct: async (productData: CreateProductRequest): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Update product
  updateProduct: async (id: string, productData: UpdateProductRequest): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Delete product
  deleteProduct: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  // Toggle lock status
  toggleLock: async (id: string, is_locked: boolean): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .update({ is_locked })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },
};
```

#### Similar Services:
- **category.service.ts** - Category CRUD operations
- **inquiry.service.ts** - Inquiry management (view, update status)
- **user.service.ts** - User management (list, update role)

---

## Custom Hooks Pattern

### Example: useProducts Hook (`app/hooks/useProducts.ts`)
```typescript
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
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 10;

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const filters: any = {
        skip: currentPage * ITEMS_PER_PAGE,
        limit: ITEMS_PER_PAGE,
      };

      if (options.categoryFilter && options.categoryFilter !== 'all') {
        filters.category_id = options.categoryFilter;
      }

      if (options.statusFilter !== 'all') {
        filters.is_locked = options.statusFilter === 'locked';
      }

      const { data, total: totalCount } = await productService.getProducts(filters);

      // Client-side search filtering
      let filteredData = data;
      if (options.searchTerm) {
        const search = options.searchTerm.toLowerCase();
        filteredData = data.filter(p =>
          p.title.toLowerCase().includes(search) ||
          p.description?.toLowerCase().includes(search)
        );
      }

      setProducts(filteredData);
      setTotal(totalCount);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, options.searchTerm, options.categoryFilter, options.statusFilter]);

  return {
    products,
    isLoading,
    error,
    total,
    currentPage,
    totalPages: Math.ceil(total / ITEMS_PER_PAGE),
    refetch: fetchProducts,
    goToPage: setCurrentPage,
  };
};
```

---

## Form Validation with Zod

### Schema Definitions

#### Product Schema
```typescript
import { z } from 'zod';

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  short_description: z.string().max(500).optional(),
  price: z.number()
    .min(0, 'Price must be positive')
    .max(100000, 'Price must be less than ₹100,000'),
  category_id: z.string().uuid('Invalid category'),
  rating: z.number().min(0).max(5).optional().default(0),
  images: z.array(z.string()).max(5, 'Maximum 5 images').optional(),
  is_locked: z.boolean().optional().default(false),
});

export const updateProductSchema = createProductSchema.partial();

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
```

#### Category Schema
```typescript
export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
});

export const updateCategorySchema = createCategorySchema.partial().extend({
  is_active: z.boolean().optional(),
});
```

#### Inquiry Schema
```typescript
export const updateInquirySchema = z.object({
  status: z.enum(['received', 'in_progress', 'resolved']),
});
```

### React Hook Form Integration
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const form = useForm<CreateProductInput>({
  resolver: zodResolver(createProductSchema),
  defaultValues: {
    title: '',
    price: 0,
    category_id: '',
    rating: 0,
    is_locked: false,
  },
});

const onSubmit = async (data: CreateProductInput) => {
  try {
    await productService.createProduct(data);
    toast.success('Product created successfully');
    refetch();
    setOpen(false);
  } catch (error) {
    toast.error('Failed to create product');
  }
};
```

---

## UI Components Architecture

### Component Hierarchy

```
AdminLayout
├── Sidebar (Navigation)
└── Main Content
    ├── Header (User menu, breadcrumbs)
    └── Page Content
        ├── ProductsTable
        │   ├── SearchBar
        │   ├── Filters (Category, Status)
        │   ├── Table
        │   └── Pagination
        └── Dialogs
            ├── CreateProductDialog
            ├── EditProductDialog
            ├── DeleteConfirmDialog
            └── etc.
```

### Radix UI Components

#### Button Component (`app/components/ui/button.tsx`)
```typescript
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground',
        outline: 'border border-input bg-background hover:bg-accent',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);
```

#### Dialog Component (`app/components/ui/dialog.tsx`)
```typescript
import * as DialogPrimitive from '@radix-ui/react-dialog';

// Wraps Radix Dialog with custom styling
export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
export const DialogContent = ({ children, ...props }) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50" />
    <DialogPrimitive.Content className="fixed left-1/2 top-1/2 ...">
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
```

---

## Routes Configuration

### Route Structure (`app/routes.ts`)
```typescript
import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  // Public routes (existing)
  // ...

  // Admin routes
  route("admin", "routes/admin/layout.tsx", [
    route("login", "routes/admin/login.tsx"),
    route("dashboard", "routes/admin/dashboard.tsx"),

    // Products
    route("products", "routes/admin/products/index.tsx"),
    route("products/create", "routes/admin/products/create.tsx"),
    route("products/:productId", "routes/admin/products/$productId.tsx"),
    route("products/:productId/edit", "routes/admin/products/$productId.edit.tsx"),

    // Categories
    route("categories", "routes/admin/categories/index.tsx"),
    route("categories/create", "routes/admin/categories/create.tsx"),
    route("categories/:categoryId/edit", "routes/admin/categories/$categoryId.edit.tsx"),

    // Inquiries
    route("inquiries", "routes/admin/inquiries/index.tsx"),

    // Users
    route("users", "routes/admin/users/index.tsx"),
  ]),
] satisfies RouteConfig;
```

---

## Key Features

### 1. Dashboard Overview
- **Statistics Cards**
  - Total Products
  - Total Categories
  - Pending Inquiries
  - Total Users
- **Recent Activity**
  - Latest products added
  - Recent inquiries
- **Quick Actions**
  - Add Product
  - Add Category
  - View Inquiries

### 2. Products Management
- **List View**
  - Search by title/description
  - Filter by category
  - Filter by status (active/locked)
  - Pagination (10 per page)
- **Actions**
  - Create product (with image upload via ImageKit)
  - Edit product
  - Delete product (with confirmation)
  - Toggle lock/unlock
- **Validation**
  - Title: Required, max 200 chars
  - Price: 0-100,000 INR
  - Images: Max 5 images
  - Category: Required

### 3. Categories Management
- **List View**
  - Search by name
  - Filter by active/inactive
  - Show product count per category
- **Actions**
  - Create category
  - Edit category
  - Toggle active/inactive
  - Delete category (check for products)
- **Validation**
  - Name: Required, unique
  - Description: Max 500 chars

### 4. Inquiries Management
- **List View**
  - Search by reference ID, email
  - Filter by status (received/in_progress/resolved)
  - Sort by date
  - Pagination
- **Actions**
  - View inquiry details
  - Update status
  - Export to CSV (future)
- **Display**
  - Reference ID
  - Customer name
  - Email
  - Subject
  - Status badge
  - Submitted date

### 5. Users Management
- **List View**
  - List all users
  - Filter by role (USER/ADMIN)
  - Search by email
- **Actions**
  - View user details
  - Update user role (USER ↔ ADMIN)
  - View user's activity (future)
- **Display**
  - Email
  - Role badge
  - Created date

---

## UI/UX Patterns

### Loading States
```typescript
{isLoading ? (
  <div className="space-y-2">
    <Skeleton className="h-8 w-full" />
    <Skeleton className="h-8 w-full" />
  </div>
) : (
  <ProductsTable data={products} />
)}
```

### Error Handling
```typescript
try {
  await productService.deleteProduct(id);
  toast.success('Product deleted successfully');
  refetch();
} catch (error) {
  const message = error instanceof Error
    ? error.message
    : 'Failed to delete product';
  toast.error(message);
}
```

### Confirmation Dialogs
```typescript
<AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="destructive" size="sm">
      <Trash2 className="h-4 w-4" />
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete the product.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={handleDelete}>
        Delete
      </AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
```

### Toast Notifications (Sonner)
```typescript
import { toast } from 'sonner';

// Success
toast.success('Product created successfully');

// Error
toast.error('Failed to create product');

// Loading
toast.loading('Creating product...');

// Promise-based
toast.promise(
  productService.createProduct(data),
  {
    loading: 'Creating product...',
    success: 'Product created!',
    error: 'Failed to create product',
  }
);
```

---

## Security Considerations

### Row Level Security (RLS)
- Already configured in Supabase schema
- Admins can perform all operations
- Regular users have limited access

### Authentication Guards
```typescript
// Protected route wrapper
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/admin/login" />;
  if (!isAdmin) return <Navigate to="/" />;

  return <>{children}</>;
};
```

### Input Validation
- Client-side: Zod schemas with React Hook Form
- Server-side: Supabase database constraints
- XSS Prevention: React escapes by default
- SQL Injection: Supabase parameterized queries

---

## Dependencies to Install

```json
{
  "dependencies": {
    "react-hook-form": "^7.62.0",
    "zod": "^4.1.5",
    "@hookform/resolvers": "^5.2.1",
    "sonner": "^2.0.7",
    "date-fns": "^4.1.0",
    "@radix-ui/react-alert-dialog": "^1.1.15",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tooltip": "^1.2.8"
  }
}
```

---

## Implementation Phases

### Phase 1: Foundation (Authentication & Layout)
1. Install dependencies
2. Create TypeScript types
3. Set up Supabase auth utilities
4. Create useAuth hook and context
5. Build AdminLayout, Sidebar, Header
6. Create admin login page
7. Set up protected routes

### Phase 2: UI Components
1. Create base UI components (Button, Input, Dialog, etc.)
2. Create Table component
3. Create form components
4. Set up Sonner toast notifications
5. Create loading skeletons

### Phase 3: Service Layer
1. Create product service
2. Create category service
3. Create inquiry service
4. Create user service
5. Create custom data hooks

### Phase 4: CRUD Interfaces
1. Build Products management
2. Build Categories management
3. Build Inquiries management
4. Build Users management
5. Build Dashboard overview

### Phase 5: Testing & Refinement
1. Test authentication flow
2. Test all CRUD operations
3. Test form validations
4. Test RLS policies
5. Fix bugs and polish UI

---

## Success Metrics

- ✅ Admin can log in with Supabase Auth
- ✅ Admin can perform full CRUD on Products
- ✅ Admin can perform full CRUD on Categories
- ✅ Admin can view and update Inquiry status
- ✅ Admin can view and manage User roles
- ✅ Dashboard shows accurate statistics
- ✅ All forms validate with Zod
- ✅ Toast notifications work correctly
- ✅ RLS policies enforce admin-only access
- ✅ UI is responsive and user-friendly

---

## Future Enhancements

- **Analytics Dashboard** - Charts with Recharts
- **Bulk Operations** - Multi-select and bulk actions
- **Export Data** - CSV/Excel export
- **Image Management** - ImageKit integration improvements
- **Activity Log** - Track admin actions
- **Email Templates** - Manage email templates
- **Settings Page** - App configuration
- **Advanced Search** - Full-text search with filters
- **Command Palette** - Keyboard shortcuts (Ctrl+K)

---

## Conclusion

This plan provides a comprehensive roadmap for building a production-ready admin dashboard integrated with Supabase. The architecture follows the proven patterns from the CONSOLE project while adapting them for Supabase's authentication and database systems. The result will be a secure, type-safe, and user-friendly admin interface for managing all aspects of the PixelForge Studio application.
