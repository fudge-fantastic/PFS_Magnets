# Admin Dashboard Usage Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [Authentication](#authentication)
3. [Dashboard Overview](#dashboard-overview)
4. [Products Management](#products-management)
5. [Categories Management](#categories-management)
6. [Inquiries Management](#inquiries-management)
7. [Users Management](#users-management)
8. [Common Tasks](#common-tasks)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites
- Supabase project set up with the required schema
- Admin user account with `ADMIN` role in the database
- Environment variables configured (see `.env.example`)

### Accessing the Admin Dashboard

1. Navigate to `/admin/login` in your browser
2. Enter your admin credentials (email and password)
3. Upon successful login, you'll be redirected to `/admin/dashboard`

**URL Structure:**
- Login: `http://localhost:5173/admin/login`
- Dashboard: `http://localhost:5173/admin/dashboard`

---

## Authentication

### Login Process

1. **Navigate to Login Page**: Go to `/admin/login`
2. **Enter Credentials**:
   - Email: Your admin account email
   - Password: Your account password
3. **Click "Log In"**: You'll be authenticated via Supabase Auth

### Security Features

- **Role-Based Access**: Only users with `ADMIN` role can access the dashboard
- **Protected Routes**: All admin routes automatically redirect non-authenticated users to login
- **Session Management**: Uses Supabase session tokens
- **Automatic Logout**: Use the user menu in the top-right corner to log out

### Logout

1. Click on your email in the top-right header
2. Select "Log out" from the dropdown menu
3. You'll be redirected to the login page

---

## Dashboard Overview

The dashboard (`/admin/dashboard`) provides a high-level view of your application:

### Statistics Cards

Four key metrics displayed at the top:
- **Total Products**: Count of all products in the catalog
- **Categories**: Total number of product categories
- **Pending Inquiries**: Inquiries that need attention (received or in_progress status)
- **Total Users**: All registered user accounts

### Recent Activity

Two sections showing latest updates:
- **Recent Products**: Last 5 products added to the catalog
- **Recent Inquiries**: Last 5 customer inquiries submitted

### Quick Actions

Shortcut buttons for common tasks:
- **Add Product**: Jump to product creation page
- **Add Category**: Jump to category creation page
- **View Inquiries**: Navigate to inquiries list

---

## Products Management

### Viewing Products (`/admin/products`)

#### List View Features

**Filters:**
- **Search**: Search by product title or description
- **Category Filter**: Filter by specific category or view all
- **Status Filter**:
  - All Status: Show all products
  - Active: Show only unlocked products
  - Locked: Show only locked products

**Table Columns:**
- Title
- Category
- Price (₹)
- Status (Active/Locked badge)
- Rating (0-5 scale)
- Actions

**Pagination:**
- 10 products per page
- Navigate using "Previous" and "Next" buttons
- Shows current page and total count

#### Product Actions

**Edit Product:**
1. Click the edit (pencil) icon
2. Modify product details
3. Click "Update Product" to save

**Lock/Unlock Product:**
- Click the lock/unlock icon to toggle product visibility
- Locked products won't appear in the public gallery

**Delete Product:**
1. Click the delete (trash) icon
2. Confirm deletion in the dialog
3. Product is permanently removed

### Creating a Product (`/admin/products/create`)

#### Required Fields
- **Title** (required): Product name (max 200 characters)
- **Price** (required): Price in ₹ (0 - 100,000)
- **Category** (required): Select from active categories

#### Optional Fields
- **Short Description**: Brief summary (max 500 characters)
- **Full Description**: Detailed product information
- **Rating**: 0-5 (decimals allowed, e.g., 4.5)
- **Images**: Add up to 5 image URLs
- **Lock Product**: Check to prevent public viewing

#### Step-by-Step

1. Click "Add Product" from dashboard or products list
2. Fill in the required fields (marked with *)
3. Add optional information:
   - Enter short description for quick view
   - Add full description for detail page
   - Set rating if applicable
4. **Add Images**:
   - Click "Add Image URL"
   - Enter the full image URL (e.g., from ImageKit)
   - Repeat up to 5 times
   - Click "Remove" to delete an image URL
5. Check "Lock product" if you don't want it public yet
6. Click "Create Product" or "Cancel"

**Validation:**
- Form validates on submit
- Error messages appear below invalid fields
- Price must be numeric and within range
- Category ID must be a valid UUID

### Editing a Product (`/admin/products/:productId/edit`)

1. Navigate from products list (click edit icon)
2. Form is pre-populated with current values
3. Modify any fields (all fields are optional in edit mode)
4. Manage images:
   - Existing images are shown
   - Add new ones (up to 5 total)
   - Remove unwanted ones
5. Click "Update Product" to save changes
6. Click "Cancel" to discard changes

---

## Categories Management

### Viewing Categories (`/admin/categories`)

#### List View Features

**Filters:**
- **Search**: Search by category name or description
- **Status Filter**:
  - All Status: Show all categories
  - Active: Show only active categories
  - Inactive: Show only inactive categories

**Table Columns:**
- Name
- Description
- Status (Active/Inactive badge)
- Created Date
- Actions

#### Category Actions

**Edit Category:**
1. Click the edit (pencil) icon
2. Modify category details
3. Save changes

**Toggle Active Status:**
- Click the power icon to activate/deactivate
- Inactive categories can still be used for products but may not appear in public filters

**Delete Category:**
1. Click the delete (trash) icon
2. Confirm deletion
3. **Note**: Cannot delete categories that have associated products

### Creating a Category (`/admin/categories/create`)

#### Fields

**Required:**
- **Name**: Category name (max 100 characters)

**Optional:**
- **Description**: Category description (max 500 characters)

#### Step-by-Step

1. Click "Add Category" from dashboard or categories list
2. Enter category name (must be unique)
3. Optionally add a description
4. Click "Create Category"
5. Category is created as active by default

### Editing a Category (`/admin/categories/:categoryId/edit`)

1. Navigate from categories list (click edit icon)
2. Modify name and/or description
3. Toggle "Active" checkbox to change visibility
4. Click "Update Category" to save
5. Click "Cancel" to discard changes

---

## Inquiries Management

### Viewing Inquiries (`/admin/inquiries`)

#### List View Features

**Filters:**
- **Search**: Search by reference ID, email, name, or subject
- **Status Filter**:
  - All Status: Show all inquiries
  - Received: New inquiries
  - In Progress: Being worked on
  - Resolved: Completed inquiries

**Table Columns:**
- Reference ID (unique identifier)
- Customer (first and last name)
- Email
- Subject
- Status (color-coded badge)
- Date (submission date)
- Actions

**Pagination:**
- 10 inquiries per page
- Navigate using "Previous" and "Next" buttons

#### Inquiry Actions

**View Inquiry Details:**
1. Click "View" button
2. Modal opens with full inquiry information:
   - Customer name, email, phone (if provided)
   - Subject and full message
   - Current status
   - Submission timestamp
   - Newsletter subscription preference

**Update Status:**

**From List View:**
1. Use the status dropdown in the Actions column
2. Select new status (Received, In Progress, or Resolved)
3. Status updates immediately

**From Detail View:**
1. Click "View" to open inquiry details
2. Use the status dropdown at the bottom
3. Select new status
4. Dialog closes automatically

#### Status Workflow

```
Received → In Progress → Resolved
```

**Status Meanings:**
- **Received**: New inquiry, not yet reviewed
- **In Progress**: Admin is working on the inquiry
- **Resolved**: Inquiry has been addressed and closed

**Note**: Resolved inquiries don't show the status dropdown (they're final)

### Responding to Inquiries

The dashboard doesn't include email functionality built-in. To respond:

1. View the inquiry details
2. Note the customer's email address
3. Use your external email client to respond
4. Update the inquiry status to "In Progress" or "Resolved"

---

## Users Management

### Viewing Users (`/admin/users`)

#### List View Features

**Filters:**
- **Search**: Search by email address
- **Role Filter**:
  - All Roles: Show all users
  - User: Regular users
  - Admin: Administrator accounts

**Table Columns:**
- Email
- Role (color-coded badge)
- Created Date
- Last Updated Date
- Actions

#### User Actions

**Change User Role:**
1. Click "Change to Admin" or "Change to User" button
2. Confirm the role change in the dialog
3. User's role updates immediately
4. **Caution**: Be careful when demoting admins to users

#### Role Types

**USER:**
- Standard user account
- Can submit inquiries
- Cannot access admin dashboard

**ADMIN:**
- Administrator account
- Full access to admin dashboard
- Can perform all CRUD operations
- Can manage other users

### Important Notes

- You cannot change your own role while logged in
- Always ensure at least one admin account exists
- Role changes take effect immediately
- Users will need to log out and log back in to see permission changes

---

## Common Tasks

### Task 1: Adding a New Product with Images

1. **Prepare Images First**:
   - Upload images to your CDN (e.g., ImageKit)
   - Copy the full image URLs

2. **Create Category** (if needed):
   - Go to `/admin/categories/create`
   - Enter category name and description
   - Save

3. **Create Product**:
   - Go to `/admin/products/create`
   - Fill in title, price, and select category
   - Add descriptions
   - Click "Add Image URL" for each image
   - Paste the image URLs
   - Set rating if applicable
   - Click "Create Product"

4. **Verify**:
   - Product appears in products list
   - Check public gallery to ensure it displays correctly

### Task 2: Managing Customer Inquiries

1. **Check New Inquiries**:
   - Go to `/admin/inquiries`
   - Filter by status "Received"

2. **Review Inquiry**:
   - Click "View" on an inquiry
   - Read the customer's message
   - Note their contact information

3. **Update Status**:
   - Change status to "In Progress"
   - Respond to customer via email (external)
   - Once resolved, update status to "Resolved"

### Task 3: Bulk Product Management

1. **Filter Products**:
   - Use category filter to isolate products
   - Use search to find specific items

2. **Lock Multiple Products**:
   - Go through filtered list
   - Click lock icon on each product
   - Products are removed from public view

3. **Update Category**:
   - If reorganizing, edit each product
   - Change category assignment
   - Save changes

### Task 4: Making Another User an Admin

1. **Go to Users Management**: `/admin/users`
2. **Find the User**: Search by email if needed
3. **Change Role**: Click "Change to Admin"
4. **Confirm**: Verify in the confirmation dialog
5. **Notify User**: Tell them to log out and log back in

---

## Troubleshooting

### Login Issues

**Problem**: Cannot log in to admin dashboard

**Solutions**:
1. Verify your email and password are correct
2. Check that your user account has `ADMIN` role in Supabase database:
   ```sql
   SELECT id, email, role FROM users WHERE email = 'your@email.com';
   ```
3. Update role if needed:
   ```sql
   UPDATE users SET role = 'ADMIN' WHERE email = 'your@email.com';
   ```
4. Clear browser cookies and try again

### Access Denied After Login

**Problem**: Redirected to home page after login

**Solution**: Your account doesn't have admin privileges. Contact another admin or update the database directly.

### Products Not Appearing in Gallery

**Problem**: Created product doesn't show in public gallery

**Possible Causes**:
1. Product is locked - check status in products list
2. Category is inactive - check category status
3. RLS policies blocking access - verify Supabase RLS settings

**Solution**:
1. Go to `/admin/products`
2. Find the product
3. Click unlock icon if locked
4. Verify category is active in `/admin/categories`

### Images Not Loading

**Problem**: Product images don't display

**Possible Causes**:
1. Invalid image URL
2. CORS issues with image host
3. Image URL requires authentication

**Solution**:
1. Test image URL in browser directly
2. Ensure image URL is publicly accessible
3. Use a CDN like ImageKit that allows public access
4. Re-upload image if necessary

### Cannot Delete Category

**Problem**: "Failed to delete category" error appears

**Solution**: This category has products associated with it.
1. Go to `/admin/products`
2. Filter by this category
3. Either delete the products or change their category
4. Try deleting the category again

### Form Validation Errors

**Problem**: Form won't submit due to validation errors

**Solution**:
1. Read error messages below each field
2. Common issues:
   - Price outside 0-100,000 range
   - Title too long (>200 characters)
   - Category not selected
   - Invalid number format
3. Fix the highlighted fields
4. Try submitting again

### Toast Notifications Not Appearing

**Problem**: No success/error messages after actions

**Solution**:
1. Check browser console for errors
2. Verify Sonner is properly loaded
3. Hard refresh the page (Ctrl+Shift+R)

### Pagination Not Working

**Problem**: Cannot navigate between pages

**Solution**:
1. Check if you have enough items (need >10 for pagination)
2. Try removing filters
3. Refresh the page

---

## Keyboard Shortcuts

Currently, the admin dashboard doesn't have keyboard shortcuts enabled, but you can use standard browser shortcuts:

- **Ctrl/Cmd + Click** on links: Open in new tab
- **Escape**: Close dialogs and modals
- **Tab**: Navigate between form fields
- **Enter**: Submit forms

---

## Best Practices

### Product Management
1. Always add short descriptions for better UX
2. Use descriptive titles that include key search terms
3. Keep product prices updated
4. Lock products instead of deleting them (preserve data)
5. Use consistent image sizes for better gallery appearance

### Category Management
1. Create categories before adding products
2. Use clear, hierarchical category names
3. Add descriptions to help other admins understand category purpose
4. Don't delete categories that have historical products

### Inquiry Management
1. Check inquiries daily
2. Update status immediately when starting work
3. Keep reference IDs in your email responses
4. Resolve inquiries promptly to maintain customer satisfaction

### User Management
1. Be cautious when granting admin access
2. Regularly audit admin accounts
3. Remove admin access for former team members
4. Keep a list of admin emails in a secure location

---

## Technical Details

### Data Flow

```
User Action → React Component → Custom Hook → Service Layer → Supabase → Database
                                                                    ↓
                                                                 RLS Check
                                                                    ↓
                                                              Return Data
```

### Form Validation

- **Client-Side**: Zod schemas validate before submission
- **Server-Side**: Supabase database constraints provide additional validation
- **Visual Feedback**: Errors appear in red below form fields

### State Management

- **Local Component State**: useState for UI state
- **Custom Hooks**: Centralized data fetching and caching
- **No Global Store**: Each page manages its own data

### Authentication Flow

1. User submits login form
2. Supabase Auth validates credentials
3. Session token stored in browser
4. Protected routes check `isAuthenticated` and `isAdmin`
5. Unauthorized users redirected to login

---

## API Reference

### Custom Hooks

#### `useProducts(options)`
```typescript
const { products, isLoading, error, total, currentPage, totalPages, refetch, goToPage } = useProducts({
  searchTerm: string,
  categoryFilter: string,
  statusFilter: 'all' | 'active' | 'locked'
});
```

#### `useCategories(options)`
```typescript
const { categories, isLoading, error, total, refetch } = useCategories({
  searchTerm: string,
  activeFilter: 'all' | 'active' | 'inactive'
});
```

#### `useInquiries(options)`
```typescript
const { inquiries, isLoading, error, total, currentPage, totalPages, refetch, goToPage } = useInquiries({
  searchTerm: string,
  statusFilter: 'all' | 'received' | 'in_progress' | 'resolved'
});
```

#### `useUsers(options)`
```typescript
const { users, isLoading, error, total, refetch } = useUsers({
  searchTerm: string,
  roleFilter: 'all' | 'USER' | 'ADMIN'
});
```

#### `useAuth()`
```typescript
const { user, isLoading, isAuthenticated, isAdmin, login, logout, refreshUser } = useAuth();
```

---

## Support & Resources

### Documentation
- [Main Admin Plan](ADMIN_DASHBOARD_PLAN.md) - Architecture and implementation details
- [Supabase Documentation](https://supabase.io/docs) - Database and auth reference
- [React Router v7 Docs](https://reactrouter.com) - Routing documentation

### Getting Help

If you encounter issues:
1. Check this guide's troubleshooting section
2. Review browser console for errors
3. Check Supabase dashboard for database errors
4. Verify RLS policies are correctly configured
5. Check environment variables in `.env`

### Future Enhancements

Planned features (not yet implemented):
- Bulk operations (multi-select)
- Export data to CSV
- Advanced analytics dashboard
- Email template management
- Activity logs
- Image upload directly (instead of URLs)
- Command palette (Ctrl+K)
- Advanced search with filters

---

## Quick Reference

### URLs

| Page | URL | Purpose |
|------|-----|---------|
| Login | `/admin/login` | Authenticate |
| Dashboard | `/admin/dashboard` | Overview |
| Products List | `/admin/products` | View all products |
| Create Product | `/admin/products/create` | Add new product |
| Edit Product | `/admin/products/:id/edit` | Modify product |
| Categories List | `/admin/categories` | View all categories |
| Create Category | `/admin/categories/create` | Add new category |
| Edit Category | `/admin/categories/:id/edit` | Modify category |
| Inquiries List | `/admin/inquiries` | View all inquiries |
| Users List | `/admin/users` | View all users |

### Status Values

**Products:**
- `Active`: Unlocked, visible to public
- `Locked`: Hidden from public view

**Categories:**
- `Active`: Enabled and visible
- `Inactive`: Disabled

**Inquiries:**
- `received`: New inquiry
- `in_progress`: Being handled
- `resolved`: Completed

**Users:**
- `USER`: Regular user
- `ADMIN`: Administrator

---

*Last Updated: November 2025*
*Version: 1.0*
