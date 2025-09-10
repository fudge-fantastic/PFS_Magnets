# Backend API Spec (Draft)

This document outlines the REST/JSON APIs likely required to support the current frontend (home, products, gallery, about, contact) for PFS Magnets. Adjust as your data model evolves.

## Conventions
- Base URL: `/api`
- Media type: `application/json; charset=utf-8`
- Auth: Bearer JWT for admin-only endpoints. Public endpoints require no auth.
- Pagination: `?page=1&limit=20` with `X-Total-Count` in response headers.
- Filtering/sorting: `?q=search&category=...&sort=price:asc,createdAt:desc`
- Timestamps: ISO 8601 UTC strings.
- IDs: UUID v4 strings.
- Errors: JSON Problem spec-like `{ code, message, details? }` with accurate HTTP status codes.

## Health
- GET `/api/health`
  - 200 OK `{ status: "ok", uptimeSec, version, commit }`

## Auth (Admin)
- POST `/api/auth/login`
  - Body: `{ email, password }`
  - 200 OK `{ token, user: { id, name, email, role } }`
  - 401 on invalid credentials
- POST `/api/auth/logout`
  - Header: `Authorization: Bearer <token>`
  - 204 No Content

## Products
Represents magnets or product SKUs displayed on `home` and `product` pages.

- GET `/api/products`
  - Query: `page, limit, q, category, tags[], minPrice, maxPrice, sort`
  - 200 OK `[{ id, sku, name, slug, description, price, currency, images: [url], thumbnail, categories: [id|slug], tags: [string], specs: Record<string,string>, inStock, featured, createdAt, updatedAt }]`

- GET `/api/products/:idOrSlug`
  - 200 OK `{ id, sku, name, ... }`
  - 404 if not found

- POST `/api/products` (admin)
  - Body: `{ sku, name, slug?, description, price, currency, images?, thumbnail?, categories?, tags?, specs?, inStock?, featured? }`
  - 201 Created `{ id, ... }`

- PATCH `/api/products/:id` (admin)
  - Body: Partial fields
  - 200 OK `{ id, ... }`

- DELETE `/api/products/:id` (admin)
  - 204 No Content

### Product Images
- POST `/api/products/:id/images` (admin)
  - Multipart: `file` (image)
  - 201 Created `{ id, url, alt? }`
- DELETE `/api/products/:id/images/:imageId` (admin)
  - 204 No Content

## Categories
Used for navigation and filtering.

- GET `/api/categories`
  - 200 OK `[{ id, slug, name, description?, image? }]`
- POST `/api/categories` (admin)
  - Body: `{ slug, name, description?, image? }`
  - 201 Created
- PATCH `/api/categories/:id` (admin)
  - 200 OK
- DELETE `/api/categories/:id` (admin)
  - 204 No Content

## Gallery
Images for the gallery route; may be distinct from product images.

- GET `/api/gallery`
  - Query: `page, limit, tag`
  - 200 OK `[{ id, url, caption?, tags?: [string], width, height, createdAt }]`
- POST `/api/gallery` (admin)
  - Multipart: `file` + JSON fields `caption?, tags?`
  - 201 Created `{ id, url, ... }`
- DELETE `/api/gallery/:id` (admin)
  - 204 No Content

## Contact
Submit contact form and list messages for admins.

- POST `/api/contact`
  - Body: `{ name, email, phone?, subject, message }`
  - 202 Accepted `{ id, status: "queued" }` (email/notification will be processed async)
- GET `/api/contact` (admin)
  - Query: `page, limit, q, status`
  - 200 OK `[{ id, name, email, subject, message, status: 'new'|'read'|'archived', createdAt }]`
- PATCH `/api/contact/:id` (admin)
  - Body: `{ status }`
  - 200 OK

## Pages (CMS-like)
For `about` and other static pages editable by admins.

- GET `/api/pages/:slug`
  - 200 OK `{ slug, title, contentHtml, updatedAt }`
- PUT `/api/pages/:slug` (admin)
  - Body: `{ title, contentHtml }`
  - 200 OK

## Site Settings
Logo URLs, theme, contact info.

- GET `/api/settings`
  - 200 OK `{ siteName, logoLightUrl, logoDarkUrl, email, phone, address, social: { instagram?, facebook?, linkedin? } }`
- PUT `/api/settings` (admin)
  - Body: Partial of above
  - 200 OK

## Orders (optional, if e-commerce)
- POST `/api/orders`
  - Body: `{ items: [{ productId, qty }], customer: { name, email, phone?, address }, notes? }`
  - 201 Created `{ id, number, status: 'pending', total, currency, createdAt }`
- GET `/api/orders/:id` (admin)
  - 200 OK `{ id, ... }`
- PATCH `/api/orders/:id` (admin)
  - Body: `{ status }`
  - 200 OK

## Uploads
Generic file upload service for admin panels.

- POST `/api/uploads` (admin)
  - Multipart: `file`
  - 201 Created `{ id, url, kind: 'image'|'file', width?, height? }`

## Rate Limiting
- Public write endpoints (contact, orders) should be rate limited e.g. 10 req/min/IP.

## Security Notes
- Validate and sanitize all inputs.
- Use HTTPS everywhere; set HSTS.
- Store images in object storage (S3-compatible); serve via CDN.
- Use signed URLs for admin uploads if needed.

## Event/Queue Hooks
- On `contact` creation: enqueue email notification to support inbox.
- On `order` creation: enqueue order confirmation email and admin alert.

## Webhooks (optional)
- POST `/api/webhooks/payment` (if integrating a PSP)
  - Verify signature. Respond 200 within 5s.

## Example Error
```json
{
  "code": "VALIDATION_ERROR",
  "message": "price must be >= 0",
  "details": {
    "price": "Must be greater than or equal to 0"
  }
}
```
