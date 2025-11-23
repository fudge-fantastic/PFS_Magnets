# PixelForge Studio - Supabase Full-Stack Migration Guide

This document provides comprehensive instructions for converting your frontend project to a full-stack Supabase application, eliminating the need for this FastAPI backend.

---

## Overview

**Current Backend:** FastAPI-based REST API with MongoDB + ImageKit
**Target Stack:** Full-stack application using Supabase (PostgreSQL, Auth, Edge Functions) + ImageKit (Storage)

**Business Domain:** E-commerce platform for PixelForge Studio specializing in custom magnets and photo products (Photo Magnets, Fridge Magnets, Retro Prints)

### Key Migration Strategy

**What's Changing:**
- ✅ Database: MongoDB → PostgreSQL (Supabase)
- ✅ Authentication: Custom JWT → Supabase Auth
- ✅ Backend API: FastAPI → Supabase Client SDK + Edge Functions
- ✅ Email: SMTP → Resend (via Edge Functions)

**What's Staying:**
- ✅ **ImageKit for image storage** - No migration needed, continue using existing setup
- ✅ All product images remain at current URLs
- ✅ Same image optimization and CDN capabilities

---

## 1. Database Architecture

### 1.1 Database Schema (PostgreSQL/Supabase)

Replace MongoDB collections with PostgreSQL tables:

#### **Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'USER' CHECK (role IN ('USER', 'ADMIN')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (CRITICAL - 2025 Best Practice)
-- Always enable RLS on tables in public schema to protect your data
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Policies (2025 Best Practice: Use granular policies with auth.uid())
-- Keep policies simple and well-tested for maintainability
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'ADMIN'
  );
```

#### **Categories Table**
```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_categories_updated_at
  BEFORE UPDATE ON categories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- Public read for active categories
CREATE POLICY "Anyone can view active categories" ON categories
  FOR SELECT USING (is_active = TRUE);

-- Admin full access
CREATE POLICY "Admins can manage categories" ON categories
  FOR ALL USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'ADMIN'
  );
```

#### **Products Table**
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  short_description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price > 0),
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  rating NUMERIC(2, 1) DEFAULT 0.0 CHECK (rating >= 0.0 AND rating <= 5.0),
  images TEXT[] DEFAULT '{}',
  is_locked BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT max_images CHECK (array_length(images, 1) <= 5)
);

CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_is_locked ON products(is_locked);

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read for all products
CREATE POLICY "Anyone can view products" ON products
  FOR SELECT USING (TRUE);

-- Admin-only write access
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'ADMIN'
  );

-- Prevent updates to locked products
CREATE POLICY "Locked products cannot be modified" ON products
  FOR UPDATE USING (
    NOT is_locked OR (SELECT role FROM users WHERE id = auth.uid()) = 'ADMIN'
  );
```

#### **Inquiries Table** (Contact Form)
```sql
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone_number TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL CHECK (char_length(message) >= 10),
  subscribe_newsletter BOOLEAN DEFAULT FALSE,
  reference_id TEXT UNIQUE NOT NULL,
  status TEXT DEFAULT 'received' CHECK (status IN ('received', 'in_progress', 'resolved')),
  submitted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiries_email ON inquiries(email);
CREATE INDEX idx_inquiries_reference_id ON inquiries(reference_id);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Anyone can submit inquiries
CREATE POLICY "Anyone can submit inquiries" ON inquiries
  FOR INSERT WITH CHECK (TRUE);

-- Admins can view all inquiries
CREATE POLICY "Admins can view all inquiries" ON inquiries
  FOR SELECT USING (
    (SELECT role FROM users WHERE id = auth.uid()) = 'ADMIN'
  );
```

### 1.2 Database Functions

#### **Get Products with Category Name**
```sql
CREATE OR REPLACE FUNCTION get_products_with_category()
RETURNS TABLE (
  id UUID,
  title TEXT,
  description TEXT,
  short_description TEXT,
  price NUMERIC,
  category_id UUID,
  category_name TEXT,
  rating NUMERIC,
  images TEXT[],
  is_locked BOOLEAN,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.id,
    p.title,
    p.description,
    p.short_description,
    p.price,
    p.category_id,
    c.name AS category_name,
    p.rating,
    p.images,
    p.is_locked,
    p.created_at,
    p.updated_at
  FROM products p
  LEFT JOIN categories c ON p.category_id = c.id;
END;
$$ LANGUAGE plpgsql;
```

#### **Generate Inquiry Reference ID**
```sql
CREATE OR REPLACE FUNCTION generate_inquiry_reference()
RETURNS TEXT AS $$
DECLARE
  ref_id TEXT;
BEGIN
  ref_id := 'INQ-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
  RETURN ref_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate reference_id
CREATE OR REPLACE FUNCTION set_inquiry_reference()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.reference_id IS NULL THEN
    NEW.reference_id := generate_inquiry_reference();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_insert_inquiry
  BEFORE INSERT ON inquiries
  FOR EACH ROW
  EXECUTE FUNCTION set_inquiry_reference();
```

---

## 2. Authentication System

### 2.1 Supabase Auth Configuration

**Replace JWT-based custom auth with Supabase Auth:**

#### **Configuration in Supabase Dashboard**
1. Enable Email/Password authentication
2. Configure email templates (welcome email)
3. Set JWT expiry: **30 minutes** (matches current: `access_token_expire_minutes: 30`)
4. Enable email confirmation (optional)
5. **NEW 2025**: Configure MFA/TOTP if needed (enabled by default, free to use)

