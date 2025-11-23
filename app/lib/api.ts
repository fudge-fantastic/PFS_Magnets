// API client for PixelForge Studio - Supabase Edition
import { supabase } from './supabase';

// API response type for consistent response format
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  total?: number;
}

// Product interface matching database schema
export interface Product {
  id: string;
  title: string;
  description: string;
  short_description: string;
  price: number;
  category_id: string;
  category_name: string; // Joined from categories table
  rating: number;
  images: string[];
  is_locked: boolean;
  created_at: string;
  updated_at: string;
}

// Category interface matching database schema
export interface Category {
  id: string;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Inquiry interface for contact form
export interface Inquiry {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number?: string;
  subject: string;
  message: string;
  subscribe_newsletter?: boolean;
  reference_id?: string;
  status?: 'received' | 'in_progress' | 'resolved';
  submitted_at?: string;
  created_at?: string;
}

/**
 * API Client class for Supabase operations
 */
class ApiClient {
  /**
   * Get products with optional filters
   */
  async getPublicProducts(
    page: number = 0,
    limit: number = 12,
    categoryId?: string
  ): Promise<ApiResponse<Product[]>> {
    try {
      const skip = page * limit;

      let query = supabase
        .from('products')
        .select(`
          id,
          title,
          description,
          short_description,
          price,
          category_id,
          rating,
          images,
          is_locked,
          created_at,
          updated_at,
          category:categories(name)
        `)
        .eq('is_locked', false)
        .order('created_at', { ascending: false })
        .range(skip, skip + limit - 1);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Transform data to include category_name
      const products: Product[] = (data || []).map((item: any) => ({
        ...item,
        category_name: item.category?.name || 'Unknown'
      }));

      return {
        success: true,
        message: `Retrieved ${products.length} products successfully`,
        data: products,
        total: count || products.length
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch products',
        data: [],
        total: 0
      };
    }
  }

  /**
   * Get all products (including locked ones)
   */
  async getAllProducts(
    page: number = 0,
    limit: number = 12,
    categoryId?: string
  ): Promise<ApiResponse<Product[]>> {
    try {
      const skip = page * limit;

      let query = supabase
        .from('products')
        .select(`
          id,
          title,
          description,
          short_description,
          price,
          category_id,
          rating,
          images,
          is_locked,
          created_at,
          updated_at,
          category:categories(name)
        `)
        .order('created_at', { ascending: false })
        .range(skip, skip + limit - 1);

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Transform data to include category_name
      const products: Product[] = (data || []).map((item: any) => ({
        ...item,
        category_name: item.category?.name || 'Unknown'
      }));

      return {
        success: true,
        message: `Retrieved ${products.length} products successfully`,
        data: products,
        total: count || products.length
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch products',
        data: [],
        total: 0
      };
    }
  }

  /**
   * Get product by ID
   */
  async getProductDetails(productId: string): Promise<ApiResponse<Product>> {
    try {
      const { data, error } = await supabase
        .from('products')
        .select(`
          id,
          title,
          description,
          short_description,
          price,
          category_id,
          rating,
          images,
          is_locked,
          created_at,
          updated_at,
          category:categories(name)
        `)
        .eq('id', productId)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Product not found');
      }

      // Transform data to include category_name
      const product: Product = {
        ...data,
        category_name: (data as any).category?.name || 'Unknown'
      };

      return {
        success: true,
        message: 'Product retrieved successfully',
        data: product
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch product',
        data: {} as Product
      };
    }
  }

  /**
   * Get all categories
   */
  async getAllCategories(
    page: number = 0,
    limit: number = 100,
    activeOnly: boolean = false
  ): Promise<ApiResponse<Category[]>> {
    try {
      const skip = page * limit;

      let query = supabase
        .from('categories')
        .select('*', { count: 'exact' })
        .order('name', { ascending: true })
        .range(skip, skip + limit - 1);

      if (activeOnly) {
        query = query.eq('is_active', true);
      }

      const { data, error, count } = await query;

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      return {
        success: true,
        message: `Retrieved ${data?.length || 0} categories successfully`,
        data: data || [],
        total: count || 0
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch categories',
        data: [],
        total: 0
      };
    }
  }

  /**
   * Get active categories only
   */
  async getActiveCategories(
    page: number = 0,
    limit: number = 100
  ): Promise<ApiResponse<Category[]>> {
    return this.getAllCategories(page, limit, true);
  }

  /**
   * Get category by ID
   */
  async getCategoryDetails(categoryId: string): Promise<ApiResponse<Category>> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', categoryId)
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Category not found');
      }

      return {
        success: true,
        message: 'Category retrieved successfully',
        data: data
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to fetch category',
        data: {} as Category
      };
    }
  }

  /**
   * Submit inquiry (contact form)
   */
  async submitInquiry(inquiry: Inquiry): Promise<ApiResponse<{ reference_id: string }>> {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert({
          first_name: inquiry.first_name,
          last_name: inquiry.last_name,
          email: inquiry.email,
          phone_number: inquiry.phone_number || null,
          subject: inquiry.subject,
          message: inquiry.message,
          subscribe_newsletter: inquiry.subscribe_newsletter || false
        })
        .select('reference_id')
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (!data) {
        throw new Error('Failed to submit inquiry');
      }

      // Return success with reference_id
      // Email sending is handled separately by the frontend calling /api/send-email
      return {
        success: true,
        message: 'Thank you for your inquiry! We have received your message and will get back to you soon.',
        data: {
          reference_id: data.reference_id
        }
      };
    } catch (error: any) {
      console.error('API Error:', error);
      return {
        success: false,
        message: error.message || 'Failed to submit inquiry',
        data: { reference_id: '' }
      };
    }
  }

  /**
   * Health check - verify Supabase connection
   */
  async checkHealth(): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('count')
        .limit(1)
        .single();

      return {
        success: !error,
        message: error ? 'Supabase connection failed' : 'Supabase connection OK',
        timestamp: new Date().toISOString()
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'Health check failed',
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Utility functions for common API operations
export const api = {
  // Get products (defaults to public/unlocked only)
  getProducts: (page?: number, limit?: number, categoryId?: string, includeAll: boolean = false) => {
    return includeAll
      ? apiClient.getAllProducts(page, limit, categoryId)
      : apiClient.getPublicProducts(page, limit, categoryId);
  },

  // Get product by ID
  getProduct: (id: string) => apiClient.getProductDetails(id),

  // Get categories (defaults to active only)
  getCategories: (activeOnly: boolean = true) => {
    return activeOnly
      ? apiClient.getActiveCategories()
      : apiClient.getAllCategories();
  },

  // Get category by ID
  getCategory: (id: string) => apiClient.getCategoryDetails(id),

  // Submit inquiry
  submitInquiry: (inquiry: Inquiry) => apiClient.submitInquiry(inquiry),

  // Health check
  health: () => apiClient.checkHealth()
};

export default api;
