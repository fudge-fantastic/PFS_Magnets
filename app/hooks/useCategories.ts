import { useState, useEffect } from 'react';
import { categoryService } from '../services/category.service';
import type { Category } from '../types/category';

interface UseCategoriesOptions {
  searchTerm?: string;
  activeFilter?: 'all' | 'active' | 'inactive';
}

interface UseCategoriesResult {
  categories: Category[];
  isLoading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

export const useCategories = (options: UseCategoriesOptions = {}): UseCategoriesResult => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const filters: any = {};

      if (options.activeFilter && options.activeFilter !== 'all') {
        filters.is_active = options.activeFilter === 'active';
      }

      const result = await categoryService.getCategories(filters);

      // Client-side search filtering
      let filteredData = result.data;
      if (options.searchTerm) {
        const search = options.searchTerm.toLowerCase();
        filteredData = result.data.filter((c: any) =>
          c.name.toLowerCase().includes(search) ||
          c.description?.toLowerCase().includes(search)
        );
      }

      setCategories(filteredData);
      setTotal(result.total);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories');
      setCategories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [options.searchTerm, options.activeFilter]);

  return {
    categories,
    isLoading,
    error,
    total,
    refetch: fetchCategories,
  };
};