#### **Password Requirements**
- Minimum length: **8 characters**
- Maximum length: **72 bytes** (bcrypt limit)
- Uses bcrypt hashing (same as current backend)

#### **Best Practices (2025 Update)**
- Use short-lived JWTs and refresh them regularly
- Rotate keys periodically and revoke them when compromised
- Never expose service role key in client-side code (bypasses RLS)
- Store only anon key on frontend; service role key on backend only

### 2.2 User Registration Flow

**Frontend Implementation (Supabase JS Client):**

```typescript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Register new user (Updated 2025 - using latest supabase-js v2 API)
async function registerUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role: 'USER' // Default role
      },
      emailRedirectTo: `${window.location.origin}/auth/callback` // 2025 best practice
    }
  })

  if (error) throw error

  // User data is in data.user
  // Session token is in data.session
  return data
}
```

### 2.3 Login Flow

```typescript
async function loginUser(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) throw error

  return {
    access_token: data.session.access_token,
    user: {
      id: data.user.id,
      email: data.user.email,
      role: data.user.user_metadata.role || 'USER'
    }
  }
}
```

### 2.4 Protected Routes & Role-Based Access

```typescript
// Get current user
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Check if user is admin
async function isAdmin() {
  const user = await getCurrentUser()
  return user?.user_metadata?.role === 'ADMIN'
}

// Middleware example (for Next.js/Remix)
export async function requireAuth(request: Request) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    throw new Response('Unauthorized', { status: 401 })
  }

  return session.user
}

export async function requireAdmin(request: Request) {
  const user = await requireAuth(request)

  if (user.user_metadata?.role !== 'ADMIN') {
    throw new Response('Forbidden - Admin access required', { status: 403 })
  }

  return user
}
```

### 2.5 Database Trigger for User Creation

```sql
-- Create users table entry when auth.users is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'USER')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

---

## 3. File Storage & Image Management

### 3.1 ImageKit Configuration

**Keep using ImageKit for cloud image storage (no change from current backend):**

The current backend uses ImageKit for image storage, which provides:
- Cloud-based image hosting
- Automatic image optimization
- CDN delivery
- On-the-fly transformations
- URL-based image manipulation

**Continue using ImageKit** with the same configuration from your current backend.

#### **Required Environment Variables**
```env
# ImageKit Configuration (keep existing values)
VITE_IMAGEKIT_PUBLIC_KEY=your_public_key
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
IMAGEKIT_PRIVATE_KEY=your_private_key  # Server-side only (for Edge Functions)
```

### 3.2 Image Upload Implementation

**Frontend (TypeScript with ImageKit SDK):**

```typescript
import ImageKit from 'imagekit-javascript'

// Initialize ImageKit client
const imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
  authenticationEndpoint: '/api/imagekit-auth' // Supabase Edge Function
})

// Upload product images (max 5, max 5MB each)
async function uploadProductImages(files: File[]): Promise<string[]> {
  if (files.length > 5) {
    throw new Error('Maximum 5 images allowed')
  }

  const uploadPromises = files.map(async (file) => {
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error(`File ${file.name} exceeds 5MB limit`)
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      throw new Error(`File ${file.name} has invalid type`)
    }

    // Upload to ImageKit
    return new Promise<string>((resolve, reject) => {
      imagekit.upload({
        file: file,
        fileName: file.name,
        folder: '/products/',
        useUniqueFileName: true,
        tags: ['product', 'image']
      }, (err, result) => {
        if (err) {
          reject(new Error(`Upload failed: ${err.message}`))
        } else if (result) {
          resolve(result.url)
        } else {
          reject(new Error('Upload failed: No result returned'))
        }
      })
    })
  })

  return Promise.all(uploadPromises)
}

// Delete product images (requires server-side API)
async function deleteProductImages(imageUrls: string[]) {
  // Call Supabase Edge Function to delete images
  const { error } = await supabase.functions.invoke('delete-imagekit-images', {
    body: { imageUrls }
  })

  if (error) throw error
}
```

### 3.3 ImageKit Authentication Edge Function

**Create Edge Function: `supabase/functions/imagekit-auth/index.ts`**

This function provides authentication signatures for client-side uploads.

**2025 Update**: Edge Functions now support Deno 2.1, improved npm module support,
and can be created/edited directly from the Supabase Dashboard with AI assistance.

```typescript
// Updated for Deno 2.1 (2025)
import { createHmac } from 'node:crypto' // Native Node.js API support in Deno 2.1

const IMAGEKIT_PRIVATE_KEY = Deno.env.get('IMAGEKIT_PRIVATE_KEY')!

