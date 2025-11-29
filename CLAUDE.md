# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PFS Magnets is an e-commerce website for custom fridge magnets built with React Router v7, featuring a minimalist pastel aesthetic design system and a full admin panel for product management.

## Development Commands

### Development
```bash
npm run dev              # Start dev server at http://localhost:5173
npm run build           # Create production build
npm run start           # Start production server
npm run typecheck       # Run TypeScript type checking (generates types first)
```

### Environment Setup
Copy `.env.example` to `.env` and configure:
- **Supabase**: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- **ImageKit**: `VITE_IMAGEKIT_PUBLIC_KEY`, `VITE_IMAGEKIT_URL_ENDPOINT`, `IMAGEKIT_PRIVATE_KEY`
- **SMTP**: `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM_EMAIL`, `ADMIN_EMAIL`

## Architecture

### Tech Stack
- **Framework**: React Router v7 with SSR enabled
- **Styling**: TailwindCSS v4 with custom pastel theme
- **Database**: Supabase (PostgreSQL)
- **Image Storage**: ImageKit.io
- **Email**: Nodemailer with SMTP
- **Forms**: React Hook Form + Zod validation
- **UI Components**: Radix UI primitives

### Directory Structure

```
app/
├── components/          # React components
│   ├── admin/          # Admin panel components
│   ├── home/           # Home page components
│   ├── gallery/        # Gallery page components
│   ├── product/        # Product detail components
│   ├── layout/         # Layout components
│   └── ui/             # Reusable UI components (Radix-based)
├── routes/             # File-based routing
│   ├── admin/          # Admin panel routes (protected)
│   ├── api.*.ts        # API endpoints
│   └── *.tsx           # Public routes
├── services/           # Business logic layer
│   ├── product.service.ts
│   ├── category.service.ts
│   ├── inquiry.service.ts
│   ├── user.service.ts
│   └── admin.service.ts
├── lib/                # Shared utilities and clients
│   ├── supabase.ts     # Supabase client + Database types
│   ├── auth.ts         # Authentication helpers
│   ├── imagekit.ts     # ImageKit config
│   ├── email.server.ts # Email service (server-only)
│   ├── api.ts          # Legacy API client
│   └── cn.ts           # Tailwind merge utility
├── hooks/              # Custom React hooks
│   ├── useAuth.tsx
│   ├── useProducts.ts
│   ├── useCategories.ts
│   ├── useInquiries.ts
│   ├── useUsers.ts
│   └── useImageUpload.ts
├── types/              # TypeScript type definitions
│   ├── product.ts      # Product types + Zod schemas
│   ├── category.ts
│   ├── inquiry.ts
│   ├── user.ts
│   ├── admin.ts
│   └── auth.ts
├── utils/              # Utility functions
│   └── productUtils.ts # Product-specific helpers
├── routes.ts           # Route configuration
├── root.tsx            # Root layout
└── app.css            # Global styles + custom animations
```

### Data Layer Architecture

**Service Layer Pattern**: All database operations go through service files in `app/services/`:
- Services use Supabase client from `app/lib/supabase.ts`
- Services return strongly-typed data using types from `app/types/`
- React components consume services via custom hooks in `app/hooks/`

**Data Flow**:
```
Component → Hook → Service → Supabase → Database
```

Example:
```
ProductForm → useProducts → productService → supabase.from('products')
```

### Authentication & Authorization

- Uses Supabase Auth for authentication
- Role-based access: `USER` or `ADMIN` (stored in `users` table)
- Auth helpers in `app/lib/auth.ts`: `isAuthenticated()`, `isAdmin()`, `getCurrentUser()`
- Admin routes protected via `useAuth` hook
- Session persistence enabled in Supabase client config

### Routing System

Routes are defined in `app/routes.ts` using React Router v7's config format:
- Public routes wrapped in `routes/_public.tsx` layout
- Admin routes wrapped in `routes/admin/layout.tsx` (requires auth)
- API routes prefixed with `api.*` (e.g., `api.imagekit-auth.ts`)

Path aliases: Use `~/*` to import from `app/` directory (configured in `tsconfig.json`)

### Image Handling

- **Storage**: ImageKit.io for product images
- **Upload Flow**:
  1. Client requests auth token from `/api/imagekit-auth`
  2. Client uploads directly to ImageKit
  3. Server stores ImageKit URL in database
- **Validation**: Max 5 images, 5MB per file, formats: JPEG/PNG/WebP/GIF
- **Hook**: `useImageUpload` handles upload logic with progress tracking

### Database Schema (Supabase)

Key tables defined in `app/lib/supabase.ts`:
- `users`: User accounts with role (`USER` | `ADMIN`)
- `categories`: Product categories with `is_active` flag
- `products`: Products with images array, rating, `is_locked` flag, and category relation
- `inquiries`: Contact form submissions with status tracking and reference ID

All tables have `created_at` and `updated_at` timestamps.

### Email System

- Uses Nodemailer with SMTP (server-side only in `app/lib/email.server.ts`)
- Contact form sends two emails:
  1. Admin notification with inquiry details
  2. Customer confirmation with reference ID
- HTML email templates with pastel design matching site aesthetic
- Environment variables required: `SMTP_SERVER`, `SMTP_PORT`, `SMTP_USERNAME`, `SMTP_PASSWORD`

## Design System

### Color Palette (Custom CSS Variables in app.css)
- Soft Beige: `#f7f5f2` (primary background)
- Dusty Rose: `#d97583` (primary accent)
- Pale Sage: `#8aa88a` (secondary accent)
- Soft Lavender: `#9d8ec4` (tertiary accent)
- Cream: `#fffcf5` (warm neutral)

### Key Design Patterns
- **Glass Morphism**: Backdrop blur effects on navigation and cards
- **Rounded Shapes**: Generous border radius (`rounded-3xl`, `rounded-full`)
- **Generous Spacing**: Large padding/margins for minimalist feel
- **Custom Animations**: `fade-in-up`, `scale-in`, `float`, `hover-lift` defined in `app.css`
- **Responsive Grid**: 1-column mobile → 2-column tablet → 3-column desktop

## Important Development Notes

### Type Safety
- Run `npm run typecheck` before committing
- Route types auto-generated in `.react-router/types/` - don't edit manually
- Database types defined inline in `app/lib/supabase.ts` - update when schema changes
- Zod schemas in `app/types/` validate form inputs and API payloads

### Server vs Client Code
- Files ending in `.server.ts` are server-only (e.g., `email.server.ts`)
- Environment variables prefixed with `VITE_` are exposed to client
- Never use `IMAGEKIT_PRIVATE_KEY` or `SUPABASE_SERVICE_ROLE_KEY` in client code
- API routes handle server-side operations (image auth, email sending)

### Admin Panel Features
- Dashboard: Overview stats and quick actions
- Products: CRUD with image upload, category assignment, lock/unlock
- Categories: CRUD with active/inactive toggle
- Inquiries: View and manage contact form submissions
- Users: View user accounts

### Product Management
- Products can be "locked" to prevent display on public site
- Images stored as array of ImageKit URLs
- Products must have a category (foreign key to `categories` table)
- Rating field (0-5) optional, used for sorting/filtering

### Form Validation
- React Hook Form + Zod for all forms
- Schemas defined in `app/types/` alongside type definitions
- Client-side validation with server-side validation in API routes
- Consistent error handling pattern across admin forms
