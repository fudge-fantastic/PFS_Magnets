import { supabase } from '../lib/supabase';
import type { Category, CreateCategoryInput, UpdateCategoryInput } from '../types/category';

interface GetCategoriesFilters {
  is_active?: boolean;
}

export const categoryService = {
  /**
   * Get all categories
   */
  getCategories: async (filters?: GetCategoriesFilters) => {
    let query = supabase
      .from('categories')
      .select('*, products(count)', { count: 'exact' })
      .order('name', { ascending: true });

    if (filters?.is_active !== undefined) {
      query = query.eq('is_active', filters.is_active);
    }

    const { data, error, count } = await query;

    if (error) throw error;

    const categories = (data || []).map(cat => ({
      ...cat,
      product_count: cat.products?.[0]?.count || 0
    })) as Category[];

    return { data: categories, total: count || 0 };
  },

  /**
   * Get a single category by ID
   */
  getCategory: async (id: string): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Category;
  },

  /**
   * Create a new category
   */
  createCategory: async (categoryData: CreateCategoryInput): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .insert(categoryData)
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },

  /**
   * Update an existing category
   */
  updateCategory: async (id: string, categoryData: UpdateCategoryInput): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .update(categoryData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },

  /**
   * Delete a category
   */
  deleteCategory: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  /**
   * Toggle category active status
   */
  toggleActive: async (id: string, is_active: boolean): Promise<Category> => {
    const { data, error } = await supabase
      .from('categories')
      .update({ is_active })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Category;
  },
};
