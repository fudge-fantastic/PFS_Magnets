import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("gallery", "routes/gallery.tsx"),
  route("product/:id", "routes/product.tsx"),
  route("contact", "routes/contact.tsx"),
  route("privacy-policy", "routes/privacy-policy.tsx"),
  route("terms-of-service", "routes/terms-of-service.tsx"),
  route("shipping-info", "routes/shipping-info.tsx"),
] satisfies RouteConfig;
