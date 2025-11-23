import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  // Public routes with shared layout
  layout("routes/_public.tsx", [
    index("routes/home.tsx"),
    route("gallery", "routes/gallery.tsx"),
    route("product/:id", "routes/product.tsx"),
    route("contact", "routes/contact.tsx"),
    route("privacy-policy", "routes/privacy-policy.tsx"),
    route("terms-of-service", "routes/terms-of-service.tsx"),
    route("shipping-info", "routes/shipping-info.tsx"),
  ]),

  // Admin login (no layout)
  route("admin/login", "routes/admin/login.tsx"),

  // Admin routes with admin layout
  layout("routes/admin/layout.tsx", [
    route("admin/dashboard", "routes/admin/dashboard.tsx"),

    // Products
    route("admin/products", "routes/admin/products/index.tsx"),
    route("admin/products/create", "routes/admin/products/create.tsx"),
    route("admin/products/:productId/edit", "routes/admin/products/$productId.edit.tsx"),

    // Categories
    route("admin/categories", "routes/admin/categories/index.tsx"),
    route("admin/categories/create", "routes/admin/categories/create.tsx"),
    route("admin/categories/:categoryId/edit", "routes/admin/categories/$categoryId.edit.tsx"),

    // Inquiries
    route("admin/inquiries", "routes/admin/inquiries/index.tsx"),

    // Users
    route("admin/users", "routes/admin/users/index.tsx"),
  ]),

  // API routes
  route("api/imagekit-auth", "routes/api.imagekit-auth.ts"),
  route("api/send-email", "routes/api.send-email.ts"),
] satisfies RouteConfig;