Deno.serve(async (req) => {
  try {
    const token = crypto.randomUUID()
    const expire = Math.floor(Date.now() / 1000) + 3600 // 1 hour expiry

    // Generate signature
    const signature = createHmac('sha1', IMAGEKIT_PRIVATE_KEY)
      .update(token + expire)
      .digest('hex')

    return new Response(
      JSON.stringify({ token, expire, signature }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

### 3.4 Image Deletion Edge Function

**Create Edge Function: `supabase/functions/delete-imagekit-images/index.ts`**

**2025 Update**: Supports npm modules natively, can be tested directly from Dashboard.

```typescript
// Updated for 2025 - native npm support
import { createClient } from '@supabase/supabase-js'

const IMAGEKIT_PRIVATE_KEY = Deno.env.get('IMAGEKIT_PRIVATE_KEY')!
const IMAGEKIT_PUBLIC_KEY = Deno.env.get('IMAGEKIT_PUBLIC_KEY')!
const IMAGEKIT_URL_ENDPOINT = Deno.env.get('IMAGEKIT_URL_ENDPOINT')!

Deno.serve(async (req) => {
  try {
    // Verify user is admin
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Check if user is admin
    const { data: userData } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userData?.role !== 'ADMIN') {
      return new Response(
        JSON.stringify({ error: 'Forbidden - Admin access required' }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      )
    }

    const { imageUrls } = await req.json()

    // Delete images from ImageKit
    for (const url of imageUrls) {
      if (url.includes(IMAGEKIT_URL_ENDPOINT)) {
        // Extract file ID or path from URL
        const pathPart = url.replace(IMAGEKIT_URL_ENDPOINT, '')

        // List files to find matching file
        const listResponse = await fetch(
          `https://api.imagekit.io/v1/files?path=/products/`,
          {
            headers: {
              'Authorization': `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ':')}`
            }
          }
        )

        const files = await listResponse.json()

        // Find file by URL match
        const targetFile = files.find((f: any) => f.url === url)

        if (targetFile) {
          // Delete file
          await fetch(
            `https://api.imagekit.io/v1/files/${targetFile.fileId}`,
            {
              method: 'DELETE',
              headers: {
                'Authorization': `Basic ${btoa(IMAGEKIT_PRIVATE_KEY + ':')}`
              }
            }
          )
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

### 3.5 Image Optimization & Transformations

ImageKit provides powerful URL-based transformations:

```typescript
// Get optimized image URL
function getOptimizedImageUrl(
  imageUrl: string,
  options?: {
    width?: number
    height?: number
    quality?: number
    format?: 'auto' | 'webp' | 'jpg' | 'png'
  }
) {
  const { width, height, quality = 80, format = 'auto' } = options || {}

  // Build transformation string
  const transformations = []

  if (width) transformations.push(`w-${width}`)
  if (height) transformations.push(`h-${height}`)
  transformations.push(`q-${quality}`)
  transformations.push(`f-${format}`)

  // Insert transformations into URL
  const transformStr = transformations.join(',')
  const urlParts = imageUrl.split('/products/')

  return `${urlParts[0]}/tr:${transformStr}/products/${urlParts[1]}`
}

// Example usage
const thumbnailUrl = getOptimizedImageUrl(productImage, {
  width: 300,
  height: 300,
  quality: 70,
  format: 'webp'
})

const fullSizeUrl = getOptimizedImageUrl(productImage, {
  width: 1200,
  format: 'auto'
})
```

---

## 4. API Endpoints Migration

### 4.1 Products API

**Current Backend Endpoints:**
- `POST /products/` - Create product (Admin)
- `GET /products/` - List all products
- `GET /products/unlocked` - List unlocked products
- `GET /products/{id}` - Get product by ID
- `PUT /products/{id}` - Update product (Admin)
- `DELETE /products/{id}` - Delete product (Admin)
- `PATCH /products/{id}/lock` - Lock product (Admin)
- `PATCH /products/{id}/unlock` - Unlock product (Admin)

**Supabase Implementation (Using Supabase JS Client):**

```typescript
// List products with category filter
async function getProducts(params?: {
  skip?: number
  limit?: number
  category_id?: string
  unlocked_only?: boolean
}) {
  let query = supabase
    .from('products')
    .select(`
      *,
      category:categories(id, name, description)
    `)
    .order('created_at', { ascending: false })

  if (params?.category_id) {
    query = query.eq('category_id', params.category_id)
  }

  if (params?.unlocked_only) {
    query = query.eq('is_locked', false)
  }

  if (params?.skip) {
    query = query.range(params.skip, params.skip + (params.limit || 100) - 1)
  } else if (params?.limit) {
    query = query.limit(params.limit)
  }

  const { data, error, count } = await query

  if (error) throw error

  return {
    success: true,
    message: `Retrieved ${data.length} products successfully`,
    data: data,
    total: count
  }
}

// Create product (Admin only - enforce in frontend + RLS)
async function createProduct(productData: {
  title: string
  description?: string
  short_description?: string
  price: number
  category_id: string
  rating?: number
  images: File[]
}) {
  // Upload images first
  const imageUrls = await uploadProductImages(productData.images)

  const { data, error } = await supabase
    .from('products')
    .insert({
      title: productData.title,
      description: productData.description,
      short_description: productData.short_description,
      price: productData.price,
      category_id: productData.category_id,
      rating: productData.rating || 0.0,
      images: imageUrls
    })
    .select(`
      *,
      category:categories(id, name, description)
    `)
    .single()

  if (error) throw error

  return {
    success: true,
    message: 'Product created successfully',
    data
  }
}

// Update product (Admin only)
async function updateProduct(productId: string, updates: {
  title?: string
  description?: string
  short_description?: string
  price?: number
  category_id?: string
  rating?: number
  images?: File[]
}) {
  let imageUrls: string[] | undefined

  if (updates.images) {
    // Get existing product to delete old images
    const { data: existingProduct } = await supabase
      .from('products')
      .select('images')
      .eq('id', productId)
      .single()

    if (existingProduct?.images?.length) {
      await deleteProductImages(existingProduct.images)
    }

    imageUrls = await uploadProductImages(updates.images)
  }

  const updateData: any = { ...updates }
  if (imageUrls) {
    updateData.images = imageUrls
  }
  delete updateData.images // Remove File[] from update data

  const { data, error } = await supabase
    .from('products')
    .update(updateData)
    .eq('id', productId)
    .select(`
      *,
      category:categories(id, name, description)
    `)
    .single()

  if (error) throw error

  return {
    success: true,
    message: 'Product updated successfully',
    data
  }
}

// Delete product
async function deleteProduct(productId: string) {
  // Delete associated images first
  const { data: product } = await supabase
    .from('products')
    .select('images')
    .eq('id', productId)
    .single()

  if (product?.images?.length) {
    await deleteProductImages(product.images)
  }

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) throw error

  return {
    success: true,
    message: 'Product deleted successfully',
    data: { id: productId }
  }
}

// Lock/Unlock product
async function lockProduct(productId: string, locked: boolean) {
  const { data, error } = await supabase
    .from('products')
    .update({ is_locked: locked })
    .eq('id', productId)
    .select()
    .single()

  if (error) throw error

  return {
    success: true,
    message: `Product ${locked ? 'locked' : 'unlocked'} successfully`,
    data
  }
}
```

### 4.2 Categories API

**Supabase Implementation:**

```typescript
// List categories
async function getCategories(activeOnly: boolean = false) {
  let query = supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true })

  if (activeOnly) {
    query = query.eq('is_active', true)
  }

  const { data, error, count } = await query

  if (error) throw error

  return {
    success: true,
    message: `Retrieved ${data.length} categories successfully`,
    data,
    total: count
  }
}

// Create category (Admin)
async function createCategory(categoryData: {
  name: string
  description?: string
}) {
  const { data, error } = await supabase
    .from('categories')
    .insert(categoryData)
    .select()
    .single()

  if (error) {
    if (error.code === '23505') { // Unique violation
      throw new Error('Category with this name already exists')
    }
    throw error
  }

  return {
    success: true,
    message: 'Category created successfully',
    data
  }
}

// Update category (Admin)
async function updateCategory(categoryId: string, updates: {
  name?: string
  description?: string
  is_active?: boolean
}) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', categoryId)
    .select()
    .single()

  if (error) throw error

  return {
    success: true,
    message: 'Category updated successfully',
    data
  }
}

// Soft delete (deactivate) category
async function deleteCategory(categoryId: string, hardDelete: boolean = false) {
  if (hardDelete) {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', categoryId)

    if (error) throw error
  } else {
    await updateCategory(categoryId, { is_active: false })
  }

  return {
    success: true,
    message: `Category ${hardDelete ? 'deleted' : 'deactivated'} successfully`,
    data: { id: categoryId, deleted: hardDelete }
  }
}
```

### 4.3 Inquiry/Contact Form API

**Supabase Implementation:**

```typescript
// Submit inquiry
async function submitInquiry(inquiryData: {
  first_name: string
  last_name: string
  email: string
  phone_number?: string
  subject: string
  message: string
  subscribe_newsletter?: boolean
}) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert(inquiryData)
    .select()
    .single()

  if (error) throw error

  // Trigger email notification via Edge Function
  await supabase.functions.invoke('send-inquiry-email', {
    body: { inquiry: data }
  })

  return {
    success: true,
    message: 'Thank you for your inquiry! We have received your message and will get back to you soon.',
    data: {
      reference_id: data.reference_id,
      submitted_at: data.submitted_at,
      status: data.status
    }
  }
}

// Get all inquiries (Admin only)
async function getInquiries(params?: {
  skip?: number
  limit?: number
}) {
  let query = supabase
    .from('inquiries')
    .select('*', { count: 'exact' })
    .order('submitted_at', { ascending: false })

  if (params?.skip) {
    query = query.range(params.skip, params.skip + (params.limit || 100) - 1)
  } else if (params?.limit) {
    query = query.limit(params.limit)
  }

  const { data, error, count } = await query

  if (error) throw error

  return {
    success: true,
    message: `Retrieved ${data.length} inquiries successfully`,
    data,
    total: count
  }
}
```

### 4.4 Users API

```typescript
// Get current user
async function getCurrentUserInfo() {
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error

  return {
    success: true,
    message: 'User details retrieved successfully',
    data
  }
}

// List all users (Admin only)
async function listUsers(params?: { skip?: number; limit?: number }) {
  let query = supabase
    .from('users')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (params?.skip) {
    query = query.range(params.skip, params.skip + (params.limit || 100) - 1)
  } else if (params?.limit) {
    query = query.limit(params.limit)
  }

  const { data, error, count } = await query

  if (error) throw error

  return {
    success: true,
    message: `Retrieved ${data.length} users successfully`,
    data,
    total: count
  }
}
```

---

## 5. Email Notifications

### 5.1 Supabase Edge Functions for Email

**Replace SMTP email service with Supabase Edge Functions + Resend/SendGrid:**

#### **Edge Function: send-inquiry-email**

Create file: `supabase/functions/send-inquiry-email/index.ts`

**2025 Update**: Can be created/tested/deployed from Dashboard with built-in tester.

```typescript
// Updated for 2025 - native npm support
import { createClient } from '@supabase/supabase-js'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const ADMIN_EMAIL = 'admin@pfs.in'
const FROM_EMAIL = 'support@pixelforgestudio.in'

Deno.serve(async (req) => {
  try {
    const { inquiry } = await req.json()

    // Send email to admin
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: ADMIN_EMAIL,
        subject: `New Inquiry: ${inquiry.subject}`,
        html: `
          <h2>New Inquiry Received</h2>
          <p><strong>From:</strong> ${inquiry.first_name} ${inquiry.last_name}</p>
          <p><strong>Email:</strong> ${inquiry.email}</p>
          <p><strong>Phone:</strong> ${inquiry.phone_number || 'Not provided'}</p>
          <p><strong>Subject:</strong> ${inquiry.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${inquiry.message}</p>
          <p><strong>Newsletter:</strong> ${inquiry.subscribe_newsletter ? 'Yes' : 'No'}</p>
          <p><strong>Reference ID:</strong> ${inquiry.reference_id}</p>
        `
      })
    })

    // Send confirmation email to customer
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: inquiry.email,
        subject: `Thank you for contacting PixelForge Studio - ${inquiry.subject}`,
        html: `
          <h2>Thank you for contacting PixelForge Studio!</h2>
          <p>Dear ${inquiry.first_name},</p>
          <p>We have received your inquiry regarding: <strong>${inquiry.subject}</strong></p>
          <p>Our team will review your message and get back to you soon.</p>
          <p><strong>Reference ID:</strong> ${inquiry.reference_id}</p>
          <p>Best regards,<br/>PixelForge Studio Team</p>
        `
      })
    })

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

#### **Edge Function: send-welcome-email**

Create file: `supabase/functions/send-welcome-email/index.ts`

**2025 Update**: Lighter, faster function with improved boot times (300% faster).

```typescript
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM_EMAIL = 'support@pixelforgestudio.in'

Deno.serve(async (req) => {
  try {
    const { user } = await req.json()

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: user.email,
        subject: 'Welcome to PixelForge Studio!',
        html: `
          <h2>Welcome to PixelForge Studio!</h2>
          <p>Dear ${user.email.split('@')[0]},</p>
          <p>Thank you for joining PixelForge Studio! We're excited to have you as part of our community.</p>
          <p>You can now browse our collection of custom magnets and photo products.</p>
          <p>Best regards,<br/>PixelForge Studio Team</p>
        `
      })
    })

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
})
```

### 5.2 Database Trigger for Welcome Email

```sql
-- Trigger welcome email after user signup
CREATE OR REPLACE FUNCTION send_welcome_email_trigger()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_FUNCTION_URL') || '/send-welcome-email',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || (SELECT decrypted_secret FROM vault.decrypted_secrets WHERE name = 'SUPABASE_ANON_KEY')
    ),
    body := jsonb_build_object('user', jsonb_build_object('email', NEW.email))
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER after_user_signup
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION send_welcome_email_trigger();
```

### 5.3 Email Service Providers

**Recommended Options:**
- **Resend** (https://resend.com) - Modern, developer-friendly, generous free tier
- **SendGrid** - Established provider with good free tier
- **Postmark** - High deliverability

**Environment Variables to Set:**
- `RESEND_API_KEY` or `SENDGRID_API_KEY`
- Set in Supabase Dashboard → Settings → Edge Functions → Secrets

---

## 6. Environment Configuration

### 6.1 Current Backend Environment Variables

```env
# MongoDB (TO BE REMOVED)
MONGODB_URL=mongodb://localhost:27017
MONGODB_DATABASE=pixelforge_db

# JWT (TO BE REMOVED - Supabase handles this)
SECRET_KEY=your-super-secret-jwt-key-change-this-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# SMTP (TO BE REMOVED - Use Edge Functions)
SMTP_SERVER=smtp.office365.com
SMTP_PORT=587
SMTP_USERNAME=support@pixelforgestudio.in
SMTP_PASSWORD=
SMTP_FROM_EMAIL=support@pixelforgestudio.in
ADMIN_EMAIL=admin@pfs.in

# File Upload (TO BE REMOVED - ImageKit handles this)
UPLOAD_DIR=uploads
MAX_FILE_SIZE=5242880
ALLOWED_IMAGE_EXTENSIONS=jpg,jpeg,png,gif,webp

# ImageKit (KEEP - Continue using for image storage)
IMAGEKIT_PRIVATE_KEY=your-private-key
IMAGEKIT_PUBLIC_KEY=your-public-key
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-imagekit-id
```

### 6.2 New Supabase Environment Variables

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Server-side only (for Edge Functions)
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Email Service (for Edge Functions)
RESEND_API_KEY=your-resend-api-key
ADMIN_EMAIL=admin@pfs.in
FROM_EMAIL=support@pixelforgestudio.in

# ImageKit (for image storage - keep from current backend)
VITE_IMAGEKIT_PUBLIC_KEY=your-public-key
VITE_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-imagekit-id
IMAGEKIT_PRIVATE_KEY=your-private-key  # For Edge Functions only

# Optional: For development
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.your-project.supabase.co:5432/postgres
```

---

## 7. Data Migration Plan

### 7.1 Import to Supabase

Create migration script: `migrate-to-supabase.ts`

```typescript
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function migrateUsers() {
  const users = JSON.parse(fs.readFileSync('users.json', 'utf-8'))

  for (const user of users) {
    // Create auth user first
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: user.email,
      password: 'TEMP_PASSWORD_' + crypto.randomUUID(), // User must reset
      email_confirm: true,
      user_metadata: {
        role: user.role
      }
    })

    if (authError) {
      console.error(`Failed to create user ${user.email}:`, authError)
      continue
    }

    console.log(`Migrated user: ${user.email}`)
  }
}

async function migrateCategories() {
  const categories = JSON.parse(fs.readFileSync('categories.json', 'utf-8'))

  const { data, error } = await supabase
    .from('categories')
    .insert(categories.map(cat => ({
      id: cat._id, // Map MongoDB ObjectId if needed
      name: cat.name,
      description: cat.description,
      is_active: cat.is_active,
      created_at: cat.created_at,
      updated_at: cat.updated_at
    })))

  if (error) {
    console.error('Failed to migrate categories:', error)
  } else {
    console.log(`Migrated ${categories.length} categories`)
  }
}

async function migrateProducts() {
  const products = JSON.parse(fs.readFileSync('products.json', 'utf-8'))

  for (const product of products) {
    // You may need to re-upload images to Supabase Storage
    // and update image URLs

    const { error } = await supabase
      .from('products')
      .insert({
        title: product.title,
        description: product.description,
        short_description: product.short_description,
        price: product.price,
        category_id: product.category_id, // Map to new UUID
        rating: product.rating,
        images: product.images, // Update URLs if needed
        is_locked: product.is_locked,
        created_at: product.created_at,
        updated_at: product.updated_at
      })

    if (error) {
      console.error(`Failed to migrate product ${product.title}:`, error)
    } else {
      console.log(`Migrated product: ${product.title}`)
    }
  }
}

// Run migration
async function runMigration() {
  console.log('Starting migration...')
  await migrateCategories()
  await migrateProducts()
  await migrateUsers()
  console.log('Migration complete!')
}

runMigration()
```

---

## 8. Testing & Validation

### 8.1 Testing Checklist

**Authentication:**
- [ ] User registration with email/password
- [ ] User login with email/password
- [ ] JWT token generation and validation
- [ ] Role-based access (USER vs ADMIN)
- [ ] Protected routes enforcement

**Products:**
- [ ] Create product (Admin only)
- [ ] List all products (Public)
- [ ] List unlocked products only (Public)
- [ ] Filter products by category
- [ ] Update product (Admin only)
- [ ] Delete product (Admin only)
- [ ] Lock/unlock product (Admin only)
- [ ] Image upload (max 5, max 5MB each)
- [ ] Image deletion on product update/delete

**Categories:**
- [ ] Create category (Admin only)
- [ ] List all categories (Public)
- [ ] List active categories only (Public)
- [ ] Update category (Admin only)
- [ ] Soft delete category (Admin only)
- [ ] Hard delete category (Admin only)

**Inquiries:**
- [ ] Submit contact form (Public)
- [ ] Email notification to admin
- [ ] Email confirmation to customer
- [ ] Reference ID generation
- [ ] List all inquiries (Admin only)

**File Storage (ImageKit):**
- [ ] Upload images to ImageKit (max 5, max 5MB each)
- [ ] ImageKit authentication endpoint working
- [ ] Public access to product images via ImageKit CDN
- [ ] Image optimization/transformation via ImageKit URL
- [ ] Delete images from ImageKit (Admin only)

### 8.2 Load Testing

Test with expected traffic patterns:
- **Concurrent users:** 100-500
- **Products:** 500-1000 items
- **Images:** 2500-5000 files

---

## 9. Deployment Steps

### 9.1 Supabase Project Setup

1. **Create Supabase project** at https://supabase.com
2. **Run database migrations:**
   - Copy all SQL from Section 1 into SQL Editor
   - Execute to create tables, functions, triggers, policies
   - **2025 Best Practice**: Always enable RLS on all tables in public schema
3. **Configure Auth:**
   - Enable Email/Password provider
   - Set password requirements
   - Customize email templates
   - **2025 Update**: MFA/TOTP is enabled by default (free to use)
4. **Deploy Edge Functions:**

   **Option A - Via CLI (Traditional)**:
   ```bash
   supabase functions deploy send-inquiry-email
   supabase functions deploy send-welcome-email
   supabase functions deploy imagekit-auth
   supabase functions deploy delete-imagekit-images
   ```

   **Option B - Via Dashboard (NEW 2025)**:
   - Create and edit functions directly in the Dashboard
   - Use built-in AI Assistant to write functions
   - Test with integrated function tester (Postman-like)
   - Deploy with one click from the Dashboard

   **Option C - Via MCP/API (NEW 2025)**:
   - Deploy programmatically via Supabase API
   - Integrate with AI tools using Model Context Protocol

5. **Set environment secrets:**
   ```bash
   supabase secrets set RESEND_API_KEY=your-key
   supabase secrets set IMAGEKIT_PRIVATE_KEY=your-imagekit-private-key
   supabase secrets set IMAGEKIT_PUBLIC_KEY=your-imagekit-public-key
   supabase secrets set IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your-id
   ```

### 9.2 Frontend Integration

1. **Install dependencies:**
   ```bash
   # 2025 Update: Latest supabase-js v2 with improved DX
   # Note: Node.js 18 support dropped in v2.79.0, use v2.78.0 if needed
   npm install @supabase/supabase-js imagekit-javascript
   ```

2. **Initialize Supabase client:**
   ```typescript
   // lib/supabase.ts
   import { createClient } from '@supabase/supabase-js'

   export const supabase = createClient(
     import.meta.env.VITE_SUPABASE_URL,
     import.meta.env.VITE_SUPABASE_ANON_KEY
   )
   ```

3. **Initialize ImageKit client:**
   ```typescript
   // lib/imagekit.ts
   import ImageKit from 'imagekit-javascript'

   export const imagekit = new ImageKit({
     publicKey: import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY,
     urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL_ENDPOINT,
     authenticationEndpoint: '/api/imagekit-auth' // Your Supabase Edge Function
   })
   ```

4. **Replace API calls:**
   - Remove all fetch calls to FastAPI backend
   - Replace with Supabase client methods from Section 4
   - Keep ImageKit for image uploads (Section 3)

5. **Update authentication:**
   - Replace JWT token storage with Supabase session
   - Update auth context/hooks to use Supabase Auth

### 9.3 Data Migration

1. Export data from MongoDB (Section 7.1)
2. Run migration script (Section 7.2)
3. **Note:** Product images already in ImageKit do NOT need to be migrated - they will continue working with the same URLs
4. Verify data integrity

### 9.4 Testing

1. Run all tests from Section 8.1
2. Verify email delivery
3. Test admin functionality
4. Load test with production data

### 9.5 Go Live

1. **Update frontend environment variables**
2. **Deploy frontend** (Vercel/Netlify/etc.)
3. **Monitor Supabase dashboard** for errors
4. **Test all critical flows** in production
5. **Decommission FastAPI backend** after validation period

---

## 10. Cost Comparison

### Current Backend Costs
- **MongoDB hosting:** $0-57/month (Atlas Free - M10)
- **Server hosting:** $5-50/month (VPS/container)
- **ImageKit:** $0-49/month (Free - Developer plan) - **KEEPING**
- **SMTP service:** $0-15/month (Office365)
- **Total:** ~$5-171/month

### New Supabase + ImageKit Costs
- **Supabase Free tier:** Includes:
  - 500MB database
  - 2GB bandwidth
  - 500K Edge Function invocations
  - 50K monthly active users
- **Supabase Pro tier ($25/month):** For production, includes:
  - 8GB database
  - 250GB bandwidth
  - 2M Edge Function invocations
  - Unlimited monthly active users
- **ImageKit:** $0-49/month (Free - Developer plan) - **UNCHANGED**
- **Resend (Email):** $0-20/month (100 emails/day free)

**New Total:** $0-94/month (Free tier) or $25-114/month (Pro tier)

**Estimated Savings:** $5-77/month (Free tier) or net cost reduction with better scalability (Pro tier)

---

## 11. Advantages of Migration

### Technical Benefits
✅ **Eliminate backend maintenance** - No server management, scaling, or updates
✅ **Built-in authentication** - Industry-standard auth with JWTs, session management
✅ **Real-time capabilities** - WebSocket support for live updates (future feature)
✅ **Type safety** - Auto-generated TypeScript types from database schema
✅ **Row Level Security** - Database-level security policies
✅ **Automatic backups** - Point-in-time recovery
✅ **Edge functions** - Serverless functions at the edge
✅ **Keep ImageKit** - Continue using proven image CDN with powerful transformations

### Developer Experience
✅ **Single codebase** - Frontend and backend logic together
✅ **Faster development** - Less boilerplate, more features
✅ **Better tooling** - CLI, dashboard, auto-migrations
✅ **Local development** - Supabase CLI for local testing
✅ **Easier deployment** - No backend deployment pipeline

### Business Benefits
✅ **Lower costs** - Consolidate multiple services
✅ **Better scalability** - Auto-scales with traffic
✅ **Faster time-to-market** - Ship features faster
✅ **Reduced complexity** - Fewer moving parts

---

## 12. Potential Challenges & Solutions

### Challenge 1: Learning Curve
**Solution:** Supabase documentation is excellent. Start with simple CRUD operations, then add complexity.

### Challenge 2: Complex Queries
**Solution:** Use database functions (Section 1.2) for complex business logic. Supabase supports full PostgreSQL.

### Challenge 3: File Migration
**Solution:** No migration needed! Keep using ImageKit - product images stay where they are with the same URLs.

### Challenge 4: Email Delivery
**Solution:** Use Resend (modern, reliable) instead of self-hosted SMTP. Better deliverability.

### Challenge 5: Admin Password Reset
**Solution:** After migration, users must reset passwords. Send bulk password reset emails via Supabase Auth API.

---

## 13. Rollback Plan

If migration fails:

1. **Keep FastAPI backend running** during migration period (1-2 weeks)
2. **Test Supabase thoroughly** before switching DNS/frontend
3. **MongoDB data backup** before migration
4. **Dual-write strategy** (write to both DBs) during transition
5. **Feature flags** to toggle between backends

---

## 14. Additional Resources (Updated 2025)

### Documentation
- **Supabase Docs:** https://supabase.com/docs
- **Supabase Auth:** https://supabase.com/docs/guides/auth
- **Password-based Auth:** https://supabase.com/docs/guides/auth/passwords
- **Multi-Factor Auth (MFA/TOTP):** https://supabase.com/docs/guides/auth/auth-mfa/totp
- **Row Level Security:** https://supabase.com/docs/guides/database/postgres/row-level-security
- **Securing Your Data:** https://supabase.com/docs/guides/database/secure-data
- **Edge Functions:** https://supabase.com/docs/guides/functions
- **Edge Functions Architecture:** https://supabase.com/docs/guides/functions/architecture
- **PostgreSQL Triggers:** https://supabase.com/docs/guides/database/postgres/triggers
- **Database Webhooks:** https://supabase.com/docs/guides/database/webhooks
- **Storage Access Control:** https://supabase.com/docs/guides/storage/security/access-control
- **JavaScript Client Migration Guide:** https://supabase.com/docs/reference/javascript/v1/upgrade-guide

### Tools
- **Supabase CLI:** https://supabase.com/docs/guides/cli
- **Supabase Studio:** Built-in database GUI
- **TypeScript Types:** Auto-generated from schema
- **Dashboard Function Editor (NEW 2025):** Create, edit, test, and deploy Edge Functions directly from Dashboard
- **Model Context Protocol (MCP):** Deploy via AI tools and external integrations

### Community
- **Discord:** https://discord.supabase.com
- **GitHub:** https://github.com/supabase/supabase
- **Changelog:** https://supabase.com/changelog

### 2025 Key Updates
- ✅ **Edge Functions**: Dashboard management, Deno 2.1, native npm support, 300% faster boot times
- ✅ **Auth**: MFA/TOTP enabled by default, improved security best practices
- ✅ **RLS**: Enhanced documentation and best practices for granular policies
- ✅ **Storage**: Improved bucket policies and access control patterns
- ✅ **Database**: New integrations section with Cron Jobs and Queues support

---

## 15. What's New in 2025 - Migration Advantages

### Edge Functions Improvements
- **Dashboard Management**: Create, edit, test, and deploy functions directly from Supabase Dashboard
- **AI Assistant Integration**: Write Edge Functions with AI assistance in the Dashboard
- **Performance**: 300% faster boot times, 50% smaller function sizes
- **Deno 2.1 Support**: Native Node.js API support, improved npm module compatibility
- **Built-in Testing**: Postman-like function tester integrated in Dashboard
- **MCP Support**: Deploy programmatically via Model Context Protocol and Supabase API

### Security Enhancements
- **MFA/TOTP**: Multi-factor authentication enabled by default (free)
- **Enhanced RLS Documentation**: Better patterns for granular access control
- **Improved Auth Practices**: Short-lived JWTs, key rotation, secure session management
- **Storage Policies**: Enhanced bucket-level and folder-level access control

### Database Features
- **Integrations Section**: New dashboard section with Cron Jobs and Queues
- **Better RLS Tools**: Improved testing and monitoring for Row Level Security
- **Enhanced Triggers**: Updated documentation for PostgreSQL triggers and event triggers
- **Database Webhooks**: HTTP webhooks triggered by database events

### Developer Experience
- **Improved Documentation**: All core guides updated within past few days
- **Better TypeScript Support**: Enhanced type generation from schemas
- **Faster Development**: Reduced complexity with Dashboard-based workflows
- **Migration Tools**: Comprehensive upgrade guides for supabase-js v2

### Cost & Performance
- **Lower Latency**: Edge Functions run closer to users globally
- **Better Scaling**: Automatic scaling with improved performance metrics
- **Predictable Costs**: Clear pricing with generous free tier
- **Reduced Complexity**: Consolidate multiple services into one platform

---

## 16. Next Steps

1. **Review this guide** with your frontend codebase
2. **Create Supabase project** (free tier for testing)
3. **Set up database schema** (Section 1) - Remember to enable RLS on all tables!
4. **Test authentication flow** (Section 2) - Try MFA/TOTP if needed
5. **Implement one feature** (e.g., products listing) to validate approach
6. **Try Dashboard Edge Functions** - Experience the 2025 improved workflow
7. **Plan full migration** timeline
8. **Execute migration** (Section 9)

---

**Generated for:** PixelForge Studio Backend Migration
**Date:** January 2025
**Last Updated:** January 2025 (with latest Supabase features)
**Backend Version:** FastAPI + MongoDB + ImageKit
**Target:** Supabase Full-Stack Application

Good luck with your migration! 🚀

---

## Sources

This guide was updated based on the latest official Supabase documentation:

- [Auth | Supabase Docs](https://supabase.com/docs/guides/auth)
- [Password-based Auth | Supabase Docs](https://supabase.com/docs/guides/auth/passwords)
- [Multi-Factor Authentication (TOTP) | Supabase Docs](https://supabase.com/docs/guides/auth/auth-mfa/totp)
- [Row Level Security | Supabase Docs](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Securing your data | Supabase Docs](https://supabase.com/docs/guides/database/secure-data)
- [Edge Functions | Supabase Docs](https://supabase.com/docs/guides/functions)
- [Edge Functions Architecture | Supabase Docs](https://supabase.com/docs/guides/functions/architecture)
- [Postgres Triggers | Supabase Docs](https://supabase.com/docs/guides/database/postgres/triggers)
- [Database Webhooks | Supabase Docs](https://supabase.com/docs/guides/database/webhooks)
- [Storage Access Control | Supabase Docs](https://supabase.com/docs/guides/storage/security/access-control)
- [JavaScript: Upgrade guide | Supabase Docs](https://supabase.com/docs/reference/javascript/v1/upgrade-guide)
- [Supabase Changelog](https://supabase.com/changelog)
