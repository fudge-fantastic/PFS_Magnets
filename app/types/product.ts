import { z } from 'zod';

export interface Product {
  id: string;
  title: string;
  description?: string;
  short_description?: string;
  price: number;
  category_id: string;
  rating?: number;
  images?: string[];
  is_locked: boolean;
  created_at: string;
  updated_at: string;
  categories?: {
    name: string;
  };
}

// UUID-like pattern (lenient check for database IDs in UUID format)
const uuidLikePattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().optional(),
  short_description: z.string().max(500).optional(),
  price: z.coerce.number()
    .min(0, 'Price must be positive')
    .max(100000, 'Price must be less than ₹100,000'),
  category_id: z.string()
    .min(1, 'Category is required')
    .regex(uuidLikePattern, 'Invalid category ID format'),
  rating: z.coerce.number().min(0).max(5).optional(),
  images: z.array(z.string()).max(5, 'Maximum 5 images').optional(),
  is_locked: z.boolean().optional(),
});

export const updateProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200).optional(),
  description: z.string().optional(),
  short_description: z.string().max(500).optional(),
  price: z.coerce.number()
    .min(0, 'Price must be positive')
    .max(100000, 'Price must be less than ₹100,000').optional(),
  category_id: z.string()
    .min(1, 'Category is required')
    .regex(uuidLikePattern, 'Invalid category ID format')
    .optional(),
  rating: z.coerce.number().min(0).max(5).optional(),
  images: z.array(z.string()).max(5, 'Maximum 5 images').optional(),
  is_locked: z.boolean().optional(),
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
