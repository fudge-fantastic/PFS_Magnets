import { supabase } from '../lib/supabase';
import type { Product, CreateProductInput, UpdateProductInput } from '../types/product';

interface GetProductsFilters {
  category_id?: string;
  is_locked?: boolean;
  skip?: number;
  limit?: number;
}

export const productService = {
  /**
   * Get all products with optional filters
   */
  getProducts: async (filters?: GetProductsFilters) => {
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

    if (filters?.skip !== undefined && filters?.limit !== undefined) {
      query = query.range(filters.skip, filters.skip + filters.limit - 1);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    return { data: (data || []) as Product[], total: count || 0 };
  },

  /**
   * Get a single product by ID
   */
  getProduct: async (id: string): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Product;
  },

  /**
   * Create a new product
   */
  createProduct: async (productData: CreateProductInput): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .insert(productData)
      .select('*, categories(name)')
      .single();

    if (error) throw error;
    return data as Product;
  },

  /**
   * Update an existing product
   */
  updateProduct: async (id: string, productData: UpdateProductInput): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .update(productData)
      .eq('id', id)
      .select('*, categories(name)')
      .single();

    if (error) throw error;
    return data as Product;
  },

  /**
   * Delete a product
   */
  deleteProduct: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Toggle product lock status
   */
  toggleLock: async (id: string, is_locked: boolean): Promise<Product> => {
    const { data, error } = await supabase
      .from('products')
      .update({ is_locked })
      .eq('id', id)
      .select('*, categories(name)')
      .single();

    if (error) throw error;
    return data as Product;
  },
};
